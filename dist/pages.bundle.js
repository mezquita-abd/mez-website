/* Quba bundle • v4.2.0 • generated 2026-08-06T03:52:21.906Z */

/* ==== pages/home.js ==== */
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
const [timings, hijri] = await Promise.all([
API.getPrayerTimes(loc.latitude, loc.longitude, new Date(), AppState.settings.calculationMethod),
API.gregorianToHijri(),
]);
AppState.timings = timings.timings;
AppState.hijri = hijri;
const verse = getFamousVerseOfTheDay();
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
<div class="home-location">📍 ${escapeHtml(loc.city || '')}${loc.country ? ', ' + escapeHtml(loc.country) : ''}</div>
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
<!-- Two prominent CTA buttons: Hijri Calendar + Prayer Table -->
<div class="home-cta-row">
<button class="hijri-cta-btn" onclick="Router.go('calendar')">
<div class="hijri-cta-icon">🌙</div>
<div class="hijri-cta-content">
<div class="hijri-cta-title">${t('hijriCalendar')}</div>
<div class="hijri-cta-date">${hijri ? `${hijri.day} ${hijri.month?.ar || hijri.month?.en} ${hijri.year} هـ` : ''}</div>
</div>
</button>
<button class="prayer-table-cta-btn" onclick="Router.go('prayer',{tab:'monthly'})">
<div class="hijri-cta-icon">📊</div>
<div class="hijri-cta-content">
<div class="hijri-cta-title">${t('prayerTable') || 'Tabla de oraciones'}</div>
<div class="hijri-cta-date">${t('viewMonth') || 'Vista mensual'}</div>
</div>
</button>
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
<!-- Famous Verse of the Day with Wisdom -->
${verse ? `
<h2 class="section-title">📖 ${t('verseOfDay')}</h2>
<div class="card-gradient">
<div class="verse-arabic">${escapeHtml(verse.arabic)}</div>
<div class="verse-translit">${escapeHtml(verse.transliteration)}</div>
<div class="verse-divider"></div>
<div class="verse-translation">"${escapeHtml(verse['translation_' + (AppState.settings.locale || 'es')] || verse.translation_es)}"</div>
<div class="verse-source">— ${escapeHtml(verse.surahName)} ${verse.surahNumber}:${verse.ayahNumber}</div>
<div class="verse-wisdom">
<i class="fas fa-lightbulb"></i>
<span>${escapeHtml(verse['wisdom_' + (AppState.settings.locale || 'es')] || verse.wisdom_es)}</span>
</div>
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


/* ==== pages/quran.js ==== */
const QuranPage = {
surahs: [],
playingAyah: null,
currentSurah: null,
readerSettings: null,
repeatMode: 'off', // 'off' | 'ayah' | 'surah'
loadReaderSettings() {
this.readerSettings = Storage.get('reader_settings') || {
showTransliteration: true,
showTranslation: true,
fontSize: 'medium',
tafsir: 'ar.muyassar',
};
if (AppState.settings.reciter === 'ar.alafasy') {
AppState.settings.reciter = 'ar.abdurrahmaansudais';
Storage.saveSettings();
}
return this.readerSettings;
},
saveReaderSettings() {
Storage.set('reader_settings', this.readerSettings);
},
loadRepeatMode() {
this.repeatMode = Storage.get('quran_repeat') || 'off';
},
saveRepeatMode() {
Storage.set('quran_repeat', this.repeatMode);
},
async render(container) {
this.loadReaderSettings();
this.loadRepeatMode();
container.innerHTML = `
<div class="page-header quran-list-header">
<button class="quran-list-settings-btn" onclick="QuranPage.openReaderSettings()" title="${t('settings_reader') || 'Ajustes'}" aria-label="${t('settings_reader') || 'Ajustes'}">
<i class="fas fa-sliders-h"></i>
</button>
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
const filtered = this.surahs.filter(s => QuranHelpers.surahMatches(s, query));
this.renderList(filtered);
});
}
} catch (e) {
document.getElementById('surah-list').innerHTML = `
<div class="empty-state">
<div class="empty-state-icon">⚠️</div>
<div class="empty-state-text">${t('error')}: ${escapeHtml(e.message || '')}</div>
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
<div class="empty-state-text">${t('error')}</div>
</div>
`;
return;
}
container.innerHTML = surahs.map(s => {
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
async renderDetail(container, params) {
this.loadReaderSettings();
this.loadRepeatMode();
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
<div class="loading-container"><div class="loader"></div></div>
</div>
`;
try {
if (AppState.settings.reciter === 'ar.alafasy') {
AppState.settings.reciter = 'ar.abdurrahmaansudais';
Storage.saveSettings();
}
const surah = await API.getSurahWithTranslation(
surahNumber,
AppState.settings.translation,
AppState.settings.reciter
);
this.currentSurah = surah;
if (QuranHelpers.shouldShowBismillah(surah.number) && surah.ayahs[0]) {
const a0 = surah.ayahs[0];
a0.arabicDisplay = QuranHelpers.stripBismillahFromFirstAyah(a0.arabic);
if (a0.translation) {
a0.translation = a0.translation
.replace(/^\s*[¡¿]?\s*(En\s+el\s+nombre|In\s+the\s+name)\s+de(l)?\s+(Dios|Allā?h|Allah)[\s,\.\-—]+(el\s+)?(Compasivo|Clémente|Misericordioso|Merciful|Most\s+Gracious|the\s+Entirely\s+Merciful)[^\n]{0,80}/i, '')
.trim();
}
if (a0.transliteration) {
a0.transliteration = a0.transliteration
.replace(/^\s*Bismi[lL]+[aā]+hi?\s+a?[lL]?-?Ra[hḥ]m[aā]ni?\s+a?[lL]?-?Ra[hḥ][iī]m[i]?\.?\s*/i, '')
.trim();
}
}
surah.ayahs.forEach(a => {
if (a.arabicDisplay === undefined) a.arabicDisplay = a.arabic;
});
this.renderReader(container, surah);
if (targetAyah) {
setTimeout(() => this.scrollToAyah(targetAyah, true), 200);
}
} catch (e) {
container.innerHTML = `
<div class="empty-state">
<div class="empty-state-icon">⚠️</div>
<div class="empty-state-text">${t('error')}: ${escapeHtml(e.message || '')}</div>
<button class="btn-primary empty-state-btn" onclick="QuranPage.backToList()">${t('backToWisdom')}</button>
</div>
`;
}
},
renderReader(container, surah) {
const cleanArName = QuranHelpers.removeTashkeel(surah.name);
const showBismillah = QuranHelpers.shouldShowBismillah(surah.number);
const s = this.readerSettings;
const repeatIcon = this.repeatMode === 'off' ? 'fa-repeat' :
this.repeatMode === 'ayah' ? 'fa-redo' : 'fa-sync-alt';
const repeatLabel = this.repeatMode === 'off' ? t('repeatOff') :
this.repeatMode === 'ayah' ? t('repeatAyah') : t('repeatSurah');
container.innerHTML = `
<div class="top-bar reader-top-bar">
<button class="top-bar-btn" onclick="QuranPage.backToList()">
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
<div class="reader-toolbar">
<button class="toolbar-btn" onclick="QuranPage.openSurahPicker()">
<i class="fas fa-list-ul"></i> <span>${surah.number}. ${surah.englishName}</span>
</button>
<button class="toolbar-btn" onclick="QuranPage.openAyahPicker()">
<i class="fas fa-bookmark"></i> <span>${t('ayah')} 1</span>
</button>
<button class="toolbar-btn ${this.repeatMode !== 'off' ? 'active' : ''}" onclick="QuranPage.toggleRepeat()" title="${repeatLabel}">
<i class="fas ${repeatIcon}"></i>
</button>
</div>
<div class="mushaf-page font-${s.fontSize}" id="mushaf-page">
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
<div class="bismillah-row">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</div>
` : ''}
<div class="ayahs-container" id="ayahs-container">
${surah.ayahs.map((a, idx) => this.renderAyah(a, idx, surah)).join('')}
</div>
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
<button class="ayah-fab" onclick="QuranPage.openAyahPicker()" title="${t('jumpToAyah')}">
<i class="fas fa-search"></i>
</button>
`;
},
renderAyah(a, idx, surah) {
const s = this.readerSettings;
const showTranslit = s.showTransliteration && currentLocale !== 'ar' && a.transliteration;
const showTrans = s.showTranslation;
return `
<div class="ayah-block" id="ayah-${a.number}" data-ayah="${a.number}">
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
<div class="ayah-translation">${a.translation}</div>
` : ''}
<div class="ayah-actions">
<button class="ayah-action-btn" onclick="QuranPage.playAyah(${a.number}, '${a.audio || ''}')" id="play-btn-${a.number}" title="${t('play')}">
<i class="fas fa-play"></i>
</button>
<button class="ayah-action-btn repeat-btn" onclick="QuranPage.toggleRepeat(${a.number}, '${a.audio || ''}')" id="repeat-btn-${a.number}" title="${t('repeatAudio')}">
<i class="fas fa-redo"></i>
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
document.getElementById('picker-search-input')?.addEventListener('input', e => {
const q = e.target.value.trim();
const filtered = q ? this.surahs.filter(s => QuranHelpers.surahMatches(s, q)) : this.surahs;
document.getElementById('picker-list').innerHTML = this.renderPickerList(filtered, current);
});
setTimeout(() => {
const el = document.querySelector('.picker-item.current');
if (el) el.scrollIntoView({ block: 'center' });
}, 100);
},
renderPickerList(surahs, current) {
if (!surahs.length) return '<div class="empty-state-mini">No</div>';
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
${grid.map(n => `<button class="ayah-num-btn" onclick="QuranPage.jumpToAyahInPage(${n})">${n}</button>`).join('')}
</div>
`;
document.getElementById('modal-content').innerHTML = html;
document.getElementById('modal-overlay').classList.remove('hidden');
setTimeout(() => document.getElementById('ayah-input')?.focus(), 100);
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
openReaderSettings() {
const s = this.readerSettings;
const localeKey = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
const html = `
<div class="modal-header">
<div class="modal-title">${t('settings_reader')}</div>
<button class="modal-close" onclick="closeModal()">×</button>
</div>
<div class="settings-group">
<div class="settings-label">${t('fontSize')}</div>
<div class="font-size-options">
${['small', 'medium', 'large', 'xlarge'].map(size => `
<button class="font-opt ${s.fontSize === size ? 'active' : ''}" onclick="QuranPage.setFontSize('${size}', this)">
<span class="font-opt-letter font-${size}-preview">أ</span>
<span class="font-opt-label">${size === 'small' ? 'A' : size === 'medium' ? 'AA' : size === 'large' ? 'AAA' : 'AAAA'}</span>
</button>
`).join('')}
</div>
</div>
<div class="settings-group">
<label class="settings-toggle">
<span>${t('transliteration')}</span>
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
<div class="settings-label">🎤 ${t('reciter') || 'Recitador'}</div>
${(CONFIG.RECITERS || []).map(r => `
<div class="tafsir-option ${AppState.settings.reciter === r.id ? 'active' : ''}" onclick="QuranPage.setReciter('${r.id}', this)">
<div class="tafsir-opt-info">
<div class="tafsir-opt-name">${r.name}</div>
<div class="tafsir-opt-desc">${r.country || ''}</div>
</div>
${AppState.settings.reciter === r.id ? '<i class="fas fa-check-circle"></i>' : ''}
</div>
`).join('')}
</div>
<div class="settings-group">
<div class="settings-label">${t('selectTafsir')}</div>
${TafsirService.getAvailableTafsirs(localeKey).map(tf => `
<div class="tafsir-option ${s.tafsir === tf.id ? 'active' : ''}" onclick="QuranPage.setTafsir('${tf.id}', this)">
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
setReciter(reciterId, el) {
AppState.settings.reciter = reciterId;
Storage.saveSettings();
if (el && el.parentElement) {
el.parentElement.querySelectorAll('.tafsir-option').forEach(o => o.classList.remove('active'));
el.classList.add('active');
}
if (this.currentSurah && this.currentSurah.number) {
const num = this.currentSurah.number;
try { localStorage.removeItem(`surah_${num}_${AppState.settings.translation}_${AppState.settings.reciter}`); } catch (e) {}
}
showToast('✅ ' + (CONFIG.RECITERS.find(r => r.id === reciterId)?.name || ''), 1500);
},
setFontSize(size, btn) {
this.readerSettings.fontSize = size;
this.saveReaderSettings();
const page = document.getElementById('mushaf-page');
if (page) {
page.classList.remove('font-small', 'font-medium', 'font-large', 'font-xlarge');
page.classList.add(`font-${size}`);
}
if (btn) {
btn.parentElement.querySelectorAll('.font-opt').forEach(b => b.classList.remove('active'));
btn.classList.add('active');
}
},
toggleSetting(key, value) {
this.readerSettings[key] = value;
this.saveReaderSettings();
if (this.currentSurah) {
const cont = document.getElementById('ayahs-container');
if (cont) {
cont.innerHTML = this.currentSurah.ayahs.map((a, idx) =>
this.renderAyah(a, idx, this.currentSurah)
).join('');
}
}
},
setTafsir(tafsirId, btn) {
this.readerSettings.tafsir = tafsirId;
this.saveReaderSettings();
if (btn) {
btn.parentElement.querySelectorAll('.tafsir-option').forEach(o => o.classList.remove('active'));
btn.classList.add('active');
}
showToast('✓');
},
async openTafsir(surahNum, ayahNum) {
const localeKey = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
const targetLangLabel = { es: 'Español', en: 'English', ar: 'العربية' }[currentLocale] || 'Español';
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
localeKey
);
const ayah = this.currentSurah?.ayahs.find(a => a.number === ayahNum);
const content = document.getElementById('tafsir-content');
if (!content) return;
const hasTranslation = tafsir.translated
&& tafsir.translated.trim().length > 20
&& currentLocale !== 'ar';
const translationFailed = currentLocale !== 'ar' && (!tafsir.translated || tafsir.translated.trim().length <= 20);
content.innerHTML = `
${ayah ? `
<div class="tafsir-ayah-preview">
<div class="tafsir-ayah-arabic" dir="rtl">${ayah.arabic}</div>
${ayah.translation && currentLocale !== 'ar' ? `<div class="tafsir-ayah-trans">"${ayah.translation}"</div>` : ''}
</div>
` : ''}
<div class="tafsir-source-line">
<i class="fas fa-book"></i>
${t('tafsirSource')}: <strong>${tafsir.source}</strong> ${tafsir.sourceAr && currentLocale !== 'ar' ? `(${tafsir.sourceAr})` : ''}
</div>
${hasTranslation ? `
<div class="tafsir-tabs" role="tablist">
<button class="tafsir-tab active" data-tab="translated" onclick="QuranPage.switchTafsirTab(event, 'translated')" type="button">
<i class="fas fa-language"></i> ${targetLangLabel}
</button>
<button class="tafsir-tab" data-tab="arabic" onclick="QuranPage.switchTafsirTab(event, 'arabic')" type="button">
ﺍ ${t('arabicOriginal')}
</button>
</div>
<div class="tafsir-body tafsir-body-translated" id="tafsir-translated">
${this.escapeHtml(tafsir.translated)}
<div class="tafsir-disclaimer">
<i class="fas fa-info-circle"></i> ${t('translatedAuto')}.
</div>
</div>
<div class="tafsir-body tafsir-body-arabic" id="tafsir-arabic" style="display: none;" dir="rtl">
${this.escapeHtml(tafsir.arabic)}
</div>
` : `
${translationFailed ? `
<div class="tafsir-translation-error">
<i class="fas fa-exclamation-triangle"></i>
<span>${t('translationUnavailable') || 'Traducción automática no disponible. Mostrando texto original en árabe.'}</span>
<button class="btn-ghost btn-small" onclick="QuranPage.retryTafsirTranslation(${surahNum}, ${ayahNum})">
<i class="fas fa-redo"></i> ${t('retry') || 'Reintentar'}
</button>
</div>
` : ''}
<div class="tafsir-body tafsir-body-arabic" dir="rtl">
${this.escapeHtml(tafsir.arabic)}
</div>
`}
`;
} catch (e) {
const content = document.getElementById('tafsir-content');
if (content) {
content.innerHTML = `
<div class="empty-state">
<div class="empty-state-icon">⚠️</div>
<div class="empty-state-text">${t('error')}: ${escapeHtml(e.message || '')}</div>
</div>
`;
}
}
},
escapeHtml(text) {
if (!text) return '';
return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
},
async retryTafsirTranslation(surahNum, ayahNum) {
const localeKey = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
const cacheKey = `tafsir_v2_${surahNum}_${ayahNum}_${this.readerSettings.tafsir}_${localeKey}`;
if (typeof Storage !== 'undefined' && Storage.remove) Storage.remove(cacheKey);
else try { localStorage.removeItem(cacheKey); } catch (e) {}
this.openTafsir(surahNum, ayahNum);
},
switchTafsirTab(event, tab) {
event.preventDefault();
event.stopPropagation();
document.querySelectorAll('.tafsir-tab').forEach(b => b.classList.remove('active'));
const targetBtn = event.currentTarget || event.target.closest('.tafsir-tab');
if (targetBtn) targetBtn.classList.add('active');
const tr = document.getElementById('tafsir-translated');
const ar = document.getElementById('tafsir-arabic');
if (tab === 'translated') {
if (tr) tr.style.display = 'block';
if (ar) ar.style.display = 'none';
} else {
if (tr) tr.style.display = 'none';
if (ar) ar.style.display = 'block';
}
},
toggleRepeat(ayahNum, audioUrl) {
if (ayahNum !== undefined) {
if (this.repeatMode === 'ayah' && this.playingAyah === ayahNum) {
this.repeatMode = 'off';
this.saveRepeatMode();
showToast(t('repeatOff'));
} else {
this.repeatMode = 'ayah';
this.saveRepeatMode();
showToast(t('repeatAyah'));
if (this.playingAyah !== ayahNum && audioUrl) {
this.playAyah(ayahNum, audioUrl);
}
}
document.querySelectorAll('.repeat-btn').forEach(b => b.classList.remove('active'));
if (this.repeatMode === 'ayah') {
document.getElementById('repeat-btn-' + ayahNum)?.classList.add('active');
}
return;
}
const modes = ['off', 'ayah', 'surah'];
const idx = modes.indexOf(this.repeatMode);
this.repeatMode = modes[(idx + 1) % modes.length];
this.saveRepeatMode();
const labels = { off: t('repeatOff'), ayah: t('repeatAyah'), surah: t('repeatSurah') };
showToast(labels[this.repeatMode]);
if (this.currentSurah) {
this.renderReader(document.getElementById('main-content'), this.currentSurah);
}
},
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
document.getElementById(`ayah-${num}`)?.classList.remove('playing');
if (typeof WakeLockService !== 'undefined') WakeLockService.release();
return;
}
player.src = audioUrl;
player.play().catch(e => console.warn('Audio:', e));
this.playingAyah = num;
if (typeof WakeLockService !== 'undefined') WakeLockService.acquire('recitation');
const btn = document.getElementById('play-btn-' + num);
if (btn) btn.innerHTML = '<i class="fas fa-pause"></i>';
document.querySelectorAll('.ayah-block').forEach(b => b.classList.remove('playing'));
document.getElementById(`ayah-${num}`)?.classList.add('playing');
player.onended = () => {
const b = document.getElementById('play-btn-' + num);
if (b) b.innerHTML = '<i class="fas fa-play"></i>';
document.getElementById(`ayah-${num}`)?.classList.remove('playing');
this.playingAyah = null;
if (this.repeatMode === 'ayah') {
setTimeout(() => this.playAyah(num, audioUrl), 300);
return;
}
const next = this.currentSurah?.ayahs.find(a => a.number === num + 1);
if (next) {
this.scrollToAyah(num + 1);
this.playAyah(num + 1, next.audio);
} else if (this.repeatMode === 'surah') {
const first = this.currentSurah?.ayahs[0];
if (first) {
this.scrollToAyah(1);
this.playAyah(1, first.audio);
}
} else {
if (typeof WakeLockService !== 'undefined') WakeLockService.release();
}
};
},
toggleBookmark(surahNum, ayahNum) {
const bookmarks = Storage.get('bookmarks') || [];
const key = `${surahNum}:${ayahNum}`;
const idx = bookmarks.indexOf(key);
const btn = document.getElementById(`bookmark-${ayahNum}`);
if (idx >= 0) {
bookmarks.splice(idx, 1);
if (btn) btn.innerHTML = '<i class="far fa-bookmark"></i>';
} else {
bookmarks.push(key);
if (btn) btn.innerHTML = '<i class="fas fa-bookmark" style="color: var(--accent);"></i>';
}
Storage.set('bookmarks', bookmarks);
},
async shareAyah(surahNum, ayahNum) {
const ayah = this.currentSurah?.ayahs.find(a => a.number === ayahNum);
if (!ayah) return;
const text = `${ayah.arabic}\n\n"${ayah.translation}"\n\n— ${this.currentSurah.englishName} ${surahNum}:${ayahNum}\n\nQuba 🕌`;
if (navigator.share) {
try { await navigator.share({ text }); } catch (e) {}
} else {
try {
await navigator.clipboard.writeText(text);
showToast('📋');
} catch (e) {}
}
},
cleanup() {
const player = document.getElementById('audio-player');
if (player) { player.pause(); player.src = ''; }
this.playingAyah = null;
},
};


/* ==== pages/prayer.js ==== */
const PrayerPage = {
activeTab: 'times',
qiblaBearing: 0,
deviceHeading: 0,
orientationHandler: null,
permissionGranted: false,
async render(container, params = {}) {
if (params && params.tab && ['times','monthly','qibla'].includes(params.tab)) {
this.activeTab = params.tab;
}
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
if (typeof PrayerNotifications !== 'undefined' && PrayerNotifications.isEnabled()) {
PrayerNotifications.scheduleDay(AppState.timings, AppState.settings.locale || 'es');
}
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
monthlyTab(loc) {
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
let heading = null;
if (e.webkitCompassHeading !== undefined) {
heading = e.webkitCompassHeading;
} else if (e.absolute && e.alpha !== null) {
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


/* ==== pages/calendar.js ==== */
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
const firstDay = this.calendar[0];
const firstDate = firstDay ? new Date(firstDay.gregorian.date.split('-').reverse().join('-')) : new Date();
const firstWeekday = (firstDate.getDay() + 6) % 7; // 0=Lunes
const emptyCells = Array(firstWeekday).fill(null);
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


/* ==== pages/profile.js ==== */
const ProfilePage = {
async render(container) {
const methodName = CONFIG.CALCULATION_METHODS[AppState.settings.calculationMethod] || '—';
const langLabel = { es: '🇪🇸 Español', ar: '🇸🇦 العربية', en: '🇬🇧 English' }[AppState.settings.locale];
const themeLabel = {
light: '☀️ ' + t('themeLight'),
dark: '🌙 ' + t('themeDark'),
auto: '🔄 ' + t('themeAuto'),
}[AppState.settings.theme];
if (!AppState.settings.adhan) {
AppState.settings.adhan = {
voice1: 'makkah',       // 1er takbeer
voice2: 'madinah',      // 2do takbeer
volume: 0.8,
muted: false,
};
}
const adhanVoice1 = AdhanService.VOICES.find(v => v.id === AppState.settings.adhan.voice1) || AdhanService.VOICES[0];
const adhanVoice2 = AdhanService.VOICES.find(v => v.id === AppState.settings.adhan.voice2) || AdhanService.VOICES[1];
const loc = AppState.location || LocationService.getCached();
container.innerHTML = `
<div class="profile-header">
<div class="profile-avatar">
<picture>
<source srcset="assets/mascot/avatar.webp" type="image/webp">
<img src="assets/mascot/avatar.png" alt="Quba" style="width:90px;height:90px;border-radius:50%;">
</picture>
</div>
<div class="profile-name">${escapeHtml(AppState.settings.userName || t('welcome'))}</div>
<div class="profile-subtitle">${t('tagline')}</div>
</div>
<div style="padding: 0 var(--sp-md);">
<!-- v15: Nombre del usuario (para certificados) -->
<div class="section-label">👤 ${t('yourName') || 'Tu nombre'}</div>
<div class="card" style="padding:0;overflow:hidden;">
<div class="list-row" onclick="ProfilePage.editUserName()">
<div class="list-row-icon"><i class="fas fa-user-edit"></i></div>
<div class="list-row-info">
<div class="list-row-label">${t('displayName') || 'Nombre para mostrar'}</div>
<div class="list-row-value">${AppState.settings.userName ? escapeHtml(AppState.settings.userName) : (t('nameHint') || 'Aparecerá en tus certificados')}</div>
</div>
<i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} list-row-chevron"></i>
</div>
</div>
<!-- Location -->
<div class="section-label">📍 ${t('location') || 'Ubicación'}</div>
<div class="card" style="padding:0;overflow:hidden;">
<div class="list-row" onclick="ProfilePage.requestLocation()">
<div class="list-row-icon"><i class="fas fa-map-marker-alt"></i></div>
<div class="list-row-info">
<div class="list-row-label">${loc ? (loc.city || t('unknownCity') || 'Desconocido') : t('noLocation') || 'Sin ubicación'}</div>
<div class="list-row-value">${loc ? (loc.country + (loc.isDefault ? ' · ' + (t('defaultLocation') || 'por defecto') : '') + (loc.manual ? ' · ' + (t('manual') || 'manual') : '')) : ''}</div>
</div>
<i class="fas fa-sync-alt list-row-chevron"></i>
</div>
<div class="list-row" onclick="ProfilePage.pickCity()">
<div class="list-row-icon"><i class="fas fa-city"></i></div>
<div class="list-row-info">
<div class="list-row-label">${t('changeCity') || 'Cambiar ciudad'}</div>
<div class="list-row-value">${t('manualLocation') || 'Ubicación manual'}</div>
</div>
<i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} list-row-chevron"></i>
</div>
</div>
<!-- General settings -->
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
</div>
<!-- ADHAN settings -->
<div class="section-label">🕌 ${t('adhanSettings') || 'Adhan (Llamada a la oración)'}</div>
<div class="card" style="padding:0;overflow:hidden;">
<div class="list-row" onclick="ProfilePage.pickAdhanVoice(1)">
<div class="list-row-icon">1️⃣</div>
<div class="list-row-info">
<div class="list-row-label">${t('adhanFirstTakbeer') || 'Primer Takbeer'}</div>
<div class="list-row-value">${adhanVoice1.name}</div>
</div>
<button class="list-row-btn" onclick="event.stopPropagation(); AdhanService.preview('${adhanVoice1.id}')">
<i class="fas fa-play"></i>
</button>
<i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} list-row-chevron"></i>
</div>
<div class="list-row" onclick="ProfilePage.pickAdhanVoice(2)">
<div class="list-row-icon">2️⃣</div>
<div class="list-row-info">
<div class="list-row-label">${t('adhanSecondTakbeer') || 'Segundo Takbeer'}</div>
<div class="list-row-value">${adhanVoice2.name}</div>
</div>
<button class="list-row-btn" onclick="event.stopPropagation(); AdhanService.preview('${adhanVoice2.id}')">
<i class="fas fa-play"></i>
</button>
<i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} list-row-chevron"></i>
</div>
<div class="list-row" onclick="ProfilePage.toggleAdhanMute()">
<div class="list-row-icon"><i class="fas fa-${AppState.settings.adhan.muted ? 'volume-mute' : 'volume-up'}"></i></div>
<div class="list-row-info">
<div class="list-row-label">${t('adhanMute') || 'Silenciar Adhan'}</div>
<div class="list-row-value">${AppState.settings.adhan.muted ? (t('muted') || 'Silenciado') : (t('active') || 'Activo')}</div>
</div>
<label class="toggle-switch">
<input type="checkbox" ${AppState.settings.adhan.muted ? 'checked' : ''} onchange="ProfilePage.toggleAdhanMute()">
<span class="toggle-slider"></span>
</label>
</div>
<div class="list-row" style="flex-direction:column;align-items:stretch;">
<div style="display:flex;align-items:center;gap:14px;">
<div class="list-row-icon"><i class="fas fa-volume-down"></i></div>
<div class="list-row-info">
<div class="list-row-label">${t('adhanVolume') || 'Volumen'}</div>
<div class="list-row-value" id="volume-value">${Math.round(AppState.settings.adhan.volume * 100)}%</div>
</div>
</div>
<input type="range" min="0" max="100" value="${Math.round(AppState.settings.adhan.volume * 100)}"
class="volume-slider"
oninput="ProfilePage.setAdhanVolume(this.value)"
onchange="ProfilePage.setAdhanVolume(this.value)"
style="width:100%;margin-top:12px;">
</div>
<!-- 🔔 Notificaciones de oración -->
<div class="list-row" onclick="ProfilePage.togglePrayerNotif()">
<div class="list-row-icon"><i class="fas fa-bell"></i></div>
<div class="list-row-info">
<div class="list-row-label">${t('prayerNotif') || 'Notificaciones de oración'}</div>
<div class="list-row-value">${(typeof PrayerNotifications !== 'undefined' && PrayerNotifications.isEnabled()) ? (t('active') || 'Activo') : (t('inactive') || 'Inactivo')}</div>
</div>
<label class="toggle-switch">
<input type="checkbox" ${(typeof PrayerNotifications !== 'undefined' && PrayerNotifications.isEnabled()) ? 'checked' : ''} onchange="ProfilePage.togglePrayerNotif()">
<span class="toggle-slider"></span>
</label>
</div>
</div>
<!-- 🗑️ Zona de datos -->
<div class="section-label">${t('dataZone') || 'Datos y progreso'}</div>
<div class="card" style="padding:0;overflow:hidden;">
<div class="list-row" onclick="ProfilePage.exportData()">
<div class="list-row-icon"><i class="fas fa-download"></i></div>
<div class="list-row-info">
<div class="list-row-label">${t('exportData') || 'Exportar datos'}</div>
<div class="list-row-value">${t('exportDataDesc') || 'Guardar copia local (JSON)'}</div>
</div>
<i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} list-row-chevron"></i>
</div>
<div class="list-row list-row-danger" onclick="ProfilePage.confirmResetProgress()">
<div class="list-row-icon" style="background:#fee;color:#c33;"><i class="fas fa-redo"></i></div>
<div class="list-row-info">
<div class="list-row-label" style="color:#c33;">${t('resetProgress') || 'Reiniciar progreso'}</div>
<div class="list-row-value">${t('resetProgressDesc') || 'Borrar XP, marcadores y ajustes'}</div>
</div>
<i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} list-row-chevron"></i>
</div>
</div>
<!-- About -->
<div class="section-label">${t('about')}</div>
<div class="card about-card">
<img src="assets/icon.png" alt="Quba" style="width:80px;height:80px;border-radius:22px;margin-bottom:8px;">
<div class="about-name">Quba — قُبَّة</div>
<div class="about-version">v${typeof APP_VERSION !== 'undefined' ? APP_VERSION : '4.0.0'} — Web PWA</div>
<div class="about-desc">${t('tagline')}</div>
<div class="about-credits">
APIs: Aladhan · Al-Quran Cloud · UmmahAPI · OpenStreetMap
</div>
</div>
<!-- Mosque footer credit -->
<div class="mosque-footer">
<div class="mosque-footer-title">🕌 ${t('mosqueFooterTitle') || 'Masjid Abdullah'}</div>
<div class="mosque-footer-line">${t('mosqueFooterMade') || 'Hecho en La Habana, Cuba · 2026'}</div>
<div class="mosque-footer-desc">${t('mosqueFooterDesc') || 'Diseñado especialmente para el Masjid Abdullah y la comunidad musulmana de Cuba y América Latina.'}</div>
<div class="mosque-footer-emoji">🕌 · 🌙 · ✨</div>
</div>
</div>
`;
},
editUserName() {
const current = AppState.settings.userName || '';
const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
const labels = {
es: { title: 'Tu nombre', hint: 'Aparecerá en tus certificados de cursos', placeholder: 'Ej: Ahmad Al-Sayyid', save: 'Guardar', cancel: 'Cancelar' },
ar: { title: 'اسمك',        hint: 'سيظهر في شهادات إنجاز الدورات',        placeholder: 'مثال: أحمد السيد',    save: 'حفظ',      cancel: 'إلغاء' },
en: { title: 'Your name',   hint: 'Will appear on your course certificates', placeholder: 'e.g. Ahmad Al-Sayyid', save: 'Save',     cancel: 'Cancel' },
};
const L = labels[lang];
const html = `
<div class="modal-header">
<div class="modal-title">👤 ${L.title}</div>
<button class="modal-close" onclick="closeModal()" aria-label="${L.cancel}">×</button>
</div>
<div style="padding: 8px 4px 4px;">
<div style="color:var(--text-secondary);font-size:13px;margin-bottom:12px;">${L.hint}</div>
<input type="text" id="user-name-input" value="${escapeAttr(current)}" placeholder="${escapeAttr(L.placeholder)}" maxlength="60"
style="width:100%;padding:12px 14px;border:2px solid #D4AF37;border-radius:12px;font-size:16px;background:var(--card);color:var(--text);">
<div style="display:flex;gap:10px;margin-top:16px;">
<button class="btn-secondary" style="flex:1;padding:12px;border-radius:12px;border:1px solid var(--text-secondary);background:transparent;color:var(--text);cursor:pointer;" onclick="closeModal()">${L.cancel}</button>
<button class="btn-primary" style="flex:2;padding:12px;" onclick="ProfilePage.saveUserName()">${L.save}</button>
</div>
</div>
`;
document.getElementById('modal-content').innerHTML = html;
document.getElementById('modal-overlay').classList.remove('hidden');
setTimeout(() => {
const inp = document.getElementById('user-name-input');
if (inp) { inp.focus(); inp.select(); }
}, 100);
const inp = document.getElementById('user-name-input');
if (inp) inp.addEventListener('keypress', e => { if (e.key === 'Enter') ProfilePage.saveUserName(); });
},
saveUserName() {
const inp = document.getElementById('user-name-input');
if (!inp) return;
const val = inp.value.trim().slice(0, 60);
AppState.settings.userName = val;
Storage.saveSettings();
closeModal();
showToast('✅ ' + (t('nameSaved') || 'Nombre guardado'), 1500);
this.render(document.getElementById('main-content'));
},
async requestLocation() {
showToast('📍 ' + (t('requestingLocation') || 'Solicitando ubicación...'), 1500);
const coords = await LocationService.requestPermission();
if (coords) {
AppState.location = coords;
AppState.timings = null; // Invalidate prayer cache
this.render(document.getElementById('main-content'));
}
},
pickCity() {
const cities = [
{ id: 'havana', label: '🇨🇺 La Habana, Cuba', lat: 23.1136, lon: -82.3666 },
{ id: 'madrid', label: '🇪🇸 Madrid, España', lat: 40.4168, lon: -3.7038 },
{ id: 'barcelona', label: '🇪🇸 Barcelona, España', lat: 41.3851, lon: 2.1734 },
{ id: 'mecca', label: '🕋 La Meca, Arabia Saudí', lat: 21.4225, lon: 39.8262 },
{ id: 'medina', label: '🕌 Medina, Arabia Saudí', lat: 24.4672, lon: 39.6111 },
{ id: 'cairo', label: '🇪🇬 El Cairo, Egipto', lat: 30.0444, lon: 31.2357 },
{ id: 'istanbul', label: '🇹🇷 Estambul, Turquía', lat: 41.0082, lon: 28.9784 },
{ id: 'buenos_aires', label: '🇦🇷 Buenos Aires, Argentina', lat: -34.6037, lon: -58.3816 },
{ id: 'mexico', label: '🇲🇽 CDMX, México', lat: 19.4326, lon: -99.1332 },
{ id: 'bogota', label: '🇨🇴 Bogotá, Colombia', lat: 4.7110, lon: -74.0721 },
];
const currentId = null;
showModal(t('changeCity') || 'Cambiar ciudad', cities.map(c => ({ id: c.id, label: c.label })), currentId, id => {
const city = cities.find(c => c.id === id);
if (!city) return;
LocationService.setManual(city.lat, city.lon, city.label.split(',')[0].replace(/^[^\s]+\s/, '').trim(), city.label.split(',').pop().trim());
AppState.timings = null;
showToast('✅ ' + city.label, 2000);
this.render(document.getElementById('main-content'));
});
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
AppState.timings = null;
this.render(document.getElementById('main-content'));
showToast('✅ ' + t('settings'));
});
},
pickAdhanVoice(takbeerNum) {
const options = AdhanService.VOICES.map(v => ({
id: v.id,
label: `${v.flag || '🕌'} ${v.name} · ${v.country}`,
}));
const currentId = takbeerNum === 1 ? AppState.settings.adhan.voice1 : AppState.settings.adhan.voice2;
const title = takbeerNum === 1
? (t('adhanFirstTakbeer') || 'Primer Takbeer')
: (t('adhanSecondTakbeer') || 'Segundo Takbeer');
showModal(title, options, currentId, id => {
if (takbeerNum === 1) AppState.settings.adhan.voice1 = id;
else AppState.settings.adhan.voice2 = id;
Storage.saveSettings();
this.render(document.getElementById('main-content'));
AdhanService.preview(id);
});
},
toggleAdhanMute() {
AppState.settings.adhan.muted = !AppState.settings.adhan.muted;
Storage.saveSettings();
this.render(document.getElementById('main-content'));
showToast(AppState.settings.adhan.muted
? '🔇 ' + (t('adhanMuted') || 'Adhan silenciado')
: '🔊 ' + (t('adhanUnmuted') || 'Adhan activo'), 1500);
},
setAdhanVolume(val) {
const v = Math.max(0, Math.min(100, parseInt(val, 10))) / 100;
AppState.settings.adhan.volume = v;
Storage.saveSettings();
const el = document.getElementById('volume-value');
if (el) el.textContent = Math.round(v * 100) + '%';
AdhanService.setVolume(v);
},
exportData() {
try {
const data = { version: (typeof APP_VERSION !== 'undefined' ? APP_VERSION : '4.0.0'), exportedAt: new Date().toISOString(), storage: {} };
for (let i = 0; i < localStorage.length; i++) {
const k = localStorage.key(i);
if (k && k.startsWith('quba_')) data.storage[k] = localStorage.getItem(k);
}
const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `quba-backup-${new Date().toISOString().slice(0,10)}.json`;
document.body.appendChild(a);
a.click();
setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 100);
showToast(t('exportOk') || '✅ Backup descargado');
} catch(e) {
showToast(t('error') + ': ' + e.message);
}
},
confirmResetProgress() {
const msg = t('confirmReset') || '¿Borrar TODO tu progreso (XP, marcadores, ajustes, caché)? Esta acción no se puede deshacer.';
if (!confirm(msg)) return;
const confirmText = t('resetTypeConfirm') || 'BORRAR';
const input = prompt((t('resetTypeQuestion') || 'Escribe') + ` "${confirmText}" ` + (t('resetTypeToConfirm') || 'para confirmar:'));
if (input !== confirmText) {
showToast(t('resetCancelled') || 'Cancelado');
return;
}
const keysToRemove = [];
for (let i = 0; i < localStorage.length; i++) {
const k = localStorage.key(i);
if (k && (k.startsWith('quba_') || k === 'pwa_dismissed_at')) keysToRemove.push(k);
}
keysToRemove.forEach(k => localStorage.removeItem(k));
if (typeof CacheDB !== 'undefined') {
CacheDB.clear().catch(() => {});
}
showToast(t('resetOk') || '✅ Progreso reiniciado. Recargando...');
setTimeout(() => location.reload(), 1500);
},
async togglePrayerNotif() {
if (typeof PrayerNotifications === 'undefined') return;
if (PrayerNotifications.isEnabled()) {
PrayerNotifications.disable();
} else {
const ok = await PrayerNotifications.enable();
if (ok && AppState.timings) {
PrayerNotifications.scheduleDay(AppState.timings, AppState.settings.locale || 'es');
}
}
this.render(document.getElementById('main-content'));
},
cleanup() {
AdhanService.stopPreview();
},
};


/* ==== pages/wisdom/quiz.js ==== */
const QuizPage = {
state: null,
CATEGORIES: [
{ id: 'quran', nameKey: 'quizCatQuran', icon: '📖', data: () => (typeof QUIZ_QURAN !== 'undefined' ? QUIZ_QURAN : []), color: '#0F4C3A' },
{ id: 'sira', nameKey: 'quizCatSira', icon: '🕋', data: () => (typeof QUIZ_SIRA !== 'undefined' ? QUIZ_SIRA : []), color: '#D4AF37' },
{ id: 'hadith', nameKey: 'quizCatHadith', icon: '📜', data: () => (typeof QUIZ_HADITH !== 'undefined' ? QUIZ_HADITH : []), color: '#1A6B52' },
{ id: 'fiqh', nameKey: 'quizCatFiqh', icon: '⚖️', data: () => (typeof QUIZ_FIQH !== 'undefined' ? QUIZ_FIQH : []), color: '#8E6E1E' },
{ id: 'history', nameKey: 'quizCatHistory', icon: '🌙', data: () => (typeof QUIZ_HISTORY !== 'undefined' ? QUIZ_HISTORY : []), color: '#4A6FA5' },
{ id: 'prophets', nameKey: 'quizCatProphets', icon: '👨', data: () => (typeof QUIZ_PROPHETS !== 'undefined' ? QUIZ_PROPHETS : []), color: '#6A4E8F' },
],
renderCategorySelect(container) {
const gameState = Gamification.getState();
container.innerHTML = `
<div class="top-bar">
<button class="top-bar-btn" onclick="Router.go('wisdom')">
<i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
</button>
<div class="top-bar-title">🧠 ${t('quizCategories') || 'Categorías'}</div>
<div style="width: 30px;"></div>
</div>
<div style="padding: var(--sp-md);">
<p class="quiz-intro">${t('quizIntro') || 'Elige una categoría. Cada quiz: 10 preguntas. Gana XP por cada respuesta correcta.'}</p>
${this.CATEGORIES.map(cat => {
const stat = gameState.stats.categoryStats?.[cat.id] || { correct: 0, total: 0 };
const accuracy = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
const count = cat.data().length;
return `
<div class="category-card" onclick="QuizPage.startQuiz('${cat.id}')" style="border-left-color: ${cat.color}">
<div class="cat-icon" style="background: ${cat.color}22; color: ${cat.color}">${cat.icon}</div>
<div class="cat-info">
<div class="cat-name">${t(cat.nameKey) || cat.id}</div>
<div class="cat-stats">${count} ${t('questions') || 'preguntas'} · ${stat.correct}/${stat.total} · ${accuracy}%</div>
</div>
<i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} cat-arrow"></i>
</div>
`;
}).join('')}
</div>
`;
},
startQuiz(categoryId) {
const container = document.getElementById('main-content');
const category = this.CATEGORIES.find(c => c.id === categoryId);
if (!category) return;
const allQuestions = category.data();
if (allQuestions.length === 0) {
container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">⚠️</div><div>${t('noQuestions') || 'No hay preguntas disponibles'}</div><button class="btn-primary" onclick="Router.go('wisdom/quiz')">${t('back') || 'Volver'}</button></div>`;
return;
}
const pickRandom = (arr, n) => {
const shuffled = [...arr].sort(() => Math.random() - 0.5);
return shuffled.slice(0, Math.min(n, arr.length));
};
const byDiff = { easy: [], medium: [], hard: [] };
allQuestions.forEach(q => {
const d = q.difficulty || 'medium';
(byDiff[d] || byDiff.medium).push(q);
});
const easyPick = pickRandom(byDiff.easy, 4);
const mediumPick = pickRandom(byDiff.medium, 4);
const hardPick = pickRandom(byDiff.hard, 2);
let selected = [...easyPick, ...mediumPick, ...hardPick];
if (selected.length < 10) {
const usedIds = new Set(selected.map(q => q.q));
const remaining = allQuestions.filter(q => !usedIds.has(q.q));
selected = [...selected, ...pickRandom(remaining, 10 - selected.length)];
const rank = { easy: 1, medium: 2, hard: 3 };
selected.sort((a, b) => (rank[a.difficulty] || 2) - (rank[b.difficulty] || 2));
}
selected = selected.slice(0, 10);
this.state = {
category: category.id,
categoryName: t(category.nameKey) || category.id,
questions: selected,
current: 0,
correct: 0,
wrong: 0,
totalXpEarned: 0,
answered: false,
};
this.renderQuestion(container);
},
renderQuestion(container) {
const s = this.state;
if (!s || s.current >= s.questions.length) {
this.finishQuiz(container);
return;
}
const q = s.questions[s.current];
const progress = ((s.current + 1) / s.questions.length) * 100;
const lang = AppState.settings?.language || currentLocale || 'es';
const questionText = typeof q.question === 'object'
? (q.question[lang] || q.question.es)
: (q.question || q.q);
const options = (q.options || []).map(opt =>
typeof opt === 'object' ? (opt[lang] || opt.es) : opt
);
container.innerHTML = `
<div class="quiz-header">
<button class="quiz-close" onclick="QuizPage.confirmExit()">
<i class="fas fa-times"></i>
</button>
<div class="quiz-progress-wrap">
<div class="quiz-progress-bar" style="width: ${progress}%"></div>
</div>
<!-- v12: hearts removed — unlimited play -->
</div>
<div class="quiz-content" id="quiz-content">
<div class="quiz-counter">${s.current + 1} / ${s.questions.length}</div>
<div class="quiz-category-tag">${s.categoryName}</div>
${q.difficulty ? `<div class="quiz-difficulty-badge quiz-diff-${q.difficulty}">${
q.difficulty === 'easy' ? '⭐ ' + (t('easy') || 'Fácil') :
q.difficulty === 'medium' ? '🔥 ' + (t('medium') || 'Medio') :
'💎 ' + (t('hard') || 'Difícil')
}</div>` : ''}
<div class="quiz-question">${questionText}</div>
<div class="quiz-options">
${options.map((opt, idx) => `
<button class="quiz-option" data-idx="${idx}" onclick="QuizPage.selectAnswer(${idx})">
<span class="quiz-option-letter">${String.fromCharCode(65 + idx)}</span>
<span class="quiz-option-text">${opt}</span>
</button>
`).join('')}
</div>
</div>
`;
},
selectAnswer(idx) {
const s = this.state;
if (s.answered) return;
s.answered = true;
const q = s.questions[s.current];
const correctIdx = (q.correctIndex !== undefined) ? q.correctIndex : q.correct;
const isCorrect = idx === correctIdx;
const lang = AppState.settings?.language || currentLocale || 'es';
const explanation = typeof q.explanation === 'object'
? (q.explanation?.[lang] || q.explanation?.es)
: q.explanation;
const buttons = document.querySelectorAll('.quiz-option');
buttons.forEach((btn, i) => {
btn.disabled = true;
if (i === correctIdx) btn.classList.add('correct');
else if (i === idx && !isCorrect) btn.classList.add('wrong');
});
let xpEarned = 0;
if (isCorrect) {
s.correct++;
xpEarned = Gamification.XP_CORRECT_ANSWER || 10;
s.totalXpEarned += xpEarned;
Gamification.recordQuizAnswer(s.category, true);
if (navigator.vibrate) navigator.vibrate(50);
} else {
s.wrong++;
Gamification.recordQuizAnswer(s.category, false);
if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
}
const content = document.getElementById('quiz-content');
const banner = document.createElement('div');
banner.className = `feedback-banner ${isCorrect ? 'correct' : 'wrong'}`;
banner.innerHTML = `
<div class="feedback-title">
${isCorrect ? '✅ ' + (t('correct') || '¡Correcto!') : '❌ ' + (t('incorrect') || 'Incorrecto')}
${xpEarned ? `<span class="xp-pill">+${xpEarned} XP</span>` : ''}
</div>
${explanation ? `<div class="feedback-explanation">${explanation}</div>` : ''}
${q.source ? `<div class="feedback-source">— ${q.source}</div>` : ''}
<button class="btn-primary" onclick="QuizPage.nextQuestion()">
${s.current + 1 >= s.questions.length ? (t('seeResults') || 'Ver resultados') : (t('next') || 'Siguiente')} →
</button>
`;
content.appendChild(banner);
banner.scrollIntoView({ behavior: 'smooth', block: 'end' });
},
nextQuestion() {
this.state.current++;
this.state.answered = false;
const container = document.getElementById('main-content');
this.renderQuestion(container);
},
finishQuiz(container, gameOver = false) {
const s = this.state;
const perfect = s.wrong === 0 && s.correct === s.questions.length;
if (perfect) s.totalXpEarned += Gamification.XP_BONUS_NO_MISTAKES || 50;
Gamification.addXP(s.totalXpEarned);
Gamification.recordQuizCompleted(perfect);
this.renderResult(container, {
correct: s.correct,
wrong: s.wrong,
total: s.questions.length,
xp: s.totalXpEarned,
perfect,
gameOver,
category: s.category,
categoryName: s.categoryName,
});
},
renderResult(container, params) {
const accuracy = params.total > 0 ? Math.round((params.correct / params.total) * 100) : 0;
const stars = params.perfect ? 3 : (accuracy >= 80 ? 2 : (accuracy >= 60 ? 1 : 0));
container.innerHTML = `
<div class="quiz-result-screen">
<div class="result-header">
<div class="result-icon">${params.perfect ? '🏆' : (accuracy >= 60 ? '🎉' : '💪')}</div>
<div class="result-title">${params.perfect ? (t('perfect') || '¡Perfecto!') : (accuracy >= 60 ? (t('wellDone') || '¡Bien hecho!') : (t('keepPracticing') || 'Sigue practicando'))}</div>
<div class="result-subtitle">${params.categoryName}</div>
<div class="result-stars">
${[1,2,3].map(i => `<span class="star ${i <= stars ? 'active' : ''}">⭐</span>`).join('')}
</div>
</div>
<div class="result-stats">
<div class="result-stat">
<div class="result-stat-value">${params.correct}/${params.total}</div>
<div class="result-stat-label">${t('correctPlural') || 'Correctas'}</div>
</div>
<div class="result-stat">
<div class="result-stat-value">${accuracy}%</div>
<div class="result-stat-label">${t('accuracy') || 'Precisión'}</div>
</div>
<div class="result-stat highlight">
<div class="result-stat-value">+${params.xp}</div>
<div class="result-stat-label">${t('xpEarned') || 'XP ganados'}</div>
</div>
</div>
${params.perfect ? `<div class="bonus-banner">🎁 ${t('perfectBonus') || 'Bonus de quiz perfecto'}: +50 XP</div>` : ''}
<!-- v12: game-over banner removed — unlimited play -->
<div class="result-actions">
<button class="btn-primary" onclick="QuizPage.startQuiz('${params.category}')">
🔄 ${t('playAgain') || 'Jugar otra vez'}
</button>
<button class="btn-ghost" onclick="Router.go('wisdom/quiz')">
${t('otherCategory') || 'Otra categoría'}
</button>
<button class="btn-ghost" onclick="Router.go('wisdom')">
${t('backToWisdom') || 'Volver'}
</button>
</div>
</div>
`;
},
confirmExit() {
if (confirm(t('confirmExitQuiz') || '¿Salir del quiz? Perderás tu progreso actual.')) {
this.state = null;
Router.go('wisdom/quiz');
}
},
cleanup() {},
};


