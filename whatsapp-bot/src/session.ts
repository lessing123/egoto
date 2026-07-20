// ═══════════════════════════════════════════════════════════════
// WhatsApp Bot — Session Manager
// ═══════════════════════════════════════════════════════════════

export type BotStep =
  | "ASK_LANGUAGE"
  | "ASK_ONBOARDING_OR_LOGIN"
  // Register flow
  | "ASK_FIRSTNAME"
  | "ASK_LASTNAME"
  | "ASK_PIN_REGISTER"
  // Login flow
  | "ASK_PIN_LOGIN"
  // Menu and features
  | "MAIN_MENU"
  // Circle flow
  | "CIRCLE_MENU"
  | "CREATE_CIRCLE_NAME"
  | "CREATE_CIRCLE_AMOUNT"
  | "CREATE_CIRCLE_FREQ"
  | "CREATE_CIRCLE_MAX"
  | "JOIN_CIRCLE_ID"
  // Contribution flow
  | "CONTRIBUTE_CIRCLE_SELECT"
  // Pot flow (Étape 5)
  | "POT_MENU"
  | "CREATE_POT_NAME"
  | "CREATE_POT_TARGET"
  | "CREATE_POT_MODE"
  | "CREATE_POT_FREQ"
  | "CREATE_POT_FIXED"
  | "CREATE_POT_LOCKED"
  | "CONTRIBUTE_POT_SELECT"
  | "CONTRIBUTE_POT_AMOUNT"
  // Card flow (Étape 5)
  | "CARD_MENU"
  | "REQUEST_CARD_TYPE";

export interface UserSession {
  phone: string;       // Numéro E.164 de l'utilisateur (From)
  language: "fr" | "en";
  step: BotStep;
  token?: string;      // Token JWT pour appeler le backend
  tempData: Record<string, any>; // Stockage temporaire (nom du cercle, etc.)
  lastActive: Date;
}

const sessions: Map<string, UserSession> = new Map();

/**
 * Récupère ou crée la session d'un utilisateur WhatsApp.
 */
export function getOrCreateSession(phone: string): UserSession {
  let session = sessions.get(phone);
  if (!session) {
    session = {
      phone,
      language: "fr", // langue par défaut
      step: "ASK_LANGUAGE",
      tempData: {},
      lastActive: new Date(),
    };
    sessions.set(phone, session);
  } else {
    session.lastActive = new Date();
  }
  return session;
}

/**
 * Réinitialise une session utilisateur (revient au menu principal).
 */
export function resetSessionToMenu(session: UserSession) {
  session.step = "MAIN_MENU";
  session.tempData = {};
}

/**
 * Purge complète d'une session (déconnexion).
 */
export function clearSession(phone: string) {
  sessions.delete(phone);
}
