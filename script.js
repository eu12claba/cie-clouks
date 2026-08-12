// Cie Clouks — cieclouks.ch

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const D  = window.CLOUKS || { creations: [], horsFormat: [], dates: [] };

/* ============================================================
   DATES
   ============================================================ */
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
              'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

const jour0 = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
const parseDate = (s) => { const [y, m, d] = String(s).split('-').map(Number); return new Date(y, m - 1, d); };

const spectacles = () => [...(D.creations || []), ...(D.horsFormat || [])];
const parSlug = (slug) => spectacles().find((s) => s.slug === slug);

const toutesDates = (D.dates || []).filter((d) => d && d.date);
const aVenir  = toutesDates.filter((d) => parseDate(d.date) >= jour0()).sort((a, b) => a.date.localeCompare(b.date));
const passees = toutesDates.filter((d) => parseDate(d.date) <  jour0()).sort((a, b) => b.date.localeCompare(a.date));

const nomSpectacle = (d) => (parSlug(d.spectacle)?.texte) || d.spectacle || '';
const lienSpectacle = (d) => (parSlug(d.spectacle) ? `/${d.spectacle}` : null);

/* ============================================================
   NAVIGATION — sous-menus construits depuis data.js
   ============================================================ */
$$('[data-sub]').forEach((ul) => {
  const liste = D[ul.dataset.sub] || [];
  ul.innerHTML = liste.map((i) => `<li><a href="/${i.slug}">${i.titre}</a></li>`).join('');
});

// rubrique active
(() => {
  const ici = location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  $$('#navLinks a').forEach((a) => {
    const href = a.getAttribute('href').replace(/\.html$/, '');
    if (href === ici && ici !== '/') a.setAttribute('aria-current', 'page');
  });
  const item = spectacles().find((s) => `/${s.slug}` === ici);
  if (item) {
    const parent = D.creations.includes(item) ? '/creations' : '/hors-format';
    $$('#navLinks a').forEach((a) => { if (a.getAttribute('href') === parent) a.classList.add('is-section'); });
  }
})();

const navbar = $('#navbar');
if (navbar && !navbar.classList.contains('is-solid')) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

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
  navLinks.addEventListener('click', (e) => { if (e.target.tagName === 'A') setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) setMenu(false);
  });
}

/* ============================================================
   BANDES (listes Créations / Hors format)
   ============================================================ */
const visuelBande = (i) => i.image
  ? `<img src="${i.image}" alt="" aria-hidden="true" />`
  : `<div class="photo-todo" aria-hidden="true"><span>Photo à venir</span></div>`;

$$('[data-bands]').forEach((el) => {
  const liste = D[el.dataset.bands] || [];
  el.innerHTML = liste.map((i) => `
      <a class="creation-band${i.image ? '' : ' no-photo'}" href="/${i.slug}">
        ${visuelBande(i)}
        <div class="creation-inner">
          <p class="creation-meta">${i.meta || ''}</p>
          <h2>${i.titre}</h2>
          ${i.desc ? `<p class="creation-desc">${i.desc}</p>` : ''}
          <span class="creation-cta">Voir la page</span>
        </div>
      </a>`).join('');
});

/* ============================================================
   À L'AFFICHE — la prochaine date, sinon rien
   ============================================================ */
const affiche = $('#affiche');
if (affiche) {
  const p = aVenir[0];
  if (p) {
    const d = parseDate(p.date);
    const lien = lienSpectacle(p);
    const spec = parSlug(p.spectacle);
    affiche.hidden = false;
    affiche.innerHTML = `
      <div class="wrap"><p class="label label-light">À l'affiche</p></div>
      <a class="affiche-band${spec && spec.image ? '' : ' no-photo'}" href="${lien || '/agenda'}">
        ${spec && spec.image ? `<img src="${spec.image}" alt="" aria-hidden="true" />`
                             : `<div class="photo-todo" aria-hidden="true"><span>Photo à venir</span></div>`}
        <div class="affiche-inner">
          <p class="affiche-date">${d.getDate()} ${MOIS[d.getMonth()]} ${d.getFullYear()}${p.heure ? ` · ${p.heure}` : ''}</p>
          <h2>${spec ? spec.titre : nomSpectacle(p)}</h2>
          <p class="affiche-lieu">${[p.lieu, p.ville].filter(Boolean).join(' — ')}</p>
          <span class="affiche-cta">${lien ? 'Découvrir le spectacle' : "Voir l'agenda"}</span>
        </div>
      </a>`;
  }
}

/* ---- arrivée directe sur « À l'affiche » (le hero reste au-dessus) ---- */
if (affiche && !affiche.hidden && !location.hash) {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const aller = () => {
    const y = affiche.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y, behavior: 'auto' });
  };
  aller();
  window.addEventListener('load', aller, { once: true });
}

