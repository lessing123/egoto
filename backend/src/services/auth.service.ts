import { prisma } from "../lib/prisma";
import { hashPin, comparePin } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { AppError } from "../middleware/errorHandler";

export class AuthService {
  /**
   * Crée un nouveau compte utilisateur.
   * - Hash le PIN avec bcrypt (jamais stocké en clair)
   * - Initialise le Score Egoto à 0 (palier débutant)
   * - Renvoie le profil + token JWT
   */
  async register(
    phone: string,
    pin: string,
    firstName: string,
    lastName: string,
    language: string = "fr"
  ) {
    // Vérifie l'unicité du numéro
    const existing = await prisma.user.findUnique({ where: { phone } });
    if (existing) {
      throw new AppError(409, "PHONE_EXISTS");
    }

    const pinHash = await hashPin(pin);

    const user = await prisma.user.create({
      data: {
        phone,
        pinHash,
        firstName,
        lastName,
        language,
        // Initialisation automatique du score à 0
        score: {
          create: { score: 0, tier: "beginner" },
        },
      },
      select: {
        id: true,
        phone: true,
        firstName: true,
        lastName: true,
        language: true,
        createdAt: true,
      },
    });

    const token = generateToken(user.id, user.phone);
    return { user, token };
  }

  /**
   * Authentifie un utilisateur par numéro + PIN.
   * Le même endpoint sert au bot WhatsApp et à l'app mobile.
   */
  async login(phone: string, pin: string) {
    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      // Message générique pour ne pas révéler si le numéro existe
      throw new AppError(401, "INVALID_CREDENTIALS");
    }

    const valid = await comparePin(pin, user.pinHash);
    if (!valid) {
      throw new AppError(401, "INVALID_CREDENTIALS");
    }

    const token = generateToken(user.id, user.phone);

    return {
      user: {
        id: user.id,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        language: user.language,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  /**
   * Récupère le profil complet de l'utilisateur connecté,
   * incluant son score Egoto.
   */
  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        phone: true,
        firstName: true,
        lastName: true,
        language: true,
        createdAt: true,
        score: {
          select: { score: true, tier: true },
        },
      },
    });

    if (!user) {
      throw new AppError(404, "USER_NOT_FOUND");
    }

    return user;
  }

  /**
   * Met à jour le profil (prénom, nom, langue).
   * Le numéro de téléphone ne peut pas être modifié.
   */
  async updateProfile(
    userId: string,
    data: { firstName?: string; lastName?: string; language?: string }
  ) {
    // Ne garde que les champs définis
    const updateData: Record<string, string> = {};
    if (data.firstName) updateData.firstName = data.firstName;
    if (data.lastName) updateData.lastName = data.lastName;
    if (data.language && ["fr", "en"].includes(data.language)) {
      updateData.language = data.language;
    }

    return prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        phone: true,
        firstName: true,
        lastName: true,
        language: true,
      },
    });
  }

  /**
   * Change le PIN de l'utilisateur.
   * Vérifie l'ancien PIN avant d'accepter le nouveau.
   */
  async changePin(userId: string, oldPin: string, newPin: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new AppError(404, "USER_NOT_FOUND");
    }

    const valid = await comparePin(oldPin, user.pinHash);
    if (!valid) {
      throw new AppError(401, "INVALID_PIN");
    }

    const pinHash = await hashPin(newPin);
    await prisma.user.update({
      where: { id: userId },
      data: { pinHash },
    });
  }
}
