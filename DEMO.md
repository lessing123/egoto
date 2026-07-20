# Egoto — Script de démonstration & Validation du MVP

Ce guide vous accompagne pas à pas dans l'exécution et la validation du monorepo **Egoto** (Backend API + Bot WhatsApp + App Mobile).

---

## 🛠️ Lancement initial

1. **Démarrer la base de données PostgreSQL** :
   Le service local `postgresql-x64-17` tourne en arrière-plan sur le port par défaut `5432` de votre machine.

2. **Démarrer les serveurs du monorepo** :
   À la racine du monorepo `c:\Users\hp\Documents\Egoto`, lancez deux terminaux pour faire tourner les deux serveurs en local :
   - **Terminal 1 (Backend API)** :
     ```bash
     npm run dev:backend
     ```
     *(Écoute sur http://localhost:3000)*
   - **Terminal 2 (Bot WhatsApp)** :
     ```bash
     npm run dev:bot
     ```
     *(Écoute sur http://localhost:3001)*

---

## 👥 Profils de test pré-remplis (Seed)

Grâce au script de seed, deux utilisateurs réalistes sont déjà créés en base de données avec des historiques financiers et des scores différents :

| Utilisateur | Téléphone | PIN | Score | Niveau | Carte Egoto active | Bol d'épargne |
|---|---|---|---|---|---|---|
| **Kofi Mensah** | `+22890123456` | `1234` | **250** | Standard | Virtuelle (Standard) | Actif (35k / 100k FCFA) |
| **Ama Adjo** | `+22891234567` | `1234` | **650** | Gold | Physique (Gold) | Complété (250k / 250k FCFA) |

---

## 🤖 1. Démo du Bot WhatsApp

Nous avons développé un script de test interactif qui simule une conversation WhatsApp complète de bout en bout (choix de langue, inscription, création de tontine, cotisations avec le `SimulatedPaymentProvider` qui confirme automatiquement le paiement après 3s, alimentation du bol d'épargne, et commande de cartes Visa).

Pour exécuter cette simulation de bot WhatsApp :
```bash
cd whatsapp-bot
node test_bot.mjs
```

---

## 📱 2. Démo de l'App Mobile (React Native / Expo)

L'application mobile intègre des **illustrations de style unDraw** au format SVG, des composants en **liquid glassmorphism** translucides (effet `BlurView`) et un thème moderne et épuré (teal et or), sans émojis pour garantir un rendu 100% professionnel et corporate.

Pour lancer l'application mobile avec Expo en mode développement :
```bash
npm run dev:mobile -- --clear
```
Une fois le serveur Expo lancé, vous pouvez :
- Ouvrir l'application dans un simulateur Android/iOS.
- Scanner le code QR avec l'application **Expo Go** sur votre smartphone.
- Taper `w` pour l'ouvrir dans votre navigateur web local.

### Scénario de test recommandé dans l'App :
1. **Onboarding** : Naviguez sur les 3 slides d'introduction dotés des illustrations unDraw pour découvrir Egoto.
2. **Identification** : Saisissez le numéro de Kofi (`+22890123456`). L'app détectera son compte et vous demandera son PIN (`1234`).
3. **Tableau de Bord** : Visualisez son solde, ses tontines actives et son score (250 points, niveau Standard).
4. **Bols d'épargne (Alimentation intégrée)** : 
   - Cliquez sur l'onglet **Bols**. 
   - Cliquez sur **Épargner** sur son bol "Achat stock pagnes".
   - Un **formulaire de versement s'affiche directement au sein de l'application** : saisissez le montant (ex: `15000` FCFA).
   - Sélectionnez votre moyen de paiement professionnel parmi :
     - *Mixx by Yas (T-Money)*
     - *Moov Money*
     - *Virement (Transfert bancaire)*
     - *Carte VISA (Tout type de carte)*
   - Cliquez sur **Confirmer le paiement**. Observez la confirmation de l'initiation du paiement, puis la jauge de progression du bol augmenter à 50% après la confirmation automatique en arrière-plan.
5. **Score & Cartes** : Cliquez sur l'onglet **Cartes** pour admirer sa carte Visa standard virtuelle active se terminant par `4821`. Bloquez ou débloquez-la en direct !
