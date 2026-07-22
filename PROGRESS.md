# Egoto — Suivi d'avancement

## Étape 1 : Backend — Schéma Prisma + Auth + Cercles
✅ **Terminé**

- ✅ Monorepo npm workspaces (root + backend + shared)
- ✅ Schéma Prisma — 10 modèles
- ✅ Migration PostgreSQL appliquée
- ✅ shared/content.ts — textes bilingues FR/EN
- ✅ Auth : register, login (JWT 7j), profil, PIN hashé bcrypt
- ✅ Cercles : créer, lister, détail, rejoindre, lister membres

## Étape 2 : Backend — PaymentProvider + Cotisations + Score
✅ **Terminé**

- ✅ PaymentProvider : interface interchangeable et SimulatedPaymentProvider (auto-confirmation en 2-3s)
- ✅ Logiciel ScoreService : Score de 0-1000 avec paliers
- ✅ Logiciel PaymentService : Orchestration PaymentIntent, Contribution, Transaction, et Score
- ✅ Endpoints cotisations et score

## Étape 3 : Backend — Bols d'épargne + Carte
✅ **Terminé**

- ✅ Endpoints bols d'épargne : créer, lister, détail, retrait avec règles de verrouillage strictes
- ✅ Endpoints cartes : demander carte avec contrôle du score requis, lister, activer, bloquer/débloquer

## Étape 4 : Bot WhatsApp — Onboarding + Tontine
✅ **Terminé**

- ✅ Choix de la langue (bilingue FR/EN) et flux d'onboarding complet
- ✅ Création de cercle de tontine, lister mes cercles, rejoindre par code à 5 caractères
- ✅ Cotisation à une tontine avec orchestration du SimulatedPaymentProvider

## Étape 5 : Bot WhatsApp — Bol + Score + Carte
✅ **Terminé**

- ✅ Création et alimentation des bols d'épargne via le bot WhatsApp
- ✅ Suivi du score Egoto, historique des ScoreEvents et progression vers le prochain palier
- ✅ Demande, activation et blocage/déblocage de la carte Visa Egoto en fonction des droits de score
- ✅ Simulation de bout en bout passée à 100% avec succès

## Étape 6 : App Mobile — Design tokens + Navigation + Accueil
✅ **Terminé**

- ✅ Liquid glassmorphism, thème modern teal & gold
- ✅ Icônes professionnelles vectorielles SVG sans émojis
- ✅ Onboarding et identification de Kofi/Ama avec PIN
- ✅ Modal intégré multi-opérateurs pour versement sans popups prompt système (Mixx by Yas, Moov, Visa, Virement)

## Étape 7 : Tontines Avancées, Administration & Notifications
✅ **Terminé** — 18 juillet 2026

- ✅ **Codes d'invitation uniques à 5 caractères** : Génération alphanumérique aléatoire (`inviteCode`) et adhésion simplifiée sur App et WhatsApp.
- ✅ **Invitation directe par numéro de téléphone** : Ajout d'utilisateurs directement par l'admin via numéro togolais.
- ✅ **Sécurité et blocage** : Dépôts et cotisations bloqués de façon stricte tant que la tontine n'a pas atteint sa capacité maximale de membres.
- ✅ **Tours de retrait & Payout automatique** : Attribution mathématique des positions dans la rotation, reversement instantané de la cagnotte au bénéficiaire à la fin du cycle de cotisation, et démarrage de la tontine dès complétude.
- ✅ **Notifications SMS & WhatsApp instantanées** : Alertes unifiées dans le backend pour notifier les membres à chaque ajout de membre, modification administrative ou réception de cagnotte.
- ✅ **Vue d'administration mobile intégrée** : Modal de gestion de tontine pour l'admin (édition nom, invitation par téléphone, affichage du code à 5 caractères, et ordre de passage détaillé des cycles).

## Étape 8 : Seed de données réalistes + Script démo
✅ **Terminé**

- ✅ Script de seed avec hash PIN bcrypt
- ✅ Script de démonstration de bout en bout

## Étape 9 : FinPoint Design Premium, USSD Marchand & Sécurité KYC
✅ **Terminé** — 20 juillet 2026

