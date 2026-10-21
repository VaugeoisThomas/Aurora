# BudgetWise — Guide de design Aurora Premium
**Statut :** direction de conception validée ; spécifications de composants à affiner avant implémentation.

## 1. Identité
Univers « Aurora Premium » : interfaces financières claires et expressives, surfaces superposées, dégradés subtils, profondeur mesurée, cartes arrondies, graphiques lisibles et animations discrètes. Le style ne doit jamais nuire à la compréhension des montants.

**Palette de référence :** bleu nuit `#0F172A`, violet `#7C3AED`, cyan `#22D3EE`, blanc cassé `#F8FAFC`. Les couleurs secondaires et leurs contrastes exacts devront être vérifiés dans les deux thèmes. Rouge/vert ne doivent jamais être les seuls indicateurs de sens.

## 2. Navigation responsive
- Mobile First ; navigation basse : **Accueil | Comptes | Ajouter (+) | Opérations | Plus**.
- Le bouton Ajouter ouvre les actions Dépense, Revenu et Transfert.
- « Plus » regroupe Budgets, Statistiques, Catégories, Paramètres, Profil.
- Desktop : barre latérale étendue, réduction automatique en icônes aux largeurs intermédiaires, repli manuel si possible.
- Navigation et intitulés cohérents entre formats ; aucun écran indispensable caché uniquement au survol.

## 3. Pages principales
| Page | Priorités de contenu | Interactions |
|---|---|---|
| Dashboard | Solde global, revenus/dépenses, net mensuel, budgets, comptes, opérations récentes | Actions rapides, accès au détail |
| Comptes | Total, regroupement par type, cartes de comptes | Ajouter, ouvrir, éditer, archiver |
| Détail compte | Solde, flux, graphique, dernières opérations | Ajouter transaction, transfert, gestion |
| Opérations | Recherche, filtres rapides/avancés, liste par date | Détail, édition, suppression |
| Détail opération | Montant, type, compte, catégorie, date, note | Modifier, supprimer avec confirmation |
| Budgets | Mois, global, progression, catégories | Voir détail, ajuster |
| Détail budget | Restant, dépensé, progression, historique, opérations | Modifier, filtrer |
| Statistiques | Période, compte/catégorie, KPI, graphiques, répartition | Explorer et filtrer |
| Catégories | Revenus/Dépenses, hiérarchie dépliable, recherche | Créer, déplacer, archiver |
| Paramètres | Profil, apparence, préférences, sécurité | Modifier préférences |

## 4. Composants et états
- Cartes premium à densité raisonnable, boutons arrondis, typographie expressive mais lisible, champs clairement étiquetés.
- Formulaires simples en modal, panneau latéral sur desktop, plein écran sur mobile lorsque nécessaire.
- États : initial, chargement avec skeleton, mise à jour avec contenu précédent conservé si approprié, vide, aucun résultat filtré, erreur récupérable, succès confirmé.
- Boutons d'enregistrement désactivés pendant soumission ; prévenir la perte de modifications.
- Montants masqués si mode confidentialité activé, y compris dans les graphiques et aperçus.

## 5. Graphiques
Toujours distinguer **solde** (stock) et **flux** (revenus/dépenses sur période). Exclure les transferts internes des indicateurs de flux. Prévoir légendes, unités, périodes, infobulles et alternatives textuelles/tabulaires. Une sélection de donnée peut mener aux opérations filtrées.

## 6. Accessibilité intégrée
Objectif : critères pertinents WCAG 2.2 AA. Ordre de tabulation logique, focus visible, interactions sans souris, titres et libellés sémantiques, annonces d'erreurs et de résultats importants, contrastes testés, cibles tactiles adaptées, agrandissement sans perte d'information, respect de `prefers-reduced-motion`. Modes de confort renforcés après MVP ; les fonctions de base restent accessibles sans les activer.

## 7. Personnalisation
MVP : thèmes clair/sombre/automatique, préférences d'affichage essentielles et, si priorisé, visibilité/ordre des widgets. Plus tard : tailles, bibliothèque de widgets, réglages propres à chaque widget, aperçu, profils de confort et synchronisation avancée. Une devise choisie pour l'affichage n'implique **aucune conversion automatique**.

## 8. Livrables graphiques encore à produire
Maquettes haute fidélité des écrans clés, états vides/erreurs, bibliothèque de composants, grille responsive, tokens complets, prototypes clavier/tactile et tests d'accessibilité. Les illustrations de la phase de conception sont des **intentions**, pas des écrans de production finalisés.
