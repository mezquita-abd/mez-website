// 🔧 Service Worker — Quba v3
const CACHE_NAME = 'quba-v3.0.0';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/icon.png',
  './assets/splash.png',
  './css/main.css',
  './css/components.css',
  './css/screens.css',
  './css/wisdom.css',
  './css/quran-reader.css',
  './js/i18n.js',
  './js/config.js',
  './js/storage.js',
  './js/api.js',
  './js/qibla.js',
  './js/duas.js',
  './js/hijri.js',
  './js/quran-helpers.js',
  './js/tafsir.js',
  './js/gamification.js',
  './js/router.js',
  './js/app.js',
  './data/quiz/quran.js',
  './data/quiz/sira.js',
  './data/quiz/hadith.js',
  './data/quiz/fiqh.js',
  './data/quiz/history.js',
  './data/quiz/prophets.js',
  './data/adhkar/morning.js',
  './data/adhkar/evening.js',
  './data/adhkar/sleep.js',
  './data/adhkar/after_prayer.js',
  './data/courses/how_to_pray.js',
  './data/courses/pillars.js',
  './data/courses/names_of_allah.js',
  './pages/home.js',
  './pages/quran.js',
  './pages/prayer.js',
  './pages/calendar.js',
  './pages/wisdom.js',
  './pages/profile.js',
  './pages/wisdom/quiz.js',
  './pages/wisdom/tasbih.js',
  './pages/wisdom/adhkar.js',
  './pages/wisdom/courses.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Don't intercept API requests
  if (url.hostname.includes('aladhan.com') ||
      url.hostname.includes('alquran.cloud') ||
      url.hostname.includes('openstreetmap.org') ||
      url.hostname.includes('mymemory.translated.net') ||
      url.hostname.includes('cdn.islamic.network')) {
    return;
  }

  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok && url.origin === self.location.origin) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
