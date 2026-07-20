// ═══════════════════════════════════════════════════════════════
// Egoto — Source unique de vérité pour tous les textes
// ═══════════════════════════════════════════════════════════════
// Le bot WhatsApp ET l'app mobile importent ce fichier.
// Ne jamais dupliquer ou reformuler un texte d'un côté sans
// le modifier ici d'abord.
// ═══════════════════════════════════════════════════════════════

export const content = {
  fr: {
    // ── Actions (boutons, labels d'action) ────────────────
    actions: {
      contribute: "Cotiser",
      createPot: "Créer un bol",
      createCircle: "Créer un cercle",
      joinCircle: "Rejoindre un cercle",
      viewScore: "Voir mon score",
      activateCard: "Activer la carte",
      blockCard: "Bloquer la carte",
      unblockCard: "Débloquer la carte",
      withdraw: "Retirer",
      changePin: "Changer le PIN",
      logout: "Se déconnecter",
    },

    // ── Statuts ───────────────────────────────────────────
    status: {
      pending: "En attente",
      confirmed: "Confirmé",
      failed: "Échoué",
      active: "Actif",
      completed: "Terminé",
      cancelled: "Annulé",
      blocked: "Bloqué",
      inactive: "Inactif",
    },

    // ── Confirmations ─────────────────────────────────────
    confirmations: {
      contributionPending: "Cotisation en attente de confirmation...",
      contributionConfirmed: "Cotisation confirmée ✅",
      contributionFailed: "Cotisation échouée ❌",
      circleCreated: "Cercle créé avec succès ✅",
      circleJoined: "Tu as rejoint le cercle ✅",
      potCreated: "Bol d'épargne créé ✅",
      potWithdrawal: "Retrait effectué ✅",
      cardActivated: "Carte activée ✅",
      cardBlocked: "Carte bloquée",
      cardUnblocked: "Carte débloquée ✅",
      pinChanged: "PIN modifié avec succès ✅",
      profileUpdated: "Profil mis à jour ✅",
      registered: "Bienvenue dans Egoto ! Ton compte est prêt 🌿",
    },

    // ── Erreurs ───────────────────────────────────────────
    errors: {
      generic: "Une erreur est survenue, réessaie dans un instant.",
      invalidPin: "PIN incorrect.",
      invalidPinFormat: "Le PIN doit contenir exactement 4 chiffres.",
      invalidPhone: "Numéro de téléphone invalide. Format attendu : +228XXXXXXXX",
      phoneExists: "Ce numéro est déjà enregistré.",
      circleNotFound: "Cercle introuvable.",
      circleFull: "Ce cercle est complet.",
      circleNotActive: "Ce cercle n'est plus actif.",
      alreadyMember: "Tu fais déjà partie de ce cercle.",
      potNotFound: "Bol d'épargne introuvable.",
      potLocked: "Ce bol est verrouillé jusqu'à l'objectif.",
      insufficientScore: "Score insuffisant pour cette action.",
      unauthorized: "Connecte-toi pour continuer.",
      sessionExpired: "Session expirée. Reconnecte-toi.",
      missingFields: "Certains champs obligatoires sont manquants.",
      invalidAmount: "Le montant doit être supérieur à 0.",
      invalidFrequency: "Fréquence invalide. Choisis : hebdomadaire, bimensuel ou mensuel.",
      userNotFound: "Utilisateur introuvable.",
      invalidCredentials: "Numéro ou PIN incorrect.",
      circleNotFull: "La tontine doit être complète avant de pouvoir cotiser.",
      notAnAdmin: "Action réservée à l'administrateur de la tontine.",
    },

    // ── Labels (interface) ────────────────────────────────
    labels: {
      balance: "Solde",
      totalSaved: "Total épargné",
      score: "Score Egoto",
      members: "Membres",
      nextTurn: "Prochain tour",
      cycle: "Cycle",
      objective: "Objectif",
      progress: "Progression",
      frequency: "Fréquence",
      amount: "Montant",
      perContribution: "par cotisation",
      weekly: "Hebdomadaire",
      biweekly: "Bimensuel",
      monthly: "Mensuel",
      position: "Position",
      role: "Rôle",
      admin: "Admin",
      member: "Membre",
      createdAt: "Créé le",
      estimatedDate: "Date estimée",
      remaining: "Restant",
      free: "Épargne libre",
      fixed: "Épargne fixe",
      virtual: "Carte virtuelle",
      physical: "Carte physique",
      inviteCode: "Code d'invitation",
    },

    // ── Paliers du Score ──────────────────────────────────
    scoreTiers: {
      beginner: "Débutant",
      standard: "Carte virtuelle",
      imf: "Mise en relation IMF",
      gold: "Carte Gold",
    },
    scoreTierRanges: {
      beginner: "0 – 199",
      standard: "200 – 499",
      imf: "500 – 599",
      gold: "600+",
    },

    // ── Bot WhatsApp ──────────────────────────────────────
    bot: {
      welcome: "Bienvenue sur Egoto ! 🌿",
      mainMenu: "📋 *Menu principal*",
      menuOptions: [
        "1️⃣ Mes cercles",
        "2️⃣ Cotiser",
        "3️⃣ Créer un cercle",
        "4️⃣ Mon bol d'épargne",
        "5️⃣ Mon score",
        "6️⃣ Ma carte",
        "7️⃣ Profil",
      ],
      askLanguage:
        "Choisis ta langue / Choose your language:\n1️⃣ Français\n2️⃣ English",
      askPhone: "Entre ton numéro de téléphone (ex: +22890123456) :",
      askPin: "Crée un PIN à 4 chiffres :",
      askPinLogin: "Entre ton PIN à 4 chiffres :",
      askFirstName: "Ton prénom :",
      askLastName: "Ton nom de famille :",
      unknownCommand:
        "Je n'ai pas compris. Tape *0* pour revenir au menu principal.",
      returnToMenu: "Tape *0* pour revenir au menu principal.",
      goodbye: "À bientôt sur Egoto ! 🌿",
      paymentWaiting:
        "⏳ Paiement en cours de vérification... Tu recevras une confirmation.",
    },
  },

  en: {
    actions: {
      contribute: "Contribute",
      createPot: "Create a pot",
      createCircle: "Create a circle",
      joinCircle: "Join a circle",
      viewScore: "View my score",
      activateCard: "Activate card",
      blockCard: "Block card",
      unblockCard: "Unblock card",
      withdraw: "Withdraw",
      changePin: "Change PIN",
      logout: "Log out",
    },

    status: {
      pending: "Pending",
      confirmed: "Confirmed",
      failed: "Failed",
      active: "Active",
      completed: "Completed",
      cancelled: "Cancelled",
      blocked: "Blocked",
      inactive: "Inactive",
    },

    confirmations: {
      contributionPending: "Contribution pending confirmation...",
      contributionConfirmed: "Contribution confirmed ✅",
      contributionFailed: "Contribution failed ❌",
      circleCreated: "Circle created successfully ✅",
      circleJoined: "You joined the circle ✅",
      potCreated: "Savings pot created ✅",
      potWithdrawal: "Withdrawal completed ✅",
      cardActivated: "Card activated ✅",
      cardBlocked: "Card blocked",
      cardUnblocked: "Card unblocked ✅",
      pinChanged: "PIN changed successfully ✅",
      profileUpdated: "Profile updated ✅",
      registered: "Welcome to Egoto! Your account is ready 🌿",
    },

    errors: {
      generic: "Something went wrong, please try again.",
      invalidPin: "Incorrect PIN.",
      invalidPinFormat: "PIN must be exactly 4 digits.",
      invalidPhone: "Invalid phone number. Expected format: +228XXXXXXXX",
      phoneExists: "This number is already registered.",
      circleNotFound: "Circle not found.",
      circleFull: "This circle is full.",
      circleNotActive: "This circle is no longer active.",
      alreadyMember: "You are already a member of this circle.",
      potNotFound: "Savings pot not found.",
      potLocked: "This pot is locked until the goal is reached.",
      insufficientScore: "Insufficient score for this action.",
      unauthorized: "Please log in to continue.",
      sessionExpired: "Session expired. Please log in again.",
      missingFields: "Some required fields are missing.",
      invalidAmount: "Amount must be greater than 0.",
      invalidFrequency:
        "Invalid frequency. Choose: weekly, biweekly, or monthly.",
      userNotFound: "User not found.",
      invalidCredentials: "Incorrect number or PIN.",
      circleNotFull: "The tontine circle must be full before contributing.",
      notAnAdmin: "Only the tontine administrator can perform this action.",
    },

    labels: {
      balance: "Balance",
      totalSaved: "Total saved",
      score: "Egoto Score",
      members: "Members",
      nextTurn: "Next turn",
      cycle: "Cycle",
      objective: "Objective",
      progress: "Progress",
      frequency: "Frequency",
      amount: "Amount",
      perContribution: "per contribution",
      weekly: "Weekly",
      biweekly: "Biweekly",
      monthly: "Monthly",
      position: "Position",
      role: "Role",
      admin: "Admin",
      member: "Member",
      createdAt: "Created on",
      estimatedDate: "Estimated date",
      remaining: "Remaining",
      free: "Free savings",
      fixed: "Fixed savings",
      virtual: "Virtual card",
      physical: "Physical card",
      inviteCode: "Invite code",
    },

    scoreTiers: {
      beginner: "Beginner",
      standard: "Virtual card",
      imf: "MFI referral",
      gold: "Gold card",
    },
    scoreTierRanges: {
      beginner: "0 – 199",
      standard: "200 – 499",
      imf: "500 – 599",
      gold: "600+",
    },

    bot: {
      welcome: "Welcome to Egoto! 🌿",
      mainMenu: "📋 *Main menu*",
      menuOptions: [
        "1️⃣ My circles",
        "2️⃣ Contribute",
        "3️⃣ Create a circle",
        "4️⃣ My savings pot",
        "5️⃣ My score",
        "6️⃣ My card",
        "7️⃣ Profile",
      ],
      askLanguage:
        "Choose your language / Choisis ta langue:\n1️⃣ Français\n2️⃣ English",
      askPhone: "Enter your phone number (e.g. +22890123456):",
      askPin: "Create a 4-digit PIN:",
      askPinLogin: "Enter your 4-digit PIN:",
      askFirstName: "Your first name:",
      askLastName: "Your last name:",
      unknownCommand:
        "I didn't understand. Type *0* to go back to the main menu.",
      returnToMenu: "Type *0* to go back to the main menu.",
      goodbye: "See you soon on Egoto! 🌿",
      paymentWaiting:
        "⏳ Payment being verified... You'll receive a confirmation.",
    },
  },
} as const;

