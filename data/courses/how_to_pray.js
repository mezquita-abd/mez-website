// 📚 Mini-curso: Cómo rezar paso a paso
const COURSE_HOW_TO_PRAY = {
  id: 'how_to_pray',
  title: 'Cómo rezar paso a paso',
  description: 'Aprende a realizar la oración (salat) correctamente desde cero.',
  icon: '🕌',
  color: '#0F4C3A',
  duration: '15 min',
  lessons: [
    {
      id: 'lesson_1',
      title: '1. Preparación: Wudu (Ablución)',
      content: `<p>Antes de orar, realiza el <strong>wudu</strong> (ablución):</p>
<ol>
  <li>Di "Bismillah" e intenta la pureza con el corazón.</li>
  <li>Lava las <strong>manos</strong> 3 veces (hasta las muñecas).</li>
  <li>Enjuaga la <strong>boca</strong> 3 veces.</li>
  <li>Inhala agua por la <strong>nariz</strong> y sopla 3 veces.</li>
  <li>Lava la <strong>cara</strong> 3 veces.</li>
  <li>Lava los <strong>brazos</strong> hasta los codos (derecho luego izquierdo), 3 veces cada uno.</li>
  <li>Pasa las manos mojadas por la <strong>cabeza</strong> una vez.</li>
  <li>Limpia las <strong>orejas</strong> con los dedos índices y pulgares.</li>
  <li>Lava los <strong>pies</strong> hasta los tobillos (derecho luego izquierdo), 3 veces.</li>
</ol>
<p>💡 El wudu se mantiene válido hasta que algo lo invalida (orinar, defecar, gases, sueño profundo, etc.).</p>`,
      tip: 'Hadiz: "La limpieza es la mitad de la fe" (Muslim).',
    },
    {
      id: 'lesson_2',
      title: '2. Niyyah (Intención) y Takbir',
      content: `<p>Antes de empezar:</p>
<ul>
  <li>Verifica que estás <strong>en dirección a la Qibla</strong> (La Meca).</li>
  <li>Cubre tu \'awrah (partes íntimas).</li>
  <li>Haz la <strong>niyyah</strong> en tu corazón: "Voy a rezar [Fajr/Dhuhr/etc.]"</li>
  <li>Levanta las manos hasta las orejas/hombros y di:</li>
</ul>
<p class="arabic-block">اللَّهُ أَكْبَرُ</p>
<p><em>Allahu Akbar</em> — "Allah es el más Grande"</p>
<p>Esto se llama <strong>Takbir al-Ihram</strong> y marca el inicio formal de la oración.</p>`,
      tip: 'Desde este momento, no hables ni hagas movimientos innecesarios.',
    },
    {
      id: 'lesson_3',
      title: '3. Qiyam (De pie): Al-Fatihah',
      content: `<p>Coloca la mano derecha sobre la izquierda sobre el pecho. Recita:</p>
<p class="arabic-block">سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ</p>
<p><em>Subhanaka Allahumma...</em> (Du\'a al-Istiftah)</p>
<p>Luego recita <strong>Al-Fatihah</strong>:</p>
<p class="arabic-block">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ • الرَّحْمَٰنِ الرَّحِيمِ • مَالِكِ يَوْمِ الدِّينِ • إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ • اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ • صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ</p>
<p>Di "Ameen" al terminar. Luego recita una sura corta (en los 2 primeros rak\'ah).</p>`,
      tip: 'Al-Fatihah se recita en TODOS los rak\'ahs. Es obligatoria.',
    },
    {
      id: 'lesson_4',
      title: '4. Ruku (Inclinación)',
      content: `<p>Di "Allahu Akbar" y inclínate poniendo las manos sobre las rodillas. Espalda recta, paralela al suelo.</p>
<p>Repite 3 veces:</p>
<p class="arabic-block">سُبْحَانَ رَبِّيَ الْعَظِيمِ</p>
<p><em>Subhana Rabbiya al-\'Adheem</em> — "Glorificado sea mi Señor, el Grandioso"</p>
<p>Luego levántate diciendo:</p>
<p class="arabic-block">سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ</p>
<p><em>Sami\' Allahu liman hamidah</em> — "Allah escucha a quien Le alaba"</p>
<p>Una vez de pie, di:</p>
<p class="arabic-block">رَبَّنَا وَلَكَ الْحَمْدُ</p>
<p><em>Rabbana wa laka-l-hamd</em> — "Señor nuestro, Tuya es la alabanza"</p>`,
      tip: 'Mantén la cabeza al nivel de la espalda, sin levantarla ni bajarla.',
    },
    {
      id: 'lesson_5',
      title: '5. Sujud (Postración)',
      content: `<p>Di "Allahu Akbar" y postérnate, apoyando 7 partes del cuerpo en el suelo:</p>
<ol>
  <li><strong>Frente y nariz</strong></li>
  <li><strong>Ambas palmas de las manos</strong></li>
  <li><strong>Ambas rodillas</strong></li>
  <li><strong>Ambos pies</strong> (puntas tocando el suelo)</li>
</ol>
<p>Repite 3 veces:</p>
<p class="arabic-block">سُبْحَانَ رَبِّيَ الْأَعْلَى</p>
<p><em>Subhana Rabbiya al-A\'la</em> — "Glorificado sea mi Señor, el Altísimo"</p>
<p>Luego siéntate brevemente (jalsa), di "Allahu Akbar", y haz una <strong>segunda postración</strong> igual.</p>`,
      tip: 'La postración es el momento más cercano a Allah. Aprovecha para pedir.',
    },
    {
      id: 'lesson_6',
      title: '6. Continuar los rak\'ah',
      content: `<p>Esto completa <strong>1 rak\'ah</strong>. Cada oración tiene un número específico:</p>
<table class="prayer-rakat-table">
  <tr><th>Oración</th><th>Rak\'ahs obligatorios</th></tr>
  <tr><td>Fajr</td><td>2</td></tr>
  <tr><td>Dhuhr</td><td>4</td></tr>
  <tr><td>Asr</td><td>4</td></tr>
  <tr><td>Maghrib</td><td>3</td></tr>
  <tr><td>Isha</td><td>4</td></tr>
</table>
<p>En cada rak\'ah, después de los 2 sujud, te levantas para empezar el siguiente.</p>
<p>Tras el 2° rak\'ah (y el último), te sientas para el <strong>tashahhud</strong>.</p>`,
      tip: 'Sigue el orden: Qiyam → Ruku → 2 Sujud → siguiente rak\'ah.',
    },
    {
      id: 'lesson_7',
      title: '7. Tashahhud y Taslim (Final)',
      content: `<p>Después del último sujud, te sientas y dices el <strong>Tashahhud</strong>:</p>
<p class="arabic-block">التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ</p>
<p>Luego añade el <strong>Salat Ibrahimiyyah</strong>:</p>
<p class="arabic-block">اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ...</p>
<p>Finalmente, gira la cabeza a la <strong>derecha</strong> y di:</p>
<p class="arabic-block">السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ</p>
<p>Luego a la <strong>izquierda</strong> y repite. ¡Tu oración está completa! 🎉</p>`,
      tip: 'Después de la oración, haz dhikr (Subhanallah 33, Alhamdulillah 33, Allahu Akbar 33).',
    },
  ],
};
