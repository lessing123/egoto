// ═══════════════════════════════════════════════════════════════
// Egoto Mobile — Client API
// ═══════════════════════════════════════════════════════════════

const BACKEND_URL = "http://localhost:3000/api";

let sessionToken: string | null = null;

export function setToken(token: string | null) {
  sessionToken = token;
}

export function getToken() {
  return sessionToken;
}

async function request<T = any>(
  method: string,
  path: string,
  body?: any
): Promise<{ success: boolean; data?: T; error?: { code: string; message: string } }> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (sessionToken) {
      headers["Authorization"] = `Bearer ${sessionToken}`;
    }

    const res = await fetch(`${BACKEND_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const json = await res.json();
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

export const api = {
  checkExists: (phone: string) => request("POST", "/auth/check-exists", { phone }),
  register: (data: { phone: string; pin: string; firstName: string; lastName: string; language: string }) =>
    request("POST", "/auth/register", data),
  login: (phone: string, pin: string) => request("POST", "/auth/login", { phone, pin }),
  getProfile: () => request("GET", "/auth/me"),
  updateProfile: (data: { firstName?: string; lastName?: string; language?: string }) => request("PUT", "/auth/me", data),
  
  createCircle: (data: { name: string; amount: number; frequency: string; maxMembers: number }) =>
    request("POST", "/circles", data),
  listCircles: () => request("GET", "/circles"),
  getCircleDetail: (circleId: string) => request("GET", `/circles/${circleId}`),
  joinCircle: (circleId: string) => request("POST", `/circles/${circleId}/join`),
  joinCircleByCode: (inviteCode: string) => request("POST", "/circles/join-by-code", { inviteCode }),
  inviteMemberByPhone: (circleId: string, phone: string) => request("POST", `/circles/${circleId}/invite`, { phone }),
  updateCircle: (circleId: string, data: { name?: string; amount?: number; frequency?: string }) => request("PUT", `/circles/${circleId}`, data),
  
  initiateCircleContribution: (circleId: string) => request("POST", `/contributions/circle/${circleId}`),
  initiatePotContribution: (potId: string, amount: number) => request("POST", `/contributions/pot/${potId}`, { amount }),
  
  createPot: (data: { name: string; targetAmount: number; mode: "fixed" | "free"; frequency?: string; fixedAmount?: number; isLocked: boolean }) =>
    request("POST", "/savings", data),
  listPots: () => request("GET", "/savings"),
  getPotDetail: (potId: string) => request("GET", `/savings/${potId}`),
  withdrawPot: (potId: string) => request("POST", `/savings/${potId}/withdraw`),
  
  getScore: () => request("GET", "/score"),
  getScoreEvents: () => request("GET", "/score/events"),
  
  listCards: () => request("GET", "/cards"),
  requestCard: (type: "virtual" | "physical") => request("POST", "/cards", { type }),
  activateCard: (cardId: string) => request("POST", `/cards/${cardId}/activate`),
  blockCard: (cardId: string) => request("POST", `/cards/${cardId}/block`),
  unblockCard: (cardId: string) => request("POST", `/cards/${cardId}/unblock`),
};
