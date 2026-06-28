// 📚 Mini-curso: Los 5 Pilares del Islam
const COURSE_PILLARS = {
  id: 'pillars',
  title: 'Los 5 Pilares del Islam',
  description: 'Los cimientos fundamentales sobre los que se sustenta el Islam.',
  icon: '🕌',
  color: '#D4AF37',
  duration: '10 min',
  lessons: [
    {
      id: 'intro',
      title: 'Introducción: ¿Qué son los Arkan?',
      content: `<p>El Profeta Muhammad ﷺ dijo:</p>
<blockquote>"El Islam se construye sobre cinco: el testimonio de que no hay dios sino Allah y que Muhammad es Su mensajero, establecer la oración, pagar el zakat, peregrinar a la Casa, y ayunar en Ramadán."</blockquote>
<p class="source">— Bukhari y Muslim</p>
<p>Estos 5 pilares (Arkan al-Islam) son obligatorios para todo musulmán capaz.</p>`,
      tip: 'Sin estos pilares, el edificio del Islam no se sostiene.',
    },
    {
      id: 'shahada',
      title: '1. Shahada (Testimonio de fe)',
      content: `<p class="arabic-block">أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ</p>
<p><em>"Ash-hadu an la ilaha illa Allah, wa ash-hadu anna Muhammadan rasul Allah"</em></p>
<p>"Atestiguo que no hay divinidad sino Allah, y atestiguo que Muhammad es el mensajero de Allah."</p>
<p><strong>Significado:</strong></p>
<ul>
  <li><strong>"La ilaha illa Allah"</strong>: Solo Allah merece ser adorado (Tawhid).</li>
  <li><strong>"Muhammad rasul Allah"</strong>: Aceptar al Profeta ﷺ y seguir su Sunnah.</li>
</ul>
<p>Pronunciarla con sinceridad es lo que convierte a una persona en musulmán.</p>`,
      tip: 'Es el primer pilar y la "puerta" del Islam.',
    },
    {
      id: 'salah',
      title: '2. Salat (Oración)',
      content: `<p>Las 5 oraciones diarias son obligatorias para todo musulmán adulto y sano:</p>
<table class="prayer-rakat-table">
  <tr><th>Oración</th><th>Tiempo</th><th>Rak\'ah</th></tr>
  <tr><td>🌅 Fajr</td><td>Antes del amanecer</td><td>2</td></tr>
  <tr><td>🌞 Dhuhr</td><td>Mediodía</td><td>4</td></tr>
  <tr><td>🌤️ Asr</td><td>Tarde</td><td>4</td></tr>
  <tr><td>🌇 Maghrib</td><td>Puesta del sol</td><td>3</td></tr>
  <tr><td>🌙 Isha</td><td>Noche</td><td>4</td></tr>
</table>
<p><strong>Importancia:</strong></p>
<ul>
  <li>Es el primer asunto sobre el que se juzgará al siervo en el Día del Juicio.</li>
  <li>Es la <strong>línea divisoria</strong> entre el musulmán y el incrédulo (hadiz).</li>
  <li>Es el segundo pilar y el más constante en la vida del creyente.</li>
</ul>`,
      tip: 'Aprende los detalles en el curso "Cómo rezar paso a paso".',
    },
    {
      id: 'zakat',
      title: '3. Zakat (Caridad obligatoria)',
      content: `<p>El zakat es la <strong>purificación de la riqueza</strong>. Cada musulmán que tenga un patrimonio mínimo (nisab) durante un año lunar completo, debe dar:</p>
<p class="highlight-box">📊 <strong>2.5% de su patrimonio acumulado</strong> a quienes lo necesitan.</p>
<p><strong>¿Quiénes son los beneficiarios?</strong> El Corán menciona 8 categorías (At-Tawbah 60):</p>
<ol>
  <li>Los pobres (fuqara)</li>
  <li>Los necesitados (masakin)</li>
  <li>Los recaudadores del zakat</li>
  <li>Los conversos al Islam (mu\'allafa qulubuhum)</li>
  <li>Los esclavos (para liberarlos)</li>
  <li>Los endeudados (gharimin)</li>
  <li>En el camino de Allah (fi sabilillah)</li>
  <li>El viajero necesitado (ibn as-sabil)</li>
</ol>
<p>Hay también el <strong>Zakat al-Fitr</strong>: ~2.5 kg de comida básica antes de la oración del Eid al-Fitr.</p>`,
      tip: 'Zakat no es solo caridad, es un derecho del pobre sobre el rico.',
    },
    {
      id: 'sawm',
      title: '4. Sawm (Ayuno de Ramadán)',
      content: `<p>Durante el mes lunar de <strong>Ramadán</strong>, todo musulmán adulto sano ayuna:</p>
<ul>
  <li>📵 Desde la entrada de <strong>Fajr</strong> hasta la puesta del sol (<strong>Maghrib</strong>).</li>
  <li>🚫 Se abstiene de: comida, bebida, relaciones íntimas, fumar, malas palabras.</li>
  <li>✅ Se enfoca en: lectura del Corán, oración, caridad, dhikr.</li>
</ul>
<p><strong>Quienes están exentos:</strong></p>
<ul>
  <li>Niños prepúberes</li>
  <li>Enfermos</li>
  <li>Viajeros</li>
  <li>Mujeres en menstruación o postparto</li>
  <li>Ancianos incapacitados</li>
  <li>Embarazadas/lactantes (con condiciones)</li>
</ul>
<p>📖 Allah dice: <em>"¡Creyentes! Se os ha prescrito el ayuno, al igual que se prescribió a los que os precedieron." (Al-Baqarah 183)</em></p>
<p><strong>Recompensa especial:</strong> La <strong>Laylat al-Qadr</strong> (Noche del Decreto) en las últimas 10 noches equivale a más de 1,000 meses de adoración.</p>`,
      tip: 'El ayuno enseña paciencia, gratitud y empatía con los pobres.',
    },
    {
      id: 'hajj',
      title: '5. Hajj (Peregrinación a La Meca)',
      content: `<p>El Hajj es la peregrinación a la <strong>Ka\'aba</strong> en La Meca, obligatorio <strong>una vez en la vida</strong> para quien tenga los medios físicos y económicos.</p>
<p>Se realiza en el mes de <strong>Dhul-Hijjah</strong> (12° mes hijri), específicamente del día 8 al 13.</p>
<p><strong>Rituales principales:</strong></p>
<ol>
  <li><strong>Ihram</strong>: Vestido especial blanco + intención de Hajj.</li>
  <li><strong>Tawaf</strong>: 7 vueltas alrededor de la Ka\'aba.</li>
  <li><strong>Sa\'i</strong>: Caminar/correr 7 veces entre Safa y Marwa.</li>
  <li><strong>Día de Arafa</strong> (9 Dhul-Hijjah): El pilar principal del Hajj, en la llanura de Arafat.</li>
  <li><strong>Muzdalifah</strong>: Noche al aire libre, recoger piedras.</li>
  <li><strong>Lapidación de los pilares</strong> (Jamarat) en Mina.</li>
  <li><strong>Sacrificio del animal</strong> (Eid al-Adha).</li>
  <li><strong>Rasurar o cortar el cabello.</strong></li>
  <li><strong>Tawaf de despedida.</strong></li>
</ol>
<p>📖 <em>"Quien peregrine sin obrar el mal ni cometer faltas, vuelve [puro] como el día que su madre lo dio a luz."</em> — Bukhari</p>`,
      tip: 'El Hajj es la mayor reunión humana del año (~2 millones de personas).',
    },
    {
      id: 'conclusion',
      title: 'Conclusión',
      content: `<p>Los 5 pilares forman la <strong>estructura fundamental</strong> del Islam:</p>
<ol>
  <li>📖 <strong>Shahada</strong> — La fundación</li>
  <li>🕌 <strong>Salat</strong> — La columna diaria</li>
  <li>💰 <strong>Zakat</strong> — La purificación social</li>
  <li>🌙 <strong>Sawm</strong> — La disciplina espiritual</li>
  <li>🕋 <strong>Hajj</strong> — La unión de la ummah</li>
</ol>
<p>Cada pilar fortalece tu relación con Allah, contigo mismo y con la comunidad.</p>
<p><strong>¡MashaAllah! Has completado este curso. 🎉</strong></p>`,
      tip: 'El Islam también incluye Iman (creencia) e Ihsan (excelencia). Los 5 pilares son la base externa.',
    },
  ],
};