/* ============================================================
   AGENDA
   ============================================================ */
const ligneDate = (d, passe = false) => {
  const dt = parseDate(d.date);
  const lien = lienSpectacle(d);
  const titre = nomSpectacle(d);
  return `
    <div class="date-row${passe ? ' is-past' : ''}">
      <div class="date-when">
        <span class="date-day">${dt.getDate()}</span>
        <span class="date-mon">${MOIS[dt.getMonth()]} ${dt.getFullYear()}</span>
      </div>
      <div class="date-what">
        <p class="date-show">${lien ? `<a href="${lien}">${titre}</a>` : titre}</p>
        <p class="date-place">${[d.lieu, d.ville, d.heure].filter(Boolean).join(' · ')}</p>
      </div>
      ${!passe && d.billetterie
        ? `<a class="btn btn-line btn-sm" href="${d.billetterie}" target="_blank" rel="noopener">Réserver</a>`
        : ''}
    </div>`;
};

const blocFutures = $('[data-dates="futures"]');
if (blocFutures) {
  blocFutures.innerHTML = aVenir.length
    ? aVenir.map((d) => ligneDate(d)).join('')
    : `<div class="dates-empty">
         <p class="dates-empty-title">Dates en cours de programmation</p>
         <p class="dates-empty-text">La compagnie se déplace en salle comme en espace public, en Suisse et ailleurs.
            Pour organiser une représentation, écrivez-nous.</p>
         <div class="dates-empty-actions">
           <a href="/#contact" class="btn btn-solid">Nous contacter</a>
           <a href="/creations" class="btn btn-line">Voir les créations</a>
         </div>
       </div>`;
}

const blocPassees = $('[data-dates="passees"]');
if (blocPassees) {
  blocPassees.innerHTML = passees.length
    ? passees.map((d) => ligneDate(d, true)).join('')
    : `<p class="empty">Aucune date passée enregistrée pour l'instant.</p>`;
}

/* ---- calendrier d'un spectacle ---- */
$$('[data-calendrier]').forEach((el) => {
  const slug = el.dataset.calendrier;
  const list = passees.filter((d) => d.spectacle === slug);
  const parAnnee = {};
  list.forEach((d) => { (parAnnee[d.date.slice(0, 4)] ||= []).push(d); });
  const annees = Object.keys(parAnnee).sort((a, b) => b.localeCompare(a));

  el.innerHTML = (annees.length
    ? annees.map((an) => `
        <div class="year-row">
          <p class="year">${an}</p>
          <ul class="year-dates">
            ${parAnnee[an].map((d) => {
              const dt = parseDate(d.date);
              return `<li>${dt.getDate()} ${MOIS[dt.getMonth()]}${d.heure ? `, ${d.heure}` : ''} — ${[d.lieu, d.ville].filter(Boolean).join(', ')}</li>`;
            }).join('')}
          </ul>
        </div>`).join('')
    : `<p class="empty">Les dates passées seront listées ici.</p>`)
    + `<p class="block-more">Toutes les dates sont sur la page <a href="/agenda">Agenda</a>.</p>`;
});

/* ============================================================
   HERO
   ============================================================ */
$$('[data-split]').forEach((el) => {
  const mot = el.textContent.trim();
  el.setAttribute('aria-label', mot);
  el.textContent = '';
  [...mot].forEach((c, i) => {
    const s = document.createElement('span');
    s.className = 'ch'; s.textContent = c;
    s.style.setProperty('--i', i);
    s.setAttribute('aria-hidden', 'true');
    el.appendChild(s);
  });
});

const revealTargets = $$('[data-reveal]');
if (reduced || !('IntersectionObserver' in window)) {
  revealTargets.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  revealTargets.forEach((el) => io.observe(el));
}

// parallaxe : appliquée au conteneur pour que le nez suive l'image
const heroMedia = $('.hero-media');
if (heroMedia && !reduced) {
  let tick = false;
  window.addEventListener('scroll', () => {
    if (tick) return;
    tick = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.3) heroMedia.style.transform = `translate3d(0, ${y * 0.16}px, 0)`;
      tick = false;
    });
  }, { passive: true });
}

/* ============================================================
   LE NEZ — position calée sur la photo
   ============================================================ */
const NEZ = { x: 0.566, y: 0.197 };   // fraction de l'image source