/* ==== pages/wisdom/tasbih.js ==== */
const TasbihPage = {
count: 0,
totalCount: 0,
targetCount: 33,
currentDhikr: 0,
soundEnabled: true,
DHIKRS: [
{
ar: 'سُبْحَانَ اللَّهِ', tr: 'Subhanallah',
es: 'Glorificado sea Allah', en: 'Glory be to Allah',
target: 33,
},
{
ar: 'الْحَمْدُ لِلَّهِ', tr: 'Alhamdulillah',
es: 'Alabado sea Allah', en: 'All praise is for Allah',
target: 33,
},
{
ar: 'اللَّهُ أَكْبَرُ', tr: 'Allahu Akbar',
es: 'Allah es el más Grande', en: 'Allah is the Greatest',
target: 34,
},
{
ar: 'لَا إِلَهَ إِلَّا اللَّهُ', tr: "La ilaha illa-Allah",
es: 'No hay divinidad sino Allah', en: 'There is no god but Allah',
target: 100,
},
{
ar: 'أَسْتَغْفِرُ اللَّهَ', tr: 'Astaghfirullah',
es: 'Pido perdón a Allah', en: 'I seek Allah\'s forgiveness',
target: 100,
},
{
ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', tr: 'Subhanallahi wa bihamdihi',
es: 'Glorificado y alabado sea Allah', en: 'Glory and praise be to Allah',
target: 100,
},
{
ar: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', tr: 'La hawla wa la quwwata illa billah',
es: 'No hay fuerza ni poder sino con Allah', en: 'There is no power nor might except with Allah',
target: 100,
},
{
ar: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', tr: 'Allahumma salli ala Muhammad',
es: 'Oh Allah, bendice a Muhammad ﷺ', en: 'O Allah, send blessings upon Muhammad ﷺ',
target: 100,
},
],
render(container) {
const saved = Storage.get('tasbih') || { count: 0, totalCount: 0, currentDhikr: 0, soundEnabled: true };
this.count = saved.count || 0;
this.totalCount = saved.totalCount || 0;
this.currentDhikr = saved.currentDhikr || 0;
this.soundEnabled = saved.soundEnabled !== false;
this.targetCount = this.DHIKRS[this.currentDhikr].target;
this.renderUI(container);
},
renderUI(container) {
const dhikr = this.DHIKRS[this.currentDhikr];
const progress = Math.min(this.count / this.targetCount, 1);
const isComplete = this.count >= this.targetCount;
const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
const translation = dhikr[lang === 'ar' ? 'es' : lang]; // arabic UI still shows ES translation under arabic
container.innerHTML = `
<div class="top-bar">
<button class="top-bar-btn" onclick="Router.go('wisdom')">
<i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
</button>
<div class="top-bar-title">📿 ${t('tasbihTitle') || 'Tasbih'}</div>
<button class="top-bar-btn" onclick="TasbihPage.toggleSound()" title="${t('sound') || 'Sound'}">
<i class="fas fa-${this.soundEnabled ? 'volume-up' : 'volume-mute'}"></i>
</button>
</div>
<div class="tasbih-container">
<!-- Dhikr selector -->
<div class="dhikr-selector">
<button class="dhikr-nav" onclick="TasbihPage.changeDhikr(-1)" ${this.currentDhikr === 0 ? 'disabled' : ''}>
<i class="fas fa-chevron-left"></i>
</button>
<div class="dhikr-name">${this.currentDhikr + 1} / ${this.DHIKRS.length}</div>
<button class="dhikr-nav" onclick="TasbihPage.changeDhikr(1)" ${this.currentDhikr === this.DHIKRS.length - 1 ? 'disabled' : ''}>
<i class="fas fa-chevron-right"></i>
</button>
</div>
<!-- Dhikr text display -->
<div class="dhikr-display">
<div class="dhikr-arabic">${dhikr.ar}</div>
<div class="dhikr-trans">${dhikr.tr}</div>
<div class="dhikr-es">${dhikr[lang] || dhikr.es}</div>
</div>
<!-- Counter circle -->
<div class="tasbih-counter ${isComplete ? 'complete' : ''}" id="tasbih-counter" onclick="TasbihPage.increment()">
<svg class="tasbih-ring" width="260" height="260" viewBox="0 0 260 260">
<circle cx="130" cy="130" r="118" fill="none" stroke="rgba(212,175,55,0.15)" stroke-width="10"/>
<circle cx="130" cy="130" r="118" fill="none" stroke="url(#tasbih-gradient)" stroke-width="10"
stroke-linecap="round"
stroke-dasharray="${2 * Math.PI * 118}"
stroke-dashoffset="${2 * Math.PI * 118 * (1 - progress)}"
transform="rotate(-90 130 130)"
style="transition: stroke-dashoffset 0.4s cubic-bezier(0.4,0,0.2,1);"/>
<defs>
<linearGradient id="tasbih-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="#0F4C3A"/>
<stop offset="100%" stop-color="#D4AF37"/>
</linearGradient>
</defs>
</svg>
<div class="tasbih-center">
<div class="tasbih-count" id="tasbih-count-val">${this.count}</div>
<div class="tasbih-target">/ ${this.targetCount}</div>
<div class="tasbih-hint">${isComplete ? '✅ ' + (t('completed') || '¡Completo!') : '👆 ' + (t('tapToCount') || 'Toca para contar')}</div>
</div>
</div>
<!-- Stats -->
<div class="tasbih-stats">
<div class="tasbih-stat">
<div class="tasbih-stat-value" id="tasbih-session">${this.totalCount}</div>
<div class="tasbih-stat-label">${t('sessionTotal') || 'Sesión'}</div>
</div>
<div class="tasbih-stat">
<div class="tasbih-stat-value">${Gamification.getState().stats.tasbihCount || 0}</div>
<div class="tasbih-stat-label">${t('lifetimeTotal') || 'Histórico'}</div>
</div>
<div class="tasbih-stat">
<div class="tasbih-stat-value">+${Math.floor(this.totalCount / 100) * Gamification.XP_PER_TASBIH_100}</div>
<div class="tasbih-stat-label">XP</div>
</div>
</div>
<!-- Action buttons -->
<div class="tasbih-buttons">
<button class="btn-ghost tasbih-btn-secondary" onclick="TasbihPage.reset()">
<i class="fas fa-redo"></i> ${t('resetCounter') || 'Reiniciar'}
</button>
<button class="btn-ghost tasbih-btn-secondary" onclick="TasbihPage.resetAll()">
<i class="fas fa-trash"></i> ${t('clearAll') || 'Limpiar todo'}
</button>
</div>
<!-- Quick dhikr picker -->
<div class="dhikr-picker">
<div class="dhikr-picker-title">${t('selectDhikr') || 'Elegir dhikr'}</div>
<div class="dhikr-picker-grid">
${this.DHIKRS.map((d, idx) => `
<div class="dhikr-pick-item ${idx === this.currentDhikr ? 'active' : ''}" onclick="TasbihPage.selectDhikr(${idx})">
<div class="dhikr-pick-ar">${d.ar}</div>
<div class="dhikr-pick-target">×${d.target}</div>
</div>
`).join('')}
</div>
</div>
</div>
`;
},
increment() {
this.count++;
this.totalCount++;
if (navigator.vibrate) {
navigator.vibrate(this.count === this.targetCount ? [50, 30, 50, 30, 100] : 20);
}
if (this.soundEnabled) this.playTick();
if (this.totalCount > 0 && this.totalCount % 100 === 0) {
Gamification.addXP(Gamification.XP_PER_TASBIH_100);
showToast(`📿 +${Gamification.XP_PER_TASBIH_100} XP (${this.totalCount} dhikrs)`, 2000);
}
if (this.count === this.targetCount) {
if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
setTimeout(() => {
if (this.currentDhikr < this.DHIKRS.length - 1) {
showToast(`✅ ${this.DHIKRS[this.currentDhikr].tr} ${t('completed') || 'completo'}`, 2000);
this.changeDhikr(1, true);
} else {
showToast(`🎉 ${t('allDhikrsDone') || '¡Todos los dhikrs completos!'}`, 3000);
}
}, 600);
}
Gamification.recordTasbihCount(1);
this.saveState();
this.updateUI();
},
updateUI() {
const countEl = document.getElementById('tasbih-count-val');
if (!countEl) return;
countEl.textContent = this.count;
const sessionEl = document.getElementById('tasbih-session');
if (sessionEl) sessionEl.textContent = this.totalCount;
const ring = document.querySelector('.tasbih-ring circle:last-of-type');
if (ring) {
const progress = Math.min(this.count / this.targetCount, 1);
const circ = 2 * Math.PI * 118;
ring.setAttribute('stroke-dashoffset', circ * (1 - progress));
}
const counter = document.getElementById('tasbih-counter');
if (this.count >= this.targetCount && counter) {
counter.classList.add('complete');
}
},
playTick() {
try {
const ctx = new (window.AudioContext || window.webkitAudioContext)();
const osc = ctx.createOscillator();
const gain = ctx.createGain();
osc.connect(gain);
gain.connect(ctx.destination);
osc.frequency.value = 800;
osc.type = 'sine';
gain.gain.setValueAtTime(0.05, ctx.currentTime);
gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
osc.start();
osc.stop(ctx.currentTime + 0.08);
setTimeout(() => ctx.close && ctx.close(), 150);
} catch (e) {}
},
changeDhikr(delta, autoReset = false) {
const newIdx = this.currentDhikr + delta;
if (newIdx < 0 || newIdx >= this.DHIKRS.length) return;
this.currentDhikr = newIdx;
if (autoReset) this.count = 0;
this.targetCount = this.DHIKRS[this.currentDhikr].target;
this.saveState();
this.renderUI(document.getElementById('main-content'));
},
selectDhikr(idx) {
if (idx === this.currentDhikr) return;
this.currentDhikr = idx;
this.count = 0;
this.targetCount = this.DHIKRS[idx].target;
this.saveState();
this.renderUI(document.getElementById('main-content'));
},
toggleSound() {
this.soundEnabled = !this.soundEnabled;
this.saveState();
showToast(this.soundEnabled ? '🔊 ' + (t('soundOn') || 'Sonido activado') : '🔇 ' + (t('soundOff') || 'Sonido desactivado'), 1500);
this.renderUI(document.getElementById('main-content'));
},
reset() {
if (confirm(t('confirmReset') || '¿Reiniciar el contador actual?')) {
this.count = 0;
this.saveState();
this.renderUI(document.getElementById('main-content'));
}
},
resetAll() {
if (confirm(t('confirmResetAll') || '¿Limpiar contador y total de sesión? (El histórico se conserva)')) {
this.count = 0;
this.totalCount = 0;
this.saveState();
this.renderUI(document.getElementById('main-content'));
}
},
saveState() {
Storage.set('tasbih', {
count: this.count,
totalCount: this.totalCount,
currentDhikr: this.currentDhikr,
soundEnabled: this.soundEnabled,
});
},
cleanup() {},
};


