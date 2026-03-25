/* ======================================
   VÂNIA CONDE — Interaction Layer
   ====================================== */

// --- Navbar scroll behaviour ---
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  // Scrolled class for background
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link highlight
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run on load

// --- Mobile hamburger menu ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const isOpen = mobileMenu.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  // Animate hamburger to X
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// --- Intersection Observer for scroll reveal ---
const revealEls = document.querySelectorAll('.section > .container > *, .servico-card, .depoimento-card, .contacto-item, .pillar');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Add reveal class and stagger delay for grid children
document.querySelectorAll('.servicos-grid .servico-card').forEach((el, i) => {
  el.classList.add('reveal', `reveal-delay-${i + 1}`);
  observer.observe(el);
});
document.querySelectorAll('.depoimentos-grid .depoimento-card').forEach((el, i) => {
  el.classList.add('reveal', `reveal-delay-${i + 1}`);
  observer.observe(el);
});
document.querySelectorAll('.contacto-item').forEach((el, i) => {
  el.classList.add('reveal', `reveal-delay-${i + 1}`);
  observer.observe(el);
});
document.querySelectorAll('.pillar').forEach((el, i) => {
  el.classList.add('reveal', `reveal-delay-${i + 1}`);
  observer.observe(el);
});

// Reveal the main section containers
['.sobre-grid', '.abordagem-inner', '.mapa-wrap', '.abordagem-quote'].forEach(sel => {
  const el = document.querySelector(sel);
  if (el) { el.classList.add('reveal'); observer.observe(el); }
});
