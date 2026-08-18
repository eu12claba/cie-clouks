/* ==========================================================
   CIE CLOUKS — LE SEUL FICHIER À MODIFIER POUR LE CONTENU
   ==========================================================

   Tout part d'ici : le menu déroulant, la page Agenda,
   le bloc « À l'affiche » de l'accueil et le calendrier de
   chaque spectacle.

   ---- AJOUTER UNE DATE ----
   Ajouter une ligne dans DATES. Le site range tout seul :
     - date future  -> Agenda « À venir » + bloc « À l'affiche »
     - date passée  -> Agenda « Dates passées » + calendrier du spectacle
   Si aucune date future n'est enregistrée, le bloc « À l'affiche »
   de l'accueil disparaît complètement.

   Le format de la date est AAAA-MM-JJ.
   « spectacle » doit reprendre exactement un « slug » ci-dessous.
   ========================================================== */

window.CLOUKS = {

  /* ---------- LES CRÉATIONS ---------- */
  creations: [
    {
      slug:  'sortez-les-mouchoirs',
      titre: 'Sortez les <em>mouchoirs&nbsp;!</em>',
      texte: 'Sortez les mouchoirs !',
      meta:  'Solo · Clown & violon · Salle et espace public',
      desc:  "Une clowne débarque dans la rue avec une mission solennelle : émouvoir aux larmes pour laver la société de ses maux.",
      image: 'images/plage-six-pompes-1.jpg',
    },
    {
      slug:  'chichiclack',
      titre: 'Cornelius &amp; Chichiclac',
      texte: 'Cornelius & Chichiclac',
      meta:  'Création passée',
      desc:  '',
      image: 'images/cornelius-chichiclac.jpg',
    },
    {
      // Regroupe deux concerts : Le fil d'Ariane et Le Carnaval des animaux.
      // L'ancienne adresse /le-fil-d-ariane redirige vers cette page.
      slug:  'concerts-avec-recitante',
      titre: 'Concerts avec récitante',
      texte: 'Concerts avec récitante',
      meta:  'Création · Musique & récit',
      desc:  "Deux concerts où la musique se raconte : Le fil d'Ariane et Le Carnaval des animaux.",
      image: 'images/le-fil-d-ariane.jpg',
    },
    {
      slug:  'le-trio-vivigang',
      titre: 'Le trio ViViGang',
      texte: 'Le trio ViViGang',
      meta:  'Création',
      desc:  '',
      image: 'images/trio-vivigang-1.jpg',
    },
    {
      slug:  'duo-marie-anne-chipo',
      titre: 'Duo Marie-Anne &amp; Chipo',
      texte: 'Duo Marie-Anne & Chipo',
      meta:  'Concert clownesque · Clarinette & violon',
      desc:  '',
      image: null,
    },
  ],

  /* ---------- HORS FORMAT ---------- */
  horsFormat: [
    {
      slug:  'cabarets',
      titre: 'Cabarets',
      texte: 'Cabarets',
      meta:  'Hors format',
      desc:  '',
      image: 'images/cabarets-1.jpg',
    },
    {
      slug:  'impro-clown',
      titre: 'Impro clown',
      texte: 'Impro clown',
      meta:  'Hors format',
      desc:  '',
      image: null,
    },
    {
      slug:  'cours-clown',
      titre: 'Cours de clown',
      texte: 'Cours de clown',
      meta:  'Transmission · La Julienne, Plan-les-Ouates',
      desc:  'Un cours hebdomadaire de clown dès 16 ans, à la Julienne (Plan-les-Ouates), saison 2026–2027.',
      image: 'images/cours-clown-affiche.jpg',
    },
  ],

  /* ---------- LES GALERIES ----------
     Une galerie par spectacle, rangée en sous-catégories (un lieu, un
     festival, une série de dates). L'ordre ci-dessous est celui affiché.

     Une sous-catégorie sans photo affiche « Photos à venir » : on peut donc
     préparer les rubriques avant d'avoir les images.

     Pour ajouter une photo : la déposer dans images/, lancer
     `python tools/images.py`, puis ajouter une ligne
       { src: 'images/xxx.jpg', alt: '' }
     Le texte `alt` est lu par les lecteurs d'écran et par Google : décrire
     ce qu'on voit, pas « photo de spectacle ».
  */
  galeries: {
    'sortez-les-mouchoirs': [
      {
        titre: 'Cabarets et scènes ouvertes',
        photos: [],
      },
      {
        titre: 'La Plage des Six Pompes 2026',
        photos: [
          { src: 'images/plage-six-pompes-1.jpg',
            alt: '' },
          { src: 'images/plage-six-pompes-2.jpg',
            alt: '' },
          { src: 'images/plage-six-pompes-3.jpg',
            alt: '' },
          { src: 'images/plage-six-pompes-4.jpg',
            alt: '' },
          { src: 'images/plage-six-pompes-5.jpg',
            alt: '' },
        ],
      },
      {
        // Photos © Olivier Pascual
        titre: 'Festival du numéro de clown 2025',
        photos: [
          { src: 'images/numero-clown-1.jpg',
            alt: '' },
          { src: 'images/numero-clown-2.jpg',
            alt: '' },
          { src: 'images/numero-clown-3.jpg',
            alt: '' },
          { src: 'images/numero-clown-4.jpg',
            alt: '' },
          { src: 'images/numero-clown-5.jpg',
            alt: '' },
        ],
      },
      {
        titre: 'Festival Théâtre Nomades 2024',
        photos: [],
      },
    ],
    /* Les galeries ci-dessous n'ont pas de sous-catégorie : une seule
       rubrique sans titre, donc les photos s'affichent directement. */
    'chichiclack': [
      {
        titre: '',
        photos: [
          { src: 'images/cornelius-chichiclac.jpg',
            alt: '' },
        ],
      },
    ],
    'cabarets': [
      {
        titre: '',
        photos: [
          { src: 'images/cabarets-1.jpg',
            alt: '' },
          { src: 'images/cabarets-2.jpg',
            alt: '' },
          { src: 'images/cabarets-3.jpg',
            alt: '' },
          { src: 'images/cabarets-4.jpg',
            alt: '' },
        ],
      },
    ],
    'impro-clown': [
      {
        titre: '',
        photos: [],
      },
    ],
    'le-trio-vivigang': [
      {
        titre: '',
        photos: [
          { src: 'images/trio-vivigang-1.jpg',
            alt: '' },
          { src: 'images/trio-vivigang-2.jpg',
            alt: '' },
        ],
      },
    ],
    'concerts-avec-recitante': [
      {
        titre: "Le fil d'Ariane",
        photos: [
          { src: 'images/le-fil-d-ariane.jpg',
            alt: '' },
        ],
      },
      {
        titre: 'Le Carnaval des animaux',
        photos: [],
      },
    ],
    'duo-marie-anne-chipo': [
      {
        titre: '',
        photos: [],
      },
    ],
  },

  /* ---------- LA PRESSE ----------
     Une entrée par article, la plus récente en premier.

     `url`      : laisser vide pour un article papier — le bloc reste
                  affiché, simplement sans lien.
     `citation` : un extrait court, recopié mot pour mot. Ne jamais
                  résumer ni reformuler : c'est une citation.
     `media`    : nom du journal ou de la radio/TV.
  */
  presse: {
    'sortez-les-mouchoirs': [
      {
        media:    'Le Courrier',
        titre:    'Plage des Six Pompes : sur les pavés, la joie',
        auteur:   'Isabelle Carceles',
        date:     '4 août 2026',
        url:      'https://lecourrier.ch/2026/08/04/plage-des-six-pompes-sur-les-paves-la-joie/',
        citation: "Cette longue artiste hallucinée, vêtue de satin et d'une perruque crépue blonde, est une virtuose dont le violon part dans tous les sens, qui joue toutes sortes de musiques rythmé par ses exclamations.",
        image:    'images/presse-plage-article.jpg',
        imageAlt: "Coupure de presse de l'article « Plage des Six Pompes : sur les pavés, la joie ».",
      },
      {
        media:    'RTS',
        titre:    'La Plage des Six Pompes tire un bilan positif, mais reste précaire',
        auteur:   '',
        date:     '8 août 2026',
        url:      'https://www.rts.ch/info/culture/spectacles/2026/article/la-plage-des-six-pompes-tire-un-bilan-positif-mais-reste-precaire-29323541.html',
        citation: '',
        image:    'images/presse-rts-19h30.jpg',
        imageAlt: '',
      },
    ],
  },

  /* ---------- LES DATES ----------
     Exemple (enlever les // pour l'activer) :

     { date: '2026-09-12', heure: '20h', spectacle: 'sortez-les-mouchoirs',
       lieu: 'Théâtre du Loup', ville: 'Genève (CH)', billetterie: 'https://…' },
  */
  dates: [
    /* `fin` est facultatif : il transforme l'entrée en période, pour une
       résidence, un festival de plusieurs jours ou une série de cabarets.
       L'agenda affiche alors « 20-23 août 2025 » au lieu d'un seul jour. */

    { date: '2026-09-26', fin: '2026-09-27', spectacle: 'sortez-les-mouchoirs',
      lieu: "« La Ville est à vous » des Pâquis", ville: 'Genève (CH)' },

    { date: '2026-06-22', fin: '2026-06-27', spectacle: 'sortez-les-mouchoirs',
      lieu: 'Résidence — La Dépendance', ville: 'Lancy, Genève (CH)' },
    { date: '2026-05-11', fin: '2026-05-15', spectacle: 'sortez-les-mouchoirs',
      lieu: "Résidence — Usine Kugler", ville: 'Genève (CH)' },
    // Quatre représentations : deux le 6, à 16h et à 20h.
    { date: '2026-08-06', heure: '20h', spectacle: 'sortez-les-mouchoirs',
      lieu: 'Festival La Plage des Six Pompes', ville: 'La Chaux-de-Fonds (CH)' },
    { date: '2026-08-06', heure: '16h', spectacle: 'sortez-les-mouchoirs',
      lieu: 'Festival La Plage des Six Pompes', ville: 'La Chaux-de-Fonds (CH)' },
    { date: '2026-08-04', spectacle: 'sortez-les-mouchoirs',
      lieu: 'Festival La Plage des Six Pompes', ville: 'La Chaux-de-Fonds (CH)' },
    { date: '2026-08-03', spectacle: 'sortez-les-mouchoirs',
      lieu: 'Festival La Plage des Six Pompes', ville: 'La Chaux-de-Fonds (CH)' },
    { date: '2025-09-01', fin: '2026-04-30', spectacle: 'sortez-les-mouchoirs',
      lieu: "Cabaret Artistique Clownesque, Cabaret B.E.T. et Cabaret du Festival l'Escalier",
      ville: 'Paris et Genève' },
    { date: '2025-08-20', fin: '2025-08-23', spectacle: 'sortez-les-mouchoirs',
      lieu: "Festival international de théâtre de rue d'Aurillac", ville: 'Aurillac (FR)' },
    { date: '2025-05-24', spectacle: 'sortez-les-mouchoirs',
      lieu: 'Festival du numéro clown', ville: 'Grenoble (FR)' },
    { date: '2025-04-29', spectacle: 'sortez-les-mouchoirs',
      lieu: "Festival l'Escalier au Théâtricul", ville: 'Genève (CH)' },
    { date: '2024-09-22', spectacle: 'sortez-les-mouchoirs',
      lieu: 'Relais du Parc Chuit', ville: 'Genève (CH)' },
    { date: '2024-08-18', spectacle: 'sortez-les-mouchoirs',
      lieu: 'Festival Théâtres Nomades', ville: 'Bruxelles (BE)' },
    { date: '2024-06-23', spectacle: 'sortez-les-mouchoirs',
      lieu: 'Relais du Parc Chuit', ville: 'Genève (CH)' },
    { date: '2024-05-19', spectacle: 'sortez-les-mouchoirs',
      lieu: 'Relais du Parc Chuit', ville: 'Genève (CH)' },

  ],

  /* ---------- FORMULAIRE DE CONTACT ----------
     Pour recevoir les messages du site directement par email :
       1. aller sur https://web3forms.com
       2. entrer contact@cieclouks.ch — la clé arrive par email (gratuit, sans compte)
       3. coller la clé entre les guillemets ci-dessous

     Tant que la clé est vide, le formulaire bascule sur l'ancien
     comportement (ouverture du logiciel de messagerie).
  */
  contact: {
    web3formsKey: '7cec16bc-99e6-4206-abaa-cc6a1a18f274',
  },
};
