import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

/**
 * Hash un PIN à 4 chiffres avec bcrypt.
 * Le PIN n'est JAMAIS stocké en clair dans la base.
 */
export async function hashPin(pin: string): Promise<string> {
  return bcrypt.hash(pin, SALT_ROUNDS);
}

/**
 * Compare un PIN en clair avec son hash bcrypt.
 */
export async function comparePin(
  pin: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(pin, hash);
}
