import { Router, Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { authenticate } from "../middleware/auth.middleware";
import { validatePhone, validatePin } from "../utils/validators";
import { AppError } from "../middleware/errorHandler";

const router = Router();
const authService = new AuthService();

// ─── POST /api/auth/check-exists ─────────────────────────
// Vérifie si un numéro de téléphone est déjà enregistré
// Pas d'auth requise, utilisé pour guider l'onboarding
router.post(
  "/check-exists",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { phone } = req.body;
      if (!phone) {
        throw new AppError(400, "MISSING_FIELDS");
      }
      if (!validatePhone(phone)) {
        throw new AppError(400, "INVALID_PHONE");
      }
      const { prisma } = await import("../lib/prisma");
      const user = await prisma.user.findUnique({ where: { phone } });
      res.json({ success: true, data: { exists: !!user } });
    } catch (err) {
      next(err);
    }
  }
);

// ─── POST /api/auth/register ─────────────────────────────
// Crée un compte (phone + PIN + prénom + nom)
// Pas d'auth requise
router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { phone, pin, firstName, lastName, language } = req.body;

      // Validation des champs obligatoires
      if (!phone || !pin || !firstName || !lastName) {
        throw new AppError(400, "MISSING_FIELDS");
      }
      if (!validatePhone(phone)) {
        throw new AppError(400, "INVALID_PHONE");
      }
      if (!validatePin(pin)) {
        throw new AppError(400, "INVALID_PIN_FORMAT");
      }

      const result = await authService.register(
        phone,
        pin,
        firstName,
        lastName,
        language
      );

      res.status(201).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }
);

// ─── POST /api/auth/login ────────────────────────────────
// Se connecter (phone + PIN) → renvoie token JWT
// Pas d'auth requise
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { phone, pin } = req.body;

      if (!phone || !pin) {
        throw new AppError(400, "MISSING_FIELDS");
      }
      if (!validatePhone(phone)) {
        throw new AppError(400, "INVALID_PHONE");
      }

      const result = await authService.login(phone, pin);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }
);

// ─── GET /api/auth/me ────────────────────────────────────
// Profil de l'utilisateur connecté (avec score)
router.get(
  "/me",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await authService.getProfile(req.user!.id);
      res.json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  }
);

// ─── PUT /api/auth/me ────────────────────────────────────
// Modifier le profil (prénom, nom, langue)
router.put(
  "/me",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { firstName, lastName, language } = req.body;
      const user = await authService.updateProfile(req.user!.id, {
        firstName,
        lastName,
        language,
      });
      res.json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  }
);

// ─── PUT /api/auth/pin ───────────────────────────────────
// Changer le PIN (ancien PIN requis)
router.put(
  "/pin",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPin, newPin } = req.body;

      if (!oldPin || !newPin) {
        throw new AppError(400, "MISSING_FIELDS");
      }
      if (!validatePin(newPin)) {
        throw new AppError(400, "INVALID_PIN_FORMAT");
      }

      await authService.changePin(req.user!.id, oldPin, newPin);
      res.json({ success: true, message: "PIN_CHANGED" });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
