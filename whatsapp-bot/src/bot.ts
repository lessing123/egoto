// ═══════════════════════════════════════════════════════════════
// WhatsApp Bot — Cœur logique (Machine à état)
// ═══════════════════════════════════════════════════════════════
// Le bot WhatsApp utilise shared/content.ts pour assurer une
// cohérence parfaite de ton et de messages avec l'application
// mobile.
// ═══════════════════════════════════════════════════════════════

import { content, errorMessage, t, Language } from "@egoto/shared";
import { UserSession, resetSessionToMenu, BotStep } from "./session";
import { egotoApi } from "./api";

/**
 * Fonction principale : reçoit un message textuel et l'état courant,
 * applique la logique métier de l'API backend et renvoie la réponse textuelle
 * ainsi que le nouvel état de la session.
 */
export async function handleBotMessage(
  session: UserSession,
  body: string
): Promise<string> {
  const text = body.trim();
  const lang = session.language;

  // 1. Gestion globale du retour au menu
  if (session.step !== "ASK_LANGUAGE" && session.step !== "ASK_ONBOARDING_OR_LOGIN" && text === "0") {
    resetSessionToMenu(session);
    return renderMainMenu(session);
  }

  // 2. Machine à état
  switch (session.step) {
    // ─── ÉTAPE A : Choix de la Langue ───────────────────
    case "ASK_LANGUAGE": {
      if (text === "1") {
        session.language = "fr";
        session.step = "ASK_ONBOARDING_OR_LOGIN";
        return session.language === "fr"
          ? "Langue configurée en Français. 🇫🇷\n\nEntre ton numéro de téléphone au format E.164 (ex: +22890123456) :"
          : "Language set to French.";
      } else if (text === "2") {
        session.language = "en";
        session.step = "ASK_ONBOARDING_OR_LOGIN";
        return "Language set to English. 🇬🇧\n\nEnter your phone number in E.164 format (e.g. +22890123456):";
      }
      return t(lang, "bot.askLanguage");
    }

    // ─── ÉTAPE B : Entrée du numéro de téléphone ────────
    case "ASK_ONBOARDING_OR_LOGIN": {
      // Validation du numéro E.164
      if (!/^\+228\d{8}$/.test(text)) {
        return t(lang, "errors.invalidPhone");
      }
      session.tempData.phone = text;

      // Vérification d'existence
      const res = await egotoApi.checkExists(text);

      if (res.success && res.data?.exists) {
        // L'utilisateur existe déjà -> Login flow
        session.step = "ASK_PIN_LOGIN";
        return t(lang, "bot.askPinLogin");
      } else {
        // L'utilisateur n'existe pas -> Register flow
        session.step = "ASK_FIRSTNAME";
        return t(lang, "bot.askFirstName");
      }
    }

    // ─── REGISTER FLOW ─────────────────────────────────
    case "ASK_FIRSTNAME": {
      if (text.length < 2) {
        return t(lang, "bot.askFirstName");
      }
      session.tempData.firstName = text;
      session.step = "ASK_LASTNAME";
      return t(lang, "bot.askLastName");
    }

    case "ASK_LASTNAME": {
      if (text.length < 2) {
        return t(lang, "bot.askLastName");
      }
      session.tempData.lastName = text;
      session.step = "ASK_PIN_REGISTER";
      return t(lang, "bot.askPin");
    }

    case "ASK_PIN_REGISTER": {
      if (!/^\d{4}$/.test(text)) {
        return t(lang, "errors.invalidPinFormat");
      }

      const res = await egotoApi.register({
        phone: session.tempData.phone,
        pin: text,
        firstName: session.tempData.firstName,
        lastName: session.tempData.lastName,
        language: lang,
      });

      if (!res.success) {
        return errorMessage(lang, res.error?.code || "GENERIC") + `\n\n${t(lang, "bot.askPin")}`;
      }

      // Succès inscription
      session.token = res.data.token;
      resetSessionToMenu(session);
      return `${t(lang, "confirmations.registered")}\n\n${renderMainMenu(session)}`;
    }

    // ─── LOGIN FLOW ────────────────────────────────────
    case "ASK_PIN_LOGIN": {
      if (!/^\d{4}$/.test(text)) {
        return t(lang, "errors.invalidPinFormat");
      }

      const res = await egotoApi.login(session.tempData.phone, text);
      if (!res.success) {
        return `${t(lang, "errors.invalidCredentials")}\n\n${t(lang, "bot.askPinLogin")}`;
      }

      // Succès connexion
      session.token = res.data.token;
      session.language = res.data.user.language as "fr" | "en";
      resetSessionToMenu(session);
      return `Bienvenue / Welcome back, ${res.data.user.firstName}! 🌿\n\n${renderMainMenu(session)}`;
    }

    // ─── MENU PRINCIPAL ────────────────────────────────
    case "MAIN_MENU": {
      switch (text) {
        case "1": // Cercles
          session.step = "CIRCLE_MENU";
          return renderCircleMenu(session);
        case "2": // Cotiser
          session.step = "CONTRIBUTE_CIRCLE_SELECT";
          return handleStartContribution(session);
        case "3": // Créer cercle
          session.step = "CREATE_CIRCLE_NAME";
          return lang === "fr" ? "Entre le nom du cercle de tontine :" : "Enter the tontine circle name:";
        case "4": // Bols d'épargne
          session.step = "POT_MENU";
          return renderPotMenu(session);
        case "5": // Mon score
          return handleGetScore(session);
        case "6": // Ma carte
          session.step = "CARD_MENU";
          return renderCardMenu(session);
        case "7": // Profil
          return handleGetProfile(session);
        default:
          return `${t(lang, "bot.unknownCommand")}\n\n${renderMainMenu(session)}`;
      }
    }

    // ─── FLUX CERCLES / TONTINE ────────────────────────
    case "CIRCLE_MENU": {
      if (text === "1") {
        // Lister mes cercles
        return handleListCircles(session);
      } else if (text === "2") {
        // Rejoindre un cercle
        session.step = "JOIN_CIRCLE_ID";
        return lang === "fr"
          ? "Entre le code d'invitation à 5 caractères (ex: T3B7F) :"
          : "Enter the 5-character invite code (e.g. T3B7F):";
      } else if (text === "3") {
        // Créer un cercle
        session.step = "CREATE_CIRCLE_NAME";
        return lang === "fr" ? "Entre le nom du cercle :" : "Enter the circle name:";
      }
      session.step = "MAIN_MENU";
      return renderMainMenu(session);
    }

    case "JOIN_CIRCLE_ID": {
      const cleanedCode = text.toUpperCase().trim();
      if (cleanedCode.length !== 5) {
        return lang === "fr"
          ? "Le code d'invitation doit contenir exactement 5 caractères (ex: T3B7F). Recommence :"
          : "The invite code must be exactly 5 characters (e.g. T3B7F). Try again:";
      }
      const res = await egotoApi.joinCircle(cleanedCode, session.token!);
      if (!res.success) {
        session.step = "CIRCLE_MENU";
        return `${errorMessage(lang, res.error?.code || "GENERIC")}\n\n${renderCircleMenu(session)}`;
      }

      session.step = "CIRCLE_MENU";
      return `${t(lang, "confirmations.circleJoined")} "${res.data.circle.name}" !\n\n${renderCircleMenu(session)}`;
    }

    case "CREATE_CIRCLE_NAME": {
      if (text.length < 2) {
        return lang === "fr" ? "Nom trop court. Recommence :" : "Name too short. Try again:";
      }
      session.tempData.circleName = text;
      session.step = "CREATE_CIRCLE_AMOUNT";
      return lang === "fr"
        ? "Entre le montant de la cotisation par tour (en FCFA) :"
        : "Enter the contribution amount per round (in FCFA):";
    }

    case "CREATE_CIRCLE_AMOUNT": {
      const amount = parseInt(text);
      if (isNaN(amount) || amount <= 0) {
        return t(lang, "errors.invalidAmount");
      }
      session.tempData.circleAmount = amount;
      session.step = "CREATE_CIRCLE_FREQ";
      return lang === "fr"
        ? "Choisis la fréquence de rotation :\n1️⃣ Hebdomadaire\n2️⃣ Bimensuel\n3️⃣ Mensuel"
        : "Choose rotation frequency:\n1️⃣ Weekly\n2️⃣ Biweekly\n3️⃣ Monthly";
    }

    case "CREATE_CIRCLE_FREQ": {
      let freq = "";
      if (text === "1") freq = "weekly";
      else if (text === "2") freq = "biweekly";
      else if (text === "3") freq = "monthly";
      else {
        return lang === "fr" ? "Choix invalide. Tape 1, 2 ou 3 :" : "Invalid choice. Enter 1, 2 or 3:";
      }

      session.tempData.circleFreq = freq;
      session.step = "CREATE_CIRCLE_MAX";
      return lang === "fr"
        ? "Nombre maximum de membres dans le cercle (ex: 5, 10, 12) :"
        : "Maximum number of members in the circle (e.g. 5, 10, 12):";
    }

    case "CREATE_CIRCLE_MAX": {
      const max = parseInt(text);
      if (isNaN(max) || max < 2 || max > 50) {
        return lang === "fr"
          ? "Le nombre doit être compris entre 2 et 50. Recommence :"
          : "Number must be between 2 and 50. Try again:";
      }

      const res = await egotoApi.createCircle(
        {
          name: session.tempData.circleName,
          amount: session.tempData.circleAmount,
          frequency: session.tempData.circleFreq,
          maxMembers: max,
        },
        session.token!
      );

      if (!res.success) {
        session.step = "CIRCLE_MENU";
        return `${errorMessage(lang, res.error?.code || "GENERIC")}\n\n${renderCircleMenu(session)}`;
      }

      session.step = "CIRCLE_MENU";
      return `${t(lang, "confirmations.circleCreated")} !\nID de partage : \`${res.data.id}\` (partage-le à tes proches pour qu'ils rejoignent)\n\n${renderCircleMenu(session)}`;
    }

    // ─── COTISATION CERCLE (PAYMENT) ───────────────────
    case "CONTRIBUTE_CIRCLE_SELECT": {
      const index = parseInt(text) - 1;
      const circles = session.tempData.circlesList || [];

      if (isNaN(index) || index < 0 || index >= circles.length) {
        session.step = "MAIN_MENU";
        return `${t(lang, "errors.generic")}\n\n${renderMainMenu(session)}`;
      }

      const selectedCircle = circles[index];

      const res = await egotoApi.initiateCircleContribution(
        selectedCircle.id,
        session.token!
      );

      if (!res.success) {
        session.step = "MAIN_MENU";
        return `${errorMessage(lang, res.error?.code || "GENERIC")}\n\n${renderMainMenu(session)}`;
      }

      session.step = "MAIN_MENU";
      return `${t(lang, "confirmations.contributionPending")}\n${t(lang, "bot.paymentWaiting")}\n\n${t(lang, "bot.returnToMenu")}`;
    }

    // ─── ÉTAPE 5 : BOLS D'ÉPARGNE ──────────────────────
    case "POT_MENU": {
      if (text === "1") {
        return handleListPots(session);
      } else if (text === "2") {
        session.step = "CREATE_POT_NAME";
        return lang === "fr" ? "Nom de ton bol d'épargne (ex: Scolarité, Moto, Pagnes) :" : "Name of your savings pot:";
      } else if (text === "3") {
        session.step = "CONTRIBUTE_POT_SELECT";
        return handleStartPotContribution(session);
      }
      session.step = "MAIN_MENU";
      return renderMainMenu(session);
    }

    case "CREATE_POT_NAME": {
      if (text.length < 2) {
        return lang === "fr" ? "Nom trop court. Recommence :" : "Name too short. Try again:";
      }
      session.tempData.potName = text;
      session.step = "CREATE_POT_TARGET";
      return lang === "fr"
        ? "Quel est ton montant objectif (en FCFA) ?"
        : "What is your target amount (in FCFA)?";
    }

    case "CREATE_POT_TARGET": {
      const target = parseInt(text);
      if (isNaN(target) || target <= 0) {
        return t(lang, "errors.invalidAmount");
      }
      session.tempData.potTarget = target;
      session.step = "CREATE_POT_MODE";
      return lang === "fr"
        ? "Choisis le mode d'épargne :\n1️⃣ Épargne libre (tu cotises quand tu veux)\n2️⃣ Épargne fixe programmée"
        : "Choose savings mode:\n1️⃣ Free savings (save whenever you want)\n2️⃣ Programmed fixed savings";
    }

    case "CREATE_POT_MODE": {
      if (text === "1") {
        session.tempData.potMode = "free";
        session.step = "CREATE_POT_LOCKED";
        return lang === "fr"
          ? "Veux-tu bloquer le compte jusqu'à l'objectif (impossible de retirer avant) ?\n1️⃣ Oui (Compte bloqué 🔒)\n2️⃣ Non (Accès libre 🔓)"
          : "Do you want to lock the pot until target is reached?\n1️⃣ Yes (Locked 🔒)\n2️⃣ No (Flexible 🔓)";
      } else if (text === "2") {
        session.tempData.potMode = "fixed";
        session.step = "CREATE_POT_FREQ";
        return lang === "fr"
          ? "Fréquence des versements :\n1️⃣ Hebdomadaire\n2️⃣ Bimensuel\n3️⃣ Mensuel"
          : "Contribution frequency:\n1️⃣ Weekly\n2️⃣ Biweekly\n3️⃣ Monthly";
      }
      return lang === "fr" ? "Tape 1 ou 2 :" : "Enter 1 or 2:";
    }

    case "CREATE_POT_FREQ": {
      let freq = "";
      if (text === "1") freq = "weekly";
      else if (text === "2") freq = "biweekly";
      else if (text === "3") freq = "monthly";
      else return lang === "fr" ? "Choix invalide. Tape 1, 2 ou 3 :" : "Invalid choice. Enter 1, 2 or 3:";

      session.tempData.potFreq = freq;
      session.step = "CREATE_POT_FIXED";
      return lang === "fr"
        ? "Quel montant veux-tu verser automatiquement à chaque période (en FCFA) ?"
        : "How much do you want to contribute per period (in FCFA)?";
    }

    case "CREATE_POT_FIXED": {
      const fixed = parseInt(text);
      if (isNaN(fixed) || fixed <= 0) {
        return t(lang, "errors.invalidAmount");
      }
      session.tempData.potFixed = fixed;
      session.step = "CREATE_POT_LOCKED";
      return lang === "fr"
        ? "Veux-tu bloquer le compte jusqu'à l'objectif (impossible de retirer avant) ?\n1️⃣ Oui (Compte bloqué 🔒)\n2️⃣ Non (Accès libre 🔓)"
        : "Do you want to lock the pot until target is reached?\n1️⃣ Yes (Locked 🔒)\n2️⃣ No (Flexible 🔓)";
    }

    case "CREATE_POT_LOCKED": {
      let locked = false;
      if (text === "1") locked = true;
      else if (text === "2") locked = false;
      else return lang === "fr" ? "Tape 1 ou 2 :" : "Enter 1 or 2:";

      const res = await egotoApi.createPot(
        {
          name: session.tempData.potName,
          targetAmount: session.tempData.potTarget,
          mode: session.tempData.potMode,
          frequency: session.tempData.potFreq,
          fixedAmount: session.tempData.potFixed,
          isLocked: locked,
        },
        session.token!
      );

      if (!res.success) {
        session.step = "POT_MENU";
        return `${errorMessage(lang, res.error?.code || "GENERIC")}\n\n${renderPotMenu(session)}`;
      }

      session.step = "POT_MENU";
      return `${t(lang, "confirmations.potCreated")} "${res.data.name}" !\n\n${renderPotMenu(session)}`;
    }

    case "CONTRIBUTE_POT_SELECT": {
      const index = parseInt(text) - 1;
      const pots = session.tempData.potsList || [];

      if (isNaN(index) || index < 0 || index >= pots.length) {
        session.step = "POT_MENU";
        return `${t(lang, "errors.generic")}\n\n${renderPotMenu(session)}`;
      }

      session.tempData.selectedPot = pots[index];
      session.step = "CONTRIBUTE_POT_AMOUNT";
      return lang === "fr" ? "Montant à cotiser (en FCFA) :" : "Amount to contribute (in FCFA):";
    }

    case "CONTRIBUTE_POT_AMOUNT": {
      const amount = parseInt(text);
      if (isNaN(amount) || amount <= 0) {
        return t(lang, "errors.invalidAmount");
      }

      const pot = session.tempData.selectedPot;
      const res = await egotoApi.initiatePotContribution(pot.id, amount, session.token!);

      if (!res.success) {
        session.step = "POT_MENU";
        return `${errorMessage(lang, res.error?.code || "GENERIC")}\n\n${renderPotMenu(session)}`;
      }

      session.step = "MAIN_MENU";
      return `${t(lang, "confirmations.contributionPending")}\n${t(lang, "bot.paymentWaiting")}\n\n${t(lang, "bot.returnToMenu")}`;
    }

    // ─── ÉTAPE 5 : MA CARTE VISA ───────────────────────
    case "CARD_MENU": {
      if (text === "1") {
        return handleListCards(session);
      } else if (text === "2") {
        session.step = "REQUEST_CARD_TYPE";
        return lang === "fr"
          ? "Choisis le type de carte à commander :\n1️⃣ Carte virtuelle standard (score ≥ 200)\n2️⃣ Carte physique Gold (score ≥ 500)"
          : "Choose the card type to request:\n1️⃣ Virtual standard card (score ≥ 200)\n2️⃣ Physical Gold card (score ≥ 500)";
      } else if (text === "3") {
        return handleToggleCards(session, "activate");
      } else if (text === "4") {
        return handleToggleCards(session, "block");
      } else if (text === "5") {
        return handleToggleCards(session, "unblock");
      }
      session.step = "MAIN_MENU";
      return renderMainMenu(session);
    }

    case "REQUEST_CARD_TYPE": {
      let type: "virtual" | "physical";
      if (text === "1") type = "virtual";
      else if (text === "2") type = "physical";
      else return lang === "fr" ? "Choix invalide. Tape 1 ou 2 :" : "Invalid choice. Enter 1 or 2:";

      const res = await egotoApi.requestCard(type, session.token!);
      if (!res.success) {
        session.step = "CARD_MENU";
        return `${errorMessage(lang, res.error?.code || "GENERIC")}\n\n${renderCardMenu(session)}`;
      }

      session.step = "CARD_MENU";
      return `Demande de carte réussie ! Numéro de carte temporaire : **** **** **** ${res.data.lastFour}\n\n${renderCardMenu(session)}`;
    }
  }

  // Fallback si rien ne matche
  resetSessionToMenu(session);
  return renderMainMenu(session);
}

