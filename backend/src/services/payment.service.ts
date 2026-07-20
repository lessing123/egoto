import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/errorHandler";
import { PaymentProvider } from "../providers/payment.provider";
import { SimulatedPaymentProvider } from "../providers/simulated.provider";
import { ScoreService } from "./score.service";
import { notificationService } from "./notification.service";

// ═══════════════════════════════════════════════════════════════
// PaymentService — Orchestration des paiements
// ═══════════════════════════════════════════════════════════════
// Point central qui :
// 1. Crée le PaymentIntent + la Contribution (status: pending)
// 2. Appelle le PaymentProvider pour initier le paiement
// 3. Reçoit la confirmation (via callback simulated / webhook réel)
// 4. Met à jour PaymentIntent + Contribution → confirmed
// 5. Crée le ScoreEvent + recalcule le score
// 6. Crée la Transaction
//
// Le score ne se met à jour qu'APRÈS confirmation — jamais avant.
// ═══════════════════════════════════════════════════════════════

const scoreService = new ScoreService();

export class PaymentService {
  private provider: PaymentProvider;

  constructor() {
    // Pour le MVP : provider simulé
    // Pour la prod : new CinetPayProvider() ou new PawaPay()
    this.provider = new SimulatedPaymentProvider(
      this.handleConfirmation.bind(this)
    );
  }

