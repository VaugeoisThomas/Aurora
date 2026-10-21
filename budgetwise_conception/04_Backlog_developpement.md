# BudgetWise — Backlog de développement progressif
**Statut :** plan proposé, non commencé. Les numéros sont des groupes de travail, pas des engagements de durée.

## Méthode
Pour chaque tâche : définir critères d'acceptation, tests, dépendances et niveau de risque ; livrer des incréments utilisables. Une tâche n'est « terminée » qu'après vérification fonctionnelle, sécurité et accessibilité applicables. **Aucun code n'est fourni dans ce dossier.**

## P0 — Fondations du MVP
| ID | Tâche | Dépendance | Critère d'acceptation |
|---|---|---|---|
| F01 | Définir conventions et structure projet | Aucune | Structure documentée, compilation propre |
| F02 | Créer environnements Supabase/Vercel distincts | F01 | Secrets isolés, test sans données réelles |
| F03 | Concevoir schéma, contraintes, RLS | F02 | Accès croisé impossible lors des tests |
| F04 | Mettre en place authentification e-mail | F03 | Inscription, connexion, déconnexion, récupération |
| F05 | Définir design tokens, thèmes et navigation | F01 | Mobile/desktop utilisables au clavier |
| F06 | Ajouter tests automatiques et contrôles de publication | F01 | Build et tests critiques bloquent publication |

## P1 — Cœur financier du MVP
| ID | Tâche | Dépendance | Critère d'acceptation |
|---|---|---|---|
| M01 | CRUD comptes et solde initial | F03–F05 | Soldes exacts, accès isolé |
| M02 | CRUD catégories et sous-catégories | F03–F05 | Deux niveaux max, historique préservé |
| M03 | CRUD dépenses et revenus | M01–M02 | Recalcul correct après édition/suppression |
| M04 | Transferts atomiques et idempotents | M01, M03 | Aucun mouvement partiel ni flux fictif |
| M05 | Budgets mensuels globaux et par catégorie | M03 | Pas de double addition des budgets |
| M06 | Dashboard et comptes détaillés | M03–M05 | Solde distinct du flux mensuel |
| M07 | Liste d'opérations, recherche, filtres, pagination | M03 | Résultats exacts et performants |
| M08 | Statistiques essentielles | M03–M05 | Revenus, dépenses, net et catégories exacts |
| M09 | Profil, paramètres, confidentialité visuelle | F04–F05 | Préférences et masquage fonctionnels |
| M10 | Onboarding, états vides, erreurs et reprises | M01–M09 | Utilisateur guidé sans données inventées |
| M11 | Tests de bout en bout, accessibilité, sécurité, publication | Tous M | Parcours critiques validés en préproduction |

## P2 — Versions 1.x
- E01 — Export CSV fiable et filtrable (à avancer au MVP si le périmètre le permet).
- E02 — Import CSV avec aperçu, mapping, validations et signalement de doublons.
- E03 — Rapports PDF/JSON et archive de portabilité.
- E04 — Recherches favorites/enregistrées et filtres avancés.
- E05 — Comparaisons de périodes, explorations de graphiques et aperçus contextuels.
- E06 — Historique des modifications et restauration contrôlée.
- E07 — Actions groupées avec confirmation et contrôles d'incompatibilité.
- E08 — Report budgétaire facultatif et notifications utiles.
- E09 — Aide contextuelle et centre de connaissances enrichi.
- E10 — Consultation hors ligne en lecture seule, avec cache sécurisé par utilisateur.

## P3 — Versions 2.x Aurora Premium
- A01 — Bibliothèque de widgets, personnalisation, aperçu et réglages individuels.
- A02 — Filtres globaux intelligents avec dérogations par widget.
- A03 — Objectifs d'épargne et enveloppes virtuelles sans double comptage.
- A04 — Récurrences confirmées/automatiques, tâches planifiées et idempotence.
- A05 — Prévisions financières et simulateur hypothétique.
- A06 — Analyse interactive avancée, comparateur personnalisable, tableaux alternatifs.
- A07 — Personnalisation du confort, animations adaptées et options avancées.
- A08 — Restauration de données validée, outils avancés de fiabilité et performance mesurée.

## Définition de « prêt à développer »
Avant une tâche, disposer d'une règle métier écrite, d'un comportement d'erreur, d'une maquette ou description d'interface, d'un modèle d'autorisation et de critères d'acceptation vérifiables. Les choix encore ouverts du document Architecture doivent être arbitrés avant les tâches qui en dépendent.

## Définition de « terminé »
Fonctionnalité conforme aux critères ; tests pertinents verts ; RLS et validations vérifiées ; mobile/desktop et clavier contrôlés ; aucune régression financière connue ; documentation actualisée ; revue sur environnement de test.

## Extension validée — Assistant de répartition selon les revenus
- R01 — Définir les revenus de référence et les charges fixes, avec choix des périodes et gestion des revenus variables.
- R02 — Simuler une répartition 50/30/20, personnalisée ou fondée sur les charges obligatoires, sans modifier les budgets existants.
- R03 — Ajuster les montants, afficher les sommes et alertes de dépassement, prévenir le double comptage.
- R04 — Confirmer explicitement la création ou mise à jour des budgets et tester les calculs, arrondis et cas limites.
**Statut :** périmètre approuvé ; positionnement MVP ou 1.x à décider avant la planification de réalisation.
