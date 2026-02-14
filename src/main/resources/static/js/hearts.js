function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    
    const sizes = ['small', 'medium', 'large'];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    heart.classList.add(randomSize);
    
    const startX = Math.random() * window.innerWidth;
    heart.style.left = `${startX}px`;
    
    const duration = 8 + Math.random() * 6;
    heart.style.animationDuration = `${duration}s`;
    
    const delay = Math.random() * 5;
    heart.style.animationDelay = `${delay}s`;
    
    return heart;
}

function initHearts() {
    const container = document.getElementById('hearts-container');
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = createHeart();
        container.appendChild(heart);
    }
}

document.addEventListener('DOMContentLoaded', initHearts);
