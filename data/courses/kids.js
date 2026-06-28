// 👶 Kids course (5-12 years) — Simple, illustrated, fun
const COURSE_KIDS = {
  id: 'kids',
  icon: '🧒',
  mascotPose: 'welcome',
  color: '#FF7043',
  ageGroup: 'kids',
  durationMin: 15,
  difficulty: 'easy',
  title: { es: 'Islam para Pequeños', ar: 'الإسلام للصغار', en: 'Islam for Kids' },
  description: {
    es: '¡Aprende sobre Allah y el Profeta ﷺ con historias divertidas!',
    ar: 'تعلّم عن الله والنبي ﷺ بقصص ممتعة!',
    en: 'Learn about Allah and the Prophet ﷺ with fun stories!',
  },
  stations: [
    {
      id: 'who_is_allah',
      icon: '🌟',
      title: { es: '¿Quién es Allah?', ar: 'من هو الله؟', en: 'Who is Allah?' },
      mascotIntro: { es: '¡Hola pequeño amigo! Vamos a aprender juntos.', ar: 'مرحباً يا صغيري! تعالَ نتعلّم معاً.', en: 'Hello little friend! Let\'s learn together.' },
      lessons: [
        {
          type: 'card',
          title: { es: 'Allah es Uno', ar: 'الله واحد', en: 'Allah is One' },
          content: {
            es: '🌟 Allah es Nuestro Creador. Él creó el sol, la luna, las estrellas, los árboles, los animales y a ti también. Allah es Uno, no tiene padre ni hijos. Él nos ama mucho.',
            ar: '🌟 الله هو خالقنا. هو الذي خلق الشمس والقمر والنجوم والشجر والحيوانات وأنتَ كذلك. الله واحد، ليس له والد ولا أبناء. يحبنا كثيراً.',
            en: '🌟 Allah is Our Creator. He created the sun, moon, stars, trees, animals — and you too! Allah is One. He has no father, no children. He loves us very much.',
          },
          source: 'Quran 112:1-4 (Al-Ikhlas)',
        },
        {
          type: 'quiz',
          question: { es: '¿Cuántos Allah hay?', ar: 'كم عدد الإله؟', en: 'How many Allahs are there?' },
          options: ['1', '2', '3', 'Muchos'],
          correct: 0,
          feedback: { es: '¡Sí! Allah es Uno. 🌟', ar: 'نعم! الله واحد. 🌟', en: 'Yes! Allah is One. 🌟' },
        },
      ],
    },
    {
      id: 'the_prophet',
      icon: '🕌',
      title: { es: 'Nuestro Profeta ﷺ', ar: 'نبيّنا ﷺ', en: 'Our Prophet ﷺ' },
      mascotIntro: { es: 'El Profeta Muhammad ﷺ era el mejor amigo de Allah.', ar: 'النبي محمد ﷺ كان أحبّ الناس إلى الله.', en: 'Prophet Muhammad ﷺ was Allah\'s most beloved.' },
      lessons: [
        {
          type: 'card',
          title: { es: 'El Profeta amaba a los niños', ar: 'النبي ﷺ يحبّ الأطفال', en: 'The Prophet loved children' },
          content: {
            es: '👶 El Profeta Muhammad ﷺ jugaba con los niños, los abrazaba y les sonreía. Decía: "No es de los nuestros quien no es misericordioso con nuestros pequeños."',
            ar: '👶 كان النبي ﷺ يلعب مع الأطفال ويعانقهم ويبتسم لهم. قال: "ليس منا من لم يرحم صغيرنا."',
            en: '👶 Prophet Muhammad ﷺ played with children, hugged them, and smiled at them. He said: "He is not of us who does not show mercy to our young."',
          },
          source: 'Sunan Abu Dawud 4943',
        },
        {
          type: 'quiz',
          question: { es: '¿Cómo trataba el Profeta ﷺ a los niños?', ar: 'كيف كان النبي ﷺ يعامل الأطفال؟', en: 'How did the Prophet ﷺ treat children?' },
          options: [
            { es: 'Con amor y sonrisas', ar: 'بالحبّ والابتسامة', en: 'With love and smiles' },
            { es: 'Los ignoraba', ar: 'كان يتجاهلهم', en: 'Ignored them' },
            { es: 'Solo hablaba con adultos', ar: 'كان يتكلم مع الكبار فقط', en: 'Talked only to adults' },
          ],
          correct: 0,
          feedback: { es: '¡Correcto! 💝 El Profeta amaba mucho a los niños.', ar: 'صحيح! 💝 كان النبي يحبّ الأطفال.', en: 'Correct! 💝 The Prophet loved children dearly.' },
        },
      ],
    },
    {
      id: 'good_manners',
      icon: '🌸',
      title: { es: 'Buenos Modales', ar: 'الأخلاق الحسنة', en: 'Good Manners' },
      mascotIntro: { es: '¿Sabías que decir Salam es como regalar flores?', ar: 'هل تعلم أن السلام كالهدية؟', en: 'Did you know saying Salam is like giving a gift?' },
      lessons: [
        {
          type: 'card',
          title: { es: 'Di siempre Bismillah 🍎', ar: 'قُل بسم الله 🍎', en: 'Always say Bismillah 🍎' },
          content: {
            es: 'Antes de comer: 🍎 Bismillah ("En el nombre de Allah").\nDespués: 🤲 Alhamdulillah ("Gracias a Allah").\nAl saludar: 👋 As-salamu alaykum ("La paz sea contigo").',
            ar: 'قبل الأكل: 🍎 بسم الله.\nبعد الأكل: 🤲 الحمد لله.\nعند السلام: 👋 السلام عليكم.',
            en: 'Before eating: 🍎 Bismillah ("In Allah\'s name").\nAfter eating: 🤲 Alhamdulillah ("Praise be to Allah").\nWhen greeting: 👋 As-salamu alaykum ("Peace be upon you").',
          },
          source: 'Sahih al-Bukhari 5376',
        },
        {
          type: 'flashcards',
          title: { es: 'Aprende estas palabras', ar: 'تعلّم هذه الكلمات', en: 'Learn these words' },
          cards: [
            { front: '🍎', back: { es: 'Bismillah', ar: 'بسم الله', en: 'Bismillah' } },
            { front: '🤲', back: { es: 'Alhamdulillah', ar: 'الحمد لله', en: 'Alhamdulillah' } },
            { front: '👋', back: { es: 'As-salamu alaykum', ar: 'السلام عليكم', en: 'As-salamu alaykum' } },
            { front: '🙏', back: { es: 'Subhan Allah', ar: 'سبحان الله', en: 'Subhan Allah' } },
          ],
        },
      ],
    },
  ],
};

if (typeof window !== 'undefined') window.COURSE_KIDS = COURSE_KIDS;
