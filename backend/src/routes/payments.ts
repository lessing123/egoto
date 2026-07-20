import { Router, Request, Response, NextFunction } from "express";
import { paymentService } from "../services/payment.service";

const router = Router();

// ─── POST /api/payments/webhook ──────────────────────────
// Webhook de confirmation de paiement.
// En production : appelé par CinetPay / PawaPay.
// Pour le MVP : le SimulatedProvider appelle handleConfirmation
// directement (bypass HTTP), mais cet endpoint reste disponible
// pour les tests manuels et la future intégration.
//
// ⚠️ PAS d'authentification JWT — les webhooks agrégateurs
// n'envoient pas de token Bearer. En production, valider
// la signature du webhook (HMAC, IP whitelist, etc.).
router.post(
  "/webhook",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paymentIntentId, externalRef, status } = req.body;

      if (!paymentIntentId || !externalRef || !status) {
        res.status(400).json({
          success: false,
          error: { code: "MISSING_FIELDS", message: "MISSING_FIELDS" },
        });
        return;
      }

      if (!["confirmed", "failed"].includes(status)) {
        res.status(400).json({
          success: false,
          error: { code: "INVALID_STATUS", message: "Status must be 'confirmed' or 'failed'" },
        });
        return;
      }

      const result = await paymentService.handleWebhook({
        paymentIntentId,
        externalRef,
        status,
      });

      res.json({
        success: true,
        data: {
          processed: !result.alreadyProcessed,
          message: result.alreadyProcessed
            ? "Already processed (idempotent)"
            : "Payment confirmation processed",
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
