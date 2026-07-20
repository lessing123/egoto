import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AppError } from "./errorHandler";

/**
 * Middleware d'authentification JWT.
 * Vérifie le header Authorization: Bearer <token>
 * et attache l'utilisateur à req.user.
 *
 * Le même token JWT fonctionne pour le bot ET l'app mobile —
 * un utilisateur peut s'authentifier via WhatsApp et utiliser
 * le même token côté app, ou l'inverse.
 */
export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(401, "UNAUTHORIZED");
    }

    const token = authHeader.slice(7); // Retire "Bearer "
    const payload = verifyToken(token);

    req.user = {
      id: payload.id,
      phone: payload.phone,
    };

    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }

    // JWT expiré ou invalide
    next(new AppError(401, "SESSION_EXPIRED"));
  }
}
