import { Router, Request, Response, NextFunction } from "express";
import { CircleService } from "../services/circle.service";
import { authenticate } from "../middleware/auth.middleware";
import { validateFrequency, validateAmount } from "../utils/validators";
import { AppError } from "../middleware/errorHandler";

const router = Router();
const circleService = new CircleService();

// ─── POST /api/circles ───────────────────────────────────
// Créer un cercle de tontine
// Le créateur devient admin en position 1
router.post(
  "/",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, amount, frequency, maxMembers } = req.body;

      // Validation
      if (!name || !amount || !frequency || !maxMembers) {
        throw new AppError(400, "MISSING_FIELDS");
      }
      if (!validateAmount(amount)) {
        throw new AppError(400, "INVALID_AMOUNT");
      }
      if (!validateFrequency(frequency)) {
        throw new AppError(400, "INVALID_FREQUENCY");
      }
      if (
        !Number.isInteger(maxMembers) ||
        maxMembers < 2 ||
        maxMembers > 50
      ) {
        throw new AppError(400, "INVALID_MAX_MEMBERS");
      }

      const circle = await circleService.create(req.user!.id, {
        name,
        amount,
        frequency,
        maxMembers,
      });

      res.status(201).json({ success: true, data: circle });
    } catch (err) {
      next(err);
    }
  }
);

// ─── GET /api/circles ────────────────────────────────────
// Lister mes cercles (en tant que membre)
router.get(
  "/",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const circles = await circleService.listByUser(req.user!.id);
      res.json({ success: true, data: circles });
    } catch (err) {
      next(err);
    }
  }
);

// ─── GET /api/circles/:id ────────────────────────────────
// Détail d'un cercle (membres, cotisations, cycle)
router.get(
  "/:id",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const circle = await circleService.getById(req.params.id as string);
      res.json({ success: true, data: circle });
    } catch (err) {
      next(err);
    }
  }
);

// ─── POST /api/circles/:id/join ──────────────────────────
// Rejoindre un cercle existant
router.post(
  "/:id/join",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const member = await circleService.join(req.user!.id, req.params.id as string);
      res.status(201).json({ success: true, data: member });
    } catch (err) {
      next(err);
    }
  }
);

// ─── POST /api/circles/join-by-code ──────────────────────
// Rejoindre un cercle existant via son code à 5 caractères
router.post(
  "/join-by-code",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { inviteCode } = req.body;
      if (!inviteCode) {
        throw new AppError(400, "MISSING_FIELDS");
      }
      const member = await circleService.joinByCode(req.user!.id, inviteCode);
      res.status(201).json({ success: true, data: member });
    } catch (err) {
      next(err);
    }
  }
);

// ─── POST /api/circles/:id/invite ────────────────────────
// Inviter un membre par son numéro (Admin du cercle requis)
router.post(
  "/:id/invite",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { phone } = req.body;
      if (!phone) {
        throw new AppError(400, "MISSING_FIELDS");
      }
      const member = await circleService.inviteByPhone(req.user!.id, req.params.id as string, phone);
      res.status(201).json({ success: true, data: member });
    } catch (err) {
      next(err);
    }
  }
);

// ─── PUT /api/circles/:id ────────────────────────────────
// Mettre à jour les détails du cercle (Admin requis)
router.put(
  "/:id",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, amount, frequency } = req.body;
      const circle = await circleService.updateCircle(req.user!.id, req.params.id as string, {
        name,
        amount,
        frequency,
      });
      res.json({ success: true, data: circle });
    } catch (err) {
      next(err);
    }
  }
);

// ─── GET /api/circles/:id/members ────────────────────────
// Liste des membres avec positions et rôles
router.get(
  "/:id/members",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const members = await circleService.getMembers(req.params.id as string);
      res.json({ success: true, data: members });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
