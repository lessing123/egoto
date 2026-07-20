import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import circleRoutes from "./routes/circles";
import contributionRoutes from "./routes/contributions";
import paymentRoutes from "./routes/payments";
import scoreRoutes from "./routes/score";
import savingsRoutes from "./routes/savings";
import cardRoutes from "./routes/cards";
import { errorHandler } from "./middleware/errorHandler";

// ─── Chargement .env ─────────────────────────────────────
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware globaux ──────────────────────────────────
app.use(
  cors({
    origin: "*", // En prod, restreindre aux domaines autorisés
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// ─── Health check ────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "egoto-api",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// ─── Routes ──────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/circles", circleRoutes);
app.use("/api/contributions", contributionRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/score", scoreRoutes);
app.use("/api/savings", savingsRoutes);
app.use("/api/cards", cardRoutes);

// ─── Gestion d'erreurs (doit être le dernier middleware) ─
app.use(errorHandler);

// ─── Démarrage ───────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🌿 Egoto API en écoute sur le port ${PORT}`);
  console.log(`   Health check : http://localhost:${PORT}/api/health`);
});

export default app;
