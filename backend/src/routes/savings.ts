import { Router, Request, Response, NextFunction } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { SavingsService } from "../services/savings.service";
import { AppError } from "../middleware/errorHandler";

const router = Router();
const savingsService = new SavingsService();

// ─── POST /api/savings ───────────────────────────────────
// Créer un bol d'épargne
router.post(
  "/",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, targetAmount, mode, frequency, customDays, fixedAmount, isLocked, targetDate } = req.body;

      if (!name || !targetAmount || !mode) {
        throw new AppError(400, "MISSING_FIELDS");
      }

      if (targetAmount <= 0) {
        throw new AppError(400, "INVALID_AMOUNT");
      }

      const pot = await savingsService.create(req.user!.id, {
        name,
        targetAmount,
        mode,
        frequency,
        customDays: customDays ? parseInt(customDays, 10) : undefined,
        fixedAmount,
        isLocked: !!isLocked,
        targetDate: targetDate ? new Date(targetDate) : undefined,
      });

      res.status(201).json({ success: true, data: pot });
    } catch (err) {
      next(err);
    }
  }
);

// ─── GET /api/savings ────────────────────────────────────
// Lister les bols d'épargne
router.get(
  "/",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pots = await savingsService.listByUser(req.user!.id);
      res.json({ success: true, data: pots });
    } catch (err) {
      next(err);
    }
  }
);

// ─── GET /api/savings/:id ────────────────────────────────
// Détail d'un bol d'épargne (avec ses cotisations)
router.get(
  "/:id",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pot = await savingsService.getById(req.user!.id, req.params.id as string);
      res.json({ success: true, data: pot });
    } catch (err) {
      next(err);
    }
  }
);

// ─── POST /api/savings/:id/withdraw ──────────────────────
// Effectuer un retrait
router.post(
  "/:id/withdraw",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pot = await savingsService.withdraw(req.user!.id, req.params.id as string);
      res.json({ success: true, data: pot });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
