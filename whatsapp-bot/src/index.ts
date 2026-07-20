import express from "express";
import dotenv from "dotenv";
import { getOrCreateSession, clearSession } from "./session";
import { handleBotMessage } from "./bot";
import twilio from "twilio";

// ─── Chargement .env ─────────────────────────────────────
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MessagingResponse = twilio.twiml.MessagingResponse;

// ─── Webhook Twilio WhatsApp Sandbox ─────────────────────
// Appelé par Twilio lorsqu'un utilisateur envoie un message
app.post("/webhook", async (req, res) => {
  const from = req.body.From; // ex: "whatsapp:+22890123456"
  const body = req.body.Body; // texte du message

  if (!from || !body) {
    res.status(400).send("Missing From or Body");
    return;
  }

  // Nettoyage de l'identifiant pour ne garder que le numéro E.164
  const phone = from.replace("whatsapp:", "");

  // Récupérer la session
  const session = getOrCreateSession(phone);

  try {
    // Calculer la réponse du bot
    const reply = await handleBotMessage(session, body);

    // Formater la réponse TwiML (requis par Twilio)
    const twiml = new MessagingResponse();
    twiml.message(reply);

    res.type("text/xml");
    res.send(twiml.toString());
  } catch (error) {
    console.error("🔥 Error in bot webhook:", error);
    const twiml = new MessagingResponse();
    twiml.message("Une erreur temporaire est survenue. Tape *0* pour revenir au menu.");
    res.type("text/xml");
    res.send(twiml.toString());
  }
});

// ─── Endpoint de simulation locale (facilite la démo) ────
// Permet de tester le bot en simulant des messages WhatsApp.
// Exemple : POST http://localhost:3001/simulate { phone: "+22890000001", body: "1" }
app.post("/simulate", async (req, res) => {
  const { phone, body } = req.body;

  if (!phone || !body) {
    res.status(400).json({ success: false, error: "Missing phone or body" });
    return;
  }

  const session = getOrCreateSession(phone);

  try {
    const reply = await handleBotMessage(session, body);
    res.json({
      success: true,
      currentStep: session.step,
      reply,
      session: {
        phone: session.phone,
        language: session.language,
        step: session.step,
        hasToken: !!session.token,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── Endpoint de déconnexion / reset ─────────────────────
app.post("/simulate/reset", (req, res) => {
  const { phone } = req.body;
  if (phone) {
    clearSession(phone);
  }
  res.json({ success: true, message: `Session reset for ${phone}` });
});

// ─── Démarrage ───────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🌿 Egoto WhatsApp Bot en écoute sur le port ${PORT}`);
  console.log(`   Webhook Twilio : http://localhost:${PORT}/webhook`);
  console.log(`   Simulateur local : http://localhost:${PORT}/simulate`);
});
