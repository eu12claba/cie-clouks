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
      image: 'images/spectacle.jpg',
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
      slug:  'le-fil-d-ariane',
      titre: "Le fil d'Ariane",
      texte: "Le fil d'Ariane",
      meta:  'Création',
      desc:  '',
      image: 'images/le-fil-d-ariane.jpg',
    },
    {
      slug:  'le-trio-vivigang',
      titre: 'Le trio Vivigang',
      texte: 'Le trio Vivigang',
      meta:  'Création',
      desc:  '',
      image: 'images/trio-vivigang-1.jpg',
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
      image: null,
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
      image: null,
    },
  ],

  /* ---------- LES GALERIES ----------
     Une galerie par spectacle, rangée en sous-catégories (un lieu, un
     festival, une série de dates). L'ordre ci-dessous est celui affiché.

     Une sous-catégorie sans photo affiche « Photos à venir » : on peut donc
     préparer les rubriques avant d'avoir les images.

     Pour ajouter une photo : la déposer dans images/, lancer
     `python tools/images.py`, puis ajouter une ligne
       { src: 'images/xxx.jpg', alt: 'Ce que montre la photo.' }
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
            alt: "La clowne, bras écartés, le violon dans une main et l'archet dans l'autre, devant le mur peint du festival." },
          { src: 'images/plage-six-pompes-2.jpg',
            alt: 'La clowne, tête renversée et bouche grande ouverte, le violon calé contre son épaule.' },
          { src: 'images/plage-six-pompes-3.jpg',
            alt: 'La clowne debout dans la lumière, souriante, le violon au bout du bras.' },
          { src: 'images/plage-six-pompes-4.jpg',
            alt: 'Gros plan sur la clowne qui joue du violon en criant.' },
          { src: 'images/plage-six-pompes-5.jpg',
            alt: "La clowne joue du violon, l'archet tendu et les yeux écarquillés." },
        ],
      },
      {
        titre: 'Festival du numéro de clown 2025',
        photos: [],
      },
      {
        titre: 'Festival Théâtre Nomades 2024',
        photos: [],
      },
    ],
    'le-trio-vivigang': [
      {
        titre: 'En concert',
        photos: [
          { src: 'images/trio-vivigang-1.jpg',
            alt: 'Le trio en plein air sous une bâche : une comédienne raconte, une violoniste joue, un musicien est au clavier.' },
          { src: 'images/trio-vivigang-2.jpg',
            alt: 'Portrait du trio Vivigang : deux musiciens souriants et la violoniste agenouillée, violon et archet à la main.' },
        ],
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
        media:    '',
        titre:    'Plage des Six Pompes : sur les pavés, la joie',
        auteur:   'Isabelle Carceles',
        date:     'Août 2026',
        url:      '',
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
        imageAlt: 'La clowne au violon à l’image dans le journal télévisé Le 19h30 de la RTS.',
      },
    ],
  },

  /* ---------- LES DATES ----------
     Exemple (enlever les // pour l'activer) :

     { date: '2026-09-12', heure: '20h', spectacle: 'sortez-les-mouchoirs',
       lieu: 'Théâtre du Loup', ville: 'Genève (CH)', billetterie: 'https://…' },
  */
  dates: [
    // Aucune date enregistrée pour l'instant.
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
    web3formsKey: '',
  },
};
