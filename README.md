# Portfolio — Youness Guadir

Portfolio professionnel développé avec React, TypeScript et Vite. Il contient une présentation cinématique, un showreel vidéo, les expériences, projets, compétences et le CV.

## Lancer le projet en local

Prérequis : Node.js 22 ou une version plus récente.

```bash
npm install
npm run dev
```

Vite affichera une adresse locale, généralement `http://localhost:5173`.

## Créer la version de production

```bash
npm run build
npm run preview
```

Les fichiers optimisés sont générés dans le dossier `dist`.

## Publier avec GitHub Pages

1. Créer un repository GitHub vide.
2. Envoyer ce projet sur la branche `main`.
3. Ouvrir **Settings → Pages** dans le repository.
4. Dans **Build and deployment**, choisir **GitHub Actions**.
5. Le workflow inclus dans `.github/workflows/deploy.yml` publiera automatiquement le site après chaque push sur `main`.

Le paramètre `base: "./"` dans `vite.config.ts` permet au site de fonctionner même si le nom du repository change.

## Modifier le contenu

- Contenu et composants : `src/App.tsx`
- Design et animations : `src/index.css`
- Images, vidéo et CV : `public/`

## Confidentialité

Avant de rendre le repository public, vérifier les informations personnelles présentes dans le CV, la vidéo et la section contact.
