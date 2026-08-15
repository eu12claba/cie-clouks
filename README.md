# Site de la Cie Clouks — cieclouks.ch

Site statique, hébergé gratuitement par GitHub Pages depuis ce dépôt
(`eu12claba/cie-clouks`, branche `main`). Chaque `git push` met le site en
ligne en une à deux minutes.

Le domaine `cieclouks.ch` est vérifié sur le compte GitHub `eu12claba`.
**Ne jamais supprimer** l'enregistrement DNS `_github-pages-challenge-eu12claba`
chez Infomaniak : c'est lui qui garde le domaine, et son absence est ce qui
avait permis à un inconnu de le détourner en juillet 2026.

## Ce qu'on modifie au quotidien : `data.js`

Un seul fichier alimente le menu déroulant, les listes de spectacles,
l'agenda, le bloc « À l'affiche » de l'accueil et le calendrier de chaque
spectacle.

### Ajouter une date

Une ligne dans `dates` :

```js
{ date: '2026-09-12', heure: '20h', spectacle: 'sortez-les-mouchoirs',
  lieu: 'Théâtre du Loup', ville: 'Genève (CH)', billetterie: 'https://…' },
```

Le site trie tout seul selon la date du jour :

- date à venir → Agenda « À venir » **et** bloc « À l'affiche » de l'accueil
- date passée → Agenda « Dates passées » **et** calendrier du spectacle

S'il n'y a aucune date à venir, le bloc « À l'affiche » disparaît et
l'accueil s'ouvre normalement en haut. Sinon il s'ouvre directement dessus.

`spectacle` doit reprendre exactement un `slug` de `creations` ou de
`horsFormat`. `heure` et `billetterie` sont facultatifs.

### Ajouter une création ou un hors format

1. Ajouter l'entrée dans `creations` (ou `horsFormat`) de `data.js`.
2. Créer la page `<slug>.html` en copiant `chichiclack.html` et en
   remplaçant le titre et les textes.

Le menu déroulant et la page de liste se mettent à jour seuls.

`image: null` affiche un bloc « Photo à venir ». Pour mettre une vraie
photo : la déposer dans `images/` et indiquer `image: 'images/xxx.jpg'`.

> **Après avoir ajouté une photo**, générer sa version WebP (voir
> « Photos » plus bas). Sans elle, la photo s'affiche quand même — le `.jpg`
> sert de secours — mais elle sera plus lourde à charger.

### Recevoir les messages du formulaire

Dans `data.js`, bloc `contact` : coller une clé
[Web3Forms](https://web3forms.com) (gratuite, sans compte, obtenue en
indiquant `contact@cieclouks.ch`). Les messages arrivent alors directement
par email.

Tant que la clé est vide, le formulaire ouvre le logiciel de messagerie du
visiteur — ce qui ne fonctionne pas pour tout le monde. **Mettre cette clé
est la seule chose à faire pour ne plus perdre de demandes.**

## Les autres contenus

| Quoi | Où |
|---|---|
| Textes d'un spectacle | dans sa page `<slug>.html` |
| Presse, équipe, soutiens, remerciements | mêmes pages, blocs commentés |
| Dossier / fiche technique | déposer les PDF dans `docs/` (noms dans `docs/README.md`) |
| Teaser vidéo | `data-yt="IDENTIFIANT"` dans la page du spectacle |
| Textes de l'accueil, comité, contact | `index.html` |

Tant qu'un PDF est absent, le bouton devient « — sur demande » et ouvre un
email : aucun lien mort n'apparaît jamais.

## Les fichiers

```
index.html              accueil
creations.html          liste des créations
hors-format.html        liste des hors format
agenda.html             à venir + dates passées
<slug>.html             une page par spectacle
a-venir.html            redirection vers /agenda (ancienne adresse)
404.html                page « introuvable » (servie seule par GitHub Pages)
data.js                 LE fichier de contenu
style.css  script.js    mise en forme et interactions
fonts.css  fonts/       polices auto-hébergées — ne pas remettre Google Fonts
images/                 photos du site (.jpg d'origine + .webp générés)
tools/images.py         régénère les .webp après ajout d'une photo
qr/                     QR codes (non affichés sur le site)
docs/                   dossiers et fiches techniques en PDF
CNAME                   le domaine — ne pas supprimer
```

## Photos

Après avoir déposé une photo dans `images/` :

```bash
pip install Pillow      # une seule fois
python tools/images.py
```

Le script crée les versions WebP (30 à 45 % plus légères) et les tailles
réduites pour les téléphones. Les `.jpg` restent en place comme secours :
si un `.webp` manque, la photo s'affiche quand même.

Sur mobile, ce jeu de tailles fait passer les photos de l'accueil
d'environ 790 Ko à 150 Ko.

Les adresses sont sans `.html` (`cieclouks.ch/agenda`) : GitHub Pages le
fait tout seul, il n'y a rien à configurer.

## Détails qui ont une raison d'être

- Le nez rouge de la photo d'accueil est cliquable et lance un feu
  d'artifice. Sa position est calculée en fraction de l'image source, donc
  elle reste juste à toutes les tailles d'écran. Si on change la photo
  d'accueil, ajuster `NEZ` dans `script.js`.
- Le voile sombre du hero est en `pointer-events: none`, sinon il
  intercepterait le clic destiné au nez.
- Quand le menu mobile est ouvert, le `backdrop-filter` de la barre de
  navigation est désactivé : il crée sinon un bloc conteneur qui empêche le
  menu plein écran de couvrir l'écran.
- Le formulaire envoie via Web3Forms si une clé est configurée, et retombe
  sur un `mailto:` composé en JavaScript sinon — ou si l'envoi échoue, pour
  qu'un message ne soit jamais perdu. Un `<form action="mailto:">` classique
  est ignoré par la plupart des navigateurs.
- Les polices sont **auto-hébergées** dans `fonts/`. Ne pas revenir aux
  liens `fonts.googleapis.com` : cela renverrait l'adresse IP de chaque
  visiteur à Google, ce que la LPD et le RGPD n'autorisent pas sans
  consentement.
- `data.js` est édité à la main, donc faillible. `script.js` isole chaque
  bloc d'affichage : une erreur de syntaxe dans `data.js` fait disparaître
  les spectacles et les dates, mais la navigation, le menu mobile et le
  formulaire continuent de fonctionner. En cas de doute, ouvrir la console
  du navigateur : le message commence par `[Clouks]`.
- Les dates à venir sont publiées en Schema.org (`TheaterEvent`) : c'est ce
  qui permet à Google d'afficher lieu, date et billetterie directement dans
  les résultats. Rien à faire, c'est généré depuis `data.js`.

## Travailler en local

```bash
python3 -m http.server 8000
```

puis ouvrir <http://localhost:8000>. Attention : ce serveur ne sert pas les
adresses sans `.html`, il faut taper `/agenda.html` en local alors que le
site en ligne accepte `/agenda`.
