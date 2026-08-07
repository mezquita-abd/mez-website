// 📅 Calendario Hijri
const CalendarPage = {
  currentDate: new Date(),
  calendar: [],
  selectedDay: null,

  async render(container) {
    container.innerHTML = `
      <div class="top-bar">
        <button class="top-bar-btn" onclick="Router.back()">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title">📅 ${t('hijriCalendar')}</div>
        <div style="width: 30px;"></div>
      </div>

      <div class="page-header" style="border-radius: 0 0 28px 28px; padding-top: var(--sp-md);">
        <div class="month-nav">
          <button class="month-nav-btn" onclick="CalendarPage.changeMonth(-1)">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="month-name" id="month-name">${this.formatMonth()}</div>
          <button class="month-nav-btn" onclick="CalendarPage.changeMonth(1)">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div class="calendar-container">
        <div class="loading-container">
          <div class="loader"></div>
        </div>
      </div>
    `;

    await this.loadMonth();
  },

  formatMonth() {
    return this.currentDate.toLocaleString(currentLocale === 'ar' ? 'ar' : currentLocale, {
      month: 'long', year: 'numeric'
    });
  },

  changeMonth(delta) {
    const d = new Date(this.currentDate);
    d.setMonth(d.getMonth() + delta);
    this.currentDate = d;
    document.getElementById('month-name').textContent = this.formatMonth();
    this.loadMonth();
  },

  async loadMonth() {
    const month = this.currentDate.getMonth() + 1;
    const year = this.currentDate.getFullYear();
    const containerSel = document.querySelector('.calendar-container');
    if (!containerSel) return;

    containerSel.innerHTML = `<div class="loading-container"><div class="loader"></div></div>`;

    try {
      this.calendar = await API.getHijriCalendarMonth(month, year);
      const today = new Date();
      const todayDay = today.getDate();
      const currentMonthMatch = today.getMonth() + 1 === month && today.getFullYear() === year;
      this.selectedDay = currentMonthMatch
        ? this.calendar.find(d => parseInt(d.gregorian?.day, 10) === todayDay)
        : this.calendar[0];

      this.renderGrid(containerSel);
    } catch (e) {
      containerSel.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">⚠️</div>
          <div class="empty-state-text">${t('error')}</div>
        </div>
      `;
    }
  },

  renderGrid(container) {
    const today = new Date();

    // Calcular offset (qué día de la semana es el día 1)
    const firstDay = this.calendar[0];
    const firstDate = firstDay ? new Date(firstDay.gregorian.date.split('-').reverse().join('-')) : new Date();
    const firstWeekday = (firstDate.getDay() + 6) % 7; // 0=Lunes

    const emptyCells = Array(firstWeekday).fill(null);

    // Weekday abbreviations by locale (starting Monday)
    const weekAbbr = {
      es: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      ar: ['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'],
      en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    };
    const days = weekAbbr[currentLocale] || weekAbbr.es;

    container.innerHTML = `
      <div class="week-header">
        ${days.map((d, i) => `<div class="week-day ${i === 4 ? 'friday' : ''} ${i >= 5 ? 'weekend' : ''}">${d}</div>`).join('')}
      </div>
      <div class="calendar-grid">
        ${emptyCells.map(() => `<div></div>`).join('')}
        ${this.calendar.map((d, idx) => this.renderDay(d, idx, today)).join('')}
      </div>

      <div id="selected-day-info"></div>

      <div class="card" style="margin-top: var(--sp-lg);">
        <div class="legend-title">${t('legend')}</div>
        <div class="legend-item">
          <div class="legend-box" style="background: rgba(212,175,55,0.25);"></div>
          <div class="legend-text">${t('holiday')}</div>
        </div>
        <div class="legend-item">
          <div style="font-size: 16px;">🌙</div>
          <div class="legend-text">${t('fastingDay')}</div>
        </div>
        <div class="legend-item">
          <div class="legend-box" style="border: 2px solid var(--primary); background: transparent;"></div>
          <div class="legend-text">${t('today')}</div>
        </div>
      </div>
    `;

    this.renderSelectedDay();
  },

  renderDay(day, idx, today) {
    const greg = parseInt(day.gregorian?.day, 10);
    const hijri = day.hijri?.day;
    const hijriMonth = parseInt(day.hijri?.month?.number, 10);
    const hijriDay = parseInt(day.hijri?.day, 10);
    // v14: parse safely as ISO to avoid timezone drift
    const gParts = day.gregorian?.date?.split('-');
    const iso = gParts && gParts.length === 3
      ? `${gParts[2]}-${gParts[1].padStart(2,'0')}-${gParts[0].padStart(2,'0')}`
      : null;
    const dayOfWeek = iso ? new Date(iso + 'T00:00:00').getDay() : 0;

    const holiday = getHoliday(hijriMonth, hijriDay);
    const fasting = isFastingDay(hijriDay, dayOfWeek);
    const isToday = today.getDate() === greg
      && today.getMonth() + 1 === parseInt(day.gregorian?.month?.number, 10)
      && today.getFullYear() === parseInt(day.gregorian?.year, 10);
    const isSelected = this.selectedDay?.gregorian?.day === day.gregorian?.day;

    // Check for official 2026 calendar event
    let eventKey = null;
    try {
      const parts = day.gregorian?.date?.split('-');
      if (parts && parts.length === 3) {
        const iso = `${parts[2]}-${parts[1].padStart(2,'0')}-${parts[0].padStart(2,'0')}`;
        if (typeof CALENDAR_2026_MAP !== 'undefined' && CALENDAR_2026_MAP[iso]) {
          eventKey = CALENDAR_2026_MAP[iso];
        }
      }
    } catch (e) {}

    const classes = ['day-cell'];
    if (isToday) classes.push('today');
    if (isSelected) classes.push('selected');
    if (holiday) classes.push('holiday');
    if (dayOfWeek === 5) classes.push('day-friday');
    if (eventKey && eventKey !== 'regular') {
      classes.push('day-event');
      classes.push('event-' + eventKey);
    }

    // Icon indicator per event type
    let eventIcon = '';
    const iconMap = {
      isra_miraj: '🌙',
      nisf_shaban: '✨',
      ramadan_start: '🌙',
      ramadan: '🌙',
      last_ten_ramadan: '⭐',
      laylat_qadr: '🌟',
      eid_fitr: '🎉',
      six_shawwal: '🌙',
      ten_dhulhijjah: '🕋',
      arafah: '🗻',
      eid_adha: '🎉',
      tashreeq: '🕋',
      hijri_new_year: '🌠',
      tasua: '🕌',
      ashura: '🕌',
      mawlid: '💚',
      white_days: '◷',
      friday: '📗',
    };
    if (eventKey && iconMap[eventKey]) eventIcon = iconMap[eventKey];

    return `
      <div class="${classes.join(' ')}" onclick="CalendarPage.selectDay(${idx})">
        <div class="day-greg">${greg}</div>
        <div class="day-hijri">${hijri}</div>
        ${eventIcon ? `<div class="day-event-icon">${eventIcon}</div>` : (holiday ? '<div class="day-holiday-dot"></div>' : (fasting ? '<div class="day-fasting-icon">🌙</div>' : ''))}
      </div>
    `;
  },

  selectDay(idx) {
    this.selectedDay = this.calendar[idx];
    const container = document.querySelector('.calendar-container');
    if (container) this.renderGrid(container);
  },

  renderSelectedDay() {
    const info = document.getElementById('selected-day-info');
    if (!info || !this.selectedDay) return;

    const day = this.selectedDay;
    const hijriMonth = parseInt(day.hijri?.month?.number, 10);
    const hijriDay = parseInt(day.hijri?.day, 10);
    // v14: parse date safely from Aladhan DD-MM-YYYY format
    const gParts = day.gregorian?.date?.split('-');
    const isoDate = gParts && gParts.length === 3
      ? `${gParts[2]}-${gParts[1].padStart(2,'0')}-${gParts[0].padStart(2,'0')}`
      : null;
    const dateObj = isoDate ? new Date(isoDate + 'T00:00:00') : new Date();
    const dayOfWeek = dateObj.getDay(); // 0=Sun ... 6=Sat
    const langKey = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
    const weekdayLocalized = typeof getWeekdayName === 'function'
      ? getWeekdayName(dayOfWeek, langKey)
      : (day.gregorian?.weekday?.en || '');
    const holidayName = typeof getHolidayName === 'function'
      ? getHolidayName(hijriMonth, hijriDay, langKey)
      : null;
    const holiday = getHoliday(hijriMonth, hijriDay);
    const virtue = getDailyVirtue(hijriMonth, hijriDay, dayOfWeek, langKey);

    // Check official 2026 calendar data (Mosque Abdullah Havana)
    let officialInfo = null;
    try {
      const gregParts = day.gregorian?.date?.split('-');
      if (gregParts && gregParts.length === 3) {
        const isoDate = `${gregParts[2]}-${gregParts[1].padStart(2,'0')}-${gregParts[0].padStart(2,'0')}`;
        if (typeof getCalendarInfo === 'function') {
          officialInfo = getCalendarInfo(isoDate);
        }
      }
    } catch (e) {}

    const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');

    info.innerHTML = `
      <div class="card selected-day-info">
        <div class="selected-day-header">
          <div>
            <div class="selected-day-greg">${escapeHtml(weekdayLocalized)}, ${day.gregorian?.day} ${escapeHtml(day.gregorian?.month?.en || '')}</div>
            <div class="selected-day-hijri">${day.hijri?.day} ${escapeHtml(day.hijri?.month?.en || '')} ${day.hijri?.year} هـ</div>
          </div>
          ${holidayName ? `<div class="holiday-badge">🎉 ${escapeHtml(holidayName)}</div>` : ''}
          ${officialInfo && !holidayName ? `<div class="holiday-badge" style="background:#D4AF37;">${escapeHtml(officialInfo['title_'+lang] || officialInfo.title_es || '')}</div>` : ''}
        </div>

        ${officialInfo ? `
          <div class="virtue-box" style="border-left-color:#D4AF37;">
            <div class="virtue-box-title">✨ ${t('todaysVirtue')}: ${officialInfo['title_'+lang] || officialInfo.title_es || ''}</div>
            <div class="virtue-box-text">${officialInfo['virtue_'+lang] || officialInfo.virtue_es || ''}</div>
            ${(officialInfo['quote_'+lang] || officialInfo.quote_es) ? `<div class="virtue-box-quote" style="font-style:italic;margin-top:8px;color:#0F4C3A;">"${officialInfo['quote_'+lang] || officialInfo.quote_es}"</div>` : ''}
            <div class="virtue-box-source">— ${officialInfo['reference_'+lang] || officialInfo.reference_es || ''}</div>
          </div>
        ` : (virtue ? `
          <div class="virtue-box">
            <div class="virtue-box-title">✨ ${virtue.title}</div>
            <div class="virtue-box-text">${virtue.verse}</div>
            <div class="virtue-box-source">— ${virtue.source}</div>
          </div>
        ` : '')}
      </div>
    `;
  },

  cleanup() {},
};
