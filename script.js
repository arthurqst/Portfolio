// C'est un super script (• ֊ •)

function updateDots(carouselId, dotsId) {
    const carousel = document.getElementById(carouselId);
    const dots = document.getElementById(dotsId);
    const items = carousel.querySelectorAll('.project');
    dots.innerHTML = '';

    items.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dots.appendChild(dot);
    });

    carousel.addEventListener('scroll', () => {
    const scrollLeft = carousel.scrollLeft;
    const slideWidth = carousel.offsetWidth;
    const index = Math.round(scrollLeft / slideWidth);
    const allDots = dots.querySelectorAll('.dot');
    allDots.forEach(dot => dot.classList.remove('active'));
    if (allDots[index]) allDots[index].classList.add('active');
    currentSlide[carouselId] = index;
    });
}

const currentSlide = {
    'carousel-study': 0,
    'carousel-personal': 0,
    'carousel-experience': 0
};

function handleScrollOnProjectSections() {
    document.querySelectorAll('[data-carousel]').forEach(section => {
    section.addEventListener('wheel', e => {
        const carouselId = section.getAttribute('data-carousel');
        const carousel = document.getElementById(carouselId);
        const projects = carousel.querySelectorAll('.project');
        const total = projects.length;

        if (e.deltaY > 0 && currentSlide[carouselId] < total - 1) {
        currentSlide[carouselId]++;
        e.preventDefault();
        } else if (e.deltaY < 0 && currentSlide[carouselId] > 0) {
        currentSlide[carouselId]--;
        e.preventDefault();
        } else if (e.deltaY > 0 && currentSlide[carouselId] === total - 1) {
        return;
        } else if (e.deltaY < 0 && currentSlide[carouselId] === 0) {
        return;
        } else {
        e.preventDefault();
        }

        carousel.scrollTo({
        left: carousel.offsetWidth * currentSlide[carouselId],
        behavior: 'smooth'
        });

        const dots = document.querySelectorAll(`#dots-${carouselId.split('-')[1]} .dot`);
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[currentSlide[carouselId]]) dots[currentSlide[carouselId]].classList.add('active');
    }, { passive: false });
    });
}

function observeSections() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.sidebar a');
    const options = { root: null, rootMargin: '0px', threshold: 0.5 };

    const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const id = entry.target.id;
        const link = document.getElementById(`link-${id}`);

        if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        if (link) link.classList.add('active');

        const index = Array.from(sections).indexOf(entry.target);
        if (index !== -1) {
            currentIndex = index;
        }
        }
    });
    }, options);

    sections.forEach(section => observer.observe(section));
}

updateDots('carousel-study', 'dots-study');
updateDots('carousel-personal', 'dots-personal');
updateDots('carousel-experience', 'dots-experience');
handleScrollOnProjectSections();
observeSections();

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const main = document.querySelector('main');
    const toggle = document.querySelector('.toggle-button');
    sidebar.classList.toggle('collapsed');
    main.classList.toggle('collapsed');
    toggle.classList.toggle('collapsed');
}

(function smoothSectionScroll() {
    const sections = Array.from(document.querySelectorAll('.content-section'));
    const main = document.querySelector('main');
    window.currentIndex = 0;
    let isScrolling = false;

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    });

main.addEventListener('wheel', (e) => {
const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
const carousel = elementUnderMouse?.closest('.project-carousel');

if (carousel) {
    const scrollLeft = carousel.scrollLeft;
    const maxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;
    const goingLeft = e.deltaY < 0;
    const goingRight = e.deltaY > 0;

    const canScrollLeft = scrollLeft > 0;
    const canScrollRight = scrollLeft < maxScrollLeft;

    if ((goingLeft && canScrollLeft) || (goingRight && canScrollRight)) {
    e.preventDefault();
    return;
    }
}

if (isScrolling) {
    e.preventDefault();
    return;
}

if (e.deltaY > 50 && currentIndex < sections.length - 1) {
    currentIndex++;
} else if (e.deltaY < -50 && currentIndex > 0) {
    currentIndex--;
} else {
    return;
}

isScrolling = true;
e.preventDefault();
sections[currentIndex].scrollIntoView({ behavior: 'smooth' });

setTimeout(() => {
        isScrolling = false;
    }, 600);
  }, { passive: false });
})();

const texts = document.querySelectorAll(".wave-text");

texts.forEach((text) => {
  const chars = text.textContent.split("");
  text.innerHTML = chars
    .map((char, i) => {
      if (char === " ") {
        return `<span style="--i:${i}; display:inline-block; width:0.5em;">&nbsp;</span>`;
      } else {
        return `<span style="--i:${i}">${char}</span>`;
      }
    })
    .join("");
});