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
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function updateSlides() {
    // Останавливаем старый таймер при любом переключении,
    // чтобы он не сработал посреди видео или нового слайда
    stopAutoAdvance();

    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        const video = slide.querySelector('video');

        if (video) {
            video.pause();
            video.currentTime = 0;
            // Убираем старый обработчик, чтобы они не дублировались
            video.onended = null;
        }

        if (index === currentSlide) {
            slide.classList.add('active');

            // ПРОВЕРКА НА ВИДЕО
            const currentVideo = slide.querySelector('video');
            if (currentVideo) {
                // Если это видео, запускаем его и ждем окончания
                currentVideo.play().catch(err => console.log("Auto-play blocked"));

                currentVideo.onended = () => {
                    nextSlide(); // Переходим дальше только когда видео кончится
                };
            } else {
                // Если это обычное фото, запускаем стандартный таймер
                startAutoAdvance();
            }
        }
    });

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentSlide) dot.classList.add('active');
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
}

function startAutoAdvance() {
    // Проверяем, не запущено ли уже видео на текущем слайде
    const currentVideo = slides[currentSlide].querySelector('video');
    if (currentVideo && !currentVideo.paused) return;

    if (!autoAdvanceInterval) {
        autoAdvanceInterval = setInterval(nextSlide, SLIDE_INTERVAL);
    }
}

function stopAutoAdvance() {
    if (autoAdvanceInterval) {
        clearInterval(autoAdvanceInterval);
        autoAdvanceInterval = null;
    }
}

// Слушатели событий
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

const carouselContainer = document.querySelector('.carousel-container');
// Пауза при наведении (только для фото)
carouselContainer.addEventListener('mouseenter', () => {
    const isVideo = slides[currentSlide].querySelector('video');
    if (!isVideo) stopAutoAdvance();
});
carouselContainer.addEventListener('mouseleave', () => {
    const isVideo = slides[currentSlide].querySelector('video');
    if (!isVideo) startAutoAdvance();
});

// Логика музыки (без изменений)
musicBtn.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play()
            .then(() => {
                musicBtn.textContent = '⏸ Pause Music';
                musicBtn.classList.add('playing');
            })
            .catch(error => console.error('Error playing music:', error));
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
updateSlides(); // Инициализируем первый слайд правильно