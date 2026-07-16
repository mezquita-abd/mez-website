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

      // 🔔 Programar notificaciones de oración del día si están activadas
      if (typeof PrayerNotifications !== 'undefined' && PrayerNotifications.isEnabled()) {
        PrayerNotifications.scheduleDay(AppState.timings, AppState.settings.locale || 'es');
      }

      // Escapar datos de ubicación (Nominatim)
      if (loc) { loc.city = loc.city && String(loc.city); loc.country = loc.country && String(loc.country); }

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
        ${loc.city ? `<div class="page-meta">📍 ${escapeHtml(loc.city)}${loc.country ? ', ' + escapeHtml(loc.country) : ''}</div>` : ''}

        <div class="inner-tabs">
          <button class="inner-tab ${this.activeTab === 'times' ? 'active' : ''}" onclick="PrayerPage.switchTab('times')">
            ⏰ ${t('todayPrayers')}
          </button>
          <button class="inner-tab ${this.activeTab === 'monthly' ? 'active' : ''}" onclick="PrayerPage.switchTab('monthly')">
            📅 ${t('monthlyTable') || 'Mensual'}
          </button>
          <button class="inner-tab ${this.activeTab === 'qibla' ? 'active' : ''}" onclick="PrayerPage.switchTab('qibla')">
            🧭 ${t('qibla')}
          </button>
        </div>
      </div>

      <div id="prayer-tab-content" style="padding: var(--sp-md);">
        ${this.activeTab === 'times' ? this.timesTab() : (this.activeTab === 'monthly' ? this.monthlyTab(loc) : this.qiblaTab(distance))}
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

  // ============ MONTHLY PRAYER TABLE ============
  monthlyTab(loc) {
    // Trigger async load
    setTimeout(() => this.loadMonthlyPrayers(loc), 100);
    return `
      <div id="monthly-prayer-container">
        <div class="loading-container">
          <div class="loader"></div>
          <div>${t('loading') || 'Cargando...'}</div>
        </div>
      </div>
    `;
  },

  async loadMonthlyPrayers(loc) {
    const container = document.getElementById('monthly-prayer-container');
    if (!container) return;

    try {
      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();
      const data = await API.getPrayerTimesMonth(
        loc.latitude,
        loc.longitude,
        month,
        year,
        AppState.settings.calculationMethod || 3
      );

      this.renderMonthlyTable(container, data, month, year);
    } catch (e) {
      console.warn('Monthly prayers error:', e);
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">⚠️</div>
          <div class="empty-state-text">${t('errorLoading') || 'Error al cargar. Verifica tu conexión.'}</div>
          <button class="btn-primary" onclick="PrayerPage.loadMonthlyPrayers(${JSON.stringify(loc).replace(/"/g,'&quot;')})">${t('retry') || 'Reintentar'}</button>
        </div>`;
    }
  },

  renderMonthlyTable(container, data, month, year) {
    if (!data || data.length === 0) {
      container.innerHTML = `<div class="empty-state"><div>${t('noData') || 'Sin datos'}</div></div>`;
      return;
    }

    const monthName = new Date(year, month - 1).toLocaleString(currentLocale, { month: 'long' });
    const today = new Date();
    const isCurrentMonth = today.getMonth() + 1 === month && today.getFullYear() === year;
    const todayDay = today.getDate();

    // Prayer column headers
    const prayerLabels = {
      Fajr: t('prayers.Fajr') || 'Fajr',
      Dhuhr: t('prayers.Dhuhr') || 'Dhuhr',
      Asr: t('prayers.Asr') || 'Asr',
      Maghrib: t('prayers.Maghrib') || 'Maghrib',
      Isha: t('prayers.Isha') || 'Isha',
    };

    const rows = data.map(day => {
      const gDate = day.date?.gregorian;
      const hDate = day.date?.hijri;
      const dayNum = parseInt(gDate?.day, 10);
      const isToday = isCurrentMonth && dayNum === todayDay;
      const t24 = t => (t || '').split(' ')[0].slice(0,5); // "05:12 (CET)" -> "05:12"
      const isFriday = new Date(gDate?.date?.split('-').reverse().join('-'))?.getDay() === 5;

      return `
        <tr class="${isToday ? 'monthly-row-today' : ''} ${isFriday ? 'monthly-row-friday' : ''}">
          <td class="monthly-day-col">
            <div class="monthly-greg">${dayNum}</div>
            <div class="monthly-hijri">${hDate?.day} ${hDate?.month?.ar || hDate?.month?.en || ''}</div>
            ${isFriday ? '<div class="monthly-friday-badge">📗</div>' : ''}
            ${isToday ? '<div class="monthly-today-badge">✦</div>' : ''}
          </td>
          <td>${t24(day.timings?.Fajr)}</td>
          <td>${t24(day.timings?.Dhuhr)}</td>
          <td>${t24(day.timings?.Asr)}</td>
          <td>${t24(day.timings?.Maghrib)}</td>
          <td>${t24(day.timings?.Isha)}</td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div class="monthly-header">
        <div class="monthly-title">📅 ${monthName} ${year}</div>
        <div class="monthly-subtitle">${data.length} ${t('days') || 'días'}</div>
      </div>
      <div class="monthly-table-wrap">
        <table class="monthly-table">
          <thead>
            <tr>
              <th>${t('day') || 'Día'}</th>
              <th>🌅 ${prayerLabels.Fajr}</th>
              <th>🌞 ${prayerLabels.Dhuhr}</th>
              <th>🌤️ ${prayerLabels.Asr}</th>
              <th>🌇 ${prayerLabels.Maghrib}</th>
              <th>🌙 ${prayerLabels.Isha}</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="monthly-legend">
        <span><span class="legend-dot today"></span> ${t('today') || 'Hoy'}</span>
        <span><span class="legend-dot friday"></span> ${t('friday') || 'Viernes'}</span>
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
