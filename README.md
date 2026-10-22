# Aurora

Application web de gestion budgétaire personnelle, développée progressivement
avec React, TypeScript et Vite.

## État du projet

Fondations en cours : interface initiale, composants partagés et configuration
de qualité. L’authentification et la persistance des données ne sont pas encore
implémentées.

Les documents de conception sont disponibles dans `budgetwise_conception`.
Ils utilisent encore le nom initial BudgetWise.

## Développement

Prérequis : Node.js 22 et npm.

```cmd
npm ci
npm run dev
```

## Commandes

```cmd
npm run lint
npm run format
npm run format:check
npm run build
npm run preview
```

`format` modifie les fichiers ; `format:check` vérifie leur formatage.
`build` vérifie TypeScript et génère l’application dans `dist`.
`preview` permet de consulter localement cette version.

## Organisation

- `src/components` : composants React.
- `src/styles/main.scss` : point d’entrée unique des styles.
- `src/styles` : organisation Sass 7-1, alimentée selon les besoins.
- `budgetwise_conception` : spécifications et décisions de conception.

## Conventions

- TypeScript en mode strict.
- Composants et fichiers TSX en PascalCase.
- Composants communs réutilisés lorsque leurs responsabilités sont partagées.
- Styles répartis selon leur rôle dans la structure Sass 7-1.
- Nesting SCSS limité à deux niveaux : parent et enfant.
- Formatage Prettier : deux espaces, sans points-virgules, fins de ligne LF.
- Aucun secret dans le code ou dans Git.

## Workflow Git

Une branche par changement cohérent, puis une pull request vers `main`.
Avant fusion : revue, contrôles automatiques et vérification fonctionnelle
adaptée au changement.

GitHub Actions vérifie ESLint, Prettier et la compilation.
Les tests automatisés seront ajoutés avec les premiers comportements à tester.