// ═══════════════════════════════════════════════════════════════
// RENDERS & HANDLERS (AIDE VISUELLE)
// ═══════════════════════════════════════════════════════════════

function renderMainMenu(session: UserSession): string {
  const lang = session.language;
  const menuText = [
    t(lang, "bot.mainMenu"),
    ...content[lang].bot.menuOptions,
  ].join("\n");
  return menuText;
}

function renderCircleMenu(session: UserSession): string {
  const lang = session.language;
  return lang === "fr"
    ? "👥 *Menu Cercles (Tontines)*\n\n1️⃣ Voir mes cercles\n2️⃣ Rejoindre un cercle par code d'invitation\n3️⃣ Créer un nouveau cercle\n\n*0* Retour au menu principal"
    : "👥 *Circles Menu (Tontines)*\n\n1️⃣ View my circles\n2️⃣ Join a circle by invite code\n3️⃣ Create a new circle\n\n*0* Back to main menu";
}

function renderPotMenu(session: UserSession): string {
  const lang = session.language;
  return lang === "fr"
    ? "🍯 *Menu Bols d'Épargne*\n\n1️⃣ Voir mes bols d'épargne\n2️⃣ Créer un bol d'épargne\n3️⃣ Cotiser à un bol\n\n*0* Retour au menu principal"
    : "🍯 *Savings Pots Menu*\n\n1️⃣ View my savings pots\n2️⃣ Create a savings pot\n3️⃣ Contribute to a pot\n\n*0* Back to main menu";
}

