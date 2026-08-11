// Cie Clouks — cieclouks.ch

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// ---- Barre de navigation ----
const navbar = $('#navbar');
if (navbar && !navbar.classList.contains('is-solid')) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ---- Menu mobile ----
const navToggle = $('#navToggle');
const navLinks  = $('#navLinks');
if (navToggle && navLinks) {
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
}

// ---- Le mot du hero, lettre par lettre ----
$$('[data-split]').forEach((el) => {
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
const revealTargets = $$('[data-reveal]');
if (reduced || !('IntersectionObserver' in window)) {
  revealTargets.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  revealTargets.forEach((el) => io.observe(el));
}

// ---- Parallaxe douce sur l'image du hero ----
const heroImg = $('#heroImg');
if (heroImg && !reduced) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.2) heroImg.style.transform = `translate3d(0, ${y * 0.16}px, 0)`;
      ticking = false;
    });
  }, { passive: true });
}

// ---- Galerie : visionneuse ----
const lightbox = $('#lightbox');
if (lightbox) {
  const lbImg   = $('#lbImg');
  const lbCap   = $('#lbCap');
  const buttons = $$('.g-btn');
  let index = 0;
  let lastFocus = null;

  const show = (i) => {
    index = (i + buttons.length) % buttons.length;
    const b = buttons[index];
    lbImg.src = b.dataset.full;
    lbImg.alt = b.querySelector('img')?.alt || '';
    lbCap.textContent = b.dataset.cap || '';
  };

  const open = (i) => {
    lastFocus = document.activeElement;
    show(i);
    lightbox.hidden = false;
    document.body.classList.add('lb-open');
    requestAnimationFrame(() => lightbox.classList.add('is-open'));
    $('#lbClose').focus();
  };

  const close = () => {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('lb-open');
    setTimeout(() => { lightbox.hidden = true; lbImg.src = ''; }, 300);
    lastFocus?.focus();
  };

  buttons.forEach((b, i) => b.addEventListener('click', () => open(i)));
  $('#lbClose').addEventListener('click', close);
  $('#lbPrev').addEventListener('click', () => show(index - 1));
  $('#lbNext').addEventListener('click', () => show(index + 1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
}

// ---- Teaser YouTube : on ne charge la vidéo qu'au clic ----
const video = $('#teaser');
if (video) {
  const id = (video.dataset.yt || '').trim();
  if (!id) {
    video.innerHTML = '<p class="video-empty">Teaser à venir.</p>';
  } else {
    const thumb = document.createElement('img');
    thumb.src = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
    thumb.alt = '';
    thumb.loading = 'lazy';
    const play = document.createElement('button');
    play.className = 'video-play';
    play.type = 'button';
    play.setAttribute('aria-label', video.dataset.title || 'Lire la vidéo');
    video.append(thumb, play);
    play.addEventListener('click', () => {
      const f = document.createElement('iframe');
      f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      f.title = video.dataset.title || 'Teaser';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      f.allowFullscreen = true;
      video.innerHTML = '';
      video.appendChild(f);
    });
  }
}

// ---- Dossier / fiche technique : lien seulement si le PDF existe ----
$$('[data-doc]').forEach(async (a) => {
  const href = a.getAttribute('href');
  try {
    const res = await fetch(href, { method: 'HEAD' });
    if (res.ok) return;
  } catch (_) { /* hors ligne ou bloqué : on retombe sur le mail */ }
  const label = a.textContent.trim();
  a.setAttribute('href', 'mailto:contact@cieclouks.ch?subject=' + encodeURIComponent(`Demande — ${label}`));
  a.setAttribute('title', `${label} disponible sur demande`);
  a.textContent = `${label} — sur demande`;
});

// ---- Formulaire de contact ----
// Hébergement statique : pas de backend. On compose un mailto: fiable
// plutôt qu'un <form action="mailto:">, que la plupart des navigateurs ignorent.
const form = $('#contactForm');
if (form) {
  const note = $('#formNote');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nom     = $('#cfNom').value.trim();
    const email   = $('#cfEmail').value.trim();
    const message = $('#cfMessage').value.trim();

    if (!nom || !email) {
      note.textContent = 'Merci d’indiquer votre nom et votre email.';
      note.classList.add('error');
      return;
    }
    note.classList.remove('error');
    note.textContent = 'Ouverture de votre logiciel de messagerie…';

    const corps = `${message}\n\n—\n${nom}\n${email}`;
    window.location.href = 'mailto:contact@cieclouks.ch'
      + '?subject=' + encodeURIComponent('[Site] Prise de contact')
      + '&body='    + encodeURIComponent(corps);
  });
}

// ---- Année ----
const year = $('#year');
if (year) year.textContent = new Date().getFullYear();
