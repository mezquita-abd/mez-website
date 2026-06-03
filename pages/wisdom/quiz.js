// 🧠 Quiz gamificado
const QuizPage = {
  state: null,

  CATEGORIES: [
    { id: 'quran', name: 'Corán y Tafsir', icon: '📖', data: () => QUIZ_QURAN, color: '#0F4C3A' },
    { id: 'sira', name: 'Vida del Profeta ﷺ', icon: '🕋', data: () => QUIZ_SIRA, color: '#D4AF37' },
    { id: 'hadith', name: 'Hadices', icon: '📜', data: () => QUIZ_HADITH, color: '#1A6B52' },
    { id: 'fiqh', name: 'Fiqh básico', icon: '⚖️', data: () => QUIZ_FIQH, color: '#8E6E1E' },
    { id: 'history', name: 'Historia islámica', icon: '🌙', data: () => QUIZ_HISTORY, color: '#4A6FA5' },
    { id: 'prophets', name: 'Profetas', icon: '👨', data: () => QUIZ_PROPHETS, color: '#6A4E8F' },
  ],

  renderCategorySelect(container) {
    const gameState = Gamification.getState();

    container.innerHTML = `
      <div class="top-bar">
        <button class="top-bar-btn" onclick="Router.go('wisdom')">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title">🧠 Categorías</div>
        <div style="width: 30px;"></div>
      </div>

      <div style="padding: var(--sp-md);">
        <p class="quiz-intro">Elige una categoría. Cada quiz: <strong>10 preguntas</strong>. Gana XP por cada respuesta correcta.</p>

        ${this.CATEGORIES.map(cat => {
          const stat = gameState.stats.categoryStats[cat.id] || { correct: 0, total: 0 };
          const accuracy = stat.total > 0 ? Math.round(stat.correct / stat.total * 100) : 0;
          return `
            <div class="category-card" style="border-left: 4px solid ${cat.color};" onclick="Router.go('wisdom', { subpage: 'quiz_play', category: '${cat.id}' })">
              <div class="cat-icon" style="background: ${cat.color}22;">${cat.icon}</div>
              <div class="cat-info">
                <div class="cat-name">${cat.name}</div>
                <div class="cat-stats">${cat.data().length} preguntas · ${stat.correct}/${stat.total} correctas · ${accuracy}%</div>
              </div>
              <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'}" style="color: var(--text-secondary);"></i>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  renderQuiz(container, categoryId) {
    const category = this.CATEGORIES.find(c => c.id === categoryId);
    if (!category) return;

    const lives = Gamification.getLives();
    if (lives === 0) {
      const timeUntil = Gamification.timeUntilNextLife();
      const min = Math.ceil(timeUntil / 60000);
      container.innerHTML = `
        <div class="top-bar">
          <button class="top-bar-btn" onclick="Router.go('wisdom')">
            <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
          </button>
          <div class="top-bar-title">Sin vidas</div>
          <div style="width: 30px;"></div>
        </div>
        <div class="no-lives">
          <div class="no-lives-icon">💔</div>
          <div class="no-lives-title">¡Sin vidas!</div>
          <div class="no-lives-desc">Las vidas se regeneran solas. Espera <strong>${min} minutos</strong> para la próxima.</div>
          <button class="btn-primary" onclick="Router.go('wisdom')">Volver</button>
        </div>
      `;
      return;
    }

    const allQuestions = category.data();
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(10, shuffled.length));

    this.state = {
      category: category.id,
      categoryName: category.name,
      questions: selected,
      current: 0,
      correct: 0,
      wrong: 0,
      streakBonus: 0,
      currentStreak: 0,
      totalXpEarned: 0,
      answers: [],
    };

    this.renderQuestion(container);
  },

  renderQuestion(container) {
    const s = this.state;
    if (s.current >= s.questions.length) {
      this.finishQuiz(container);
      return;
    }

    const q = s.questions[s.current];
    const progress = ((s.current) / s.questions.length) * 100;
    const lives = Gamification.getLives();

    container.innerHTML = `
      <div class="quiz-header">
        <button class="quiz-close" onclick="QuizPage.confirmExit()">
          <i class="fas fa-times"></i>
        </button>
        <div class="quiz-progress">
          <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" style="width: ${progress}%"></div>
          </div>
          <div class="quiz-progress-text">${s.current + 1} / ${s.questions.length}</div>
        </div>
        <div class="quiz-lives">${Array(Gamification.MAX_LIVES).fill(0).map((_, i) => i < lives ? '❤️' : '🤍').join('')}</div>
      </div>

      <div class="quiz-content">
        <div class="quiz-question-num">Pregunta ${s.current + 1}</div>
        <div class="quiz-question">${q.q}</div>

        <div class="quiz-options" id="quiz-options">
          ${q.options.map((opt, idx) => `
            <button class="quiz-option" data-idx="${idx}" onclick="QuizPage.selectAnswer(${idx})">
              <span class="option-letter">${['A', 'B', 'C', 'D'][idx]}</span>
              <span class="option-text">${opt}</span>
            </button>
          `).join('')}
        </div>

        ${s.currentStreak > 0 ? `<div class="streak-indicator">🔥 Racha: ${s.currentStreak}</div>` : ''}
      </div>
    `;
  },

  selectAnswer(idx) {
    const s = this.state;
    const q = s.questions[s.current];
    const isCorrect = idx === q.correct;

    document.querySelectorAll('.quiz-option').forEach(btn => {
      btn.classList.add('disabled');
      btn.onclick = null;
    });

    document.querySelectorAll('.quiz-option').forEach((btn, i) => {
      if (i === q.correct) btn.classList.add('correct');
      if (i === idx && !isCorrect) btn.classList.add('wrong');
    });

    s.answers.push({ questionIdx: s.current, selected: idx, correct: q.correct, isCorrect });

    if (isCorrect) {
      s.correct++;
      s.currentStreak++;
      let xpGained = Gamification.XP_PER_CORRECT;
      if (s.currentStreak >= 2) {
        xpGained += Gamification.XP_BONUS_STREAK;
        s.streakBonus += Gamification.XP_BONUS_STREAK;
      }
      s.totalXpEarned += xpGained;
      Gamification.recordQuizAnswer(s.category, true);
      if (navigator.vibrate) navigator.vibrate(30);
    } else {
      s.wrong++;
      s.currentStreak = 0;
      Gamification.recordQuizAnswer(s.category, false);
      Gamification.loseLife();
      if (navigator.vibrate) navigator.vibrate([60, 50, 60]);
    }

    this.showExplanation(isCorrect, q.explanation);
  },

  showExplanation(isCorrect, explanation) {
    const content = document.querySelector('.quiz-content');
    const banner = document.createElement('div');
    banner.className = `explanation-banner ${isCorrect ? 'correct' : 'wrong'}`;
    banner.innerHTML = `
      <div class="explanation-title">
        ${isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto'}
        ${isCorrect ? `<span class="xp-gain">+${Gamification.XP_PER_CORRECT}${this.state.currentStreak >= 2 ? `+${Gamification.XP_BONUS_STREAK} bonus` : ''} XP</span>` : ''}
      </div>
      <div class="explanation-text">${explanation}</div>
      <button class="btn-primary" onclick="QuizPage.nextQuestion()">
        ${this.state.current + 1 >= this.state.questions.length ? 'Ver resultados' : 'Siguiente'} →
      </button>
    `;
    content.appendChild(banner);
    banner.scrollIntoView({ behavior: 'smooth', block: 'end' });
  },

  nextQuestion() {
    this.state.current++;
    const container = document.getElementById('main-content');
    if (Gamification.getLives() === 0 && this.state.current < this.state.questions.length) {
      this.finishQuiz(container, true);
      return;
    }
    this.renderQuestion(container);
  },

  finishQuiz(container, gameOver = false) {
    const s = this.state;
    const perfect = s.wrong === 0;
    if (perfect) s.totalXpEarned += Gamification.XP_BONUS_NO_MISTAKES;

    Gamification.addXP(s.totalXpEarned);
    Gamification.recordQuizCompleted(perfect);

    Router.go('wisdom', {
      subpage: 'quiz_result',
      correct: s.correct,
      wrong: s.wrong,
      total: s.questions.length,
      xp: s.totalXpEarned,
      perfect,
      gameOver,
      category: s.category,
      categoryName: s.categoryName,
    });
  },

  renderResult(container, params) {
    const accuracy = Math.round((params.correct / params.total) * 100);
    const stars = params.perfect ? 3 : (accuracy >= 80 ? 2 : (accuracy >= 60 ? 1 : 0));

    container.innerHTML = `
      <div class="quiz-result-screen">
        <div class="result-header">
          <div class="result-icon">${params.perfect ? '🏆' : (accuracy >= 60 ? '🎉' : '💪')}</div>
          <div class="result-title">${params.perfect ? '¡Perfecto!' : (accuracy >= 60 ? '¡Bien hecho!' : 'Sigue practicando')}</div>
          <div class="result-subtitle">${params.categoryName}</div>

          <div class="result-stars">
            ${[1,2,3].map(i => `<span class="star ${i <= stars ? 'active' : ''}">⭐</span>`).join('')}
          </div>
        </div>

        <div class="result-stats">
          <div class="result-stat">
            <div class="result-stat-value">${params.correct}/${params.total}</div>
            <div class="result-stat-label">Correctas</div>
          </div>
          <div class="result-stat">
            <div class="result-stat-value">${accuracy}%</div>
            <div class="result-stat-label">Precisión</div>
          </div>
          <div class="result-stat highlight">
            <div class="result-stat-value">+${params.xp}</div>
            <div class="result-stat-label">XP ganados</div>
          </div>
        </div>

        ${params.perfect ? '<div class="bonus-banner">🎁 Bonus de quiz perfecto: +50 XP</div>' : ''}
        ${params.gameOver ? '<div class="game-over-banner">💔 Te quedaste sin vidas</div>' : ''}

        <div class="result-actions">
          <button class="btn-primary" onclick="Router.go('wisdom', { subpage: 'quiz_play', category: '${params.category}' })">
            🔄 Jugar otra vez
          </button>
          <button class="btn-ghost" onclick="Router.go('wisdom', { subpage: 'quiz_category' })">
            Otra categoría
          </button>
          <button class="btn-ghost" onclick="Router.go('wisdom')">
            Volver al inicio
          </button>
        </div>
      </div>
    `;
  },

  confirmExit() {
    if (confirm('¿Salir del quiz? Perderás tu progreso actual.')) {
      Router.go('wisdom');
    }
  },

  cleanup() {
    this.state = null;
  },
};
