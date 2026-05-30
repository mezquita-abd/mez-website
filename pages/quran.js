// 📖 Pantalla del Corán - v3 (estilo Muslim Pro + Ayah)
const QuranPage = {
  surahs: [],
  currentAudio: null,
  playingAyah: null,
  currentSurah: null,

  // Reader display settings (persisted)
  readerSettings: null,

  loadReaderSettings() {
    this.readerSettings = Storage.get('reader_settings') || {
      showTransliteration: true,
      showTranslation: true,
      fontSize: 'medium', // small | medium | large | xlarge
      tafsir: 'ar.muyassar',
    };
    return this.readerSettings;
  },

  saveReaderSettings() {
    Storage.set('reader_settings', this.readerSettings);
  },

  // ============ SURAH LIST ============
  async render(container) {
    this.loadReaderSettings();

    container.innerHTML = `
      <div class="page-header quran-list-header">
        <div class="page-title">📖 ${t('tabQuran')}</div>
        <div class="page-subtitle">القرآن الكريم</div>
        <div class="page-meta">114 ${t('surahs').toLowerCase()}</div>
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input type="text" id="surah-search" placeholder="${t('searchSurah')}" autocomplete="off">
        </div>
      </div>
      <div id="surah-list" style="padding: var(--sp-md);">
        <div class="loading-container">
          <div class="loader"></div>
          <div>${t('loading')}</div>
        </div>
      </div>
    `;

    try {
      this.surahs = await API.getSurahList();
      this.renderList(this.surahs);

      const search = document.getElementById('surah-search');
      if (search) {
        search.addEventListener('input', e => {
          const query = e.target.value.trim();
          if (!query) return this.renderList(this.surahs);
          // Use QuranHelpers.surahMatches which strips tashkeel
          const filtered = this.surahs.filter(s => QuranHelpers.surahMatches(s, query));
          this.renderList(filtered);
        });
      }
    } catch (e) {
      document.getElementById('surah-list').innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">⚠️</div>
          <div class="empty-state-text">${t('error')}: ${e.message}</div>
        </div>
      `;
    }
  },

  renderList(surahs) {
    const container = document.getElementById('surah-list');
    if (!container) return;
    if (surahs.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <div class="empty-state-text">No se encontraron suras</div>
        </div>
      `;
      return;
    }
    container.innerHTML = surahs.map(s => {
      // Display normalized name (without tashkeel) for cleaner look
      const cleanArName = QuranHelpers.removeTashkeel(s.name);
      return `
        <div class="surah-card" onclick="QuranPage.openSurah(${s.number})">
          <div class="surah-number"><span>${s.number}</span></div>
          <div class="surah-info">
            <div class="surah-name">${s.englishName}</div>
            <div class="surah-meta">${s.englishNameTranslation} • ${s.numberOfAyahs} ${t('ayah').toLowerCase()}s • ${s.revelationType === 'Meccan' ? t('meccan') : t('medinan')}</div>
          </div>
          <div class="surah-arabic-name">${cleanArName}</div>
        </div>
      `;
    }).join('');
  },

  async openSurah(number) {
    Router.push('surah', { surahNumber: number });
  },

  // ============ SURAH DETAIL (Mushaf-style page) ============
  async renderDetail(container, params) {
    this.loadReaderSettings();
    const surahNumber = parseInt(params.surahNumber, 10);
    const targetAyah = params.ayah ? parseInt(params.ayah, 10) : null;

    container.innerHTML = `
      <div class="top-bar reader-top-bar">
        <button class="top-bar-btn" onclick="QuranPage.backToList()">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title">${t('loading')}...</div>
        <div style="width: 30px;"></div>
      </div>
      <div style="padding: var(--sp-md);">
        <div class="loading-container">
          <div class="loader"></div>
        </div>
      </div>
    `;

    try {
      const surah = await API.getSurahWithTranslation(
        surahNumber,
        AppState.settings.translation,
        AppState.settings.reciter
      );
      this.currentSurah = surah;

      // If first ayah of non-Fatihah surah contains Bismillah, strip it
      if (QuranHelpers.shouldShowBismillah(surah.number) && surah.ayahs[0]) {
        surah.ayahs[0].arabicDisplay = QuranHelpers.stripBismillahFromFirstAyah(surah.ayahs[0].arabic);
      } else {
        surah.ayahs.forEach(a => a.arabicDisplay = a.arabic);
      }
      // For all other ayahs, just use the original
      surah.ayahs.forEach(a => {
        if (a.arabicDisplay === undefined) a.arabicDisplay = a.arabic;
      });

      this.renderReader(container, surah);

      // Scroll to target ayah if specified
      if (targetAyah) {
        setTimeout(() => this.scrollToAyah(targetAyah, true), 200);
      }
    } catch (e) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">⚠️</div>
          <div class="empty-state-text">${t('error')}: ${e.message}</div>
          <button class="btn-primary empty-state-btn" onclick="QuranPage.backToList()">Volver</button>
        </div>
      `;
    }
  },

  renderReader(container, surah) {
    const cleanArName = QuranHelpers.removeTashkeel(surah.name);
    const showBismillah = QuranHelpers.shouldShowBismillah(surah.number);
    const s = this.readerSettings;

    container.innerHTML = `
      <!-- Top bar with navigation -->
      <div class="top-bar reader-top-bar">
        <button class="top-bar-btn" onclick="QuranPage.backToList()" title="${t('surahs')}">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title-container">
          <div class="top-bar-title">${surah.englishName}</div>
          <div class="top-bar-subtitle">${surah.englishNameTranslation} · ${surah.numberOfAyahs} ${t('ayah').toLowerCase()}s</div>
        </div>
        <button class="top-bar-btn" onclick="QuranPage.openReaderSettings()" title="${t('settings_reader')}">
          <i class="fas fa-sliders-h"></i>
        </button>
      </div>

      <!-- Quick navigation toolbar -->
      <div class="reader-toolbar">
        <button class="toolbar-btn" onclick="QuranPage.openSurahPicker()" title="${t('surahs')}">
          <i class="fas fa-list-ul"></i> <span>${surah.number}. ${surah.englishName}</span>
        </button>
        <button class="toolbar-btn" onclick="QuranPage.openAyahPicker()" title="${t('jumpToAyah')}">
          <i class="fas fa-bookmark"></i> <span>${t('ayah')} ${1}</span>
        </button>
      </div>

      <!-- Mushaf-style page -->
      <div class="mushaf-page font-${s.fontSize}" id="mushaf-page">
        <!-- Surah header ornament -->
        <div class="surah-banner">
          <div class="surah-banner-decoration">۞</div>
          <div class="surah-banner-content">
            <div class="surah-banner-arabic">${cleanArName}</div>
            <div class="surah-banner-en">${surah.englishName} · ${surah.englishNameTranslation}</div>
            <div class="surah-banner-meta">
              <span><i class="fas fa-${surah.revelationType === 'Meccan' ? 'kaaba' : 'mosque'}"></i> ${surah.revelationType === 'Meccan' ? t('meccan') : t('medinan')}</span>
              <span class="dot-sep">•</span>
              <span>${surah.numberOfAyahs} ${t('ayah').toLowerCase()}s</span>
            </div>
          </div>
          <div class="surah-banner-decoration">۞</div>
        </div>

        ${showBismillah ? `
          <div class="bismillah-row">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </div>
        ` : ''}

        <!-- Ayahs container -->
        <div class="ayahs-container" id="ayahs-container">
          ${surah.ayahs.map((a, idx) => this.renderAyah(a, idx, surah)).join('')}
        </div>

        <!-- Surah navigation footer -->
        <div class="surah-nav-footer">
          ${surah.number > 1 ? `
            <button class="nav-btn prev" onclick="QuranPage.goToSurah(${surah.number - 1})">
              <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
              <div class="nav-btn-text">
                <div class="nav-btn-label">${t('previousSurah')}</div>
                <div class="nav-btn-name">${surah.number - 1}. ${this.getSurahNameByNumber(surah.number - 1)}</div>
              </div>
            </button>
          ` : '<div></div>'}
          ${surah.number < 114 ? `
            <button class="nav-btn next" onclick="QuranPage.goToSurah(${surah.number + 1})">
              <div class="nav-btn-text">
                <div class="nav-btn-label">${t('nextSurah')}</div>
                <div class="nav-btn-name">${surah.number + 1}. ${this.getSurahNameByNumber(surah.number + 1)}</div>
              </div>
              <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'}"></i>
            </button>
          ` : '<div></div>'}
        </div>
      </div>

      <!-- Floating ayah picker FAB -->
      <button class="ayah-fab" onclick="QuranPage.openAyahPicker()" title="${t('jumpToAyah')}">
        <i class="fas fa-search"></i>
      </button>
    `;
  },

  renderAyah(a, idx, surah) {
    const s = this.readerSettings;

    // Hide transliteration if it would be Arabic for Arabic users
    const showTranslit = s.showTransliteration && currentLocale !== 'ar' && a.transliteration;
    const showTrans = s.showTranslation;

    return `
      <div class="ayah-block" id="ayah-${a.number}" data-ayah="${a.number}">
        <!-- Arabic text with end marker -->
        <div class="ayah-arabic-line" dir="rtl">
          <span class="ayah-arabic-text">${a.arabicDisplay || a.arabic}</span>
          <span class="ayah-end-marker">﴿${a.number}﴾</span>
        </div>

        ${showTranslit ? `
          <div class="ayah-transliteration">
            <span class="translit-label">📢</span>
            ${a.transliteration}
          </div>
        ` : ''}

        ${showTrans && a.translation ? `
          <div class="ayah-translation">
            ${a.translation}
          </div>
        ` : ''}

        <!-- Action toolbar per ayah -->
        <div class="ayah-actions">
          <button class="ayah-action-btn" onclick="QuranPage.playAyah(${a.number}, '${a.audio || ''}')" id="play-btn-${a.number}" title="${t('play')}">
            <i class="fas fa-play"></i>
          </button>
          <button class="ayah-action-btn tafsir-btn" onclick="QuranPage.openTafsir(${surah.number}, ${a.number})" title="${t('tafsir')}">
            <i class="fas fa-book"></i> <span>${t('tafsir')}</span>
          </button>
          <button class="ayah-action-btn" onclick="QuranPage.shareAyah(${surah.number}, ${a.number})" title="${t('share')}">
            <i class="fas fa-share-alt"></i>
          </button>
          <button class="ayah-action-btn" onclick="QuranPage.toggleBookmark(${surah.number}, ${a.number})" id="bookmark-${a.number}" title="${t('bookmark')}">
            <i class="far fa-bookmark"></i>
          </button>
        </div>
      </div>
    `;
  },

  // ============ NAVIGATION ============
  backToList() {
    this.cleanup();
    Router.go('quran');
  },

  goToSurah(num) {
    if (num < 1 || num > 114) return;
    this.cleanup();
    Router.push('surah', { surahNumber: num });
  },

  scrollToAyah(ayahNumber, highlight = false) {
    const el = document.getElementById(`ayah-${ayahNumber}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (highlight) {
        el.classList.add('highlight');
        setTimeout(() => el.classList.remove('highlight'), 2000);
      }
    }
  },

  getSurahNameByNumber(num) {
    const s = this.surahs.find(x => x.number === num);
    return s ? s.englishName : '';
  },

  // ============ SURAH / AYAH PICKERS ============
  openSurahPicker() {
    const current = this.currentSurah?.number;
    const html = `
      <div class="modal-header">
        <div class="modal-title">${t('surahs')}</div>
        <button class="modal-close" onclick="closeModal()">×</button>
      </div>
      <div class="picker-search">
        <i class="fas fa-search"></i>
        <input type="text" id="picker-search-input" placeholder="${t('searchSurah')}" autocomplete="off">
      </div>
      <div class="picker-list" id="picker-list">
        ${this.renderPickerList(this.surahs, current)}
      </div>
    `;
    document.getElementById('modal-content').innerHTML = html;
    document.getElementById('modal-overlay').classList.remove('hidden');

    // Live search
    document.getElementById('picker-search-input')?.addEventListener('input', e => {
      const q = e.target.value.trim();
      const filtered = q ? this.surahs.filter(s => QuranHelpers.surahMatches(s, q)) : this.surahs;
      document.getElementById('picker-list').innerHTML = this.renderPickerList(filtered, current);
    });

    // Scroll current into view
    setTimeout(() => {
      const el = document.querySelector('.picker-item.current');
      if (el) el.scrollIntoView({ block: 'center' });
    }, 100);
  },

  renderPickerList(surahs, current) {
    if (!surahs.length) return '<div class="empty-state-mini">No se encontraron suras</div>';
    return surahs.map(s => {
      const cleanName = QuranHelpers.removeTashkeel(s.name);
      const isCurrent = s.number === current;
      return `
        <div class="picker-item ${isCurrent ? 'current' : ''}" onclick="QuranPage.pickSurah(${s.number})">
          <div class="picker-num">${s.number}</div>
          <div class="picker-info">
            <div class="picker-name">${s.englishName}</div>
            <div class="picker-meta">${s.englishNameTranslation} · ${s.numberOfAyahs} ${t('ayah').toLowerCase()}s</div>
          </div>
          <div class="picker-arabic">${cleanName}</div>
        </div>
      `;
    }).join('');
  },

  pickSurah(num) {
    closeModal();
    this.goToSurah(num);
  },

  openAyahPicker() {
    if (!this.currentSurah) return;
    const total = this.currentSurah.numberOfAyahs;

    // Create grid of ayah numbers (10 per row)
    const grid = [];
    for (let i = 1; i <= total; i++) grid.push(i);

    const html = `
      <div class="modal-header">
        <div class="modal-title">${t('jumpToAyah')} (1-${total})</div>
        <button class="modal-close" onclick="closeModal()">×</button>
      </div>
      <div class="picker-search">
        <i class="fas fa-hashtag"></i>
        <input type="number" id="ayah-input" min="1" max="${total}" placeholder="${t('ayah')} #" autocomplete="off">
        <button class="btn-primary" style="padding: 8px 16px;" onclick="QuranPage.jumpToInputAyah()">${t('jumpToAyah')}</button>
      </div>
      <div class="ayah-number-grid">
        ${grid.map(n => `
          <button class="ayah-num-btn" onclick="QuranPage.jumpToAyahInPage(${n})">${n}</button>
        `).join('')}
      </div>
    `;
    document.getElementById('modal-content').innerHTML = html;
    document.getElementById('modal-overlay').classList.remove('hidden');

    setTimeout(() => document.getElementById('ayah-input')?.focus(), 100);

    // Enter key support
    document.getElementById('ayah-input')?.addEventListener('keypress', e => {
      if (e.key === 'Enter') this.jumpToInputAyah();
    });
  },

  jumpToInputAyah() {
    const input = document.getElementById('ayah-input');
    if (!input) return;
    const n = parseInt(input.value, 10);
    if (n && n >= 1 && n <= this.currentSurah.numberOfAyahs) {
      this.jumpToAyahInPage(n);
    }
  },

  jumpToAyahInPage(ayahNumber) {
    closeModal();
    this.scrollToAyah(ayahNumber, true);
  },

  // ============ READER SETTINGS ============
  openReaderSettings() {
    const s = this.readerSettings;
    const html = `
      <div class="modal-header">
        <div class="modal-title">${t('settings_reader')}</div>
        <button class="modal-close" onclick="closeModal()">×</button>
      </div>

      <div class="settings-group">
        <div class="settings-label">${t('fontSize')}</div>
        <div class="font-size-options">
          ${['small', 'medium', 'large', 'xlarge'].map(size => `
            <button class="font-opt ${s.fontSize === size ? 'active' : ''}" onclick="QuranPage.setFontSize('${size}')">
              <span class="font-opt-letter font-${size}-preview">أ</span>
              <span class="font-opt-label">${size === 'small' ? 'A' : size === 'medium' ? 'AA' : size === 'large' ? 'AAA' : 'AAAA'}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div class="settings-group">
        <label class="settings-toggle">
          <span>${t('transliteration')} (latín)</span>
          <input type="checkbox" ${s.showTransliteration ? 'checked' : ''} onchange="QuranPage.toggleSetting('showTransliteration', this.checked)">
          <span class="toggle-slider"></span>
        </label>
        <label class="settings-toggle">
          <span>${t('translation')}</span>
          <input type="checkbox" ${s.showTranslation ? 'checked' : ''} onchange="QuranPage.toggleSetting('showTranslation', this.checked)">
          <span class="toggle-slider"></span>
        </label>
      </div>

      <div class="settings-group">
        <div class="settings-label">${t('selectTafsir')}</div>
        ${TafsirService.getAvailableTafsirs().map(tf => `
          <div class="tafsir-option ${s.tafsir === tf.id ? 'active' : ''}" onclick="QuranPage.setTafsir('${tf.id}')">
            <div class="tafsir-opt-info">
              <div class="tafsir-opt-name">${tf.name}</div>
              <div class="tafsir-opt-desc">${tf.desc}</div>
            </div>
            ${s.tafsir === tf.id ? '<i class="fas fa-check-circle"></i>' : ''}
          </div>
        `).join('')}
      </div>
    `;
    document.getElementById('modal-content').innerHTML = html;
    document.getElementById('modal-overlay').classList.remove('hidden');
  },

  setFontSize(size) {
    this.readerSettings.fontSize = size;
    this.saveReaderSettings();
    const page = document.getElementById('mushaf-page');
    if (page) {
      page.classList.remove('font-small', 'font-medium', 'font-large', 'font-xlarge');
      page.classList.add(`font-${size}`);
    }
    document.querySelectorAll('.font-opt').forEach(b => b.classList.remove('active'));
    event?.target?.closest('.font-opt')?.classList.add('active');
  },

  toggleSetting(key, value) {
    this.readerSettings[key] = value;
    this.saveReaderSettings();
    // Re-render ayahs section
    if (this.currentSurah) {
      const cont = document.getElementById('ayahs-container');
      if (cont) {
        cont.innerHTML = this.currentSurah.ayahs.map((a, idx) =>
          this.renderAyah(a, idx, this.currentSurah)
        ).join('');
      }
    }
  },

  setTafsir(tafsirId) {
    this.readerSettings.tafsir = tafsirId;
    this.saveReaderSettings();
    document.querySelectorAll('.tafsir-option').forEach(o => o.classList.remove('active'));
    event?.target?.closest('.tafsir-option')?.classList.add('active');
    showToast('Tafsir actualizado');
  },

  // ============ TAFSIR ============
  async openTafsir(surahNum, ayahNum) {
    const html = `
      <div class="modal-header">
        <div class="modal-title">${t('tafsirOf')} ${surahNum}:${ayahNum}</div>
        <button class="modal-close" onclick="closeModal()">×</button>
      </div>
      <div class="tafsir-content" id="tafsir-content">
        <div class="loading-container">
          <div class="loader"></div>
          <div>${t('loading')}</div>
        </div>
      </div>
    `;
    document.getElementById('modal-content').innerHTML = html;
    document.getElementById('modal-overlay').classList.remove('hidden');

    try {
      const tafsir = await TafsirService.getTafsir(
        surahNum, ayahNum,
        this.readerSettings.tafsir,
        currentLocale === 'ar' ? 'ar' : currentLocale
      );

      // Get the original ayah for context
      const ayah = this.currentSurah?.ayahs.find(a => a.number === ayahNum);

      const targetLangLabel = {
        es: 'Español', en: 'English', ar: 'العربية'
      }[currentLocale] || currentLocale;

      const content = document.getElementById('tafsir-content');
      if (!content) return;

      content.innerHTML = `
        ${ayah ? `
          <div class="tafsir-ayah-preview">
            <div class="tafsir-ayah-arabic" dir="rtl">${ayah.arabic}</div>
            ${ayah.translation && currentLocale !== 'ar' ? `<div class="tafsir-ayah-trans">"${ayah.translation}"</div>` : ''}
          </div>
        ` : ''}

        <div class="tafsir-source-line">
          <i class="fas fa-book"></i>
          ${t('tafsirSource')}: <strong>${tafsir.source}</strong> ${tafsir.sourceAr ? `(${tafsir.sourceAr})` : ''}
        </div>

        ${tafsir.translated && currentLocale !== 'ar' ? `
          <div class="tafsir-tabs">
            <button class="tafsir-tab active" onclick="QuranPage.switchTafsirTab(this, 'translated')">${targetLangLabel}</button>
            <button class="tafsir-tab" onclick="QuranPage.switchTafsirTab(this, 'arabic')">${t('arabicOriginal')}</button>
          </div>

          <div class="tafsir-body tafsir-body-translated" id="tafsir-translated">
            ${tafsir.translated}
            <div class="tafsir-disclaimer">
              <i class="fas fa-info-circle"></i> ${t('translatedAuto')} — Para mayor precisión, consulte el texto original árabe.
            </div>
          </div>

          <div class="tafsir-body tafsir-body-arabic" id="tafsir-arabic" style="display: none;" dir="rtl">
            ${tafsir.arabic}
          </div>
        ` : `
          <div class="tafsir-body" dir="rtl">
            ${tafsir.arabic}
          </div>
        `}
      `;
    } catch (e) {
      const content = document.getElementById('tafsir-content');
      if (content) {
        content.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-icon">⚠️</div>
            <div class="empty-state-text">No se pudo cargar el tafsir.<br>${e.message}</div>
          </div>
        `;
      }
    }
  },

  switchTafsirTab(btn, tab) {
    document.querySelectorAll('.tafsir-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tafsir-translated').style.display = tab === 'translated' ? 'block' : 'none';
    document.getElementById('tafsir-arabic').style.display = tab === 'arabic' ? 'block' : 'none';
  },

  // ============ AUDIO ============
  playAyah(num, audioUrl) {
    const player = document.getElementById('audio-player');
    if (!player || !audioUrl || audioUrl === 'null' || audioUrl === '') return;

    if (this.playingAyah !== null) {
      const prevBtn = document.getElementById('play-btn-' + this.playingAyah);
      if (prevBtn) prevBtn.innerHTML = '<i class="fas fa-play"></i>';
    }

    if (this.playingAyah === num) {
      player.pause();
      this.playingAyah = null;
      return;
    }

    player.src = audioUrl;
    player.play().catch(e => console.warn('Audio play error:', e));
    this.playingAyah = num;

    const btn = document.getElementById('play-btn-' + num);
    if (btn) btn.innerHTML = '<i class="fas fa-pause"></i>';

    // Highlight currently playing ayah
    document.querySelectorAll('.ayah-block').forEach(b => b.classList.remove('playing'));
    document.getElementById(`ayah-${num}`)?.classList.add('playing');

    player.onended = () => {
      const b = document.getElementById('play-btn-' + num);
      if (b) b.innerHTML = '<i class="fas fa-play"></i>';
      document.getElementById(`ayah-${num}`)?.classList.remove('playing');
      this.playingAyah = null;
      // Auto-play next ayah
      const next = this.currentSurah?.ayahs.find(a => a.number === num + 1);
      if (next) {
        this.scrollToAyah(num + 1);
        this.playAyah(num + 1, next.audio);
      }
    };
  },

  // ============ BOOKMARKS & SHARE ============
  toggleBookmark(surahNum, ayahNum) {
    const bookmarks = Storage.get('bookmarks') || [];
    const key = `${surahNum}:${ayahNum}`;
    const idx = bookmarks.indexOf(key);
    const btn = document.getElementById(`bookmark-${ayahNum}`);
    if (idx >= 0) {
      bookmarks.splice(idx, 1);
      if (btn) btn.innerHTML = '<i class="far fa-bookmark"></i>';
      showToast('Marcador eliminado');
    } else {
      bookmarks.push(key);
      if (btn) btn.innerHTML = '<i class="fas fa-bookmark" style="color: var(--accent);"></i>';
      showToast('✓ Marcador guardado');
    }
    Storage.set('bookmarks', bookmarks);
  },

  async shareAyah(surahNum, ayahNum) {
    const ayah = this.currentSurah?.ayahs.find(a => a.number === ayahNum);
    if (!ayah) return;
    const text = `${ayah.arabic}\n\n"${ayah.translation}"\n\n— ${this.currentSurah.englishName} ${surahNum}:${ayahNum}\n\nVía Quba 🕌`;
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (e) {}
    } else {
      try {
        await navigator.clipboard.writeText(text);
        showToast('📋 Copiado al portapapeles');
      } catch (e) {
        showToast('No se pudo compartir');
      }
    }
  },

  cleanup() {
    const player = document.getElementById('audio-player');
    if (player) {
      player.pause();
      player.src = '';
    }
    this.playingAyah = null;
  },
};