/* ==== pages/wisdom/adhkar.js ==== */
const AdhkarPage = {
currentSet: null,
counters: {},
SETS: [
{ id: 'morning', nameKey: 'adhkarMorning', icon: '🌅', data: () => (typeof ADHKAR_MORNING !== 'undefined' ? ADHKAR_MORNING : []), color: '#FFA726' },
{ id: 'evening', nameKey: 'adhkarEvening', icon: '🌇', data: () => (typeof ADHKAR_EVENING !== 'undefined' ? ADHKAR_EVENING : []), color: '#FF7043' },
{ id: 'sleep', nameKey: 'adhkarSleep', icon: '🌙', data: () => (typeof ADHKAR_SLEEP !== 'undefined' ? ADHKAR_SLEEP : []), color: '#5C6BC0' },
{ id: 'after_prayer', nameKey: 'adhkarAfterPrayer', icon: '🕌', data: () => (typeof ADHKAR_AFTER_PRAYER !== 'undefined' ? ADHKAR_AFTER_PRAYER : []), color: '#0F4C3A' },
],
renderHub(container) {
const gameState = Gamification.getState();
const completed = gameState.stats?.adhkarCompleted || [];
container.innerHTML = `
<div class="top-bar">
<button class="top-bar-btn" onclick="Router.go('wisdom')">
<i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
</button>
<div class="top-bar-title">🤲 ${t('adhkarTitle') || 'Adhkar'}</div>
<div style="width: 30px;"></div>
</div>
<div style="padding: var(--sp-md);">
<p class="adhkar-intro">${t('adhkarIntro') || 'Colecciones de invocaciones del Profeta ﷺ para diferentes momentos del día.'}</p>
${this.SETS.map(set => {
const data = set.data();
const isDone = completed.includes(set.id);
return `
<div class="adhkar-set-card" style="border-left: 4px solid ${set.color};" onclick="AdhkarPage.openSet('${set.id}')">
<div class="adhkar-set-icon" style="background: ${set.color}22; color: ${set.color};">${set.icon}</div>
<div class="adhkar-set-info">
<div class="adhkar-set-name">${t(set.nameKey) || set.id} ${isDone ? '<span class="set-done-badge">✓</span>' : ''}</div>
<div class="adhkar-set-meta">${data.length} ${t('dhikrs') || 'dhikrs'}</div>
</div>
<i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'}" style="color: var(--text-secondary);"></i>
</div>
`;
}).join('')}
</div>
`;
},
openSet(setId) {
const container = document.getElementById('main-content');
this.renderSet(container, setId);
},
renderSet(container, setId) {
const set = this.SETS.find(s => s.id === setId);
if (!set) {
this.renderHub(container);
return;
}
this.currentSet = set;
this.counters = {};
const data = set.data();
data.forEach(d => { this.counters[d.id] = 0; });
if (data.length === 0) {
container.innerHTML = `
<div class="top-bar">
<button class="top-bar-btn" onclick="Router.go('wisdom/adhkar')">
<i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
</button>
<div class="top-bar-title">${set.icon} ${t(set.nameKey) || set.id}</div>
<div style="width: 30px;"></div>
</div>
<div class="empty-state">
<div class="empty-state-icon">📭</div>
<div>${t('noDataAvailable') || 'No hay datos disponibles'}</div>
</div>`;
return;
}
container.innerHTML = `
<div class="top-bar" style="background: linear-gradient(135deg, ${set.color}, ${set.color}dd);">
<button class="top-bar-btn" onclick="Router.go('wisdom/adhkar')">
<i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
</button>
<div class="top-bar-title" style="color:#fff;">${set.icon} ${t(set.nameKey) || set.id}</div>
<div style="width: 30px;"></div>
</div>
<div class="adhkar-progress-bar">
<div class="adhkar-progress-fill" id="adhkar-progress-fill" style="width:0%; background:${set.color};"></div>
</div>
<div style="padding: var(--sp-md);">
${data.map((d, idx) => `
<div class="adhkar-card" id="adhkar-${d.id}" data-target="${d.times || 1}">
<div class="adhkar-card-header">
<div class="adhkar-title">${idx + 1}. ${d.title}</div>
<div class="adhkar-times" style="background:${set.color}22;color:${set.color};">×${d.times || 1}</div>
</div>
<div class="adhkar-arabic">${d.arabic}</div>
${d.transliteration ? `<div class="adhkar-trans">${d.transliteration}</div>` : ''}
${d.translation ? `<div class="adhkar-translation">${d.translation}</div>` : ''}
${d.benefit ? `<div class="adhkar-benefit"><i class="fas fa-star"></i> ${d.benefit}</div>` : ''}
<div class="adhkar-source">— ${d.source}</div>
${(d.times || 1) > 1 ? `
<button class="adhkar-counter-btn" id="counter-${d.id}" onclick="AdhkarPage.incrementCount('${d.id}', ${d.times})">
<i class="fas fa-hand-pointer"></i>
<span id="count-text-${d.id}">0 / ${d.times}</span>
</button>
` : `
<button class="adhkar-counter-btn" id="counter-${d.id}" onclick="AdhkarPage.markDone('${d.id}')">
<i class="fas fa-check"></i>
<span>${t('markRead') || 'Marcar leído'}</span>
</button>
`}
</div>
`).join('')}
<button class="btn-primary" style="width: 100%; margin-top: 20px; background:${set.color};" onclick="AdhkarPage.markSetComplete()">
<i class="fas fa-check-circle"></i> ${t('completeSet') || 'Completar set'} (+${Gamification.XP_PER_ADHKAR_SET} XP)
</button>
</div>
`;
},
incrementCount(id, target) {
this.counters[id] = (this.counters[id] || 0) + 1;
if (navigator.vibrate) navigator.vibrate(15);
const textEl = document.getElementById(`count-text-${id}`);
if (textEl) {
textEl.textContent = `${this.counters[id]} / ${target}`;
}
if (this.counters[id] >= target) {
const btn = document.getElementById(`counter-${id}`);
if (btn) {
btn.classList.add('done');
btn.innerHTML = `<i class="fas fa-check-circle"></i><span>✅ ${target} / ${target}</span>`;
}
if (navigator.vibrate) navigator.vibrate([60, 40, 60]);
this.updateProgress();
}
},
markDone(id) {
const btn = document.getElementById(`counter-${id}`);
if (btn && !btn.classList.contains('done')) {
btn.classList.add('done');
btn.innerHTML = `<i class="fas fa-check-circle"></i><span>✅ ${t('done') || 'Leído'}</span>`;
this.counters[id] = 999; // mark complete
if (navigator.vibrate) navigator.vibrate(20);
this.updateProgress();
}
},
updateProgress() {
if (!this.currentSet) return;
const data = this.currentSet.data();
const totalDone = data.filter(d => {
const target = d.times || 1;
return (this.counters[d.id] || 0) >= target;
}).length;
const pct = data.length > 0 ? (totalDone / data.length) * 100 : 0;
const fill = document.getElementById('adhkar-progress-fill');
if (fill) fill.style.width = pct + '%';
},
markSetComplete() {
if (!this.currentSet) return;
Gamification.addXP(Gamification.XP_PER_ADHKAR_SET);
Gamification.recordAdhkarCompleted(this.currentSet.id);
showToast(`✅ ${t(this.currentSet.nameKey) || this.currentSet.id} +${Gamification.XP_PER_ADHKAR_SET} XP`, 3000);
setTimeout(() => Router.go('wisdom/adhkar'), 1500);
},
cleanup() {},
};


