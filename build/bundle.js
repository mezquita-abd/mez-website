#!/usr/bin/env node
/**
 * 📦 Quba Bundler — Simple concatenation + minimal minify
 *
 * Genera dos bundles para reducir requests HTTP:
 *   - dist/core.bundle.js   → version + i18n + config + storage + cache-db + api + qibla + ...
 *   - dist/pages.bundle.js  → todas las páginas (home, quran, prayer, calendar, profile, wisdom)
 *
 * No usa Vite/esbuild para mantener zero-dependency. Suficiente para reducir ~50 requests a 2.
 *
 * Uso:
 *   node build/bundle.js         # genera dist/*.bundle.js
 *   node build/bundle.js --min   # también minifica (regex simple, no AST)
 *
 * Nota: en producción real se recomienda esbuild/Vite. Este script existe como referencia
 * y para builds sin toolchain de Node.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

// Orden importa: version primero, luego config/storage/i18n, luego servicios, luego pages
const CORE_FILES = [
  'js/version.js',
  'js/i18n.js',
  'js/config.js',
  'js/storage.js',
  'js/cache-db.js',
  'js/api.js',
  'js/qibla.js',
  'js/duas.js',
  'js/hijri.js',
  'js/quran-helpers.js',
  'js/tafsir.js',
  'js/adhan.js',
  'js/notifications.js',
  'js/wake-lock.js',
  'js/pwa-install.js',
  'js/event-delegation.js',
  'js/mascot.js',
  'js/gamification.js',
];

const DATA_FILES = [
  'data/duas/local_duas.js',
  'data/quiz/quran.js',
  'data/quiz/sira.js',
  'data/quiz/hadith.js',
  'data/quiz/fiqh.js',
  'data/quiz/history.js',
  'data/quiz/prophets.js',
  'data/adhkar/morning.js',
  'data/adhkar/evening.js',
  'data/adhkar/sleep.js',
  'data/adhkar/after_prayer.js',
  'data/famous_verses.js',
  'data/calendar2026.js',
  'data/courses/how_to_pray.js',
  'data/courses/journey.js',
  'data/courses/kids.js',
  'data/courses/names_of_allah.js',
  'data/courses/pillars.js',
  'data/courses/quran_basics.js',
  'data/courses/salah_complete.js',
  'data/courses/wudu_complete.js',
];

const PAGE_FILES = [
  'pages/home.js',
  'pages/quran.js',
  'pages/prayer.js',
  'pages/calendar.js',
  'pages/profile.js',
  'pages/wisdom/quiz.js',
  'pages/wisdom/tasbih.js',
  'pages/wisdom/adhkar.js',
  'pages/wisdom/courses.js',
  'pages/wisdom/duas.js',
  'pages/wisdom.js',
  'js/router.js', // needs pages loaded first
  'js/app.js',
];

// Minify muy simple: quitar comentarios /* */ y // ...
// (No toca strings, no colapsa nombres — solo para reducir tamaño ~30%)
function simpleMinify(src) {
  return src
    // Bloques /* ... */
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Comentarios de línea (evita URLs en strings preservando //)
    .replace(/^\s*\/\/.*$/gm, '')
    // Espacios/tabs redundantes al inicio de línea
    .replace(/^\s+/gm, '')
    // Líneas vacías
    .replace(/\n\s*\n/g, '\n');
}

function concat(files, minify) {
  return files.map(f => {
    const p = path.join(ROOT, f);
    if (!fs.existsSync(p)) {
      console.warn('  ⚠️  Missing:', f);
      return '';
    }
    let content = fs.readFileSync(p, 'utf-8');
    if (minify) content = simpleMinify(content);
    return `\n/* ==== ${f} ==== */\n${content}`;
  }).join('\n');
}

function build() {
  const minify = process.argv.includes('--min');
  console.log('📦 Bundling Quba', minify ? '(minified)' : '(dev)');

  if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });

  const core = concat(CORE_FILES, minify);
  const data = concat(DATA_FILES, minify);
  const pages = concat(PAGE_FILES, minify);

  const header = `/* Quba bundle • v${(require('../package.json') || {}).version || '4.2.0'} • generated ${new Date().toISOString()} */\n`;

  fs.writeFileSync(path.join(DIST, 'core.bundle.js'), header + core);
  fs.writeFileSync(path.join(DIST, 'data.bundle.js'), header + data);
  fs.writeFileSync(path.join(DIST, 'pages.bundle.js'), header + pages);

  const coreKB = (fs.statSync(path.join(DIST, 'core.bundle.js')).size / 1024).toFixed(1);
  const dataKB = (fs.statSync(path.join(DIST, 'data.bundle.js')).size / 1024).toFixed(1);
  const pagesKB = (fs.statSync(path.join(DIST, 'pages.bundle.js')).size / 1024).toFixed(1);

  console.log(`  ✓ core.bundle.js   ${coreKB} KB`);
  console.log(`  ✓ data.bundle.js   ${dataKB} KB`);
  console.log(`  ✓ pages.bundle.js  ${pagesKB} KB`);
  console.log(`  Total: ${(parseFloat(coreKB) + parseFloat(dataKB) + parseFloat(pagesKB)).toFixed(1)} KB (3 requests en vez de ${CORE_FILES.length + DATA_FILES.length + PAGE_FILES.length})`);
}

build();
