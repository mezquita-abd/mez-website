/* Quba bundle • v4.2.0 • generated 2026-08-06T03:52:21.906Z */

/* ==== js/version.js ==== */
const APP_VERSION = '4.6.0';
const APP_BUILD_DATE = '2026-08-01';
const APP_NAME = 'Quba';
const APP_CODENAME = 'Quba Al-Mubarak';
function escapeHtml(s) {
if (s === null || s === undefined) return '';
return String(s)
.replace(/&/g, '&amp;')
.replace(/</g, '&lt;')
.replace(/>/g, '&gt;')
.replace(/"/g, '&quot;')
.replace(/'/g, '&#39;');
}
const esc = escapeHtml;
function escapeAttr(s) {
if (s === null || s === undefined) return '';
return String(s)
.replace(/&/g, '&amp;')
.replace(/"/g, '&quot;')
.replace(/'/g, '&#39;')
.replace(/`/g, '&#96;')
.replace(/</g, '&lt;')
.replace(/>/g, '&gt;');
}


/* ==== js/i18n.js ==== */
const I18N = {
es: {
appName: 'Quba',
tagline: 'Tu compañero espiritual',
greetingMorning: 'Buenos días',
greetingAfternoon: 'Buenas tardes',
greetingEvening: 'Buenas noches',
greetingNight: 'Buena noche',
tabHome: 'Inicio',
tabQuran: 'Corán',
tabPrayer: 'Oración',
tabWisdom: 'Sabiduría',
tabProfile: 'Yo',
'prayers.Fajr': 'Fajr',
'prayers.Sunrise': 'Amanecer',
'prayers.Dhuhr': 'Dhuhr',
'prayers.Asr': 'Asr',
'prayers.Maghrib': 'Maghrib',
'prayers.Isha': 'Isha',
nextPrayer: 'Próxima oración',
todayPrayers: 'Oraciones de hoy',
verseOfDay: 'Versículo del día',
duaOfDay: "Du'a del día",
spiritualProgress: 'Progreso espiritual',
dailyWisdom: 'Sabiduría diaria',
todaysReflection: 'Reflexión de hoy',
streak: 'Racha',
daysInRow: 'días consecutivos',
surahs: 'Suras',
surah: 'Sura',
ayah: 'Aleya',
verse: 'Versículo',
reciter: 'Recitador',
translation: 'Traducción',
transliteration: 'Pronunciación',
tafsir: 'Tafsir',
searchSurah: 'Buscar sura por nombre o número...',
searchAyah: 'Ir a aleya...',
meccan: 'Mecana',
medinan: 'Medinense',
qibla: 'Qibla',
qiblaDirection: 'Dirección de la Qibla',
pointToKaaba: "Apunta hacia la Ka'aba",
aligned: '¡Alineado con Qibla!',
distance: 'Distancia',
toMakkah: 'hasta La Meca',
hijriCalendar: 'Calendario Hijri',
todaysVirtue: 'Virtud del día',
today: 'Hoy',
loading: 'Cargando...',
error: 'Error',
retry: 'Reintentar',
cancel: 'Cancelar',
close: 'Cerrar',
locationNeeded: 'Necesitamos tu ubicación',
locationDesc: 'Para calcular los tiempos de oración y la dirección de la Qibla',
grantPermission: 'Conceder permiso',
permissionDenied: 'Permiso denegado. Activa la ubicación en los ajustes del navegador.',
settings: 'Ajustes',
language: 'Idioma',
theme: 'Tema',
themeLight: 'Claro',
themeDark: 'Oscuro',
themeAuto: 'Automático',
calculationMethod: 'Método de cálculo',
about: 'Acerca de',
legend: 'Leyenda',
holiday: 'Festividad islámica',
fastingDay: 'Día recomendado para ayunar',
welcome: 'Asalaamu Alaikum',
previousSurah: 'Sura anterior',
nextSurah: 'Sura siguiente',
jumpToAyah: 'Ir a aleya',
showTransliteration: 'Mostrar pronunciación',
hideTransliteration: 'Ocultar pronunciación',
showTranslation: 'Mostrar traducción',
hideTranslation: 'Ocultar traducción',
fontSize: 'Tamaño de fuente',
tafsirOf: 'Tafsir de la aleya',
tafsirSource: 'Fuente',
selectTafsir: 'Seleccionar tafsir',
translatedAuto: 'Traducción automática',
arabicOriginal: 'Texto original árabe',
play: 'Reproducir',
pause: 'Pausar',
bookmark: 'Marcar',
share: 'Compartir',
settings_reader: 'Ajustes de lectura',
verses: 'Aleyas',
repeat: 'Repetir',
repeatOff: 'Repetir: OFF',
repeatAyah: 'Repetir aleya',
repeatSurah: 'Repetir sura',
quizCategory: 'Categorías del quiz',
chooseCategory: 'Elige una categoría',
questions: 'preguntas',
correct: 'correctas',
accuracy: 'Precisión',
perfect: '¡Perfecto!',
wellDone: '¡Bien hecho!',
keepPracticing: 'Sigue practicando',
playAgain: 'Jugar otra vez',
anotherCategory: 'Otra categoría',
backToWisdom: 'Volver a Sabiduría',
xpEarned: 'XP ganados',
livesLeft: 'vidas restantes',
noLives: '¡Sin vidas!',
noLivesDesc: 'Las vidas se regeneran solas. Espera para la próxima.',
achievements: 'Logros',
unlocked: 'desbloqueados',
tasbihDigital: 'Tasbih Digital',
adhkarCollections: 'Colecciones de Adhkar',
miniCourses: 'Mini-cursos',
adhkarMorning: 'Adhkar de la mañana',
adhkarEvening: 'Adhkar de la tarde',
adhkarSleep: 'Adhkar antes de dormir',
adhkarAfterPrayer: 'Adhkar tras la oración',
completeSet: 'Completar set',
markRead: 'Marcar leído',
yourStats: 'Tus estadísticas',
questionsAnswered: 'Preguntas',
correctAnswers: 'Correctas',
dhikrs: 'Dhikrs',
viewAll: 'Ver todos',
benefitsOfReading: 'Virtud',
source: 'Fuente',
profile: 'Perfil',
notifications: 'Notificaciones',
quranicWisdom: 'Sabiduría coránica',
adhkarTitle: 'Adhkar y Súplicas',
adhkarDesc: 'Mañana, tarde, dormir, post-oración',
quizTitle: 'Quiz Islámico',
quizDesc: '305 preguntas · 6 categorías · XP y niveles',
coursesTitle: 'Mini-cursos',
coursesDesc: 'Cómo orar · 99 Nombres · 5 Pilares',
tasbihTitle: 'Tasbih Digital',
tasbihDesc: 'Contador con vibración háptica',
wisdomSubtitle: 'Aprende, juega, crece espiritualmente',
level: 'Nivel',
badges: 'Insignias',
answered: 'Respondidas',
modules: 'Módulos',
tasbih: 'Tasbih',
repeatAudio: 'Repetir',
all_adhkar: 'Todos los adhkar',
all_courses: 'Todos los cursos',
first_quiz: 'Primer quiz completado',
perfect_quiz: 'Quiz perfecto',
first_course: 'Primer curso terminado',
bookmarks: 'Marcadores',
quizCatQuran: 'Corán y Tafsir',
quizCatSira: 'Vida del Profeta ﷺ',
quizCatHadith: 'Hadices',
quizCatFiqh: 'Fiqh básico',
quizCatHistory: 'Historia islámica',
quizCatProphets: 'Profetas',
quizCategories: 'Categorías',
quizIntro: 'Elige una categoría. Cada quiz: 10 preguntas. Gana XP por cada respuesta correcta.',
questions: 'preguntas',
correct: '¡Correcto!',
incorrect: 'Incorrecto',
next: 'Siguiente',
seeResults: 'Ver resultados',
perfect: '¡Perfecto!',
wellDone: '¡Bien hecho!',
keepPracticing: 'Sigue practicando',
correctPlural: 'Correctas',
accuracy: 'Precisión',
xpEarned: 'XP ganados',
perfectBonus: 'Bonus de quiz perfecto',
outOfLives: 'Te quedaste sin vidas',
playAgain: 'Jugar otra vez',
otherCategory: 'Otra categoría',
backToWisdom: 'Volver',
back: 'Volver',
confirmExitQuiz: '¿Salir del quiz? Perderás tu progreso actual.',
noLives: 'Sin vidas',
noLivesTitle: '¡Sin vidas!',
noLivesDesc: 'Las vidas se regeneran solas. Espera <strong>{min} minutos</strong>.',
noQuestions: 'No hay preguntas disponibles',
prayerTable: 'Tabla de oraciones',
viewMonth: 'Vista mensual',
translationUnavailable: 'Traducción automática no disponible ahora. Mostrando texto original en árabe.',
retry: 'Reintentar',
quizInfoTitle: 'Aprende jugando',
quizInfoDesc: 'Cada quiz contiene 10 preguntas. Gana XP, sube de nivel y desbloquea logros.',
sound: 'Sonido',
soundOn: 'Sonido activado',
soundOff: 'Sonido desactivado',
completed: '¡Completo!',
tapToCount: 'Toca para contar',
sessionTotal: 'Sesión',
lifetimeTotal: 'Histórico',
resetCounter: 'Reiniciar',
clearAll: 'Limpiar todo',
selectDhikr: 'Elegir dhikr',
confirmReset: '¿Reiniciar el contador?',
confirmResetAll: '¿Limpiar contador y total de sesión?',
allDhikrsDone: '¡Todos los dhikrs completos!',
adhkarIntro: 'Colecciones de invocaciones del Profeta ﷺ para diferentes momentos del día.',
adhkarMorning: 'Adhkar de la mañana',
adhkarEvening: 'Adhkar de la tarde',
adhkarSleep: 'Antes de dormir',
adhkarAfterPrayer: 'Tras la oración',
adhkarModuleDesc: 'Mañana · Tarde · Antes de dormir · Tras la oración',
tasbihModuleDesc: 'Contador con vibración y sonido · 8 dhikrs',
dhikrs: 'dhikrs',
markRead: 'Marcar leído',
done: 'Leído',
completeSet: 'Completar set',
noDataAvailable: 'No hay datos disponibles',
duasTitle: 'Du\'as y Súplicas',
duasIntro: 'Más de 300 súplicas auténticas del Profeta ﷺ en 27 categorías.',
duasModuleDesc: '300+ súplicas auténticas · 27 categorías',
searchDuas: 'Buscar súplicas...',
randomDua: 'Du\'a aleatoria',
duas: 'súplicas',
duasCredit: 'Datos proporcionados por UmmahAPI (sadaqah jariyah).',
errorLoading: 'Error al cargar. Verifica tu conexión.',
loading: 'Cargando...',
noCategories: 'Sin categorías',
noDuas: 'Sin súplicas en esta categoría',
resultsFor: 'resultados para',
noResults: 'Sin resultados',
copy: 'Copiar',
copied: 'Copiado',
share: 'Compartir',
bookmark: 'Marcador',
bookmarked: 'Guardado',
wisdomHubInfo: 'Acumula XP en cualquier módulo, sube de nivel y desbloquea logros.',
coursesWelcome: '¡Hola! Empieza tu viaje 🌙',
coursesModuleDesc: 'Viaje del musulmán · Tajwid · Fiqh · Kids',
allCourses: 'Todos los cursos',
continueLearning: '▶ Continuar',
completed: 'completados',
achievements: 'Logros',
stations: 'estaciones',
lessons: 'lecciones',
lockedStation: '🔒 Completa la estación anterior primero',
start: 'Empezar',
understand: 'Lo entiendo',
continue: 'Continuar',
learn: 'Aprendamos',
tapToFlip: 'Toca para girar',
checkAnswer: 'Verificar',
tryAgain: 'Vuelve a intentarlo',
orderCorrect: 'Has ordenado correctamente.',
orderWrong: 'Casi. El orden correcto te ayudará a recordarlo.',
stationComplete: '¡Estación completada!',
time: 'tiempo',
continueCourse: 'Continuar curso',
backToCourses: 'Volver a cursos',
certificateOfCompletion: 'Certificado de Finalización',
presentedTo: 'Otorgado a',
hasCompleted: 'ha completado el curso',
islamicLearning: 'Aprendizaje Islámico',
shareCertificate: 'Compartir certificado',
justCompleted: 'Acabo de completar el curso',
confirmExitLesson: '¿Salir de la lección? Tu progreso se guardará.',
whatToSay: 'Qué decir',
thenSay: 'Luego di',
nextStep: 'Siguiente paso',
monthlyTable: 'Mensual',
day: 'Día',
days: 'días',
friday: 'Viernes',
location: 'Ubicación',
noLocation: 'Sin ubicación',
unknownCity: 'Ciudad desconocida',
defaultLocation: 'por defecto',
manual: 'manual',
changeCity: 'Cambiar ciudad',
manualLocation: 'Ubicación manual',
requestingLocation: 'Solicitando ubicación...',
geoPermDenied: '⚠️ Permiso denegado. Usando La Habana por defecto.',
geoPermDeniedHelp: '❌ Permiso denegado. Habilítalo en la configuración del navegador.',
geoUnavailable: '⚠️ Posición no disponible.',
geoTimeout: '⚠️ Tiempo agotado.',
geoNotSupported: '⚠️ Geolocalización no soportada.',
geoError: '❌ Error obteniendo ubicación.',
geoGranted: '✅ Ubicación activada',
adhanSettings: 'Adhan (Llamada a la oración)',
adhanFirstTakbeer: 'Primer Takbeer',
adhanSecondTakbeer: 'Segundo Takbeer',
adhanMute: 'Silenciar Adhan',
adhanVolume: 'Volumen',
muted: 'Silenciado',
active: 'Activo',
adhanMuted: 'Adhan silenciado',
adhanUnmuted: 'Adhan activo',
adhanPlayError: 'No se pudo reproducir el adhan',
noData: 'Sin datos',
mosqueFooterTitle: 'Masjid Abdullah — مسجد عبد الله',
mosqueFooterMade: 'Hecho en La Habana, Cuba · 2026',
mosqueFooterDesc: 'Diseñado especialmente para el Masjid Abdullah y la comunidad musulmana de Cuba y América Latina.',
prayerNotif: 'Notificaciones de oración',
notifEnabled: '✅ Notificaciones activadas',
notifDisabled: 'Notificaciones desactivadas',
notifDenied: 'Permiso denegado. Actívalo en ajustes del navegador.',
notifNotSupported: 'Notificaciones no soportadas',
inactive: 'Inactivo',
dataZone: 'Datos y progreso',
exportData: 'Exportar datos',
exportDataDesc: 'Guardar copia local (JSON)',
exportOk: '✅ Backup descargado',
resetProgress: 'Reiniciar progreso',
resetProgressDesc: 'Borrar XP, marcadores y ajustes',
resetTypeConfirm: 'BORRAR',
resetTypeQuestion: 'Escribe',
resetTypeToConfirm: 'para confirmar:',
resetOk: '✅ Progreso reiniciado. Recargando...',
resetCancelled: 'Cancelado',
pwaInstalled: '✅ App instalada. Ábrela desde tu inicio.',
hadith: 'Hadiz',
wuduTitle: 'Curso de Wudu',
easy: 'Fácil',
medium: 'Medio',
hard: 'Difícil',
yourName: 'Tu nombre',
displayName: 'Nombre para mostrar',
nameHint: 'Aparecerá en tus certificados',
nameSaved: 'Nombre guardado',
},
ar: {
appName: 'قُبَّة',
tagline: 'رفيقك الروحي',
greetingMorning: 'صباح الخير',
greetingAfternoon: 'مساء الخير',
greetingEvening: 'مساء الخير',
greetingNight: 'تصبح على خير',
tabHome: 'الرئيسية',
tabQuran: 'القرآن',
tabPrayer: 'الصلاة',
tabWisdom: 'الحكمة',
tabProfile: 'حسابي',
'prayers.Fajr': 'الفجر',
'prayers.Sunrise': 'الشروق',
'prayers.Dhuhr': 'الظهر',
'prayers.Asr': 'العصر',
'prayers.Maghrib': 'المغرب',
'prayers.Isha': 'العشاء',
nextPrayer: 'الصلاة القادمة',
todayPrayers: 'صلوات اليوم',
verseOfDay: 'آية اليوم',
duaOfDay: 'دعاء اليوم',
spiritualProgress: 'التقدم الروحي',
dailyWisdom: 'حكمة اليوم',
todaysReflection: 'تأمل اليوم',
streak: 'سلسلة',
daysInRow: 'أيام متتالية',
surahs: 'السور',
surah: 'سورة',
ayah: 'آية',
verse: 'آية',
reciter: 'القارئ',
translation: 'الترجمة',
transliteration: 'النطق',
tafsir: 'التفسير',
searchSurah: 'ابحث عن سورة بالاسم أو الرقم...',
searchAyah: 'الانتقال إلى آية...',
meccan: 'مكية',
medinan: 'مدنية',
qibla: 'القبلة',
qiblaDirection: 'اتجاه القبلة',
pointToKaaba: 'وجه نحو الكعبة',
aligned: 'محاذاة مع القبلة!',
distance: 'المسافة',
toMakkah: 'إلى مكة',
hijriCalendar: 'التقويم الهجري',
todaysVirtue: 'فضل اليوم',
today: 'اليوم',
loading: 'جاري التحميل...',
error: 'خطأ',
retry: 'إعادة المحاولة',
cancel: 'إلغاء',
close: 'إغلاق',
locationNeeded: 'نحتاج إلى موقعك',
locationDesc: 'لحساب أوقات الصلاة واتجاه القبلة',
grantPermission: 'منح الإذن',
permissionDenied: 'تم رفض الإذن. قم بتفعيل الموقع في إعدادات المتصفح.',
settings: 'الإعدادات',
language: 'اللغة',
theme: 'المظهر',
themeLight: 'فاتح',
themeDark: 'داكن',
themeAuto: 'تلقائي',
calculationMethod: 'طريقة الحساب',
about: 'حول التطبيق',
legend: 'الدليل',
holiday: 'عيد إسلامي',
fastingDay: 'يوم يوصى بالصيام',
welcome: 'السلام عليكم',
previousSurah: 'السورة السابقة',
nextSurah: 'السورة التالية',
jumpToAyah: 'الانتقال إلى آية',
showTransliteration: 'إظهار النطق',
hideTransliteration: 'إخفاء النطق',
showTranslation: 'إظهار الترجمة',
hideTranslation: 'إخفاء الترجمة',
fontSize: 'حجم الخط',
tafsirOf: 'تفسير الآية',
tafsirSource: 'المصدر',
selectTafsir: 'اختر التفسير',
translatedAuto: 'ترجمة آلية',
arabicOriginal: 'النص العربي الأصلي',
play: 'تشغيل',
pause: 'إيقاف',
bookmark: 'حفظ',
share: 'مشاركة',
settings_reader: 'إعدادات القراءة',
verses: 'الآيات',
repeat: 'تكرار',
repeatOff: 'التكرار: متوقف',
repeatAyah: 'تكرار الآية',
repeatSurah: 'تكرار السورة',
quizCategory: 'فئات الاختبار',
chooseCategory: 'اختر فئة',
questions: 'أسئلة',
correct: 'صحيحة',
accuracy: 'الدقة',
perfect: 'ممتاز!',
wellDone: 'أحسنت!',
keepPracticing: 'استمر بالمحاولة',
playAgain: 'العب مجدداً',
anotherCategory: 'فئة أخرى',
backToWisdom: 'العودة إلى الحكمة',
xpEarned: 'نقاط الخبرة',
livesLeft: 'حيوات متبقية',
noLives: 'لا توجد حيوات!',
noLivesDesc: 'الحيوات تتجدد تلقائياً. انتظر للحياة القادمة.',
achievements: 'الإنجازات',
unlocked: 'مفتوحة',
tasbihDigital: 'المسبحة الرقمية',
adhkarCollections: 'الأذكار',
miniCourses: 'دروس قصيرة',
adhkarMorning: 'أذكار الصباح',
adhkarEvening: 'أذكار المساء',
adhkarSleep: 'أذكار النوم',
adhkarAfterPrayer: 'أذكار بعد الصلاة',
completeSet: 'إكمال المجموعة',
markRead: 'تمت القراءة',
yourStats: 'إحصائياتك',
questionsAnswered: 'الأسئلة',
correctAnswers: 'الصحيحة',
dhikrs: 'الأذكار',
viewAll: 'عرض الكل',
benefitsOfReading: 'الفضل',
source: 'المصدر',
profile: 'الملف الشخصي',
notifications: 'الإشعارات',
adhkarTitle: 'الأذكار والأدعية',
adhkarDesc: 'الصباح، المساء، النوم، بعد الصلاة',
quizTitle: 'اختبار إسلامي',
quizDesc: '305 سؤال · 6 فئات · نقاط ومستويات',
coursesTitle: 'دورات مصغرة',
coursesDesc: 'كيف تصلي · 99 اسماً · الأركان الخمسة',
tasbihTitle: 'المسبحة الرقمية',
tasbihDesc: 'عدّاد بالاهتزاز اللمسي',
wisdomSubtitle: 'تعلّم، العب، انمُ روحياً',
level: 'المستوى',
badges: 'الأوسمة',
answered: 'أجوبت',
modules: 'الوحدات',
tasbih: 'المسبحة',
repeatAudio: 'تكرار',
all_adhkar: 'كل الأذكار',
all_courses: 'كل الدورات',
first_quiz: 'أول اختبار مكتمل',
perfect_quiz: 'اختبار مثالي',
first_course: 'أول دورة مكتملة',
bookmarks: 'الإشارات',
adhkarTitle: 'الأذكار والأدعية',
adhkarDesc: 'الصباح، المساء، النوم، بعد الصلاة',
quizTitle: 'اختبار إسلامي',
quizDesc: '305 سؤال · 6 فئات · نقاط ومستويات',
coursesTitle: 'دورات مصغرة',
coursesDesc: 'كيف تصلي · 99 اسماً · الأركان الخمسة',
tasbihTitle: 'المسبحة الرقمية',
tasbihDesc: 'عدّاد بالاهتزاز اللمسي',
wisdomSubtitle: 'تعلّم، العب، انمُ روحياً',
level: 'المستوى',
badges: 'الأوسمة',
answered: 'أجوبت',
modules: 'الوحدات',
tasbih: 'المسبحة',
repeatAudio: 'تكرار',
all_adhkar: 'كل الأذكار',
all_courses: 'كل الدورات',
first_quiz: 'أول اختبار مكتمل',
perfect_quiz: 'اختبار مثالي',
first_course: 'أول دورة مكتملة',
bookmarks: 'الإشارات',
quizCatQuran: 'القرآن والتفسير',
quizCatSira: 'السيرة النبوية ﷺ',
quizCatHadith: 'الأحاديث',
quizCatFiqh: 'الفقه الأساسي',
quizCatHistory: 'التاريخ الإسلامي',
quizCatProphets: 'الأنبياء',
quizCategories: 'الفئات',
quizIntro: 'اختر فئة. كل اختبار: 10 أسئلة. اكسب نقاطاً مقابل كل إجابة صحيحة.',
questions: 'سؤال',
correct: 'إجابة صحيحة!',
incorrect: 'إجابة خاطئة',
next: 'التالي',
seeResults: 'عرض النتائج',
perfect: 'ممتاز!',
wellDone: 'أحسنت!',
keepPracticing: 'استمر بالتدرب',
correctPlural: 'صحيحة',
accuracy: 'الدقة',
xpEarned: 'النقاط المكتسبة',
perfectBonus: 'مكافأة الاختبار المثالي',
outOfLives: 'انتهت قلوبك',
playAgain: 'العب مرة أخرى',
otherCategory: 'فئة أخرى',
backToWisdom: 'رجوع',
back: 'رجوع',
confirmExitQuiz: 'هل تريد الخروج من الاختبار؟ ستفقد تقدمك الحالي.',
noLives: 'لا توجد قلوب',
noLivesTitle: 'انتهت القلوب!',
noLivesDesc: 'القلوب تتجدد تلقائياً. انتظر <strong>{min} دقيقة</strong>.',
noQuestions: 'لا توجد أسئلة متاحة',
prayerTable: 'جدول الصلوات',
viewMonth: 'عرض شهري',
translationUnavailable: 'الترجمة الآلية غير متوفرة الآن. عرض النص الأصلي بالعربية.',
retry: 'إعادة المحاولة',
quizInfoTitle: 'تعلّم باللعب',
quizInfoDesc: 'كل اختبار يحتوي على 10 أسئلة. اكسب نقاطاً، ارتقِ في المستويات، وافتح الإنجازات.',
sound: 'الصوت',
soundOn: 'الصوت مفعّل',
soundOff: 'الصوت معطّل',
completed: 'مكتمل!',
tapToCount: 'انقر للعدّ',
sessionTotal: 'الجلسة',
lifetimeTotal: 'الإجمالي',
resetCounter: 'إعادة',
clearAll: 'مسح الكل',
selectDhikr: 'اختر ذكراً',
confirmReset: 'إعادة تعيين العدّاد؟',
confirmResetAll: 'مسح العدّاد وإجمالي الجلسة؟',
allDhikrsDone: 'كل الأذكار مكتملة!',
adhkarIntro: 'مجموعات من أذكار النبي ﷺ لمختلف أوقات اليوم.',
adhkarMorning: 'أذكار الصباح',
adhkarEvening: 'أذكار المساء',
adhkarSleep: 'أذكار النوم',
adhkarAfterPrayer: 'أذكار بعد الصلاة',
adhkarModuleDesc: 'الصباح · المساء · النوم · بعد الصلاة',
tasbihModuleDesc: 'عدّاد بالاهتزاز والصوت · 8 أذكار',
dhikrs: 'ذكراً',
markRead: 'تمّت القراءة',
done: 'تمّ',
completeSet: 'إكمال المجموعة',
noDataAvailable: 'لا توجد بيانات',
duasTitle: 'الأدعية',
duasIntro: 'أكثر من 300 دعاء صحيح من السنة النبوية في 27 فئة.',
duasModuleDesc: '300+ دعاء صحيح · 27 فئة',
searchDuas: 'ابحث في الأدعية...',
randomDua: 'دعاء عشوائي',
duas: 'دعاء',
duasCredit: 'البيانات مقدّمة من UmmahAPI (صدقة جارية).',
errorLoading: 'خطأ في التحميل. تحقّق من الاتصال.',
loading: 'جاري التحميل...',
noCategories: 'لا توجد فئات',
noDuas: 'لا توجد أدعية في هذه الفئة',
resultsFor: 'نتائج لـ',
noResults: 'لا توجد نتائج',
copy: 'نسخ',
copied: 'تمّ النسخ',
share: 'مشاركة',
bookmark: 'إشارة مرجعية',
bookmarked: 'تمّ الحفظ',
wisdomHubInfo: 'اجمع نقاطاً في أي وحدة، ارتقِ في المستويات، وافتح الإنجازات.',
coursesWelcome: 'مرحباً! ابدأ رحلتك 🌙',
coursesModuleDesc: 'رحلة المسلم · التجويد · الفقه · الأطفال',
allCourses: 'كل الدورات',
continueLearning: '▶ تابع',
completed: 'مكتملة',
achievements: 'الإنجازات',
stations: 'محطات',
lessons: 'دروس',
lockedStation: '🔒 أكمل المحطة السابقة أولاً',
start: 'ابدأ',
understand: 'فهمت',
continue: 'متابعة',
learn: 'تعلّمنا',
tapToFlip: 'انقر للقلب',
checkAnswer: 'تحقّق',
tryAgain: 'حاول مرة أخرى',
orderCorrect: 'رتّبتَ بشكل صحيح.',
orderWrong: 'قريب. الترتيب الصحيح سيساعدك.',
stationComplete: 'تمّت المحطة!',
time: 'الوقت',
continueCourse: 'تابع الدورة',
backToCourses: 'العودة للدورات',
certificateOfCompletion: 'شهادة إتمام',
presentedTo: 'يُمنح إلى',
hasCompleted: 'أكمل دورة',
islamicLearning: 'التعلّم الإسلامي',
shareCertificate: 'مشاركة الشهادة',
justCompleted: 'أكملتُ للتو دورة',
confirmExitLesson: 'الخروج من الدرس؟ سيتم حفظ تقدّمك.',
whatToSay: 'ماذا تقول',
thenSay: 'ثم قل',
nextStep: 'الخطوة التالية',
monthlyTable: 'شهرية',
day: 'اليوم',
days: 'أيام',
friday: 'الجمعة',
location: 'الموقع',
noLocation: 'لا يوجد موقع',
unknownCity: 'مدينة غير معروفة',
defaultLocation: 'افتراضي',
manual: 'يدوي',
changeCity: 'تغيير المدينة',
manualLocation: 'موقع يدوي',
requestingLocation: 'جاري طلب الموقع...',
geoPermDenied: '⚠️ تمّ رفض الإذن. سيتم استخدام هافانا كافتراضي.',
geoPermDeniedHelp: '❌ تمّ رفض الإذن. فعّله من إعدادات المتصفح.',
geoUnavailable: '⚠️ الموقع غير متاح.',
geoTimeout: '⚠️ انتهى الوقت.',
geoNotSupported: '⚠️ الموقع الجغرافي غير مدعوم.',
geoError: '❌ خطأ في الحصول على الموقع.',
geoGranted: '✅ تمّ تفعيل الموقع',
adhanSettings: 'الأذان',
adhanFirstTakbeer: 'التكبيرة الأولى',
adhanSecondTakbeer: 'التكبيرة الثانية',
adhanMute: 'كتم الأذان',
adhanVolume: 'مستوى الصوت',
muted: 'مكتوم',
active: 'مفعّل',
adhanMuted: 'تمّ كتم الأذان',
adhanUnmuted: 'الأذان مفعّل',
adhanPlayError: 'تعذّر تشغيل الأذان',
noData: 'لا بيانات',
mosqueFooterTitle: 'مسجد عبد الله — Masjid Abdullah',
mosqueFooterMade: 'صُنع في هافانا، كوبا · 2026',
mosqueFooterDesc: 'مصمّم خصيصاً لمسجد عبد الله والجالية المسلمة في كوبا وأمريكا اللاتينية.',
prayerNotif: 'إشعارات الصلاة',
notifEnabled: '✅ تم تفعيل الإشعارات',
notifDisabled: 'تم تعطيل الإشعارات',
notifDenied: 'تم رفض الإذن. فعّله من إعدادات المتصفح.',
notifNotSupported: 'الإشعارات غير مدعومة',
inactive: 'غير مفعّل',
dataZone: 'البيانات والتقدّم',
exportData: 'تصدير البيانات',
exportDataDesc: 'حفظ نسخة محلية (JSON)',
exportOk: '✅ تم تنزيل النسخة الاحتياطية',
resetProgress: 'إعادة تعيين التقدّم',
resetProgressDesc: 'حذف XP والعلامات والإعدادات',
resetTypeConfirm: 'حذف',
resetTypeQuestion: 'اكتب',
resetTypeToConfirm: 'للتأكيد:',
resetOk: '✅ تم إعادة التعيين. إعادة التحميل...',
resetCancelled: 'تم الإلغاء',
pwaInstalled: '✅ تم تثبيت التطبيق. افتحه من شاشتك الرئيسية.',
confirmar: 'تأكيد',
quranicWisdom: 'حكمة قرآنية',
hadith: 'حديث',
wuduTitle: 'دورة الوضوء',
easy: 'سهل',
medium: 'متوسط',
hard: 'صعب',
yourName: 'اسمك',
displayName: 'الاسم المعروض',
nameHint: 'سيظهر في شهادات إنجاز الدورات',
nameSaved: 'تم حفظ الاسم',
},
en: {
appName: 'Quba',
tagline: 'Your spiritual companion',
greetingMorning: 'Good morning',
greetingAfternoon: 'Good afternoon',
greetingEvening: 'Good evening',
greetingNight: 'Good night',
tabHome: 'Home',
tabQuran: 'Quran',
tabPrayer: 'Prayer',
tabWisdom: 'Wisdom',
tabProfile: 'Me',
'prayers.Fajr': 'Fajr',
'prayers.Sunrise': 'Sunrise',
'prayers.Dhuhr': 'Dhuhr',
'prayers.Asr': 'Asr',
'prayers.Maghrib': 'Maghrib',
'prayers.Isha': 'Isha',
nextPrayer: 'Next prayer',
todayPrayers: "Today's prayers",
verseOfDay: 'Verse of the day',
duaOfDay: "Du'a of the day",
spiritualProgress: 'Spiritual progress',
dailyWisdom: 'Daily wisdom',
todaysReflection: "Today's reflection",
streak: 'Streak',
daysInRow: 'days in a row',
surahs: 'Surahs',
surah: 'Surah',
ayah: 'Ayah',
verse: 'Verse',
reciter: 'Reciter',
translation: 'Translation',
transliteration: 'Pronunciation',
tafsir: 'Tafsir',
searchSurah: 'Search by name or number...',
searchAyah: 'Jump to ayah...',
meccan: 'Meccan',
medinan: 'Medinan',
qibla: 'Qibla',
qiblaDirection: 'Qibla direction',
pointToKaaba: "Point to the Ka'bah",
aligned: 'Aligned with Qibla!',
distance: 'Distance',
toMakkah: 'to Makkah',
hijriCalendar: 'Hijri Calendar',
todaysVirtue: "Today's virtue",
today: 'Today',
loading: 'Loading...',
error: 'Error',
retry: 'Retry',
cancel: 'Cancel',
close: 'Close',
locationNeeded: 'We need your location',
locationDesc: 'To calculate prayer times and Qibla direction',
grantPermission: 'Grant permission',
permissionDenied: 'Permission denied. Enable location in browser settings.',
settings: 'Settings',
language: 'Language',
theme: 'Theme',
themeLight: 'Light',
themeDark: 'Dark',
themeAuto: 'Auto',
calculationMethod: 'Calculation method',
about: 'About',
legend: 'Legend',
holiday: 'Islamic holiday',
fastingDay: 'Recommended fasting day',
welcome: 'Asalaamu Alaikum',
previousSurah: 'Previous surah',
nextSurah: 'Next surah',
jumpToAyah: 'Jump to ayah',
showTransliteration: 'Show pronunciation',
hideTransliteration: 'Hide pronunciation',
showTranslation: 'Show translation',
hideTranslation: 'Hide translation',
fontSize: 'Font size',
tafsirOf: 'Tafsir of ayah',
tafsirSource: 'Source',
selectTafsir: 'Select tafsir',
translatedAuto: 'Auto-translation',
arabicOriginal: 'Original Arabic text',
play: 'Play',
pause: 'Pause',
bookmark: 'Bookmark',
share: 'Share',
settings_reader: 'Reader settings',
verses: 'Verses',
repeat: 'Repeat',
repeatOff: 'Repeat: OFF',
repeatAyah: 'Repeat ayah',
repeatSurah: 'Repeat surah',
quizCategory: 'Quiz categories',
chooseCategory: 'Choose a category',
questions: 'questions',
correct: 'correct',
accuracy: 'Accuracy',
perfect: 'Perfect!',
wellDone: 'Well done!',
keepPracticing: 'Keep practicing',
playAgain: 'Play again',
anotherCategory: 'Another category',
backToWisdom: 'Back to Wisdom',
xpEarned: 'XP earned',
livesLeft: 'lives left',
noLives: 'No lives!',
noLivesDesc: 'Lives regenerate automatically. Wait for the next one.',
achievements: 'Achievements',
unlocked: 'unlocked',
tasbihDigital: 'Digital Tasbih',
adhkarCollections: 'Adhkar Collections',
miniCourses: 'Mini-courses',
adhkarMorning: 'Morning Adhkar',
adhkarEvening: 'Evening Adhkar',
adhkarSleep: 'Before sleep Adhkar',
adhkarAfterPrayer: 'After prayer Adhkar',
completeSet: 'Complete set',
markRead: 'Mark read',
yourStats: 'Your stats',
questionsAnswered: 'Questions',
correctAnswers: 'Correct',
dhikrs: 'Dhikrs',
viewAll: 'View all',
benefitsOfReading: 'Virtue',
source: 'Source',
profile: 'Profile',
notifications: 'Notifications',
quranicWisdom: 'Quranic wisdom',
adhkarTitle: 'Adhkar & Supplications',
adhkarDesc: 'Morning, evening, sleep, after prayer',
quizTitle: 'Islamic Quiz',
quizDesc: '305 questions · 6 categories · XP & levels',
coursesTitle: 'Mini-courses',
coursesDesc: 'How to pray · 99 Names · 5 Pillars',
tasbihTitle: 'Digital Tasbih',
tasbihDesc: 'Counter with haptic feedback',
wisdomSubtitle: 'Learn, play, grow spiritually',
level: 'Level',
badges: 'Badges',
answered: 'Answered',
modules: 'Modules',
tasbih: 'Tasbih',
repeatAudio: 'Repeat',
all_adhkar: 'All adhkar',
all_courses: 'All courses',
first_quiz: 'First quiz completed',
perfect_quiz: 'Perfect quiz',
first_course: 'First course completed',
bookmarks: 'Bookmarks',
quizCatQuran: 'Quran & Tafsir',
quizCatSira: 'Life of the Prophet ﷺ',
quizCatHadith: 'Hadith',
quizCatFiqh: 'Basic Fiqh',
quizCatHistory: 'Islamic History',
quizCatProphets: 'Prophets',
quizCategories: 'Categories',
quizIntro: 'Choose a category. Each quiz: 10 questions. Earn XP for each correct answer.',
questions: 'questions',
correct: 'Correct!',
incorrect: 'Incorrect',
next: 'Next',
seeResults: 'See results',
perfect: 'Perfect!',
wellDone: 'Well done!',
keepPracticing: 'Keep practicing',
correctPlural: 'Correct',
accuracy: 'Accuracy',
xpEarned: 'XP earned',
perfectBonus: 'Perfect quiz bonus',
outOfLives: 'You ran out of lives',
playAgain: 'Play again',
otherCategory: 'Another category',
backToWisdom: 'Back',
back: 'Back',
confirmExitQuiz: 'Exit the quiz? You will lose your current progress.',
noLives: 'No lives',
noLivesTitle: 'Out of lives!',
noLivesDesc: 'Lives regenerate automatically. Wait <strong>{min} minutes</strong>.',
noQuestions: 'No questions available',
prayerTable: 'Prayer Table',
viewMonth: 'Monthly view',
translationUnavailable: 'Automatic translation unavailable. Showing original Arabic text.',
retry: 'Retry',
quizInfoTitle: 'Learn by playing',
quizInfoDesc: '10 questions per quiz. Earn XP, level up, and unlock achievements.',
sound: 'Sound',
soundOn: 'Sound on',
soundOff: 'Sound off',
completed: 'Completed!',
tapToCount: 'Tap to count',
sessionTotal: 'Session',
lifetimeTotal: 'Total',
resetCounter: 'Reset',
clearAll: 'Clear all',
selectDhikr: 'Select dhikr',
confirmReset: 'Reset counter?',
confirmResetAll: 'Clear counter and session total?',
allDhikrsDone: 'All dhikrs complete!',
adhkarIntro: 'Collections of supplications from the Prophet ﷺ for different times of the day.',
adhkarMorning: 'Morning Adhkar',
adhkarEvening: 'Evening Adhkar',
adhkarSleep: 'Before Sleep',
adhkarAfterPrayer: 'After Prayer',
adhkarModuleDesc: 'Morning · Evening · Sleep · After prayer',
tasbihModuleDesc: 'Counter with vibration and sound · 8 dhikrs',
dhikrs: 'dhikrs',
markRead: 'Mark read',
done: 'Done',
completeSet: 'Complete set',
noDataAvailable: 'No data available',
duasTitle: 'Du\'as & Supplications',
duasIntro: 'Over 300 authentic supplications from the Prophet ﷺ across 27 categories.',
duasModuleDesc: '300+ authentic supplications · 27 categories',
searchDuas: 'Search supplications...',
randomDua: 'Random dua',
duas: 'duas',
duasCredit: 'Data provided by UmmahAPI (sadaqah jariyah).',
errorLoading: 'Loading error. Check your connection.',
loading: 'Loading...',
noCategories: 'No categories',
noDuas: 'No duas in this category',
resultsFor: 'results for',
noResults: 'No results',
copy: 'Copy',
copied: 'Copied',
share: 'Share',
bookmark: 'Bookmark',
bookmarked: 'Saved',
wisdomHubInfo: 'Earn XP in any module, level up, and unlock achievements.',
coursesWelcome: 'Hello! Start your journey 🌙',
coursesModuleDesc: 'Muslim journey · Tajwid · Fiqh · Kids',
allCourses: 'All courses',
continueLearning: '▶ Continue',
completed: 'completed',
achievements: 'Achievements',
stations: 'stations',
lessons: 'lessons',
lockedStation: '🔒 Complete the previous station first',
start: 'Start',
understand: 'I understand',
continue: 'Continue',
learn: 'Let\'s learn',
tapToFlip: 'Tap to flip',
checkAnswer: 'Check',
tryAgain: 'Try again',
orderCorrect: 'You ordered correctly.',
orderWrong: 'Close. The correct order will help you remember.',
stationComplete: 'Station completed!',
time: 'time',
continueCourse: 'Continue course',
backToCourses: 'Back to courses',
certificateOfCompletion: 'Certificate of Completion',
presentedTo: 'Presented to',
hasCompleted: 'has completed the course',
islamicLearning: 'Islamic Learning',
shareCertificate: 'Share certificate',
justCompleted: 'I just completed the course',
confirmExitLesson: 'Exit lesson? Your progress will be saved.',
whatToSay: 'What to say',
thenSay: 'Then say',
nextStep: 'Next step',
monthlyTable: 'Monthly',
day: 'Day',
days: 'days',
friday: 'Friday',
location: 'Location',
noLocation: 'No location',
unknownCity: 'Unknown city',
defaultLocation: 'default',
manual: 'manual',
changeCity: 'Change city',
manualLocation: 'Manual location',
requestingLocation: 'Requesting location...',
geoPermDenied: '⚠️ Permission denied. Using Havana as default.',
geoPermDeniedHelp: '❌ Permission denied. Enable it in browser settings.',
geoUnavailable: '⚠️ Position unavailable.',
geoTimeout: '⚠️ Timeout.',
geoNotSupported: '⚠️ Geolocation not supported.',
geoError: '❌ Error getting location.',
geoGranted: '✅ Location enabled',
adhanSettings: 'Adhan (Call to prayer)',
adhanFirstTakbeer: 'First Takbeer',
adhanSecondTakbeer: 'Second Takbeer',
adhanMute: 'Mute Adhan',
adhanVolume: 'Volume',
muted: 'Muted',
active: 'Active',
adhanMuted: 'Adhan muted',
adhanUnmuted: 'Adhan active',
adhanPlayError: 'Cannot play adhan',
noData: 'No data',
mosqueFooterTitle: 'Masjid Abdullah — مسجد عبد الله',
mosqueFooterMade: 'Made in Havana, Cuba · 2026',
mosqueFooterDesc: 'Specially designed for Masjid Abdullah and the Muslim community of Cuba and Latin America.',
prayerNotif: 'Prayer notifications',
notifEnabled: '✅ Notifications enabled',
notifDisabled: 'Notifications disabled',
notifDenied: 'Permission denied. Enable it in browser settings.',
notifNotSupported: 'Notifications not supported',
inactive: 'Inactive',
dataZone: 'Data & Progress',
exportData: 'Export data',
exportDataDesc: 'Save local backup (JSON)',
exportOk: '✅ Backup downloaded',
resetProgress: 'Reset progress',
resetProgressDesc: 'Delete XP, bookmarks and settings',
resetTypeConfirm: 'DELETE',
resetTypeQuestion: 'Type',
resetTypeToConfirm: 'to confirm:',
resetOk: '✅ Progress reset. Reloading...',
resetCancelled: 'Cancelled',
pwaInstalled: '✅ App installed. Open it from your home screen.',
confirmar: 'Confirm',
hadith: 'Hadith',
wuduTitle: 'Wudu Course',
easy: 'Easy',
medium: 'Medium',
hard: 'Hard',
yourName: 'Your name',
displayName: 'Display name',
nameHint: 'Will appear on your certificates',
nameSaved: 'Name saved',
},
};
let currentLocale = 'es';
function detectLocale() {
const saved = localStorage.getItem('quba_locale');
if (saved && I18N[saved]) return saved;
const browserLang = (navigator.language || 'es').split('-')[0];
return I18N[browserLang] ? browserLang : 'es';
}
function setLocale(loc) {
if (!I18N[loc]) return;
currentLocale = loc;
localStorage.setItem('quba_locale', loc);
document.documentElement.lang = loc;
document.documentElement.dir = loc === 'ar' ? 'rtl' : 'ltr';
applyTranslations();
}
function t(key) {
return I18N[currentLocale]?.[key] || I18N.es[key] || key;
}
function applyTranslations() {
document.querySelectorAll('[data-i18n]').forEach(el => {
const key = el.getAttribute('data-i18n');
el.textContent = t(key);
});
}
currentLocale = detectLocale();
document.documentElement.lang = currentLocale;
document.documentElement.dir = currentLocale === 'ar' ? 'rtl' : 'ltr';


/* ==== js/config.js ==== */
const CONFIG = {
KAABA: { lat: 21.4225, lng: 39.8262 },
CALCULATION_METHODS: {
2: 'ISNA (Norteamérica)',
3: 'Liga Mundial Musulmana',
4: 'Umm Al-Qura (Makkah)',
5: 'Autoridad General de Egipto',
8: 'Gulf Region',
12: 'UOIF (Europa)',
13: 'Diyanet (Turquía)',
14: 'Espiritualidad Islámica España',
},
RECITERS: [
{ id: 'ar.abdurrahmaansudais', name: 'Abdurrahman As-Sudais', country: 'Arabia Saudí' },
{ id: 'ar.husary', name: 'Mahmoud Khalil Al-Husary', country: 'Egipto' },
{ id: 'ar.saadalghamdi', name: 'Saad Al-Ghamdi', country: 'Arabia Saudí' },
{ id: 'ar.minshawi', name: 'Mohamed Siddiq El-Minshawi', country: 'Egipto' },
{ id: 'ar.abdulbasitmurattal', name: 'Abdul Basit (Murattal)', country: 'Egipto' },
{ id: 'ar.hudhaify', name: 'Ali Al-Hudhaify', country: 'Arabia Saudí' },
],
TRANSLATIONS: {
'es.cortes': 'Julio Cortés (Español)',
'es.garcia': 'García (Español)',
'en.sahih': 'Sahih International (English)',
'en.pickthall': 'Pickthall (English)',
},
API: {
ALADHAN: 'https://api.aladhan.com/v1',
QURAN: 'https://api.alquran.cloud/v1',
UMMAH: 'https://ummahapi.com/api',
PROXY: '',
},
USE_LOCAL_DUAS: true,
CACHE_TTL: 24 * 60 * 60 * 1000, // 24h
};
const AppState = {
location: null,
timings: null,
hijri: null,
settings: {
locale: 'es',
theme: 'auto',
calculationMethod: 3,
reciter: 'ar.abdurrahmaansudais',
translation: 'es.cortes',
userName: '',  // v15: nombre para certificados
},
};


/* ==== js/storage.js ==== */
const Storage = {
set(key, value, ttl = null) {
const item = {
value,
timestamp: Date.now(),
ttl,
};
try {
localStorage.setItem('quba_' + key, JSON.stringify(item));
} catch (e) {
console.warn('Storage full:', e);
}
},
get(key) {
try {
const raw = localStorage.getItem('quba_' + key);
if (!raw) return null;
const item = JSON.parse(raw);
if (item.ttl && Date.now() - item.timestamp > item.ttl) {
localStorage.removeItem('quba_' + key);
return null;
}
return item.value;
} catch (e) {
return null;
}
},
remove(key) {
localStorage.removeItem('quba_' + key);
},
loadSettings() {
const settings = Storage.get('settings');
if (settings) {
Object.assign(AppState.settings, settings);
}
return AppState.settings;
},
saveSettings() {
Storage.set('settings', AppState.settings);
},
};
Storage.loadSettings();


/* ==== js/cache-db.js ==== */
const CacheDB = {
_dbName: 'quba_cache_v1',
_storeName: 'kv',
_db: null,
_memCache: new Map(), // buffer sincrono para lecturas rápidas repetidas
_ready: null,
async _init() {
if (this._db) return this._db;
if (this._ready) return this._ready;
this._ready = new Promise((resolve, reject) => {
const req = indexedDB.open(this._dbName, 1);
req.onupgradeneeded = e => {
const db = e.target.result;
if (!db.objectStoreNames.contains(this._storeName)) {
db.createObjectStore(this._storeName);
}
};
req.onsuccess = e => { this._db = e.target.result; resolve(this._db); };
req.onerror = e => reject(e.target.error);
});
return this._ready;
},
async _tx(mode) {
const db = await this._init();
return db.transaction(this._storeName, mode).objectStore(this._storeName);
},
async set(key, value, ttl = null) {
try {
const store = await this._tx('readwrite');
const item = { value, timestamp: Date.now(), ttl };
store.put(item, key);
this._memCache.set(key, item);
return true;
} catch (e) {
console.warn('CacheDB set fail:', e);
try {
localStorage.setItem('quba_' + key, JSON.stringify({ value, timestamp: Date.now(), ttl }));
} catch(_) {}
return false;
}
},
async get(key) {
if (this._memCache.has(key)) {
const item = this._memCache.get(key);
if (item.ttl && Date.now() - item.timestamp > item.ttl) {
this._memCache.delete(key);
await this.remove(key);
return null;
}
return item.value;
}
try {
const store = await this._tx('readonly');
return await new Promise((resolve, reject) => {
const req = store.get(key);
req.onsuccess = () => {
const item = req.result;
if (!item) return resolve(null);
if (item.ttl && Date.now() - item.timestamp > item.ttl) {
this.remove(key);
return resolve(null);
}
this._memCache.set(key, item);
resolve(item.value);
};
req.onerror = () => reject(req.error);
});
} catch (e) {
try {
const raw = localStorage.getItem('quba_' + key);
if (!raw) return null;
const item = JSON.parse(raw);
if (item.ttl && Date.now() - item.timestamp > item.ttl) {
localStorage.removeItem('quba_' + key);
return null;
}
return item.value;
} catch(_) { return null; }
}
},
async remove(key) {
this._memCache.delete(key);
try {
const store = await this._tx('readwrite');
store.delete(key);
} catch(_) {}
try { localStorage.removeItem('quba_' + key); } catch(_) {}
},
async clear() {
this._memCache.clear();
try {
const store = await this._tx('readwrite');
store.clear();
} catch(_) {}
},
async keys() {
try {
const store = await this._tx('readonly');
return await new Promise((resolve, reject) => {
const req = store.getAllKeys();
req.onsuccess = () => resolve(req.result || []);
req.onerror = () => reject(req.error);
});
} catch(_) { return []; }
},
};
(async function migrateOnce() {
const flag = 'quba_migrated_v10';
if (localStorage.getItem(flag) === '1') return;
try {
const bigKeyPatterns = ['tafsir_', 'hijri_cal_', 'translate_', 'ummah_', 'duas_cat_', 'monthly_prayers_'];
const migrated = [];
for (let i = 0; i < localStorage.length; i++) {
const k = localStorage.key(i);
if (!k || !k.startsWith('quba_')) continue;
const bareKey = k.slice(5); // quitar 'quba_'
if (bigKeyPatterns.some(p => bareKey.startsWith(p))) {
try {
const item = JSON.parse(localStorage.getItem(k));
if (item && 'value' in item) {
await CacheDB.set(bareKey, item.value, item.ttl);
migrated.push(bareKey);
}
} catch(_) {}
}
}
migrated.forEach(k => { try { localStorage.removeItem('quba_' + k); } catch(_) {} });
localStorage.setItem(flag, '1');
if (migrated.length > 0) console.log(`✅ Migradas ${migrated.length} entradas a IndexedDB`);
} catch (e) {
console.warn('Migración IDB falló:', e);
}
})();


/* ==== js/api.js ==== */
const API = {
async getPrayerTimes(lat, lng, date = new Date(), method = 3) {
const dd = String(date.getDate()).padStart(2, '0');
const mm = String(date.getMonth() + 1).padStart(2, '0');
const yyyy = date.getFullYear();
const cacheKey = `prayer_${lat.toFixed(2)}_${lng.toFixed(2)}_${dd}-${mm}-${yyyy}_${method}`;
const cached = Storage.get(cacheKey);
if (cached) return cached;
const url = `${CONFIG.API.ALADHAN}/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lng}&method=${method}`;
const res = await fetch(url);
if (!res.ok) throw new Error('Prayer API error');
const json = await res.json();
if (json.code !== 200) throw new Error('Prayer API error');
Storage.set(cacheKey, json.data, CONFIG.CACHE_TTL);
return json.data;
},
async gregorianToHijri(date = new Date()) {
const dd = String(date.getDate()).padStart(2, '0');
const mm = String(date.getMonth() + 1).padStart(2, '0');
const yyyy = date.getFullYear();
const cacheKey = `hijri_${dd}-${mm}-${yyyy}`;
const cached = Storage.get(cacheKey);
if (cached) return cached;
const url = `${CONFIG.API.ALADHAN}/gToH/${dd}-${mm}-${yyyy}`;
const res = await fetch(url);
if (!res.ok) throw new Error('Hijri API error');
const json = await res.json();
const hijri = json.data?.hijri;
if (hijri) Storage.set(cacheKey, hijri, CONFIG.CACHE_TTL * 7);
return hijri;
},
async getHijriCalendarMonth(month, year) {
const cacheKey = `hijri_cal_${month}_${year}`;
const cached = Storage.get(cacheKey);
if (cached) return cached;
const url = `${CONFIG.API.ALADHAN}/gToHCalendar/${month}/${year}`;
const res = await fetch(url);
if (!res.ok) throw new Error('Hijri calendar error');
const json = await res.json();
const data = json.data || [];
Storage.set(cacheKey, data, CONFIG.CACHE_TTL * 7);
return data;
},
async getPrayerTimesMonth(lat, lon, month, year, method = 3) {
const cacheKey = `prayer_month_${lat.toFixed(2)}_${lon.toFixed(2)}_${month}_${year}_${method}`;
const cached = Storage.get(cacheKey);
if (cached) return cached;
const url = `${CONFIG.API.ALADHAN}/calendar/${year}/${month}?latitude=${lat}&longitude=${lon}&method=${method}`;
const res = await fetch(url);
if (!res.ok) throw new Error('Prayer month error');
const json = await res.json();
const data = json.data || [];
Storage.set(cacheKey, data, CONFIG.CACHE_TTL * 7);
return data;
},
async getSurahList() {
const cached = Storage.get('surah_list');
if (cached) return cached;
const res = await fetch(`${CONFIG.API.QURAN}/surah`);
if (!res.ok) throw new Error('Surah list error');
const json = await res.json();
const data = json.data || [];
Storage.set('surah_list', data, CONFIG.CACHE_TTL * 30);
return data;
},
async getSurahWithTranslation(surahNumber, translation = 'es.cortes', audio = 'ar.alafasy') {
const cacheKey = `surah_${surahNumber}_${translation}_${audio}_v3`;
const cached = Storage.get(cacheKey);
if (cached) return cached;
const editions = `quran-uthmani,${translation},${audio},en.transliteration`;
const url = `${CONFIG.API.QURAN}/surah/${surahNumber}/editions/${editions}`;
const res = await fetch(url);
if (!res.ok) throw new Error('Surah error');
const json = await res.json();
const editionsData = json.data || [];
if (editionsData.length < 2) throw new Error('Sura no disponible');
const arabic = editionsData[0];
const trans = editionsData[1];
const aud = editionsData[2];
const translit = editionsData[3];
const ayahs = arabic.ayahs.map((a, idx) => ({
number: a.numberInSurah,
numberGlobal: a.number, // global ayah index 1-6236
arabic: a.text,
translation: trans?.ayahs?.[idx]?.text || '',
transliteration: translit?.ayahs?.[idx]?.text || '',
audio: aud?.ayahs?.[idx]?.audio || null,
audioSecondary: aud?.ayahs?.[idx]?.audioSecondary || [],
juz: a.juz,
page: a.page,
sajda: a.sajda,
}));
const result = {
number: arabic.number,
name: arabic.name,
englishName: arabic.englishName,
englishNameTranslation: arabic.englishNameTranslation,
revelationType: arabic.revelationType,
numberOfAyahs: arabic.numberOfAyahs,
ayahs,
};
Storage.set(cacheKey, result, CONFIG.CACHE_TTL * 7);
return result;
},
async getVerseOfTheDay(translation = 'es.cortes') {
const today = new Date();
const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
const totalAyahs = 6236;
const ayahNumber = ((dayOfYear * 17) % totalAyahs) + 1;
const cacheKey = `vod_${ayahNumber}_${translation}`;
const cached = Storage.get(cacheKey);
if (cached) return cached;
try {
const [arRes, trRes] = await Promise.all([
fetch(`${CONFIG.API.QURAN}/ayah/${ayahNumber}/quran-uthmani`),
fetch(`${CONFIG.API.QURAN}/ayah/${ayahNumber}/${translation}`),
]);
const arJ = await arRes.json();
const trJ = await trRes.json();
const result = {
arabic: arJ.data?.text,
translation: trJ.data?.text,
surah: arJ.data?.surah?.englishName,
surahNumber: arJ.data?.surah?.number,
ayahNumber: arJ.data?.numberInSurah,
};
Storage.set(cacheKey, result, CONFIG.CACHE_TTL);
return result;
} catch (e) {
return {
arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
translation: 'Ciertamente, con la dificultad viene la facilidad.',
surah: 'Ash-Sharh',
surahNumber: 94,
ayahNumber: 6,
};
}
},
async getDuaCategories() {
if (CONFIG.USE_LOCAL_DUAS && typeof LocalDuasService !== 'undefined') {
const res = await LocalDuasService.getCategories();
return res.data || [];
}
const cacheKey = 'dua_cats_v1';
const cached = Storage.get(cacheKey);
if (cached) return cached;
try {
const url = CONFIG.API.PROXY
? `${CONFIG.API.PROXY}/duas/categories`
: `${CONFIG.API.UMMAH}/duas/categories`;
const res = await fetch(url);
const json = await res.json();
const cats = json?.data?.categories || json?.data || [];
Storage.set(cacheKey, cats, 7 * 24 * 60 * 60 * 1000); // 7 days
return cats;
} catch (e) {
console.warn('getDuaCategories failed:', e);
return [];
}
},
async getDuasByCategory(categoryId) {
if (CONFIG.USE_LOCAL_DUAS && typeof LocalDuasService !== 'undefined') {
const lang = AppState.settings.locale || 'es';
const res = await LocalDuasService.getCategory(categoryId, lang);
return res.data || [];
}
const cacheKey = `dua_cat_${categoryId}_v1`;
const cached = Storage.get(cacheKey);
if (cached) return cached;
try {
const url = CONFIG.API.PROXY
? `${CONFIG.API.PROXY}/duas/category/${encodeURIComponent(categoryId)}`
: `${CONFIG.API.UMMAH}/duas/category/${encodeURIComponent(categoryId)}`;
const res = await fetch(url);
const json = await res.json();
const duas = json?.data?.duas || json?.data || [];
Storage.set(cacheKey, duas, 7 * 24 * 60 * 60 * 1000);
return duas;
} catch (e) {
console.warn('getDuasByCategory failed:', e);
return [];
}
},
async getRandomDua() {
try {
const res = await fetch(`${CONFIG.API.UMMAH}/duas/random`);
const json = await res.json();
return json?.data || null;
} catch (e) {
return null;
}
},
async searchDuas(query) {
if (!query || query.length < 2) return [];
try {
const res = await fetch(`${CONFIG.API.UMMAH}/duas/search?q=${encodeURIComponent(query)}`);
const json = await res.json();
return json?.data?.duas || [];
} catch (e) {
return [];
}
},
};
const LocationService = {
DEFAULT_LOCATION: {
latitude: 23.1136,
longitude: -82.3666,
city: 'La Habana',
country: 'Cuba',
isDefault: true,
},
async checkPermission() {
if (!navigator.permissions) return 'unknown';
try {
const res = await navigator.permissions.query({ name: 'geolocation' });
return res.state; // 'granted' | 'prompt' | 'denied'
} catch (e) {
return 'unknown';
}
},
async reverseGeocode(lat, lon) {
try {
const res = await fetch(
`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
{ headers: { 'Accept-Language': currentLocale || 'es' } }
);
const data = await res.json();
return {
city: data.address?.city || data.address?.town || data.address?.village || data.address?.county || '',
country: data.address?.country || '',
};
} catch (e) {
return { city: '', country: '' };
}
},
async getCurrent(options = {}) {
const { forceRefresh = false, silent = false } = options;
if (!forceRefresh) {
const cached = Storage.get('last_location');
if (cached) return cached;
}
if (!navigator.geolocation) {
if (!silent) showToast('⚠️ ' + (t('geoNotSupported') || 'Geolocalización no soportada. Usando ubicación por defecto.'), 3000);
return this.useDefault();
}
return new Promise((resolve) => {
navigator.geolocation.getCurrentPosition(
async (position) => {
const coords = {
latitude: position.coords.latitude,
longitude: position.coords.longitude,
accuracy: position.coords.accuracy,
};
const geo = await this.reverseGeocode(coords.latitude, coords.longitude);
Object.assign(coords, geo);
Storage.set('last_location', coords, CONFIG.CACHE_TTL * 7);
resolve(coords);
},
(err) => {
const cached = Storage.get('last_location');
if (cached) return resolve(cached);
if (!silent) {
const msg = err.code === 1
? (t('geoPermDenied') || '⚠️ Permiso denegado. Usando La Habana por defecto. Puedes cambiarla en el perfil.')
: err.code === 2
? (t('geoUnavailable') || '⚠️ Posición no disponible. Usando ubicación por defecto.')
: (t('geoTimeout') || '⚠️ Tiempo agotado. Usando ubicación por defecto.');
showToast(msg, 4000);
}
resolve(this.useDefault());
},
{ enableHighAccuracy: false, timeout: 12000, maximumAge: 600000 }
);
});
},
async requestPermission() {
if (!navigator.geolocation) {
showToast('⚠️ ' + (t('geoNotSupported') || 'No soportado'), 3000);
return null;
}
return new Promise((resolve) => {
navigator.geolocation.getCurrentPosition(
async (position) => {
const coords = {
latitude: position.coords.latitude,
longitude: position.coords.longitude,
accuracy: position.coords.accuracy,
};
const geo = await this.reverseGeocode(coords.latitude, coords.longitude);
Object.assign(coords, geo);
Storage.set('last_location', coords, CONFIG.CACHE_TTL * 7);
showToast('✅ ' + (t('geoGranted') || 'Ubicación activada: ' + (coords.city || '')), 2500);
resolve(coords);
},
(err) => {
const msg = err.code === 1
? (t('geoPermDeniedHelp') || '❌ Permiso denegado. Abre la configuración del navegador para habilitarlo.')
: (t('geoError') || '❌ Error al obtener ubicación.');
showToast(msg, 5000);
resolve(null);
},
{ enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
);
});
},
setManual(lat, lon, city, country) {
const coords = {
latitude: lat,
longitude: lon,
city: city || '',
country: country || '',
manual: true,
};
Storage.set('last_location', coords, CONFIG.CACHE_TTL * 30);
AppState.location = coords;
return coords;
},
useDefault() {
Storage.set('last_location', this.DEFAULT_LOCATION, CONFIG.CACHE_TTL * 7);
return { ...this.DEFAULT_LOCATION };
},
getCached() {
return Storage.get('last_location');
},
};
function getDailyPrayers(timings) {
if (!timings) return [];
const names = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
return names.map(n => ({
name: n,
time: (timings[n] || '--:--').split(' ')[0],
}));
}
function getNextPrayer(timings) {
if (!timings) return null;
const order = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const now = new Date();
for (const name of order) {
const ts = (timings[name] || '').split(' ')[0];
if (!ts) continue;
const [h, m] = ts.split(':').map(Number);
const d = new Date();
d.setHours(h, m, 0, 0);
if (d > now) {
const diffMs = d - now;
return { name, time: ts, diffMs, date: d };
}
}
const ts = (timings.Fajr || '05:00').split(' ')[0];
const [h, m] = ts.split(':').map(Number);
const d = new Date();
d.setDate(d.getDate() + 1);
d.setHours(h, m, 0, 0);
return { name: 'Fajr', time: ts, diffMs: d - now, date: d, nextDay: true };
}
function formatCountdown(ms) {
if (ms <= 0) return '00:00:00';
const s = Math.floor(ms / 1000);
const h = String(Math.floor(s / 3600)).padStart(2, '0');
const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
const sec = String(s % 60).padStart(2, '0');
return `${h}:${m}:${sec}`;
}
function formatTime12h(time24) {
if (!time24 || !time24.includes(':')) return '--:--';
let [h, m] = time24.split(':').map(Number);
const ampm = h >= 12 ? 'PM' : 'AM';
h = h % 12 || 12;
return `${h}:${String(m).padStart(2, '0')} ${ampm}`;
}
function getGreetingByHour() {
const h = new Date().getHours();
if (h >= 5 && h < 12) return t('greetingMorning');
if (h >= 12 && h < 18) return t('greetingAfternoon');
if (h >= 18 && h < 22) return t('greetingEvening');
return t('greetingNight');
}
function getPrayerEmoji(name) {
const map = {
Fajr: '🌅',
Sunrise: '☀️',
Dhuhr: '🌞',
Asr: '🌤️',
Maghrib: '🌇',
Isha: '🌙',
};
return map[name] || '🕌';
}


/* ==== js/qibla.js ==== */
const Qibla = {
calculateBearing(lat, lng) {
const toRad = d => d * Math.PI / 180;
const toDeg = r => r * 180 / Math.PI;
const lat1 = toRad(lat);
const lat2 = toRad(CONFIG.KAABA.lat);
const dLon = toRad(CONFIG.KAABA.lng - lng);
const y = Math.sin(dLon) * Math.cos(lat2);
const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
let bearing = toDeg(Math.atan2(y, x));
return (bearing + 360) % 360;
},
distance(lat, lng) {
const toRad = d => d * Math.PI / 180;
const R = 6371;
const lat1 = toRad(lat);
const lat2 = toRad(CONFIG.KAABA.lat);
const dLat = toRad(CONFIG.KAABA.lat - lat);
const dLon = toRad(CONFIG.KAABA.lng - lng);
const a = Math.sin(dLat / 2) ** 2 +
Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
},
arrowAngle(qiblaBearing, deviceHeading) {
return ((qiblaBearing - deviceHeading) % 360 + 360) % 360;
},
isAligned(arrowAngle, tolerance = 5) {
return arrowAngle <= tolerance || arrowAngle >= 360 - tolerance;
},
};


/* ==== js/duas.js ==== */
const DAILY_DUAS = [
{
id: 'morning_1',
title: "Du'a de la mañana",
arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
transliteration: 'Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namutu, wa ilayka an-nushur',
translation: 'Oh Allah, contigo amanecemos y contigo anochecemos, contigo vivimos y contigo morimos, y a Ti es el retorno.',
source: 'At-Tirmidhi',
},
{
id: 'guidance_1',
title: 'Para pedir guía',
arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
transliteration: 'Ihdina as-sirat al-mustaqim',
translation: 'Guíanos por el camino recto.',
source: 'Al-Fatihah 1:6',
},
{
id: 'forgiveness_1',
title: 'Para pedir perdón',
arabic: 'رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
transliteration: 'Rabbana zalamna anfusana wa in lam taghfir lana wa tarhamna lanakunanna min al-khasirin',
translation: 'Señor nuestro, hemos sido injustos con nosotros mismos. Si no nos perdonas y Te apiadas de nosotros, seremos de los perdedores.',
source: "Al-A'raf 7:23",
},
{
id: 'knowledge_1',
title: 'Para pedir conocimiento útil',
arabic: 'رَبِّ زِدْنِي عِلْمًا',
transliteration: "Rabbi zidni 'ilman",
translation: 'Señor mío, auméntame en conocimiento.',
source: 'Taha 20:114',
},
{
id: 'parents_1',
title: 'Por los padres',
arabic: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
transliteration: 'Rabbi-rhamhuma kama rabbayani saghira',
translation: 'Señor mío, ten misericordia de ellos como ellos la tuvieron de mí cuando era pequeño.',
source: 'Al-Isra 17:24',
},
{
id: 'protection_1',
title: 'Protección al salir de casa',
arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
transliteration: "Bismillah, tawakkaltu 'ala Allah, wa la hawla wa la quwwata illa billah",
translation: 'En el nombre de Allah, en Él confío. No hay poder ni fuerza sino con Allah.',
source: 'Abu Dawud',
},
{
id: 'anxiety_1',
title: 'Para alivio de la ansiedad',
arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
transliteration: "Hasbuna Allah wa ni'ma al-wakil",
translation: 'Allah nos basta, ¡qué excelente Protector!',
source: 'Al-Imran 3:173',
},
];
function getDuaOfTheDay() {
const today = new Date();
const day = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
return DAILY_DUAS[day % DAILY_DUAS.length];
}


/* ==== js/hijri.js ==== */
const ISLAMIC_HOLIDAYS = [
{ month: 1,  day: 1,  name_es: 'Año Nuevo Islámico',         name_ar: 'رأس السنة الهجرية',       name_en: 'Islamic New Year' },
{ month: 1,  day: 10, name_es: 'Día de Ashura',              name_ar: 'يوم عاشوراء',              name_en: 'Day of Ashura' },
{ month: 3,  day: 12, name_es: 'Mawlid an-Nabi ﷺ',            name_ar: 'المولد النبوي الشريف',     name_en: 'Mawlid an-Nabi ﷺ' },
{ month: 7,  day: 27, name_es: 'Isra y Miʿraj',              name_ar: 'الإسراء والمعراج',         name_en: 'Isra & Miʿraj' },
{ month: 8,  day: 15, name_es: 'Laylat al-Baraʾah',          name_ar: 'ليلة البراءة',             name_en: 'Laylat al-Baraʾah' },
{ month: 9,  day: 1,  name_es: 'Inicio de Ramadán',          name_ar: 'أول رمضان المبارك',        name_en: 'Start of Ramadan' },
{ month: 9,  day: 27, name_es: 'Laylat al-Qadr (probable)',  name_ar: 'ليلة القدر (المرجحة)',     name_en: 'Laylat al-Qadr (likely)' },
{ month: 10, day: 1,  name_es: 'Eid al-Fitr',                name_ar: 'عيد الفطر',                name_en: 'Eid al-Fitr' },
{ month: 12, day: 9,  name_es: 'Día de Arafa',               name_ar: 'يوم عرفة',                 name_en: 'Day of Arafah' },
{ month: 12, day: 10, name_es: 'Eid al-Adha',                name_ar: 'عيد الأضحى',               name_en: 'Eid al-Adha' },
];
const WHITE_DAYS = [13, 14, 15];
const FASTING_WEEKDAYS = [1, 4];
const WEEKDAY_NAMES = {
es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
ar: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};
function getWeekdayName(dayOfWeek, lang) {
const l = (lang && ['es','ar','en'].includes(lang)) ? lang : 'es';
return (WEEKDAY_NAMES[l] || WEEKDAY_NAMES.es)[dayOfWeek] || '';
}
function getHoliday(hijriMonth, hijriDay) {
return ISLAMIC_HOLIDAYS.find(h => h.month === hijriMonth && h.day === hijriDay);
}
function getHolidayName(hijriMonth, hijriDay, lang) {
const h = getHoliday(hijriMonth, hijriDay);
if (!h) return null;
const l = (lang && ['es','ar','en'].includes(lang)) ? lang : 'es';
return h[`name_${l}`] || h.name_es;
}
function isFastingDay(hijriDay, dayOfWeek) {
if (FASTING_WEEKDAYS.includes(dayOfWeek)) return 'weekday';
if (WHITE_DAYS.includes(hijriDay)) return 'white';
return false;
}
const VIRTUES = {
monday: {
es: { title: 'Lunes — Día recomendado para ayunar', verse: 'El Profeta ﷺ dijo: «Las obras son presentadas los lunes y jueves, y me gusta que mis obras sean presentadas mientras estoy ayunando».', source: 'Sunan at-Tirmidhi 747 (hasan)' },
ar: { title: 'الاثنين — يوم مستحب للصيام',           verse: 'قال النبي ﷺ: «تُعرض الأعمال يوم الاثنين والخميس، فأحبّ أن يُعرض عملي وأنا صائم».', source: 'سنن الترمذي ٧٤٧ (حسن)' },
en: { title: 'Monday — Recommended day of fasting',   verse: 'The Prophet ﷺ said: "Deeds are presented on Mondays and Thursdays, so I love that my deeds be presented while I am fasting."', source: 'Sunan at-Tirmidhi 747 (hasan)' },
},
thursday: {
es: { title: 'Jueves — Día recomendado para ayunar', verse: 'Las obras son presentadas ante Allah los lunes y jueves; el Profeta ﷺ ayunaba estos días.', source: 'Sunan at-Tirmidhi 747' },
ar: { title: 'الخميس — يوم مستحب للصيام',            verse: 'تُعرض الأعمال على الله يوم الاثنين والخميس، وكان النبي ﷺ يصوم هذين اليومين.', source: 'سنن الترمذي ٧٤٧' },
en: { title: 'Thursday — Recommended day of fasting', verse: 'Deeds are presented to Allah on Mondays and Thursdays; the Prophet ﷺ used to fast on these days.', source: 'Sunan at-Tirmidhi 747' },
},
friday: {
es: { title: 'Viernes — El mejor día de la semana',   verse: '«El mejor día en que sale el sol es el viernes: en él fue creado Adán, en él entró al Paraíso y en él fue expulsado».', source: 'Sahih Muslim 854' },
ar: { title: 'الجمعة — سيّد أيام الأسبوع',           verse: 'قال ﷺ: «خير يوم طلعت عليه الشمس يوم الجمعة، فيه خُلق آدم، وفيه أُدخل الجنة، وفيه أُخرج منها».', source: 'صحيح مسلم ٨٥٤' },
en: { title: 'Friday — The best day of the week',     verse: '"The best day the sun rises upon is Friday: on it Adam was created, on it he entered Paradise, and on it he was expelled."', source: 'Sahih Muslim 854' },
},
whiteDay: {
es: { title: 'Día blanco — Ayuno recomendado',        verse: 'El Profeta ﷺ ordenó ayunar los días blancos: el 13, 14 y 15 de cada mes lunar.', source: 'Sunan an-Nasaʾi 2422 (sahih)' },
ar: { title: 'الأيام البيض — صيامها مستحب',          verse: 'كان النبي ﷺ يأمر بصيام الأيام البيض: الثالث عشر والرابع عشر والخامس عشر من كل شهر.', source: 'سنن النسائي ٢٤٢٢ (صحيح)' },
en: { title: 'White Day — Recommended fast',          verse: 'The Prophet ﷺ ordered fasting the white days: the 13th, 14th and 15th of every lunar month.', source: 'Sunan an-Nasaʾi 2422 (sahih)' },
},
ramadan: {
es: { title: 'Ramadán — mes bendecido',               verse: '«¡Creyentes! Se os ha prescrito el ayuno, al igual que se prescribió a los que os precedieron; quizás así seáis piadosos». (Q 2:183)', source: 'Al-Baqarah 2:183' },
ar: { title: 'رمضان — الشهر المبارك',                 verse: '{يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِنْ قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ}', source: 'البقرة ١٨٣' },
en: { title: 'Ramadan — the blessed month',           verse: '"O you who believe! Fasting is prescribed for you as it was prescribed for those before you, that you may attain piety." (Q 2:183)', source: 'Al-Baqarah 2:183' },
},
default: {
es: { title: 'Día bendecido',                          verse: '«Quien recuerda a su Señor y quien no lo recuerda son como el vivo y el muerto».', source: 'Sahih al-Bukhari 6407' },
ar: { title: 'يوم مبارك',                              verse: 'قال ﷺ: «مثل الذي يذكر ربه والذي لا يذكر ربه مثل الحي والميت».', source: 'صحيح البخاري ٦٤٠٧' },
en: { title: 'A blessed day',                          verse: '"The example of one who remembers his Lord and one who does not is like the living and the dead."', source: 'Sahih al-Bukhari 6407' },
},
};
function _pickLang(lang) {
return ['es','ar','en'].includes(lang) ? lang : 'es';
}
function getDailyVirtue(hijriMonth, hijriDay, dayOfWeek, lang) {
const l = _pickLang(lang);
const holidayName = getHolidayName(hijriMonth, hijriDay, l);
if (holidayName) {
const blessed = {
es: 'Día bendecido. Aumenta tus oraciones, du\'as y caridad hoy.',
ar: 'يومٌ مبارك. أكثر من الصلاة والدعاء والصدقة اليوم.',
en: 'A blessed day. Increase your prayers, du\'as and charity today.',
};
return { title: holidayName, verse: blessed[l], source: 'Sunnah' };
}
if (dayOfWeek === 1) return VIRTUES.monday[l];
if (dayOfWeek === 4) return VIRTUES.thursday[l];
if (dayOfWeek === 5) return VIRTUES.friday[l];
if (hijriMonth === 9) {
const v = VIRTUES.ramadan[l];
const dayLabel = { es: 'Día', ar: 'اليوم', en: 'Day' }[l];
return { ...v, title: `${v.title} — ${dayLabel} ${hijriDay}` };
}
if (WHITE_DAYS.includes(hijriDay)) return VIRTUES.whiteDay[l];
return VIRTUES.default[l];
}


/* ==== js/quran-helpers.js ==== */
const QuranHelpers = {
removeTashkeel(text) {
if (!text) return '';
return text
.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
.replace(/[\u0622\u0623\u0625]/g, '\u0627') // آ أ إ → ا
.replace(/\u0671/g, '\u0627') // ٱ → ا
.replace(/\u0649/g, '\u064A') // ى → ي
.replace(/\u0629/g, '\u0647') // ة → ه (for search only)
.trim();
},
normalizeForSearch(text) {
return this.removeTashkeel(text || '').toLowerCase().replace(/\s+/g, ' ').trim();
},
surahMatches(surah, query) {
if (!query) return true;
const q = this.normalizeForSearch(query);
if (!q) return true;
if (String(surah.number).startsWith(q)) return true;
if (surah.englishName?.toLowerCase().includes(q.toLowerCase())) return true;
if (surah.englishNameTranslation?.toLowerCase().includes(q.toLowerCase())) return true;
const arabicNormalized = this.normalizeForSearch(surah.name);
if (arabicNormalized.includes(q)) return true;
return false;
},
stripBismillahFromFirstAyah(text) {
if (!text) return text;
const patterns = [
/^بِسْمِ\s*ٱللَّهِ\s*ٱلرَّحْمَـٰنِ\s*ٱلرَّحِيمِ\s*/,
/^بِسْمِ\s*ٱللَّهِ\s*ٱلرَّحْمَٰنِ\s*ٱلرَّحِيمِ\s*/,
/^بِسْمِ\s*اللَّهِ\s*الرَّحْمَٰنِ\s*الرَّحِيمِ\s*/,
/^بِسْمِ\s*اللَّهِ\s*الرَّحْمَنِ\s*الرَّحِيمِ\s*/,
/^بسم\s*الله\s*الرحمن\s*الرحيم\s*/,
];
let result = text;
for (const pat of patterns) {
if (pat.test(result)) {
result = result.replace(pat, '');
break;
}
}
return result.trim();
},
shouldShowBismillah(surahNumber) {
return surahNumber !== 1 && surahNumber !== 9;
},
};


/* ==== js/tafsir.js ==== */
const TafsirService = {
TAFSIRS: {
'ar.muyassar': {
name_es: 'Al-Muyassar', name_en: 'Al-Muyassar', name_ar: 'التفسير الميسر',
desc_es: 'Conciso y moderno (recomendado)',
desc_en: 'Concise and modern (recommended)',
desc_ar: 'مختصر وحديث (موصى به)',
},
'ar.jalalayn': {
name_es: 'Al-Jalalayn', name_en: 'Al-Jalalayn', name_ar: 'تفسير الجلالين',
desc_es: 'Clásico, breve', desc_en: 'Classic, brief', desc_ar: 'كلاسيكي مختصر',
},
'ar.qurtubi': {
name_es: 'Al-Qurtubi', name_en: 'Al-Qurtubi', name_ar: 'تفسير القرطبي',
desc_es: 'Clásico, detallado', desc_en: 'Classic, detailed', desc_ar: 'كلاسيكي مفصل',
},
'ar.baghawi': {
name_es: 'Al-Baghawi', name_en: 'Al-Baghawi', name_ar: 'تفسير البغوي',
desc_es: 'Clásico tradicional', desc_en: 'Classic traditional', desc_ar: 'كلاسيكي تراثي',
},
},
DEFAULT_TAFSIR: 'ar.muyassar',
async getTafsir(surahNum, ayahNum, tafsirId = null, targetLang = 'es') {
const tafsir = tafsirId || this.DEFAULT_TAFSIR;
const cacheKey = `tafsir_v2_${surahNum}_${ayahNum}_${tafsir}_${targetLang}`;
const cached = Storage.get(cacheKey);
if (cached) return cached;
const url = `${CONFIG.API.QURAN}/ayah/${surahNum}:${ayahNum}/${tafsir}`;
const res = await fetch(url);
if (!res.ok) throw new Error('Tafsir not found');
const json = await res.json();
const arabicText = json.data?.text || '';
if (!arabicText) throw new Error('Empty tafsir');
let translatedText = '';
let translationError = null;
if (targetLang !== 'ar') {
try {
translatedText = await this.translateLongText(arabicText, 'ar', targetLang);
} catch (e) {
translationError = e;
console.warn('Chunked translation failed, trying single-shot fallbacks', e);
try {
if (arabicText.length < 4500) {
translatedText = await this._lingvaTranslate(arabicText, 'ar', targetLang);
}
} catch (e2) {
try {
translatedText = await this._libreTranslate(arabicText, 'ar', targetLang);
} catch (e3) {
translatedText = '';
}
}
}
}
const tafsirInfo = this.TAFSIRS[tafsir] || {};
const result = {
arabic: arabicText,
translated: translatedText,
source: tafsirInfo[`name_${targetLang === 'ar' ? 'ar' : (targetLang === 'en' ? 'en' : 'es')}`] || tafsirInfo.name_es || tafsir,
sourceAr: tafsirInfo.name_ar || '',
targetLang,
};
if (targetLang === 'ar' || translatedText) {
Storage.set(cacheKey, result, 30 * 24 * 60 * 60 * 1000);
}
return result;
},
async translateLongText(text, sourceLang = 'ar', targetLang = 'es') {
if (!text || sourceLang === targetLang) return text;
const MAX_CHARS = 450;
if (text.length <= MAX_CHARS) {
return await this._myMemoryTranslate(text, sourceLang, targetLang);
}
const chunks = this._splitIntoChunks(text, MAX_CHARS);
const translations = [];
let failedCount = 0;
for (const chunk of chunks) {
let translated = null;
try {
translated = await this._myMemoryTranslate(chunk, sourceLang, targetLang);
} catch (e1) {
try {
translated = await this._lingvaTranslate(chunk, sourceLang, targetLang);
} catch (e2) {
try {
translated = await this._libreTranslate(chunk, sourceLang, targetLang);
} catch (e3) {
failedCount++;
translated = null;
}
}
}
translations.push(translated || `«…»`);
await new Promise(r => setTimeout(r, 250));
}
const result = translations.join(' ').replace(/\s+/g, ' ').trim();
if (failedCount > chunks.length / 2) {
throw new Error('Most translation chunks failed');
}
return result;
},
async _lingvaTranslate(text, source, target) {
const url = `https://lingva.ml/api/v1/${source}/${target}/${encodeURIComponent(text)}`;
const ctrl = new AbortController();
const timer = setTimeout(() => ctrl.abort(), 12000);
try {
const res = await fetch(url, { signal: ctrl.signal });
clearTimeout(timer);
if (!res.ok) throw new Error('Lingva HTTP ' + res.status);
const json = await res.json();
const out = json.translation || '';
if (!out) throw new Error('Empty Lingva response');
return out;
} finally {
clearTimeout(timer);
}
},
_splitIntoChunks(text, maxLen) {
const sentences = text.split(/(?<=[\.\!\?؟\،])\s+/);
const chunks = [];
let current = '';
for (const s of sentences) {
if ((current + ' ' + s).length > maxLen && current) {
chunks.push(current.trim());
current = s;
} else {
current = current ? current + ' ' + s : s;
}
}
if (current.trim()) chunks.push(current.trim());
const finalChunks = [];
for (const c of chunks) {
if (c.length <= maxLen) {
finalChunks.push(c);
} else {
const words = c.split(/\s+/);
let buf = '';
for (const w of words) {
if ((buf + ' ' + w).length > maxLen && buf) {
finalChunks.push(buf.trim());
buf = w;
} else {
buf = buf ? buf + ' ' + w : w;
}
}
if (buf.trim()) finalChunks.push(buf.trim());
}
}
return finalChunks;
},
async _myMemoryTranslate(text, source, target) {
const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}&de=app@quba.local`;
const ctrl = new AbortController();
const timer = setTimeout(() => ctrl.abort(), 12000);
try {
const res = await fetch(url, { signal: ctrl.signal });
clearTimeout(timer);
if (!res.ok) throw new Error('MyMemory HTTP ' + res.status);
const json = await res.json();
if (json.responseStatus !== 200 && json.responseStatus !== '200') {
throw new Error('MyMemory error');
}
let translated = json.responseData?.translatedText || '';
if (translated.toUpperCase().includes('MYMEMORY WARNING')) {
throw new Error('Quota exceeded');
}
return translated;
} finally {
clearTimeout(timer);
}
},
async _libreTranslate(text, source, target) {
const url = 'https://translate.argosopentech.com/translate';
const res = await fetch(url, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ q: text, source, target, format: 'text' }),
});
if (!res.ok) throw new Error('LibreTranslate failed');
const json = await res.json();
return json.translatedText || '';
},
getAvailableTafsirs(locale = 'es') {
return Object.entries(this.TAFSIRS).map(([id, info]) => ({
id,
name: info[`name_${locale}`] || info.name_es,
desc: info[`desc_${locale}`] || info.desc_es,
}));
},
};


/* ==== js/adhan.js ==== */
const AdhanService = {
VOICES: [
{ id: 'makkah',   name: 'Makkah — Ali Ahmad Mulla',      country: 'Arabia Saudí', flag: '🕋', url: 'https://cdn.islamic.network/adhans/128/adhan1.mp3' },
{ id: 'madinah',  name: 'Madinah — Adhan Madinah',       country: 'Arabia Saudí', flag: '🕌', url: 'https://cdn.islamic.network/adhans/128/adhan2.mp3' },
{ id: 'egypt',    name: 'Egipto — Adhan Egypt',          country: 'Egipto', flag: '🇪🇬', url: 'https://cdn.islamic.network/adhans/128/adhan3.mp3' },
{ id: 'turkey',   name: 'Turquía — Adhan Turkish',       country: 'Turquía', flag: '🇹🇷', url: 'https://cdn.islamic.network/adhans/128/adhan4.mp3' },
{ id: 'aqsa',     name: 'Al-Aqsa — Adhan Al-Aqsa',       country: 'Palestina', flag: '🇵🇸', url: 'https://cdn.islamic.network/adhans/128/adhan5.mp3' },
{ id: 'algeria',  name: 'Argelia — Adhan Algerian',      country: 'Argelia', flag: '🇩🇿', url: 'https://cdn.islamic.network/adhans/128/adhan6.mp3' },
{ id: 'fajr_makkah', name: 'Fajr — Makkah',              country: 'Arabia Saudí', flag: '🌅', url: 'https://cdn.islamic.network/adhans/128/adhan-fajr1.mp3' },
{ id: 'fajr_madinah', name: 'Fajr — Madinah',            country: 'Arabia Saudí', flag: '🌅', url: 'https://cdn.islamic.network/adhans/128/adhan-fajr2.mp3' },
],
audio: null,
previewAudio: null,
getSettings() {
return AppState.settings.adhan || {
voice1: 'makkah',
voice2: 'madinah',
volume: 0.8,
muted: false,
};
},
preview(voiceId) {
this.stopPreview();
const voice = this.VOICES.find(v => v.id === voiceId);
if (!voice) return;
const settings = this.getSettings();
this.previewAudio = new Audio(voice.url);
this.previewAudio.volume = settings.muted ? 0 : settings.volume;
this.previewAudio.play().catch(err => {
console.warn('Adhan preview failed:', err);
if (typeof showToast === 'function') showToast('⚠️ ' + (t('adhanPlayError') || 'No se pudo reproducir'), 3000);
});
if (typeof showToast === 'function') showToast('🔊 ' + voice.name, 1500);
},
stopPreview() {
if (this.previewAudio) {
try { this.previewAudio.pause(); this.previewAudio.currentTime = 0; } catch (e) {}
this.previewAudio = null;
}
},
setVolume(v) {
if (this.previewAudio) this.previewAudio.volume = v;
if (this.audio) this.audio.volume = v;
},
playFullAdhan(onEnded) {
const settings = this.getSettings();
if (settings.muted) { if (onEnded) onEnded(); return; }
const voice1 = this.VOICES.find(v => v.id === settings.voice1) || this.VOICES[0];
const voice2 = this.VOICES.find(v => v.id === settings.voice2) || this.VOICES[1];
this.stopPreview();
this.audio = new Audio(voice1.url);
this.audio.volume = settings.volume;
this.audio.play().catch(err => console.warn('Adhan play failed:', err));
this.audio.onended = () => {
this.audio = new Audio(voice2.url);
this.audio.volume = settings.volume;
this.audio.play().catch(() => {});
this.audio.onended = () => { if (onEnded) onEnded(); };
};
},
stop() {
this.stopPreview();
if (this.audio) {
try { this.audio.pause(); this.audio.currentTime = 0; } catch (e) {}
this.audio = null;
}
},
};


/* ==== js/notifications.js ==== */
const PrayerNotifications = {
timers: [],
enabledKey: 'prayer_notif_enabled',
isEnabled() {
return Storage.get(this.enabledKey) === true && Notification.permission === 'granted';
},
async requestPermission() {
if (!('Notification' in window)) {
showToast(t('notifNotSupported') || 'Notificaciones no soportadas');
return false;
}
if (Notification.permission === 'granted') return true;
if (Notification.permission === 'denied') {
showToast(t('notifDenied') || 'Permiso denegado. Actívalo en ajustes del navegador.');
return false;
}
const result = await Notification.requestPermission();
return result === 'granted';
},
async enable() {
const ok = await this.requestPermission();
if (!ok) return false;
Storage.set(this.enabledKey, true);
showToast(t('notifEnabled') || '✅ Notificaciones activadas');
return true;
},
disable() {
Storage.set(this.enabledKey, false);
this.clearAll();
showToast(t('notifDisabled') || 'Notificaciones desactivadas');
},
clearAll() {
this.timers.forEach(id => clearTimeout(id));
this.timers = [];
},
scheduleDay(timings, locale = 'es') {
if (!this.isEnabled() || !timings) return;
this.clearAll();
const prayerNames = {
es: { Fajr: 'Fajr', Dhuhr: 'Duhr', Asr: 'Asr', Maghrib: 'Maghrib', Isha: 'Isha' },
en: { Fajr: 'Fajr', Dhuhr: 'Dhuhr', Asr: 'Asr', Maghrib: 'Maghrib', Isha: 'Isha' },
ar: { Fajr: 'الفجر', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء' },
}[locale] || {};
const messages = {
es: 'Es hora de la oración de',
en: 'It is time for',
ar: 'حان وقت صلاة',
};
const body = messages[locale] || messages.es;
['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].forEach(prayer => {
const timeStr = timings[prayer];
if (!timeStr) return;
const clean = timeStr.split(' ')[0]; // "05:30 (+03)" → "05:30"
const [h, m] = clean.split(':').map(Number);
if (isNaN(h) || isNaN(m)) return;
const target = new Date();
target.setHours(h, m, 0, 0);
const delay = target.getTime() - Date.now();
if (delay < 0 || delay > 24 * 60 * 60 * 1000) return; // ya pasó o >24h
const prayerName = prayerNames[prayer] || prayer;
const timerId = setTimeout(() => {
this.notify(prayerName, `${body} ${prayerName}`, prayer);
}, delay);
this.timers.push(timerId);
});
console.log(`🔔 ${this.timers.length} prayer notifications scheduled`);
},
async notify(title, body, tag) {
if ('vibrate' in navigator) navigator.vibrate([300, 100, 300, 100, 500]);
if (typeof AdhanService !== 'undefined' && AdhanService.playFullAdhan) {
try { AdhanService.playFullAdhan(); } catch(e) { console.warn('Adhan play failed:', e); }
}
if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
navigator.serviceWorker.controller.postMessage({
type: 'prayerNotification',
payload: { title: '🕌 ' + title, body, tag: 'prayer-' + tag },
});
} else if ('Notification' in window && Notification.permission === 'granted') {
new Notification('🕌 ' + title, { body, icon: 'assets/icon.png' });
}
},
};


/* ==== js/wake-lock.js ==== */
const WakeLockService = {
_lock: null,
_refCount: 0,
async acquire(reason = 'recitation') {
if (!('wakeLock' in navigator)) return false;
this._refCount++;
if (this._lock) return true;
try {
this._lock = await navigator.wakeLock.request('screen');
this._lock.addEventListener('release', () => { this._lock = null; });
console.log('🔦 WakeLock acquired for:', reason);
document.addEventListener('visibilitychange', this._onVisibilityChange);
return true;
} catch (e) {
console.warn('WakeLock failed:', e.message);
this._refCount = Math.max(0, this._refCount - 1);
return false;
}
},
release() {
this._refCount = Math.max(0, this._refCount - 1);
if (this._refCount > 0) return;
if (this._lock) {
try { this._lock.release(); } catch(_) {}
this._lock = null;
}
document.removeEventListener('visibilitychange', this._onVisibilityChange);
},
_onVisibilityChange: async function() {
if (document.visibilityState === 'visible' && WakeLockService._refCount > 0 && !WakeLockService._lock) {
try {
WakeLockService._lock = await navigator.wakeLock.request('screen');
} catch(_) {}
}
},
};


/* ==== js/pwa-install.js ==== */
const PWAInstall = {
_deferred: null,
_dismissedKey: 'pwa_dismissed_at',
_cooldownDays: 7,
init() {
window.addEventListener('beforeinstallprompt', (e) => {
e.preventDefault();
this._deferred = e;
this._maybeShowBanner();
});
window.addEventListener('appinstalled', () => {
this._deferred = null;
this._hideBanner();
if (typeof showToast === 'function') {
showToast(t('pwaInstalled') || '✅ App instalada. Ábrela desde tu inicio.');
}
});
if (window.matchMedia('(display-mode: standalone)').matches ||
navigator.standalone === true) {
return;
}
},
_dismissed() {
const at = parseInt(localStorage.getItem(this._dismissedKey) || '0', 10);
if (!at) return false;
const days = (Date.now() - at) / (1000 * 60 * 60 * 24);
return days < this._cooldownDays;
},
_maybeShowBanner() {
if (this._dismissed()) return;
setTimeout(() => this._showBanner(), 5000);
},
_showBanner() {
if (!this._deferred || document.getElementById('pwa-install-banner')) return;
const lang = (window.currentLocale) || 'es';
const messages = {
es: { title: 'Instalar Quba', desc: 'Ábrela como app desde tu inicio.', install: 'Instalar', later: 'Más tarde' },
ar: { title: 'ثبّت قُبَّة', desc: 'افتحها كتطبيق من شاشتك الرئيسية.', install: 'تثبيت', later: 'لاحقاً' },
en: { title: 'Install Quba', desc: 'Open it as an app from your home screen.', install: 'Install', later: 'Later' },
};
const m = messages[lang] || messages.es;
const banner = document.createElement('div');
banner.id = 'pwa-install-banner';
banner.className = 'pwa-install-banner';
banner.innerHTML = `
<div class="pwa-install-icon">🕌</div>
<div class="pwa-install-info">
<div class="pwa-install-title">${escapeHtml(m.title)}</div>
<div class="pwa-install-desc">${escapeHtml(m.desc)}</div>
</div>
<button class="pwa-install-later" data-action="pwa-later">${escapeHtml(m.later)}</button>
<button class="pwa-install-cta" data-action="pwa-install">${escapeHtml(m.install)}</button>
`;
document.body.appendChild(banner);
requestAnimationFrame(() => banner.classList.add('show'));
banner.addEventListener('click', async (e) => {
const action = e.target.closest('[data-action]')?.dataset.action;
if (action === 'pwa-later') {
localStorage.setItem(this._dismissedKey, String(Date.now()));
this._hideBanner();
} else if (action === 'pwa-install') {
if (this._deferred) {
this._deferred.prompt();
const choice = await this._deferred.userChoice;
if (choice.outcome === 'accepted') {
console.log('User accepted PWA install');
} else {
localStorage.setItem(this._dismissedKey, String(Date.now()));
}
this._deferred = null;
}
this._hideBanner();
}
});
},
_hideBanner() {
const b = document.getElementById('pwa-install-banner');
if (b) {
b.classList.remove('show');
setTimeout(() => b.remove(), 300);
}
},
};


/* ==== js/event-delegation.js ==== */
const EventBus = {
_handlers: new Map(),
on(action, handler) {
this._handlers.set(action, handler);
},
init() {
document.addEventListener('click', (e) => {
const el = e.target.closest('[data-action]');
if (!el) return;
const action = el.dataset.action;
const handler = this._handlers.get(action);
if (handler) {
handler(el, e);
}
});
document.addEventListener('keydown', (e) => {
if (e.key !== 'Enter' && e.key !== ' ') return;
const el = e.target.closest('[data-action]');
if (!el) return;
const tag = el.tagName.toLowerCase();
if (tag === 'button' || tag === 'input' || tag === 'a') return;
e.preventDefault();
const handler = this._handlers.get(el.dataset.action);
if (handler) handler(el, e);
});
},
};
document.addEventListener('DOMContentLoaded', () => {
EventBus.init();
EventBus.on('navigate', (el) => {
const route = el.dataset.route;
if (route && typeof Router !== 'undefined') {
const params = {};
for (const k in el.dataset) {
if (k !== 'action' && k !== 'route') params[k] = el.dataset[k];
}
Router.go(route, params);
}
});
EventBus.on('back', () => {
if (typeof Router !== 'undefined') Router.back();
});
EventBus.on('toast', (el) => {
if (typeof showToast === 'function') showToast(el.dataset.message || '');
});
});


/* ==== js/mascot.js ==== */
const Mascot = {
POSES: ['idle', 'welcome', 'celebrate', 'encourage', 'thinking', 'shy', 'success', 'goodbye'],
render(pose = 'idle', size = 'medium', extraClass = '') {
if (!this.POSES.includes(pose)) pose = 'idle';
return `<picture>
<source srcset="assets/mascot/${pose}.webp" type="image/webp">
<img src="assets/mascot/${pose}.png" alt="Quba mascot ${pose}" class="mascot mascot-${size} ${extraClass}" loading="lazy">
</picture>`;
},
renderWithSpeech(pose, message, size = 'medium', side = 'right') {
return `
<div class="mascot-with-speech ${side === 'left' ? 'mascot-speech-left' : ''}">
${this.render(pose, size, 'mascot-pop-in')}
<div class="mascot-speech-bubble">${message}</div>
</div>
`;
},
swap(container, newPose, newMessage = null) {
const mascotImg = container.querySelector('.mascot');
if (mascotImg) {
mascotImg.style.transition = 'opacity 0.2s, transform 0.2s';
mascotImg.style.opacity = '0';
mascotImg.style.transform = 'scale(0.85)';
const source = mascotImg.parentElement?.querySelector('source');
setTimeout(() => {
if (source) source.srcset = `assets/mascot/${newPose}.webp`;
mascotImg.src = `assets/mascot/${newPose}.png`;
mascotImg.style.opacity = '1';
mascotImg.style.transform = 'scale(1)';
}, 200);
}
if (newMessage !== null) {
const bubble = container.querySelector('.mascot-speech-bubble');
if (bubble) bubble.innerHTML = newMessage;
}
},
showTip(message, pose = 'welcome', duration = 4500) {
const existing = document.querySelector('.mascot-floating-tip');
if (existing) existing.remove();
const tip = document.createElement('div');
tip.className = 'mascot-floating-tip';
tip.innerHTML = `
<button class="mascot-tip-close" onclick="this.parentElement.remove()">
<i class="fas fa-times"></i>
</button>
${this.render(pose, 'small', 'mascot-bounce')}
<div class="mascot-tip-text">${message}</div>
`;
document.body.appendChild(tip);
if (duration > 0) {
setTimeout(() => {
tip.classList.add('fade-out');
setTimeout(() => tip.remove(), 400);
}, duration);
}
},
celebrate(container, message = '¡Bien hecho!') {
container.innerHTML = `
<div class="celebration-overlay">
${this.renderWithSpeech('celebrate', message, 'large')}
<div class="confetti-container">
${Array(30).fill(0).map((_, i) => `<div class="confetti" style="--i:${i}; --c:${this.confettiColor(i)}; --d:${Math.random() * 0.5}s;"></div>`).join('')}
</div>
</div>
`;
},
confettiColor(i) {
const colors = ['#D4AF37', '#0F4C3A', '#1A6B52', '#FFD700', '#FF7043', '#5C6BC0'];
return colors[i % colors.length];
},
};


/* ==== js/gamification.js ==== */
const Gamification = {
XP_PER_CORRECT: 10,
XP_CORRECT_ANSWER: 10,        // alias for quiz.js compatibility
XP_PER_WRONG: 0,
XP_BONUS_STREAK: 5,           // bonus por cada respuesta correcta consecutiva
XP_BONUS_NO_MISTAKES: 50,     // bonus al terminar sin fallos
XP_PER_LESSON: 25,            // por completar lección de curso
XP_PER_TASBIH_100: 20,        // 100 conteos del tasbih
XP_PER_ADHKAR_SET: 30,        // por completar un set de adhkar
MAX_LIVES: 5,
LIFE_REGEN_MINUTES: 30,       // 1 vida cada 30 minutos
LEVELS: [
{ level: 1, xp: 0, name: 'Iniciado', icon: '🌱', color: '#4CAF50' },
{ level: 2, xp: 50, name: 'Buscador', icon: '🌿', color: '#66BB6A' },
{ level: 3, xp: 150, name: 'Estudiante', icon: '📚', color: '#8BC34A' },
{ level: 4, xp: 300, name: 'Aprendiz', icon: '🎓', color: '#9CCC65' },
{ level: 5, xp: 500, name: 'Conocedor', icon: '💡', color: '#FFA726' },
{ level: 6, xp: 750, name: 'Sabio', icon: '🌟', color: '#FFB74D' },
{ level: 7, xp: 1000, name: 'Maestro', icon: '👳', color: '#FF7043' },
{ level: 8, xp: 1500, name: 'Erudito', icon: '🕌', color: '#D4AF37' },
{ level: 9, xp: 2500, name: 'Hakim', icon: '⭐', color: '#FFD700' },
{ level: 10, xp: 5000, name: 'Imam', icon: '🌙', color: '#9C27B0' },
],
ACHIEVEMENTS: [
{ id: 'first_quiz', name: 'Primer paso', desc: 'Completa tu primer quiz', icon: '🎯' },
{ id: 'perfect_quiz', name: 'Perfección', desc: 'Quiz sin errores', icon: '💯' },
{ id: 'streak_3', name: 'Racha de 3', desc: '3 días consecutivos activos', icon: '🔥' },
{ id: 'streak_7', name: 'Semana espiritual', desc: '7 días consecutivos', icon: '🔥🔥' },
{ id: 'streak_30', name: 'Mes constante', desc: '30 días consecutivos', icon: '🔥🔥🔥' },
{ id: 'quran_master', name: 'Maestro del Corán', desc: '50 respuestas correctas en quiz de Corán', icon: '📖' },
{ id: 'sira_lover', name: 'Conocedor de la Sira', desc: '50 correctas en Sira', icon: '🕋' },
{ id: 'hadith_scholar', name: 'Estudioso del Hadiz', desc: '50 correctas en Hadiz', icon: '📜' },
{ id: 'fiqh_jurist', name: 'Jurista', desc: '50 correctas en Fiqh', icon: '⚖️' },
{ id: 'history_buff', name: 'Historiador', desc: '50 correctas en Historia', icon: '🌙' },
{ id: 'prophet_friend', name: 'Amigo de los Profetas', desc: '50 correctas en Profetas', icon: '👨' },
{ id: 'tasbih_1000', name: 'Mil dhikrs', desc: '1000 conteos en el tasbih', icon: '📿' },
{ id: 'all_adhkar', name: 'Devoto del dhikr', desc: 'Completa los 4 sets de adhkar', icon: '🤲' },
{ id: 'first_course', name: 'Aprendiz curioso', desc: 'Completa tu primer curso', icon: '🎓' },
{ id: 'all_courses', name: 'Erudito completo', desc: 'Completa todos los cursos', icon: '👑' },
{ id: 'level_5', name: 'Conocedor', desc: 'Alcanza el nivel 5', icon: '🌟' },
{ id: 'level_10', name: 'Imam', desc: 'Alcanza el nivel 10', icon: '🕌' },
{ id: 'xp_1000', name: 'Mil XP', desc: 'Acumula 1000 XP', icon: '⚡' },
],
getState() {
return Storage.get('gamification') || {
xp: 0,
level: 1,
lives: this.MAX_LIVES,
lastLifeRegenTime: Date.now(),
streak: 0,
lastActiveDay: null,
achievements: [],
stats: {
quizzesCompleted: 0,
questionsAnswered: 0,
correctAnswers: 0,
coursesCompleted: [],
adhkarCompleted: [],
tasbihCount: 0,
categoryStats: {
quran: { correct: 0, total: 0 },
sira: { correct: 0, total: 0 },
hadith: { correct: 0, total: 0 },
fiqh: { correct: 0, total: 0 },
history: { correct: 0, total: 0 },
prophets: { correct: 0, total: 0 },
},
},
};
},
saveState(state) {
Storage.set('gamification', state);
},
addXP(amount) {
const state = this.getState();
const oldLevel = this.getLevelInfo(state.xp).level;
state.xp += amount;
const newLevel = this.getLevelInfo(state.xp).level;
this.saveState(state);
if (newLevel > oldLevel) {
this.onLevelUp(newLevel);
}
if (state.xp >= 1000 && !state.achievements.includes('xp_1000')) {
this.unlockAchievement('xp_1000');
}
if (newLevel >= 5 && !state.achievements.includes('level_5')) {
this.unlockAchievement('level_5');
}
if (newLevel >= 10 && !state.achievements.includes('level_10')) {
this.unlockAchievement('level_10');
}
return { newLevel, oldLevel, leveledUp: newLevel > oldLevel };
},
getLevelInfo(xp) {
let current = this.LEVELS[0];
let next = this.LEVELS[1];
for (let i = 0; i < this.LEVELS.length; i++) {
if (xp >= this.LEVELS[i].xp) {
current = this.LEVELS[i];
next = this.LEVELS[i + 1] || null;
}
}
const progress = next ? (xp - current.xp) / (next.xp - current.xp) : 1;
return {
...current,
next,
progress: Math.min(1, Math.max(0, progress)),
xpInLevel: xp - current.xp,
xpForNext: next ? next.xp - current.xp : 0,
};
},
onLevelUp(newLevel) {
const lvl = this.LEVELS[newLevel - 1];
showToast(`🎉 ¡Nivel ${newLevel}: ${lvl.name}! ${lvl.icon}`, 4000);
},
getLives() {
const state = this.getState();
const elapsedMs = Date.now() - state.lastLifeRegenTime;
const elapsedMin = Math.floor(elapsedMs / 60000);
if (elapsedMin >= this.LIFE_REGEN_MINUTES && state.lives < this.MAX_LIVES) {
const livesToAdd = Math.min(
Math.floor(elapsedMin / this.LIFE_REGEN_MINUTES),
this.MAX_LIVES - state.lives
);
state.lives += livesToAdd;
state.lastLifeRegenTime = Date.now();
this.saveState(state);
}
return state.lives;
},
loseLife() {
const state = this.getState();
return state.lives;
},
getMinutesToNextLife() {
const state = this.getState();
if (state.lives >= this.MAX_LIVES) return 0;
const elapsedMs = Date.now() - state.lastLifeRegenTime;
const elapsedMin = elapsedMs / 60000;
const remaining = this.LIFE_REGEN_MINUTES - (elapsedMin % this.LIFE_REGEN_MINUTES);
return Math.max(0, remaining);
},
getStats() {
const state = this.getState();
const levelInfo = this.getLevelInfo(state.xp);
return {
xp: state.xp,
level: levelInfo.level,
lives: this.getLives(),
streak: state.streak || 0,
achievements: state.achievements || [],
totalAnswered: state.stats?.totalAnswered || 0,
categoryStats: state.stats?.categoryStats || {},
};
},
getProgressToNextLevel(xp) {
const info = this.getLevelInfo(xp);
if (!info.next) return 100;
return Math.round(info.progress * 100);
},
timeUntilNextLife() {
const state = this.getState();
if (state.lives >= this.MAX_LIVES) return 0;
const elapsedMs = Date.now() - state.lastLifeRegenTime;
const remainingMs = (this.LIFE_REGEN_MINUTES * 60000) - elapsedMs;
return Math.max(0, remainingMs);
},
updateStreak() {
const state = this.getState();
const today = new Date().toDateString();
const yesterday = new Date(Date.now() - 86400000).toDateString();
if (state.lastActiveDay === today) {
return state.streak;
}
if (state.lastActiveDay === yesterday) {
state.streak++;
} else {
state.streak = 1;
}
state.lastActiveDay = today;
this.saveState(state);
if (state.streak >= 3 && !state.achievements.includes('streak_3')) {
this.unlockAchievement('streak_3');
}
if (state.streak >= 7 && !state.achievements.includes('streak_7')) {
this.unlockAchievement('streak_7');
}
if (state.streak >= 30 && !state.achievements.includes('streak_30')) {
this.unlockAchievement('streak_30');
}
return state.streak;
},
unlockAchievement(achievementId) {
const state = this.getState();
if (state.achievements.includes(achievementId)) return false;
state.achievements.push(achievementId);
this.saveState(state);
const ach = this.ACHIEVEMENTS.find(a => a.id === achievementId);
if (ach) {
showToast(`🏆 Logro: ${ach.icon} ${ach.name}`, 4500);
}
return true;
},
recordQuizAnswer(category, isCorrect) {
const state = this.getState();
state.stats.questionsAnswered++;
if (isCorrect) state.stats.correctAnswers++;
if (state.stats.categoryStats[category]) {
state.stats.categoryStats[category].total++;
if (isCorrect) state.stats.categoryStats[category].correct++;
}
this.saveState(state);
const catMap = {
quran: 'quran_master',
sira: 'sira_lover',
hadith: 'hadith_scholar',
fiqh: 'fiqh_jurist',
history: 'history_buff',
prophets: 'prophet_friend',
};
const achId = catMap[category];
if (achId && state.stats.categoryStats[category].correct >= 50 && !state.achievements.includes(achId)) {
this.unlockAchievement(achId);
}
},
recordQuizCompleted(perfectScore = false) {
const state = this.getState();
state.stats.quizzesCompleted++;
this.saveState(state);
if (state.stats.quizzesCompleted === 1) {
this.unlockAchievement('first_quiz');
}
if (perfectScore) {
this.unlockAchievement('perfect_quiz');
}
},
recordCourseCompleted(courseId) {
const state = this.getState();
if (!state.stats.coursesCompleted.includes(courseId)) {
state.stats.coursesCompleted.push(courseId);
this.saveState(state);
if (state.stats.coursesCompleted.length === 1) {
this.unlockAchievement('first_course');
}
if (state.stats.coursesCompleted.length >= 3) {
this.unlockAchievement('all_courses');
}
}
},
recordTasbihCount(count = 1) {
const state = this.getState();
state.stats.tasbihCount += count;
this.saveState(state);
if (state.stats.tasbihCount >= 1000) {
this.unlockAchievement('tasbih_1000');
}
},
recordAdhkarCompleted(setId) {
const state = this.getState();
if (!state.stats.adhkarCompleted.includes(setId)) {
state.stats.adhkarCompleted.push(setId);
this.saveState(state);
if (state.stats.adhkarCompleted.length >= 4) {
this.unlockAchievement('all_adhkar');
}
}
},
};
