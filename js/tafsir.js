// 📜 Tafsir service: Arabic Muyassar tafsir + auto-translation to ES/EN

const TafsirService = {
  // Available tafsir sources from Al-Quran Cloud (all in Arabic)
  TAFSIRS: {
    'ar.muyassar': { name: 'Al-Muyassar', nameAr: 'التفسير الميسر', desc: 'Conciso y moderno (recomendado)' },
    'ar.jalalayn': { name: 'Al-Jalalayn', nameAr: 'تفسير الجلالين', desc: 'Clásico, breve' },
    'ar.qurtubi': { name: 'Al-Qurtubi', nameAr: 'تفسير القرطبي', desc: 'Clásico, detallado' },
    'ar.baghawi': { name: 'Al-Baghawi', nameAr: 'تفسير البغوي', desc: 'Clásico tradicional' },
  },

  DEFAULT_TAFSIR: 'ar.muyassar',

  /**
   * Get tafsir text for a specific ayah (using global ayah number 1-6236).
   * Returns { arabic, translated, source }
   */
  async getTafsir(surahNum, ayahNum, tafsirId = null, targetLang = 'es') {
    const tafsir = tafsirId || this.DEFAULT_TAFSIR;
    const cacheKey = `tafsir_${surahNum}_${ayahNum}_${tafsir}_${targetLang}`;
    const cached = Storage.get(cacheKey);
    if (cached) return cached;

    try {
      // Fetch Arabic tafsir from Al-Quran Cloud
      const url = `${CONFIG.API.QURAN}/ayah/${surahNum}:${ayahNum}/${tafsir}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Tafsir not found');
      const json = await res.json();
      const arabicText = json.data?.text || '';

      if (!arabicText) throw new Error('Empty tafsir');

      // Try to translate to target language
      let translatedText = '';
      if (targetLang !== 'ar') {
        try {
          translatedText = await this.translateText(arabicText, 'ar', targetLang);
        } catch (e) {
          console.warn('Translation failed:', e);
          translatedText = '';
        }
      }

      const result = {
        arabic: arabicText,
        translated: translatedText,
        source: this.TAFSIRS[tafsir]?.name || tafsir,
        sourceAr: this.TAFSIRS[tafsir]?.nameAr || '',
        targetLang,
      };

      // Cache for 30 days
      Storage.set(cacheKey, result, 30 * 24 * 60 * 60 * 1000);
      return result;
    } catch (e) {
      console.warn('Tafsir error:', e);
      throw e;
    }
  },

  /**
   * Translate text using MyMemory API (free, 1000 req/day, no key needed).
   * Fallback to LibreTranslate public if MyMemory fails.
   */
  async translateText(text, sourceLang = 'ar', targetLang = 'es') {
    if (!text || sourceLang === targetLang) return text;

    // MyMemory has a 500-char limit per request — split if needed
    const MAX_CHARS = 480;
    if (text.length <= MAX_CHARS) {
      return await this._myMemoryTranslate(text, sourceLang, targetLang);
    }

    // Split into sentences and translate each
    const sentences = text.split(/(?<=[\.\!\?؟])\s+/);
    const chunks = [];
    let current = '';
    for (const s of sentences) {
      if ((current + s).length > MAX_CHARS) {
        if (current) chunks.push(current);
        current = s;
      } else {
        current += (current ? ' ' : '') + s;
      }
    }
    if (current) chunks.push(current);

    const translations = await Promise.all(
      chunks.map(c => this._myMemoryTranslate(c, sourceLang, targetLang).catch(() => c))
    );
    return translations.join(' ');
  },

  async _myMemoryTranslate(text, source, target) {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error('MyMemory failed');
    const json = await res.json();
    if (json.responseStatus !== 200) throw new Error('Translation error');
    return json.responseData?.translatedText || text;
  },

  /**
   * Get all available tafsirs as array.
   */
  getAvailableTafsirs() {
    return Object.entries(this.TAFSIRS).map(([id, info]) => ({ id, ...info }));
  },
};
