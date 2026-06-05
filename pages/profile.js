// 👤 Pantalla de Perfil / Ajustes
const ProfilePage = {
  async render(container) {
    const reciter = CONFIG.RECITERS.find(r => r.id === AppState.settings.reciter) || CONFIG.RECITERS[0];
    const methodName = CONFIG.CALCULATION_METHODS[AppState.settings.calculationMethod] || '—';

    const langLabel = { es: '🇪🇸 Español', ar: '🇸🇦 العربية', en: '🇬🇧 English' }[AppState.settings.locale];
    const themeLabel = {
      light: '☀️ ' + t('themeLight'),
      dark: '🌙 ' + t('themeDark'),
      auto: '🔄 ' + t('themeAuto'),
    }[AppState.settings.theme];

    container.innerHTML = `
      <div class="profile-header">
        <div class="profile-avatar">🕌</div>
        <div class="profile-name">${t('welcome')}</div>
        <div class="profile-subtitle">${t('tagline')}</div>
      </div>

      <div style="padding: 0 var(--sp-md);">
        <div class="section-label">${t('settings')}</div>
        <div class="card" style="padding: 0; overflow: hidden;">
          <div class="list-row" onclick="ProfilePage.pickLanguage()">
            <div class="list-row-icon"><i class="fas fa-language"></i></div>
            <div class="list-row-info">
              <div class="list-row-label">${t('language')}</div>
              <div class="list-row-value">${langLabel}</div>
            </div>
            <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} list-row-chevron"></i>
          </div>

          <div class="list-row" onclick="ProfilePage.pickTheme()">
            <div class="list-row-icon"><i class="fas fa-adjust"></i></div>
            <div class="list-row-info">
              <div class="list-row-label">${t('theme')}</div>
              <div class="list-row-value">${themeLabel}</div>
            </div>
            <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} list-row-chevron"></i>
          </div>

          <div class="list-row" onclick="ProfilePage.pickMethod()">
            <div class="list-row-icon"><i class="fas fa-calculator"></i></div>
            <div class="list-row-info">
              <div class="list-row-label">${t('calculationMethod')}</div>
              <div class="list-row-value">${methodName}</div>
            </div>
            <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} list-row-chevron"></i>
          </div>

          <div class="list-row" onclick="ProfilePage.pickReciter()">
            <div class="list-row-icon"><i class="fas fa-microphone"></i></div>
            <div class="list-row-info">
              <div class="list-row-label">${t('reciter')}</div>
              <div class="list-row-value">${reciter.name}</div>
            </div>
            <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} list-row-chevron"></i>
          </div>
        </div>

        <div class="section-label">${t('about')}</div>
        <div class="card about-card">
          <div class="about-icon">🕌</div>
          <div class="about-name">Quba</div>
          <div class="about-version">v1.0.0 — MVP Web</div>
          <div class="about-desc">${t('tagline')}</div>
          <div class="about-credits">
            Hecho con ❤️ para la ummah hispanohablante.<br>
            APIs: Aladhan · Al-Quran Cloud · OpenStreetMap
          </div>
        </div>
      </div>
    `;
  },

  pickLanguage() {
    const options = [
      { id: 'es', label: '🇪🇸 Español' },
      { id: 'ar', label: '🇸🇦 العربية' },
      { id: 'en', label: '🇬🇧 English' },
    ];
    showModal(t('language'), options, AppState.settings.locale, id => {
      AppState.settings.locale = id;
      Storage.saveSettings();
      setLocale(id);
      // Re-render
      this.render(document.getElementById('main-content'));
      showToast('✅ ' + t('settings'));
    });
  },

  pickTheme() {
    const options = [
      { id: 'light', label: '☀️ ' + t('themeLight') },
      { id: 'dark', label: '🌙 ' + t('themeDark') },
      { id: 'auto', label: '🔄 ' + t('themeAuto') },
    ];
    showModal(t('theme'), options, AppState.settings.theme, id => {
      AppState.settings.theme = id;
      Storage.saveSettings();
      applyTheme();
      this.render(document.getElementById('main-content'));
    });
  },

  pickMethod() {
    const options = Object.entries(CONFIG.CALCULATION_METHODS).map(([id, name]) => ({
      id: parseInt(id, 10),
      label: name,
    }));
    showModal(t('calculationMethod'), options, AppState.settings.calculationMethod, id => {
      AppState.settings.calculationMethod = id;
      Storage.saveSettings();
      // Invalidar caché de oración
      AppState.timings = null;
      this.render(document.getElementById('main-content'));
      showToast('✅ ' + t('settings'));
    });
  },

  pickReciter() {
    const options = CONFIG.RECITERS.map(r => ({
      id: r.id,
      label: `${r.name} (${r.country})`,
    }));
    showModal(t('reciter'), options, AppState.settings.reciter, id => {
      AppState.settings.reciter = id;
      Storage.saveSettings();
      this.render(document.getElementById('main-content'));
      showToast('✅ ' + t('settings'));
    });
  },

  cleanup() {},
};
