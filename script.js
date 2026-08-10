// Cie Clouks — cieclouks.ch

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- Barre de navigation ----
const navbar = document.getElementById('navbar');
const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---- Menu mobile ----
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

const setMenu = (open) => {
  navLinks.classList.toggle('open', open);
  document.body.classList.toggle('nav-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
};

navToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
navLinks.querySelectorAll('a').forEach((l) => l.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) setMenu(false);
});

// ---- Le mot du hero, lettre par lettre ----
document.querySelectorAll('[data-split]').forEach((el) => {
  const word = el.textContent.trim();
  el.setAttribute('aria-label', word);
  el.textContent = '';
  [...word].forEach((c, i) => {
    const s = document.createElement('span');
    s.className = 'ch';
    s.textContent = c;
    s.style.setProperty('--i', i);
    s.setAttribute('aria-hidden', 'true');
    el.appendChild(s);
  });
});

// ---- Apparition au scroll ----
const targets = document.querySelectorAll('[data-reveal]');
if (reduced || !('IntersectionObserver' in window)) {
  targets.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  targets.forEach((el) => io.observe(el));
}

// ---- Parallaxe douce sur l'image du hero ----
const heroImg = document.getElementById('heroImg');
if (heroImg && !reduced) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        heroImg.style.transform = `translate3d(0, ${y * 0.16}px, 0)`;
      }
      ticking = false;
    });
  }, { passive: true });
}

// ---- Formulaire de contact ----
// Hébergement statique : pas de backend. On compose un mailto: fiable
// plutôt qu'un <form action="mailto:">, que la plupart des navigateurs ignorent.
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nom     = document.getElementById('cfNom').value.trim();
  const email   = document.getElementById('cfEmail').value.trim();
  const sujet   = document.getElementById('cfSujet').value;
  const message = document.getElementById('cfMessage').value.trim();

  if (!nom || !email) {
    note.textContent = 'Merci d’indiquer votre nom et votre email.';
    note.classList.add('error');
    return;
  }

  note.classList.remove('error');
  note.textContent = 'Ouverture de votre logiciel de messagerie…';

  const corps = `${message}\n\n—\n${nom}\n${email}`;
  const href = 'mailto:contact@cieclouks.ch'
    + '?subject=' + encodeURIComponent(`[Site] ${sujet}`)
    + '&body='    + encodeURIComponent(corps);

  window.location.href = href;
});

// ---- Année ----
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
