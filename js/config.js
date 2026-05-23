// ⚙️ Configuración global
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
    { id: 'ar.alafasy', name: 'Mishary Alafasy', country: 'Kuwait' },
    { id: 'ar.abdurrahmaansudais', name: 'Abdurrahman As-Sudais', country: 'Arabia Saudí' },
    { id: 'ar.husary', name: 'Mahmoud Khalil Al-Husary', country: 'Egipto' },
    { id: 'ar.saadalghamdi', name: 'Saad Al-Ghamdi', country: 'Arabia Saudí' },
    { id: 'ar.minshawi', name: 'Mohamed Siddiq El-Minshawi', country: 'Egipto' },
    { id: 'ar.abdulbasitmurattal', name: 'Abdul Basit (Murattal)', country: 'Egipto' },
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
  },

  CACHE_TTL: 24 * 60 * 60 * 1000, // 24 horas
};

// Estado global de la app
const AppState = {
  location: null,
  timings: null,
  hijri: null,
  settings: {
    locale: 'es',
    theme: 'auto', // 'light' | 'dark' | 'auto'
    calculationMethod: 3,
    reciter: 'ar.alafasy',
    translation: 'es.cortes',
  },
};
