import { Router, Request, Response, NextFunction } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { CardService } from "../services/card.service";
import { AppError } from "../middleware/errorHandler";

const router = Router();
const cardService = new CardService();

// ─── POST /api/cards ─────────────────────────────────────
// Demander une carte (type: "virtual" | "physical")
router.post(
  "/",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      if (!type || !["virtual", "physical"].includes(type)) {
        throw new AppError(400, "MISSING_FIELDS");
      }

      const card = await cardService.requestCard(req.user!.id, type);
      res.status(201).json({ success: true, data: card });
    } catch (err) {
      next(err);
    }
  }
);

// ─── GET /api/cards ──────────────────────────────────────
// Lister mes cartes
router.get(
  "/",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cards = await cardService.getByUser(req.user!.id);
      res.json({ success: true, data: cards });
    } catch (err) {
      next(err);
    }
  }
);

// ─── POST /api/cards/:id/activate ────────────────────────
// Activer une carte
router.post(
  "/:id/activate",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const card = await cardService.activate(req.user!.id, req.params.id as string);
      res.json({ success: true, data: card });
    } catch (err) {
      next(err);
    }
  }
);

// ─── POST /api/cards/:id/block ───────────────────────────
// Bloquer une carte
router.post(
  "/:id/block",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const card = await cardService.setBlockedStatus(req.user!.id, req.params.id as string, true);
      res.json({ success: true, data: card });
    } catch (err) {
      next(err);
    }
  }
);

// ─── POST /api/cards/:id/unblock ─────────────────────────
// Débloquer une carte
router.post(
  "/:id/unblock",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const card = await cardService.setBlockedStatus(req.user!.id, req.params.id as string, false);
      res.json({ success: true, data: card });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
