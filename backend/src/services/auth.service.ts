import { prisma } from "../lib/prisma";
import { hashPin, comparePin } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { AppError } from "../middleware/errorHandler";

export class AuthService {
  /**
   * Crée un nouveau compte utilisateur.
   * - Hash le PIN avec bcrypt (jamais stocké en clair)
   * - Initialise le Score Egoto à 0 (palier débutant)
   * - Génère automatiquement un identifiant Egoto unique (EG-XXXXX)
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

    // Générer un code Egoto unique à 5 chiffres (ex: EG-39874)
    let egotoId = "";
    let attempts = 0;
    while (attempts < 10) {
      const codeNum = Math.floor(10000 + Math.random() * 90000); // 5 chiffres
      const code = `EG-${codeNum}`;
      const conflict = await prisma.user.findUnique({ where: { egotoId: code } });
      if (!conflict) {
        egotoId = code;
        break;
      }
      attempts++;
    }
    if (!egotoId) {
      egotoId = `EG-${Math.floor(10000 + Math.random() * 90000)}`;
    }

    const user = await prisma.user.create({
      data: {
        phone,
        pinHash,
        firstName,
        lastName,
        language,
        egotoId,
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
        egotoId: true,
        email: true,
        cniNumber: true,
        passportNumber: true,
        isVerified: true,
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
        egotoId: user.egotoId,
        email: user.email,
        cniNumber: user.cniNumber,
        passportNumber: user.passportNumber,
        isVerified: user.isVerified,
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
        egotoId: true,
        email: true,
        cniNumber: true,
        passportNumber: true,
        isVerified: true,
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
        egotoId: true,
        email: true,
        cniNumber: true,
        passportNumber: true,
        isVerified: true,
      },
    });
  }

  /**
   * Soumet les documents de sécurité (Email, CNI ou Passeport)
   * pour passer en profil vérifié / sécurité renforcée.
   */
  async verifyIdentity(
    userId: string,
    data: { email?: string; cniNumber?: string; passportNumber?: string }
  ) {
    const updateData: Record<string, any> = {
      isVerified: true, // Passe automatiquement à vérifié dès soumission
    };
    if (data.email) updateData.email = data.email;
    if (data.cniNumber) updateData.cniNumber = data.cniNumber;
    if (data.passportNumber) updateData.passportNumber = data.passportNumber;

    return prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        phone: true,
        firstName: true,
        lastName: true,
        language: true,
        egotoId: true,
        email: true,
        cniNumber: true,
        passportNumber: true,
        isVerified: true,
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
