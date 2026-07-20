/**
 * Valide un numéro de téléphone togolais au format E.164.
 * Accepte : +228 suivi de 8 chiffres (ex: +22890123456)
 */
export function validatePhone(phone: string): boolean {
  return /^\+228\d{8}$/.test(phone);
}

/**
 * Valide un PIN : exactement 4 chiffres.
 */
export function validatePin(pin: string): boolean {
  return /^\d{4}$/.test(pin);
}

/**
 * Valide une fréquence de cotisation.
 */
export function validateFrequency(frequency: string): boolean {
  return ["weekly", "biweekly", "monthly"].includes(frequency);
}

/**
 * Valide un montant en FCFA : entier positif.
 */
export function validateAmount(amount: number): boolean {
  return Number.isInteger(amount) && amount > 0;
}
