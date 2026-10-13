# Portfolio — Samyen Lee Andriatiana

Site personnel bilingue (FR / EN), direction « éditoriale » : Next.js 16 (export statique), React 19, Tailwind CSS 4, TypeScript.

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000 (version anglaise : http://localhost:3000/en/).

## Modifier le contenu

Tout le texte est dans `src/content/` — aucune modification de composant n'est nécessaire :

| Fichier | Contenu |
| --- | --- |
| `src/content/fr.ts` | Textes en français (hero, parcours, projets, compétences, formation…) |
| `src/content/en.ts` | Les mêmes textes en anglais |
| `src/content/site.ts` | E-mail, liens LinkedIn / GitHub, URL du site, chemin du CV et de la photo |

Les fichiers à remplacer se trouvent dans `public/` : `portrait.jpg` (photo) et `samyen-lee-cv.pdf` (CV téléchargeable).

## Fonctionnalités

- Palette de commandes `Ctrl K` / `⌘K` : navigation, copie de l'e-mail, CV, thème, langue
- Thème clair / sombre (préférence système par défaut, mémorisée ensuite)
- Visuels interactifs : pipeline RAG de MadaSanté, modèle d'accès KKI Hub, chaîne de livraison Conduent
- Frise des stacks dans le temps, parcours en accordéon, compteurs animés
- SEO : métadonnées FR/EN avec `hreflang`, image Open Graph générée, sitemap, données structurées `Person`
- Accessibilité : navigation clavier, lien d'évitement, respect de `prefers-reduced-motion`

## Construire et déployer

```bash
npm run build
```

Le site statique est généré dans `out/`. Le workflow `.github/workflows/deploy.yml` publie automatiquement sur GitHub Pages à chaque push sur `main` (activer « GitHub Actions » comme source dans Settings → Pages du dépôt).

Si le site est servi ailleurs que sur `https://samyen-lee.github.io`, mettre à jour `url` dans `src/content/site.ts`.
