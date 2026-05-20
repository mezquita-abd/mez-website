// ============================================
// Quba - Home page carousel
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('eventsTrack');
    const prev = document.getElementById('eventsPrev');
    const next = document.getElementById('eventsNext');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!track) return;

    const slides = track.querySelectorAll('.event-slide');
    const totalSlides = slides.length;
    let currentIndex = 0;
    
    function getVisibleSlides() {
        if (window.innerWidth <= 640) return 1;
        if (window.innerWidth <= 968) return 2;
        return 3;
    }
    
    function getMaxIndex() {
        return Math.max(0, totalSlides - getVisibleSlides());
    }

    function updateCarousel() {
        const visible = getVisibleSlides();
        const slideWidth = track.offsetWidth / visible;
        const offset = currentIndex * slideWidth;
        track.style.transform = `translateX(-${offset}px)`;
        
        if (prev) prev.disabled = currentIndex === 0;
        if (next) next.disabled = currentIndex >= getMaxIndex();
        
        updateDots();
    }

    function updateDots() {
        if (!dotsContainer) return;
        const maxIdx = getMaxIndex();
        dotsContainer.innerHTML = '';
        for (let i = 0; i <= maxIdx; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        }
    }

    if (prev) {
        prev.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    }
    
    if (next) {
        next.addEventListener('click', () => {
            if (currentIndex < getMaxIndex()) {
                currentIndex++;
                updateCarousel();
            }
        });
    }

    window.addEventListener('resize', () => {
        if (currentIndex > getMaxIndex()) currentIndex = getMaxIndex();
        updateCarousel();
    });

    // Auto-advance every 6 seconds
    setInterval(() => {
        if (currentIndex < getMaxIndex()) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }, 6000);

    updateCarousel();
});
