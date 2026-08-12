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
      titre: 'Chichiclack&nbsp;!',
      texte: 'Chichiclack !',
      meta:  'Création passée',
      desc:  '',
      image: null,
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
  ],

  /* ---------- LES DATES ----------
     Exemple (enlever les // pour l'activer) :

     { date: '2026-09-12', heure: '20h', spectacle: 'sortez-les-mouchoirs',
       lieu: 'Théâtre du Loup', ville: 'Genève (CH)', billetterie: 'https://…' },
  */
  dates: [
    // Aucune date enregistrée pour l'instant.
  ],
};
