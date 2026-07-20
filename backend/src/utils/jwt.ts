import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "egoto-dev-secret";
const JWT_EXPIRES_IN = "7d";

export interface JwtPayload {
  id: string;
  phone: string;
}

/**
 * Génère un JWT signé pour un utilisateur authentifié.
 * Expire après 7 jours — le même token fonctionne pour le bot ET l'app.
 */
export function generateToken(userId: string, phone: string): string {
  return jwt.sign({ id: userId, phone } as JwtPayload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

/**
 * Vérifie et décode un JWT.
 * Lève une erreur si le token est invalide ou expiré.
 */
export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