/* ==== pages/wisdom/courses.js ==== */
const CoursesPage = {
state: null, // current lesson playing state
getAllCourses() {
const courses = [];
if (typeof COURSE_JOURNEY !== 'undefined') courses.push(COURSE_JOURNEY);
if (typeof COURSE_SALAH_COMPLETE !== 'undefined') courses.push(COURSE_SALAH_COMPLETE);
if (typeof COURSE_WUDU_COMPLETE !== 'undefined') courses.push(COURSE_WUDU_COMPLETE);
if (typeof COURSE_QURAN_BASICS !== 'undefined') courses.push(COURSE_QURAN_BASICS);
if (typeof COURSE_KIDS !== 'undefined') courses.push(COURSE_KIDS);
return courses;
},
renderHub(container) {
const courses = this.getAllCourses();
const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
const gameState = Gamification.getState();
const userProgress = gameState.stats?.coursesProgress || {};
const completedCourses = gameState.stats?.coursesCompleted || [];
const totalXp = gameState.xp || 0;
const streak = gameState.streak || 0;
container.innerHTML = `
<div class="top-bar courses-top-bar">
<button class="top-bar-btn" onclick="Router.go('wisdom')">
<i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
</button>
<div class="top-bar-title">📚 ${t('coursesTitle') || 'Cursos'}</div>
<div style="width: 30px;"></div>
</div>
<!-- Hero: mascot welcome -->
<div class="courses-hero">
${Mascot.renderWithSpeech('welcome', t('coursesWelcome') || '¡Hola! Empieza tu viaje 🌙', 'large')}
<div class="courses-progress-row">
<div class="cp-stat"><span class="cp-emoji">⭐</span><span class="cp-val">${totalXp}</span><span class="cp-lbl">XP</span></div>
<div class="cp-stat"><span class="cp-emoji">🔥</span><span class="cp-val">${streak}</span><span class="cp-lbl">${t('streak') || 'racha'}</span></div>
<div class="cp-stat"><span class="cp-emoji">🏆</span><span class="cp-val">${completedCourses.length}</span><span class="cp-lbl">${t('completed') || 'completos'}</span></div>
</div>
</div>
<div style="padding: 0 var(--sp-md) var(--sp-md);">
<!-- Featured / Current course -->
${this.renderFeatured(courses, userProgress, lang)}
<!-- All courses -->
<h2 class="section-title">📚 ${t('allCourses') || 'Todos los cursos'}</h2>
<div class="courses-grid">
${courses.map(c => this.renderCourseCard(c, userProgress, completedCourses, lang)).join('')}
</div>
<!-- Achievements showcase -->
${this.renderAchievements(gameState)}
</div>
`;
},
renderFeatured(courses, userProgress, lang) {
let featured = null;
for (const c of courses) {
const prog = userProgress[c.id];
if (prog && prog.completedLessons > 0 && !prog.completed) {
featured = c;
break;
}
}
if (!featured) return '';
const prog = userProgress[featured.id] || {};
const total = this.countLessons(featured);
const pct = total > 0 ? Math.round((prog.completedLessons / total) * 100) : 0;
return `
<div class="featured-course-card" onclick="CoursesPage.openCourse('${featured.id}')" style="--course-color: ${featured.color};">
<div class="featured-badge">${t('continueLearning') || '▶ Continuar'}</div>
<div class="featured-icon">${featured.icon}</div>
<div class="featured-info">
<div class="featured-title">${featured.title[lang] || featured.title.es}</div>
<div class="featured-progress-bar">
<div class="featured-progress-fill" style="width:${pct}%; background:${featured.color};"></div>
</div>
<div class="featured-progress-text">${prog.completedLessons || 0} / ${total} · ${pct}%</div>
</div>
<i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} featured-arrow"></i>
</div>
`;
},
renderCourseCard(course, userProgress, completedCourses, lang) {
const prog = userProgress[course.id] || { completedLessons: 0 };
const total = this.countLessons(course);
const pct = total > 0 ? Math.round((prog.completedLessons / total) * 100) : 0;
const isDone = completedCourses.includes(course.id);
return `
<div class="course-card" onclick="CoursesPage.openCourse('${course.id}')" style="--course-color: ${course.color};">
<div class="course-card-header" style="background: linear-gradient(135deg, ${course.color}, ${course.color}dd);">
<div class="course-card-icon">${course.icon}</div>
${isDone ? `<div class="course-done-badge"><i class="fas fa-check"></i></div>` : ''}
<div class="course-card-meta">
<span><i class="fas fa-clock"></i> ${course.durationMin}m</span>
<span><i class="fas fa-signal"></i> ${this.difficultyIcon(course.difficulty)}</span>
</div>
</div>
<div class="course-card-body">
<div class="course-card-title">${course.title[lang] || course.title.es}</div>
<div class="course-card-desc">${(course.description[lang] || course.description.es).slice(0, 80)}...</div>
<div class="course-card-progress">
<div class="ccp-bar"><div class="ccp-fill" style="width:${pct}%; background:${course.color};"></div></div>
<div class="ccp-text">${pct}%</div>
</div>
</div>
</div>
`;
},
renderAchievements(gameState) {
const achievements = gameState.achievements || [];
if (achievements.length === 0) return '';
return `
<h2 class="section-title">🏆 ${t('achievements') || 'Logros'}</h2>
<div class="achievements-row">
${achievements.slice(0, 6).map(a => `
<div class="achievement-badge">
<div class="ab-icon">🏅</div>
<div class="ab-name">${a}</div>
</div>
`).join('')}
</div>
`;
},
countLessons(course) {
return course.stations.reduce((sum, s) => sum + s.lessons.length, 0);
},
difficultyIcon(d) {
return d === 'easy' ? '●○○' : d === 'intermediate' ? '●●○' : d === 'beginner' ? '●○○' : '●●●';
},
openCourse(courseId) {
const container = document.getElementById('main-content');
const course = this.getAllCourses().find(c => c.id === courseId);
if (!course) {
this.renderHub(container);
return;
}
this.renderCourseOverview(container, course);
},
renderCourseOverview(container, course) {
const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
const gameState = Gamification.getState();
const prog = gameState.stats?.coursesProgress?.[course.id] || { completedStations: [], completedLessons: 0 };
const total = this.countLessons(course);
const pct = total > 0 ? Math.round((prog.completedLessons / total) * 100) : 0;
container.innerHTML = `
<div class="top-bar" style="background: linear-gradient(135deg, ${course.color}, ${course.color}dd);">
<button class="top-bar-btn" onclick="Router.go('wisdom/courses')" style="color:#fff;">
<i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
</button>
<div class="top-bar-title" style="color:#fff;">${course.icon} ${course.title[lang] || course.title.es}</div>
<div style="width: 30px;"></div>
</div>
<div class="course-overview" style="--course-color: ${course.color};">
<div class="overview-hero" style="background: linear-gradient(135deg, ${course.color}, ${course.color}dd);">
${Mascot.render(course.mascotPose || 'welcome', 'large', 'mascot-pop-in')}
<div class="overview-title">${course.title[lang] || course.title.es}</div>
<div class="overview-desc">${course.description[lang] || course.description.es}</div>
<div class="overview-meta">
<span><i class="fas fa-clock"></i> ${course.durationMin} min</span>
<span><i class="fas fa-map-marker-alt"></i> ${course.stations.length} ${t('stations') || 'estaciones'}</span>
<span><i class="fas fa-list"></i> ${total} ${t('lessons') || 'lecciones'}</span>
</div>
<div class="overview-progress">
<div class="overview-progress-bar"><div class="overview-progress-fill" style="width:${pct}%;"></div></div>
<div class="overview-progress-text">${prog.completedLessons || 0} / ${total} · ${pct}%</div>
</div>
</div>
<div class="stations-list">
<h3>🗺️ ${t('stations') || 'Estaciones'}</h3>
${course.stations.map((s, idx) => {
const isDone = prog.completedStations?.includes(s.id);
const isLocked = idx > 0 && !prog.completedStations?.includes(course.stations[idx-1].id);
const onClick = isLocked
? `CoursesPage.showLocked()`
: `CoursesPage.startStation('${course.id}', '${s.id}')`;
return `
<div class="station-row ${isDone ? 'done' : ''} ${isLocked ? 'locked' : ''}" onclick="${onClick}">
<div class="station-num" style="background:${isDone ? '#4CAF50' : (isLocked ? '#999' : course.color)};">
${isDone ? '<i class="fas fa-check"></i>' : (isLocked ? '<i class="fas fa-lock"></i>' : (idx + 1))}
</div>
<div class="station-info">
<div class="station-title">${s.icon} ${s.title[lang] || s.title.es}</div>
<div class="station-meta">${s.lessons.length} ${t('lessons') || 'lecciones'}</div>
</div>
<i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'}"></i>
</div>
`;
}).join('')}
</div>
</div>
`;
},
showLocked() {
Mascot.showTip(t('lockedStation') || '🔒 Completa la estación anterior primero', 'thinking', 2500);
},
startStation(courseId, stationId) {
const course = this.getAllCourses().find(c => c.id === courseId);
if (!course) return;
const station = course.stations.find(s => s.id === stationId);
if (!station) return;
this.state = {
courseId, stationId,
course, station,
lessonIdx: 0,
correctAnswers: 0,
wrongAnswers: 0,
startTime: Date.now(),
};
const container = document.getElementById('main-content');
this.renderStationIntro(container);
},
renderStationIntro(container) {
const { course, station } = this.state;
const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
container.innerHTML = `
<div class="lesson-screen" style="--course-color: ${course.color};">
<div class="lesson-topbar">
<button class="lesson-close" onclick="CoursesPage.exitLesson()">
<i class="fas fa-times"></i>
</button>
<div class="lesson-progress-track">
<div class="lesson-progress-fill" id="lesson-progress-fill" style="width:0%; background:${course.color};"></div>
</div>
</div>
<div class="station-intro-content">
${Mascot.renderWithSpeech(course.mascotPose || 'welcome', station.mascotIntro[lang] || station.mascotIntro.es, 'xl')}
<h2 class="station-intro-title">${station.icon} ${station.title[lang] || station.title.es}</h2>
<div class="station-intro-meta">${station.lessons.length} ${t('lessons') || 'lecciones'}</div>
<button class="btn-primary station-start-btn" onclick="CoursesPage.nextLesson()" style="background:${course.color};">
${t('start') || 'Empezar'} →
</button>
</div>
</div>
`;
},
nextLesson() {
const { course, station, lessonIdx } = this.state;
const container = document.getElementById('main-content');
if (lessonIdx >= station.lessons.length) {
this.completeStation(container);
return;
}
const lesson = station.lessons[lessonIdx];
const progress = ((lessonIdx + 1) / station.lessons.length) * 100;
container.innerHTML = `
<div class="lesson-screen" style="--course-color: ${course.color};">
<div class="lesson-topbar">
<button class="lesson-close" onclick="CoursesPage.exitLesson()">
<i class="fas fa-times"></i>
</button>
<div class="lesson-progress-track">
<div class="lesson-progress-fill" style="width:${progress}%; background:${course.color};"></div>
</div>
<div class="lesson-counter">${lessonIdx + 1}/${station.lessons.length}</div>
</div>
<div class="lesson-content" id="lesson-content">
${this.renderLesson(lesson)}
</div>
</div>
`;
if (lesson.type === 'drag_drop') {
setTimeout(() => this.initDragDrop(), 100);
}
},
renderLesson(lesson) {
const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
switch (lesson.type) {
case 'card': return this.renderCardLesson(lesson, lang);
case 'quiz': return this.renderQuizLesson(lesson, lang);
case 'flashcards': return this.renderFlashcards(lesson, lang);
case 'drag_drop': return this.renderDragDrop(lesson, lang);
case 'prayer_step': return this.renderPrayerStep(lesson, lang);
case 'wudu_step': return this.renderWuduStep(lesson, lang);
default: return `<div>Unknown lesson type</div>`;
}
},
renderPrayerStep(lesson, lang) {
const title = lesson.title[lang] || lesson.title.es;
const description = lesson.description[lang] || lesson.description.es;
const tip = lesson.tip ? (lesson.tip[lang] || lesson.tip.es) : '';
const transRaw = lesson.dhikr.translation;
const dhikrTrans = typeof transRaw === 'object' ? (transRaw[lang] || transRaw.es) : transRaw;
const secondDhikrTrans = lesson.secondDhikr
? (typeof lesson.secondDhikr.translation === 'object'
? (lesson.secondDhikr.translation[lang] || lesson.secondDhikr.translation.es)
: lesson.secondDhikr.translation)
: null;
return `
<div class="prayer-step-lesson">
<div class="ps-step-badge">${lesson.stepNumber || ''}</div>
<h2 class="ps-title">${title}</h2>
<div class="ps-image-wrap">
<picture>
<source srcset="assets/prayer/${lesson.image}.webp" type="image/webp">
<img src="assets/prayer/${lesson.image}.png" alt="${escapeHtml(title)}" class="ps-image" loading="lazy">
</picture>
</div>
<div class="ps-description">${description}</div>
<!-- Main Dhikr -->
<div class="ps-dhikr-card">
<div class="ps-dhikr-label">📜 ${t('whatToSay') || 'Qué decir'}</div>
<div class="ps-dhikr-arabic" dir="rtl">${lesson.dhikr.arabic}</div>
<div class="ps-dhikr-translit">🔊 ${lesson.dhikr.translit}</div>
<div class="ps-dhikr-translation">«${dhikrTrans}»</div>
</div>
${lesson.secondDhikr ? `
<div class="ps-dhikr-card ps-dhikr-secondary">
<div class="ps-dhikr-label">${t('thenSay') || 'Luego di'}</div>
<div class="ps-dhikr-arabic" dir="rtl">${lesson.secondDhikr.arabic}</div>
<div class="ps-dhikr-translit">🔊 ${lesson.secondDhikr.translit}</div>
<div class="ps-dhikr-translation">«${secondDhikrTrans}»</div>
</div>
` : ''}
${tip ? `<div class="ps-tip">${tip}</div>` : ''}
${lesson.source ? `<div class="lesson-source"><i class="fas fa-book"></i> ${lesson.source}</div>` : ''}
<button class="btn-primary lesson-continue-btn" onclick="CoursesPage.advance()">
${t('nextStep') || 'Siguiente paso'} →
</button>
</div>
`;
},
renderWuduStep(lesson, lang) {
const title = lesson[`title_${lang}`] || lesson.title_es || lesson.title;
const description = lesson[`description_${lang}`] || lesson.description_es || lesson.description || '';
const hadith = lesson.hadith || '';
const hadithTrans = lesson[`hadith_translation_${lang}`] || lesson.hadith_translation_es || '';
const dhikrMeaning = lesson[`dhikr_meaning_${lang}`] || lesson.dhikr_meaning_es || '';
return `
<div class="prayer-step-lesson wudu-step-lesson">
<div class="ps-step-badge" style="background:linear-gradient(135deg,#42A5F5,#1976D2);">${lesson.number || ''}</div>
<h2 class="ps-title">${escapeHtml(title)}</h2>
<div class="ps-image-wrap">
<picture>
<source srcset="assets/wudu/${lesson.image}.webp" type="image/webp">
<img src="assets/wudu/${lesson.image}.png" alt="${escapeHtml(title)}" class="ps-image" loading="lazy">
</picture>
</div>
<div class="ps-description" style="white-space:pre-line;">${escapeHtml(description)}</div>
${lesson.dhikr ? `
<div class="ps-dhikr-card">
<div class="ps-dhikr-label">📜 ${t('whatToSay') || 'Qué decir'}</div>
<div class="ps-dhikr-arabic" dir="rtl">${escapeHtml(lesson.dhikr)}</div>
${lesson.dhikr_translit ? `<div class="ps-dhikr-translit">🔊 ${escapeHtml(lesson.dhikr_translit)}</div>` : ''}
${dhikrMeaning ? `<div class="ps-dhikr-translation">«${escapeHtml(dhikrMeaning)}»</div>` : ''}
</div>
` : ''}
${hadith ? `
<div class="ps-hadith-card">
<div class="ps-hadith-label">📖 ${t('hadith') || 'Hadiz'}</div>
<div class="ps-hadith-text">${escapeHtml(hadith)}</div>
${hadithTrans ? `<div class="ps-hadith-trans">«${escapeHtml(hadithTrans)}»</div>` : ''}
</div>
` : ''}
<button class="btn-primary lesson-continue-btn" onclick="CoursesPage.advance()">
${t('nextStep') || 'Siguiente paso'} →
</button>
</div>
`;
},
_loc(lesson, field, lang) {
if (lesson[field] && typeof lesson[field] === 'object') {
return lesson[field][lang] || lesson[field].es || '';
}
return lesson[`${field}_${lang}`] || lesson[`${field}_es`] || lesson[field] || '';
},
renderCardLesson(lesson, lang) {
const title = this._loc(lesson, 'title', lang);
const content = this._loc(lesson, 'content', lang);
return `
<div class="lesson-card">
${Mascot.render('thinking', 'medium', 'lesson-mascot mascot-float')}
<h2 class="lesson-card-title">${title}</h2>
<div class="lesson-card-content">${this.formatContent(content)}</div>
${lesson.source ? `<div class="lesson-source"><i class="fas fa-book"></i> ${lesson.source}</div>` : ''}
<button class="btn-primary lesson-continue-btn" onclick="CoursesPage.advance()">
${t('understand') || 'Lo entiendo'} →
</button>
</div>
`;
},
formatContent(text) {
return text.split('\n').map(line => `<p>${line.trim()}</p>`).join('');
},
renderQuizLesson(lesson, lang) {
const question = this._loc(lesson, 'question', lang);
let options;
if (lesson[`options_${lang}`]) {
options = lesson[`options_${lang}`];
} else if (lesson.options_es) {
options = lesson.options_es;
} else {
options = lesson.options.map(opt => typeof opt === 'object' ? (opt[lang] || opt.es) : opt);
}
return `
<div class="lesson-quiz">
${Mascot.render('thinking', 'medium', 'lesson-mascot')}
<h2 class="lesson-quiz-q">${question}</h2>
<div class="lesson-quiz-options" id="lesson-quiz-options">
${options.map((opt, idx) => `
<button class="lq-option" data-idx="${idx}" onclick="CoursesPage.answerQuiz(${idx})">
<span class="lq-letter">${String.fromCharCode(65 + idx)}</span>
<span class="lq-text">${opt}</span>
</button>
`).join('')}
</div>
</div>
`;
},
answerQuiz(idx) {
const lesson = this.state.station.lessons[this.state.lessonIdx];
const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
const isCorrect = idx === lesson.correct;
const feedback = this._loc(lesson, 'feedback', lang) || this._loc(lesson, 'explanation', lang);
document.querySelectorAll('.lq-option').forEach((btn, i) => {
btn.disabled = true;
if (i === lesson.correct) btn.classList.add('correct');
else if (i === idx && !isCorrect) btn.classList.add('wrong');
});
if (isCorrect) {
this.state.correctAnswers++;
if (navigator.vibrate) navigator.vibrate(50);
} else {
this.state.wrongAnswers++;
if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
}
const content = document.getElementById('lesson-content');
const banner = document.createElement('div');
banner.className = `quiz-feedback ${isCorrect ? 'correct' : 'wrong'}`;
banner.innerHTML = `
<div class="qf-row">
${Mascot.render(isCorrect ? 'celebrate' : 'shy', 'small')}
<div class="qf-text">
<div class="qf-status">${isCorrect ? '✅ ' + (t('correct') || '¡Correcto!') : '💡 ' + (t('learn') || 'Aprendamos')}</div>
<div class="qf-explanation">${feedback}</div>
</div>
</div>
<button class="btn-primary" onclick="CoursesPage.advance()">${t('continue') || 'Continuar'} →</button>
`;
content.appendChild(banner);
banner.scrollIntoView({ behavior: 'smooth', block: 'end' });
},
renderFlashcards(lesson, lang) {
const title = lesson.title[lang] || lesson.title.es;
return `
<div class="lesson-flashcards">
${Mascot.render('encourage', 'medium', 'lesson-mascot')}
<h2 class="lesson-fc-title">${title}</h2>
<div class="lesson-fc-hint">👆 ${t('tapToFlip') || 'Toca para girar'}</div>
<div class="flashcards-grid">
${lesson.cards.map((card, idx) => {
const front = typeof card.front === 'object' ? (card.front[lang] || card.front.es) : card.front;
const back = typeof card.back === 'object' ? (card.back[lang] || card.back.es) : card.back;
return `
<div class="flashcard" onclick="this.classList.toggle('flipped')">
<div class="flashcard-inner">
<div class="flashcard-front">${front}</div>
<div class="flashcard-back">${back}</div>
</div>
</div>
`;
}).join('')}
</div>
<button class="btn-primary lesson-continue-btn" onclick="CoursesPage.advance()">
${t('done') || 'Listo'} →
</button>
</div>
`;
},
renderDragDrop(lesson, lang) {
const title = lesson.title[lang] || lesson.title.es;
const instruction = lesson.instruction[lang] || lesson.instruction.es;
const shuffled = [...lesson.items].sort(() => Math.random() - 0.5);
return `
<div class="lesson-dragdrop">
${Mascot.render('thinking', 'medium', 'lesson-mascot')}
<h2 class="lesson-dd-title">${title}</h2>
<div class="lesson-dd-instruction">${instruction}</div>
<div class="dd-items" id="dd-items">
${shuffled.map(item => {
const label = typeof item.label === 'object' ? (item.label[lang] || item.label.es) : item.label;
return `
<div class="dd-item" draggable="true" data-id="${item.id}" data-order="${item.order}">
<i class="fas fa-grip-vertical"></i>
<span>${label}</span>
</div>
`;
}).join('')}
</div>
<button class="btn-primary lesson-continue-btn" onclick="CoursesPage.checkDragDrop()">
${t('checkAnswer') || 'Verificar'} ✓
</button>
</div>
`;
},
initDragDrop() {
const container = document.getElementById('dd-items');
if (!container) return;
let dragged = null;
container.addEventListener('dragstart', e => {
dragged = e.target.closest('.dd-item');
if (dragged) dragged.classList.add('dragging');
});
container.addEventListener('dragend', e => {
if (dragged) dragged.classList.remove('dragging');
dragged = null;
});
container.addEventListener('dragover', e => {
e.preventDefault();
const target = e.target.closest('.dd-item');
if (target && target !== dragged) {
const rect = target.getBoundingClientRect();
const after = (e.clientY - rect.top) > rect.height / 2;
container.insertBefore(dragged, after ? target.nextSibling : target);
}
});
let touchDragging = null;
container.querySelectorAll('.dd-item').forEach(item => {
item.addEventListener('touchstart', e => {
touchDragging = item;
item.classList.add('dragging');
}, { passive: true });
item.addEventListener('touchmove', e => {
if (!touchDragging) return;
e.preventDefault();
const touch = e.touches[0];
const target = document.elementFromPoint(touch.clientX, touch.clientY)?.closest('.dd-item');
if (target && target !== touchDragging) {
const rect = target.getBoundingClientRect();
const after = (touch.clientY - rect.top) > rect.height / 2;
container.insertBefore(touchDragging, after ? target.nextSibling : target);
}
}, { passive: false });
item.addEventListener('touchend', () => {
if (touchDragging) touchDragging.classList.remove('dragging');
touchDragging = null;
});
});
},
checkDragDrop() {
const items = [...document.querySelectorAll('#dd-items .dd-item')];
let correct = true;
items.forEach((el, idx) => {
const expected = idx + 1;
const actual = parseInt(el.dataset.order, 10);
if (expected !== actual) {
correct = false;
el.classList.add('wrong');
} else {
el.classList.add('correct');
}
});
const content = document.getElementById('lesson-content');
const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
const banner = document.createElement('div');
banner.className = `quiz-feedback ${correct ? 'correct' : 'wrong'}`;
banner.innerHTML = `
<div class="qf-row">
${Mascot.render(correct ? 'celebrate' : 'shy', 'small')}
<div class="qf-text">
<div class="qf-status">${correct ? '✅ ' + (t('correct') || '¡Perfecto!') : '💡 ' + (t('tryAgain') || 'Vuelve a intentarlo')}</div>
<div class="qf-explanation">${correct ? (t('orderCorrect') || 'Has ordenado correctamente.') : (t('orderWrong') || 'Casi. El orden correcto te ayudará a recordarlo.')}</div>
</div>
</div>
<button class="btn-primary" onclick="CoursesPage.advance()">${t('continue') || 'Continuar'} →</button>
`;
content.appendChild(banner);
if (correct) this.state.correctAnswers++; else this.state.wrongAnswers++;
if (navigator.vibrate) navigator.vibrate(correct ? 50 : [100, 50, 100]);
banner.scrollIntoView({ behavior: 'smooth', block: 'end' });
},
advance() {
Gamification.addXP(Gamification.XP_PER_LESSON || 25);
this.recordLessonComplete();
this.state.lessonIdx++;
this.nextLesson();
},
recordLessonComplete() {
const state = Gamification.getState();
if (!state.stats.coursesProgress) state.stats.coursesProgress = {};
const cid = this.state.courseId;
if (!state.stats.coursesProgress[cid]) {
state.stats.coursesProgress[cid] = { completedLessons: 0, completedStations: [], lastStation: null };
}
state.stats.coursesProgress[cid].completedLessons = (state.stats.coursesProgress[cid].completedLessons || 0) + 1;
state.stats.coursesProgress[cid].lastStation = this.state.stationId;
Gamification.saveState(state);
},
completeStation(container) {
const { course, station, correctAnswers, wrongAnswers } = this.state;
const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
const gameState = Gamification.getState();
if (!gameState.stats.coursesProgress) gameState.stats.coursesProgress = {};
if (!gameState.stats.coursesProgress[course.id]) {
gameState.stats.coursesProgress[course.id] = { completedLessons: 0, completedStations: [] };
}
const prog = gameState.stats.coursesProgress[course.id];
if (!prog.completedStations.includes(station.id)) {
prog.completedStations.push(station.id);
}
const allStationsDone = course.stations.every(s => prog.completedStations.includes(s.id));
let courseJustCompleted = false;
if (allStationsDone && !gameState.stats.coursesCompleted.includes(course.id)) {
gameState.stats.coursesCompleted.push(course.id);
courseJustCompleted = true;
Gamification.addXP(100); // course completion bonus
}
Gamification.saveState(gameState);
container.innerHTML = `
<div class="station-complete" style="--course-color: ${course.color};">
<div class="celebration-overlay">
${Mascot.renderWithSpeech('success', t('stationComplete') || '¡Estación completada!', 'xl')}
<div class="confetti-container">
${Array(30).fill(0).map((_, i) => `<div class="confetti" style="--i:${i}; --c:${Mascot.confettiColor(i)}; --d:${Math.random() * 0.5}s;"></div>`).join('')}
</div>
</div>
<h2 class="sc-title">${station.icon} ${station.title[lang] || station.title.es}</h2>
<div class="sc-stats">
<div class="sc-stat"><div class="scs-icon">✅</div><div class="scs-val">${correctAnswers}</div><div class="scs-lbl">${t('correct') || 'correctas'}</div></div>
<div class="sc-stat"><div class="scs-icon">⭐</div><div class="scs-val">+${station.lessons.length * 25}</div><div class="scs-lbl">XP</div></div>
<div class="sc-stat"><div class="scs-icon">⏱️</div><div class="scs-val">${Math.round((Date.now() - this.state.startTime) / 60000)}m</div><div class="scs-lbl">${t('time') || 'tiempo'}</div></div>
</div>
${courseJustCompleted ? this.renderCertificate(course, lang) : ''}
<div class="sc-actions">
${!courseJustCompleted ? `
<button class="btn-primary" onclick="CoursesPage.openCourse('${course.id}')" style="background:${course.color};">
${t('continueCourse') || 'Continuar curso'} →
</button>
` : ''}
<button class="btn-ghost" onclick="Router.go('wisdom/courses')">
${t('backToCourses') || 'Volver a cursos'}
</button>
</div>
</div>
`;
},
renderCertificate(course, lang) {
const userName = (AppState.settings && AppState.settings.userName)
|| AppState.userName
|| (lang === 'ar' ? 'الطالب' : (lang === 'en' ? 'Student' : 'Estudiante'));
const date = new Date().toLocaleDateString(currentLocale === 'ar' ? 'ar-EG' : currentLocale);
const editLabel = lang === 'ar' ? 'تعديل الاسم' : (lang === 'en' ? 'Edit name' : 'Editar nombre');
return `
<div class="certificate" id="certificate">
<div class="cert-corner cert-tl">✦</div>
<div class="cert-corner cert-tr">✦</div>
<div class="cert-corner cert-bl">✦</div>
<div class="cert-corner cert-br">✦</div>
<div class="cert-header">
<div class="cert-mascot-row">${Mascot.render('celebrate', 'small')}</div>
<h3>🏆 ${t('certificateOfCompletion') || 'Certificado de Finalización'}</h3>
</div>
<div class="cert-body">
<div class="cert-presented">${t('presentedTo') || 'Otorgado a'}:</div>
<div class="cert-name" id="cert-name-display">${escapeHtml(userName)}</div>
<button class="cert-edit-name-btn" onclick="CoursesPage.editCertName()" title="${editLabel}" aria-label="${editLabel}">
<i class="fas fa-pen"></i> <span>${editLabel}</span>
</button>
<div class="cert-completed">${t('hasCompleted') || 'ha completado el curso'}:</div>
<div class="cert-course-name">${course.icon} ${escapeHtml(course.title[lang] || course.title.es)}</div>
<div class="cert-date">${date}</div>
</div>
<div class="cert-footer">
<div class="cert-signature">Quba — ${t('islamicLearning') || 'Aprendizaje Islámico'}</div>
</div>
<button class="btn-primary cert-share-btn" onclick="CoursesPage.shareCertificate('${course.id}')">
<i class="fas fa-share-alt"></i> ${t('shareCertificate') || 'Compartir certificado'}
</button>
</div>
`;
},
editCertName() {
const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
const current = (AppState.settings && AppState.settings.userName) || '';
const promptText = lang === 'ar'
? 'اكتب اسمك للشهادة:'
: (lang === 'en' ? 'Enter your name for the certificate:' : 'Escribe tu nombre para el certificado:');
const val = window.prompt(promptText, current);
if (val === null) return; // cancelled
const clean = val.trim().slice(0, 60);
if (!AppState.settings) AppState.settings = {};
AppState.settings.userName = clean;
Storage.saveSettings();
const nameEl = document.getElementById('cert-name-display');
if (nameEl) {
const fallback = lang === 'ar' ? 'الطالب' : (lang === 'en' ? 'Student' : 'Estudiante');
nameEl.textContent = clean || fallback;
}
showToast('✅ ' + (t('nameSaved') || 'Nombre guardado'), 1500);
},
shareCertificate(courseId) {
const course = this.getAllCourses().find(c => c.id === courseId);
const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');
const text = `🏆 ${t('justCompleted') || 'Acabo de completar el curso'}: ${course.title[lang]} en Quba app! 🌙`;
if (navigator.share) {
navigator.share({ title: 'Quba — ' + course.title[lang], text }).catch(() => {});
} else if (navigator.clipboard) {
navigator.clipboard.writeText(text);
showToast('📋 ' + (t('copied') || 'Copiado'), 1500);
}
},
exitLesson() {
if (confirm(t('confirmExitLesson') || '¿Salir de la lección? Tu progreso se guardará.')) {
this.state = null;
Router.go('wisdom/courses');
}
},
cleanup() {
this.state = null;
},
};


