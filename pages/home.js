// 🏠 Pantalla de Inicio
const HomePage = {
  countdownInterval: null,

  async render(container) {
    container.innerHTML = `
      <div class="loading-container">
        <div class="loader"></div>
        <div>${t('loading')}</div>
      </div>
    `;

    try {
      const loc = AppState.location || await LocationService.getCurrent();
      AppState.location = loc;

      const [timings, hijri, verse] = await Promise.all([
        API.getPrayerTimes(loc.latitude, loc.longitude, new Date(), AppState.settings.calculationMethod),
        API.gregorianToHijri(),
        API.getVerseOfTheDay(AppState.settings.translation),
      ]);

      AppState.timings = timings.timings;
      AppState.hijri = hijri;

      const dua = getDuaOfTheDay();
      const virtue = hijri ? getDailyVirtue(
        parseInt(hijri.month?.number, 10),
        parseInt(hijri.day, 10),
        new Date().getDay()
      ) : null;

      this.renderContent(container, loc, timings.timings, hijri, verse, dua, virtue);
      this.startCountdown();
    } catch (e) {
      console.warn('Home error:', e);
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🕌</div>
          <div class="empty-state-text">${t('locationDesc')}</div>
          <button class="btn-primary empty-state-btn" onclick="HomePage.render(document.getElementById('main-content'))">
            ${t('grantPermission')}
          </button>
        </div>
      `;
    }
  },

  renderContent(container, loc, timings, hijri, verse, dua, virtue) {
    const dailyPrayers = getDailyPrayers(timings);
    const nextPrayer = getNextPrayer(timings);

    container.innerHTML = `
      <div class="home-header">
        <div class="home-top">
          <div>
            <div class="home-greeting">${getGreetingByHour()}</div>
            <div class="home-location">📍 ${loc.city || ''}${loc.country ? ', ' + loc.country : ''}</div>
            ${hijri ? `<div class="home-hijri">${hijri.day} ${hijri.month?.en} ${hijri.year} هـ</div>` : ''}
          </div>
          <button class="home-profile-btn" onclick="Router.go('profile')">
            <i class="fas fa-user-circle"></i>
          </button>
        </div>

        ${nextPrayer ? `
          <div class="next-prayer-card">
            <div class="next-prayer-label">${t('nextPrayer')}</div>
            <div class="next-prayer-name">${t('prayers.' + nextPrayer.name)}</div>
            <div class="next-prayer-countdown" id="countdown">${formatCountdown(nextPrayer.diffMs)}</div>
            <div class="next-prayer-time">${formatTime12h(nextPrayer.time)}</div>
          </div>
        ` : ''}
      </div>

      <div style="padding: var(--sp-md);">
        <!-- Oraciones del día -->
        <h2 class="section-title">${t('todayPrayers')}</h2>
        <div class="card prayers-card">
          ${dailyPrayers.map(p => `
            <div class="prayer-row ${nextPrayer?.name === p.name ? 'next' : ''}">
              <span class="prayer-emoji">${getPrayerEmoji(p.name)}</span>
              <div class="prayer-name-block">
                <div class="prayer-name">${t('prayers.' + p.name)}</div>
                <div class="prayer-arabic">${this.prayerArabic(p.name)}</div>
              </div>
              <div class="prayer-time">${formatTime12h(p.time)}</div>
            </div>
          `).join('')}
        </div>

        <!-- Versículo del día -->
        ${verse ? `
          <h2 class="section-title">📖 ${t('verseOfDay')}</h2>
          <div class="card-gradient">
            <div class="verse-arabic">${verse.arabic}</div>
            <div class="verse-divider"></div>
            <div class="verse-translation">"${verse.translation}"</div>
            <div class="verse-source">— ${verse.surah} ${verse.surahNumber}:${verse.ayahNumber}</div>
          </div>
        ` : ''}

        <!-- Du'a del día -->
        <h2 class="section-title">🤲 ${t('duaOfDay')}</h2>
        <div class="card">
          <div class="dua-title">${dua.title}</div>
          <div class="dua-arabic">${dua.arabic}</div>
          <div class="dua-transliteration">${dua.transliteration}</div>
          <div class="dua-translation">"${dua.translation}"</div>
          <div class="dua-source">— ${dua.source}</div>
        </div>

        <!-- Virtud del día -->
        ${virtue ? `
          <h2 class="section-title">✨ ${virtue.title}</h2>
          <div class="card virtue-card">
            <div class="virtue-text">${virtue.verse}</div>
            <div class="virtue-source">— ${virtue.source}</div>
          </div>
        ` : ''}

        <!-- Progreso espiritual -->
        <h2 class="section-title">🎯 ${t('spiritualProgress')}</h2>
        <div class="card">
          <div class="progress-row">
            ${this.progressRing(0.6, '🕌', 'Oraciones', '3/5', 'var(--primary)')}
            ${this.progressRing(0.4, '📖', 'Corán', '40%', 'var(--accent)')}
            ${this.progressRing(0.8, '📿', 'Adhkar', '8/10', 'var(--success)')}
          </div>
          <div class="streak-banner">
            🔥 <span class="streak-text">7 ${t('daysInRow')}</span>
          </div>
        </div>
      </div>
    `;
  },

  prayerArabic(name) {
    const map = {
      Fajr: 'الفجر', Sunrise: 'الشروق', Dhuhr: 'الظهر',
      Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء',
    };
    return map[name] || '';
  },

  progressRing(progress, icon, label, value, color) {
    const r = 32;
    const circ = 2 * Math.PI * r;
    const offset = circ * (1 - progress);
    return `
      <div class="progress-ring-container">
        <div class="progress-ring-wrapper">
          <svg class="progress-ring-svg" width="80" height="80">
            <circle class="progress-ring-bg" cx="40" cy="40" r="${r}"></circle>
            <circle class="progress-ring-fg" cx="40" cy="40" r="${r}"
                    style="stroke: ${color}; stroke-dasharray: ${circ}; stroke-dashoffset: ${offset};"></circle>
          </svg>
          <div class="progress-ring-center">
            <div>${icon}</div>
            <div class="progress-ring-value">${value}</div>
          </div>
        </div>
        <div class="progress-ring-label">${label}</div>
      </div>
    `;
  },

  startCountdown() {
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    this.countdownInterval = setInterval(() => {
      const el = document.getElementById('countdown');
      if (!el || !AppState.timings) return;
      const np = getNextPrayer(AppState.timings);
      if (np) el.textContent = formatCountdown(np.diffMs);
    }, 1000);
  },

  cleanup() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  },
};
