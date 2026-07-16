// 🕌 Adhan Service — Plays adhan for the first 2 takbeers with different voices
// Uses Islamic Network public CDN (islamic.network) — free, no auth
const AdhanService = {
  VOICES: [
    { id: 'makkah',   name: 'Makkah — Ali Ahmad Mulla',      country: 'Arabia Saudí', flag: '🕋', url: 'https://cdn.islamic.network/adhans/128/adhan1.mp3' },
    { id: 'madinah',  name: 'Madinah — Adhan Madinah',       country: 'Arabia Saudí', flag: '🕌', url: 'https://cdn.islamic.network/adhans/128/adhan2.mp3' },
    { id: 'egypt',    name: 'Egipto — Adhan Egypt',          country: 'Egipto', flag: '🇪🇬', url: 'https://cdn.islamic.network/adhans/128/adhan3.mp3' },
    { id: 'turkey',   name: 'Turquía — Adhan Turkish',       country: 'Turquía', flag: '🇹🇷', url: 'https://cdn.islamic.network/adhans/128/adhan4.mp3' },
    { id: 'aqsa',     name: 'Al-Aqsa — Adhan Al-Aqsa',       country: 'Palestina', flag: '🇵🇸', url: 'https://cdn.islamic.network/adhans/128/adhan5.mp3' },
    { id: 'algeria',  name: 'Argelia — Adhan Algerian',      country: 'Argelia', flag: '🇩🇿', url: 'https://cdn.islamic.network/adhans/128/adhan6.mp3' },
    { id: 'fajr_makkah', name: 'Fajr — Makkah',              country: 'Arabia Saudí', flag: '🌅', url: 'https://cdn.islamic.network/adhans/128/adhan-fajr1.mp3' },
    { id: 'fajr_madinah', name: 'Fajr — Madinah',            country: 'Arabia Saudí', flag: '🌅', url: 'https://cdn.islamic.network/adhans/128/adhan-fajr2.mp3' },
  ],

  audio: null,
  previewAudio: null,

  getSettings() {
    return AppState.settings.adhan || {
      voice1: 'makkah',
      voice2: 'madinah',
      volume: 0.8,
      muted: false,
    };
  },

  preview(voiceId) {
    this.stopPreview();
    const voice = this.VOICES.find(v => v.id === voiceId);
    if (!voice) return;
    const settings = this.getSettings();
    this.previewAudio = new Audio(voice.url);
    this.previewAudio.volume = settings.muted ? 0 : settings.volume;
    this.previewAudio.play().catch(err => {
      console.warn('Adhan preview failed:', err);
      if (typeof showToast === 'function') showToast('⚠️ ' + (t('adhanPlayError') || 'No se pudo reproducir'), 3000);
    });
    if (typeof showToast === 'function') showToast('🔊 ' + voice.name, 1500);
  },

  stopPreview() {
    if (this.previewAudio) {
      try { this.previewAudio.pause(); this.previewAudio.currentTime = 0; } catch (e) {}
      this.previewAudio = null;
    }
  },

  setVolume(v) {
    if (this.previewAudio) this.previewAudio.volume = v;
    if (this.audio) this.audio.volume = v;
  },

  // Play the two takbeers with different voices in sequence
  playFullAdhan(onEnded) {
    const settings = this.getSettings();
    if (settings.muted) { if (onEnded) onEnded(); return; }
    const voice1 = this.VOICES.find(v => v.id === settings.voice1) || this.VOICES[0];
    const voice2 = this.VOICES.find(v => v.id === settings.voice2) || this.VOICES[1];

    this.stopPreview();
    this.audio = new Audio(voice1.url);
    this.audio.volume = settings.volume;
    this.audio.play().catch(err => console.warn('Adhan play failed:', err));
    this.audio.onended = () => {
      this.audio = new Audio(voice2.url);
      this.audio.volume = settings.volume;
      this.audio.play().catch(() => {});
      this.audio.onended = () => { if (onEnded) onEnded(); };
    };
  },

  stop() {
    this.stopPreview();
    if (this.audio) {
      try { this.audio.pause(); this.audio.currentTime = 0; } catch (e) {}
      this.audio = null;
    }
  },
};
