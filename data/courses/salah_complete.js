// 🕌 Course: How to Pray (Complete Salah Guide) — based on authentic Islamic sources
// Uses real-photo prayer position illustrations (11 photos)
const COURSE_SALAH_COMPLETE = {
  id: 'salah_complete',
  icon: '🕌',
  mascotPose: 'encourage',
  color: '#1A6B52',
  ageGroup: 'all',
  durationMin: 45,
  difficulty: 'beginner',
  title: {
    es: 'Cómo Rezar Paso a Paso',
    ar: 'تعلّم الصلاة خطوة بخطوة',
    en: 'How to Pray — Step by Step',
  },
  description: {
    es: 'Aprende la Salah con imágenes reales: condiciones, pilares, posiciones, súplicas',
    ar: 'تعلّم الصلاة بصور حقيقية: الشروط، الأركان، الحركات، الأدعية',
    en: 'Learn Salah with real photos: conditions, pillars, positions, supplications',
  },
  stations: [
    // ============ STATION 1: CONDITIONS ============
    {
      id: 'conditions',
      icon: '✅',
      title: { es: 'Condiciones de la Salah', ar: 'شروط الصلاة', en: 'Conditions of Salah' },
      mascotIntro: {
        es: 'Antes de orar, debes cumplir 6 condiciones. ¡Vamos!',
        ar: 'قبل الصلاة، يجب توفّر 6 شروط. هيا بنا!',
        en: 'Before praying, 6 conditions must be met. Let\'s go!',
      },
      lessons: [
        {
          type: 'card',
          title: { es: 'Las 6 Condiciones', ar: 'الشروط الستة', en: 'The 6 Conditions' },
          content: {
            es: '1️⃣ Islam, razón y discernimiento\n2️⃣ Tahara (Wudu) y ausencia de impurezas\n3️⃣ Cubrir el Awrah (cuerpo)\n4️⃣ Entrada del tiempo de oración\n5️⃣ Orientarse a la Qibla (La Meca)\n6️⃣ Niyyah (intención sincera en el corazón)',
            ar: '1️⃣ الإسلام والعقل والتمييز\n2️⃣ رفع الحدث (الطهارة) وإزالة النجاسة\n3️⃣ ستر العورة\n4️⃣ دخول الوقت\n5️⃣ استقبال القبلة\n6️⃣ النية',
            en: '1️⃣ Islam, sanity, and discernment\n2️⃣ Purity (Wudu) and freedom from impurity\n3️⃣ Covering the Awrah\n4️⃣ Entry of the prayer time\n5️⃣ Facing the Qibla (Makkah)\n6️⃣ Niyyah (sincere intention in the heart)',
          },
          source: 'Ijma\' (consensus of scholars)',
        },
        {
          type: 'quiz',
          question: { es: '¿Cuántas condiciones tiene la Salah?', ar: 'كم عدد شروط الصلاة؟', en: 'How many conditions does Salah have?' },
          options: ['4', '5', '6', '8'],
          correct: 2,
          feedback: {
            es: '6 condiciones: Islam, Wudu, cubrir Awrah, entrada del tiempo, Qibla, Niyyah.',
            ar: '6 شروط: الإسلام، الطهارة، ستر العورة، دخول الوقت، القبلة، النية.',
            en: '6 conditions: Islam, Wudu, covering Awrah, entry of time, Qibla, Niyyah.',
          },
        },
        {
          type: 'drag_drop',
          title: { es: 'Ordena las condiciones', ar: 'رتّب الشروط', en: 'Order the conditions' },
          instruction: { es: 'Arrastra para ordenarlas', ar: 'اسحب للترتيب', en: 'Drag to order them' },
          items: [
            { id: 'islam', label: { es: 'Islam y discernimiento', ar: 'الإسلام والعقل', en: 'Islam & sanity' }, order: 1 },
            { id: 'tahara', label: { es: 'Tahara (Wudu)', ar: 'الطهارة', en: 'Tahara (Wudu)' }, order: 2 },
            { id: 'awrah', label: { es: 'Cubrir el Awrah', ar: 'ستر العورة', en: 'Cover Awrah' }, order: 3 },
            { id: 'time', label: { es: 'Entrada del tiempo', ar: 'دخول الوقت', en: 'Entry of time' }, order: 4 },
            { id: 'qibla', label: { es: 'Orientarse a la Qibla', ar: 'استقبال القبلة', en: 'Face Qibla' }, order: 5 },
            { id: 'niyyah', label: { es: 'Niyyah (intención)', ar: 'النية', en: 'Niyyah' }, order: 6 },
          ],
        },
      ],
    },

    // ============ STATION 2: 14 PILLARS ============
    {
      id: 'pillars',
      icon: '🏛️',
      title: { es: 'Los 14 Pilares (Arkan)', ar: 'الأركان الأربعة عشر', en: 'The 14 Pillars' },
      mascotIntro: {
        es: 'Los pilares no se omiten ni por olvido. Si se omiten, la Salah es inválida.',
        ar: 'الأركان لا تسقط سهواً ولا عمداً. إن سقطت، بطلت الصلاة.',
        en: 'Pillars cannot be omitted, even by mistake.',
      },
      lessons: [
        {
          type: 'card',
          title: { es: 'Los 14 Pilares', ar: '14 ركناً', en: 'The 14 Pillars' },
          content: {
            es: '1) Qiyam (estar de pie) si puede\n2) Takbirat al-Ihram ("Allahu Akbar")\n3) Recitar Al-Fatiha\n4) Ruku (inclinación)\n5) Levantarse del Ruku\n6) I\'tidal (erguirse)\n7) Sujud (postración)\n8) Levantarse del Sujud\n9) Julus (sentarse entre 2 Sujud)\n10) Tuma\'nina (calma)\n11) Tashahhud final\n12) Sentarse para Tashahhud final\n13) Las 2 Tasleem\n14) Orden correcto',
            ar: '1) القيام في الفرض على القادر\n2) تكبيرة الإحرام\n3) قراءة الفاتحة\n4) الركوع\n5) الرفع من الركوع\n6) الاعتدال قائماً\n7) السجود\n8) الرفع من السجود\n9) الجلوس بين السجدتين\n10) الطمأنينة\n11) التشهد الأخير\n12) الجلوس للتشهد الأخير\n13) التسليمتان\n14) ترتيب الأركان',
            en: '1) Qiyam (standing) if able\n2) Takbirat al-Ihram\n3) Reciting Al-Fatiha\n4) Ruku (bowing)\n5) Rising from Ruku\n6) I\'tidal (standing erect)\n7) Sujud (prostration)\n8) Rising from Sujud\n9) Julus (sitting between 2 Sujuds)\n10) Tuma\'nina (calmness)\n11) Final Tashahhud\n12) Sitting for final Tashahhud\n13) The 2 Tasleem\n14) Correct order',
          },
          source: 'Imam Ibn Qudamah, Al-Mughni',
        },
        {
          type: 'quiz',
          question: { es: '¿Qué pasa si omites un pilar por olvido?', ar: 'ماذا لو نسيتَ ركناً؟', en: 'What if you omit a pillar by mistake?' },
          options: [
            { es: 'La Salah es válida con Sajdat as-Sahw', ar: 'الصلاة صحيحة بسجود السهو', en: 'Valid with Sajdat as-Sahw' },
            { es: 'La Salah es inválida', ar: 'الصلاة باطلة', en: 'Salah is invalid' },
            { es: 'Solo se necesita pedir perdón', ar: 'يكفي الاستغفار', en: 'Just seek forgiveness' },
          ],
          correct: 1,
          feedback: {
            es: 'Los pilares no se compensan con Sajdat as-Sahw. La Salah debe corregirse o repetirse.',
            ar: 'الأركان لا تُجبر بسجود السهو. تجب الإعادة أو التدارك.',
            en: 'Pillars are not compensated by Sajdat as-Sahw. Must be corrected or repeated.',
          },
        },
      ],
    },

    // ============ STATION 3: PRAYER STEPS (with photos) ============
    {
      id: 'steps',
      icon: '👣',
      title: { es: 'Pasos de la Salah (con fotos)', ar: 'خطوات الصلاة (بصور)', en: 'Salah Steps (photos)' },
      mascotIntro: {
        es: '¡Mira cada posición con fotos reales y aprende qué decir!',
        ar: 'انظر إلى كل وضعية بصور حقيقية واعرف ماذا تقول!',
        en: 'See each position with real photos!',
      },
      lessons: [
        {
          type: 'prayer_step', stepNumber: 1, image: 'takbeer',
          title: { es: '1. Takbirat al-Ihram', ar: '1. تكبيرة الإحرام', en: '1. Takbirat al-Ihram' },
          description: {
            es: 'Levanta las manos a la altura de los hombros u orejas. Pronuncia con voluntad firme:',
            ar: 'ارفع يديك إلى حذو منكبيك أو أذنيك، ثم قل بنيّة:',
            en: 'Raise your hands to shoulder/ear level. Say with firm intent:',
          },
          dhikr: {
            arabic: 'اللَّهُ أَكْبَرُ',
            translit: 'Allahu Akbar',
            translation: { es: 'Allah es el más Grande', ar: 'الله أكبر', en: 'Allah is the Greatest' },
          },
          tip: { es: '💡 Mira al lugar de Sujud, no al cielo.', ar: '💡 انظر إلى موضع السجود.', en: '💡 Look at the place of Sujud.' },
          source: 'Sahih al-Bukhari 735',
        },
        {
          type: 'prayer_step', stepNumber: 2, image: 'qiyam',
          title: { es: '2. Qiyam — De pie', ar: '2. القيام', en: '2. Qiyam — Standing' },
          description: {
            es: 'Cruza tus manos sobre el pecho (derecha sobre izquierda). Recita Istiftah, A\'udhu billahi, Bismillah, Al-Fatiha y una sura corta.',
            ar: 'ضع يدك اليمنى على اليسرى على الصدر. اقرأ دعاء الاستفتاح، ثم الاستعاذة والبسملة، ثم الفاتحة وسورة قصيرة.',
            en: 'Cross your hands on the chest (right over left). Recite Istiftah, A\'udhu billahi, Bismillah, Al-Fatiha and a short surah.',
          },
          dhikr: {
            arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ...',
            translit: 'Al-hamdu lillahi Rabbil-\'alamin...',
            translation: { es: 'Alabado sea Allah, Señor de los mundos... (Fatiha completa)', ar: 'الحمد لله رب العالمين... (الفاتحة)', en: 'Praise be to Allah, Lord of the worlds... (full Fatiha)' },
          },
          tip: { es: '💡 Lee con tranquilidad, no rápido.', ar: '💡 اقرأ بتأنٍّ ولا تستعجل.', en: '💡 Read calmly, not in haste.' },
          source: 'Sahih al-Bukhari 757',
        },
        {
          type: 'prayer_step', stepNumber: 3, image: 'ruku',
          title: { es: '3. Ruku — Inclinación', ar: '3. الركوع', en: '3. Ruku — Bowing' },
          description: {
            es: 'Di "Allahu Akbar" e inclínate, colocando las manos sobre las rodillas. La espalda recta y paralela al suelo. Repite 3 veces:',
            ar: 'قل "الله أكبر" واركع واضعاً يديك على ركبتيك. اجعل ظهرك مستقيماً موازياً للأرض. ثم قل 3 مرات:',
            en: 'Say "Allahu Akbar" and bow, hands on knees. Back straight and parallel to ground. Say 3 times:',
          },
          dhikr: {
            arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
            translit: 'Subhana Rabbiyal-\'Adheem',
            translation: { es: 'Glorificado sea mi Señor el Inmenso', ar: 'سبحان ربي العظيم', en: 'Glory be to my Lord the Magnificent' },
          },
          tip: { es: '💡 Mira al lugar de Sujud.', ar: '💡 انظر إلى موضع السجود.', en: '💡 Look at the place of Sujud.' },
          source: 'Sahih Muslim 772',
        },
        {
          type: 'prayer_step', stepNumber: 4, image: 'itidal',
          title: { es: '4. I\'tidal — Erguirse', ar: '4. الاعتدال', en: '4. I\'tidal — Standing erect' },
          description: {
            es: 'Levántate del Ruku diciendo al levantar:',
            ar: 'ارفع من الركوع قائلاً عند الرفع:',
            en: 'Rise from Ruku saying while rising:',
          },
          dhikr: {
            arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ',
            translit: 'Sami\' Allahu liman hamidah',
            translation: { es: 'Allah escucha a quien Lo alaba', ar: 'سمع الله لمن حمده', en: 'Allah hears those who praise Him' },
          },
          secondDhikr: {
            arabic: 'رَبَّنَا وَلَكَ الْحَمْدُ',
            translit: 'Rabbana wa lakal-hamd',
            translation: { es: 'Señor nuestro, Tuya es la alabanza (de pie)', ar: 'ربنا ولك الحمد', en: 'Our Lord, to You belongs all praise' },
          },
          tip: { es: '💡 Permanece erguido con calma.', ar: '💡 اعتدل بطمأنينة.', en: '💡 Stand erect with calm.' },
          source: 'Sahih al-Bukhari 795',
        },
        {
          type: 'prayer_step', stepNumber: 5, image: 'sujood',
          title: { es: '5. Sujud — Primera postración', ar: '5. السجود الأول', en: '5. Sujud — First prostration' },
          description: {
            es: 'Di "Allahu Akbar" y baja a postrarte sobre los 7 miembros: frente+nariz, las 2 manos, las 2 rodillas, los dedos de los 2 pies. Repite 3 veces:',
            ar: 'قل "الله أكبر" واسجد على الأعضاء السبعة: الجبهة والأنف، الكفّان، الركبتان، أطراف القدمين. ثم قل 3 مرات:',
            en: 'Say "Allahu Akbar" and prostrate on the 7 body parts: forehead+nose, both hands, both knees, toes. Say 3 times:',
          },
          dhikr: {
            arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
            translit: 'Subhana Rabbiyal-A\'la',
            translation: { es: 'Glorificado sea mi Señor el Altísimo', ar: 'سبحان ربي الأعلى', en: 'Glory be to my Lord the Most High' },
          },
          tip: { es: '💡 Aleja los codos del cuerpo.', ar: '💡 جافِ مرفقيك.', en: '💡 Keep elbows away from sides.' },
          source: 'Sahih al-Bukhari 812',
        },
        {
          type: 'prayer_step', stepNumber: 6, image: 'julus',
          title: { es: '6. Julus — Sentarse entre 2 Sujud', ar: '6. الجلوس بين السجدتين', en: '6. Julus — Sitting between 2 Sujuds' },
          description: {
            es: 'Di "Allahu Akbar" y siéntate sobre tu pie izquierdo, con el derecho erguido. Di con tranquilidad:',
            ar: 'قل "الله أكبر" واجلس على رجلك اليسرى ناصباً اليمنى. ثم قل بطمأنينة:',
            en: 'Say "Allahu Akbar" and sit on your left foot with the right one upright. Say calmly:',
          },
          dhikr: {
            arabic: 'رَبِّ اغْفِرْ لِي',
            translit: 'Rabbi-ghfir li',
            translation: { es: 'Señor mío, perdóname', ar: 'رب اغفر لي', en: 'My Lord, forgive me' },
          },
          tip: { es: '💡 Esta postura se llama "Iftirash". Puedes decirlo 1 o 3 veces.', ar: '💡 هذه الجلسة "الافتراش". قُلها مرة أو 3.', en: '💡 This is "Iftirash". Say 1 or 3 times.' },
          source: 'Sunan an-Nasa\'i 1145',
        },
        {
          type: 'prayer_step', stepNumber: 7, image: 'second_sujood',
          title: { es: '7. Segundo Sujud', ar: '7. السجود الثاني', en: '7. Second Sujud' },
          description: {
            es: 'Di "Allahu Akbar" y postrate de nuevo como el primer Sujud. Repite 3 veces:',
            ar: 'قل "الله أكبر" واسجد كالسجدة الأولى. ثم قل 3 مرات:',
            en: 'Say "Allahu Akbar" and prostrate as the first Sujud. Repeat 3 times:',
          },
          dhikr: {
            arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
            translit: 'Subhana Rabbiyal-A\'la',
            translation: { es: 'Glorificado sea mi Señor el Altísimo', ar: 'سبحان ربي الأعلى', en: 'Glory be to my Lord the Most High' },
          },
          tip: { es: '💡 Esto completa la primera Rakah.', ar: '💡 بهذا تكتمل الركعة الأولى.', en: '💡 This completes the first Rakah.' },
          source: 'Sahih al-Bukhari 812',
        },
        {
          type: 'prayer_step', stepNumber: 8, image: 'standing_again',
          title: { es: '8. Volver a Qiyam — 2ª Rakah', ar: '8. القيام للركعة الثانية', en: '8. Standing again — 2nd Rakah' },
          description: {
            es: 'Di "Allahu Akbar" y levántate. Lee Al-Fatiha y una sura corta. Continúa como en la primera Rakah.',
            ar: 'قل "الله أكبر" وقم معتمداً على الأرض. اقرأ الفاتحة وسورة قصيرة. تابع كالركعة الأولى.',
            en: 'Say "Allahu Akbar" and rise. Read Al-Fatiha and a short surah. Continue as in 1st Rakah.',
          },
          dhikr: {
            arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
            translit: 'Bismillahi-Rahmani-Rahim',
            translation: { es: 'En el nombre de Allah (luego Al-Fatiha)', ar: 'بسم الله الرحمن الرحيم (ثم الفاتحة)', en: 'In the name of Allah (then Al-Fatiha)' },
          },
          tip: { es: '💡 No hay Du\'a de Istiftah en la 2ª Rakah.', ar: '💡 لا دعاء استفتاح في الثانية.', en: '💡 No Istiftah in 2nd Rakah.' },
          source: 'Sahih Muslim 397',
        },
        {
          type: 'prayer_step', stepNumber: 9, image: 'tashahhud',
          title: { es: '9. Tashahhud — Sentarse final', ar: '9. التشهد', en: '9. Tashahhud — Final sitting' },
          description: {
            es: 'Después del 2º Sujud de la última Rakah, siéntate y recita el Tashahhud + Salat Ibrahimiyyah + súplica.',
            ar: 'بعد السجدة الثانية من الركعة الأخيرة، اجلس واقرأ التشهد + الصلاة الإبراهيمية + الدعاء.',
            en: 'After the 2nd Sujud of the last Rakah, sit and recite Tashahhud + Salat Ibrahimiyyah + supplication.',
          },
          dhikr: {
            arabic: 'التَّحِيَّاتُ لِلَّهِ، وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
            translit: 'At-tahiyyatu lillah, was-salawatu wat-tayyibat...',
            translation: { es: 'Los saludos, oraciones y cosas buenas son para Allah...', ar: 'التحيات لله...', en: 'All greetings, prayers, and good things are for Allah...' },
          },
          secondDhikr: {
            arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ',
            translit: 'Allahumma salli \'ala Muhammad...',
            translation: { es: 'Oh Allah, bendice a Muhammad... (Salat Ibrahimiyyah)', ar: 'اللهم صلِّ على محمد... (الإبراهيمية)', en: 'O Allah, bless Muhammad... (Salat Ibrahimiyyah)' },
          },
          tip: { es: '💡 Levanta el índice en la Shahada.', ar: '💡 ارفع السبابة عند الشهادة.', en: '💡 Raise your index finger at Shahada.' },
          source: 'Sahih al-Bukhari 6328',
        },
        {
          type: 'prayer_step', stepNumber: 10, image: 'tasleem_right',
          title: { es: '10. Tasleem derecha', ar: '10. التسليم على اليمين', en: '10. Tasleem to the right' },
          description: {
            es: 'Gira tu cara hacia la derecha hasta ver tu hombro y di:',
            ar: 'التفت بوجهك إلى يمينك حتى تُرى صفحة خدّك وقل:',
            en: 'Turn your face to the right until your cheek is seen and say:',
          },
          dhikr: {
            arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
            translit: 'As-salamu \'alaykum wa rahmatullah',
            translation: { es: 'La paz y la misericordia de Allah sean contigo', ar: 'السلام عليكم ورحمة الله', en: 'Peace and mercy of Allah be upon you' },
          },
          tip: { es: '💡 El Tasleem es un pilar.', ar: '💡 التسليم ركن.', en: '💡 The Tasleem is a pillar.' },
          source: 'Sunan Abi Dawud 996',
        },
        {
          type: 'prayer_step', stepNumber: 11, image: 'tasleem_left',
          title: { es: '11. Tasleem izquierda', ar: '11. التسليم على اليسار', en: '11. Tasleem to the left' },
          description: {
            es: 'Gira tu cara hacia la izquierda y di lo mismo. ¡Has completado tu Salah! 🤲',
            ar: 'التفت إلى يسارك وقل المثل. لقد أتممت صلاتك! 🤲',
            en: 'Turn your face to the left and say the same. You\'ve completed your Salah! 🤲',
          },
          dhikr: {
            arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
            translit: 'As-salamu \'alaykum wa rahmatullah',
            translation: { es: 'La paz y la misericordia de Allah sean contigo', ar: 'السلام عليكم ورحمة الله', en: 'Peace and mercy of Allah be upon you' },
          },
          tip: { es: '🤲 Después: Adhkar de post-oración.', ar: '🤲 بعد: أذكار ما بعد الصلاة.', en: '🤲 After: post-prayer adhkar.' },
          source: 'Sunan Abi Dawud 996',
        },
      ],
    },

    // ============ STATION 4: WAJIBAT ============
    {
      id: 'wajibat',
      icon: '📋',
      title: { es: 'Las 8 Obligaciones (Wajibat)', ar: 'الواجبات الثمانية', en: 'The 8 Wajibat' },
      mascotIntro: {
        es: 'Las Wajibat son obligatorias pero se compensan con Sajdat as-Sahw si se olvidan.',
        ar: 'الواجبات تجب لكن تُجبر بسجود السهو إذا نُسيت.',
        en: 'Wajibat are obligatory but can be compensated.',
      },
      lessons: [
        {
          type: 'card',
          title: { es: 'Las 8 Wajibat', ar: 'الواجبات الثمانية', en: 'The 8 Wajibat' },
          content: {
            es: '1️⃣ Takbir (excepto Ihram)\n2️⃣ "Sami\' Allahu liman hamidah"\n3️⃣ "Rabbana wa lakal-hamd"\n4️⃣ "Subhana Rabbiyal-Adheem" en Ruku\n5️⃣ "Subhana Rabbiyal-A\'la" en Sujud\n6️⃣ "Rabbi-ghfir li" entre 2 Sujud\n7️⃣ Tashahhud Awwal\n8️⃣ Sentarse para Tashahhud Awwal',
            ar: '1️⃣ التكبير لغير الإحرام\n2️⃣ "سمع الله لمن حمده"\n3️⃣ "ربنا ولك الحمد"\n4️⃣ "سبحان ربي العظيم" في الركوع\n5️⃣ "سبحان ربي الأعلى" في السجود\n6️⃣ "رب اغفر لي" بين السجدتين\n7️⃣ التشهد الأول\n8️⃣ الجلوس للتشهد الأول',
            en: '1️⃣ Takbir (except Ihram)\n2️⃣ "Sami\' Allahu liman hamidah"\n3️⃣ "Rabbana wa lakal-hamd"\n4️⃣ "Subhana Rabbiyal-Adheem" in Ruku\n5️⃣ "Subhana Rabbiyal-A\'la" in Sujud\n6️⃣ "Rabbi-ghfir li" between Sujuds\n7️⃣ First Tashahhud\n8️⃣ Sitting for First Tashahhud',
          },
          source: 'Hanbali madhhab — Imam Ibn Qudamah',
        },
        {
          type: 'quiz',
          question: { es: '¿Diferencia entre Pilar y Wajibah?', ar: 'الفرق بين الركن والواجب؟', en: 'Pillar vs Wajibah?' },
          options: [
            { es: 'No hay diferencia', ar: 'لا فرق', en: 'No difference' },
            { es: 'Pilar: no se omite. Wajibah: se compensa con Sajdat as-Sahw.', ar: 'الركن لا يسقط. الواجب يُجبر بسجود السهو.', en: 'Pillar: cannot omit. Wajibah: compensated by Sajdat as-Sahw.' },
            { es: 'Pilar voluntario, Wajibah obligatorio', ar: 'الركن مستحب، الواجب فرض', en: 'Pillar voluntary, Wajibah obligatory' },
          ],
          correct: 1,
          feedback: {
            es: 'Correcto. El Pilar es esencial; sin él la Salah es inválida.',
            ar: 'صحيح. الركن جزء أساسي من الصلاة.',
            en: 'Correct. The Pillar is essential; Wajibah can be compensated.',
          },
        },
      ],
    },

    // ============ STATION 5: TASHAHHUD & DU'A ============
    {
      id: 'tashahhud_dua',
      icon: '🤲',
      title: { es: 'Tashahhud y Súplicas', ar: 'التشهد والأدعية', en: 'Tashahhud & Du\'as' },
      mascotIntro: {
        es: 'Aprende qué se dice en el Tashahhud y la mejor súplica antes del Tasleem.',
        ar: 'تعلّم ما يُقال في التشهد وأفضل دعاء قبل التسليم.',
        en: 'Learn the Tashahhud text and the best Du\'a before Tasleem.',
      },
      lessons: [
        {
          type: 'card',
          title: { es: '1. Texto del Tashahhud (At-Tahiyyat)', ar: '1. نص التشهد', en: '1. Tashahhud (At-Tahiyyat)' },
          content: {
            es: 'التَّحِيَّاتُ لِلَّهِ، وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ\n\n📖 "Los saludos, oraciones y buenas cosas son para Allah. La paz sea contigo, Profeta, y la misericordia de Allah. La paz sea con nosotros y con los siervos rectos. Testifico que no hay divinidad sino Allah, y que Muhammad es Su siervo y Mensajero."',
            ar: 'التَّحِيَّاتُ لِلَّهِ، وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
            en: 'At-tahiyyatu lillah, was-salawatu wat-tayyibat. As-salamu \'alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuh. As-salamu \'alayna wa \'ala \'ibadillahis-salihin. Ash-hadu an la ilaha illa Allah, wa ash-hadu anna Muhammadan \'abduhu wa Rasuluh.\n\n📖 "All greetings, prayers, and good things are for Allah. Peace be upon you, O Prophet... I testify there is no god but Allah, and Muhammad is His servant and Messenger."',
          },
          source: 'Sahih al-Bukhari 6265',
        },
        {
          type: 'card',
          title: { es: '2. Salat Ibrahimiyyah', ar: '2. الصلاة الإبراهيمية', en: '2. Salat Ibrahimiyyah' },
          content: {
            es: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ. اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ.\n\n📖 "Oh Allah, bendice a Muhammad y a su familia como bendijiste a Ibrahim y su familia. Tú eres Loado, Glorioso."\n\n⚠️ Sunnah — Wajib en la escuela Shafi\'i.',
            ar: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ. اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ.\n\n⚠️ سنّة — وواجبة عند الشافعية.',
            en: 'Allahumma salli \'ala Muhammadin wa \'ala ali Muhammad, kama sallayta \'ala Ibrahima wa \'ala ali Ibrahim, innaka Hamidum Majid. Allahumma barik \'ala Muhammadin wa \'ala ali Muhammad, kama barakta \'ala Ibrahima wa \'ala ali Ibrahim, innaka Hamidum Majid.\n\n📖 "O Allah, bless Muhammad and his family as You blessed Ibrahim and his family..."\n\n⚠️ Sunnah — Wajib in the Shafi\'i school.',
          },
          source: 'Sahih al-Bukhari 3370',
        },
        {
          type: 'card',
          title: { es: '3. Du\'a antes del Tasleem', ar: '3. الدعاء قبل التسليم', en: '3. Du\'a before Tasleem' },
          content: {
            es: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً، وَفِي الْآخِرَةِ حَسَنَةً، وَقِنَا عَذَابَ النَّارِ\n\n📖 "Señor nuestro, danos lo bueno en esta vida y en la próxima, y protégenos del Fuego."\n\nEra la súplica más frecuente del Profeta ﷺ. También puedes pedir cualquier necesidad permitida en cualquier idioma.',
            ar: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً، وَفِي الْآخِرَةِ حَسَنَةً، وَقِنَا عَذَابَ النَّارِ\n\nكان النبي ﷺ يُكثر من هذا الدعاء (البخاري 6389). ويمكن أن تدعو بأي حاجة مباحة.',
            en: 'Rabbana atina fid-dunya hasanah, wa fil-akhirati hasanah, waqina \'adhaban-nar.\n\n📖 "Our Lord, give us good in this world and good in the next, and protect us from the Fire."\n\nThe Prophet\'s ﷺ most frequent supplication. You may ask for any lawful need in any language.',
          },
          source: 'Quran 2:201 + Sahih al-Bukhari 6389',
        },
        {
          type: 'quiz',
          question: {
            es: '¿En qué Tashahhud se recita la Salat Ibrahimiyyah?',
            ar: 'في أيّ تشهد تُقرأ الصلاة الإبراهيمية؟',
            en: 'In which Tashahhud is the Salat Ibrahimiyyah recited?',
          },
          options: [
            { es: 'En el primero solamente', ar: 'في الأول فقط', en: 'In the first only' },
            { es: 'En el último solamente', ar: 'في الأخير فقط', en: 'In the last only' },
            { es: 'En ambos', ar: 'في الاثنين', en: 'In both' },
          ],
          correct: 1,
          feedback: {
            es: 'En el último. El primer Tashahhud solo lleva At-Tahiyyat, luego se levanta a la 3ª Rakah.',
            ar: 'في الأخير. أما الأول فيُكتفى بالتحيات.',
            en: 'In the final one. The first only has At-Tahiyyat, then rise for 3rd Rakah.',
          },
        },
      ],
    },

    // ============ STATION 6: 4-RAKAH PRAYERS ============
    {
      id: 'four_rakah',
      icon: '4️⃣',
      title: { es: 'Salah de 4 Rakahs', ar: 'الصلاة الرباعية', en: '4-Rakah Prayers' },
      mascotIntro: {
        es: 'Dhuhr, Asr y Isha tienen 4 Rakahs. ¡Te explico cómo!',
        ar: 'الظهر والعصر والعشاء أربع ركعات. سأشرح لك كيف!',
        en: 'Dhuhr, Asr, and Isha have 4 Rakahs. Let me explain!',
      },
      lessons: [
        {
          type: 'card',
          title: { es: 'Diferencias con 2 Rakahs', ar: 'الفروقات مع الثنائية', en: 'Differences from 2-Rakah' },
          content: {
            es: 'Rakahs 1 y 2: idénticas a Fajr (Fatiha + sura corta).\n\nDespués del 2º Sujud de la 2ª Rakah:\n→ Tashahhud Awwal (solo At-Tahiyyat).\n→ Te levantas a la 3ª Rakah.\n\nRakahs 3 y 4 (en Fard):\n→ Solo Al-Fatiha (sin sura adicional).\n→ Lo demás igual.\n→ Después del 2º Sujud de la 4ª Rakah → Tashahhud final completo → Tasleem.',
            ar: 'الركعتان 1 و2: مثل الفجر (الفاتحة + سورة).\n\nبعد السجدة الثانية من الثانية:\n→ التشهد الأول (التحيات فقط).\n→ القيام إلى الثالثة.\n\nالركعتان 3 و4 (في الفرض):\n→ الفاتحة فقط.\n→ الباقي كالمعتاد.\n→ التشهد الأخير → التسليم.',
            en: 'Rakahs 1-2: identical to Fajr (Fatiha + short surah).\n\nAfter 2nd Sujud of Rakah 2:\n→ First Tashahhud (only At-Tahiyyat).\n→ Rise to Rakah 3.\n\nRakahs 3-4 (in Fard):\n→ Only Al-Fatiha.\n→ Everything else same.\n→ After 2nd Sujud of Rakah 4 → full final Tashahhud → Tasleem.',
          },
          source: 'Sahih al-Bukhari 757',
        },
        {
          type: 'quiz',
          question: {
            es: '¿En Rakahs 3-4 de un Fard se recita una sura?',
            ar: 'هل تُقرأ سورة في الركعتين 3-4 من الفرض؟',
            en: 'In Rakahs 3-4 of a Fard, is a surah recited?',
          },
          options: [
            { es: 'Sí, siempre', ar: 'نعم دائماً', en: 'Yes, always' },
            { es: 'No, solo Al-Fatiha', ar: 'لا، الفاتحة فقط', en: 'No, only Al-Fatiha' },
            { es: 'Solo en Dhuhr', ar: 'فقط في الظهر', en: 'Only in Dhuhr' },
          ],
          correct: 1,
          feedback: {
            es: 'En Fard: solo Fatiha en 3-4. En Sunan/Nawafil sí se puede añadir sura.',
            ar: 'في الفرض: الفاتحة فقط. أما السنن فيمكن إضافة سورة.',
            en: 'Fard: only Fatiha in 3-4. Sunan/Nawafil may add a surah.',
          },
        },
        {
          type: 'drag_drop',
          title: { es: 'Ordena la Salah de 4 Rakahs', ar: 'رتّب الصلاة الرباعية', en: 'Order the 4-Rakah Salah' },
          instruction: { es: 'Arrastra al orden correcto', ar: 'اسحب بالترتيب الصحيح', en: 'Drag in correct order' },
          items: [
            { id: 'r1', label: { es: '1ª Rakah completa', ar: 'الركعة الأولى', en: '1st Rakah' }, order: 1 },
            { id: 'r2', label: { es: '2ª Rakah + Tashahhud Awwal', ar: 'الركعة الثانية + التشهد الأول', en: '2nd Rakah + First Tashahhud' }, order: 2 },
            { id: 'r3', label: { es: '3ª Rakah (solo Fatiha)', ar: 'الثالثة (الفاتحة فقط)', en: '3rd Rakah (Fatiha only)' }, order: 3 },
            { id: 'r4', label: { es: '4ª Rakah (solo Fatiha)', ar: 'الرابعة (الفاتحة فقط)', en: '4th Rakah (Fatiha only)' }, order: 4 },
            { id: 'final', label: { es: 'Tashahhud final + Tasleem', ar: 'التشهد الأخير + التسليم', en: 'Final Tashahhud + Tasleem' }, order: 5 },
          ],
        },
      ],
    },

    // ============ STATION 7: SUMMARY ============
    {
      id: 'summary',
      icon: '⭐',
      title: { es: 'Resumen y Hadith Final', ar: 'الخلاصة والحديث الختامي', en: 'Summary & Final Hadith' },
      mascotIntro: {
        es: '¡Has llegado al final! Repasa y recibe tu certificado.',
        ar: 'وصلتَ إلى النهاية! راجع واستلم شهادتك.',
        en: 'You\'ve reached the end! Review and claim your certificate.',
      },
      lessons: [
        {
          type: 'card',
          title: { es: 'El Hadith del Profeta ﷺ', ar: 'حديث النبي ﷺ', en: 'The Hadith of the Prophet ﷺ' },
          content: {
            es: 'صَلُّوا كَمَا رَأَيْتُمُونِي أُصَلِّي\n\n📖 "Rezad como me habéis visto rezar."\n\nEste hadith establece el principio: imitar al Profeta ﷺ en todos los detalles de la Salah. Cada gesto, cada palabra, cada postura debe seguir su Sunnah.\n\n🌟 La Salah es el pilar de la religión.',
            ar: 'صَلُّوا كَمَا رَأَيْتُمُونِي أُصَلِّي\n\n📖 يقرّر هذا الحديث المبدأ: الاقتداء بالنبي ﷺ في كلّ تفاصيل الصلاة.\n\n🌟 الصلاة عمود الدين.',
            en: '"Pray as you have seen me pray."\n\n📖 This hadith establishes the principle: emulate the Prophet ﷺ in every detail of the Salah.\n\n🌟 Salah is the pillar of the religion.',
          },
          source: 'Sahih al-Bukhari 631',
        },
        {
          type: 'card',
          title: { es: 'Recordatorio sobre Khushu', ar: 'تذكير حول الخشوع', en: 'A Reminder on Khushu' },
          content: {
            es: '🧘 **Khushu** (humildad y presencia) es el alma de la Salah.\n\n• Ora con tranquilidad (Tuma\'nina), no a la prisa.\n• Comprende lo que recitas.\n• Imagina que Allah te observa.\n• Aleja distracciones del corazón.\n\n📖 El Profeta ﷺ: "Cuando uno reza, está hablando en privado con su Señor." (Bukhari 405)',
            ar: '🧘 **الخشوع** هو روح الصلاة.\n\n• صلّ بطمأنينة لا بسرعة.\n• افهم ما تقرأ.\n• تخيّل أن الله يراك.\n• ابعد الشواغل عن قلبك.\n\n📖 قال النبي ﷺ: "إن أحدكم إذا صلّى يناجي ربه." (البخاري)',
            en: '🧘 **Khushu** (humility and presence) is the soul of Salah.\n\n• Pray with Tuma\'nina, not in haste.\n• Understand what you recite.\n• Imagine that Allah is watching.\n• Keep distractions out of your heart.\n\n📖 The Prophet ﷺ: "When one prays, he converses privately with his Lord." (Bukhari 405)',
          },
          source: 'Sahih al-Bukhari 405',
        },
        {
          type: 'quiz',
          question: {
            es: '¿Qué dijo el Profeta ﷺ sobre cómo rezar?',
            ar: 'ماذا قال النبي ﷺ عن كيفية الصلاة؟',
            en: 'What did the Prophet ﷺ say about how to pray?',
          },
          options: [
            { es: 'Rezad como queráis', ar: 'صلّوا كما شئتم', en: 'Pray as you wish' },
            { es: 'Rezad como me habéis visto rezar', ar: 'صلّوا كما رأيتموني أُصلّي', en: 'Pray as you have seen me pray' },
            { es: 'Rezad rápido', ar: 'صلّوا بسرعة', en: 'Pray fast' },
          ],
          correct: 1,
          feedback: {
            es: '"Rezad como me habéis visto rezar" (Sahih al-Bukhari 631).',
            ar: '"صلّوا كما رأيتموني أُصلّي" (البخاري 631).',
            en: '"Pray as you have seen me pray" (Sahih al-Bukhari 631).',
          },
        },
      ],
    },
  ],
};

if (typeof window !== 'undefined') window.COURSE_SALAH_COMPLETE = COURSE_SALAH_COMPLETE;
