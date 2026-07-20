import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/errorHandler";
import { notificationService } from "./notification.service";

export class CircleService {
  /**
   * Génère un code d'invitation unique de 5 caractères alphanumériques (A-Z, 0-9)
   */
  private async generateUniqueInviteCode(): Promise<string> {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let isUnique = false;
    let code = "";
    while (!isUnique) {
      code = "";
      for (let i = 0; i < 5; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      const existing = await prisma.circle.findUnique({
        where: { inviteCode: code },
      });
      if (!existing) {
        isUnique = true;
      }
    }
    return code;
  }

  /**
   * Crée un cercle de tontine.
   * Le créateur devient automatiquement admin en position 1.
   * Il reçoit une notification de création par SMS/WhatsApp.
   */
  async create(
    userId: string,
    data: {
      name: string;
      amount: number;
      frequency: string;
      maxMembers: number;
    }
  ) {
    const inviteCode = await this.generateUniqueInviteCode();

    const circle = await prisma.circle.create({
      data: {
        name: data.name,
        amount: data.amount,
        frequency: data.frequency,
        maxMembers: data.maxMembers,
        createdById: userId,
        inviteCode,
        members: {
          create: {
            userId,
            position: 1,
            role: "admin",
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                phone: true,
                language: true,
              },
            },
          },
        },
        _count: { select: { members: true } },
      },
    });

    // Envoyer la notification de création au créateur
    const creator = circle.members[0].user;
    await notificationService.notifyInvitation(
      creator.phone,
      circle.name,
      "admin",
      inviteCode,
      creator.language
    );

