import { Router, Request, Response, NextFunction } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { paymentService } from "../services/payment.service";
import { AppError } from "../middleware/errorHandler";

const router = Router();

// ─── POST /api/contributions/circle/:circleId ────────────
// Initier une cotisation pour un cercle de tontine.
// Le montant est celui défini dans le cercle.
// Le paiement est "en attente" jusqu'à confirmation du provider.
router.post(
  "/circle/:circleId",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await paymentService.initiateCircleContribution(
        req.user!.id,
        req.params.circleId as string
      );

      res.status(201).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }
);

// ─── POST /api/contributions/pot/:potId ──────────────────
// Initier une cotisation pour un bol d'épargne.
// Le montant est spécifié dans le body (mode libre) ou fixé (mode fixe).
router.post(
  "/pot/:potId",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { amount } = req.body;

      if (!amount || !Number.isInteger(amount) || amount <= 0) {
        throw new AppError(400, "INVALID_AMOUNT");
      }

      const result = await paymentService.initiatePotContribution(
        req.user!.id,
        req.params.potId as string,
        amount
      );

      res.status(201).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }
);

// ─── GET /api/contributions/circle/:circleId ─────────────
// Historique des cotisations d'un cercle pour l'utilisateur connecté.
router.get(
  "/circle/:circleId",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { prisma } = await import("../lib/prisma");

      const contributions = await prisma.contribution.findMany({
        where: {
          circleId: req.params.circleId as string,
          userId: req.user!.id,
        },
        orderBy: { createdAt: "desc" },
        include: {
          paymentIntent: {
            select: {
              id: true,
              status: true,
              externalRef: true,
              provider: true,
              confirmedAt: true,
            },
          },
        },
      });

      res.json({ success: true, data: contributions });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
