// ═══════════════════════════════════════════════════════════════
// Egoto API — Service de Notifications (SMS & WhatsApp)
// ═══════════════════════════════════════════════════════════════
// Permet d'émettre des notifications unifiées bilingues aux utilisateurs.
// En MVP, ces notifications sont simulées en console de façon
// visuelle avec une bordure de toute beauté, prêtes pour Twilio/opérateurs.
// ═══════════════════════════════════════════════════════════════

export class NotificationService {
  /**
   * Simule l'envoi d'un message par SMS et WhatsApp
   */
  async sendSMSAndWhatsApp(phone: string, message: string): Promise<void> {
    const border = "═".repeat(60);
    console.log(`
╔${border}╗
║ ⚡ Egoto Notifications (SMS & WhatsApp)
╠${border}╣
║ 👤 Destinataire : ${phone}
║ 📝 Message :
║   "${message}"
╚${border}╝
`);
  }

  /**
   * Notification d'invitation directe à un cercle
   */
  async notifyInvitation(
    phone: string,
    circleName: string,
    role: string,
    inviteCode: string,
    language: string
  ): Promise<void> {
    const msg = language === "en"
      ? `Hello! You have been added to the tontine circle "${circleName}" as a ${role}. Invite Code: ${inviteCode}. Dial *145# or join on WhatsApp/App!`
      : `Salut! Tu as été ajouté au cercle de tontine "${circleName}" avec le rôle ${role === "admin" ? "administrateur" : "membre"}. Code d'invitation : ${inviteCode}. Compose le *145# ou rejoins sur WhatsApp/App !`;
      
    await this.sendSMSAndWhatsApp(phone, msg);
  }

  /**
   * Notification de modification des détails du cercle
   */
  async notifyCircleUpdate(
    phone: string,
    circleName: string,
    details: string,
    language: string
  ): Promise<void> {
    const msg = language === "en"
      ? `Alert: The tontine "${circleName}" has been updated by the administrator: ${details}.`
      : `Alerte : La tontine "${circleName}" a été modifiée par l'administrateur : ${details}.`;

    await this.sendSMSAndWhatsApp(phone, msg);
  }

  /**
   * Notification de démarrage de la tontine
   */
  async notifyTontineStart(
    phone: string,
    circleName: string,
    language: string
  ): Promise<void> {
    const msg = language === "en"
      ? `Egoto: Great news! The tontine "${circleName}" is now full and has started! You can now make your first contribution.`
      : `Egoto : Excellente nouvelle ! La tontine "${circleName}" est maintenant complète et vient de démarrer ! Vous pouvez dès à présent effectuer votre premier dépôt.`;

    await this.sendSMSAndWhatsApp(phone, msg);
  }

  /**
   * Notification de versement reçu (cagnotte payout)
   */
  async notifyPayoutReceived(
    phone: string,
    circleName: string,
    amount: number,
    cycle: number,
    language: string
  ): Promise<void> {
    const msg = language === "en"
      ? `Egoto: Payout Confirmed! You have received the payout of ${amount} FCFA for cycle ${cycle} of tontine "${circleName}". Thank you for your trust!`
      : `Egoto : Cagnotte reçue ! Vous avez reçu le versement de ${amount} FCFA pour le cycle ${cycle} de la tontine "${circleName}". Merci pour votre confiance !`;

    await this.sendSMSAndWhatsApp(phone, msg);
  }
}

export const notificationService = new NotificationService();
