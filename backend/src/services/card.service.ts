import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/errorHandler";

export class CardService {
  /**
   * Demande une nouvelle carte Visa Egoto.
   * Vérifie le score Egoto de l'utilisateur :
   * - Virtuelle : score >= 200 requis
   * - Physique : score >= 500 requis
   * - Si score >= 600 : Tier = "gold" (avec 1% cashback), sinon "standard".
   */
  async requestCard(userId: string, type: "virtual" | "physical") {
    // Récupérer le score
    const egotoScore = await prisma.egotoScore.findUnique({
      where: { userId },
    });

    const scoreValue = egotoScore?.score ?? 0;

    // Règle d'éligibilité
    if (type === "virtual" && scoreValue < 200) {
      throw new AppError(400, "INSUFFICIENT_SCORE");
    }

    if (type === "physical" && scoreValue < 500) {
      throw new AppError(400, "INSUFFICIENT_SCORE");
    }

    // Déterminer la gamme
    const tier = scoreValue >= 600 ? "gold" : "standard";

    // Générer 4 derniers chiffres aléatoires
    const lastFour = Math.floor(1000 + Math.random() * 9000).toString();

    // Créer la carte
    const card = await prisma.card.create({
      data: {
        userId,
        type,
        tier,
        lastFour,
        status: "inactive", // inactive par défaut, doit être activée par l'utilisateur
      },
    });

    return card;
  }

  /**
   * Active une carte inactive.
   */
  async activate(userId: string, cardId: string) {
    const card = await prisma.card.findUnique({
      where: { id: cardId },
    });

    if (!card) throw new AppError(404, "CARD_NOT_FOUND");
    if (card.userId !== userId) throw new AppError(403, "UNAUTHORIZED");
    if (card.status !== "inactive") {
      throw new AppError(400, "ALREADY_ACTIVE");
    }

    return prisma.card.update({
      where: { id: cardId },
      data: { status: "active" },
    });
  }

  /**
   * Bloque ou débloque une carte.
   */
  async setBlockedStatus(userId: string, cardId: string, blocked: boolean) {
    const card = await prisma.card.findUnique({
      where: { id: cardId },
    });

    if (!card) throw new AppError(404, "CARD_NOT_FOUND");
    if (card.userId !== userId) throw new AppError(403, "UNAUTHORIZED");
    if (card.status === "inactive") {
      throw new AppError(400, "CARD_NOT_ACTIVATED");
    }

    const newStatus = blocked ? "blocked" : "active";

    return prisma.card.update({
      where: { id: cardId },
      data: { status: newStatus },
    });
  }

  /**
   * Récupère la/les cartes d'un utilisateur.
   */
  async getByUser(userId: string) {
    return prisma.card.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }
}