// ── Types ─────────────────────────────────────────────────
export type Language = keyof typeof content;
export type ContentMap = (typeof content)["fr"];

// ── Helper : accéder à un texte par chemin ────────────────
// Exemple : t("fr", "errors.generic") → "Une erreur est survenue..."
export function t(lang: Language, path: string): string {
  const keys = path.split(".");
  let result: unknown = content[lang] ?? content.fr;
  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return path; // fallback : renvoie le chemin si introuvable
    }
  }
  return typeof result === "string" ? result : path;
}

// ── Error code → message mapping ──────────────────────────
// Le backend renvoie des codes (ex: "PHONE_EXISTS"), cette
// fonction les traduit pour l'affichage utilisateur
const errorCodeMap: Record<string, keyof ContentMap["errors"]> = {
  PHONE_EXISTS: "phoneExists",
  INVALID_PHONE: "invalidPhone",
  INVALID_PIN: "invalidPin",
  INVALID_PIN_FORMAT: "invalidPinFormat",
  INVALID_CREDENTIALS: "invalidCredentials",
  MISSING_FIELDS: "missingFields",
  CIRCLE_NOT_FOUND: "circleNotFound",
  CIRCLE_FULL: "circleFull",
  CIRCLE_NOT_ACTIVE: "circleNotActive",
  ALREADY_MEMBER: "alreadyMember",
  POT_NOT_FOUND: "potNotFound",
  POT_LOCKED: "potLocked",
  INSUFFICIENT_SCORE: "insufficientScore",
  UNAUTHORIZED: "unauthorized",
  SESSION_EXPIRED: "sessionExpired",
  INVALID_AMOUNT: "invalidAmount",
  INVALID_FREQUENCY: "invalidFrequency",
  USER_NOT_FOUND: "userNotFound",
};

export function errorMessage(lang: Language, code: string): string {
  const key = errorCodeMap[code];
  if (key) {
    return content[lang]?.errors[key] ?? content.fr.errors[key] ?? content.fr.errors.generic;
  }
  return content[lang]?.errors.generic ?? content.fr.errors.generic;
}
