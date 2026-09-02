#!/usr/bin/env python3
"""Génère les versions WebP des photos du site.

À lancer après avoir ajouté ou remplacé une photo dans `images/` :

    pip install Pillow
    python tools/images.py

Pour chaque `images/nom.jpg`, produit :
  - `images/nom.webp`            même taille, utilisé par les blocs générés
                                 depuis data.js (le JS déduit ce nom du .jpg)
  - `images/nom-<largeur>.webp`  versions réduites pour les srcset d'index.html

Les `.jpg` d'origine sont conservés : ils servent de secours aux très vieux
navigateurs. `og.jpg` est ignoré — les réseaux sociaux veulent un vrai JPEG.
"""
import pathlib
import sys

# La console Windows n'est pas en UTF-8 par défaut : sans cela les accents
# des messages ci-dessous s'affichent en caractères illisibles.
try:
    sys.stdout.reconfigure(encoding="utf-8")
except (AttributeError, OSError):
    pass

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow manquant. Installer avec :  pip install Pillow")

RACINE = pathlib.Path(__file__).resolve().parent.parent / "images"
IGNORER = {"og.jpg"}
LARGEURS = [480, 960, 1440, 1920]
QUALITE = 82

if not RACINE.is_dir():
    sys.exit(f"Dossier introuvable : {RACINE}")

total_jpg = total_webp = 0
for source in sorted(RACINE.glob("*.jpg")):
    if source.name in IGNORER:
        print(f"{source.name:18} ignoré (image de partage)")
        continue

    image = Image.open(source).convert("RGB")
    largeur0, hauteur0 = image.size
    cibles = sorted({w for w in LARGEURS if w < largeur0} | {largeur0})

    image.save(RACINE / f"{source.stem}.webp", "WEBP", quality=QUALITE, method=6)

    # Vignette de taille fixe, pour les couvertures d'album : le JS ne peut
    # pas deviner quelles largeurs existent, il lui faut un nom prévisible.
    # 640 px couvre une carte d'environ 300 px en écran 2x comme 3x.
    lv = min(640, largeur0)
    image.resize((lv, round(hauteur0 * lv / largeur0)), Image.LANCZOS).save(
        RACINE / f"{source.stem}-vignette.webp", "WEBP", quality=QUALITE, method=6)

    for largeur in cibles:
        hauteur = round(hauteur0 * largeur / largeur0)
        sortie = RACINE / f"{source.stem}-{largeur}.webp"
        image.resize((largeur, hauteur), Image.LANCZOS).save(
            sortie, "WEBP", quality=QUALITE, method=6)

    poids_jpg = source.stat().st_size
    poids_webp = (RACINE / f"{source.stem}.webp").stat().st_size
    total_jpg += poids_jpg
    total_webp += poids_webp
    gain = 100 - poids_webp * 100 // poids_jpg
    print(f"{source.name:18} {largeur0}x{hauteur0}  "
          f"{poids_jpg/1024:6.1f} Ko -> {poids_webp/1024:6.1f} Ko  (-{gain}%)  "
          f"tailles : {cibles}")

if total_jpg:
    print(f"\nTotal pleine taille : {total_jpg/1024:.1f} Ko -> {total_webp/1024:.1f} Ko")
print("\nPenser à référencer les nouvelles tailles dans le srcset d'index.html "
      "si la photo y est utilisée directement.")
