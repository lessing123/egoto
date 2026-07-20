import { Router, Request, Response, NextFunction } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { ScoreService } from "../services/score.service";

const router = Router();
const scoreService = new ScoreService();

// ─── GET /api/score ──────────────────────────────────────
// Consulter le score Egoto et le palier actuel.
// Inclut les infos sur le prochain palier à débloquer.
router.get(
  "/",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const score = await scoreService.getScore(req.user!.id);
      res.json({ success: true, data: score });
    } catch (err) {
      next(err);
    }
  }
);

// ─── GET /api/score/events ───────────────────────────────
// Historique des événements de score (50 derniers par défaut).
router.get(
  "/events",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = Math.min(
        parseInt(req.query.limit as string) || 50,
        100
      );
      const events = await scoreService.getEvents(req.user!.id, limit);
      res.json({ success: true, data: events });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
