import { prisma } from "../lib/prisma";

// ═══════════════════════════════════════════════════════════════
// ScoreService — Calcul du Score Egoto
// ═══════════════════════════════════════════════════════════════
// Score 0-1000, recalculé à chaque ScoreEvent.
//
// Paliers :
//   0-199   → beginner (accès tontines et épargne)
//   200-499 → standard (carte Visa virtuelle)
//   500-599 → imf      (mise en relation IMF)
//   600+    → gold     (carte Gold + partenaires prioritaires)
//
// Événements :
//   contribution_ontime  → +15 points
//   cycle_complete       → +50 points
//   pot_goal             → +30 points
//   late                 → -20 points
//   default              → -50 points
// ═══════════════════════════════════════════════════════════════

/** Points attribués par type d'événement */
const SCORE_POINTS: Record<string, number> = {
  contribution_ontime: 15,
  cycle_complete: 50,
  pot_goal: 30,
  late: -20,
  default: -50,
};

/** Calcule le palier à partir du score */
function calculateTier(score: number): string {
  if (score >= 600) return "gold";
  if (score >= 500) return "imf";
  if (score >= 200) return "standard";
  return "beginner";
}

/** Clamp le score entre 0 et 1000 */
function clampScore(score: number): number {
  return Math.max(0, Math.min(1000, score));
}

export class ScoreService {
  /**
   * Ajoute un événement de score et recalcule le score total.
   * Appelé UNIQUEMENT après confirmation du paiement par le PaymentProvider.
   */
  async addEvent(
    userId: string,
    type: string,
    description?: string
  ): Promise<{ score: number; tier: string; event: any }> {
    const points = SCORE_POINTS[type];
    if (points === undefined) {
      throw new Error(`Unknown score event type: ${type}`);
    }

    // Créer l'événement
    const event = await prisma.scoreEvent.create({
      data: {
        userId,
        type,
        points,
        description,
      },
    });

    // Recalculer le score total depuis tous les événements
    const aggregate = await prisma.scoreEvent.aggregate({
      where: { userId },
      _sum: { points: true },
    });

    const rawScore = aggregate._sum.points ?? 0;
    const score = clampScore(rawScore);
    const tier = calculateTier(score);

    // Mettre à jour le score utilisateur
    await prisma.egotoScore.upsert({
      where: { userId },
      update: { score, tier },
      create: { userId, score, tier },
    });

    return { score, tier, event };
  }

  /**
   * Récupère le score actuel et le palier d'un utilisateur.
   */
  async getScore(userId: string) {
    let score = await prisma.egotoScore.findUnique({
      where: { userId },
    });

    // Si le score n'existe pas encore, le créer
    if (!score) {
      score = await prisma.egotoScore.create({
        data: { userId, score: 0, tier: "beginner" },
      });
    }

    // Infos sur le prochain palier
    const nextTier = this.getNextTierInfo(score.score, score.tier);

    return {
      score: score.score,
      tier: score.tier,
      ...nextTier,
    };
  }

  /**
   * Récupère l'historique des événements de score.
   */
  async getEvents(userId: string, limit: number = 50) {
    return prisma.scoreEvent.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  /**
   * Calcule les infos sur le prochain palier à débloquer.
   */
  private getNextTierInfo(
    currentScore: number,
    currentTier: string
  ): { nextTier: string | null; pointsToNext: number | null } {
    const thresholds: Record<string, { next: string; threshold: number }> = {
      beginner: { next: "standard", threshold: 200 },
      standard: { next: "imf", threshold: 500 },
      imf: { next: "gold", threshold: 600 },
    };

    const info = thresholds[currentTier];
    if (!info) {
      return { nextTier: null, pointsToNext: null }; // Already gold
    }

    return {
      nextTier: info.next,
      pointsToNext: Math.max(0, info.threshold - currentScore),
    };
  }
}
