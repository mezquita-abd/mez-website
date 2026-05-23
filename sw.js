// 🔧 Service Worker — Quba (offline básico)
const CACHE_NAME = 'quba-v1.0.0';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/icon.png',
  './assets/splash.png',
  './css/main.css',
  './css/components.css',
  './css/screens.css',
  './js/i18n.js',
  './js/config.js',
  './js/storage.js',
  './js/api.js',
  './js/qibla.js',
  './js/duas.js',
  './js/hijri.js',
  './js/router.js',
  './js/app.js',
  './pages/home.js',
  './pages/quran.js',
  './pages/prayer.js',
  './pages/calendar.js',
  './pages/wisdom.js',
  './pages/profile.js',
];

// Instalar y cachear archivos estáticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activar y limpiar caches viejos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Estrategia: cache-first para estáticos, network-first para APIs
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // No interceptar peticiones a APIs externas (deja que el navegador gestione)
  if (url.hostname.includes('aladhan.com') ||
      url.hostname.includes('alquran.cloud') ||
      url.hostname.includes('openstreetmap.org') ||
      url.hostname.includes('cdn.islamic.network')) {
    return; // Sin interceptar
  }

  // Solo cachear GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cachear nuevas respuestas estáticas
        if (response.ok && url.origin === self.location.origin) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