function renderCardMenu(session: UserSession): string {
  const lang = session.language;
  return lang === "fr"
    ? "💳 *Menu Carte Visa Egoto*\n\n1️⃣ Consulter mes cartes\n2️⃣ Commander une carte\n3️⃣ Activer ma carte\n4️⃣ Bloquer ma carte\n5️⃣ Débloquer ma carte\n\n*0* Retour au menu principal"
    : "💳 *Egoto Visa Card Menu*\n\n1️⃣ View my cards\n2️⃣ Order a card\n3️⃣ Activate my card\n4️⃣ Block my card\n5️⃣ Unblock my card\n\n*0* Back to main menu";
}

async function handleListCircles(session: UserSession): Promise<string> {
  const lang = session.language;
  const res = await egotoApi.listCircles(session.token!);

  if (!res.success) {
    return errorMessage(lang, res.error?.code || "GENERIC");
  }

  const circles = res.data;
  if (circles.length === 0) {
    return lang === "fr"
      ? "Tu ne fais partie d'aucun cercle de tontine. Rejoins-en un ou crée ton cercle !\n\n" + renderCircleMenu(session)
      : "You are not in any circle. Join or create one!\n\n" + renderCircleMenu(session);
  }

  let text = lang === "fr" ? "📋 *Mes cercles de tontine :*\n\n" : "📋 *My tontine circles:*\n\n";
  circles.forEach((c: any) => {
    const freqLabel = t(lang, `labels.${c.frequency}`);
    const codeLabel = t(lang, "labels.inviteCode");
    text += `🔹 *${c.name}*\n  • Montant : ${c.amount} FCFA\n  • Fréquence : ${freqLabel}\n  • Membres : ${c._count.members}/${c.maxMembers}\n  • Cycle : ${c.currentCycle}\n  • ${codeLabel} : \`${c.inviteCode || ""}\`\n\n`;
  });

  text += `*0* Retour au menu principal`;
  return text;
}

