// 🎯 Pantalla Sabiduría - Solo Quiz Islámico activo
const WisdomPage = {
  async render(container) {
    const stats = Gamification.getStats();
    const levelInfo = Gamification.getLevelInfo(stats.level);
    const lang = AppState.settings?.language || currentLocale || 'es';

    container.innerHTML = `
      <div class="page-header">
        <div class="page-title">🎯 ${t('tabWisdom')}</div>
        <div class="page-subtitle">${t('wisdomSubtitle')}</div>
      </div>

      <div style="padding: var(--sp-md);">
        <!-- Player Stats Card -->
        <div class="player-stats-card">
          <div class="player-level-row">
            <div class="player-level-icon">${levelInfo.icon}</div>
            <div class="player-level-info">
              <div class="player-level-name">${t('level')} ${stats.level} — ${typeof levelInfo.name === 'object' ? (levelInfo.name[lang] || levelInfo.name.es) : levelInfo.name}</div>
              <div class="player-xp">${stats.xp} XP</div>
            </div>
            <div class="player-hearts">
              ${Array(5).fill(0).map((_, i) => `<span class="heart ${i < stats.lives ? 'full' : 'empty'}">${i < stats.lives ? '❤️' : '🤍'}</span>`).join('')}
            </div>
          </div>
          <div class="xp-bar-wrapper">
            <div class="xp-bar-fill" style="width: ${Gamification.getProgressToNextLevel(stats.xp)}%"></div>
          </div>
          <div class="stats-row">
            <div class="stat-item">
              <div class="stat-value">🔥 ${stats.streak || 0}</div>
              <div class="stat-label">${t('streak')}</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">🏆 ${stats.achievements?.length || 0}</div>
              <div class="stat-label">${t('badges')}</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">📊 ${stats.totalAnswered || 0}</div>
              <div class="stat-label">${t('answered')}</div>
            </div>
          </div>
        </div>

        <!-- Quiz Module (único activo) -->
        <div class="wisdom-grid">
          <div class="wisdom-module-card wisdom-module-large" onclick="Router.go('wisdom/quiz')" style="border-left-color: #0F4C3A;">
            <div class="wm-icon" style="background: #0F4C3A15; color: #0F4C3A; width:64px; height:64px; font-size:32px;">🧠</div>
            <div class="wm-content">
              <div class="wm-title" style="font-size:18px;">${t('quizTitle')}</div>
              <div class="wm-desc">${t('quizDesc')}</div>
              <div class="wm-badges" style="margin-top:8px; display:flex; gap:6px; flex-wrap:wrap;">
                <span class="quiz-badge">📖 ${t('quizCatQuran') || 'Corán'}</span>
                <span class="quiz-badge">🕋 ${t('quizCatSira') || 'Sira'}</span>
                <span class="quiz-badge">📜 ${t('quizCatHadith') || 'Hadith'}</span>
                <span class="quiz-badge">⚖️ ${t('quizCatFiqh') || 'Fiqh'}</span>
                <span class="quiz-badge">🌙 ${t('quizCatHistory') || 'Historia'}</span>
                <span class="quiz-badge">👨 ${t('quizCatProphets') || 'Profetas'}</span>
              </div>
            </div>
            <i class="fas fa-chevron-${document.documentElement.dir === 'rtl' ? 'left' : 'right'} wm-arrow"></i>
          </div>
        </div>

        <div class="card" style="background: rgba(15,76,58,0.06); margin-top: var(--sp-md);">
          <div style="font-size: 13px; line-height: 1.6; color: var(--text-secondary, #666);">
            💡 <strong>${t('quizInfoTitle') || 'Aprende jugando'}:</strong> ${t('quizInfoDesc') || 'Cada quiz contiene 10 preguntas. Gana XP, sube de nivel y desbloquea logros.'}
          </div>
        </div>
      </div>
    `;
  },
  cleanup() {},
};
