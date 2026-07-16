// 📲 PWA Install Prompt
// Captura beforeinstallprompt, muestra banner al usuario y ofrece instalar.
const PWAInstall = {
  _deferred: null,
  _dismissedKey: 'pwa_dismissed_at',
  _cooldownDays: 7,

  init() {
    // Chrome/Edge/Samsung: beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this._deferred = e;
      this._maybeShowBanner();
    });

    // App instalada
    window.addEventListener('appinstalled', () => {
      this._deferred = null;
      this._hideBanner();
      if (typeof showToast === 'function') {
        showToast(t('pwaInstalled') || '✅ App instalada. Ábrela desde tu inicio.');
      }
    });

    // Si ya está en modo standalone, no mostrar
    if (window.matchMedia('(display-mode: standalone)').matches ||
        navigator.standalone === true) {
      return;
    }
  },

  _dismissed() {
    const at = parseInt(localStorage.getItem(this._dismissedKey) || '0', 10);
    if (!at) return false;
    const days = (Date.now() - at) / (1000 * 60 * 60 * 24);
    return days < this._cooldownDays;
  },

  _maybeShowBanner() {
    if (this._dismissed()) return;
    // Esperar 5s antes de mostrar (no molestar al arranque)
    setTimeout(() => this._showBanner(), 5000);
  },

  _showBanner() {
    if (!this._deferred || document.getElementById('pwa-install-banner')) return;
    const lang = (window.currentLocale) || 'es';
    const messages = {
      es: { title: 'Instalar Quba', desc: 'Ábrela como app desde tu inicio.', install: 'Instalar', later: 'Más tarde' },
      ar: { title: 'ثبّت قُبَّة', desc: 'افتحها كتطبيق من شاشتك الرئيسية.', install: 'تثبيت', later: 'لاحقاً' },
      en: { title: 'Install Quba', desc: 'Open it as an app from your home screen.', install: 'Install', later: 'Later' },
    };
    const m = messages[lang] || messages.es;
    const banner = document.createElement('div');
    banner.id = 'pwa-install-banner';
    banner.className = 'pwa-install-banner';
    banner.innerHTML = `
      <div class="pwa-install-icon">🕌</div>
      <div class="pwa-install-info">
        <div class="pwa-install-title">${escapeHtml(m.title)}</div>
        <div class="pwa-install-desc">${escapeHtml(m.desc)}</div>
      </div>
      <button class="pwa-install-later" data-action="pwa-later">${escapeHtml(m.later)}</button>
      <button class="pwa-install-cta" data-action="pwa-install">${escapeHtml(m.install)}</button>
    `;
    document.body.appendChild(banner);
    requestAnimationFrame(() => banner.classList.add('show'));

    banner.addEventListener('click', async (e) => {
      const action = e.target.closest('[data-action]')?.dataset.action;
      if (action === 'pwa-later') {
        localStorage.setItem(this._dismissedKey, String(Date.now()));
        this._hideBanner();
      } else if (action === 'pwa-install') {
        if (this._deferred) {
          this._deferred.prompt();
          const choice = await this._deferred.userChoice;
          if (choice.outcome === 'accepted') {
            console.log('User accepted PWA install');
          } else {
            localStorage.setItem(this._dismissedKey, String(Date.now()));
          }
          this._deferred = null;
        }
        this._hideBanner();
      }
    });
  },

  _hideBanner() {
    const b = document.getElementById('pwa-install-banner');
    if (b) {
      b.classList.remove('show');
      setTimeout(() => b.remove(), 300);
    }
  },
};