async function handleStartContribution(session: UserSession): Promise<string> {
  const lang = session.language;
  const res = await egotoApi.listCircles(session.token!);

  if (!res.success) {
    session.step = "MAIN_MENU";
    return errorMessage(lang, res.error?.code || "GENERIC") + `\n\n` + renderMainMenu(session);
  }

  const circles = res.data.filter((c: any) => c.status === "active");
  if (circles.length === 0) {
    session.step = "MAIN_MENU";
    return (lang === "fr"
      ? "Tu n'as aucun cercle actif où cotiser actuellement."
      : "You have no active circle to contribute to.") + `\n\n` + renderMainMenu(session);
  }

  session.tempData.circlesList = circles;

  let text = lang === "fr"
    ? "💸 *Choisis le cercle de tontine pour ta cotisation :*\n\n"
    : "💸 *Choose the tontine circle to contribute to:*\n\n";

  circles.forEach((c: any, idx: number) => {
    text += `${idx + 1}️⃣ *${c.name}* (${c.amount} FCFA)\n`;
  });

  text += `\n*0* Retour au menu principal`;
  return text;
}

async function handleGetScore(session: UserSession): Promise<string> {
  const lang = session.language;
  const res = await egotoApi.getScore(session.token!);

  if (!res.success) {
    return errorMessage(lang, res.error?.code || "GENERIC") + `\n\n` + renderMainMenu(session);
  }

  const { score, tier, nextTier, pointsToNext } = res.data;
  const tierLabel = t(lang, `scoreTiers.${tier}`);

  let text = lang === "fr"
    ? `📈 *Ton score Egoto :* *${score} / 1000*\n`
    : `📈 *Your Egoto Score:* *${score} / 1000*\n`;

  text += `⭐ Palier actuel : *${tierLabel}*\n\n`;

  if (nextTier) {
    const nextTierLabel = t(lang, `scoreTiers.${nextTier}`);
    text += lang === "fr"
      ? `🎯 Plus que *${pointsToNext} points* pour débloquer le palier : *${nextTierLabel}* !\n\n`
      : `🎯 Only *${pointsToNext} points* left to unlock: *${nextTierLabel}*!\n\n`;
  } else {
    text += lang === "fr"
      ? "👑 Félicitations, tu as atteint le palier maximal ! (Carte Gold débloquée)\n\n"
      : "👑 Congratulations, you reached the highest tier! (Gold Card unlocked)\n\n";
  }

  text += `*0* Retour au menu principal`;
  return text;
}

