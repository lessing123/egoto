import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/errorHandler";

export class SavingsService {
  /**
   * Crée un bol d'épargne individuel.
   */
  async create(
    userId: string,
    data: {
      name: string;
      targetAmount: number;
      mode: "fixed" | "free";
      frequency?: string;
      fixedAmount?: number;
      isLocked: boolean;
      targetDate?: Date;
    }
  ) {
    if (data.mode === "fixed" && (!data.frequency || !data.fixedAmount)) {
      throw new AppError(400, "MISSING_FIELDS");
    }

    return prisma.savingsPot.create({
      data: {
        userId,
        name: data.name,
        targetAmount: data.targetAmount,
        mode: data.mode,
        frequency: data.frequency,
        fixedAmount: data.fixedAmount,
        isLocked: data.isLocked,
        targetDate: data.targetDate,
        status: "active",
      },
    });
  }

  /**
   * Liste tous les bols d'épargne d'un utilisateur.
   */
  async listByUser(userId: string) {
    return prisma.savingsPot.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Récupère le détail d'un bol d'épargne avec ses cotisations confirmées.
   */
  async getById(userId: string, potId: string) {
    const pot = await prisma.savingsPot.findUnique({
      where: { id: potId },
      include: {
        contributions: {
          where: { status: "confirmed" },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!pot) {
      throw new AppError(404, "POT_NOT_FOUND");
    }

    if (pot.userId !== userId) {
      throw new AppError(403, "UNAUTHORIZED");
    }

    return pot;
  }

  /**
   * Retire les fonds d'un bol d'épargne.
   * Si le bol est verrouillé (isLocked === true), le retrait n'est possible
   * que si le montant actuel a atteint l'objectif (status === "completed").
   */
  async withdraw(userId: string, potId: string) {
    const pot = await prisma.savingsPot.findUnique({
      where: { id: potId },
    });

    if (!pot) {
      throw new AppError(404, "POT_NOT_FOUND");
    }

    if (pot.userId !== userId) {
      throw new AppError(403, "UNAUTHORIZED");
    }

    if (pot.status === "withdrawn") {
      throw new AppError(400, "ALREADY_WITHDRAWN");
    }

    if (pot.currentAmount <= 0) {
      throw new AppError(400, "INVALID_AMOUNT");
    }

    // Règle de verrouillage :
    // Si verrouillé et non complété (solde < objectif), bloquer le retrait.
    if (pot.isLocked && pot.status !== "completed") {
      throw new AppError(400, "POT_LOCKED");
    }

    // Effectuer le retrait
    const updatedPot = await prisma.$transaction(async (tx) => {
      // Mettre à jour le bol
      const p = await tx.savingsPot.update({
        where: { id: potId },
        data: {
          currentAmount: 0,
          status: "withdrawn",
        },
      });

      // Créer la transaction financière
      await tx.transaction.create({
        data: {
          userId,
          type: "withdrawal",
          amount: pot.currentAmount,
          direction: "out",
          description: `Retrait du bol d'épargne "${pot.name}"`,
        },
      });

      return p;
    });

    return updatedPot;
  }
}
