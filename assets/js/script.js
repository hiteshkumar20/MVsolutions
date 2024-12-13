const carousel = document.querySelector('.carousel');
const cards = document.querySelectorAll('.card');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentIndex = 0;
const cardsPerView = 5;
const totalCards = cards.length;

function updateButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= totalCards - cardsPerView;
}

function navigate(direction) {
    // Adjust the index based on the direction
    currentIndex += direction * cardsPerView;

    // Wrap around logically
    if (currentIndex < 0) {
        currentIndex = Math.floor((totalCards - cardsPerView) / cardsPerView) * cardsPerView;
    } else if (currentIndex > totalCards - cardsPerView) {
        currentIndex = 0;
    }

    // Calculate the translation
    carousel.style.transform = `translateX(-${currentIndex * (100 / totalCards * cardsPerView)}%)`;
    
    updateButtons();
}

// Initial button state
updateButtons();

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // Animation duration in milliseconds
        const increment = target / 100;
        
        let currentCount = 0;
        
        const updateCounter = () => {
            currentCount += increment;
            
            if (currentCount < target) {
                counter.textContent = Math.round(currentCount);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };

    // Intersection Observer to trigger animation when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
});