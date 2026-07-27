# Dynasty 8 — Catalogue Immobilier

Application web moderne (React + Vite + TypeScript + Tailwind CSS) reproduisant un catalogue immobilier de
type Dynasty 8 : habitations aménagées, habitations vides, garages, entrepôts et projets de construction,
avec un système de commande qui envoie automatiquement les demandes dans un salon Discord via un webhook.

Le site fonctionne **sans backend** sur GitHub Pages (mode statique) et **avec envoi Discord automatique**
sur Vercel (route API serverless). Le bon mode est détecté automatiquement, aucune configuration manuelle
n'est nécessaire côté frontend.

---

## Sommaire

- [Aperçu des fonctionnalités](#aperçu-des-fonctionnalités)
- [Arborescence du projet](#arborescence-du-projet)
- [Installation](#installation)
- [Développement local](#développement-local)
- [Déploiement sur GitHub Pages](#déploiement-sur-github-pages)
- [Déploiement sur Vercel](#déploiement-sur-vercel)
- [Créer le webhook Discord](#créer-le-webhook-discord)
- [Variables d'environnement](#variables-denvironnement)
- [Ajouter un nouveau bien](#ajouter-un-nouveau-bien)
- [Modifier les images d'un bien](#modifier-les-images-dun-bien)
- [Créer une nouvelle catégorie](#créer-une-nouvelle-catégorie)
- [Mettre à jour le catalogue en production](#mettre-à-jour-le-catalogue-en-production)
- [Qualité de code](#qualité-de-code)

---

## Aperçu des fonctionnalités

- Accueil, Catalogue, sous-catégories (Habitation aménagés : Petit/Grand — Habitation vide : Petit/Moyen/Grand —
  Entrepôts, Bureaux, Bunker, Hangar, Garage — Construire : Vos projets),
  fiche détaillée par bien, Contact, À propos — toutes les pages utilisent React Router.
- Catalogue piloté par un simple fichier JSON (`src/data/properties.json`), sans base de données.
- Recherche instantanée, filtre par catégorie, filtre par prix (curseur), tri alphabétique / par prix / par
  disponibilité.
- Fiche produit avec grande image, galerie et miniatures cliquables.
- Formulaire de commande modernisé (Nom RP, Discord, Téléphone RP, bien/prix pré-remplis, commentaire).
- Envoi automatique de la commande vers Discord (embed doré) via une route API sécurisée — le webhook n'est
  **jamais** exposé côté navigateur.
- Détection automatique de l'environnement d'hébergement : mode statique (GitHub Pages) vs mode serverless
  (Vercel/Netlify).
- Design responsive (mobile / tablette / PC / grand écran), animations (fade, hover, zoom, transitions,
  menu mobile, header transparent → opaque au scroll, révélations au scroll).
- SEO : favicon, meta OpenGraph, titre dynamique sur les fiches produit, URLs propres.

---

## Arborescence du projet

```
dynasty8-catalogue/
├── .github/workflows/deploy.yml   # Déploiement automatique GitHub Pages
├── api/
│   └── order.ts                   # Fonction serverless Vercel : envoi Discord sécurisé
├── public/
│   ├── 404.html                   # Redirection SPA pour GitHub Pages
│   ├── favicon.svg
│   └── og-image.svg
├── src/
│   ├── components/
│   │   ├── Header.tsx             # Navigation + menu mobile + header transparent
│   │   ├── Footer.tsx
│   │   ├── Seal.tsx               # Sceau doré "D8" (logo)
│   │   ├── PropertyCard.tsx       # Carte bien (grille catalogue)
│   │   ├── SearchFilters.tsx      # Recherche + filtres + tri
│   │   ├── OrderModal.tsx         # Formulaire de commande
│   │   └── ScrollToTop.tsx
│   ├── data/
│   │   └── properties.json        # ⭐ Catalogue complet — à éditer pour ajouter/modifier des biens
│   ├── hooks/
│   │   └── useFilteredProperties.ts
│   ├── lib/
│   │   ├── environment.ts         # Détection GitHub Pages vs Vercel
│   │   └── order.ts               # Logique de soumission de commande
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Catalogue.tsx
│   │   ├── CategoryPage.tsx
│   │   ├── PropertyDetail.tsx
│   │   ├── Contact.tsx
│   │   ├── About.tsx
│   │   └── NotFound.tsx
│   ├── types/
│   │   └── property.ts            # Types + liste des catégories
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── .eslintrc.cjs
├── .gitignore
├── LICENSE
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── vercel.json
└── vite.config.ts
```

---

## Installation

Prérequis : [Node.js](https://nodejs.org) 18+ et npm.

```bash
npm install
```

## Développement local

```bash
npm run dev
```

Le site est disponible sur `http://localhost:5173`. En local, le formulaire de commande fonctionne en mode
« simulé » (localStorage) tant qu'aucune route `/api/order` n'est servie — utilisez `vercel dev` (voir plus
bas) si vous voulez tester l'envoi Discord réel en local.

Autres commandes utiles :

```bash
npm run build      # build de production (sortie dans dist/)
npm run preview    # prévisualise le build de production
npm run lint       # vérifie le code avec ESLint
```

---

## Déploiement sur GitHub Pages

1. Modifiez si besoin la constante `REPO_NAME` dans `vite.config.ts` pour qu'elle corresponde exactement au
   nom de votre dépôt GitHub (nécessaire pour que les chemins des fichiers fonctionnent sur
   `https://VOTRE_PSEUDO.github.io/REPO_NAME/`).

2. Poussez le projet sur GitHub :

   ```bash
   git init
   git add .
   git commit -m "Initial Commit"
   git branch -M main
   git remote add origin https://github.com/VOTRE_PSEUDO/VOTRE_REPO.git
   git push -u origin main
   ```

3. Dans GitHub : **Settings → Pages → Build and deployment → Source : GitHub Actions**.
   Le workflow `.github/workflows/deploy.yml` se déclenche automatiquement à chaque push sur `main` et
   publie le contenu de `dist/`.

4. Après quelques minutes, le site est disponible sur `https://VOTRE_PSEUDO.github.io/REPO_NAME/`.

### Déploiement manuel alternatif (sans GitHub Actions)

```bash
npm run deploy
```

Ce script build le projet puis publie le dossier `dist/` sur la branche `gh-pages` via le paquet
`gh-pages` (déjà inclus). Dans ce cas, choisissez la source **Deploy from a branch → gh-pages** dans les
paramètres GitHub Pages du dépôt.

> **Important** : sur GitHub Pages, le formulaire de commande fonctionne toujours (il ne casse jamais la
> page), mais aucune route serverless n'existe : la commande est enregistrée dans le `localStorage` du
> navigateur et un message informe l'utilisateur qu'un hébergement avec backend (Vercel) est nécessaire
> pour un envoi automatique vers Discord.

---

## Déploiement sur Vercel

1. Importez le dépôt GitHub dans [Vercel](https://vercel.com/new).
2. Vercel détecte automatiquement Vite. Laissez les réglages par défaut
   (`Build Command: npm run build`, `Output Directory: dist`) — ils sont aussi déclarés dans `vercel.json`.
3. Dans **Project Settings → Environment Variables**, ajoutez :
   - `DISCORD_WEBHOOK_URL` = l'URL de votre webhook Discord (voir section suivante).
4. Déployez. Une fois en ligne, la route `/api/order` est automatiquement disponible et le site détecte le
   mode serverless : les commandes sont envoyées en temps réel dans votre salon Discord.

Pour tester en local avec la vraie route API :

```bash
npm install -g vercel
vercel dev
```

---

## Créer le webhook Discord

1. Dans Discord, ouvrez les paramètres du salon où vous souhaitez recevoir les commandes.
2. **Intégrations → Webhooks → Nouveau webhook**.
3. Nommez-le (ex. « Dynasty 8 — Commandes ») et copiez l'**URL du webhook**.
4. Collez cette URL dans la variable d'environnement `DISCORD_WEBHOOK_URL` sur Vercel (jamais dans le code
   ni dans un fichier commité).

Chaque commande génère un embed doré contenant : Nom RP, Discord, Téléphone, Bien, Prix, Catégorie,
Commentaire, Date et ID de commande.

---

## Variables d'environnement

| Variable              | Requise sur      | Description                                            |
|-----------------------|------------------|---------------------------------------------------------|
| `DISCORD_WEBHOOK_URL` | Vercel uniquement | URL du webhook Discord, lue uniquement côté serveur.    |

Un modèle est fourni dans [`.env.example`](./.env.example). Ne créez jamais de fichier `.env` avec une
vraie valeur dans un dépôt public : `.env` est déjà ignoré par `.gitignore`.

---

## Ajouter un nouveau bien

Ouvrez `src/data/properties.json` et ajoutez un objet à la liste, par exemple :

```json
{
  "id": "p013",
  "slug": "mon-nouveau-bien",
  "nom": "Mon Nouveau Bien",
  "prix": 150000,
  "categorie": "habitations-amenagees-grand",
  "localisation": "Quartier, Ville",
  "description": "Description du bien...",
  "caracteristiques": ["Caractéristique 1", "Caractéristique 2"],
  "galerie": ["https://exemple.com/image1.jpg", "https://exemple.com/image2.jpg"],
  "disponible": true
}
```

- `slug` : identifiant unique utilisé dans l'URL (`/bien/mon-nouveau-bien`) — pas d'espaces ni d'accents.
- `categorie` : doit être une des valeurs listées dans `src/types/property.ts` (`CATEGORIES`).
- `disponible` : `false` masque le bouton « Commander » et affiche un badge « Indisponible ».

Aucune autre modification de code n'est nécessaire : le bien apparaît automatiquement dans le catalogue,
sa catégorie et les résultats de recherche.

---

## Modifier les images d'un bien

Remplacez ou complétez le tableau `galerie` du bien concerné dans `properties.json` par les URLs de vos
propres images (hébergées où vous le souhaitez : CDN, GitHub, etc.). La première image du tableau est
utilisée comme image principale sur les cartes et en tête de fiche.

---

## Créer une nouvelle catégorie

1. Ajoutez la nouvelle valeur dans le type `PropertyCategory` et le tableau `CATEGORIES` de
   `src/types/property.ts` (slug, label, group, description).
2. (Optionnel) Ajoutez une icône dédiée dans `CATEGORY_ICONS` de `src/pages/Home.tsx`.
3. Utilisez ce nouveau slug dans le champ `categorie` de vos biens dans `properties.json`.

La nouvelle catégorie apparaît automatiquement dans le menu de navigation, le pied de page, la page
Catalogue et génère sa propre page filtrée sur `/catalogue/VOTRE_SLUG`.

---

## Mettre à jour le catalogue en production

Toute modification de `src/data/properties.json` poussée sur `main` déclenche automatiquement :
- un nouveau déploiement GitHub Pages (via le workflow GitHub Actions) ;
- un nouveau déploiement Vercel (si le projet y est connecté).

Aucune étape manuelle supplémentaire n'est nécessaire après `git push`.

---

## Qualité de code

- TypeScript strict, sans erreur de compilation (`npm run build`).
- ESLint configuré (`npm run lint`), sans avertissement.
- Aucune dépendance inutile : uniquement React, React Router, Framer Motion, Lucide Icons et Tailwind CSS.

---

## Licence

Projet distribué sous licence [MIT](./LICENSE).
