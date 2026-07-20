// ═══════════════════════════════════════════════════════════════
// PaymentProvider — Interface abstraite
// ═══════════════════════════════════════════════════════════════
// Architecure pensée pour un agrégateur (CinetPay, PawaPay) comme
// SEULE source de vérité pour confirmer un paiement.
//
// Pour le MVP : SimulatedPaymentProvider (auto-confirme après 2-3s)
// En production : remplacer par CinetPayProvider ou PawaPay sans
// toucher au reste du code.
// ═══════════════════════════════════════════════════════════════

export interface InitiatePaymentParams {
  /** ID du PaymentIntent côté Egoto */
  paymentIntentId: string;
  /** Montant en FCFA */
  amount: number;
  /** Numéro de téléphone au format E.164 */
  phone: string;
}

export interface InitiatePaymentResult {
  /** Référence externe côté agrégateur */
  externalRef: string;
  /** Statut initial retourné par le provider */
  providerStatus: "pending" | "initiated";
}

/**
 * Callback appelé quand le provider confirme (ou échoue) un paiement.
 * C'est PaymentService qui fournit cette fonction.
 */
export type ConfirmationCallback = (
  paymentIntentId: string,
  externalRef: string,
  status: "confirmed" | "failed"
) => Promise<void>;

/**
 * Interface que tout provider de paiement doit implémenter.
 * La version simulée et les vrais agrégateurs partagent cette interface.
 */
export interface PaymentProvider {
  readonly name: string;

  /**
   * Lance un paiement vers l'opérateur (T-Money, Flooz...).
   * Ne confirme PAS le paiement — la confirmation vient toujours
   * du webhook (ou du callback pour la simulation).
   */
  initiatePayment(params: InitiatePaymentParams): Promise<InitiatePaymentResult>;
}
