// 🔔 Servicio de notificaciones de oración
// - Solicita permiso
// - Programa alarmas para las 5 oraciones del día
// - Envía mensaje al SW para mostrar la notificación con adhan
const PrayerNotifications = {
  timers: [],
  enabledKey: 'prayer_notif_enabled',

  isEnabled() {
    return Storage.get(this.enabledKey) === true && Notification.permission === 'granted';
  },

  async requestPermission() {
    if (!('Notification' in window)) {
      showToast(t('notifNotSupported') || 'Notificaciones no soportadas');
      return false;
    }
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') {
      showToast(t('notifDenied') || 'Permiso denegado. Actívalo en ajustes del navegador.');
      return false;
    }
    const result = await Notification.requestPermission();
    return result === 'granted';
  },

  async enable() {
    const ok = await this.requestPermission();
    if (!ok) return false;
    Storage.set(this.enabledKey, true);
    showToast(t('notifEnabled') || '✅ Notificaciones activadas');
    return true;
  },

  disable() {
    Storage.set(this.enabledKey, false);
    this.clearAll();
    showToast(t('notifDisabled') || 'Notificaciones desactivadas');
  },

  clearAll() {
    this.timers.forEach(id => clearTimeout(id));
    this.timers = [];
  },

  /**
   * Schedule prayer notifications for today
   * @param {Object} timings - { Fajr, Dhuhr, Asr, Maghrib, Isha } as "HH:MM" strings
   * @param {string} locale - current app locale for prayer names
   */
  scheduleDay(timings, locale = 'es') {
    if (!this.isEnabled() || !timings) return;
    this.clearAll();

    const prayerNames = {
      es: { Fajr: 'Fajr', Dhuhr: 'Duhr', Asr: 'Asr', Maghrib: 'Maghrib', Isha: 'Isha' },
      en: { Fajr: 'Fajr', Dhuhr: 'Dhuhr', Asr: 'Asr', Maghrib: 'Maghrib', Isha: 'Isha' },
      ar: { Fajr: 'الفجر', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء' },
    }[locale] || {};

    const messages = {
      es: 'Es hora de la oración de',
      en: 'It is time for',
      ar: 'حان وقت صلاة',
    };
    const body = messages[locale] || messages.es;

    ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].forEach(prayer => {
      const timeStr = timings[prayer];
      if (!timeStr) return;
      const clean = timeStr.split(' ')[0]; // "05:30 (+03)" → "05:30"
      const [h, m] = clean.split(':').map(Number);
      if (isNaN(h) || isNaN(m)) return;

      const target = new Date();
      target.setHours(h, m, 0, 0);
      const delay = target.getTime() - Date.now();
      if (delay < 0 || delay > 24 * 60 * 60 * 1000) return; // ya pasó o >24h

      const prayerName = prayerNames[prayer] || prayer;
      const timerId = setTimeout(() => {
        this.notify(prayerName, `${body} ${prayerName}`, prayer);
      }, delay);
      this.timers.push(timerId);
    });

    console.log(`🔔 ${this.timers.length} prayer notifications scheduled`);
  },

  async notify(title, body, tag) {
    // Vibrate
    if ('vibrate' in navigator) navigator.vibrate([300, 100, 300, 100, 500]);

    // Play adhan via AdhanService if available
    if (typeof AdhanService !== 'undefined' && AdhanService.playFullAdhan) {
      try { AdhanService.playFullAdhan(); } catch(e) { console.warn('Adhan play failed:', e); }
    }

    // Show notification via SW
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'prayerNotification',
        payload: { title: '🕌 ' + title, body, tag: 'prayer-' + tag },
      });
    } else if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('🕌 ' + title, { body, icon: 'assets/icon.png' });
    }
  },
};
