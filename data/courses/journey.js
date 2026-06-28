// 🗺️ Course: "Rihlat al-Muslim" (Muslim's Journey) — 4 stations, interactive
const COURSE_JOURNEY = {
  id: 'journey',
  icon: '🗺️',
  mascotPose: 'welcome',
  color: '#0F4C3A',
  ageGroup: 'all',
  durationMin: 25,
  difficulty: 'beginner',
  title: {
    es: 'Rihlat al-Muslim (Viaje del Musulmán)',
    ar: 'رحلة المسلم',
    en: "Muslim's Journey",
  },
  description: {
    es: 'Una aventura interactiva por 4 estaciones: Iman, Ibadah, Akhlaq y Mu\'amalat',
    ar: 'مغامرة تفاعلية عبر 4 محطات: الإيمان، العبادة، الأخلاق، والمعاملات',
    en: 'An interactive journey through 4 stations: Faith, Worship, Character, and Conduct',
  },
  stations: [
    {
      id: 'iman',
      icon: '⭐',
      title: { es: 'Estación del Iman', ar: 'محطة الإيمان', en: 'Station of Faith' },
      mascotIntro: { es: '¡Bienvenido! Empecemos por los 6 pilares de la fe.', ar: 'أهلاً بك! لنبدأ بأركان الإيمان الستة.', en: 'Welcome! Let\'s start with the 6 pillars of faith.' },
      lessons: [
        {
          type: 'card',
          title: { es: 'Los 6 Pilares del Iman', ar: 'أركان الإيمان الستة', en: 'The 6 Pillars of Faith' },
          content: {
            es: 'El Iman se basa en creer en: 1) Allah, 2) Sus Ángeles, 3) Sus Libros, 4) Sus Mensajeros, 5) el Día del Juicio, 6) el Decreto Divino (Qadar).',
            ar: 'الإيمان يقوم على: 1) الله، 2) الملائكة، 3) الكتب، 4) الرسل، 5) اليوم الآخر، 6) القدر خيره وشرّه.',
            en: 'Iman is to believe in: 1) Allah, 2) His Angels, 3) His Books, 4) His Messengers, 5) the Last Day, 6) Divine Decree (Qadar).',
          },
          source: 'Hadith of Jibril — Sahih Muslim',
        },
        {
          type: 'quiz',
          question: { es: '¿Cuántos pilares tiene el Iman?', ar: 'كم عدد أركان الإيمان؟', en: 'How many pillars does Iman have?' },
          options: ['4', '5', '6', '7'],
          correct: 2,
          feedback: { es: 'Correcto: 6 pilares. Allah, ángeles, libros, mensajeros, día del juicio, y qadar.', ar: 'صحيح: 6 أركان.', en: 'Correct: 6 pillars.' },
        },
        {
          type: 'flashcards',
          title: { es: 'Aprende los Pilares', ar: 'تعلّم الأركان', en: 'Learn the Pillars' },
          cards: [
            { front: { es: 'Pilar 1', ar: 'الركن 1', en: 'Pillar 1' }, back: { es: 'Creer en Allah', ar: 'الإيمان بالله', en: 'Belief in Allah' } },
            { front: { es: 'Pilar 2', ar: 'الركن 2', en: 'Pillar 2' }, back: { es: 'Creer en los Ángeles', ar: 'الإيمان بالملائكة', en: 'Belief in Angels' } },
            { front: { es: 'Pilar 3', ar: 'الركن 3', en: 'Pillar 3' }, back: { es: 'Creer en los Libros Revelados', ar: 'الإيمان بالكتب', en: 'Belief in the Books' } },
            { front: { es: 'Pilar 4', ar: 'الركن 4', en: 'Pillar 4' }, back: { es: 'Creer en los Mensajeros', ar: 'الإيمان بالرسل', en: 'Belief in the Messengers' } },
            { front: { es: 'Pilar 5', ar: 'الركن 5', en: 'Pillar 5' }, back: { es: 'Creer en el Día del Juicio', ar: 'الإيمان باليوم الآخر', en: 'Belief in the Last Day' } },
            { front: { es: 'Pilar 6', ar: 'الركن 6', en: 'Pillar 6' }, back: { es: 'Creer en el Qadar', ar: 'الإيمان بالقدر', en: 'Belief in Qadar' } },
          ],
        },
      ],
    },
    {
      id: 'ibadah',
      icon: '🕌',
      title: { es: 'Estación de la Ibadah', ar: 'محطة العبادة', en: 'Station of Worship' },
      mascotIntro: { es: 'Ahora los 5 pilares del Islam, las obras que sostienen al musulmán.', ar: 'الآن أركان الإسلام الخمسة، الأعمال التي يقوم عليها المسلم.', en: 'Now the 5 pillars of Islam, the deeds that uphold a Muslim.' },
      lessons: [
        {
          type: 'card',
          title: { es: 'Los 5 Pilares del Islam', ar: 'أركان الإسلام الخمسة', en: 'The 5 Pillars of Islam' },
          content: {
            es: '1) Shahada (testimonio de fe), 2) Salat (5 oraciones diarias), 3) Zakat (caridad obligatoria), 4) Sawm (ayuno de Ramadán), 5) Hajj (peregrinación a Meca).',
            ar: '1) الشهادتان، 2) إقام الصلاة، 3) إيتاء الزكاة، 4) صوم رمضان، 5) حج البيت لمن استطاع.',
            en: '1) Shahada (testimony), 2) Salah (5 daily prayers), 3) Zakat (obligatory charity), 4) Sawm (fasting Ramadan), 5) Hajj (pilgrimage to Makkah).',
          },
          source: 'Sahih al-Bukhari & Muslim',
        },
        {
          type: 'drag_drop',
          title: { es: 'Ordena los Pilares', ar: 'رتّب الأركان', en: 'Order the Pillars' },
          instruction: { es: 'Arrastra los pilares en el orden correcto', ar: 'اسحب الأركان بالترتيب الصحيح', en: 'Drag the pillars in the correct order' },
          items: [
            { id: 'shahada', label: { es: 'Shahada', ar: 'الشهادتان', en: 'Shahada' }, order: 1 },
            { id: 'salah', label: { es: 'Salah', ar: 'الصلاة', en: 'Salah' }, order: 2 },
            { id: 'zakat', label: { es: 'Zakat', ar: 'الزكاة', en: 'Zakat' }, order: 3 },
            { id: 'sawm', label: { es: 'Sawm', ar: 'الصوم', en: 'Sawm' }, order: 4 },
            { id: 'hajj', label: { es: 'Hajj', ar: 'الحج', en: 'Hajj' }, order: 5 },
          ],
        },
        {
          type: 'quiz',
          question: { es: '¿Cuántas oraciones diarias prescribió Allah?', ar: 'كم عدد الصلوات اليومية المفروضة؟', en: 'How many daily prayers did Allah prescribe?' },
          options: ['3', '5', '7', '17'],
          correct: 1,
          feedback: { es: '5 oraciones obligatorias: Fajr, Dhuhr, Asr, Maghrib, Isha.', ar: '5 صلوات: الفجر، الظهر، العصر، المغرب، العشاء.', en: '5 prayers: Fajr, Dhuhr, Asr, Maghrib, Isha.' },
        },
      ],
    },
    {
      id: 'akhlaq',
      icon: '🌸',
      title: { es: 'Estación de los Akhlaq', ar: 'محطة الأخلاق', en: 'Station of Character' },
      mascotIntro: { es: 'El Profeta ﷺ dijo: "Fui enviado para perfeccionar los buenos modales."', ar: 'قال النبي ﷺ: "إنما بُعثت لأتمم مكارم الأخلاق."', en: 'The Prophet ﷺ said: "I was sent to perfect noble character."' },
      lessons: [
        {
          type: 'card',
          title: { es: 'Akhlaq esenciales', ar: 'أخلاق أساسية', en: 'Essential character traits' },
          content: {
            es: '✅ Honestidad (Sidq) · Confianza (Amana) · Paciencia (Sabr) · Gratitud (Shukr) · Modestia (Haya) · Justicia (Adl) · Misericordia (Rahma) · Generosidad (Karam).',
            ar: '✅ الصدق · الأمانة · الصبر · الشكر · الحياء · العدل · الرحمة · الكرم.',
            en: '✅ Honesty (Sidq) · Trust (Amana) · Patience (Sabr) · Gratitude (Shukr) · Modesty (Haya) · Justice (Adl) · Mercy (Rahma) · Generosity (Karam).',
          },
          source: 'Sahih al-Bukhari 6029',
        },
        {
          type: 'quiz',
          question: { es: '¿Qué dijo el Profeta ﷺ que es la mitad del Iman?', ar: 'ما هو نصف الإيمان حسب قول النبي ﷺ؟', en: 'What did the Prophet ﷺ say is half of Iman?' },
          options: [
            { es: 'La oración', ar: 'الصلاة', en: 'Prayer' },
            { es: 'La pureza (Tahara)', ar: 'الطهور', en: 'Purity (Tahara)' },
            { es: 'La paciencia', ar: 'الصبر', en: 'Patience' },
            { es: 'La caridad', ar: 'الصدقة', en: 'Charity' },
          ],
          correct: 1,
          feedback: { es: 'La purificación es la mitad del Iman (Sahih Muslim 223).', ar: 'الطهور شطر الإيمان (صحيح مسلم).', en: 'Purification is half of Iman (Sahih Muslim 223).' },
        },
      ],
    },
    {
      id: 'muamalat',
      icon: '🤝',
      title: { es: 'Estación de las Mu\'amalat', ar: 'محطة المعاملات', en: 'Station of Conduct' },
      mascotIntro: { es: 'Cómo tratar a los demás: familia, vecinos, comunidad.', ar: 'كيف نتعامل مع الآخرين: الأهل، الجيران، المجتمع.', en: 'How to treat others: family, neighbors, community.' },
      lessons: [
        {
          type: 'card',
          title: { es: 'Derechos del musulmán sobre el musulmán', ar: 'حقوق المسلم على المسلم', en: 'Rights of a Muslim upon another' },
          content: {
            es: 'Saludar (Salam), responder a su invitación, aconsejarle cuando lo pide, decirle "Yarhamukallah" al estornudar (con Alhamdulillah), visitarlo si está enfermo, y acompañar su funeral.',
            ar: '1) إذا لقيته فسلّم عليه، 2) إذا دعاك فأجبه، 3) إذا استنصحك فانصح له، 4) إذا عطس فحمد الله فشمّته، 5) إذا مرض فعُده، 6) إذا مات فاتبعه.',
            en: '6 rights: 1) Greet with Salam, 2) Respond to invitations, 3) Give sincere advice when asked, 4) Say Yarhamukallah on his sneeze, 5) Visit when ill, 6) Attend funeral.',
          },
          source: 'Sahih Muslim 2162',
        },
        {
          type: 'quiz',
          question: { es: '¿Cuál es el mejor de los musulmanes según el Profeta ﷺ?', ar: 'من خير الناس عند النبي ﷺ؟', en: 'Who is the best of Muslims per the Prophet ﷺ?' },
          options: [
            { es: 'Quien más reza', ar: 'أكثرهم صلاة', en: 'The one who prays most' },
            { es: 'Quien es mejor con su familia', ar: 'خيركم لأهله', en: 'The best to his family' },
            { es: 'Quien más ayuna', ar: 'أكثرهم صياماً', en: 'The one who fasts most' },
            { es: 'Quien tiene más conocimiento', ar: 'أكثرهم علماً', en: 'The most knowledgeable' },
          ],
          correct: 1,
          feedback: { es: '"El mejor de vosotros es el mejor con su familia." (Tirmidhi 3895)', ar: '"خيركم خيركم لأهله." (الترمذي)', en: '"The best of you is the best to his family." (Tirmidhi 3895)' },
        },
      ],
    },
  ],
};

if (typeof window !== 'undefined') window.COURSE_JOURNEY = COURSE_JOURNEY;
