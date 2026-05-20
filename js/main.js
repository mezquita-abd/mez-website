// ============================================
// Quba - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize language
    const savedLang = localStorage.getItem('quba_lang') || 'es';
    applyTranslation(savedLang);

    // Language selector
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });
        langDropdown.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                applyTranslation(lang);
                langDropdown.classList.remove('active');
            });
        });
        document.addEventListener('click', () => {
            langDropdown.classList.remove('active');
        });
    }

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Initialize prayer times
    initPrayerTimes();
    
    // Animated welcome words
    animateWelcomeWords();
    
    // Counter animation
    animateCounters();
});

// ============================================
// Prayer Times (simulated - in production use AlAdhan API)
// ============================================
function initPrayerTimes() {
    // Default prayer times (these would normally be calculated from location)
    const prayers = [
        { name: 'fajr', label: 'Fajr', icon: 'fa-cloud-moon', time: '05:30' },
        { name: 'sunrise', label: 'Sunrise', icon: 'fa-sun', time: '06:48' },
        { name: 'dhuhr', label: 'Dhuhr', icon: 'fa-sun', time: '12:30' },
        { name: 'asr', label: 'Asr', icon: 'fa-cloud-sun', time: '15:45' },
        { name: 'maghrib', label: 'Maghrib', icon: 'fa-moon', time: '18:20' },
        { name: 'isha', label: 'Isha', icon: 'fa-star-and-crescent', time: '19:45' }
    ];

    // Determine next prayer
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    let nextIdx = 0;
    for (let i = 0; i < prayers.length; i++) {
        const [h, m] = prayers[i].time.split(':').map(Number);
        if (h * 60 + m > currentMinutes) {
            nextIdx = i;
            break;
        }
        if (i === prayers.length - 1) nextIdx = 0; // tomorrow's fajr
    }

    // Update prayer bar (top)
    const nextPrayerName = document.getElementById('nextPrayerName');
    const nextPrayerTime = document.getElementById('nextPrayerTime');
    const prayerCountdown = document.getElementById('prayerCountdown');
    if (nextPrayerName) nextPrayerName.textContent = prayers[nextIdx].label;
    if (nextPrayerTime) nextPrayerTime.textContent = prayers[nextIdx].time;
    if (prayerCountdown) {
        const [h, m] = prayers[nextIdx].time.split(':').map(Number);
        let diff = (h * 60 + m) - currentMinutes;
        if (diff < 0) diff += 24 * 60;
        const dh = Math.floor(diff / 60);
        const dm = diff % 60;
        prayerCountdown.textContent = `en ${dh}h ${dm}m`;
    }

    // Render prayer strip cards
    const grid = document.getElementById('prayerStripGrid');
    if (grid) {
        grid.innerHTML = prayers.map((p, idx) => `
            <div class="prayer-strip-card ${idx === nextIdx ? 'next' : ''}">
                ${idx === nextIdx ? '<span class="next-tag">Siguiente</span>' : ''}
                <div class="ps-icon"><i class="fas ${p.icon}"></i></div>
                <div class="ps-name">${p.label}</div>
                <div class="ps-time">${p.time}</div>
            </div>
        `).join('');
    }

    // Show date
    const dateEl = document.getElementById('prayerStripDate');
    if (dateEl) {
        const opts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        dateEl.textContent = now.toLocaleDateString('es-ES', opts);
    }
}

// ============================================
// Animate welcome words in hero
// ============================================
function animateWelcomeWords() {
    const words = document.querySelectorAll('.welcome-word');
    if (words.length === 0) return;
    let current = 0;
    setInterval(() => {
        words[current].classList.remove('active');
        current = (current + 1) % words.length;
        words[current].classList.add('active');
    }, 2500);
}

// ============================================
// Animated number counters
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                let current = 0;
                const step = Math.max(1, Math.floor(target / 60));
                const update = () => {
                    current += step;
                    if (current >= target) {
                        el.textContent = target;
                    } else {
                        el.textContent = current;
                        requestAnimationFrame(update);
                    }
                };
                update();
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
}