async function handleGetProfile(session: UserSession): Promise<string> {
  const lang = session.language;
  const res = await egotoApi.getProfile(session.token!);

  if (!res.success) {
    return errorMessage(lang, res.error?.code || "GENERIC") + `\n\n` + renderMainMenu(session);
  }

  const user = res.data;
  const scoreLabel = user.score?.score ?? 0;
  const tierLabel = t(lang, `scoreTiers.${user.score?.tier || "beginner"}`);

  let text = lang === "fr"
    ? `👤 *Ton Profil Egoto :*\n\n`
    : `👤 *Your Egoto Profile:*\n\n`;

  text += `📝 Prénom : ${user.firstName}\n`;
  text += `📝 Nom : ${user.lastName}\n`;
  text += `📞 Numéro : ${user.phone}\n`;
  text += `📈 Score : ${scoreLabel} (${tierLabel})\n\n`;
  text += `*0* Retour au menu principal`;
  return text;
}

// ─── ÉTAPE 5 : AUXILIARY FUNCTIONS FOR POTS ──────────
async function handleListPots(session: UserSession): Promise<string> {
  const lang = session.language;
  const res = await egotoApi.listPots(session.token!);

  if (!res.success) {
    return errorMessage(lang, res.error?.code || "GENERIC") + `\n\n` + renderPotMenu(session);
  }

  const pots = res.data;
  if (pots.length === 0) {
    return lang === "fr"
      ? "Tu n'as aucun bol d'épargne actif.\n\n" + renderPotMenu(session)
      : "You have no savings pot.\n\n" + renderPotMenu(session);
  }

  let text = lang === "fr" ? "🍯 *Mes bols d'épargne :*\n\n" : "🍯 *My savings pots:*\n\n";
  pots.forEach((p: any) => {
    const progress = p.targetAmount > 0 ? Math.round((p.currentAmount / p.targetAmount) * 100) : 0;
    const lockIcon = p.isLocked ? "🔒" : "🔓";
    text += `🔸 *${p.name}* ${lockIcon}\n  • Épargné : ${p.currentAmount} / ${p.targetAmount} FCFA (${progress}%)\n  • Mode : ${t(lang, `labels.${p.mode || "free"}`)}\n  • Statut : ${t(lang, `status.${p.status}`)}\n\n`;
  });

  text += `*0* Retour au menu principal`;
  return text;
}