  /**
   * Initie une cotisation pour un cercle de tontine.
   * Crée le PaymentIntent et la Contribution, puis lance le paiement.
   */
  async initiateCircleContribution(userId: string, circleId: string) {
    // Vérifier que le cercle existe, que l'utilisateur en est membre, et qu'il est complet
    const circle = await prisma.circle.findUnique({
      where: { id: circleId },
      include: {
        members: { where: { userId }, select: { id: true } },
        _count: { select: { members: true } },
      },
    });

    if (!circle) {
      throw new AppError(404, "CIRCLE_NOT_FOUND");
    }
    if (circle.status !== "active") {
      throw new AppError(400, "CIRCLE_NOT_ACTIVE");
    }
    if (circle.members.length === 0) {
      throw new AppError(403, "NOT_A_MEMBER");
    }
    
    // Règle d'or Egoto : impossible de cotiser tant que le cercle n'est pas plein
    if (circle._count.members < circle.maxMembers) {
      throw new AppError(400, "CIRCLE_NOT_FULL");
    }

    // Récupérer le numéro de téléphone de l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { phone: true },
    });
    if (!user) throw new AppError(404, "USER_NOT_FOUND");

    // Créer le PaymentIntent
    const paymentIntent = await prisma.paymentIntent.create({
      data: {
        userId,
        amount: circle.amount,
        provider: this.provider.name,
        status: "initiated",
      },
    });

    // Créer la Contribution (pending)
    const contribution = await prisma.contribution.create({
      data: {
        userId,
        circleId,
        amount: circle.amount,
        cycle: circle.currentCycle,
        status: "pending",
        paymentIntentId: paymentIntent.id,
      },
    });

    // Initier le paiement via le provider
    const { externalRef } = await this.provider.initiatePayment({
      paymentIntentId: paymentIntent.id,
      amount: circle.amount,
      phone: user.phone,
    });

    // Sauvegarder la référence externe
    await prisma.paymentIntent.update({
      where: { id: paymentIntent.id },
      data: { externalRef },
    });

    return {
      contribution: {
        id: contribution.id,
        amount: contribution.amount,
        status: contribution.status,
        cycle: contribution.cycle,
      },
      paymentIntent: {
        id: paymentIntent.id,
        status: paymentIntent.status,
        externalRef,
        provider: paymentIntent.provider,
      },
    };
  }

  /**
   * Initie une cotisation pour un bol d'épargne.
   * (Préparé pour l'étape 3)
   */
  async initiatePotContribution(
    userId: string,
    savingsPotId: string,
    amount: number
  ) {
    // Vérifier que le bol existe et appartient à l'utilisateur
    const pot = await prisma.savingsPot.findUnique({
      where: { id: savingsPotId },
    });

    if (!pot) throw new AppError(404, "POT_NOT_FOUND");
    if (pot.userId !== userId) throw new AppError(403, "NOT_YOUR_POT");
    if (pot.status !== "active") throw new AppError(400, "POT_NOT_ACTIVE");

    // Récupérer le téléphone
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { phone: true },
    });
    if (!user) throw new AppError(404, "USER_NOT_FOUND");

    // Créer PaymentIntent
    const paymentIntent = await prisma.paymentIntent.create({
      data: {
        userId,
        amount,
        provider: this.provider.name,
        status: "initiated",
      },
    });

    // Créer Contribution (pending)
    const contribution = await prisma.contribution.create({
      data: {
        userId,
        savingsPotId,
        amount,
        status: "pending",
        paymentIntentId: paymentIntent.id,
      },
    });

    // Initier le paiement
    const { externalRef } = await this.provider.initiatePayment({
      paymentIntentId: paymentIntent.id,
      amount,
      phone: user.phone,
    });

    await prisma.paymentIntent.update({
      where: { id: paymentIntent.id },
      data: { externalRef },
    });

    return {
      contribution: {
        id: contribution.id,
        amount: contribution.amount,
        status: contribution.status,
      },
      paymentIntent: {
        id: paymentIntent.id,
        status: paymentIntent.status,
        externalRef,
        provider: paymentIntent.provider,
      },
    };
  }

  /**
   * Gère la confirmation de paiement.
   * Appelé par :
   * - Le SimulatedPaymentProvider (via callback, après 2-3s)
   * - Le webhook endpoint (quand un vrai agrégateur confirme)
   *
   * C'est ICI que le score se met à jour — jamais avant.
   */
  async handleConfirmation(
    paymentIntentId: string,
    externalRef: string,
    status: "confirmed" | "failed"
  ): Promise<void> {
    const now = new Date();

    // 1. Mettre à jour le PaymentIntent
    const paymentIntent = await prisma.paymentIntent.update({
      where: { id: paymentIntentId },
      data: {
        status,
        externalRef,
        confirmedAt: status === "confirmed" ? now : undefined,
      },
    });

    // 2. Trouver et mettre à jour la Contribution liée
    const contribution = await prisma.contribution.findFirst({
      where: { paymentIntentId },
    });

    if (!contribution) {
      console.error(
        `⚠️ Aucune contribution trouvée pour PaymentIntent ${paymentIntentId}`
      );
      return;
    }

    await prisma.contribution.update({
      where: { id: contribution.id },
      data: {
        status,
        confirmedAt: status === "confirmed" ? now : undefined,
      },
    });

    if (status === "confirmed") {
      // 3. Créer la Transaction
      await prisma.transaction.create({
        data: {
          userId: paymentIntent.userId,
          type: "contribution",
          amount: paymentIntent.amount,
          direction: "out",
          reference: externalRef,
          description: contribution.circleId
            ? `Cotisation cercle cycle ${contribution.cycle}`
            : `Cotisation bol d'épargne`,
        },
      });

      // 4. Score : ajouter un événement "cotisation à temps"
      await scoreService.addEvent(
        paymentIntent.userId,
        "contribution_ontime",
        contribution.circleId
          ? `Cotisation cercle confirmée (cycle ${contribution.cycle})`
          : `Cotisation bol d'épargne confirmée`
      );

      // 5. Si c'est une cotisation bol, mettre à jour le montant actuel
      if (contribution.savingsPotId) {
        const pot = await prisma.savingsPot.update({
          where: { id: contribution.savingsPotId },
          data: {
            currentAmount: { increment: contribution.amount },
          },
        });

        // Vérifier si l'objectif est atteint
        if (pot.currentAmount >= pot.targetAmount && pot.status === "active") {
          await prisma.savingsPot.update({
            where: { id: pot.id },
            data: { status: "completed" },
          });

          // Bonus score : objectif de bol atteint
          await scoreService.addEvent(
            paymentIntent.userId,
            "pot_goal",
            `Objectif du bol "${pot.name}" atteint !`
          );
        }
      }

      // 6. Si c'est une cotisation cercle/tontine, vérifier s'il faut effectuer le reversement (payout) de fin de cycle
      if (contribution.circleId) {
        const circleId = contribution.circleId;
        const cycle = contribution.cycle!;

        // Récupérer le cercle avec tous ses membres et toutes les cotisations confirmées pour ce cycle
        const circle = await prisma.circle.findUnique({
          where: { id: circleId },
          include: {
            members: { include: { user: true } },
            contributions: {
              where: { cycle, status: "confirmed" },
            },
          },
        });

        if (circle) {
          // Si le nombre de cotisations confirmées pour ce cycle est égal au nombre de membres :
          if (circle.contributions.length === circle.members.length) {
            const payoutAmount = circle.amount * circle.members.length;

            // Déterminer la position de retrait (cycle modulo members.length)
            // Exemple : cycle 1 -> position 1; cycle 2 -> position 2; etc.
            const positionToPayout = ((cycle - 1) % circle.members.length) + 1;
            const beneficiary = circle.members.find((m) => m.position === positionToPayout);

            if (beneficiary) {
              console.log(
                `💰 [PAYOUT] Reversement de la cagnotte de ${payoutAmount} FCFA au bénéficiaire position ${positionToPayout} (${beneficiary.user.firstName} ${beneficiary.user.lastName}) pour le cycle ${cycle}`
              );

              // Enregistrer la transaction de payout
              await prisma.transaction.create({
                data: {
                  userId: beneficiary.userId,
                  type: "payout",
                  amount: payoutAmount,
                  direction: "in",
                  reference: `PAYOUT-C${cycle}-${circle.id.substring(0, 8)}`,
                  description: `Reversement cagnotte tontine "${circle.name}" (Cycle ${cycle})`,
                },
              });

              // Envoyer une notification SMS & WhatsApp au bénéficiaire
              await notificationService.notifyPayoutReceived(
                beneficiary.user.phone,
                circle.name,
                payoutAmount,
                cycle,
                beneficiary.user.language
              );

              // Incrémenter le cycle actuel de la tontine
              await prisma.circle.update({
                where: { id: circleId },
                data: {
                  currentCycle: { increment: 1 },
                },
              });
            }
          }
        }
      }

      console.log(
        `✅ Paiement confirmé : ${paymentIntent.amount} FCFA (user: ${paymentIntent.userId})`
      );
    } else {
      console.log(
        `❌ Paiement échoué : ${paymentIntent.amount} FCFA (ref: ${externalRef})`
      );
    }
  }

  /**
   * Webhook public — pour les vrais agrégateurs (CinetPay, PawaPay).
   * Le SimulatedProvider n'utilise pas cet endpoint, il appelle
   * handleConfirmation directement.
   */
  async handleWebhook(body: {
    paymentIntentId: string;
    externalRef: string;
    status: "confirmed" | "failed";
  }) {
    // Vérifier que le PaymentIntent existe
    const pi = await prisma.paymentIntent.findUnique({
      where: { id: body.paymentIntentId },
    });

    if (!pi) {
      throw new AppError(404, "PAYMENT_NOT_FOUND");
    }

    if (pi.status !== "initiated") {
      // Déjà traité — idempotent
      return { alreadyProcessed: true };
    }

    await this.handleConfirmation(
      body.paymentIntentId,
      body.externalRef,
      body.status
    );

    return { alreadyProcessed: false };
  }
}

// Instance unique — partagée par les routes
export const paymentService = new PaymentService();