function placerNez() {
  const hm = $('.hero-media'), img = $('#heroImg'), nez = $('#nose');
  if (!hm || !img || !nez || !img.naturalWidth) return;
  const hr = hm.getBoundingClientRect(), ir = img.getBoundingClientRect();
  const k = Math.max(ir.width / img.naturalWidth, ir.height / img.naturalHeight);
  const w = img.naturalWidth * k, h = img.naturalHeight * k;
  const ox = (ir.width - w) / 2;      // object-position : center
  const oy = (ir.height - h) * 0.18;  // object-position : 18%
  nez.style.left = `${(ir.left - hr.left) + ox + w * NEZ.x}px`;
  nez.style.top  = `${(ir.top  - hr.top)  + oy + h * NEZ.y}px`;
  nez.style.visibility = 'visible';
}
if ($('#nose')) {
  const img = $('#heroImg');
  if (img.complete) placerNez(); else img.addEventListener('load', placerNez, { once: true });
  window.addEventListener('resize', placerNez, { passive: true });
}

/* ============================================================
   FEU D'ARTIFICE
   ============================================================ */
(() => {
  const cv = $('#fx');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  let W = 0, H = 0, particules = [], fusees = [], anim = null;

  const taille = () => {
    const r = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.width  = Math.floor(innerWidth  * r);
    H = cv.height = Math.floor(innerHeight * r);
    cv.style.width = innerWidth + 'px';
    cv.style.height = innerHeight + 'px';
    ctx.setTransform(r, 0, 0, r, 0, 0);
  };
  taille();
  window.addEventListener('resize', taille, { passive: true });

  class Etincelle {
    constructor(x, y, teinte, force) {
      const a = Math.random() * Math.PI * 2;
      const v = (Math.random() ** 0.5) * force + 1;
      this.x = x; this.y = y;
      this.vx = Math.cos(a) * v;
      this.vy = Math.sin(a) * v;
      this.g = 0.055;
      this.frein = 0.982;
      this.alpha = 1;
      this.decay = Math.random() * 0.013 + 0.009;
      this.teinte = teinte + (Math.random() - 0.5) * 26;
      this.lum = Math.random() * 22 + 58;
      this.scint = Math.random() * 0.5 + 0.5;
      this.r = Math.random() * 1.6 + 1;
    }
    update() {
      this.vx *= this.frein; this.vy = this.vy * this.frein + this.g;
      this.x += this.vx; this.y += this.vy;
      this.alpha -= this.decay;
    }
    draw() {
      const a = this.alpha * (0.65 + Math.sin(performance.now() / 60 * this.scint) * 0.35);
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - this.vx * 3, this.y - this.vy * 3);
      ctx.strokeStyle = `hsla(${this.teinte}, 100%, ${this.lum}%, ${Math.max(a, 0)})`;
      ctx.lineWidth = this.r;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
  }

  class Fusee {
    constructor(x, y, cible, teinte) {
      this.x = x; this.y = y;
      this.cible = cible;
      this.teinte = teinte;
      const dx = cible.x - x, dy = cible.y - y;
      const dist = Math.hypot(dx, dy) || 1;
      const v = 9;
      this.vx = dx / dist * v; this.vy = dy / dist * v;
      this.vivant = true;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      this.vy += 0.06;
      if (this.vy >= 0 || Math.hypot(this.cible.x - this.x, this.cible.y - this.y) < 16) {
        this.vivant = false;
        bouquet(this.x, this.y, this.teinte, 1);
      }
    }
    draw() {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - this.vx * 2.2, this.y - this.vy * 2.2);
      ctx.strokeStyle = `hsla(${this.teinte}, 100%, 80%, .95)`;
      ctx.lineWidth = 2.4; ctx.lineCap = 'round';
      ctx.stroke();
    }
  }

  function bouquet(x, y, teinte, ampleur = 1) {
    const n = Math.round((80 + Math.random() * 60) * ampleur);
    const force = (6 + Math.random() * 3) * ampleur;
    for (let i = 0; i < n; i++) particules.push(new Etincelle(x, y, teinte, force));
  }

  function boucle() {
    // on efface en douceur : garde des traînées sans assombrir la page
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,0.16)';
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    ctx.globalCompositeOperation = 'lighter';

    fusees.forEach((f) => { f.update(); f.draw(); });
    fusees = fusees.filter((f) => f.vivant);
    particules.forEach((p) => { p.update(); p.draw(); });
    particules = particules.filter((p) => p.alpha > 0 && p.y < innerHeight + 60);

    if (particules.length || fusees.length) {
      anim = requestAnimationFrame(boucle);
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      cv.classList.remove('is-on');
      anim = null;
    }
  }

  function tirer(x, y) {
    cv.classList.add('is-on');
    const base = Math.random() * 360;
    bouquet(x, y, base, 1.15);
    // quelques fusées qui partent du nez et éclatent plus haut
    const n = 3 + Math.floor(Math.random() * 2);
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        if (!cv.classList.contains('is-on')) cv.classList.add('is-on');
        const cible = {
          x: x + (Math.random() - 0.5) * innerWidth * 0.55,
          y: y - (innerHeight * (0.18 + Math.random() * 0.3)),
        };
        fusees.push(new Fusee(x, y, cible, (base + 60 + i * 55) % 360));
        if (!anim) anim = requestAnimationFrame(boucle);
      }, 120 + i * 190);
    }
    if (!anim) anim = requestAnimationFrame(boucle);
  }

  const nez = $('#nose');
  if (nez) {
    nez.addEventListener('click', (e) => {
      e.preventDefault();
      const r = nez.getBoundingClientRect();
      // mouvement réduit : un seul bouquet, sans fusées
      if (reduced) {
        cv.classList.add('is-on');
        bouquet(r.left + r.width / 2, r.top + r.height / 2, Math.random() * 360, 1);
        if (!anim) anim = requestAnimationFrame(boucle);
        return;
      }
      tirer(r.left + r.width / 2, r.top + r.height / 2);
      nez.classList.add('pop');
      setTimeout(() => nez.classList.remove('pop'), 400);
    });
  }
})();

