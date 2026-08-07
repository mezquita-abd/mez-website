// 🔧 Service Worker — Quba v4 (auto-generated asset list, notifications, wake lock)
const VERSION = '4.6.0';
const CACHE_NAME = `quba-v${VERSION}`;
const STATIC_ASSETS = [
  './assets/icon.png',
  './assets/mascot/avatar.png',
  './assets/mascot/celebrate.png',
  './assets/mascot/encourage.png',
  './assets/mascot/goodbye.png',
  './assets/mascot/idle.png',
  './assets/mascot/shy.png',
  './assets/mascot/success.png',
  './assets/mascot/thinking.png',
  './assets/mascot/welcome.png',
  './assets/prayer/itidal.png',
  './assets/prayer/julus.png',
  './assets/prayer/qiyam.png',
  './assets/prayer/ruku.png',
  './assets/prayer/second_sujood.png',
  './assets/prayer/standing_again.png',
  './assets/prayer/sujood.png',
  './assets/prayer/takbeer.png',
  './assets/prayer/tashahhud.png',
  './assets/prayer/tasleem_left.png',
  './assets/prayer/tasleem_right.png',
  './assets/mascot/avatar.webp',
  './assets/mascot/celebrate.webp',
  './assets/mascot/encourage.webp',
  './assets/mascot/goodbye.webp',
  './assets/mascot/idle.webp',
  './assets/mascot/shy.webp',
  './assets/mascot/success.webp',
  './assets/mascot/thinking.webp',
  './assets/mascot/welcome.webp',
  './assets/prayer/itidal.webp',
  './assets/prayer/julus.webp',
  './assets/prayer/qiyam.webp',
  './assets/prayer/ruku.webp',
  './assets/prayer/second_sujood.webp',
  './assets/prayer/standing_again.webp',
  './assets/prayer/sujood.webp',
  './assets/prayer/takbeer.webp',
  './assets/prayer/tashahhud.webp',
  './assets/prayer/tasleem_left.webp',
  './assets/prayer/tasleem_right.webp',
  './assets/splash.png',
  './assets/wudu/niyyah.webp',
  './assets/wudu/niyyah.png',
  './assets/wudu/bismillah.webp',
  './assets/wudu/bismillah.png',
  './assets/wudu/wash_hands.webp',
  './assets/wudu/wash_hands.png',
  './assets/wudu/madmadah.webp',
  './assets/wudu/madmadah.png',
  './assets/wudu/istinshaq.webp',
  './assets/wudu/istinshaq.png',
  './assets/wudu/wash_face.webp',
  './assets/wudu/wash_face.png',
  './assets/wudu/right_arm.webp',
  './assets/wudu/right_arm.png',
  './assets/wudu/left_arm.webp',
  './assets/wudu/left_arm.png',
  './assets/wudu/mas_h_head.webp',
  './assets/wudu/mas_h_head.png',
  './assets/wudu/mas_h_ears.webp',
  './assets/wudu/mas_h_ears.png',
  './assets/wudu/right_foot.webp',
  './assets/wudu/right_foot.png',
  './assets/wudu/left_foot.webp',
  './assets/wudu/left_foot.png',
  './assets/logo.webp',
  './assets/logo.png',
  './css/components.css',
  './css/courses.css',
  './css/main.css',
  './css/quran-reader.css',
  './css/screens.css',
  './css/wisdom.css',
  './data/adhkar/after_prayer.js',
  './data/adhkar/evening.js',
  './data/duas/local_duas.js',
  './data/adhkar/morning.js',
  './data/adhkar/sleep.js',
  './data/calendar2026.js',
  './data/courses/how_to_pray.js',
  './data/courses/journey.js',
  './data/courses/kids.js',
  './data/courses/names_of_allah.js',
  './data/courses/pillars.js',
  './data/courses/quran_basics.js',
  './data/courses/salah_complete.js',
  './data/courses/wudu_complete.js',
  './data/famous_verses.js',
  './data/quiz/fiqh.js',
  './data/quiz/hadith.js',
  './data/quiz/history.js',
  './data/quiz/prophets.js',
  './data/quiz/quran.js',
  './data/quiz/sira.js',
  './index.html',
  './js/adhan.js',
  './js/notifications.js',
  './js/event-delegation.js',
  './js/pwa-install.js',
  './js/wake-lock.js',
  './js/api.js',
  './js/app.js',
  './js/config.js',
  './js/cache-db.js',
  './js/duas.js',
  './js/gamification.js',
  './js/hijri.js',
  './js/version.js',
  './js/i18n.js',
  './js/mascot.js',
  './js/qibla.js',
  './js/quran-helpers.js',
  './js/router.js',
  './js/storage.js',
  './js/tafsir.js',
  './manifest.json',
  './pages/calendar.js',
  './pages/home.js',
  './pages/prayer.js',
  './pages/profile.js',
  './pages/quran.js',
  './pages/wisdom.js',
  './pages/wisdom/adhkar.js',
  './pages/wisdom/courses.js',
  './pages/wisdom/duas.js',
  './pages/wisdom/quiz.js',
  './pages/wisdom/tasbih.js'
];

// ============ INSTALL ============
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Cache assets individually so a single 404 doesn't abort everything
        return Promise.allSettled(
          STATIC_ASSETS.map(url =>
            cache.add(url).catch(err => console.warn('SW skip:', url, err.message))
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

// ============ ACTIVATE ============
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ============ FETCH (cache-first for static, network-first for APIs) ============
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // API calls: network first, cache fallback
  const apiHosts = ['api.aladhan.com', 'api.alquran.cloud', 'ummahapi.com',
                    'nominatim.openstreetmap.org', 'api.mymemory.translated.net',
                    'cdn.islamic.network'];
  if (apiHosts.some(h => url.hostname.includes(h))) {
    event.respondWith(
      fetch(req)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Static: cache-first
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        // Only cache successful responses
        if (res && res.status === 200 && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
        }
        return res;
      }).catch(() => {
        // Offline fallback for HTML → return index.html
        if (req.headers.get('accept')?.includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});

// ============ PRAYER TIME NOTIFICATIONS ============
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then(clients => {
      const client = clients[0];
      if (client) return client.focus();
      return self.clients.openWindow('./');
    })
  );
});

// Trigger prayer notification from the app
self.addEventListener('message', event => {
  const { type, payload } = event.data || {};
  if (type === 'prayerNotification') {
    const { title, body, tag } = payload || {};
    self.registration.showNotification(title || '🕌 Prayer Time', {
      body: body || 'It is time for prayer',
      icon: './assets/icon.png',
      badge: './assets/icon.png',
      vibrate: [200, 100, 200, 100, 400],
      tag: tag || 'prayer-adhan',
      requireInteraction: false,
    });
  }
});
