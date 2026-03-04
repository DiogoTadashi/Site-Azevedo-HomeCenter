let currentSlide = 1;
const totalSlides = 4;
const intervalTime = 5000;
let slideInterval;

const carrossel = document.querySelector('.carrossel');

function nextSlide() {
    
    currentSlide = (currentSlide % totalSlides) + 1;

    const nextRadio = document.getElementById(`slide${currentSlide}`);
    
    if (nextRadio) {
        nextRadio.checked = true;
    }
}

function startSlideShow() {
    clearInterval(slideInterval);
    
    slideInterval = setInterval(nextSlide, intervalTime);
}

function pauseSlideShow() {
    clearInterval(slideInterval);
}

if (carrossel) {
    carrossel.addEventListener('mouseover', pauseSlideShow);
    carrossel.addEventListener('mouseout', startSlideShow);
}

startSlideShow();

document.addEventListener('DOMContentLoaded', () => {
    const elementosAnimados = document.querySelectorAll('.animacao-escondida');

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aparecer');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, {
        root: null,
        threshold: 0.1
    });

    elementosAnimados.forEach(elemento => {
        observer.observe(elemento);
    });
});
