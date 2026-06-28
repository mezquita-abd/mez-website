// 📚 Cursos Interactivos — Self-contained, with mascot guide, gamification, certificates
const CoursesPage = {
  state: null, // current lesson playing state

  // Auto-registers all loaded COURSE_* globals
  getAllCourses() {
    const courses = [];
    if (typeof COURSE_JOURNEY !== 'undefined') courses.push(COURSE_JOURNEY);
    if (typeof COURSE_KIDS !== 'undefined') courses.push(COURSE_KIDS);
    if (typeof COURSE_QURAN_BASICS !== 'undefined') courses.push(COURSE_QURAN_BASICS);
    if (typeof COURSE_FIQH_SALAH !== 'undefined') courses.push(COURSE_FIQH_SALAH);
    return courses;
  },

  // ============ HUB ============
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
    // Show course in progress (or the first incomplete one)
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

  // ============ COURSE OVERVIEW ============
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

  // ============ LESSON PLAYBACK ============
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
      // Station complete!
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

    // Init drag-drop if needed
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
      default: return `<div>Unknown lesson type</div>`;
    }
  },

  // ----- Card lesson -----
  renderCardLesson(lesson, lang) {
    const title = lesson.title[lang] || lesson.title.es;
    const content = lesson.content[lang] || lesson.content.es;

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
    // Convert newlines to <br> and preserve emojis
    return text.split('\n').map(line => `<p>${line.trim()}</p>`).join('');
  },

  // ----- Quiz lesson -----
  renderQuizLesson(lesson, lang) {
    const question = typeof lesson.question === 'object' ? (lesson.question[lang] || lesson.question.es) : lesson.question;
    const options = lesson.options.map(opt => typeof opt === 'object' ? (opt[lang] || opt.es) : opt);

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
    const feedback = typeof lesson.feedback === 'object' ? (lesson.feedback[lang] || lesson.feedback.es) : lesson.feedback;

    // Disable all options & mark
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

    // Inject feedback bubble + continue button
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

  // ----- Flashcards -----
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

  // ----- Drag & Drop -----
  renderDragDrop(lesson, lang) {
    const title = lesson.title[lang] || lesson.title.es;
    const instruction = lesson.instruction[lang] || lesson.instruction.es;
    // Shuffle items for the puzzle
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

    // Touch support (basic)
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

  // Advance to next lesson
  advance() {
    Gamification.addXP(Gamification.XP_PER_LESSON || 25);
    // Save progress
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

  // ============ STATION COMPLETE ============
  completeStation(container) {
    const { course, station, correctAnswers, wrongAnswers } = this.state;
    const lang = currentLocale === 'ar' ? 'ar' : (currentLocale === 'en' ? 'en' : 'es');

    // Mark station done & award bonus XP
    const gameState = Gamification.getState();
    if (!gameState.stats.coursesProgress) gameState.stats.coursesProgress = {};
    if (!gameState.stats.coursesProgress[course.id]) {
      gameState.stats.coursesProgress[course.id] = { completedLessons: 0, completedStations: [] };
    }
    const prog = gameState.stats.coursesProgress[course.id];
    if (!prog.completedStations.includes(station.id)) {
      prog.completedStations.push(station.id);
    }

    // Check if course is now fully complete
    const allStationsDone = course.stations.every(s => prog.completedStations.includes(s.id));
    let courseJustCompleted = false;
    if (allStationsDone && !gameState.stats.coursesCompleted.includes(course.id)) {
      gameState.stats.coursesCompleted.push(course.id);
      courseJustCompleted = true;
      Gamification.addXP(100); // course completion bonus
    }
    Gamification.saveState(gameState);

    // Render completion screen
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
    const userName = AppState.userName || (currentLocale === 'ar' ? 'الطالب' : (currentLocale === 'en' ? 'Student' : 'Estudiante'));
    const date = new Date().toLocaleDateString(currentLocale === 'ar' ? 'ar-EG' : currentLocale);
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
          <div class="cert-name">${userName}</div>
          <div class="cert-completed">${t('hasCompleted') || 'ha completado el curso'}:</div>
          <div class="cert-course-name">${course.icon} ${course.title[lang] || course.title.es}</div>
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
