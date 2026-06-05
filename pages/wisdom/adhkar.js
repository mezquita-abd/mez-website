// 🤲 Adhkar (colecciones de invocaciones)
const AdhkarPage = {
  currentSet: null,
  counters: {},

  SETS: [
    { id: 'morning', name: 'Adhkar de la mañana', icon: '🌅', data: () => ADHKAR_MORNING, color: '#FFA726' },
    { id: 'evening', name: 'Adhkar de la tarde', icon: '🌇', data: () => ADHKAR_EVENING, color: '#FF7043' },
    { id: 'sleep', name: 'Adhkar antes de dormir', icon: '🌙', data: () => ADHKAR_SLEEP, color: '#5C6BC0' },
    { id: 'after_prayer', name: 'Adhkar tras la oración', icon: '🕌', data: () => ADHKAR_AFTER_PRAYER, color: '#0F4C3A' },
  ],

  renderHub(container) {
    container.innerHTML = `
      <div class="top-bar">
        <button class="top-bar-btn" onclick="Router.go('wisdom')">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title">🤲 Adhkar</div>
        <div style="width: 30px;"></div>
      </div>

      <div style="padding: var(--sp-md);">
        <p class="adhkar-intro">Colecciones de invocaciones del Profeta ﷺ para diferentes momentos del día.</p>

        ${this.SETS.map(set => {
          const data = set.data();
          const completed = Gamification.getState().stats.adhkarCompleted.includes(set.id);
          return `
            <div class="adhkar-set-card" style="border-left: 4px solid ${set.color};" onclick="Router.go('wisdom', { subpage: 'adhkar_view', setId: '${set.id}' })">
              <div class="adhkar-set-icon" style="background: ${set.color}22;">${set.icon}</div>
              <div class="adhkar-set-info">
                <div class="adhkar-set-name">${set.name} ${completed ? '✓' : ''}</div>
                <div class="adhkar-set-meta">${data.length} dhikrs</div>
              </div>
              <i class="fas fa-chevron-${currentLocale === 'ar' ? 'left' : 'right'}" style="color: var(--text-secondary);"></i>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  renderSet(container, setId) {
    const set = this.SETS.find(s => s.id === setId);
    if (!set) return;

    this.currentSet = set;
    this.counters = {};
    const data = set.data();
    data.forEach(d => { this.counters[d.id] = 0; });

    container.innerHTML = `
      <div class="top-bar">
        <button class="top-bar-btn" onclick="Router.go('wisdom', { subpage: 'adhkar' })">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title">${set.icon} ${set.name}</div>
        <div style="width: 30px;"></div>
      </div>

      <div style="padding: var(--sp-md);">
        ${data.map((d) => `
          <div class="adhkar-card" id="adhkar-${d.id}">
            <div class="adhkar-card-header">
              <div class="adhkar-title">${d.title}</div>
              <div class="adhkar-times">×${d.times}</div>
            </div>

            <div class="adhkar-arabic">${d.arabic}</div>
            <div class="adhkar-trans">${d.transliteration}</div>
            <div class="adhkar-translation">${d.translation}</div>

            ${d.benefit ? `<div class="adhkar-benefit">✨ ${d.benefit}</div>` : ''}
            <div class="adhkar-source">— ${d.source}</div>

            ${d.times > 1 ? `
              <button class="adhkar-counter-btn" id="counter-${d.id}" onclick="AdhkarPage.incrementCount('${d.id}', ${d.times})">
                <span id="count-text-${d.id}">Tocar: 0/${d.times}</span>
              </button>
            ` : `
              <button class="adhkar-counter-btn" id="counter-${d.id}" onclick="AdhkarPage.markDone('${d.id}')">
                <span>✓ Marcar leído</span>
              </button>
            `}
          </div>
        `).join('')}

        <button class="btn-primary" style="width: 100%; margin-top: 20px;" onclick="AdhkarPage.markSetComplete()">
          <i class="fas fa-check-circle"></i> Completar set
        </button>
      </div>
    `;
  },

  incrementCount(id, target) {
    this.counters[id] = (this.counters[id] || 0) + 1;
    if (navigator.vibrate) navigator.vibrate(15);

    const textEl = document.getElementById(`count-text-${id}`);
    if (textEl) {
      textEl.textContent = `Tocar: ${this.counters[id]}/${target}`;
    }

    if (this.counters[id] >= target) {
      const btn = document.getElementById(`counter-${id}`);
      if (btn) {
        btn.classList.add('done');
        if (textEl) textEl.textContent = `✅ ${target}/${target} completo`;
      }
      if (navigator.vibrate) navigator.vibrate([60, 40, 60]);
    }
  },

  markDone(id) {
    const btn = document.getElementById(`counter-${id}`);
    if (btn) {
      btn.classList.add('done');
      btn.innerHTML = '<span>✅ Leído</span>';
    }
    if (navigator.vibrate) navigator.vibrate(20);
  },

  markSetComplete() {
    if (!this.currentSet) return;
    Gamification.addXP(Gamification.XP_PER_ADHKAR_SET);
    Gamification.recordAdhkarCompleted(this.currentSet.id);
    showToast(`✅ ${this.currentSet.name} completado! +${Gamification.XP_PER_ADHKAR_SET} XP`, 3000);
    setTimeout(() => Router.go('wisdom', { subpage: 'adhkar' }), 1500);
  },

  cleanup() {},
};
