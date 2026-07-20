// Extension du type Express Request pour inclure l'utilisateur authentifié
declare namespace Express {
  interface Request {
    user?: {
      id: string;
      phone: string;
    };
  }
}
