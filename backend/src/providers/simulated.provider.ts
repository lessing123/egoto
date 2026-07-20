import {
  PaymentProvider,
  InitiatePaymentParams,
  InitiatePaymentResult,
  ConfirmationCallback,
} from "./payment.provider";

// ═══════════════════════════════════════════════════════════════
// SimulatedPaymentProvider
// ═══════════════════════════════════════════════════════════════
// Simule le comportement d'un agrégateur de paiement :
// 1. initiatePayment() → retourne immédiatement (comme un vrai API call)
// 2. Après 2-3 secondes, appelle le callback de confirmation
//    (simule le webhook que CinetPay/PawaPay enverrait)
//
// Le Score Egoto ne se met à jour qu'APRÈS cette confirmation.
// ═══════════════════════════════════════════════════════════════

export class SimulatedPaymentProvider implements PaymentProvider {
  readonly name = "simulated";

  private onConfirmation: ConfirmationCallback;

  constructor(onConfirmation: ConfirmationCallback) {
    this.onConfirmation = onConfirmation;
  }

  async initiatePayment(
    params: InitiatePaymentParams
  ): Promise<InitiatePaymentResult> {
    // Génère une référence externe comme le ferait un vrai agrégateur
    const externalRef = `SIM-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    console.log(
      `💳 [Simulated] Paiement initié : ${params.amount} FCFA → ${params.phone} (ref: ${externalRef})`
    );

    // Simule le délai de confirmation de l'opérateur (2-3 secondes)
    const delay = 2000 + Math.random() * 1000;

    setTimeout(async () => {
      try {
        console.log(
          `✅ [Simulated] Webhook de confirmation reçu (ref: ${externalRef})`
        );
        await this.onConfirmation(
          params.paymentIntentId,
          externalRef,
          "confirmed"
        );
      } catch (error) {
        console.error(
          `🔥 [Simulated] Erreur lors de la confirmation :`,
          error
        );
      }
    }, delay);

    return {
      externalRef,
      providerStatus: "pending",
    };
  }
}
