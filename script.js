const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

let currentSlide = 0;
let slideInterval;

const dots = document.querySelectorAll('.dot');

function goToSlide(index) {
    const slideWidth = slides.offsetWidth;
    slides.scrollTo({ left: slideWidth * index, behavior: 'smooth' });
    currentSlide = index;
}

function updateDots() {
    dots.forEach((dot, i) => {
        dot.classList.toggle('ativo', i === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
}

function startSlideShow() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

function pauseSlideShow() {
    clearInterval(slideInterval);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(slides.children).indexOf(entry.target);
            currentSlide = index;
        }
    });
}, { root: slides, threshold: 0.6 });

document.querySelectorAll('.slide').forEach(slide => observer.observe(slide));

slides.addEventListener('mouseenter', pauseSlideShow);
slides.addEventListener('mouseleave', startSlideShow);
slides.addEventListener('touchstart', pauseSlideShow, { passive: true });
slides.addEventListener('touchend', startSlideShow, { passive: true });

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

    const observerAnimacao = new IntersectionObserver(observerCallback, {
        root: null,
        threshold: 0.1
    });

    elementosAnimados.forEach(elemento => observerAnimacao.observe(elemento));
});

startSlideShow();