async function handleStartPotContribution(session: UserSession): Promise<string> {
  const lang = session.language;
  const res = await egotoApi.listPots(session.token!);

  if (!res.success) {
    session.step = "POT_MENU";
    return errorMessage(lang, res.error?.code || "GENERIC") + `\n\n` + renderPotMenu(session);
  }

  const pots = res.data.filter((p: any) => p.status === "active");
  if (pots.length === 0) {
    session.step = "POT_MENU";
    return (lang === "fr"
      ? "Tu n'as aucun bol d'épargne actif pour cotiser."
      : "You have no active savings pot to contribute to.") + `\n\n` + renderPotMenu(session);
  }

  session.tempData.potsList = pots;

  let text = lang === "fr"
    ? "💸 *Choisis le bol d'épargne à alimenter :*\n\n"
    : "💸 *Choose the savings pot to feed:*\n\n";

  pots.forEach((p: any, idx: number) => {
    text += `${idx + 1}️⃣ *${p.name}* (${p.currentAmount}/${p.targetAmount} FCFA)\n`;
  });

  text += `\n*0* Retour au menu principal`;
  return text;
}

// ─── ÉTAPE 5 : AUXILIARY FUNCTIONS FOR CARDS ─────────
async function handleListCards(session: UserSession): Promise<string> {
  const lang = session.language;
  const res = await egotoApi.listCards(session.token!);

  if (!res.success) {
    return errorMessage(lang, res.error?.code || "GENERIC") + `\n\n` + renderCardMenu(session);
  }

  const cards = res.data;
  if (cards.length === 0) {
    return lang === "fr"
      ? "Tu n'as aucune carte Visa Egoto émise.\n\n" + renderCardMenu(session)
      : "You have no Visa cards.\n\n" + renderCardMenu(session);
  }

  let text = lang === "fr" ? "💳 *Mes cartes Visa Egoto :*\n\n" : "💳 *My Egoto Visa cards:*\n\n";
  cards.forEach((c: any) => {
    const statusLabel = t(lang, `status.${c.status}`);
    const tierLabel = t(lang, `scoreTiers.${c.tier === "gold" ? "gold" : "standard"}`);
    text += `🔹 *Visa ${tierLabel}* (${t(lang, `labels.${c.type}`)})\n  • Numéro : **** **** **** ${c.lastFour}\n  • Statut : *${statusLabel}*\n\n`;
  });

  text += `*0* Retour au menu principal`;
  return text;
}

