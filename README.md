# Mon Budget

Web-app iPhone pour suivre salaire, charges mensuelles, épargne et investissements.
Aucune dépendance, aucun serveur, aucun appel réseau : les données restent dans le stockage local de l'app sur le téléphone.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Toute l'app (HTML, CSS, JS) |
| `sw.js` | Service worker : met le code en cache pour le mode hors connexion |
| `manifest.webmanifest` | Nom, icône et mode plein écran sur l'écran d'accueil |
| `icons/` | Icônes de l'app |

## Tester sur le Mac

```bash
python3 -m http.server 8123
```

Puis ouvrir http://localhost:8123.

## Mettre en ligne (GitHub Pages)

1. Créer un dépôt sur GitHub (par ex. `mon-budget`) et y pousser ces fichiers.
2. Settings → Pages → Source : `Deploy from a branch`, branche `main`, dossier `/ (root)`.
3. L'app est servie sur `https://<ton-pseudo>.github.io/mon-budget/`.

## Installer sur l'iPhone

1. Ouvrir l'URL GitHub Pages dans Safari.
2. Partager → **Sur l'écran d'accueil**.
3. Toujours ouvrir l'app depuis cette icône : ses données sont séparées de celles de Safari.

## Données

- Stockées dans le `localStorage` de l'app installée (clé `monbudget-data-v1`), uniquement sur le téléphone.
- **Mes charges → Sauvegarde → Exporter** crée un fichier `mon-budget-AAAA-MM-JJ.json` (à enregistrer dans Fichiers / iCloud Drive).
- **Importer** recharge ce fichier, par exemple sur un nouveau téléphone.
- Supprimer l'icône de l'écran d'accueil efface les données : exporter avant.

## Mettre à jour le code

Modifier les fichiers, incrémenter `VERSION` dans `sw.js`, pousser sur GitHub.
L'app récupère la nouvelle version au lancement suivant (elle s'affiche au lancement d'après).