- ✅ **Intégration du Logo Officiel Egoto** : Reproduction vectorielle fidèle (SVG) à partir du mockup joint par le client (fond vert forêt foncé arrondi Squircle, tête dorée, corps blanc en arche). Composant `<Logo />` créé et intégré à l'écran de connexion (`authHero`) et dans la barre de titre supérieure (`headerBar`) du tableau de bord.
- ✅ **Configuration EAS Build pour APK et IPA** : Création des fichiers indispensables `eas.json` et `app.json` à la racine du projet mobile Expo. Le profil `preview` est pré-configuré pour générer un fichier **APK installable** pour Android et un build interne **IPA** pour iOS en toute transparence via Expo Application Services (EAS).
- ✅ **Unification de la devise en CFA** : Remplacement de l'intégralité des pièces de monnaie flottantes en arrière-plan de la page d'accueil web (`Hero.jsx`) pour utiliser exclusivement l'image de la pièce de **CFA** (`/devises/CFA.jpg`), supprimant les devises étrangères (dollars, euros, yuans, etc.) pour correspondre à l'ancrage local d'Egoto.
- ✅ **Design sombre et clair premium "FinPoint" sémantique** : Palette de couleurs exclusive basée sur l'échelle sémantique `light` et `dark` (vert forêt historique `#173325` en primaire clair et fond sombre, vert clair `#4FB080` en primaire sombre, or chaud `#E7A240` en accent sombre et `#BA7517` en accent clair, fonds laiteux off-white doux `#E8EFEA` et sombre `#0A150F`).
- ✅ **Système de Thème sémantique réactif (THEME_STATE)** : Liaison dynamique de tous les composants de l'application (boutons, inputs, cartes, barres de progression, lueurs) au thème via un gestionnaire réactif global, avec vérification stricte du contraste : aucune couleur ne partage la même valeur de fond et de texte dans un même mode.
- ✅ **Illustrations SVG réactives au thème** : Les illustrations d'onboarding (`Onboarding1`, `Onboarding2`, `Onboarding3`) s'adaptent désormais en temps réel aux couleurs du thème actif (mode sombre et mode clair/off-white) pour éviter de se fondre bizarrement ou de manquer de contraste.
- ✅ **Saisie téléphonique simplifiée avec préfixe statique** : Ajout d'un badge de préfixe pays statique `+228` dans le champ d'authentification. L'utilisateur ne saisit plus que son numéro local à 8 chiffres (contrôlé avec `maxLength={8}` et type `numeric`), la conversion internationale se faisant de manière transparente lors de l'appel au backend.
- ✅ **Effet "Liquide Glass" en arrière-plan** : Dégradés de formes lumineuses floues (vert forêt et or) qui animent et subliment l'ensemble des écrans (onboarding, auth, tableau de bord) avec opacité adaptative au mode.
- ✅ **Widgets premium Outcrowd** :
  - **Carte VISA virtuelle** : Widget dégradé or métallique brillant avec logo VISA stylisé et solde global d'épargne.
  - **Jauge circulaire de Score** : Arc de cercle stylisé qui progresse vers le score de l'utilisateur (0 à 1000).
  - **Performance** : Mini-histogramme de barres verticales néons multicolores pour visualiser la croissance d'activité.
  - **Zoom interactif & Carrousel défilant** : Clic sur n'importe quel widget pour ouvrir un popup d'explications détaillées et naviguer d'un sujet à l'autre (0- VISA, 1- Score, 2- Activité, 3- Tontines). Le popup s'ouvre au centre parfait de l'écran, s'adapte en dimension sur tablette et s'adapte au mode clair (textes et footer lisibles). Il se ferme également d'un simple clic en dehors (dans le vide).
- ✅ **Boutons d'onglets et Titres adaptés et lisibles** : Les boutons "Créer" et "Rejoindre" ainsi que les titres de sections ("Cercles de tontine", "Bols d'Épargne", "Score Egoto", "Mes cartes Visa Egoto") s'adaptent dynamiquement en couleur au thème via `THEME.text` pour rester parfaitement visibles en mode clair (plus de blanc sur blanc invisible).
- ✅ **Intégration du composeur USSD Mixx by Yas Marchand** : Lancement automatique du code marchand USSD `*145*5*Montant*17711#` sur le composeur téléphonique via l'API de Linking native lors d'un versement.
- ✅ **Test de simulation de bout en bout du Bot WhatsApp** : Lancement réussi du script automatisé `test_bot.mjs` simulant l'inscription, la création/cotisation de cercles et de bols d'épargne (Épargne Moto), la consultation du score Egoto, et le cycle complet de commande, activation et blocage de carte Visa virtuelle.
- ✅ **Sécurité KYC renforcée 100% vectorielle (Sans Émojis)** :
  - Sélecteur de type de document sous forme de liste de choix (CNI ou Passeport).
  - Un seul champ de saisie dynamique pour le numéro du document sélectionné.
  - Prise de photo du document avec bouton d'appareil photo vectoriel (utilisation de `CameraIcon` SVG à la place de l'émoji photo 📷) et bouton de succès avec `ShieldIcon` vert (au lieu de la coche ✓).
  - Badge orné de statut : *Standard (Non vérifié)* ou *Sécurité Renforcée (Vérifié)*.
- ✅ **Attribution automatique Egoto ID** : Génération automatique d'un identifiant lisible court du type `EG-XXXXX` lors de l'enregistrement de l'utilisateur.
- ✅ **Partage et Copie de cagnotte** : Bouton d'action dans l'administration pour copier et appeler le module de partage natif cross-platform pour propager le lien de cagnotte `https://egoto.app/join/<inviteCode>`.
- ✅ **Fréquences personnalisées (Bols)** : Ajout d'une option de fréquence personnalisée en nombre de jours pour les bols d'épargne fixes (ex: tous les 5 jours).
- ✅ **Tailles d'écrans 100% adaptatives** : Suppression des dimensions rigides au profit de Flexbox, intégration de `overflow: "hidden"` et `width: "100%"` sur la racine pour interdire tout débordement blanc latéral causé par les bulles de fond absolues. Centrage vertical automatique et dimensions fluides adaptées sur tous les écrans (max 420px sur Web/tablette, 92% sur mobile) pour la carte de zoom.
