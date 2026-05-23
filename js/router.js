// 🗺️ Router simple para SPA
const Router = {
  routes: {
    home: { page: HomePage, tabId: 'home' },
    quran: { page: QuranPage, tabId: 'quran' },
    prayer: { page: PrayerPage, tabId: 'prayer' },
    calendar: { page: CalendarPage, tabId: null }, // sin tab
    wisdom: { page: WisdomPage, tabId: 'wisdom' },
    profile: { page: ProfilePage, tabId: 'profile' },
    surah: { page: QuranPage, tabId: 'quran', method: 'renderDetail' },
  },

  current: null,
  history: [],

  async go(routeName, params = {}) {
    const route = this.routes[routeName];
    if (!route) {
      console.warn('Ruta desconocida:', routeName);
      return;
    }

    // Cleanup página anterior
    if (this.current?.page?.cleanup) {
      this.current.page.cleanup();
    }

    this.current = { route, name: routeName, params };

    // Actualizar tabs
    this.updateTabs(route.tabId);

    // Render
    const container = document.getElementById('main-content');
    container.scrollTop = 0;

    const method = route.method || 'render';
    if (typeof route.page[method] === 'function') {
      await route.page[method](container, params);
    }
  },

  push(routeName, params = {}) {
    this.history.push({ name: routeName, params });
    this.go(routeName, params);
  },

  back() {
    if (this.history.length > 0) {
      this.history.pop();
      const prev = this.history.length > 0 ? this.history[this.history.length - 1] : null;
      if (prev) {
        this.go(prev.name, prev.params);
      } else {
        this.go('home');
      }
    } else {
      this.go('home');
    }
  },

  updateTabs(activeTabId) {
    document.querySelectorAll('.bottom-tabs .tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.page === activeTabId);
    });
  },
};

// Conectar tabs
document.querySelectorAll('.bottom-tabs .tab').forEach(tab => {
  tab.addEventListener('click', () => {
    Router.history = []; // Reset stack al cambiar tab
    Router.go(tab.dataset.page);
  });
});
