/**
 * 📿 Local Vetted Du'as Dataset — Quba v11
 *
 * Fuente: Fortress of the Muslim (Hisnul Muslim) — Sheikh Sa'id ibn 'Ali al-Qahtani (رحمه الله)
 * Autenticidad: Todas las du'as citadas provienen de Bukhari, Muslim, Abu Dawud, Tirmidhi, an-Nasa'i, Ibn Majah,
 * o del propio Corán. Fuentes explícitas en cada entrada.
 *
 * @theological_review PENDIENTE — Este dataset debe ser revisado por un imám cualificado
 * antes de despliegue en producción. Referencia base: Hisnul Muslim edición Darussalam.
 *
 * Estructura: cada categoría contiene { id, name_es/ar/en, icon, color, duas[] }
 * Cada dua: { id, title, arabic, transliteration, translation_es/ar/en, source, repeat }
 */

const LOCAL_DUAS = {
  categories: [
    {
      id: 'morning',
      name_es: 'Adhkar de la mañana',
      name_ar: 'أذكار الصباح',
      name_en: 'Morning Adhkar',
      icon: '🌅',
      color: '#FFA726',
    },
    {
      id: 'evening',
      name_es: 'Adhkar de la tarde',
      name_ar: 'أذكار المساء',
      name_en: 'Evening Adhkar',
      icon: '🌇',
      color: '#7E57C2',
    },
    {
      id: 'sleep',
      name_es: 'Antes de dormir',
      name_ar: 'أذكار النوم',
      name_en: 'Before Sleep',
      icon: '🌙',
      color: '#5C6BC0',
    },
    {
      id: 'after_prayer',
      name_es: 'Después de la oración',
      name_ar: 'أذكار بعد الصلاة',
      name_en: 'After Prayer',
      icon: '🕌',
      color: '#0F4C3A',
    },
    {
      id: 'distress',
      name_es: 'Angustia y dificultad',
      name_ar: 'أدعية الكرب',
      name_en: 'Distress & Hardship',
      icon: '💚',
      color: '#66BB6A',
    },
    {
      id: 'forgiveness',
      name_es: 'Perdón',
      name_ar: 'أدعية الاستغفار',
      name_en: 'Forgiveness',
      icon: '🤲',
      color: '#D4AF37',
    },
    {
      id: 'travel',
      name_es: 'Viaje',
      name_ar: 'أدعية السفر',
      name_en: 'Travel',
      icon: '✈️',
      color: '#42A5F5',
    },
    {
      id: 'food',
      name_es: 'Alimentación',
      name_ar: 'أدعية الطعام',
      name_en: 'Food & Drink',
      icon: '🍽️',
      color: '#FF7043',
    },
    {
      id: 'gratitude',
      name_es: 'Gratitud',
      name_ar: 'أدعية الشكر',
      name_en: 'Gratitude',
      icon: '✨',
      color: '#FFD700',
    },
    {
      id: 'protection',
      name_es: 'Protección',
      name_ar: 'أدعية الحماية',
      name_en: 'Protection',
      icon: '🛡️',
      color: '#8E6E1E',
    },
  ],

  duas: {
    // ============ FORGIVENESS ============
    forgiveness: [
      {
        id: 'sayyid_istighfar',
        title: 'Sayyid al-Istighfar (Líder del perdón)',
        arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي، فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
        transliteration: 'Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana ‘abduka, wa ana ‘ala ‘ahdika wa wa‘dika mastata‘tu, a‘udhu bika min sharri ma sana‘tu, abu’u laka bini‘matika ‘alayya, wa abu’u bidhanbi, faghfir li fa innahu la yaghfirudhdhunuba illa ant.',
        translation_es: 'Oh Allah, Tú eres mi Señor, no hay divinidad excepto Tú. Me creaste y soy Tu siervo. Cumpliré Tu pacto y Tu promesa hasta donde pueda. Busco refugio en Ti del mal que he cometido. Reconozco Tus bendiciones sobre mí y reconozco mis pecados. Perdóname, pues nadie perdona los pecados sino Tú.',
        translation_en: 'O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your servant. I abide by Your covenant and Your promise as best I can. I seek refuge with You from the evil I have committed. I acknowledge Your favor upon me and I acknowledge my sins. Forgive me, for none forgives sins but You.',
        translation_ar: 'اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك...',
        source: 'Sahih Al-Bukhari 6306',
        repeat: 1,
        virtue: 'Quien la dice de día con certeza y muere ese día antes del anochecer, será de la gente del Paraíso; y quien la dice de noche con certeza y muere antes del amanecer, será de la gente del Paraíso.',
      },
      {
        id: 'astaghfirullah',
        title: 'Estighfar simple',
        arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ',
        transliteration: 'Astaghfirullah al-‘Adhim alladhi la ilaha illa Huwa al-Hayyul-Qayyum wa atubu ilayh.',
        translation_es: 'Pido perdón a Allah el Grandioso, no hay divinidad excepto Él, el Viviente, el Sustentador de todo, y me vuelvo a Él en arrepentimiento.',
        translation_en: 'I seek forgiveness from Allah the Almighty, whom there is none worthy of worship except Him, the Living, the Sustainer, and I repent to Him.',
        translation_ar: 'أستغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه',
        source: 'Sunan Abu Dawud 1517, Sahih al-Tirmidhi',
        repeat: 3,
      },
    ],

    // ============ DISTRESS ============
    distress: [
      {
        id: 'distress_1',
        title: 'Súplica ante la angustia',
        arabic: 'لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ',
        transliteration: 'La ilaha illallah al-‘Adhim al-Halim, la ilaha illallah Rabbul-‘Arshil-‘Adhim, la ilaha illallah Rabbus-samawati wa Rabbul-ardi wa Rabbul-‘Arshil-Karim.',
        translation_es: 'No hay divinidad excepto Allah, el Inmenso, el Indulgente. No hay divinidad excepto Allah, Señor del Trono Magnífico. No hay divinidad excepto Allah, Señor de los cielos, Señor de la tierra y Señor del noble Trono.',
        translation_en: 'None has the right to be worshipped except Allah, the Mighty, the Forbearing. None has the right to be worshipped except Allah, Lord of the Magnificent Throne. None has the right to be worshipped except Allah, Lord of the heavens and Lord of the earth and Lord of the noble Throne.',
        translation_ar: 'لا إله إلا الله العظيم الحليم، لا إله إلا الله رب العرش العظيم...',
        source: 'Sahih Al-Bukhari 6346, Sahih Muslim 2730',
        repeat: 1,
      },
      {
        id: 'distress_2',
        title: 'Hasbiyallahu la ilaha illa Huwa',
        arabic: 'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
        transliteration: 'Hasbiyallahu la ilaha illa Huwa, ‘alayhi tawakkaltu wa Huwa Rabbul-‘Arshil-‘Adhim.',
        translation_es: 'Allah me basta, no hay divinidad excepto Él. En Él confío y Él es el Señor del Trono Magnífico.',
        translation_en: 'Allah is sufficient for me. None has the right to be worshipped except Him. Upon Him I rely, and He is the Lord of the Magnificent Throne.',
        translation_ar: 'حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم',
        source: 'Sunan Abu Dawud 5081',
        repeat: 7,
        virtue: 'Quien la diga siete veces por la mañana y siete veces por la tarde, Allah le será suficiente en lo que le preocupa de este mundo y del más allá.',
      },
    ],

    // ============ MORNING ============
    morning: [
      {
        id: 'morning_ayat_kursi',
        title: 'Ayat al-Kursi',
        arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ',
        transliteration: 'Allahu la ilaha illa Huwa, al-Hayyul-Qayyum, la ta’khudhuhu sinatun wa la nawm...',
        translation_es: 'Allah, no hay divinidad excepto Él, el Viviente, el Sustentador de todo. No se apodera de Él ni somnolencia ni sueño. A Él pertenece cuanto hay en los cielos y cuanto hay en la tierra.',
        translation_en: 'Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness nor sleep overtakes Him. To Him belongs whatever is in the heavens and whatever is on the earth.',
        translation_ar: 'الله لا إله إلا هو الحي القيوم لا تأخذه سنة ولا نوم',
        source: 'Al-Baqarah 2:255 · Sahih recitado en Al-Hakim',
        repeat: 1,
        virtue: 'Quien la recite al amanecer, estará protegido de los jinn hasta la tarde.',
      },
      {
        id: 'morning_asbahna',
        title: 'Asbahna wa asbaha al-mulk lillah',
        arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'Asbahna wa asbaha al-mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa ‘ala kulli shay’in qadir.',
        translation_es: 'Amanecemos y amanece el reino perteneciendo a Allah. Alabanza a Allah. No hay divinidad excepto Allah, Único, sin asociados. Suyo es el reino, suya es la alabanza, y Él tiene poder sobre todas las cosas.',
        translation_en: 'We have reached the morning and at this very time the kingdom belongs to Allah. Praise is due to Allah. None has the right to be worshipped except Allah, alone, without partner. To Him belongs the kingdom and to Him is praise due, and He has power over everything.',
        translation_ar: 'أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له',
        source: 'Sahih Muslim 2723',
        repeat: 1,
      },
    ],

    // ============ EVENING ============
    evening: [
      {
        id: 'evening_amsayna',
        title: 'Amsayna wa amsa al-mulk lillah',
        arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
        transliteration: 'Amsayna wa amsa al-mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la sharika lah.',
        translation_es: 'Anochece y el reino pertenece a Allah. Alabanza a Allah. No hay divinidad excepto Allah, Único, sin asociados.',
        translation_en: 'We have reached the evening and at this very time the kingdom belongs to Allah. Praise is due to Allah. None has the right to be worshipped except Allah, alone, without partner.',
        translation_ar: 'أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له',
        source: 'Sahih Muslim 2723',
        repeat: 1,
      },
    ],

    // ============ SLEEP ============
    sleep: [
      {
        id: 'sleep_bismika',
        title: 'Bismika Rabbi wada‘tu janbi',
        arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',
        transliteration: 'Bismika Rabbi wada‘tu janbi, wa bika arfa‘uhu, fa in amsakta nafsi farhamha, wa in arsaltaha fahfadhha bima tahfadhu bihi ‘ibadakas-salihin.',
        translation_es: 'En Tu nombre, mi Señor, apoyo mi costado, y en Ti lo levantaré. Si retienes mi alma, ten misericordia de ella; y si la dejas ir, protégela como proteges a Tus siervos justos.',
        translation_en: 'In Your name, my Lord, I lay down my side, and in You I raise it. If You take my soul, have mercy upon it; and if You release it, protect it as You protect Your righteous servants.',
        translation_ar: 'باسمك ربي وضعت جنبي وبك أرفعه، فإن أمسكت نفسي فارحمها',
        source: 'Sahih Al-Bukhari 6320, Sahih Muslim 2714',
        repeat: 1,
      },
    ],

    // ============ AFTER PRAYER ============
    after_prayer: [
      {
        id: 'ap_tasbih_33',
        title: 'Tasbih después de la oración (33-33-34)',
        arabic: 'سُبْحَانَ اللَّهِ (٣٣) الْحَمْدُ لِلَّهِ (٣٣) اللَّهُ أَكْبَرُ (٣٤)',
        transliteration: 'SubhanAllah (×33), Alhamdulillah (×33), Allahu Akbar (×34)',
        translation_es: 'Gloria a Allah (×33), Alabanza a Allah (×33), Allah es el más Grande (×34)',
        translation_en: 'Glory be to Allah (×33), Praise be to Allah (×33), Allah is the Greatest (×34)',
        translation_ar: 'سبحان الله (٣٣) الحمد لله (٣٣) الله أكبر (٣٤)',
        source: 'Sahih Muslim 597',
        repeat: 1,
        virtue: 'Sus pecados serán perdonados, aunque fueran como la espuma del mar.',
      },
    ],

    // ============ TRAVEL ============
    travel: [
      {
        id: 'travel_dua',
        title: 'Súplica del viajero',
        arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
        transliteration: 'Subhanalladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina lamunqalibun.',
        translation_es: 'Gloria a Aquel que puso esto a nuestro servicio, cuando no éramos capaces de dominarlo. Y en verdad, a nuestro Señor hemos de retornar.',
        translation_en: 'Glory be to Him who has subjected this to us, and we could never have accomplished this by ourselves. And indeed, to our Lord we shall return.',
        translation_ar: 'سبحان الذي سخر لنا هذا وما كنا له مقرنين وإنا إلى ربنا لمنقلبون',
        source: 'Az-Zukhruf 43:13-14 · Sahih Muslim 1342',
        repeat: 1,
      },
    ],

    // ============ FOOD ============
    food: [
      {
        id: 'food_before',
        title: 'Antes de comer',
        arabic: 'بِسْمِ اللَّهِ',
        transliteration: 'Bismillah',
        translation_es: 'En el nombre de Allah',
        translation_en: 'In the name of Allah',
        translation_ar: 'بسم الله',
        source: 'Sahih Al-Bukhari 5376',
        repeat: 1,
      },
      {
        id: 'food_after',
        title: 'Después de comer',
        arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
        transliteration: 'Alhamdulillah alladhi at‘amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah.',
        translation_es: 'Alabanza a Allah, quien me ha alimentado con esto y me lo ha proporcionado sin poder ni fuerza de mi parte.',
        translation_en: 'Praise be to Allah, Who has fed me this and provided it for me without any might or power on my part.',
        translation_ar: 'الحمد لله الذي أطعمني هذا ورزقنيه من غير حول مني ولا قوة',
        source: 'Sunan Abu Dawud 4023',
        repeat: 1,
        virtue: 'Sus pecados anteriores serán perdonados.',
      },
    ],

    // ============ GRATITUDE ============
    gratitude: [
      {
        id: 'gratitude_1',
        title: 'Súplica de gratitud (favores)',
        arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
        transliteration: 'Allahumma a‘inni ‘ala dhikrika wa shukrika wa husni ‘ibadatik.',
        translation_es: 'Oh Allah, ayúdame a recordarte, agradecerte y adorarte de la mejor manera.',
        translation_en: 'O Allah, help me to remember You, to thank You, and to worship You in the best manner.',
        translation_ar: 'اللهم أعني على ذكرك وشكرك وحسن عبادتك',
        source: 'Sunan Abu Dawud 1522, Sunan An-Nasa\'i 1303',
        repeat: 1,
      },
    ],

    // ============ PROTECTION ============
    protection: [
      {
        id: 'protection_muawwidhat',
        title: 'Las tres suras protectoras (Al-Ikhlas, Al-Falaq, An-Nas)',
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ... قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ... قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        transliteration: 'Qul Huwa Allahu Ahad... Qul a‘udhu bi Rabbi al-Falaq... Qul a‘udhu bi Rabbi an-Nas',
        translation_es: 'Recita las tres últimas suras del Corán (Al-Ikhlas, Al-Falaq, An-Nas). Se recomienda soplarlas sobre las palmas y pasarlas por el cuerpo.',
        translation_en: 'Recite the last three surahs of the Quran (Al-Ikhlas, Al-Falaq, An-Nas). It is recommended to blow them into the palms and wipe over the body.',
        translation_ar: 'قل هو الله أحد، قل أعوذ برب الفلق، قل أعوذ برب الناس',
        source: 'Sahih Al-Bukhari 5017, Sunan Abu Dawud 5056',
        repeat: 3,
        virtue: 'Protección contra todo mal, tanto de día como de noche.',
      },
    ],
  },
};

// API compatibilidad con UmmahAPI (misma estructura para reutilizar código)
const LocalDuasService = {
  async getCategories() {
    return {
      success: true,
      data: LOCAL_DUAS.categories.map(c => {
        const dCount = (LOCAL_DUAS.duas[c.id] || []).length;
        return {
          id: c.id,
          name: c.name_en,
          name_es: c.name_es,
          name_ar: c.name_ar,
          description: c.name_es,
          count: dCount,
          icon: c.icon,
          color: c.color,
        };
      }),
    };
  },

  async getCategory(id, lang = 'es') {
    const cat = LOCAL_DUAS.categories.find(c => c.id === id);
    const duas = LOCAL_DUAS.duas[id] || [];
    return {
      success: true,
      data: duas.map((d, idx) => ({
        id: d.id || `${id}_${idx}`,
        title: d.title,
        arabic: d.arabic,
        transliteration: d.transliteration,
        translation: d[`translation_${lang}`] || d.translation_es,
        source: d.source,
        repeat: d.repeat || 1,
        virtue: d.virtue,
      })),
    };
  },

  getMeta(id) {
    return LOCAL_DUAS.categories.find(c => c.id === id) || null;
  },
};
