/* ============================================
   Islamic Calendar - Hijri / Gregorian
   Using Aladhan API for accurate conversion
   ============================================ */

let calendarCurrentDate = new Date();

const HIJRI_MONTHS = {
    es: ['Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani', 'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'],
    en: ['Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani', 'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'],
    ar: ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الثانية', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'],
    fr: ['Mouharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani', 'Joumada al-Awwal', 'Joumada al-Thani', 'Rajab', 'Cha\'ban', 'Ramadan', 'Chawwal', 'Dhou al-Qi\'dah', 'Dhou al-Hijjah']
};

const GREGORIAN_MONTHS = {
    es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
};

const WEEKDAYS = {
    es: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    ar: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    fr: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
};

const WEEKDAYS_FULL = {
    es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ar: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    fr: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
};

// Convert Gregorian to Hijri using Aladhan API
async function gregorianToHijri(date) {
    try {
        const dateStr = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
        const response = await fetch(`https://api.aladhan.com/v1/gToH/${dateStr}`);
        const data = await response.json();
        return data.data.hijri;
    } catch (e) {
        console.error('Error converting date:', e);
        return null;
    }
}

// Update today's date display
async function updateTodayDate() {
    const today = new Date();
    const lang = currentLanguage || 'es';
    
    const hijri = await gregorianToHijri(today);
    
    const hijriEl = document.getElementById('todayHijri');
    if (hijriEl && hijri) {
        const weekday = WEEKDAYS_FULL[lang][today.getDay()];
        hijriEl.textContent = `${weekday}, ${hijri.day} ${HIJRI_MONTHS[lang][parseInt(hijri.month.number) - 1]} ${hijri.year} ${lang === 'ar' ? 'هـ' : 'AH'}`;
    }
    
    const gregorianEl = document.getElementById('todayGregorian');
    if (gregorianEl) {
        gregorianEl.textContent = `${today.getDate()} ${GREGORIAN_MONTHS[lang][today.getMonth()]} ${today.getFullYear()}`;
    }
}

// Render the calendar grid
async function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    const monthLabel = document.getElementById('currentMonth');
    if (!grid) return;
    
    const lang = currentLanguage || 'es';
    const year = calendarCurrentDate.getFullYear();
    const month = calendarCurrentDate.getMonth();
    
    // Get hijri info for the middle of the month for display
    const midMonth = new Date(year, month, 15);
    const hijriInfo = await gregorianToHijri(midMonth);
    
    if (monthLabel) {
        let hijriLabel = '';
        if (hijriInfo) {
            hijriLabel = ` · ${HIJRI_MONTHS[lang][parseInt(hijriInfo.month.number) - 1]} ${hijriInfo.year}`;
        }
        monthLabel.textContent = `${GREGORIAN_MONTHS[lang][month]} ${year}${hijriLabel}`;
    }
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    
    // Header
    let html = '';
    for (let d of WEEKDAYS[lang]) {
        html += `<div class="cal-weekday">${d}</div>`;
    }
    
    // Empty cells before day 1
    for (let i = 0; i < firstDay; i++) {
        html += '<div class="cal-day empty"></div>';
    }
    
    // Days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDate = new Date(year, month, day);
        const isToday = isCurrentMonth && today.getDate() === day;
        const isFriday = dayDate.getDay() === 5;
        const classes = ['cal-day'];
        if (isToday) classes.push('today');
        if (isFriday) classes.push('friday');
        
        html += `<div class="${classes.join(' ')}" data-day="${day}"><span class="cal-day-num">${day}</span></div>`;
    }
    
    grid.innerHTML = html;
    
    // Fetch hijri days for the month (in chunks to avoid too many requests)
    fetchHijriForMonth(year, month);
}

// Fetch hijri days for the current month
async function fetchHijriForMonth(year, month) {
    try {
        const response = await fetch(`https://api.aladhan.com/v1/gToHCalendar/${month + 1}/${year}`);
        const data = await response.json();
        
        if (data.data && Array.isArray(data.data)) {
            data.data.forEach(item => {
                const gregDay = parseInt(item.gregorian.day);
                const hijriDay = item.hijri.day;
                const cell = document.querySelector(`.cal-day[data-day="${gregDay}"]`);
                if (cell && !cell.classList.contains('empty')) {
                    cell.innerHTML += `<span class="cal-hijri">${hijriDay}</span>`;
                }
            });
        }
    } catch (e) {
        console.error('Error fetching hijri calendar:', e);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('calendarGrid')) {
        updateTodayDate();
        renderCalendar();
        
        document.getElementById('prevMonth')?.addEventListener('click', () => {
            calendarCurrentDate.setMonth(calendarCurrentDate.getMonth() - 1);
            renderCalendar();
        });
        
        document.getElementById('nextMonth')?.addEventListener('click', () => {
            calendarCurrentDate.setMonth(calendarCurrentDate.getMonth() + 1);
            renderCalendar();
        });
    }
});