/* ==== pages/wisdom/duas.js ==== */
const DuasPage = {
categories: [],
currentCategory: null,
currentDuas: [],
searchResults: null,
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
<div class="top-bar-title" style="color:#fff;">🤲 ${escapeHtml(title)}</div>
<div style="width: 30px;"></div>
</div>
<div style="padding: var(--sp-md);">
${duas.length === 0 ? `<div class="empty-state"><div class="empty-state-icon">📭</div><div>${t('noDuas') || 'Sin súplicas en esta categoría'}</div></div>` : duas.map((d, idx) => `
<div class="dua-card" id="dua-${d.id}">
<div class="dua-card-header">
<div class="dua-title">${idx + 1}. ${escapeHtml(d.title)}</div>
${d.repeat > 1 ? `<div class="dua-times" style="background:${escapeAttr(meta.color)}22;color:${escapeAttr(meta.color)};">×${d.repeat}</div>` : ''}
</div>
<div class="dua-arabic" dir="rtl">${escapeHtml(d.arabic || '')}</div>
${d.transliteration ? `<div class="dua-translit"><i class="fas fa-microphone"></i> ${escapeHtml(d.transliteration)}</div>` : ''}
${d.translation ? `
<div class="dua-translation">
<div class="dua-translation-label">${lang === 'en' ? 'Translation' : (lang === 'ar' ? 'الترجمة' : 'Traducción')}:</div>
<div class="dua-translation-text">${this.maybeTranslate(d.translation, idx, d.id, lang)}</div>
</div>
` : ''}
${d.source ? `<div class="dua-source"><i class="fas fa-book"></i> ${escapeHtml(d.source)}</div>` : ''}
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
if (lang !== 'en' && duas.length > 0) {
this.autoTranslateAll(duas, lang);
}
},
maybeTranslate(englishText, idx, duaId, lang) {
if (lang === 'en' || !englishText) return englishText || '';
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
await new Promise(r => setTimeout(r, 200));
}
},
async translateText(text, source, target) {
if (!text || text.length > 480) {
if (typeof TafsirService !== 'undefined' && TafsirService.translateLongText) {
return await TafsirService.translateLongText(text, source, target);
}
}
const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}&de=app@quba.local`;
const res = await fetch(url);
if (!res.ok) throw new Error('translate failed');
const json = await res.json();
const out = json?.responseData?.translatedText || '';
if (out.toUpperCase().includes('MYMEMORY WARNING')) throw new Error('quota');
return out;
},
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
<div class="dua-arabic" dir="rtl">${escapeHtml(d.arabic || '')}</div>
${d.transliteration ? `<div class="dua-translit">${d.transliteration}</div>` : ''}
${d.translation ? `<div class="dua-translation"><div class="dua-translation-text">${d.translation}</div></div>` : ''}
${d.source ? `<div class="dua-source"><i class="fas fa-book"></i> ${escapeHtml(d.source)}</div>` : ''}
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
async showRandom() {
showToast('🎲 ' + (t('loading') || 'Cargando...'), 1000);
const dua = await API.getRandomDua();
if (!dua) {
showToast('⚠️ ' + (t('errorLoading') || 'Error al cargar'), 2000);
return;
}
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
<div class="dua-arabic" dir="rtl">${escapeHtml(d.arabic || '')}</div>
${d.transliteration ? `<div class="dua-translit">${d.transliteration}</div>` : ''}
${d.translation ? `<div class="dua-translation"><div class="dua-translation-text">${d.translation}</div></div>` : ''}
${d.source ? `<div class="dua-source"><i class="fas fa-book"></i> ${escapeHtml(d.source)}</div>` : ''}
</div>
</div>
`;
document.body.appendChild(overlay);
},
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


/* ==== pages/wisdom.js ==== */
const WisdomPage = {
async render(container) {
const stats = Gamification.getStats();
const levelInfo = Gamification.getLevelInfo(stats.xp);
const lang = AppState.settings?.locale || currentLocale || 'es';
const greetings = {
es: [
'¡As-Salām ‘alaikum! Aprendamos algo hoy 🌿',
'Elige un módulo para ganar XP ✨',
`Llevas ${stats.streak || 0} días seguidos 🔥`,
],
ar: [
'السلام عليكم! هيّا نتعلّم شيئًا اليوم 🌿',
'اختر وحدة لتربح خبرة ✨',
`لديك ${stats.streak || 0} يومًا متتاليًا 🔥`,
],
en: [
'As-Salām ‘alaikum! Let\'s learn something today 🌿',
'Pick a module to earn XP ✨',
`You\'re on a ${stats.streak || 0}-day streak 🔥`,
],
};
const g = greetings[lang] || greetings.es;
const greetingIdx = Math.floor(Date.now() / (1000 * 60 * 30)) % g.length; // rotates every 30min
const mascotMsg = g[greetingIdx];
const modules = [
{
id: 'quiz', icon: '🧠',
title: t('quizTitle') || 'Quiz Islámico',
desc: t('quizDesc') || '305 preguntas · 6 categorías · XP y niveles',
color: '#0F4C3A',
route: 'wisdom/quiz',
},
{
id: 'duas', icon: '🤲',
title: t('duasTitle') || "Du'as y Súplicas",
desc: t('duasModuleDesc') || '300+ súplicas auténticas · 27 categorías',
color: '#D4AF37',
route: 'wisdom/duas',
},
{
id: 'adhkar', icon: '🌅',
title: t('adhkarTitle') || 'Adhkar diarios',
desc: t('adhkarModuleDesc') || 'Mañana · Tarde · Antes de dormir · Tras la oración',
color: '#FF7043',
route: 'wisdom/adhkar',
},
{
id: 'courses', icon: '📚',
title: t('coursesTitle') || 'Cursos interactivos',
desc: t('coursesModuleDesc') || 'Viaje del musulmán · Tajwid · Fiqh · Kids',
color: '#5C6BC0',
route: 'wisdom/courses',
},
{
id: 'tasbih', icon: '📿',
title: t('tasbihTitle') || 'Tasbih digital',
desc: t('tasbihModuleDesc') || 'Contador con vibración y sonido · 8 dhikrs',
color: '#1A6B52',
route: 'wisdom/tasbih',
},
];
container.innerHTML = `
<div class="page-header">
<div class="page-title">🎯 ${t('tabWisdom')}</div>
<div class="page-subtitle">${t('wisdomSubtitle')}</div>
</div>
<div style="padding: var(--sp-md);">
<!-- 🧚 Mascot Welcome (first thing users see in Wisdom hub) -->
<div class="wisdom-mascot-welcome">
${Mascot.renderWithSpeech('welcome', escapeHtml(mascotMsg), 'medium')}
</div>
<!-- Player Stats Card -->
<div class="player-stats-card">
<div class="player-level-row">
<div class="player-level-icon">${levelInfo.icon}</div>
<div class="player-level-info">
<div class="player-level-name">${t('level')} ${stats.level} — ${typeof levelInfo.name === 'object' ? (levelInfo.name[lang] || levelInfo.name.es) : levelInfo.name}</div>
<div class="player-xp">${stats.xp} XP</div>
</div>
<!-- Hearts removed in v12: play unlimited, keep XP -->
</div>
<div class="xp-bar-wrapper">
<div class="xp-bar-fill" style="width: ${Gamification.getProgressToNextLevel(stats.xp)}%"></div>
</div>
<div class="stats-row">
<div class="stat-item">
<div class="stat-value">🔥 ${stats.streak || 0}</div>
<div class="stat-label">${t('streak')}</div>
</div>
<div class="stat-item">
<div class="stat-value">🏆 ${stats.achievements?.length || 0}</div>
<div class="stat-label">${t('badges')}</div>
</div>
<div class="stat-item">
<div class="stat-value">📊 ${stats.totalAnswered || 0}</div>
<div class="stat-label">${t('answered')}</div>
</div>
</div>
</div>
<!-- 4 modules: Quiz / Du'as / Adhkar / Tasbih -->
<h2 class="section-title">${t('modules') || 'Módulos'}</h2>
<div class="wisdom-grid">
${modules.map(m => `
<div class="wisdom-module-card" onclick="Router.go('${m.route}')" style="border-left-color: ${m.color};">
<div class="wm-icon" style="background: ${m.color}22; color: ${m.color};">${m.icon}</div>
<div class="wm-content">
<div class="wm-title">${m.title}</div>
<div class="wm-desc">${m.desc}</div>
</div>
<i class="fas fa-chevron-${document.documentElement.dir === 'rtl' ? 'left' : 'right'} wm-arrow"></i>
</div>
`).join('')}
</div>
<div class="card" style="background: rgba(15,76,58,0.06); margin-top: var(--sp-md);">
<div style="font-size: 13px; line-height: 1.6; color: var(--text-secondary, #666);">
💡 <strong>${t('quizInfoTitle') || 'Aprende jugando'}:</strong> ${t('wisdomHubInfo') || 'Acumula XP en cualquier módulo, sube de nivel y desbloquea logros.'}
</div>
</div>
</div>
`;
},
cleanup() {},
};


