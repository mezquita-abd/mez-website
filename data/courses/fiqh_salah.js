// 🕌 Fiqh of Salah — How to pray, conditions, rules
const COURSE_FIQH_SALAH = {
  id: 'fiqh_salah',
  icon: '🕌',
  mascotPose: 'encourage',
  color: '#1A6B52',
  ageGroup: 'all',
  durationMin: 25,
  difficulty: 'intermediate',
  title: { es: 'Fiqh de la Salah', ar: 'فقه الصلاة', en: 'Fiqh of Salah (Prayer)' },
  description: {
    es: 'Cómo orar correctamente: requisitos, pilares y errores comunes',
    ar: 'كيف نصلّي بشكل صحيح: الشروط، الأركان، والأخطاء الشائعة',
    en: 'How to pray correctly: conditions, pillars, common mistakes',
  },
  stations: [
    {
      id: 'wudu',
      icon: '💧',
      title: { es: 'Wudu — La Ablución', ar: 'الوضوء', en: 'Wudu — Ablution' },
      mascotIntro: { es: 'Sin Wudu no hay Salah. Vamos paso a paso.', ar: 'لا صلاة بدون وضوء. هيا خطوة بخطوة.', en: 'No Salah without Wudu. Let\'s go step by step.' },
      lessons: [
        {
          type: 'card',
          title: { es: 'Los 6 Pasos del Wudu', ar: 'خطوات الوضوء الست', en: 'The 6 Steps of Wudu' },
          content: {
            es: '1) 🤲 Niyyah (intención) silenciosa.\n2) 💧 Lavar las manos hasta las muñecas × 3.\n3) 👄 Enjuagar boca y nariz × 3.\n4) 😊 Lavar la cara × 3.\n5) 💪 Lavar los brazos hasta los codos × 3.\n6) 👂 Pasar las manos mojadas por la cabeza y orejas, después lavar los pies × 3.',
            ar: '1) 🤲 النية بالقلب.\n2) 💧 غسل اليدين إلى الرسغين 3 مرات.\n3) 👄 المضمضة والاستنشاق 3 مرات.\n4) 😊 غسل الوجه 3 مرات.\n5) 💪 غسل الذراعين إلى المرفقين 3 مرات.\n6) 👂 مسح الرأس والأذنين، ثم غسل الرجلين 3 مرات.',
            en: '1) 🤲 Niyyah (intention) in heart.\n2) 💧 Wash hands to wrists × 3.\n3) 👄 Rinse mouth and nose × 3.\n4) 😊 Wash face × 3.\n5) 💪 Wash arms to elbows × 3.\n6) 👂 Wipe head & ears with wet hands, then wash feet × 3.',
          },
          source: 'Sahih al-Bukhari 159 & Quran 5:6',
        },
        {
          type: 'drag_drop',
          title: { es: 'Ordena los pasos del Wudu', ar: 'رتّب خطوات الوضوء', en: 'Order the Wudu steps' },
          instruction: { es: 'Arrastra en el orden correcto', ar: 'اسحب بالترتيب الصحيح', en: 'Drag in correct order' },
          items: [
            { id: 'niyyah', label: { es: 'Niyyah', ar: 'النية', en: 'Niyyah' }, order: 1 },
            { id: 'hands', label: { es: 'Lavar manos', ar: 'غسل اليدين', en: 'Wash hands' }, order: 2 },
            { id: 'mouth', label: { es: 'Enjuagar boca', ar: 'المضمضة', en: 'Rinse mouth' }, order: 3 },
            { id: 'face', label: { es: 'Lavar cara', ar: 'غسل الوجه', en: 'Wash face' }, order: 4 },
            { id: 'arms', label: { es: 'Lavar brazos', ar: 'غسل الذراعين', en: 'Wash arms' }, order: 5 },
            { id: 'feet', label: { es: 'Lavar pies', ar: 'غسل القدمين', en: 'Wash feet' }, order: 6 },
          ],
        },
      ],
    },
    {
      id: 'how_to_pray',
      icon: '🤲',
      title: { es: 'Cómo Orar', ar: 'كيف نصلّي', en: 'How to Pray' },
      mascotIntro: { es: 'Una rakah completa: takbir → recitación → ruku → sujud.', ar: 'ركعة كاملة: التكبير → القراءة → الركوع → السجود.', en: 'A complete rakah: takbir → recitation → ruku → sujud.' },
      lessons: [
        {
          type: 'card',
          title: { es: 'Una Rakah completa', ar: 'ركعة كاملة', en: 'A complete Rakah' },
          content: {
            es: '1) 🙌 Takbir al-Ihram: "Allahu Akbar"\n2) 📖 Recitar Al-Fatiha + otra sura corta\n3) 🙇 Ruku (inclinarse): "Subhana Rabbiyal-Adheem" × 3\n4) 🧍 Levantarse: "Sami\' Allahu liman hamidah"\n5) 🤲 Sujud (postración): "Subhana Rabbiyal-A\'la" × 3\n6) ⛪ Sentarse brevemente\n7) 🤲 Segundo Sujud × 3\nFin de la rakah.',
            ar: '1) 🙌 تكبيرة الإحرام\n2) 📖 الفاتحة + سورة\n3) 🙇 الركوع: "سبحان ربي العظيم" × 3\n4) 🧍 القيام: "سمع الله لمن حمده"\n5) 🤲 السجود: "سبحان ربي الأعلى" × 3\n6) ⛪ الجلوس بين السجدتين\n7) 🤲 السجدة الثانية × 3',
            en: '1) 🙌 Takbir al-Ihram: "Allahu Akbar"\n2) 📖 Recite Al-Fatiha + a short surah\n3) 🙇 Ruku (bow): "Subhana Rabbiyal-Adheem" × 3\n4) 🧍 Rise: "Sami\' Allahu liman hamidah"\n5) 🤲 Sujud (prostrate): "Subhana Rabbiyal-A\'la" × 3\n6) ⛪ Brief sitting\n7) 🤲 Second Sujud × 3',
          },
          source: 'Sahih al-Bukhari 757, Muslim 397',
        },
        {
          type: 'quiz',
          question: { es: '¿Qué se dice al inclinarse (ruku)?', ar: 'ماذا نقول في الركوع؟', en: 'What do we say in ruku?' },
          options: [
            { es: 'Allahu Akbar', ar: 'الله أكبر', en: 'Allahu Akbar' },
            { es: 'Subhana Rabbiyal-Adheem', ar: 'سبحان ربي العظيم', en: 'Subhana Rabbiyal-Adheem' },
            { es: 'Subhana Rabbiyal-A\'la', ar: 'سبحان ربي الأعلى', en: 'Subhana Rabbiyal-A\'la' },
            { es: 'Sami\' Allahu liman hamidah', ar: 'سمع الله لمن حمده', en: 'Sami\' Allahu liman hamidah' },
          ],
          correct: 1,
          feedback: { es: 'En ruku: "Glorificado sea mi Señor el Inmenso" × 3.', ar: 'في الركوع: سبحان ربي العظيم × 3.', en: 'In ruku: "Glory to my Lord the Magnificent" × 3.' },
        },
      ],
    },
    {
      id: 'common_errors',
      icon: '⚠️',
      title: { es: 'Errores Comunes', ar: 'أخطاء شائعة', en: 'Common Mistakes' },
      mascotIntro: { es: 'Evita estos errores frecuentes para perfeccionar tu Salah.', ar: 'تجنّب هذه الأخطاء لإتقان صلاتك.', en: 'Avoid these mistakes to perfect your Salah.' },
      lessons: [
        {
          type: 'card',
          title: { es: '5 errores que invalidan o reducen la Salah', ar: '5 أخطاء تُبطل أو تنقص الصلاة', en: '5 mistakes that invalidate or reduce Salah' },
          content: {
            es: '❌ 1) No mirar al lugar de sujud (mirar al cielo o a los lados).\n❌ 2) Recitar muy rápido sin tranquilidad (khushu).\n❌ 3) No alinear hombros y pies en oración congregada.\n❌ 4) Levantarse antes de que el Imam complete la postración.\n❌ 5) Mover excesivamente las manos o ropa (movimiento sin necesidad).',
            ar: '❌ 1) النظر إلى السماء أو الجوانب بدل موضع السجود.\n❌ 2) السرعة بدون خشوع.\n❌ 3) عدم تسوية الصفوف في الجماعة.\n❌ 4) المسابقة في الحركات قبل الإمام.\n❌ 5) كثرة الحركة بلا حاجة.',
            en: '❌ 1) Looking at sky/sides instead of place of sujud.\n❌ 2) Praying too fast without khushu.\n❌ 3) Not aligning shoulders/feet in congregation.\n❌ 4) Moving before the Imam completes.\n❌ 5) Excessive unnecessary movement.',
          },
          source: 'Various hadith — Bukhari, Muslim',
        },
      ],
    },
  ],
};

if (typeof window !== 'undefined') window.COURSE_FIQH_SALAH = COURSE_FIQH_SALAH;
