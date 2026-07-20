// ═══════════════════════════════════════════════════════════════
// WhatsApp Bot — Client API Backend
// ═══════════════════════════════════════════════════════════════
// Toutes les actions du bot WhatsApp interrogent l'API d'Egoto.
// Aucune logique métier, aucun accès direct à la base de données.
// ═══════════════════════════════════════════════════════════════

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000/api";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

async function request<T = any>(
  method: string,
  path: string,
  body?: any,
  token?: string
): Promise<ApiResponse<T>> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${BACKEND_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const json: any = await res.json();
    if (res.ok && json.success) {
      return { success: true, data: json.data };
    }

    return {
      success: false,
      error: json.error || {
        code: "INTERNAL_ERROR",
        message: "Request failed",
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: "CONNECTION_ERROR",
        message: error.message || "Failed to reach backend",
      },
    };
  }
}

export const egotoApi = {
  // ── Auth ──────────────────────────────────────────
  checkExists: (phone: string) =>
    request("POST", "/auth/check-exists", { phone }),

  register: (data: {
    phone: string;
    pin: string;
    firstName: string;
    lastName: string;
    language: string;
  }) => request("POST", "/auth/register", data),

  login: (phone: string, pin: string) =>
    request("POST", "/auth/login", { phone, pin }),

  getProfile: (token: string) => request("GET", "/auth/me", undefined, token),

  updateProfile: (
    data: { firstName?: string; lastName?: string; language?: string },
    token: string
  ) => request("PUT", "/auth/me", data, token),

  // ── Cercles ───────────────────────────────────────
  createCircle: (
    data: {
      name: string;
      amount: number;
      frequency: string;
      maxMembers: number;
    },
    token: string
  ) => request("POST", "/circles", data, token),

  listCircles: (token: string) => request("GET", "/circles", undefined, token),

  getCircleDetail: (circleId: string, token: string) =>
    request("GET", `/circles/${circleId}`, undefined, token),

  joinCircle: (inviteCode: string, token: string) =>
    request("POST", "/circles/join-by-code", { inviteCode }, token),

  // ── Cotisations & Paiements ────────────────────────
  initiateCircleContribution: (circleId: string, token: string) =>
    request("POST", `/contributions/circle/${circleId}`, undefined, token),

  initiatePotContribution: (potId: string, amount: number, token: string) =>
    request("POST", `/contributions/pot/${potId}`, { amount }, token),

  // ── Bols d'Épargne ────────────────────────────────
  createPot: (
    data: {
      name: string;
      targetAmount: number;
      mode: "fixed" | "free";
      frequency?: string;
      fixedAmount?: number;
      isLocked: boolean;
    },
    token: string
  ) => request("POST", "/savings", data, token),

  listPots: (token: string) => request("GET", "/savings", undefined, token),

  getPotDetail: (potId: string, token: string) =>
    request("GET", `/savings/${potId}`, undefined, token),

  withdrawPot: (potId: string, token: string) =>
    request("POST", `/savings/${potId}/withdraw`, undefined, token),

  // ── Score ─────────────────────────────────────────
  getScore: (token: string) => request("GET", "/score", undefined, token),

  getScoreEvents: (token: string) => request("GET", "/score/events", undefined, token),

  // ── Cartes ────────────────────────────────────────
  listCards: (token: string) => request("GET", "/cards", undefined, token),

  requestCard: (type: "virtual" | "physical", token: string) =>
    request("POST", "/cards", { type }, token),

  activateCard: (cardId: string, token: string) =>
    request("POST", `/cards/${cardId}/activate`, undefined, token),

  blockCard: (cardId: string, token: string) =>
    request("POST", `/cards/${cardId}/block`, undefined, token),

  unblockCard: (cardId: string, token: string) =>
    request("POST", `/cards/${cardId}/unblock`, undefined, token),
};
