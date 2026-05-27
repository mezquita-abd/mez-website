// 📖 Pantalla del Corán
const QuranPage = {
  surahs: [],
  currentAudio: null,
  playingAyah: null,

  async render(container) {
    container.innerHTML = `
      <div class="page-header">
        <div class="page-title">📖 ${t('tabQuran')}</div>
        <div class="page-subtitle">القرآن الكريم</div>
        <div class="page-meta">114 ${t('surahs').toLowerCase()}</div>
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input type="text" id="surah-search" placeholder="${t('searchSurah')}">
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
          const q = e.target.value.toLowerCase().trim();
          if (!q) return this.renderList(this.surahs);
          const filtered = this.surahs.filter(s =>
            s.englishName?.toLowerCase().includes(q) ||
            s.englishNameTranslation?.toLowerCase().includes(q) ||
            String(s.number).includes(q) ||
            s.name?.includes(e.target.value)
          );
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
    container.innerHTML = surahs.map(s => `
      <div class="surah-card" onclick="QuranPage.openSurah(${s.number})">
        <div class="surah-number"><span>${s.number}</span></div>
        <div class="surah-info">
          <div class="surah-name">${s.englishName}</div>
          <div class="surah-meta">${s.englishNameTranslation} • ${s.numberOfAyahs} ${t('ayah').toLowerCase()}s • ${s.revelationType === 'Meccan' ? t('meccan') : t('medinan')}</div>
        </div>
        <div class="surah-arabic-name">${s.name}</div>
      </div>
    `).join('');
  },

  async openSurah(number) {
    Router.push('surah', { surahNumber: number });
  },

  async renderDetail(container, params) {
    const surahNumber = params.surahNumber;
    container.innerHTML = `
      <div class="top-bar">
        <button class="top-bar-btn" onclick="Router.back()">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title">Cargando...</div>
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

      container.innerHTML = `
        <div class="top-bar">
          <button class="top-bar-btn" onclick="Router.back()">
            <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
          </button>
          <div class="top-bar-title">${surah.englishName}</div>
          <div style="width: 30px;"></div>
        </div>

        <div style="padding: var(--sp-md);">
          <div class="surah-detail-header">
            <div class="sd-arabic">${surah.name}</div>
            <div class="sd-english">${surah.englishName}</div>
            <div class="sd-meaning">${surah.englishNameTranslation}</div>
            <div class="sd-meta-bar">
              <div class="sd-meta-item">
                <div class="sd-meta-value">${surah.numberOfAyahs}</div>
                <div class="sd-meta-label">${t('ayah')}s</div>
              </div>
              <div class="sd-meta-item">
                <div class="sd-meta-value">${surah.revelationType === 'Meccan' ? '🕋' : '🕌'}</div>
                <div class="sd-meta-label">${surah.revelationType === 'Meccan' ? t('meccan') : t('medinan')}</div>
              </div>
            </div>
            ${(surah.number !== 1 && surah.number !== 9) ? `
              <div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            ` : ''}
          </div>

          ${surah.ayahs.map(a => `
            <div class="ayah-card">
              <div class="ayah-header">
                <div class="ayah-number">${a.number}</div>
                <button class="ayah-play-btn" id="play-${a.number}" onclick="QuranPage.playAyah(${a.number}, '${a.audio}')">
                  <i class="fas fa-play"></i>
                </button>
              </div>
              <div class="ayah-arabic">${a.arabic}</div>
              ${a.translation ? `<div class="ayah-translation">${a.translation}</div>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    } catch (e) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">⚠️</div>
          <div class="empty-state-text">${t('error')}: ${e.message}</div>
        </div>
      `;
    }
  },

  playAyah(num, audioUrl) {
    const player = document.getElementById('audio-player');
    if (!player || !audioUrl || audioUrl === 'null') return;

    // Detener anterior
    if (this.playingAyah !== null) {
      const prevBtn = document.getElementById('play-' + this.playingAyah);
      if (prevBtn) {
        prevBtn.classList.remove('playing');
        prevBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
    }

    if (this.playingAyah === num) {
      player.pause();
      this.playingAyah = null;
      return;
    }

    player.src = audioUrl;
    player.play().catch(e => console.warn('Audio play error:', e));
    this.playingAyah = num;

    const btn = document.getElementById('play-' + num);
    if (btn) {
      btn.classList.add('playing');
      btn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    player.onended = () => {
      const b = document.getElementById('play-' + num);
      if (b) {
        b.classList.remove('playing');
        b.innerHTML = '<i class="fas fa-play"></i>';
      }
      this.playingAyah = null;
    };
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
