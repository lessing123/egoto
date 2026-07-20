import { Request, Response, NextFunction } from "express";

/**
 * Erreur applicative avec code HTTP.
 * Utilise les codes d'erreur définis dans shared/content.ts
 * pour que le client (bot ou app) puisse traduire le message.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(statusCode: number, code: string) {
    super(code);
    this.statusCode = statusCode;
    this.code = code;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Middleware global de gestion d'erreurs Express.
 * Renvoie un JSON structuré : { success: false, error: { code, message } }
 *
 * Le code permet au client de chercher la traduction dans shared/content.ts
 * via errorMessage(lang, code).
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Erreur applicative connue
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
      },
    });
    return;
  }

  // Erreur Prisma — contrainte unique violée
  if (err.constructor?.name === "PrismaClientKnownRequestError") {
    const prismaErr = err as any;
    if (prismaErr.code === "P2002") {
      res.status(409).json({
        success: false,
        error: {
          code: "DUPLICATE_ENTRY",
          message: `Duplicate entry on ${prismaErr.meta?.target}`,
        },
      });
      return;
    }
  }

  // Erreur inattendue
  console.error("🔥 Unhandled error:", err);
  res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_ERROR",
      message:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : err.message,
    },
  });
}
