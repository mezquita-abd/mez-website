// 📚 Mini-cursos interactivos
const CoursesPage = {
  currentCourse: null,
  currentLesson: 0,
  completedLessons: [],

  COURSES: [
    { id: 'how_to_pray', data: () => COURSE_HOW_TO_PRAY },
    { id: 'pillars', data: () => COURSE_PILLARS },
    { id: 'names_of_allah', data: () => COURSE_NAMES },
  ],

  renderHub(container) {
    const completed = Gamification.getState().stats.coursesCompleted;

    container.innerHTML = `
      <div class="top-bar">
        <button class="top-bar-btn" onclick="Router.go('wisdom')">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title">📚 Mini-cursos</div>
        <div style="width: 30px;"></div>
      </div>

      <div style="padding: var(--sp-md);">
        <p class="courses-intro">Lecciones cortas e interactivas para aprender el Islam paso a paso.</p>

        ${this.COURSES.map(courseRef => {
          const course = courseRef.data();
          const isCompleted = completed.includes(course.id);
          const lessonCount = course.lessons ? course.lessons.length : (course.names ? 1 : 0);
          return `
            <div class="course-card" style="background: linear-gradient(135deg, ${course.color}, ${course.color}aa);" onclick="Router.go('wisdom', { subpage: 'course_view', courseId: '${course.id}' })">
              <div class="course-icon">${course.icon}</div>
              <div class="course-info">
                <div class="course-title">${course.title} ${isCompleted ? '✓' : ''}</div>
                <div class="course-desc">${course.description}</div>
                <div class="course-meta">
                  <span>📖 ${lessonCount} ${lessonCount === 1 ? 'sección' : 'lecciones'}</span>
                  <span>⏱️ ${course.duration}</span>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  renderCourse(container, courseId) {
    const courseRef = this.COURSES.find(c => c.id === courseId);
    if (!courseRef) return;

    const course = courseRef.data();
    this.currentCourse = course;

    if (course.id === 'names_of_allah') {
      this.renderNamesList(container, course);
      return;
    }

    this.currentLesson = 0;
    this.completedLessons = [];
    this.renderLesson(container, course, 0);
  },

  renderLesson(container, course, lessonIdx) {
    const lesson = course.lessons[lessonIdx];
    const isLast = lessonIdx === course.lessons.length - 1;
    const progress = ((lessonIdx + 1) / course.lessons.length) * 100;

    container.innerHTML = `
      <div class="top-bar">
        <button class="top-bar-btn" onclick="Router.go('wisdom', { subpage: 'courses' })">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title">${course.icon} ${course.title}</div>
        <div style="width: 30px;"></div>
      </div>

      <div class="course-progress-container">
        <div class="course-progress-bar">
          <div class="course-progress-fill" style="width: ${progress}%"></div>
        </div>
        <div class="course-progress-text">Lección ${lessonIdx + 1} de ${course.lessons.length}</div>
      </div>

      <div class="lesson-container">
        <h2 class="lesson-title">${lesson.title}</h2>

        <div class="lesson-content">${lesson.content}</div>

        ${lesson.tip ? `
          <div class="lesson-tip">
            <strong>💡 Tip:</strong> ${lesson.tip}
          </div>
        ` : ''}

        <div class="lesson-nav">
          ${lessonIdx > 0 ? `
            <button class="btn-ghost" onclick="CoursesPage.goToLesson(${lessonIdx - 1})">
              <i class="fas fa-chevron-left"></i> Anterior
            </button>
          ` : '<div></div>'}

          ${isLast ? `
            <button class="btn-primary" onclick="CoursesPage.completeCourse()">
              🎉 Completar curso
            </button>
          ` : `
            <button class="btn-primary" onclick="CoursesPage.goToLesson(${lessonIdx + 1})">
              Siguiente <i class="fas fa-chevron-right"></i>
            </button>
          `}
        </div>
      </div>
    `;

    if (!this.completedLessons.includes(lessonIdx)) {
      this.completedLessons.push(lessonIdx);
      Gamification.addXP(Gamification.XP_PER_LESSON);
    }
  },

  goToLesson(idx) {
    this.currentLesson = idx;
    this.renderLesson(document.getElementById('main-content'), this.currentCourse, idx);
    document.getElementById('main-content').scrollTop = 0;
  },

  completeCourse() {
    if (!this.currentCourse) return;
    Gamification.addXP(50);
    Gamification.recordCourseCompleted(this.currentCourse.id);
    showToast(`🎓 ¡Curso completado! +50 XP de bonus`, 3000);
    setTimeout(() => Router.go('wisdom', { subpage: 'courses' }), 1500);
  },

  renderNamesList(container, course) {
    container.innerHTML = `
      <div class="top-bar">
        <button class="top-bar-btn" onclick="Router.go('wisdom', { subpage: 'courses' })">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title">${course.icon} 99 Nombres</div>
        <div style="width: 30px;"></div>
      </div>

      <div class="names-container">
        <div class="card-gradient" style="margin: var(--sp-md);">
          ${course.intro}
        </div>

        <div class="names-grid">
          ${course.names.map((name, idx) => `
            <div class="name-card" onclick="CoursesPage.showNameDetail(${idx})">
              <div class="name-number">${idx + 1}</div>
              <div class="name-arabic">${name.ar}</div>
              <div class="name-tr">${name.tr}</div>
              <div class="name-es">${name.es}</div>
            </div>
          `).join('')}
        </div>

        <div style="padding: var(--sp-md);">
          <button class="btn-primary" style="width: 100%;" onclick="CoursesPage.completeCourseList('${course.id}')">
            ✓ Marcar como completado
          </button>
        </div>
      </div>
    `;
  },

  showNameDetail(idx) {
    const course = COURSE_NAMES;
    const name = course.names[idx];
    const html = `
      <div class="modal-header">
        <div class="modal-title">${idx + 1}. ${name.tr}</div>
        <button class="modal-close" onclick="closeModal()">×</button>
      </div>
      <div style="text-align:center; padding: 16px 0;">
        <div style="font-family: var(--font-arabic); font-size: 42px; color: var(--primary); margin-bottom: 12px;">${name.ar}</div>
        <div style="font-size: 18px; color: var(--accent); font-weight: 700; margin-bottom: 8px;">${name.es}</div>
        <div style="font-size: 14px; line-height: 1.5; color: var(--text-secondary); padding: 0 12px;">${name.meaning}</div>
      </div>
    `;
    document.getElementById('modal-content').innerHTML = html;
    document.getElementById('modal-overlay').classList.remove('hidden');
  },

  completeCourseList(courseId) {
    Gamification.addXP(50);
    Gamification.recordCourseCompleted(courseId);
    showToast(`🎓 ¡99 Nombres completado! +50 XP`, 3000);
    setTimeout(() => Router.go('wisdom', { subpage: 'courses' }), 1500);
  },

  cleanup() {},
};
