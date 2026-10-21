# BudgetWise — Cahier des charges fonctionnel
**Version du dossier :** 1.0 — 21 octobre 2026  
**Statut :** consolidation des 75 décisions de conception ; aucune implémentation commencée.

## 1. Vision et périmètre
BudgetWise est une application web de gestion budgétaire personnelle, utilisable sur ordinateur et mobile, avec synchronisation des données entre appareils. Le produit vise un usage quotidien et constitue également un projet de portfolio de développement web. Il n'est pas un service bancaire : aucune connexion bancaire ni exécution de paiement dans le MVP.

**Public :** utilisateurs individuels souhaitant suivre plusieurs comptes, transactions, budgets et statistiques. Chaque utilisateur ne voit que ses propres données.

## 2. Socle du MVP enrichi (version 1.0)
- Authentification par e-mail/mot de passe avec Supabase Auth ; récupération du mot de passe et gestion de session. Connexion Google envisagée ultérieurement.
- Plusieurs comptes financiers personnalisables : nom, type prédéfini ou personnalisé, solde initial, ordre et regroupement ; solde courant calculé à partir de l'historique.
- Transactions de revenus et dépenses : création, lecture, modification, suppression ; date, montant, compte, catégorie/sous-catégorie et note facultative.
- Transferts entre comptes enregistrés comme une seule opération logique cohérente, sans augmenter artificiellement revenus ou dépenses.
- Catégories de revenus et dépenses, sous-catégories sur deux niveaux au maximum, couleurs et icônes ; conservation des références historiques lors d'un archivage.
- Budgets mensuels globaux et par catégorie ; les budgets catégoriels sont des ventilations et ne s'ajoutent pas au plafond global. Progression, seuils et consultation du détail.
- Dashboard global et par compte : solde total, revenus, dépenses, flux net du mois, comptes, budgets et opérations récentes ; graphiques simples.
- Pages Comptes, Opérations, Budgets, Statistiques, Catégories, Profil et Paramètres ; navigation desktop et mobile adaptative.
- Recherche textuelle, filtres essentiels, tri et pagination côté serveur ; statistiques de base par période/catégorie/compte.
- Thèmes clair, sombre et automatique ; identité Aurora Premium ; affichage responsive et accessibilité fondamentale.
- Onboarding facultatif sous forme de checklist ; états vides contextuels ; indicateurs fiables de chargement et d'erreur.
- Sécurité : contrôle d'accès par utilisateur, règles RLS, validation serveur, prévention des doublons et intégrité des transferts.
- Export CSV minimal si réalisable dans le périmètre 1.0 ; sinon premier incrément 1.x, à arbitrer avant gel du MVP.

## 3. Règles financières incontournables
1. **Solde de compte** = solde initial + revenus - dépenses + transferts entrants - transferts sortants, en tenant compte des modifications et suppressions valides.
2. **Solde total** = somme des soldes des comptes actifs inclus ; ne pas compter deux fois les enveloppes virtuelles.
3. **Flux net de période** = revenus de période - dépenses de période ; les transferts internes en sont exclus.
4. Un **transfert** doit créer un débit et un crédit cohérents dans une opération atomique ; en cas d'échec, aucun mouvement partiel.
5. Les montants doivent être manipulés en unités monétaires exactes (ex. centimes entiers) ou avec une précision décimale adaptée ; éviter les erreurs d'arrondi des nombres flottants.
6. Les budgets catégoriels constituent des sous-ensembles du budget global ; leur somme ne doit pas être ajoutée au budget global.
7. Un solde initial n'est pas un revenu. L'affichage d'une devise n'effectue pas de conversion de change.
8. Toute opération sensible doit être idempotente ou protégée contre la duplication lors des tentatives répétées.
9. Les données filtrées, les indicateurs et les exports doivent appliquer les mêmes règles de période et d'inclusion.
10. Les statistiques et pourcentages doivent gérer explicitement les périodes sans données et les dénominateurs nuls.

## 4. Parcours et écrans
**Mobile :** navigation inférieure Accueil, Comptes, Ajouter (+), Opérations, Plus. « Plus » regroupe Budgets, Statistiques, Catégories, Paramètres et profil. Le bouton central ouvre un menu dépense/revenu/transfert. Écrans de détail accessibles depuis les listes.

**Desktop :** barre latérale adaptative, développée ou réduite en icônes selon la largeur ; tableau de bord avec hiérarchie visuelle des informations financières. Préférences de navigation conservées si possible.

**Formulaires :** saisie simple puis « Plus de détails » ; modal, panneau latéral ou écran dédié selon la complexité et le support. Avertissement si modifications non enregistrées.