    return circle;
  }

  /**
   * Liste tous les cercles auxquels l'utilisateur participe.
   */
  async listByUser(userId: string) {
    return prisma.circle.findMany({
      where: {
        members: { some: { userId } },
      },
      include: {
        members: {
          include: {
            user: {
              select: { id: true, firstName: true, lastName: true },
            },
          },
          orderBy: { position: "asc" },
        },
        _count: { select: { members: true, contributions: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Récupère le détail complet d'un cercle
   */
  async getById(circleId: string) {
    const circle = await prisma.circle.findUnique({
      where: { id: circleId },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                phone: true,
              },
            },
          },
          orderBy: { position: "asc" },
        },
        contributions: {
          orderBy: { createdAt: "desc" },
          take: 20,
          include: {
            user: {
              select: { id: true, firstName: true, lastName: true },
            },
          },
        },
        _count: { select: { members: true, contributions: true } },
      },
    });

    if (!circle) {
      throw new AppError(404, "CIRCLE_NOT_FOUND");
    }

    return circle;
  }

  /**
   * Rejoindre un cercle existant (par ID).
   * Si complet, notifie tous les membres que la tontine démarre !
   */
  async join(userId: string, circleId: string) {
    const circle = await prisma.circle.findUnique({
      where: { id: circleId },
      include: {
        _count: { select: { members: true } },
        members: { select: { userId: true } },
      },
    });

    if (!circle) {
      throw new AppError(404, "CIRCLE_NOT_FOUND");
    }

    if (circle.status !== "active") {
      throw new AppError(400, "CIRCLE_NOT_ACTIVE");
    }

    if (circle._count.members >= circle.maxMembers) {
      throw new AppError(400, "CIRCLE_FULL");
    }

    const alreadyMember = circle.members.some((m) => m.userId === userId);
    if (alreadyMember) {
      throw new AppError(409, "ALREADY_MEMBER");
    }

    const nextPosition = circle._count.members + 1;

    const member = await prisma.circleMember.create({
      data: {
        userId,
        circleId,
        position: nextPosition,
        role: "member",
      },
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, phone: true, language: true },
        },
        circle: {
          select: { id: true, name: true, amount: true, frequency: true, maxMembers: true, inviteCode: true },
        },
      },
    });

    // Envoyer la notification au nouveau membre
    await notificationService.notifyInvitation(
      member.user.phone,
      member.circle.name,
      "member",
      member.circle.inviteCode || "",
      member.user.language
    );

    // Vérifier si le cercle est maintenant complet
    const updatedCircle = await prisma.circle.findUnique({
      where: { id: circleId },
      include: {
        members: {
          include: {
            user: { select: { phone: true, language: true } },
          },
        },
      },
    });

    if (updatedCircle && updatedCircle.members.length === updatedCircle.maxMembers) {
      console.log(`🎉 La tontine "${updatedCircle.name}" est complète ! Démarrage automatique.`);
      for (const m of updatedCircle.members) {
        await notificationService.notifyTontineStart(
          m.user.phone,
          updatedCircle.name,
          m.user.language
        );
      }
    }

    return member;
  }

  /**
   * Rejoindre un cercle via son code d'invitation à 5 caractères.
   */
  async joinByCode(userId: string, inviteCode: string) {
    const uppercaseCode = inviteCode.toUpperCase().trim();
    const circle = await prisma.circle.findUnique({
      where: { inviteCode: uppercaseCode },
    });

    if (!circle) {
      throw new AppError(404, "CIRCLE_NOT_FOUND");
    }

    return this.join(userId, circle.id);
  }

  /**
   * Inviter un autre utilisateur directement par son numéro.
   * Admin requis.
   */
  async inviteByPhone(adminUserId: string, circleId: string, inviteePhone: string) {
    // 1. Vérifier que le cercle existe et obtenir les infos admin
    const circle = await prisma.circle.findUnique({
      where: { id: circleId },
      include: {
        members: {
          where: { userId: adminUserId },
          select: { role: true },
        },
        _count: { select: { members: true } },
      },
    });

    if (!circle) {
      throw new AppError(404, "CIRCLE_NOT_FOUND");
    }

    // 2. Vérifier que le demandeur est admin
    const adminMember = circle.members[0];
    if (!adminMember || adminMember.role !== "admin") {
      throw new AppError(403, "NOT_AN_ADMIN");
    }

    // 3. Trouver l'utilisateur invité par téléphone
    const cleanedPhone = inviteePhone.replace(/\s+/g, "");
    const invitee = await prisma.user.findUnique({
      where: { phone: cleanedPhone },
    });

    if (!invitee) {
      throw new AppError(404, "USER_NOT_FOUND");
    }

    // 4. Procéder à l'ajout via la méthode join standard
    return this.join(invitee.id, circleId);
  }

  /**
   * Met à jour les détails d'un cercle (Admin uniquement).
   * Notifie les autres membres par SMS & WhatsApp des changements.
   */
  async updateCircle(
    adminUserId: string,
    circleId: string,
    data: { name?: string; amount?: number; frequency?: string }
  ) {
    const circle = await prisma.circle.findUnique({
      where: { id: circleId },
      include: {
        members: {
          include: {
            user: { select: { id: true, phone: true, language: true } },
          },
        },
      },
    });

    if (!circle) {
      throw new AppError(404, "CIRCLE_NOT_FOUND");
    }

    // Vérifier les droits admin
    const adminMember = circle.members.find((m) => m.userId === adminUserId);
    if (!adminMember || adminMember.role !== "admin") {
      throw new AppError(403, "NOT_AN_ADMIN");
    }

    // Mettre à jour le cercle
    const updated = await prisma.circle.update({
      where: { id: circleId },
      data: {
        name: data.name ?? undefined,
        amount: data.amount ?? undefined,
        frequency: data.frequency ?? undefined,
      },
    });

    // Préparer le message d'alerte de changement
    const changes: string[] = [];
    if (data.name) changes.push(`Nouveau nom : ${data.name}`);
    if (data.amount) changes.push(`Nouveau montant : ${data.amount} FCFA`);
    if (data.frequency) changes.push(`Nouvelle fréquence : ${data.frequency}`);
    const details = changes.join(", ");

    // Notifier tous les membres sauf l'admin
    const otherMembers = circle.members.filter((m) => m.userId !== adminUserId);
    for (const m of otherMembers) {
      await notificationService.notifyCircleUpdate(
        m.user.phone,
        updated.name,
        details,
        m.user.language
      );
    }

    return updated;
  }

  /**
   * Liste les membres d'un cercle
   */
  async getMembers(circleId: string) {
    const circle = await prisma.circle.findUnique({
      where: { id: circleId },
    });
    if (!circle) {
      throw new AppError(404, "CIRCLE_NOT_FOUND");
    }

    return prisma.circleMember.findMany({
      where: { circleId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
      },
      orderBy: { position: "asc" },
    });
  }
}
