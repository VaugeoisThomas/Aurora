# BudgetWise — Roadmap et stratégie de livraison
**Statut :** trajectoire validée ; dates et estimations non définies.

## 1. Version 1.0 — MVP enrichi
**Objectif :** usage réel quotidien avec comptes, transactions, transferts, catégories, budgets mensuels, dashboard, statistiques de base, recherche, profils/paramètres et expérience responsive Aurora. Authentification sécurisée, RLS, fiabilité des écritures, tests critiques et accessibilité fondamentale sont des conditions de sortie, non des options.

**Critères de sortie :** scénarios financiers cohérents ; aucun accès entre utilisateurs ; parcours principaux utilisables mobile/desktop ; erreurs explicites ; tests et build réussis ; préproduction validée ; documentation d'installation et d'exploitation disponible.

## 2. Versions 1.x — Utilité et productivité
Exports et imports CSV, rapports enrichis, recherches sauvegardées, comparaisons, graphiques exploratoires, historique/audit, opérations groupées, aide contextuelle et consultation hors ligne limitée. L'ordre réel dépendra des retours, de l'effort et des risques.

## 3. Versions 2.x — Vision Aurora Premium
Dashboard entièrement modulaire, bibliothèque de widgets et filtres intelligents, objectifs d'épargne, transactions récurrentes, prévisions et simulations, analyse approfondie, personnalisation de confort et outils avancés de fiabilité.

## 4. Flux de livraison cible
1. Travail sur une branche de fonctionnalité avec critères d'acceptation.
2. Vérifications automatiques : qualité du code, TypeScript, build, tests financiers et de sécurité appropriés.
3. Aperçu Vercel et environnement Supabase de test isolé, avec données fictives.
4. Revue fonctionnelle, accessibilité et contrôle des migrations.
5. Publication maîtrisée, vérification post-déploiement, notes de version.
6. En cas d'incident : diagnostiquer, isoler, corriger ou revenir à un frontend **compatible** ; traiter séparément les changements de base de données.

## 5. Priorisation continue
Classer les demandes selon valeur utilisateur, risque financier/sécurité, dépendances, effort et facilité de validation. Ne pas élargir le MVP sans retirer ou reporter une autre fonctionnalité de coût comparable. Les fonctionnalités reportées restent consignées.

## 6. Risques à suivre
- **Exactitude financière :** transferts, arrondis, suppression et budgets ; atténuation par invariants et tests.
- **Sécurité :** policies RLS et références croisées ; atténuation par tests à plusieurs utilisateurs.
- **Dérive de périmètre :** nombreuses fonctions Premium ; atténuation par jalons MVP/1.x/2.x.
- **Coûts de services :** quotas Supabase/Vercel, planification des récurrences et stockage ; vérifier au moment de l'implémentation.
- **Évolution des données :** migrations et retours arrière ; atténuation par préproduction, compatibilité et sauvegardes adaptées.
- **Accessibilité :** complexité des graphiques et animations ; atténuation par tests dès le premier composant.

## 7. Décisions de clôture de conception
- Les **75 étapes de conception** sont clôturées avec le choix final d'un dossier Aurora Premium.
- Ce dossier n'est ni du code, ni une preuve d'implémentation, ni une certification de conformité.
- Les points ouverts sont documentés et devront être arbitrés avant les développements correspondants.
- Le démarrage du développement exige une décision explicite ultérieure de l'utilisateur.

## Extension de roadmap — Répartition budgétaire guidée
L'assistant intelligent de répartition selon les revenus est **validé fonctionnellement**, mais son jalon reste **à arbitrer entre MVP 1.0 et versions 1.x**. Il proposera plusieurs méthodes, tiendra compte des charges fixes et des revenus variables, offrira une simulation modifiable et n'appliquera des budgets qu'après validation. Une première version simple peut précéder les simulations avancées.
