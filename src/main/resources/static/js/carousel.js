let currentSlide = 0;
let autoAdvanceInterval = null;
const SLIDE_INTERVAL = 4000;

const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('carouselDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const musicBtn = document.getElementById('musicBtn');
const backgroundMusic = document.getElementById('backgroundMusic');

function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function updateSlides() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        const video = slide.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
        
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentSlide) {
            dot.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlides();
    resetAutoAdvance();
}

function startAutoAdvance() {
    autoAdvanceInterval = setInterval(nextSlide, SLIDE_INTERVAL);
}

function stopAutoAdvance() {
    if (autoAdvanceInterval) {
        clearInterval(autoAdvanceInterval);
        autoAdvanceInterval = null;
    }
}

function resetAutoAdvance() {
    stopAutoAdvance();
    startAutoAdvance();
}

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoAdvance();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoAdvance();
});

const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', stopAutoAdvance);
carouselContainer.addEventListener('mouseleave', startAutoAdvance);

musicBtn.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play()
            .then(() => {
                musicBtn.textContent = '⏸ Pause Music';
                musicBtn.classList.add('playing');
            })
            .catch(error => {
                console.error('Error playing music:', error);
            });
    } else {
        backgroundMusic.pause();
        musicBtn.textContent = '🎵 Play Our Song';
        musicBtn.classList.remove('playing');
    }
});

backgroundMusic.addEventListener('ended', () => {
    musicBtn.textContent = '🎵 Play Our Song';
    musicBtn.classList.remove('playing');
});

createDots();
startAutoAdvance();
