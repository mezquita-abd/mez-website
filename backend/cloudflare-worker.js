/**
 * ☁️ Quba Backend Proxy — Cloudflare Worker
 *
 * Actúa como escudo entre la app y las APIs públicas (rate limits):
 *   • MyMemory (1000 llamadas/día por IP) → cache KV 30 días
 *   • Lingva.ml (fallback) → cache KV 30 días
 *   • UmmahAPI (unofficial) → cache KV 7 días
 *   • Nominatim (1 rps) → cache KV 30 días
 *
 * Ventajas:
 *   - Rate limit compartido en Worker (no per-user), respeta límites upstream
 *   - CORS habilitado para tu dominio
 *   - Fallback automático MyMemory → Lingva → LibreTranslate
 *
 * Setup:
 *   1) wrangler kv:namespace create "QUBA_KV"
 *   2) wrangler deploy
 *   3) En Quba, cambia CONFIG.API.PROXY = 'https://quba-proxy.tu-usuario.workers.dev'
 *
 * Endpoints:
 *   GET /translate?text=...&target=es              → { translated, source }
 *   GET /duas/categories                           → lista de categorías
 *   GET /duas/category/{id}                        → duas de una categoría
 *   GET /geocode?lat=...&lng=...                   → { city, country }
 *   GET /health                                    → { ok, version, kv }
 */

const VERSION = '1.0.0';

// ⚠️ Dominios permitidos (CORS). Añade tu dominio real de producción.
const ALLOWED_ORIGINS = [
  'https://quba.example.com',
  'http://localhost:8080',
  'http://localhost:3000',
];

const CORS_HEADERS = (origin) => ({
  'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
});

// TTLs en segundos
const TTL = {
  TRANSLATE: 30 * 24 * 3600,  // 30 días
  DUAS: 7 * 24 * 3600,        // 7 días
  GEOCODE: 30 * 24 * 3600,    // 30 días
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';
    const cors = CORS_HEADERS(origin);

    // Preflight CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    try {
      let body;
      switch (url.pathname) {
        case '/health':
          body = { ok: true, version: VERSION, kv: !!env.QUBA_KV };
          break;
        case '/translate':
          body = await handleTranslate(url.searchParams, env, ctx);
          break;
        case '/duas/categories':
          body = await handleDuasCategories(env, ctx);
          break;
        case '/geocode':
          body = await handleGeocode(url.searchParams, env, ctx);
          break;
        default:
          if (url.pathname.startsWith('/duas/category/')) {
            const cat = url.pathname.slice('/duas/category/'.length);
            body = await handleDuasCategory(cat, env, ctx);
          } else {
            return json({ error: 'not_found' }, 404, cors);
          }
      }
      return json(body, 200, cors);
    } catch (err) {
      return json({ error: err.message || 'internal_error' }, 500, cors);
    }
  },
};

// ============ TRANSLATE ============
async function handleTranslate(params, env, ctx) {
  const text = (params.get('text') || '').trim();
  const target = (params.get('target') || 'es').slice(0, 2);
  const source = (params.get('source') || 'ar').slice(0, 2);
  if (!text) throw new Error('missing_text');
  if (text.length > 500) throw new Error('text_too_long');

  const key = `tr:${source}:${target}:${await hash(text)}`;
  if (env.QUBA_KV) {
    const cached = await env.QUBA_KV.get(key, 'json');
    if (cached) return { ...cached, cached: true };
  }

  // Cadena de fallback: MyMemory → Lingva → LibreTranslate
  let result = null;
  const providers = [
    () => tryMyMemory(text, source, target),
    () => tryLingva(text, source, target),
    () => tryLibreTranslate(text, source, target),
  ];
  for (const provider of providers) {
    try {
      result = await provider();
      if (result && result.translated) break;
    } catch (e) { /* try next */ }
  }
  if (!result) throw new Error('all_providers_failed');

  if (env.QUBA_KV) {
    ctx.waitUntil(env.QUBA_KV.put(key, JSON.stringify(result), { expirationTtl: TTL.TRANSLATE }));
  }
  return result;
}

async function tryMyMemory(text, source, target) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;
  const res = await fetch(url, { cf: { cacheTtl: 3600 } });
  if (!res.ok) throw new Error('mymemory_' + res.status);
  const data = await res.json();
  if (data.responseStatus !== 200) throw new Error('mymemory_bad_response');
  return { translated: data.responseData.translatedText, provider: 'mymemory' };
}

async function tryLingva(text, source, target) {
  const url = `https://lingva.ml/api/v1/${source}/${target}/${encodeURIComponent(text)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('lingva_' + res.status);
  const data = await res.json();
  return { translated: data.translation, provider: 'lingva' };
}

async function tryLibreTranslate(text, source, target) {
  const res = await fetch('https://libretranslate.de/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: text, source, target, format: 'text' }),
  });
  if (!res.ok) throw new Error('libretranslate_' + res.status);
  const data = await res.json();
  return { translated: data.translatedText, provider: 'libretranslate' };
}

// ============ DU'AS (proxy con cache largo) ============
async function handleDuasCategories(env, ctx) {
  const key = 'duas:categories';
  if (env.QUBA_KV) {
    const cached = await env.QUBA_KV.get(key, 'json');
    if (cached) return { ...cached, cached: true };
  }
  const res = await fetch('https://ummahapi.com/api/duas/categories');
  if (!res.ok) throw new Error('duas_upstream_' + res.status);
  const data = await res.json();
  if (env.QUBA_KV) {
    ctx.waitUntil(env.QUBA_KV.put(key, JSON.stringify(data), { expirationTtl: TTL.DUAS }));
  }
  return data;
}

async function handleDuasCategory(cat, env, ctx) {
  if (!/^[a-z_]+$/.test(cat)) throw new Error('invalid_category');
  const key = `duas:cat:${cat}`;
  if (env.QUBA_KV) {
    const cached = await env.QUBA_KV.get(key, 'json');
    if (cached) return { ...cached, cached: true };
  }
  const res = await fetch(`https://ummahapi.com/api/duas/category/${cat}`);
  if (!res.ok) throw new Error('duas_upstream_' + res.status);
  const data = await res.json();
  if (env.QUBA_KV) {
    ctx.waitUntil(env.QUBA_KV.put(key, JSON.stringify(data), { expirationTtl: TTL.DUAS }));
  }
  return data;
}

// ============ GEOCODE ============
async function handleGeocode(params, env, ctx) {
  const lat = parseFloat(params.get('lat'));
  const lng = parseFloat(params.get('lng'));
  if (isNaN(lat) || isNaN(lng)) throw new Error('invalid_coords');
  const key = `geo:${lat.toFixed(2)}:${lng.toFixed(2)}`;
  if (env.QUBA_KV) {
    const cached = await env.QUBA_KV.get(key, 'json');
    if (cached) return { ...cached, cached: true };
  }
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=en`;
  const res = await fetch(url, { headers: { 'User-Agent': 'QubaApp/1.0 (contact@example.com)' } });
  if (!res.ok) throw new Error('geocode_' + res.status);
  const data = await res.json();
  const result = {
    city: data.address?.city || data.address?.town || data.address?.village || '',
    country: data.address?.country || '',
    countryCode: data.address?.country_code || '',
  };
  if (env.QUBA_KV) {
    ctx.waitUntil(env.QUBA_KV.put(key, JSON.stringify(result), { expirationTtl: TTL.GEOCODE }));
  }
  return result;
}

// ============ helpers ============
function json(body, status, cors) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  });
}

async function hash(text) {
  const buf = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(digest)).slice(0, 8).map(b => b.toString(16).padStart(2, '0')).join('');
}
