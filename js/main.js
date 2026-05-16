/* ============================================
   Mezquita Abdullah - Main JS
   ============================================ */

let currentLanguage = 'es';

// ===== Language switcher =====
document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const currentLangSpan = document.getElementById('currentLang');

    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        langDropdown.classList.remove('active');
    });

    document.querySelectorAll('.lang-dropdown button').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            switchLanguage(lang);
            currentLangSpan.textContent = lang.toUpperCase();
            langDropdown.classList.remove('active');
        });
    });

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Welcome words rotation
    rotateWelcomeWords();

    // Stats counter animation
    initStatsCounter();

    // Scroll reveal animations
    initScrollReveal();

    // Form handling
    initForms();
});

// ===== Switch language =====
function switchLanguage(lang) {
    currentLanguage = lang;
    const trans = translations[lang];
    if (!trans) return;

    // RTL handling
    if (lang === 'ar') {
        document.body.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
    } else {
        document.body.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', lang);
    }

    // Translate all elements with data-translate
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (trans[key]) {
            el.textContent = trans[key];
        }
    });

    // Translate placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        if (trans[key]) {
            el.setAttribute('placeholder', trans[key]);
        }
    });

    // Translate select options
    document.querySelectorAll('select option').forEach(opt => {
        const key = opt.getAttribute('data-translate');
        if (key && trans[key]) {
            opt.textContent = trans[key];
        }
    });
}

// ===== Welcome words rotation =====
function rotateWelcomeWords() {
    const words = document.querySelectorAll('.welcome-word');
    let currentIndex = 0;

    setInterval(() => {
        words[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % words.length;
        words[currentIndex].classList.add('active');
    }, 2500);
}

// ===== Stats counter =====
function initStatsCounter() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 10);
        } else {
            counter.innerText = target + (target >= 1000 ? '+' : '');
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ===== Scroll reveal =====
function initScrollReveal() {
    const elements = document.querySelectorAll('.section-header, .discover-card, .question-card, .pillar-card, .testimonial-card, .visit-item');
    elements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

// ===== Form handling =====
function initForms() {
    const visitForm = document.getElementById('visitForm');
    const imamForm = document.getElementById('imamForm');

    if (visitForm) {
        visitForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const messages = {
                es: '✅ ¡Gracias! Hemos recibido tu reserva. Te contactaremos pronto para confirmar.',
                en: '✅ Thank you! We received your booking. We will contact you soon to confirm.',
                ar: '✅ شكراً! استلمنا حجزك. سنتواصل معك قريباً للتأكيد.',
                fr: '✅ Merci! Nous avons reçu votre réservation. Nous vous contacterons bientôt.'
            };
            alert(messages[currentLanguage] || messages.es);
            visitForm.reset();
        });
    }

    if (imamForm) {
        imamForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const messages = {
                es: '✅ Tu pregunta ha sido enviada al imam. Responderá en menos de 24 horas.',
                en: '✅ Your question has been sent to the imam. He will respond in less than 24 hours.',
                ar: '✅ تم إرسال سؤالك إلى الإمام. سيرد خلال أقل من 24 ساعة.',
                fr: '✅ Votre question a été envoyée à l\'imam. Il répondra en moins de 24 heures.'
            };
            alert(messages[currentLanguage] || messages.es);
            imamForm.reset();
        });
    }
}

// ===== Smooth scroll for nav links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