async function handleToggleCards(session: UserSession, action: "activate" | "block" | "unblock"): Promise<string> {
  const lang = session.language;
  const res = await egotoApi.listCards(session.token!);

  if (!res.success) {
    return errorMessage(lang, res.error?.code || "GENERIC") + `\n\n` + renderCardMenu(session);
  }

  const cards = res.data;
  if (cards.length === 0) {
    return lang === "fr"
      ? "Tu n'as pas de carte à gérer.\n\n" + renderCardMenu(session)
      : "You have no cards to manage.\n\n" + renderCardMenu(session);
  }

  // Pour simplifier l'UX WhatsApp, on effectue l'action directement sur la toute première carte disponible.
  const targetCard = cards[0];
  let apiRes;
  if (action === "activate") apiRes = await egotoApi.activateCard(targetCard.id, session.token!);
  else if (action === "block") apiRes = await egotoApi.blockCard(targetCard.id, session.token!);
  else apiRes = await egotoApi.unblockCard(targetCard.id, session.token!);

  if (!apiRes.success) {
    return `${errorMessage(lang, apiRes.error?.code || "GENERIC")}\n\n${renderCardMenu(session)}`;
  }

  const suffix = action === "block" ? "ed" : "d";
  const confirmMsg = t(lang, `confirmations.card${action.charAt(0).toUpperCase() + action.slice(1)}${suffix}`);
  return `${confirmMsg} (**** **** **** ${targetCard.lastFour})\n\n${renderCardMenu(session)}`;
}
