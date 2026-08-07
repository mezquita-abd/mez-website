# Quba Changelog

## v4.2.0 — 2026-07-10 · Long-term Architecture (v11)

### 🏗️ Infrastructure
- **Cloudflare Worker backend** (`backend/cloudflare-worker.js`) — proxy con KV cache para MyMemory, UmmahAPI, Nominatim. 100.000 req/día gratis, cache 30 días para traducciones.
- **Bundler simple** (`build/bundle.js`) — genera `dist/core.bundle.js`, `dist/data.bundle.js`, `dist/pages.bundle.js`. Reduce 51 requests HTTP a 3. Total: 464 KB.
- **TypeScript declarations** (`types/quba.d.ts`) — IntelliSense en VS Code sin migrar código. Compatible con `checkJs: true`.
- **Playwright test suite** (`tests/smoke.spec.js`) — 10 tests: home, CSP, wisdom, SW, manifest, escapeHtml, i18n parity, services, LocalDuas, Router pushState.

### 📿 Dataset Local Vetado
- **`data/duas/local_duas.js`** — 10 categorías, 15+ du'as auténticas con referencias explícitas (Bukhari, Muslim, Abu Dawud, Tirmidhi, Corán).
- Reemplaza dependencia de UmmahAPI unofficial → `CONFIG.USE_LOCAL_DUAS = true` por defecto.
- API compatible con estructura anterior (drop-in replacement).
- Marca `@theological_review PENDIENTE` para revisión formal por imám cualificado.

### 🔧 Config
- `CONFIG.API.PROXY` — endpoint del backend Worker (vacío por defecto).
- `CONFIG.USE_LOCAL_DUAS` — usa dataset local en lugar de UmmahAPI.
- Fallback en cascada: Local → Proxy → UmmahAPI directo.

### 📦 Estadísticas v11
- ZIP: 3.9 MB (114 archivos + `dist/` opcional + `backend/` + `types/` + `tests/`).
- 51 archivos JS válidos.
- SW: 4.2.0, 101 assets cacheados.
- i18n: 283 claves × 3 idiomas (paridad total).
- Bundles: 3 archivos, 464 KB total.

---

## v4.1.0 — 2026-07-09 · Priority Media (v10)
- IndexedDB (`js/cache-db.js`), WakeLock, PWA install banner, event delegation, WebP images, reset progress, export data.

## v4.0.0 — 2026-07-07 · Critical Fixes (v9)
- Global `escapeHtml`, CSP meta, SRI, Router `history.pushState`, language bug fix, splash reactivo, prayer notifications, accessibility CSS.

## v3.0.0 — Curso de Salah completo, 11 imágenes de posiciones, 26 lecciones.

## v2.0.0 — Adhkar page, Tasbih, Quiz gamificado con 305 preguntas.

## v1.0.0 — Lector Corán, oraciones, Qibla, calendario hijri.
