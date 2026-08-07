// 🧠 Quiz gamificado (self-contained: maneja sus subvistas internamente)
const QuizPage = {
  state: null,

  CATEGORIES: [
    { id: 'quran', nameKey: 'quizCatQuran', icon: '📖', data: () => (typeof QUIZ_QURAN !== 'undefined' ? QUIZ_QURAN : []), color: '#0F4C3A' },
    { id: 'sira', nameKey: 'quizCatSira', icon: '🕋', data: () => (typeof QUIZ_SIRA !== 'undefined' ? QUIZ_SIRA : []), color: '#D4AF37' },
    { id: 'hadith', nameKey: 'quizCatHadith', icon: '📜', data: () => (typeof QUIZ_HADITH !== 'undefined' ? QUIZ_HADITH : []), color: '#1A6B52' },
    { id: 'fiqh', nameKey: 'quizCatFiqh', icon: '⚖️', data: () => (typeof QUIZ_FIQH !== 'undefined' ? QUIZ_FIQH : []), color: '#8E6E1E' },
    { id: 'history', nameKey: 'quizCatHistory', icon: '🌙', data: () => (typeof QUIZ_HISTORY !== 'undefined' ? QUIZ_HISTORY : []), color: '#4A6FA5' },
    { id: 'prophets', nameKey: 'quizCatProphets', icon: '👨', data: () => (typeof QUIZ_PROPHETS !== 'undefined' ? QUIZ_PROPHETS : []), color: '#6A4E8F' },
  ],

  // Entry point — render category selection
  renderCategorySelect(container) {
    const gameState = Gamification.getState();

    container.innerHTML = `
      <div class="top-bar">
        <button class="top-bar-btn" onclick="Router.go('wisdom')">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title">🧠 ${t('quizCategories') || 'Categorías'}</div>
        <div style="width: 30px;"></div>
      </div>

      <div style="padding: var(--sp-md);">
        <p class="quiz-intro">${t('quizIntro') || 'Elige una categoría. Cada quiz: 10 preguntas. Gana XP por cada respuesta correcta.'}</p>

        ${this.CATEGORIES.map(cat => {
          const stat = gameState.stats.categoryStats?.[cat.id] || { correct: 0, total: 0 };
          const accuracy = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
          const count = cat.data().length;
          return `
            <div class="category-card" onclick="QuizPage.startQuiz('${cat.id}')" style="border-left-color: ${cat.color}">
              <div class="cat-icon" style="background: ${cat.color}22; color: ${cat.color}">${cat.icon}</div>
              <div class="cat-info">
                <div class="cat-name">${t(cat.nameKey) || cat.id}</div>
                <div class="cat-stats">${count} ${t('questions') || 'preguntas'} · ${stat.correct}/${stat.total} · ${accuracy}%</div>
              </div>
              <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'} cat-arrow"></i>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  startQuiz(categoryId) {
    const container = document.getElementById('main-content');
    const category = this.CATEGORIES.find(c => c.id === categoryId);
    if (!category) return;

    // v12: unlimited play — no lives check
    const allQuestions = category.data();
    if (allQuestions.length === 0) {
      container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">⚠️</div><div>${t('noQuestions') || 'No hay preguntas disponibles'}</div><button class="btn-primary" onclick="Router.go('wisdom/quiz')">${t('back') || 'Volver'}</button></div>`;
      return;
    }

    // v13: Select 10 questions preserving difficulty order (easy → medium → hard).
    // Pick ~4 easy, 4 medium, 2 hard randomly within each bucket,
    // then concatenate to keep the progression natural.
    const pickRandom = (arr, n) => {
      const shuffled = [...arr].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, Math.min(n, arr.length));
    };
    const byDiff = { easy: [], medium: [], hard: [] };
    allQuestions.forEach(q => {
      const d = q.difficulty || 'medium';
      (byDiff[d] || byDiff.medium).push(q);
    });
    const easyPick = pickRandom(byDiff.easy, 4);
    const mediumPick = pickRandom(byDiff.medium, 4);
    const hardPick = pickRandom(byDiff.hard, 2);
    // Order: easy first, then medium, then hard
    let selected = [...easyPick, ...mediumPick, ...hardPick];
    // Fallback if some buckets are empty: fill from remaining pool
    if (selected.length < 10) {
      const usedIds = new Set(selected.map(q => q.q));
      const remaining = allQuestions.filter(q => !usedIds.has(q.q));
      selected = [...selected, ...pickRandom(remaining, 10 - selected.length)];
      // Re-sort by difficulty to preserve progression
      const rank = { easy: 1, medium: 2, hard: 3 };
      selected.sort((a, b) => (rank[a.difficulty] || 2) - (rank[b.difficulty] || 2));
    }
    selected = selected.slice(0, 10);

    this.state = {
      category: category.id,
      categoryName: t(category.nameKey) || category.id,
      questions: selected,
      current: 0,
      correct: 0,
      wrong: 0,
      totalXpEarned: 0,
      answered: false,
    };

    this.renderQuestion(container);
  },

  renderQuestion(container) {
    const s = this.state;
    if (!s || s.current >= s.questions.length) {
      this.finishQuiz(container);
      return;
    }

    const q = s.questions[s.current];
    const progress = ((s.current + 1) / s.questions.length) * 100;
    const lang = AppState.settings?.language || currentLocale || 'es';

    // Support both legacy (q, correct, explanation as strings) and new (question, correctIndex, multi-lang) formats
    const questionText = typeof q.question === 'object'
      ? (q.question[lang] || q.question.es)
      : (q.question || q.q);
    const options = (q.options || []).map(opt =>
      typeof opt === 'object' ? (opt[lang] || opt.es) : opt
    );

    container.innerHTML = `
      <div class="quiz-header">
        <button class="quiz-close" onclick="QuizPage.confirmExit()">
          <i class="fas fa-times"></i>
        </button>
        <div class="quiz-progress-wrap">
          <div class="quiz-progress-bar" style="width: ${progress}%"></div>
        </div>
        <!-- v12: hearts removed — unlimited play -->
      </div>

      <div class="quiz-content" id="quiz-content">
        <div class="quiz-counter">${s.current + 1} / ${s.questions.length}</div>
        <div class="quiz-category-tag">${s.categoryName}</div>
        ${q.difficulty ? `<div class="quiz-difficulty-badge quiz-diff-${q.difficulty}">${
          q.difficulty === 'easy' ? '⭐ ' + (t('easy') || 'Fácil') :
          q.difficulty === 'medium' ? '🔥 ' + (t('medium') || 'Medio') :
          '💎 ' + (t('hard') || 'Difícil')
        }</div>` : ''}

        <div class="quiz-question">${questionText}</div>

        <div class="quiz-options">
          ${options.map((opt, idx) => `
            <button class="quiz-option" data-idx="${idx}" onclick="QuizPage.selectAnswer(${idx})">
              <span class="quiz-option-letter">${String.fromCharCode(65 + idx)}</span>
              <span class="quiz-option-text">${opt}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  selectAnswer(idx) {
    const s = this.state;
    if (s.answered) return;
    s.answered = true;

    const q = s.questions[s.current];
    const correctIdx = (q.correctIndex !== undefined) ? q.correctIndex : q.correct;
    const isCorrect = idx === correctIdx;
    const lang = AppState.settings?.language || currentLocale || 'es';
    const explanation = typeof q.explanation === 'object'
      ? (q.explanation?.[lang] || q.explanation?.es)
      : q.explanation;

    const buttons = document.querySelectorAll('.quiz-option');
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === correctIdx) btn.classList.add('correct');
      else if (i === idx && !isCorrect) btn.classList.add('wrong');
    });

    let xpEarned = 0;
    if (isCorrect) {
      s.correct++;
      xpEarned = Gamification.XP_CORRECT_ANSWER || 10;
      s.totalXpEarned += xpEarned;
      Gamification.recordQuizAnswer(s.category, true);
      if (navigator.vibrate) navigator.vibrate(50);
    } else {
      s.wrong++;
      Gamification.recordQuizAnswer(s.category, false);
      // v12: no life lost — progress and XP are preserved
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    }

    const content = document.getElementById('quiz-content');
    const banner = document.createElement('div');
    banner.className = `feedback-banner ${isCorrect ? 'correct' : 'wrong'}`;
    banner.innerHTML = `
      <div class="feedback-title">
        ${isCorrect ? '✅ ' + (t('correct') || '¡Correcto!') : '❌ ' + (t('incorrect') || 'Incorrecto')}
        ${xpEarned ? `<span class="xp-pill">+${xpEarned} XP</span>` : ''}
      </div>
      ${explanation ? `<div class="feedback-explanation">${explanation}</div>` : ''}
      ${q.source ? `<div class="feedback-source">— ${q.source}</div>` : ''}
      <button class="btn-primary" onclick="QuizPage.nextQuestion()">
        ${s.current + 1 >= s.questions.length ? (t('seeResults') || 'Ver resultados') : (t('next') || 'Siguiente')} →
      </button>
    `;
    content.appendChild(banner);
    banner.scrollIntoView({ behavior: 'smooth', block: 'end' });
  },

  nextQuestion() {
    this.state.current++;
    this.state.answered = false;
    const container = document.getElementById('main-content');
    // v12: no game-over from lives — always continue
    this.renderQuestion(container);
  },

  finishQuiz(container, gameOver = false) {
    const s = this.state;
    const perfect = s.wrong === 0 && s.correct === s.questions.length;
    if (perfect) s.totalXpEarned += Gamification.XP_BONUS_NO_MISTAKES || 50;

    Gamification.addXP(s.totalXpEarned);
    Gamification.recordQuizCompleted(perfect);

    this.renderResult(container, {
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
    const accuracy = params.total > 0 ? Math.round((params.correct / params.total) * 100) : 0;
    const stars = params.perfect ? 3 : (accuracy >= 80 ? 2 : (accuracy >= 60 ? 1 : 0));

    container.innerHTML = `
      <div class="quiz-result-screen">
        <div class="result-header">
          <div class="result-icon">${params.perfect ? '🏆' : (accuracy >= 60 ? '🎉' : '💪')}</div>
          <div class="result-title">${params.perfect ? (t('perfect') || '¡Perfecto!') : (accuracy >= 60 ? (t('wellDone') || '¡Bien hecho!') : (t('keepPracticing') || 'Sigue practicando'))}</div>
          <div class="result-subtitle">${params.categoryName}</div>
          <div class="result-stars">
            ${[1,2,3].map(i => `<span class="star ${i <= stars ? 'active' : ''}">⭐</span>`).join('')}
          </div>
        </div>

        <div class="result-stats">
          <div class="result-stat">
            <div class="result-stat-value">${params.correct}/${params.total}</div>
            <div class="result-stat-label">${t('correctPlural') || 'Correctas'}</div>
          </div>
          <div class="result-stat">
            <div class="result-stat-value">${accuracy}%</div>
            <div class="result-stat-label">${t('accuracy') || 'Precisión'}</div>
          </div>
          <div class="result-stat highlight">
            <div class="result-stat-value">+${params.xp}</div>
            <div class="result-stat-label">${t('xpEarned') || 'XP ganados'}</div>
          </div>
        </div>

        ${params.perfect ? `<div class="bonus-banner">🎁 ${t('perfectBonus') || 'Bonus de quiz perfecto'}: +50 XP</div>` : ''}
        <!-- v12: game-over banner removed — unlimited play -->

        <div class="result-actions">
          <button class="btn-primary" onclick="QuizPage.startQuiz('${params.category}')">
            🔄 ${t('playAgain') || 'Jugar otra vez'}
          </button>
          <button class="btn-ghost" onclick="Router.go('wisdom/quiz')">
            ${t('otherCategory') || 'Otra categoría'}
          </button>
          <button class="btn-ghost" onclick="Router.go('wisdom')">
            ${t('backToWisdom') || 'Volver'}
          </button>
        </div>
      </div>
    `;
  },

  confirmExit() {
    if (confirm(t('confirmExitQuiz') || '¿Salir del quiz? Perderás tu progreso actual.')) {
      this.state = null;
      Router.go('wisdom/quiz');
    }
  },

  cleanup() {},
};
