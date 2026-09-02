/* ============================================================
   CAPTCHA ZIDANE — une blague, pas une protection
   ============================================================

   Il faut le dire ici pour que personne ne s'y trompe : la réponse est
   dans cette page. N'importe quel robot la lit en deux lignes. Ce n'est
   pas un défaut de réalisation, c'est inhérent à un site statique sans
   serveur. Le formulaire de contact, lui, est protégé par Web3Forms et
   par son piège à robots — c'est là que se joue le vrai filtrage.

   ---- AJOUTER LES PHOTOS ----
   Déposer les fichiers dans images/zidane/ puis remplir les deux listes
   ci-dessous. Tant qu'elles sont vides, la grille affiche des vignettes
   numérotées : le mécanisme est testable sans une seule image.

   `tools/images.py` ne balaie que images/*.jpg, jamais les sous-dossiers :
   les fichiers déposés ici ne seront donc pas convertis en WebP. Les
   redimensionner à la main avant, autour de 600 px de côté.
   ============================================================ */

const ZIDANE = [
  { src: 'images/zidane/blur-background.webp' },
  { src: 'images/zidane/honneur.webp' },
  { src: 'images/zidane/laughing.webp' },
  { src: 'images/zidane/looking-at-you.webp' },
  { src: 'images/zidane/pleure.webp' },
  { src: 'images/zidane/shocked.webp' },
  { src: 'images/zidane/tab_image.webp' },
  { src: 'images/zidane/tripes.webp' },
  { src: 'images/zidane/zidane-lunette.webp' },
];

/* Que des chauves : c'est là qu'est la blague. Il faut reconnaître Zidane,
   pas repérer le seul crâne rasé de la grille. */
const INTRUS = [
  { src: 'images/zidane/chauve1.webp' },
  { src: 'images/zidane/chauve2.webp' },
  { src: 'images/zidane/chauve3.webp' },
  { src: 'images/zidane/chauve4.webp' },
  { src: 'images/zidane/chauve5.webp' },
  { src: 'images/zidane/chauve6.webp' },
  { src: 'images/zidane/chauve7.webp' },
  { src: 'images/zidane/chauve8.webp' },
  { src: 'images/zidane/chauve9.webp' },
  { src: 'images/zidane/chauve10.webp' },
  { src: 'images/zidane/chauve11.webp' },
  { src: 'images/zidane/chauve12.webp' },
  { src: 'images/zidane/chauve13.webp' },
  { src: 'images/zidane/chauve14.webp' },
  { src: 'images/zidane/chauve15.webp' },
  { src: 'images/zidane/chauve16.webp' },
];

const CASES = 9;          // grille de 3 x 3
const MIN_ZIDANE = 2;     // jamais moins, sinon la grille se devine
const MAX_ZIDANE = 4;     // jamais plus, sinon il n'y a plus de jeu

const melange = (liste) => {
  const t = [...liste];
  for (let i = t.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
  }
  return t;
};

const tirer = (liste, n) => melange(liste).slice(0, n);

/* Sans photos — ou sans assez de photos — on fabrique des vignettes
   numérotées : la grille reste jouable et l'on voit tout de suite si la
   mécanique tient. Il faut au moins MIN_ZIDANE Zidane et de quoi remplir
   le reste de la grille, sinon on afficherait une grille incomplète sans
   que rien ne le signale. */
const ASSEZ_INTRUS = CASES - MIN_ZIDANE;

function demo() {
  if (ZIDANE.length >= MIN_ZIDANE && INTRUS.length >= ASSEZ_INTRUS) return false;
  if (ZIDANE.length || INTRUS.length) {
    console.warn(`[Clouks] captcha : il faut au moins ${MIN_ZIDANE} Zidane et ` +
                 `${ASSEZ_INTRUS} intrus. Il y en a ${ZIDANE.length} et ` +
                 `${INTRUS.length} — grille de démonstration affichée.`);
  }
  return true;
}

function composer() {
  const enDemo = demo();

  /* Combien de Zidane dans cette grille. Trois contraintes :
     jamais plus que MAX_ZIDANE, jamais plus qu'on n'en a, et jamais si peu
     que les intrus ne suffisent plus à remplir les cases restantes. */
  const haut = enDemo ? MAX_ZIDANE : Math.min(MAX_ZIDANE, ZIDANE.length);
  const bas  = enDemo ? MIN_ZIDANE : Math.max(MIN_ZIDANE, CASES - INTRUS.length);
  const combien = bas + Math.floor(Math.random() * (haut - bas + 1));

  if (enDemo) {
    const faux = (bon, i) => ({ bon, demo: true, libelle: bon ? `Zidane ${i}` : `Intrus ${i}` });
    return melange([
      ...Array.from({ length: combien }, (_, i) => faux(true, i + 1)),
      ...Array.from({ length: CASES - combien }, (_, i) => faux(false, i + 1)),
    ]);
  }

  return melange([
    ...tirer(ZIDANE, combien).map((p) => ({ ...p, bon: true })),
    ...tirer(INTRUS, CASES - combien).map((p) => ({ ...p, bon: false })),
  ]);
}

function demarrer(racine) {
  const grille = racine.querySelector('[data-captcha-grille]');
  const bouton = racine.querySelector('[data-captcha-valider]');
  const dire   = racine.querySelector('[data-captcha-message]');
  const gagne  = racine.querySelector('[data-captcha-gagne]');
  if (!grille || !bouton || !dire || !gagne) return;

  let tuiles = [];
  let essais = 0;

  function poser() {
    tuiles = composer();
    grille.innerHTML = tuiles.map((t, i) => `
      <button type="button" class="zi-case${t.demo ? ' zi-case-demo' : ''}"
              data-i="${i}" aria-pressed="false"
              aria-label="Image ${i + 1}${t.demo ? ' — ' + t.libelle : ''}">
        ${t.demo ? `<span>${t.libelle}</span>`
                 : `<img src="${t.src}" alt="" loading="lazy" />`}
      </button>`).join('');
    dire.textContent = '';
    dire.className = 'zi-message';
  }

  grille.addEventListener('click', (e) => {
    const c = e.target.closest('.zi-case');
    if (!c) return;
    c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
  });

  bouton.addEventListener('click', () => {
    const choisies = [...grille.querySelectorAll('.zi-case')]
      .map((c, i) => (c.getAttribute('aria-pressed') === 'true' ? i : -1))
      .filter((i) => i >= 0);
    const attendues = tuiles.map((t, i) => (t.bon ? i : -1)).filter((i) => i >= 0);

    const juste = choisies.length === attendues.length
      && choisies.every((i) => attendues.includes(i));

    if (!juste) {
      essais += 1;
      dire.className = 'zi-message zi-rate';
      dire.textContent = choisies.length === 0
        ? 'Il faut en choisir au moins un.'
        : (essais > 2 ? 'Toujours pas. On recommence, plus lentement.'
                      : 'Raté. Nouvelle grille.');
      grille.classList.remove('zi-secoue');
      void grille.offsetWidth;               // relance l'animation
      grille.classList.add('zi-secoue');
      setTimeout(poser, 620);
      return;
    }

    racine.querySelector('[data-captcha-jeu]').hidden = true;
    gagne.hidden = false;
    gagne.focus();

    /* Le même feu d'artifice que le nez de l'accueil, tiré depuis le centre
       de l'écran. Absent si la page n'a pas le canevas : on ne fait rien. */
    if (typeof window.clouksFeu === 'function') {
      window.clouksFeu(innerWidth / 2, innerHeight * 0.55);
    }
  });

  poser();
}

document.querySelectorAll('[data-captcha]').forEach(demarrer);
