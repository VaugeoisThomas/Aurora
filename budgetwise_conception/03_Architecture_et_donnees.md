# BudgetWise — Architecture et modèle de données
**Statut :** architecture cible ; schéma technique proposé, à valider avant toute migration.

## 1. Stack validée
- Frontend : **React + Vite + TypeScript**, déployé sur **Vercel**.
- Authentification et données : **Supabase Auth + PostgreSQL + Row Level Security (RLS)**.
- Application responsive, accès multi-appareil ; compte utilisateur requis pour ses données privées.
- Environnements distincts de test/préproduction et production ; aucune donnée personnelle réelle copiée en préproduction.

## 2. Découpage logique proposé
- `auth` : session, profil, autorisations et changement d'identité.
- `accounts` : comptes, types, archivage et calcul de solde.
- `transactions` : dépenses, revenus, transferts, validation et anti-doublons.
- `categories` : catégories/sous-catégories et références historiques.
- `budgets` : plafonds mensuels et consommations.
- `dashboard` : agrégats et widgets.
- `reports` : statistiques, recherche, exports.
- `settings` : préférences d'affichage et confidentialité.

Ce découpage représente des responsabilités, **pas une arborescence de code imposée**.

## 3. Entités candidates (à valider)
| Entité | Champs conceptuels | Contraintes clés |
|---|---|---|
| `profiles` | user_id, display_name, avatar_ref | Un profil par utilisateur Auth |
| `accounts` | id, user_id, name, type, opening_balance_minor, archived_at, sort_order | Propriétaire obligatoire |
| `account_types` | id, user_id, label, icon | Types système et personnalisés à distinguer |
| `categories` | id, user_id, kind, name, parent_id, color, icon, archived_at | Revenus/dépenses séparés ; profondeur max 2 |
| `transactions` | id, user_id, account_id, kind, amount_minor, occurred_on, category_id, note, request_key | Validation selon le type |
| `transfers` | id, user_id, from_account_id, to_account_id, amount_minor, occurred_on, request_key | Deux comptes distincts ; atomicité |
| `budgets` | id, user_id, month, category_id nullable, limit_minor | Unicité logique par période et portée |
| `user_preferences` | user_id, theme, date_format, privacy_mask | Préférences propres à l'utilisateur |

**Attention :** `transactions` et `transfers` sont présentés séparément pour clarifier les invariants. Le modèle final pourra employer un registre de mouvements commun ou des écritures comptables liées ; il faut choisir **une** représentation avant implémentation et prouver l'absence de double comptage.

## 4. Intégrité et calculs
- Montants positifs stockés en plus petites unités monétaires entières si la devise le permet ; précision adaptée si besoin. Devise et règles d'arrondi explicites.
- Contraintes de base de données : clés étrangères, vérifications de montants, unicités utiles, index `user_id` + date/compte/catégorie selon requêtes.
- Calculs de soldes et agrégats dérivés des mouvements validés ; éviter des valeurs mises en cache non synchronisées sans stratégie de réconciliation.
- Transfert atomique : même propriétaire des deux comptes, comptes distincts, débit/crédit équilibrés, idempotence via clé de requête unique.
- Modification/suppression : recalcule les résultats dérivés ; historiques et archivages ne cassent pas les références.
- Dates : choisir explicitement entre date comptable locale et instant horodaté ; les bornes de périodes doivent être identiques côté serveur et interface.

## 5. Sécurité
- Activer RLS sur **toutes** les tables exposées ; policies `SELECT/INSERT/UPDATE/DELETE` fondées sur l'identité Supabase et l'appartenance de chaque enregistrement.
- Contrôler aussi l'appartenance des comptes/catégories référencés, pas seulement `user_id` du mouvement.
- Les opérations privilégiées (transferts atomiques, suppression de compte utilisateur, imports) nécessitent une interface serveur sécurisée et validée.
- Jamais de clé Supabase `service_role` dans le navigateur. Variables d'environnement séparées ; journalisation sans données financières sensibles inutiles.
- Export et suppression de données uniquement après autorisation ; réauthentification récente pour suppression du compte ; politique de rétention et de sauvegardes à documenter.

## 6. Performance
Pagination serveur, tri stable (date + identifiant), filtres indexables, requêtes limitées, agrégations côté base de données lorsque nécessaire, contrôles d'exactitude des statistiques. Mesurer avant de complexifier ; ne pas charger tout l'historique dans le navigateur.

## 7. Fiabilité et opérations
Statuts d'écriture confirmés, refusés ou inconnus ; retry avec clé d'idempotence ; conservation des champs en cas d'échec ; aucune confirmation visuelle prématurée. Tests RLS avec au moins deux utilisateurs fictifs. Migrations réversibles lorsque possible, ou stratégie de correction compatible ; retour arrière du frontend **ne restaure pas** le schéma SQL.

## 8. Questions techniques ouvertes
Schéma définitif des transferts, devises multiples, montants décimaux, devise par compte, soldes de comptes archivés, granularité des droits, stratégie des dates, outils de migration, sauvegarde et restauration, tâches planifiées pour récurrences, stratégie d'agrégats, index réels selon mesures et quotas du plan Supabase/Vercel. Aucun de ces points n'est considéré implémenté.

## Extension : assistant de répartition (décision validée après cadrage initial)
L'assistant exploite les revenus de référence et charges fixes explicitement choisis par l'utilisateur, avec possibilité de valeurs estimées. Les simulations restent distinctes des budgets persistés ; seule une validation explicite peut créer ou modifier les plafonds budgétaires. Concevoir les calculs en unités monétaires entières (centimes pour EUR) ou décimales exactes, vérifier la somme des répartitions et empêcher les doubles comptes. Les données de simulation persistées, si nécessaire, restent privées et soumises aux règles RLS. Le schéma précis reste à définir.
