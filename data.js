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
      image: null,
    },
    {
      slug:  'le-trio-vivigang',
      titre: 'Le trio Vivigang',
      texte: 'Le trio Vivigang',
      meta:  'Création',
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
