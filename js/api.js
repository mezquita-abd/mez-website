// 🌐 Cliente API — Aladhan + Al-Quran Cloud (v3: con transliteration y navegación)

const API = {
  // ============ PRAYER TIMES (Aladhan) ============
  async getPrayerTimes(lat, lng, date = new Date(), method = 3) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    const cacheKey = `prayer_${lat.toFixed(2)}_${lng.toFixed(2)}_${dd}-${mm}-${yyyy}_${method}`;
    const cached = Storage.get(cacheKey);
    if (cached) return cached;

    const url = `${CONFIG.API.ALADHAN}/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lng}&method=${method}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Prayer API error');
    const json = await res.json();
    if (json.code !== 200) throw new Error('Prayer API error');

    Storage.set(cacheKey, json.data, CONFIG.CACHE_TTL);
    return json.data;
  },

  // ============ HIJRI CALENDAR ============
  async gregorianToHijri(date = new Date()) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    const cacheKey = `hijri_${dd}-${mm}-${yyyy}`;
    const cached = Storage.get(cacheKey);
    if (cached) return cached;

    const url = `${CONFIG.API.ALADHAN}/gToH/${dd}-${mm}-${yyyy}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Hijri API error');
    const json = await res.json();
    const hijri = json.data?.hijri;
    if (hijri) Storage.set(cacheKey, hijri, CONFIG.CACHE_TTL * 7);
    return hijri;
  },

  async getHijriCalendarMonth(month, year) {
    const cacheKey = `hijri_cal_${month}_${year}`;
    const cached = Storage.get(cacheKey);
    if (cached) return cached;

    const url = `${CONFIG.API.ALADHAN}/gToHCalendar/${month}/${year}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Hijri calendar error');
    const json = await res.json();
    const data = json.data || [];
    Storage.set(cacheKey, data, CONFIG.CACHE_TTL * 7);
    return data;
  },

  // Monthly prayer times table for a given lat/lon, method, month, year
  async getPrayerTimesMonth(lat, lon, month, year, method = 3) {
    const cacheKey = `prayer_month_${lat.toFixed(2)}_${lon.toFixed(2)}_${month}_${year}_${method}`;
    const cached = Storage.get(cacheKey);
    if (cached) return cached;

    const url = `${CONFIG.API.ALADHAN}/calendar/${year}/${month}?latitude=${lat}&longitude=${lon}&method=${method}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Prayer month error');
    const json = await res.json();
    const data = json.data || [];
    // Cache for 7 days
    Storage.set(cacheKey, data, CONFIG.CACHE_TTL * 7);
    return data;
  },

  // ============ QURAN (Al-Quran Cloud) ============
  async getSurahList() {
    const cached = Storage.get('surah_list');
    if (cached) return cached;
    const res = await fetch(`${CONFIG.API.QURAN}/surah`);
    if (!res.ok) throw new Error('Surah list error');
    const json = await res.json();
    const data = json.data || [];
    Storage.set('surah_list', data, CONFIG.CACHE_TTL * 30);
    return data;
  },

  /**
   * Get a surah with arabic + translation + transliteration + audio in parallel.
   * @param {number} surahNumber
   * @param {string} translation - e.g. 'es.cortes', 'es.garcia', 'en.sahih'
   * @param {string} audio - e.g. 'ar.alafasy'
   */
  async getSurahWithTranslation(surahNumber, translation = 'es.cortes', audio = 'ar.alafasy') {
    const cacheKey = `surah_${surahNumber}_${translation}_${audio}_v3`;
    const cached = Storage.get(cacheKey);
    if (cached) return cached;

    // Always include transliteration as 4th edition
    const editions = `quran-uthmani,${translation},${audio},en.transliteration`;
    const url = `${CONFIG.API.QURAN}/surah/${surahNumber}/editions/${editions}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Surah error');
    const json = await res.json();
    const editionsData = json.data || [];

    if (editionsData.length < 2) throw new Error('Sura no disponible');

    const arabic = editionsData[0];
    const trans = editionsData[1];
    const aud = editionsData[2];
    const translit = editionsData[3];

    const ayahs = arabic.ayahs.map((a, idx) => ({
      number: a.numberInSurah,
      numberGlobal: a.number, // global ayah index 1-6236
      arabic: a.text,
      translation: trans?.ayahs?.[idx]?.text || '',
      transliteration: translit?.ayahs?.[idx]?.text || '',
      audio: aud?.ayahs?.[idx]?.audio || null,
      audioSecondary: aud?.ayahs?.[idx]?.audioSecondary || [],
      juz: a.juz,
      page: a.page,
      sajda: a.sajda,
    }));

    const result = {
      number: arabic.number,
      name: arabic.name,
      englishName: arabic.englishName,
      englishNameTranslation: arabic.englishNameTranslation,
      revelationType: arabic.revelationType,
      numberOfAyahs: arabic.numberOfAyahs,
      ayahs,
    };

    Storage.set(cacheKey, result, CONFIG.CACHE_TTL * 7);
    return result;
  },

  async getVerseOfTheDay(translation = 'es.cortes') {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const totalAyahs = 6236;
    const ayahNumber = ((dayOfYear * 17) % totalAyahs) + 1;

    const cacheKey = `vod_${ayahNumber}_${translation}`;
    const cached = Storage.get(cacheKey);
    if (cached) return cached;

    try {
      const [arRes, trRes] = await Promise.all([
        fetch(`${CONFIG.API.QURAN}/ayah/${ayahNumber}/quran-uthmani`),
        fetch(`${CONFIG.API.QURAN}/ayah/${ayahNumber}/${translation}`),
      ]);
      const arJ = await arRes.json();
      const trJ = await trRes.json();
      const result = {
        arabic: arJ.data?.text,
        translation: trJ.data?.text,
        surah: arJ.data?.surah?.englishName,
        surahNumber: arJ.data?.surah?.number,
        ayahNumber: arJ.data?.numberInSurah,
      };
      Storage.set(cacheKey, result, CONFIG.CACHE_TTL);
      return result;
    } catch (e) {
      return {
        arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
        translation: 'Ciertamente, con la dificultad viene la facilidad.',
        surah: 'Ash-Sharh',
        surahNumber: 94,
        ayahNumber: 6,
      };
    }
  },

  // ============ DUAS (UmmahAPI) ============
  /**
   * Get all dua categories.
   * Returns: [{ id, name, description, count }, ...]
   */
  async getDuaCategories() {
    // 📚 Prefer local vetted dataset (Hisnul Muslim references)
    if (CONFIG.USE_LOCAL_DUAS && typeof LocalDuasService !== 'undefined') {
      const res = await LocalDuasService.getCategories();
      return res.data || [];
    }

    const cacheKey = 'dua_cats_v1';
    const cached = Storage.get(cacheKey);
    if (cached) return cached;
    try {
      // ☁️ Prefer proxy backend if configured
      const url = CONFIG.API.PROXY
        ? `${CONFIG.API.PROXY}/duas/categories`
        : `${CONFIG.API.UMMAH}/duas/categories`;
      const res = await fetch(url);
      const json = await res.json();
      const cats = json?.data?.categories || json?.data || [];
      Storage.set(cacheKey, cats, 7 * 24 * 60 * 60 * 1000); // 7 days
      return cats;
    } catch (e) {
      console.warn('getDuaCategories failed:', e);
      return [];
    }
  },

  /**
   * Get duas for a given category.
   * Returns: [{ id, title, arabic, transliteration, translation, source, repeat }, ...]
   */
  async getDuasByCategory(categoryId) {
    // 📚 Prefer local vetted dataset
    if (CONFIG.USE_LOCAL_DUAS && typeof LocalDuasService !== 'undefined') {
      const lang = AppState.settings.locale || 'es';
      const res = await LocalDuasService.getCategory(categoryId, lang);
      return res.data || [];
    }

    const cacheKey = `dua_cat_${categoryId}_v1`;
    const cached = Storage.get(cacheKey);
    if (cached) return cached;
    try {
      const url = CONFIG.API.PROXY
        ? `${CONFIG.API.PROXY}/duas/category/${encodeURIComponent(categoryId)}`
        : `${CONFIG.API.UMMAH}/duas/category/${encodeURIComponent(categoryId)}`;
      const res = await fetch(url);
      const json = await res.json();
      const duas = json?.data?.duas || json?.data || [];
      Storage.set(cacheKey, duas, 7 * 24 * 60 * 60 * 1000);
      return duas;
    } catch (e) {
      console.warn('getDuasByCategory failed:', e);
      return [];
    }
  },

  /**
   * Get a single random dua.
   */
  async getRandomDua() {
    try {
      const res = await fetch(`${CONFIG.API.UMMAH}/duas/random`);
      const json = await res.json();
      return json?.data || null;
    } catch (e) {
      return null;
    }
  },

  /**
   * Search duas by keyword.
   */
  async searchDuas(query) {
    if (!query || query.length < 2) return [];
    try {
      const res = await fetch(`${CONFIG.API.UMMAH}/duas/search?q=${encodeURIComponent(query)}`);
      const json = await res.json();
      return json?.data?.duas || [];
    } catch (e) {
      return [];
    }
  },
};

// ============ LOCATION ============
const LocationService = {
  // Default fallback: Mosque Abdullah, Havana, Cuba
  DEFAULT_LOCATION: {
    latitude: 23.1136,
    longitude: -82.3666,
    city: 'La Habana',
    country: 'Cuba',
    isDefault: true,
  },

  // Check current permission state (works on modern browsers)
  async checkPermission() {
    if (!navigator.permissions) return 'unknown';
    try {
      const res = await navigator.permissions.query({ name: 'geolocation' });
      return res.state; // 'granted' | 'prompt' | 'denied'
    } catch (e) {
      return 'unknown';
    }
  },

  // Reverse geocode via Nominatim with graceful failure
  async reverseGeocode(lat, lon) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
        { headers: { 'Accept-Language': currentLocale || 'es' } }
      );
      const data = await res.json();
      return {
        city: data.address?.city || data.address?.town || data.address?.village || data.address?.county || '',
        country: data.address?.country || '',
      };
    } catch (e) {
      return { city: '', country: '' };
    }
  },

  // Main entry — with cascading fallbacks
  async getCurrent(options = {}) {
    const { forceRefresh = false, silent = false } = options;

    // 1) Use cached if available and not forcing refresh
    if (!forceRefresh) {
      const cached = Storage.get('last_location');
      if (cached) return cached;
    }

    // 2) Try browser geolocation
    if (!navigator.geolocation) {
      if (!silent) showToast('⚠️ ' + (t('geoNotSupported') || 'Geolocalización no soportada. Usando ubicación por defecto.'), 3000);
      return this.useDefault();
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          };
          const geo = await this.reverseGeocode(coords.latitude, coords.longitude);
          Object.assign(coords, geo);
          Storage.set('last_location', coords, CONFIG.CACHE_TTL * 7);
          resolve(coords);
        },
        (err) => {
          // Cascading fallback: cached -> default
          const cached = Storage.get('last_location');
          if (cached) return resolve(cached);

          if (!silent) {
            const msg = err.code === 1
              ? (t('geoPermDenied') || '⚠️ Permiso denegado. Usando La Habana por defecto. Puedes cambiarla en el perfil.')
              : err.code === 2
              ? (t('geoUnavailable') || '⚠️ Posición no disponible. Usando ubicación por defecto.')
              : (t('geoTimeout') || '⚠️ Tiempo agotado. Usando ubicación por defecto.');
            showToast(msg, 4000);
          }
          resolve(this.useDefault());
        },
        { enableHighAccuracy: false, timeout: 12000, maximumAge: 600000 }
      );
    });
  },

  // Explicitly request permission (with clear UX)
  async requestPermission() {
    if (!navigator.geolocation) {
      showToast('⚠️ ' + (t('geoNotSupported') || 'No soportado'), 3000);
      return null;
    }
    // Trigger the browser prompt
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          };
          const geo = await this.reverseGeocode(coords.latitude, coords.longitude);
          Object.assign(coords, geo);
          Storage.set('last_location', coords, CONFIG.CACHE_TTL * 7);
          showToast('✅ ' + (t('geoGranted') || 'Ubicación activada: ' + (coords.city || '')), 2500);
          resolve(coords);
        },
        (err) => {
          const msg = err.code === 1
            ? (t('geoPermDeniedHelp') || '❌ Permiso denegado. Abre la configuración del navegador para habilitarlo.')
            : (t('geoError') || '❌ Error al obtener ubicación.');
          showToast(msg, 5000);
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    });
  },

  // Set a manual location (from profile settings)
  setManual(lat, lon, city, country) {
    const coords = {
      latitude: lat,
      longitude: lon,
      city: city || '',
      country: country || '',
      manual: true,
    };
    Storage.set('last_location', coords, CONFIG.CACHE_TTL * 30);
    AppState.location = coords;
    return coords;
  },

  useDefault() {
    Storage.set('last_location', this.DEFAULT_LOCATION, CONFIG.CACHE_TTL * 7);
    return { ...this.DEFAULT_LOCATION };
  },

  getCached() {
    return Storage.get('last_location');
  },
};

// ============ Helpers de fecha y oración ============
function getDailyPrayers(timings) {
  if (!timings) return [];
  const names = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  return names.map(n => ({
    name: n,
    time: (timings[n] || '--:--').split(' ')[0],
  }));
}

function getNextPrayer(timings) {
  if (!timings) return null;
  const order = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const now = new Date();
  for (const name of order) {
    const ts = (timings[name] || '').split(' ')[0];
    if (!ts) continue;
    const [h, m] = ts.split(':').map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    if (d > now) {
      const diffMs = d - now;
      return { name, time: ts, diffMs, date: d };
    }
  }
  const ts = (timings.Fajr || '05:00').split(' ')[0];
  const [h, m] = ts.split(':').map(Number);
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(h, m, 0, 0);
  return { name: 'Fajr', time: ts, diffMs: d - now, date: d, nextDay: true };
}

function formatCountdown(ms) {
  if (ms <= 0) return '00:00:00';
  const s = Math.floor(ms / 1000);
  const h = String(Math.floor(s / 3600)).padStart(2, '0');
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const sec = String(s % 60).padStart(2, '0');
  return `${h}:${m}:${sec}`;
}

function formatTime12h(time24) {
  if (!time24 || !time24.includes(':')) return '--:--';
  let [h, m] = time24.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, '0')} ${ampm}`;
}

function getGreetingByHour() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return t('greetingMorning');
  if (h >= 12 && h < 18) return t('greetingAfternoon');
  if (h >= 18 && h < 22) return t('greetingEvening');
  return t('greetingNight');
}

function getPrayerEmoji(name) {
  const map = {
    Fajr: '🌅',
    Sunrise: '☀️',
    Dhuhr: '🌞',
    Asr: '🌤️',
    Maghrib: '🌇',
    Isha: '🌙',
  };
  return map[name] || '🕌';
}
