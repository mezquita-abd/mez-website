// 📿 Tasbih digital con feedback háptico
const TasbihPage = {
  count: 0,
  totalCount: 0,
  targetCount: 33,
  currentDhikr: 0,

  DHIKRS: [
    { ar: 'سُبْحَانَ اللَّهِ', tr: 'Subhanallah', es: 'Glorificado sea Allah', target: 33 },
    { ar: 'الْحَمْدُ لِلَّهِ', tr: 'Alhamdulillah', es: 'Alabado sea Allah', target: 33 },
    { ar: 'اللَّهُ أَكْبَرُ', tr: 'Allahu Akbar', es: 'Allah es el más Grande', target: 34 },
    { ar: 'لَا إِلَهَ إِلَّا اللَّهُ', tr: 'La ilaha illa Allah', es: 'No hay divinidad sino Allah', target: 100 },
    { ar: 'أَسْتَغْفِرُ اللَّهَ', tr: 'Astaghfirullah', es: 'Pido perdón a Allah', target: 100 },
    { ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', tr: 'Subhanallahi wa bihamdihi', es: 'Glorificado sea Allah y con Su alabanza', target: 100 },
  ],

  render(container) {
    const saved = Storage.get('tasbih') || { count: 0, totalCount: 0, currentDhikr: 0 };
    this.count = saved.count || 0;
    this.totalCount = saved.totalCount || 0;
    this.currentDhikr = saved.currentDhikr || 0;
    this.targetCount = this.DHIKRS[this.currentDhikr].target;

    this.renderUI(container);
  },

  renderUI(container) {
    const dhikr = this.DHIKRS[this.currentDhikr];
    const progress = Math.min(this.count / this.targetCount, 1);
    const isComplete = this.count >= this.targetCount;

    container.innerHTML = `
      <div class="top-bar">
        <button class="top-bar-btn" onclick="Router.go('wisdom')">
          <i class="fas fa-chevron-${currentLocale === 'ar' ? 'right' : 'left'}"></i>
        </button>
        <div class="top-bar-title">📿 Tasbih</div>
        <button class="top-bar-btn" onclick="TasbihPage.reset()" title="Reiniciar">
          <i class="fas fa-redo"></i>
        </button>
      </div>

      <div class="tasbih-container">
        <div class="dhikr-selector">
          <button class="dhikr-nav" onclick="TasbihPage.changeDhikr(-1)" ${this.currentDhikr === 0 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="dhikr-name">${this.currentDhikr + 1} / ${this.DHIKRS.length}</div>
          <button class="dhikr-nav" onclick="TasbihPage.changeDhikr(1)" ${this.currentDhikr === this.DHIKRS.length - 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>

        <div class="dhikr-display">
          <div class="dhikr-arabic">${dhikr.ar}</div>
          <div class="dhikr-trans">${dhikr.tr}</div>
          <div class="dhikr-es">${dhikr.es}</div>
        </div>

        <div class="tasbih-counter ${isComplete ? 'complete' : ''}" id="tasbih-counter" onclick="TasbihPage.increment()">
          <svg class="tasbih-ring" width="240" height="240" viewBox="0 0 240 240">
            <circle cx="120" cy="120" r="110" fill="none" stroke="var(--border)" stroke-width="8"/>
            <circle cx="120" cy="120" r="110" fill="none" stroke="var(--primary)" stroke-width="8"
                    stroke-linecap="round"
                    stroke-dasharray="${2 * Math.PI * 110}"
                    stroke-dashoffset="${2 * Math.PI * 110 * (1 - progress)}"
                    transform="rotate(-90 120 120)"
                    style="transition: stroke-dashoffset 0.3s;"/>
          </svg>
          <div class="tasbih-center">
            <div class="tasbih-count" id="tasbih-count-val">${this.count}</div>
            <div class="tasbih-target">/ ${this.targetCount}</div>
            <div class="tasbih-hint">${isComplete ? '✅ ¡Completo!' : '👆 Toca para contar'}</div>
          </div>
        </div>

        <div class="tasbih-stats">
          <div class="tasbih-stat">
            <div class="tasbih-stat-value">${this.totalCount}</div>
            <div class="tasbih-stat-label">Total sesión</div>
          </div>
          <div class="tasbih-stat">
            <div class="tasbih-stat-value">${Gamification.getState().stats.tasbihCount}</div>
            <div class="tasbih-stat-label">Total histórico</div>
          </div>
        </div>

        <div class="tasbih-buttons">
          <button class="btn-ghost" onclick="TasbihPage.reset()">
            <i class="fas fa-redo"></i> Reiniciar contador
          </button>
        </div>
      </div>
    `;
  },

  increment() {
    this.count++;
    this.totalCount++;

    if (navigator.vibrate) {
      navigator.vibrate(this.count === this.targetCount ? [50, 30, 50, 30, 100] : 20);
    }
    this.playTick();

    if (this.totalCount > 0 && this.totalCount % 100 === 0) {
      Gamification.addXP(Gamification.XP_PER_TASBIH_100);
      showToast(`📿 +${Gamification.XP_PER_TASBIH_100} XP (${this.totalCount} dhikrs)`, 2000);
    }

    if (this.count === this.targetCount) {
      if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
      setTimeout(() => {
        if (this.currentDhikr < this.DHIKRS.length - 1) {
          showToast(`✅ ${this.DHIKRS[this.currentDhikr].tr} completo. Continuando...`, 2000);
          this.changeDhikr(1, true);
        }
      }, 800);
    }

    Gamification.recordTasbihCount(1);
    this.saveState();
    this.updateUI();
  },

  updateUI() {
    const countEl = document.getElementById('tasbih-count-val');
    if (!countEl) return;
    countEl.textContent = this.count;

    const ring = document.querySelector('.tasbih-ring circle:last-child');
    if (ring) {
      const progress = Math.min(this.count / this.targetCount, 1);
      const circ = 2 * Math.PI * 110;
      ring.setAttribute('stroke-dashoffset', circ * (1 - progress));
    }

    if (this.count >= this.targetCount) {
      document.getElementById('tasbih-counter')?.classList.add('complete');
    }
  },

  playTick() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 600;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  },

  changeDhikr(delta, autoReset = false) {
    const newIdx = this.currentDhikr + delta;
    if (newIdx < 0 || newIdx >= this.DHIKRS.length) return;
    this.currentDhikr = newIdx;
    if (autoReset) this.count = 0;
    this.targetCount = this.DHIKRS[this.currentDhikr].target;
    this.saveState();
    this.renderUI(document.getElementById('main-content'));
  },

  reset() {
    if (confirm('¿Reiniciar el contador?')) {
      this.count = 0;
      this.saveState();
      this.renderUI(document.getElementById('main-content'));
    }
  },

  saveState() {
    Storage.set('tasbih', {
      count: this.count,
      totalCount: this.totalCount,
      currentDhikr: this.currentDhikr,
    });
  },

  cleanup() {},
};
