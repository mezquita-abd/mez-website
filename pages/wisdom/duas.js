// 🤲 Du'as (Súplicas) — Live data from UmmahAPI (300+ duas across 27 categories)
const DuasPage = {
  categories: [],
  currentCategory: null,
  currentDuas: [],
  searchResults: null,

  // Multilingual category labels (frontend translation of the English API titles)
  CAT_TRANSLATIONS: {
    morning:     { es: 'Mañana',          ar: 'الصباح',       icon: '🌅', color: '#FFA726' },
    evening:     { es: 'Tarde',           ar: 'المساء',       icon: '🌇', color: '#FF7043' },
    wudu:        { es: 'Ablución',        ar: 'الوضوء',       icon: '💧', color: '#29B6F6' },
    prayer:      { es: 'En la oración',   ar: 'في الصلاة',    icon: '🕌', color: '#0F4C3A' },
    after_prayer:{ es: 'Tras la oración', ar: 'بعد الصلاة',   icon: '✨', color: '#1A6B52' },
    sleep:       { es: 'Antes de dormir', ar: 'قبل النوم',    icon: '🌙', color: '#5C6BC0' },
    food:        { es: 'Comida y bebida', ar: 'الطعام والشراب', icon: '🍽️', color: '#8D6E63' },
    travel:      { es: 'Viaje',           ar: 'السفر',        icon: '🧳', color: '#26A69A' },
    home:        { es: 'Hogar',           ar: 'البيت',        icon: '🏠', color: '#9CCC65' },
    masjid:      { es: 'Mezquita',        ar: 'المسجد',       icon: '🕌', color: '#D4AF37' },
    distress:    { es: 'Angustia',        ar: 'الكرب',        icon: '💔', color: '#EF5350' },
    forgiveness: { es: 'Perdón',          ar: 'الاستغفار',     icon: '🤲', color: '#7E57C2' },
    illness:     { es: 'Enfermedad',      ar: 'المرض',        icon: '🩺', color: '#EC407A' },
    weather:     { es: 'Clima',           ar: 'الطقس',        icon: '🌦️', color: '#42A5F5' },
    knowledge:   { es: 'Conocimiento',    ar: 'العلم',        icon: '📚', color: '#5E35B1' },
    parents:     { es: 'Padres',          ar: 'الوالدين',     icon: '👨‍👩‍👦', color: '#AB47BC' },
    guidance:    { es: 'Guía',            ar: 'الهداية',      icon: '🧭', color: '#66BB6A' },
    gratitude:   { es: 'Gratitud',        ar: 'الشكر',        icon: '🙏', color: '#FFD54F' },
    protection:  { es: 'Protección',      ar: 'الحماية',      icon: '🛡️', color: '#455A64' },
    dhikr:       { es: 'Dhikr general',   ar: 'الذكر',         icon: '📿', color: '#0F4C3A' },
    marriage:    { es: 'Matrimonio',      ar: 'الزواج',       icon: '💍', color: '#EC407A' },
    hajj:        { es: 'Hajj y Umrah',    ar: 'الحج والعمرة', icon: '🕋', color: '#212121' },
    grief:       { es: 'Duelo',           ar: 'الحزن',         icon: '🕊️', color: '#78909C' },
    children:    { es: 'Niños',           ar: 'الأطفال',      icon: '👶', color: '#FFB74D' },
    business:    { es: 'Provisión',       ar: 'الرزق',        icon: '💼', color: '#8D6E63' },
    night_prayer:{ es: 'Oración nocturna',ar: 'قيام الليل',   icon: '🌃', color: '#3949AB' },
    quran_recitation: { es: 'Recitación', ar: 'تلاوة القرآن', icon: '📖', color: '#0F4C3A' },
  },

  async renderHub(container) {
    container.innerHTML = `
      <div class="top-bar">
        <button class="top-bar-btn" onclick="Router.go('wisdom')">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title">🤲 ${t('duasTitle') || "Du'as"}</div>
        <div style="width: 30px;"></div>
      </div>

      <div style="padding: var(--sp-md);">
        <p class="duas-intro">${t('duasIntro') || 'Más de 300 súplicas auténticas del Profeta ﷺ en 27 categorías.'}</p>

        <!-- Search bar -->
        <div class="duas-search-bar">
          <i class="fas fa-search"></i>
          <input type="text" id="duas-search-input" placeholder="${t('searchDuas') || 'Buscar súplicas...'}" oninput="DuasPage.onSearchInput(this.value)">
          <button id="duas-clear-search" style="display:none;" onclick="DuasPage.clearSearch()">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Random dua quick button -->
        <button class="duas-random-btn" onclick="DuasPage.showRandom()">
          <i class="fas fa-random"></i> ${t('randomDua') || "Du'a aleatoria"}
        </button>

        <!-- Categories grid -->
        <div id="duas-categories-container">
          <div class="loading-container"><div class="loader"></div></div>
        </div>
      </div>
    `;

    await this.loadCategories();
  },

  async loadCategories() {
    try {
      this.categories = await API.getDuaCategories();
      this.renderCategories();
    } catch (e) {
      const c = document.getElementById('duas-categories-container');
      if (c) c.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">⚠️</div>
          <div>${t('errorLoading') || 'Error al cargar. Verifica tu conexión.'}</div>
          <button class="btn-primary" onclick="DuasPage.loadCategories()">${t('retry') || 'Reintentar'}</button>
        </div>`;
    }
  },

  renderCategories() {
    const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
    const container = document.getElementById('duas-categories-container');
    if (!container) return;

    if (this.categories.length === 0) {
      container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📭</div><div>${t('noCategories') || 'Sin categorías disponibles'}</div></div>`;
      return;
    }

    container.innerHTML = `
      <div class="duas-cat-grid">
        ${this.categories.map(cat => {
          const meta = this.CAT_TRANSLATIONS[cat.id] || { icon: '🤲', color: '#0F4C3A' };
          const displayName = lang === 'en' ? cat.name : (meta[lang] || cat.name);
          return `
            <div class="duas-cat-card" onclick="DuasPage.openCategory('${cat.id}', '${this.escapeAttr(displayName)}')" style="border-left-color: ${meta.color};">
              <div class="duas-cat-icon" style="background: ${meta.color}22; color: ${meta.color};">${meta.icon}</div>
              <div class="duas-cat-info">
                <div class="duas-cat-name">${displayName}</div>
                <div class="duas-cat-meta">${cat.count} ${t('duas') || 'súplicas'}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="duas-credit">
        <i class="fas fa-info-circle"></i>
        ${t('duasCredit') || 'Datos proporcionados por UmmahAPI (sadaqah jariyah).'}
      </div>
    `;
  },

  async openCategory(catId, displayName) {
    const container = document.getElementById('main-content');
    container.innerHTML = `
      <div class="top-bar">
        <button class="top-bar-btn" onclick="Router.go('wisdom/duas')">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title">🤲 ${displayName}</div>
        <div style="width: 30px;"></div>
      </div>
      <div class="loading-container"><div class="loader"></div><div>${t('loading') || 'Cargando...'}</div></div>
    `;

    try {
      const duas = await API.getDuasByCategory(catId);
      this.currentCategory = catId;
      this.currentDuas = duas;
      this.renderDuasList(container, displayName, duas, catId);
    } catch (e) {
      container.innerHTML += `
        <div class="empty-state">
          <div class="empty-state-icon">⚠️</div>
          <div>${t('errorLoading') || 'Error al cargar.'}</div>
          <button class="btn-primary" onclick="DuasPage.openCategory('${catId}', '${this.escapeAttr(displayName)}')">${t('retry') || 'Reintentar'}</button>
        </div>`;
    }
  },

  renderDuasList(container, title, duas, catId) {
    const meta = this.CAT_TRANSLATIONS[catId] || { color: '#0F4C3A' };
    const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');

    container.innerHTML = `
      <div class="top-bar" style="background: linear-gradient(135deg, ${meta.color}, ${meta.color}dd);">
        <button class="top-bar-btn" onclick="Router.go('wisdom/duas')">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title" style="color:#fff;">🤲 ${title}</div>
        <div style="width: 30px;"></div>
      </div>

      <div style="padding: var(--sp-md);">
        ${duas.length === 0 ? `<div class="empty-state"><div class="empty-state-icon">📭</div><div>${t('noDuas') || 'Sin súplicas en esta categoría'}</div></div>` : duas.map((d, idx) => `
          <div class="dua-card" id="dua-${d.id}">
            <div class="dua-card-header">
              <div class="dua-title">${idx + 1}. ${d.title}</div>
              ${d.repeat > 1 ? `<div class="dua-times" style="background:${meta.color}22;color:${meta.color};">×${d.repeat}</div>` : ''}
            </div>

            <div class="dua-arabic" dir="rtl">${d.arabic || ''}</div>

            ${d.transliteration ? `<div class="dua-translit"><i class="fas fa-microphone"></i> ${d.transliteration}</div>` : ''}

            ${d.translation ? `
              <div class="dua-translation">
                <div class="dua-translation-label">${lang === 'en' ? 'Translation' : (lang === 'ar' ? 'الترجمة' : 'Traducción')}:</div>
                <div class="dua-translation-text">${this.maybeTranslate(d.translation, idx, d.id, lang)}</div>
              </div>
            ` : ''}

            ${d.source ? `<div class="dua-source"><i class="fas fa-book"></i> ${d.source}</div>` : ''}

            <div class="dua-actions">
              <button class="dua-action-btn" onclick="DuasPage.copyDua(${d.id})" title="${t('copy') || 'Copiar'}">
                <i class="fas fa-copy"></i>
              </button>
              <button class="dua-action-btn" onclick="DuasPage.shareDua(${d.id})" title="${t('share') || 'Compartir'}">
                <i class="fas fa-share-alt"></i>
              </button>
              <button class="dua-action-btn" onclick="DuasPage.bookmarkDua(${d.id})" id="bookmark-dua-${d.id}" title="${t('bookmark') || 'Marcador'}">
                <i class="${this.isBookmarked(d.id) ? 'fas' : 'far'} fa-bookmark"></i>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Auto-translate translations for non-English locales in background
    if (lang !== 'en' && duas.length > 0) {
      this.autoTranslateAll(duas, lang);
    }
  },

  // Show translation cell; if not English, fetch translation via MyMemory
  maybeTranslate(englishText, idx, duaId, lang) {
    if (lang === 'en' || !englishText) return englishText || '';
    // Show original first, will be replaced by translation when ready
    return `<span class="dua-trans-pending" id="trans-${duaId}">${englishText}</span>`;
  },

  async autoTranslateAll(duas, lang) {
    if (lang === 'en') return;
    for (const d of duas) {
      if (!d.translation) continue;
      const cacheKey = `dua_trans_${d.id}_${lang}`;
      let translated = Storage.get(cacheKey);
      if (!translated) {
        try {
          translated = await this.translateText(d.translation, 'en', lang);
          if (translated) Storage.set(cacheKey, translated, 30 * 24 * 60 * 60 * 1000);
        } catch (e) {
          continue;
        }
      }
      const el = document.getElementById('trans-' + d.id);
      if (el && translated) {
        el.textContent = translated;
        el.classList.remove('dua-trans-pending');
      }
      // small delay so we don't hammer the API
      await new Promise(r => setTimeout(r, 200));
    }
  },

  async translateText(text, source, target) {
    if (!text || text.length > 480) {
      // Use TafsirService chunking if available
      if (typeof TafsirService !== 'undefined' && TafsirService.translateLongText) {
        return await TafsirService.translateLongText(text, source, target);
      }
    }
    // Single-shot MyMemory
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}&de=app@quba.local`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('translate failed');
    const json = await res.json();
    const out = json?.responseData?.translatedText || '';
    if (out.toUpperCase().includes('MYMEMORY WARNING')) throw new Error('quota');
    return out;
  },

  // === Search ===
  onSearchInput(value) {
    const clearBtn = document.getElementById('duas-clear-search');
    if (clearBtn) clearBtn.style.display = value ? 'inline-block' : 'none';

    clearTimeout(this._searchTimer);
    if (!value || value.length < 2) {
      this.searchResults = null;
      this.renderCategories();
      return;
    }
    this._searchTimer = setTimeout(() => this.performSearch(value), 400);
  },

  async performSearch(query) {
    const container = document.getElementById('duas-categories-container');
    if (container) container.innerHTML = `<div class="loading-container"><div class="loader"></div></div>`;

    const results = await API.searchDuas(query);
    this.searchResults = results;
    this.renderSearchResults(query);
  },

  renderSearchResults(query) {
    const container = document.getElementById('duas-categories-container');
    if (!container) return;
    const results = this.searchResults || [];
    container.innerHTML = `
      <div class="search-results-header">
        <i class="fas fa-search"></i> ${results.length} ${t('resultsFor') || 'resultados para'} "<strong>${this.escapeAttr(query)}</strong>"
      </div>
      ${results.length === 0 ? `<div class="empty-state"><div class="empty-state-icon">🔍</div><div>${t('noResults') || 'Sin resultados'}</div></div>` : results.map(d => `
        <div class="dua-card" id="dua-${d.id}">
          <div class="dua-card-header">
            <div class="dua-title">${d.title}</div>
            ${d.category ? `<div class="dua-times" style="background:rgba(15,76,58,0.1);color:#0F4C3A;">${d.category}</div>` : ''}
          </div>
          <div class="dua-arabic" dir="rtl">${d.arabic || ''}</div>
          ${d.transliteration ? `<div class="dua-translit">${d.transliteration}</div>` : ''}
          ${d.translation ? `<div class="dua-translation"><div class="dua-translation-text">${d.translation}</div></div>` : ''}
          ${d.source ? `<div class="dua-source"><i class="fas fa-book"></i> ${d.source}</div>` : ''}
        </div>
      `).join('')}
    `;
  },

  clearSearch() {
    const input = document.getElementById('duas-search-input');
    if (input) input.value = '';
    this.searchResults = null;
    document.getElementById('duas-clear-search').style.display = 'none';
    this.renderCategories();
  },

  // === Random dua ===
  async showRandom() {
    showToast('🎲 ' + (t('loading') || 'Cargando...'), 1000);
    const dua = await API.getRandomDua();
    if (!dua) {
      showToast('⚠️ ' + (t('errorLoading') || 'Error al cargar'), 2000);
      return;
    }
    // Show in modal
    this.renderDuaModal(dua);
  },

  renderDuaModal(d) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay-simple';
    overlay.onclick = e => { if (e.target === overlay) overlay.remove(); };
    overlay.innerHTML = `
      <div class="modal-simple">
        <div class="modal-simple-header">
          <h3>🎲 ${t('randomDua') || "Du'a aleatoria"}</h3>
          <button class="modal-close" onclick="this.closest('.modal-overlay-simple').remove()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="dua-card">
          <div class="dua-title">${d.title || ''}</div>
          <div class="dua-arabic" dir="rtl">${d.arabic || ''}</div>
          ${d.transliteration ? `<div class="dua-translit">${d.transliteration}</div>` : ''}
          ${d.translation ? `<div class="dua-translation"><div class="dua-translation-text">${d.translation}</div></div>` : ''}
          ${d.source ? `<div class="dua-source"><i class="fas fa-book"></i> ${d.source}</div>` : ''}
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  },

  // === Actions ===
  copyDua(duaId) {
    const dua = this.currentDuas.find(d => d.id === duaId);
    if (!dua) return;
    const text = `${dua.title}\n\n${dua.arabic}\n\n${dua.transliteration || ''}\n\n${dua.translation || ''}\n\n— ${dua.source || ''}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('📋 ' + (t('copied') || 'Copiado'), 1500);
      });
    }
  },

  shareDua(duaId) {
    const dua = this.currentDuas.find(d => d.id === duaId);
    if (!dua) return;
    const text = `${dua.title}\n\n${dua.arabic}\n\n${dua.translation || ''}\n\n— ${dua.source || ''}\n\n📱 Quba App`;
    if (navigator.share) {
      navigator.share({ title: dua.title, text }).catch(() => {});
    } else {
      this.copyDua(duaId);
    }
  },

  bookmarkDua(duaId) {
    let bookmarks = Storage.get('dua_bookmarks') || [];
    const idx = bookmarks.indexOf(duaId);
    const btn = document.getElementById('bookmark-dua-' + duaId);
    if (idx >= 0) {
      bookmarks.splice(idx, 1);
      if (btn) btn.innerHTML = '<i class="far fa-bookmark"></i>';
    } else {
      bookmarks.push(duaId);
      if (btn) btn.innerHTML = '<i class="fas fa-bookmark"></i>';
      showToast('🔖 ' + (t('bookmarked') || 'Guardado'), 1200);
    }
    Storage.set('dua_bookmarks', bookmarks);
  },

  isBookmarked(duaId) {
    const bookmarks = Storage.get('dua_bookmarks') || [];
    return bookmarks.includes(duaId);
  },

  escapeAttr(s) {
    return String(s || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
  },

  cleanup() {
    clearTimeout(this._searchTimer);
  },
};
