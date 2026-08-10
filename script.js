// Cie Clouks — cieclouks.ch

// ---- Navbar au scroll ----
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
navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) setMenu(false);
});

// ---- Apparition au scroll ----
const revealed = [
  '.compagnie-text', '.compagnie-img',
  '.spectacle-visuel', '.spectacle-content',
  '.agenda-header', '.agenda-list',
  '.equipe-header', '.membre',
  '.contact-text', '.contact-form',
];

const targets = document.querySelectorAll(revealed.join(','));
targets.forEach((el) => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  targets.forEach((el) => observer.observe(el));
} else {
  targets.forEach((el) => el.classList.add('in'));
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

// ---- Année du copyright ----
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