**Recherche :** filtres par période, type, compte, catégorie, montant ; indicateurs de filtres actifs, réinitialisation, tri, pagination. Une sélection de graphique peut conduire à la liste d'opérations correspondante.

## 5. Exigences non fonctionnelles
- **Confidentialité :** isolation stricte des utilisateurs, permissions vérifiées côté serveur, cache sensible effacé à la déconnexion.
- **Fiabilité :** statuts de sauvegarde honnêtes ; ne jamais afficher un succès avant confirmation ; conserver les saisies en cas d'échec ; reprise sûre.
- **Performance :** pagination, requêtes filtrées côté serveur, index ciblés, agrégations fiables ; optimisation selon mesures.
- **Accessibilité :** viser les critères pertinents WCAG 2.2 AA dès le MVP, navigation clavier, focus visible, contrastes, formulaires explicites, réduction des animations, alternatives aux graphiques.
- **Qualité :** tests unitaires financiers, intégration Supabase/RLS, parcours critiques, contrôles de compilation et tests avant publication.
- **Disponibilité :** MVP connecté ; consultation hors ligne de données en cache envisagée après le MVP, en lecture seule et sécurisée.
- **Évolution :** versions incrémentales avec préproduction distincte et migrations de base de données testées.

## 6. Fonctionnalités post-MVP retenues dans la vision
- Récurrences automatiques ou à confirmer, avec planification et anti-doublons.
- Reports facultatifs de budgets, objectifs d'épargne sous forme d'enveloppes virtuelles sans double comptage.
- Prévisions financières et simulations hypothétiques n'altérant pas les transactions réelles.
- Notifications internes et navigateur ; permissions explicites ; push fermé reporté.
- Dashboard modulaire : visibilité, ordre, tailles, catalogue, aperçu et paramètres par widget.
- Comparaisons entre périodes, graphiques exploratoires, panneaux contextuels et navigation vers opérations filtrées.
- Recherches enregistrées, favoris, bibliothèque et filtres avancés.
- Modifications groupées, journal d'audit, restauration contrôlée lorsque valide.
- Import CSV guidé avec correspondance des colonnes, aperçu, détection de doublons possibles et validation.
- Exports CSV, PDF, JSON ; archive portable, restauration après validations spécifiques.
- Personnalisation avancée du confort, centre d'aide enrichi et parcours pédagogiques.
- Centre de fiabilité plus élaboré et optimisations de grands historiques mesurées.

## 7. Critères de réception prioritaires
- Deux utilisateurs distincts ne peuvent consulter ni modifier les données l'un de l'autre, y compris via requêtes directes.
- Un transfert entre deux comptes modifie les deux soldes du même montant opposé et ne change pas le flux net global.
- Une modification ou suppression de transaction recalcule correctement comptes, budgets et statistiques.
- Un double clic ou une nouvelle tentative réseau ne crée pas de doublon involontaire.
- Le Dashboard ne confond jamais solde disponible et revenus moins dépenses du mois.
- Les formulaires restent utilisables au clavier et annoncent les erreurs de manière accessible.
- Un échec de sauvegarde ne se présente pas comme un succès.
- Les tests critiques passent avant toute mise en production.

## 8. Points restant à préciser avant codage
Choix du schéma SQL exact ; définition des comptes archivés dans les totaux ; gestion des dates et fuseaux ; règles des transactions futures ; devise par compte et stratégie multidevise (aucun taux de change automatique promis) ; comportement précis du report budgétaire ; seuils de notification ; stratégie de suppression/retention ; modalités de stockage d'avatar ; politique de sauvegarde ; critères quantitatifs de performance. Ces sujets sont **ouverts**, et non implicitement validés.

## Extension validée après les 75 décisions — Assistant de répartition du budget selon les revenus
**Décision : option C, Assistant intelligent Aurora Premium.** Proposer des répartitions budgétaires indicatives selon les revenus renseignés et les charges fixes : méthodes 50/30/20, pourcentages personnalisés et approche fondée sur les dépenses obligatoires. Présenter une simulation interactive des montants restants, autoriser les ajustements manuels, détecter les répartitions qui dépassent les ressources et n'enregistrer aucun budget sans confirmation explicite.

**Règles métier :** distinguer revenus estimés, revenus réellement enregistrés et solde bancaire ; ne pas compter deux fois les charges fixes ni additionner les budgets catégoriels au budget global ; distinguer le revenu de référence du reste disponible après charges ; traiter les revenus variables comme des estimations ; éviter tout conseil financier présenté comme garanti. Les propositions ne doivent pas modifier les transactions ni déplacer de l'argent.

**Priorité :** fonctionnalité validée, mais affectation exacte au MVP 1.0 ou à une version 1.x encore à arbitrer ; la simulation avancée et les méthodes multiples peuvent être livrées progressivement.
