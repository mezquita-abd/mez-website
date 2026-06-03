// 🎯 Pantalla Sabiduría - Hub completo (Fase 2 activada)
const WisdomPage = {
  async render(container) {
    const stats = Gamification.getStats();

    const modules = [
      {
        id: 'quiz', icon: '🧠',
        title: t('quizTitle'), desc: t('quizDesc'),
        color: '#0F4C3A', route: 'wisdom/quiz',
      },
      {
        id: 'courses', icon: '📚',
        title: t('coursesTitle'), desc: t('coursesDesc'),
        color: '#D4AF37', route: 'wisdom/courses',
      },
      {
        id: 'adhkar', icon: '📿',
        title: t('adhkarTitle'), desc: t('adhkarDesc'),
        color: '#1A2B4A', route: 'wisdom/adhkar',
      },
      {
        id: 'tasbih', icon: '🤲',
        title: t('tasbihTitle'), desc: t('tasbihDesc'),
        color: '#8B4513', route: 'wisdom/tasbih',
      },
    ];

    container.innerHTML = `
      <div class="page-header">
        <div class="page-title">🎯 ${t('tabWisdom')}</div>
        <div class="page-subtitle">${t('wisdomSubtitle')}</div>
      </div>

      <!-- Player Stats Card -->
      <div style="padding: var(--sp-md);">
        <div class="player-stats-card">
          <div class="player-level-row">
            <div class="player-level-icon">${Gamification.getLevelInfo(stats.level).icon}</div>
            <div class="player-level-info">
              <div class="player-level-name">${t('level')} ${stats.level} — ${Gamification.getLevelInfo(stats.level).name[AppState.settings.language || 'es']}</div>
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
              <div class="stat-value">🔥 ${stats.streak}</div>
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

        <h2 class="section-title">${t('modules')}</h2>

        <div class="wisdom-grid">
          ${modules.map(m => `
            <div class="wisdom-module-card" onclick="Router.go('${m.route}')" style="border-left-color: ${m.color};">
              <div class="wm-icon" style="background: ${m.color}15; color: ${m.color};">${m.icon}</div>
              <div class="wm-content">
                <div class="wm-title">${m.title}</div>
                <div class="wm-desc">${m.desc}</div>
              </div>
              <i class="fas fa-chevron-${document.documentElement.dir === 'rtl' ? 'left' : 'right'} wm-arrow"></i>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },
  cleanup() {},
};
