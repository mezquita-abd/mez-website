// 🕋 Pantalla de Oración + Qibla
const PrayerPage = {
  activeTab: 'times',
  qiblaBearing: 0,
  deviceHeading: 0,
  orientationHandler: null,
  permissionGranted: false,

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

      this.qiblaBearing = Qibla.calculateBearing(loc.latitude, loc.longitude);
      const distance = Qibla.distance(loc.latitude, loc.longitude);

      const [timings, hijri] = await Promise.all([
        AppState.timings ? Promise.resolve({ timings: AppState.timings }) :
          API.getPrayerTimes(loc.latitude, loc.longitude, new Date(), AppState.settings.calculationMethod),
        AppState.hijri ? Promise.resolve(AppState.hijri) : API.gregorianToHijri(),
      ]);

      AppState.timings = timings.timings;
      AppState.hijri = hijri;

      this.renderUI(container, loc, hijri, distance);
    } catch (e) {
      console.warn('Prayer error:', e);
      container.innerHTML = this.permissionPrompt();
    }
  },

  renderUI(container, loc, hijri, distance) {
    container.innerHTML = `
      <div class="page-header">
        <div class="page-title">🕋 ${t('tabPrayer')}</div>
        ${hijri ? `<div class="page-subtitle">${hijri.day} ${hijri.month?.en} ${hijri.year} هـ</div>` : ''}
        ${loc.city ? `<div class="page-meta">📍 ${loc.city}${loc.country ? ', ' + loc.country : ''}</div>` : ''}

        <div class="inner-tabs">
          <button class="inner-tab ${this.activeTab === 'times' ? 'active' : ''}" onclick="PrayerPage.switchTab('times')">
            ⏰ ${t('todayPrayers')}
          </button>
          <button class="inner-tab ${this.activeTab === 'qibla' ? 'active' : ''}" onclick="PrayerPage.switchTab('qibla')">
            🧭 ${t('qibla')}
          </button>
        </div>
      </div>

      <div id="prayer-tab-content" style="padding: var(--sp-md);">
        ${this.activeTab === 'times' ? this.timesTab() : this.qiblaTab(distance)}
      </div>
    `;

    if (this.activeTab === 'qibla') {
      this.initOrientationListener();
    }
  },

  switchTab(tab) {
    this.cleanup();
    this.activeTab = tab;
    this.render(document.getElementById('main-content'));
  },

  timesTab() {
    const prayers = getDailyPrayers(AppState.timings);
    const next = getNextPrayer(AppState.timings);
    return `
      <div class="card prayers-card">
        ${prayers.map(p => `
          <div class="prayer-row ${next?.name === p.name ? 'next' : ''}">
            <span class="prayer-emoji">${getPrayerEmoji(p.name)}</span>
            <div class="prayer-name-block">
              <div class="prayer-name">${t('prayers.' + p.name)}</div>
              <div class="prayer-arabic">${HomePage.prayerArabic(p.name)}</div>
            </div>
            <div class="prayer-time">${formatTime12h(p.time)}</div>
          </div>
        `).join('')}
        <div style="padding: 8px;">
          <button class="btn-ghost" onclick="Router.go('calendar')">
            <span><i class="fas fa-calendar"></i> ${t('hijriCalendar')}</span>
            <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'}"></i>
          </button>
        </div>
      </div>
    `;
  },

  qiblaTab(distance) {
    return `
      <div class="qibla-container">
        <div class="card">
          <div class="qibla-hint" id="qibla-hint">${t('pointToKaaba')}</div>

          <div class="compass" id="compass">
            <div class="compass-cardinal north">N</div>
            <div class="compass-cardinal south">S</div>
            <div class="compass-cardinal east">E</div>
            <div class="compass-cardinal west">W</div>

            <div class="qibla-arrow" id="qibla-arrow" style="transform: rotate(${this.qiblaBearing}deg);">
              <div class="qibla-arrow-tip">🕋</div>
              <div class="qibla-arrow-line"></div>
            </div>

            <div class="compass-center"></div>
          </div>

          <div class="qibla-info">
            <div class="qibla-info-item">
              <div class="qibla-info-label">${t('qiblaDirection')}</div>
              <div class="qibla-info-value">${this.qiblaBearing.toFixed(1)}°</div>
            </div>
            <div class="qibla-info-divider"></div>
            <div class="qibla-info-item">
              <div class="qibla-info-label">${t('distance')} ${t('toMakkah')}</div>
              <div class="qibla-info-value">${distance.toFixed(0)} km</div>
            </div>
          </div>
        </div>

        <div class="qibla-tip">
          💡 Mantén el teléfono horizontal y alejado de objetos metálicos. En iOS, toca el botón inferior para activar el sensor de orientación.
        </div>

        <button class="btn-primary" style="width:100%; margin-top:16px;" onclick="PrayerPage.requestOrientationPermission()">
          <i class="fas fa-compass"></i> Activar brújula
        </button>
      </div>
    `;
  },

  async requestOrientationPermission() {
    // iOS 13+ requiere permiso explícito
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const perm = await DeviceOrientationEvent.requestPermission();
        if (perm === 'granted') {
          this.permissionGranted = true;
          this.initOrientationListener();
          showToast('✅ Brújula activada');
        } else {
          showToast('❌ Permiso denegado');
        }
      } catch (e) {
        showToast('Error: ' + e.message);
      }
    } else {
      // Android / desktop: no requiere permiso
      this.permissionGranted = true;
      this.initOrientationListener();
      showToast('✅ Brújula activa');
    }
  },

  initOrientationListener() {
    if (this.orientationHandler) {
      window.removeEventListener('deviceorientation', this.orientationHandler);
      window.removeEventListener('deviceorientationabsolute', this.orientationHandler);
    }

    this.orientationHandler = (e) => {
      // alpha: 0..360 (rotación alrededor del eje Z) — Norte magnético
      let heading = null;
      if (e.webkitCompassHeading !== undefined) {
        // iOS Safari
        heading = e.webkitCompassHeading;
      } else if (e.absolute && e.alpha !== null) {
        // Android Chrome
        heading = 360 - e.alpha;
      } else if (e.alpha !== null) {
        heading = 360 - e.alpha;
      }

      if (heading === null) return;
      this.deviceHeading = heading;

      const arrowAngle = Qibla.arrowAngle(this.qiblaBearing, heading);
      const arrow = document.getElementById('qibla-arrow');
      if (arrow) {
        arrow.style.transform = `rotate(${arrowAngle}deg)`;
        const aligned = Qibla.isAligned(arrowAngle, 5);
        arrow.classList.toggle('aligned', aligned);
        const hint = document.getElementById('qibla-hint');
        if (hint) {
          hint.textContent = aligned ? '✅ ' + t('aligned') : t('pointToKaaba');
          hint.classList.toggle('aligned', aligned);
        }
        if (aligned && navigator.vibrate) {
          navigator.vibrate(50);
        }
      }
    };

    window.addEventListener('deviceorientationabsolute', this.orientationHandler, true);
    window.addEventListener('deviceorientation', this.orientationHandler, true);
  },

  permissionPrompt() {
    return `
      <div class="permission-needed">
        <div class="permission-needed-icon">📍</div>
        <div class="permission-needed-title">${t('locationNeeded')}</div>
        <div class="permission-needed-desc">${t('locationDesc')}</div>
        <button class="btn-primary" onclick="PrayerPage.render(document.getElementById('main-content'))">
          ${t('grantPermission')}
        </button>
      </div>
    `;
  },

  cleanup() {
    if (this.orientationHandler) {
      window.removeEventListener('deviceorientation', this.orientationHandler);
      window.removeEventListener('deviceorientationabsolute', this.orientationHandler);
      this.orientationHandler = null;
    }
  },
};