/* ============================================================
   GALERIE — visionneuse
   ============================================================ */
const lightbox = $('#lightbox');
if (lightbox) {
  const lbImg = $('#lbImg'), lbCap = $('#lbCap');
  const boutons = $$('.g-btn');
  let index = 0, dernierFocus = null;

  const montrer = (i) => {
    index = (i + boutons.length) % boutons.length;
    const b = boutons[index];
    lbImg.src = b.dataset.full;
    lbImg.alt = b.querySelector('img')?.alt || '';
    lbCap.textContent = b.dataset.cap || '';
  };
  const ouvrir = (i) => {
    dernierFocus = document.activeElement;
    montrer(i);
    lightbox.hidden = false;
    document.body.classList.add('lb-open');
    requestAnimationFrame(() => lightbox.classList.add('is-open'));
    $('#lbClose').focus();
  };
  const fermer = () => {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('lb-open');
    setTimeout(() => { lightbox.hidden = true; lbImg.src = ''; }, 300);
    dernierFocus?.focus();
  };

  boutons.forEach((b, i) => b.addEventListener('click', () => ouvrir(i)));
  $('#lbClose').addEventListener('click', fermer);
  $('#lbPrev').addEventListener('click', () => montrer(index - 1));
  $('#lbNext').addEventListener('click', () => montrer(index + 1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) fermer(); });
  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') fermer();
    if (e.key === 'ArrowLeft') montrer(index - 1);
    if (e.key === 'ArrowRight') montrer(index + 1);
  });
}

/* ============================================================
   TEASER — la vidéo ne se charge qu'au clic
   ============================================================ */
$$('[data-video]').forEach((box) => {
  const id = (box.dataset.yt || '').trim();
  if (!id) { box.innerHTML = '<p class="video-empty">Teaser à venir.</p>'; return; }
  const vignette = document.createElement('img');
  vignette.src = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  vignette.alt = ''; vignette.loading = 'lazy';
  const play = document.createElement('button');
  play.className = 'video-play'; play.type = 'button';
  play.setAttribute('aria-label', box.dataset.title || 'Lire la vidéo');
  box.append(vignette, play);
  play.addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    f.title = box.dataset.title || 'Teaser';
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    f.allowFullscreen = true;
    box.innerHTML = ''; box.appendChild(f);
  });
});

/* ============================================================
   DOSSIERS PDF — lien seulement si le fichier existe
   ============================================================ */
$$('[data-doc]').forEach(async (a) => {
  try { if ((await fetch(a.getAttribute('href'), { method: 'HEAD' })).ok) return; } catch (_) {}
  const label = a.textContent.trim();
  a.setAttribute('href', 'mailto:contact@cieclouks.ch?subject=' + encodeURIComponent(`Demande — ${label}`));
  a.setAttribute('title', `${label} disponible sur demande`);
  a.textContent = `${label} — sur demande`;
});

/* ============================================================
   FORMULAIRE
   ============================================================ */
const form = $('#contactForm');
if (form) {
  const note = $('#formNote');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nom = $('#cfNom').value.trim();
    const email = $('#cfEmail').value.trim();
    const message = $('#cfMessage').value.trim();
    if (!nom || !email) {
      note.textContent = 'Merci d’indiquer votre nom et votre email.';
      note.classList.add('error');
      return;
    }
    note.classList.remove('error');
    note.textContent = 'Ouverture de votre logiciel de messagerie…';
    window.location.href = 'mailto:contact@cieclouks.ch'
      + '?subject=' + encodeURIComponent('[Site] Prise de contact')
      + '&body=' + encodeURIComponent(`${message}\n\n—\n${nom}\n${email}`);
  });
}

const year = $('#year');
if (year) year.textContent = new Date().getFullYear();