/* ==== js/router.js ==== */
const Router = {
routes: {
home: { page: HomePage, tabId: 'home' },
quran: { page: QuranPage, tabId: 'quran' },
prayer: { page: PrayerPage, tabId: 'prayer' },
calendar: { page: CalendarPage, tabId: null },
wisdom: { page: WisdomPage, tabId: 'wisdom' },
profile: { page: ProfilePage, tabId: 'profile' },
surah: { page: QuranPage, tabId: 'quran', method: 'renderDetail' },
'wisdom/quiz': { page: QuizPage, tabId: 'wisdom', method: 'renderCategorySelect' },
'wisdom/tasbih': { page: TasbihPage, tabId: 'wisdom', method: 'render' },
'wisdom/adhkar': { page: AdhkarPage, tabId: 'wisdom', method: 'renderHub' },
'wisdom/duas': { page: DuasPage, tabId: 'wisdom', method: 'renderHub' },
'wisdom/courses': { page: CoursesPage, tabId: 'wisdom', method: 'renderHub' },
},
current: null,
history: [],
_navigating: false, // flag para evitar loops popstate
async go(routeName, params = {}, options = {}) {
const route = this.routes[routeName];
if (!route) {
console.warn('Ruta desconocida:', routeName);
return;
}
if (this.current?.route?.page?.cleanup) {
try { this.current.route.page.cleanup(); } catch(e) { console.warn('Cleanup error:', e); }
}
this.current = { route, name: routeName, params };
this.updateTabs(route.tabId);
if (!options.fromPopState) {
const url = `#/${routeName}${params && Object.keys(params).length ? '?' + new URLSearchParams(this._serializeParams(params)).toString() : ''}`;
try {
history.pushState({ name: routeName, params }, '', url);
} catch(e) {
location.hash = url;
}
}
const container = document.getElementById('main-content');
if (container) container.scrollTop = 0;
const method = route.method || 'render';
if (typeof route.page[method] === 'function') {
await route.page[method](container, params);
}
},
_serializeParams(params) {
const out = {};
for (const k in params) {
const v = params[k];
if (v === null || v === undefined) continue;
out[k] = typeof v === 'object' ? JSON.stringify(v) : String(v);
}
return out;
},
push(routeName, params = {}) {
this.history.push({ name: routeName, params });
this.go(routeName, params);
},
back() {
if (history.length > 1) {
history.back();
return;
}
if (this.history.length > 0) {
this.history.pop();
const prev = this.history.length > 0 ? this.history[this.history.length - 1] : null;
if (prev) {
this.go(prev.name, prev.params);
} else {
this.go('home');
}
} else {
this.go('home');
}
},
updateTabs(activeTabId) {
document.querySelectorAll('.bottom-tabs .tab').forEach(tab => {
tab.classList.toggle('active', tab.dataset.page === activeTabId);
});
},
parseInitialRoute() {
const hash = location.hash.replace(/^#\/?/, '');
if (!hash) return { name: 'home', params: {} };
const [path, query] = hash.split('?');
const params = {};
if (query) {
new URLSearchParams(query).forEach((v, k) => {
try { params[k] = JSON.parse(v); } catch { params[k] = v; }
});
}
return { name: this.routes[path] ? path : 'home', params };
},
init() {
window.addEventListener('popstate', (e) => {
if (e.state && e.state.name) {
this.go(e.state.name, e.state.params || {}, { fromPopState: true });
} else {
const { name, params } = this.parseInitialRoute();
this.go(name, params, { fromPopState: true });
}
});
const initial = this.parseInitialRoute();
if (initial.name !== 'home') {
try {
history.replaceState({ name: initial.name, params: initial.params }, '', `#/${initial.name}`);
} catch(e) {}
this.go(initial.name, initial.params, { fromPopState: true });
}
},
};
document.querySelectorAll('.bottom-tabs .tab').forEach(tab => {
tab.addEventListener('click', () => {
Router.history = [];
Router.go(tab.dataset.page);
});
});


/* ==== js/app.js ==== */
function applyTheme() {
const mode = AppState.settings.theme;
if (mode === 'auto') {
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.dataset.theme = prefersDark ? 'dark' : 'light';
} else {
document.documentElement.dataset.theme = mode;
}
const themeColor = document.querySelector('meta[name="theme-color"]');
if (themeColor) {
themeColor.content = document.documentElement.dataset.theme === 'dark' ? '#0D1829' : '#0F4C3A';
}
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
if (AppState.settings.theme === 'auto') applyTheme();
});
let toastTimer = null;
function showToast(message, duration = 2500) {
const toast = document.getElementById('toast');
if (!toast) return;
toast.textContent = message;
toast.classList.remove('hidden');
if (toastTimer) clearTimeout(toastTimer);
toastTimer = setTimeout(() => toast.classList.add('hidden'), duration);
}
function showModal(title, options, currentValue, onSelect) {
const overlay = document.getElementById('modal-overlay');
const content = document.getElementById('modal-content');
content.innerHTML = `
<div class="modal-header">
<div class="modal-title">${title}</div>
<button class="modal-close" onclick="closeModal()">×</button>
</div>
<div class="modal-options">
${options.map(opt => `
<div class="modal-option ${opt.id === currentValue ? 'selected' : ''}"
data-value="${opt.id}">
${opt.label}
</div>
`).join('')}
</div>
`;
content.querySelectorAll('.modal-option').forEach(el => {
el.addEventListener('click', () => {
const value = el.dataset.value;
const num = parseInt(value, 10);
onSelect(isNaN(num) || String(num) !== value ? value : num);
closeModal();
});
});
overlay.classList.remove('hidden');
}
function closeModal() {
document.getElementById('modal-overlay').classList.add('hidden');
}
document.getElementById('modal-overlay').addEventListener('click', (e) => {
if (e.target.id === 'modal-overlay') closeModal();
});
async function initApp() {
Storage.loadSettings();
if (AppState.settings.locale && AppState.settings.locale !== currentLocale) {
setLocale(AppState.settings.locale);
} else {
AppState.settings.locale = currentLocale;
Storage.saveSettings();
}
applyTheme();
applyTranslations();
try {
document.documentElement.lang = AppState.settings.locale || 'es';
document.documentElement.dir = (AppState.settings.locale === 'ar') ? 'rtl' : 'ltr';
} catch(e) {}
const splashStart = Date.now();
const hideSplash = () => {
const elapsed = Date.now() - splashStart;
const wait = Math.max(0, 300 - elapsed);
setTimeout(() => {
const splash = document.getElementById('splash');
const app = document.getElementById('app');
if (splash) splash.classList.add('hidden');
if (app) app.classList.remove('hidden');
}, wait);
};
if (typeof Router.init === 'function') Router.init();
if (!location.hash || location.hash === '#' || location.hash === '#/') {
await Router.go('home');
}
hideSplash();
if (typeof PWAInstall !== 'undefined') PWAInstall.init();
}
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', initApp);
} else {
initApp();
}
