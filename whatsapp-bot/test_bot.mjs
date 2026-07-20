// ═══════════════════════════════════════════════════════════════
// WhatsApp Bot — Simulateur de conversation de bout en bout
// ═══════════════════════════════════════════════════════════════
// Ce script teste l'Étape 4 (onboarding + cercles) et l'Étape 5
// (bol d'épargne + score + carte Visa) du bot WhatsApp.
// ═══════════════════════════════════════════════════════════════

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const BOT_URL = "http://localhost:3001/simulate";
const PHONE = "+22899000001";

async function send(body) {
  console.log(`👤 User: "${body}"`);
  const res = await fetch(BOT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: PHONE, body }),
  });
  const data = await res.json();
  console.log(`🤖 Bot:\n-------------------------------------------------\n${data.reply}\n-------------------------------------------------\n`);
  return data;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log("═══════════════════════════════════════");
  console.log("  NETTOYAGE DE LA BASE DE DONNÉES...");
  console.log("═══════════════════════════════════════");
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" CASCADE;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Circle" CASCADE;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "PaymentIntent" CASCADE;`);
  
  // Réinitialiser la session du bot
  await fetch("http://localhost:3001/simulate/reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: PHONE }),
  });
  console.log("Database & Session cleaned! ✨\n");

  console.log("═══════════════════════════════════════");
  console.log("  SIMULATION DU BOT WHATSAPP");
  console.log("═══════════════════════════════════════\n");

  // 1. Démarrer
  await send("Hello Egoto!");

  // 2. Choisir Français
  await send("1");

  // 3. Entrer le numéro
  await send(PHONE);

  // 4. Inscription : Prénom
  await send("Kofi");

  // 5. Inscription : Nom
  await send("Mensah");

  // 6. Inscription : PIN
  await send("1234");

  // 7. Menu principal : Choisir "3" (Créer un cercle)
  await send("3");

  // 8. Création cercle : Nom
  await send("Tontine Marché Adawlato");

  // 9. Création cercle : Montant
  await send("10000");

  // 10. Création cercle : Fréquence (Hebdomadaire)
  await send("1");

  // 11. Création cercle : Max membres
  await send("5");

  // 12. Menu cercles : Retourner au menu principal
  await send("0");

  // 13. Menu principal : Choisir "2" (Cotiser)
  await send("2");

  // 14. Cotiser : Choisir le premier cercle (Tontine Marché Adawlato)
  const contRes = await send("1");

  // 15. Attendre la confirmation automatique du paiement (SimulatedPaymentProvider)
  console.log("⏳ Attente de 3.5 secondes pour la confirmation du paiement...");
  await sleep(3500);

  // 16. Menu principal : Choisir "5" (Mon score)
  // Devrait afficher 15 points car cotisation payée
  await send("5");

  // 17. Retour au menu principal
  await send("0");

  // 18. Menu principal : Choisir "4" (Menu Bols d'épargne)
  await send("4");

  // 19. Menu bols : Choisir "2" (Créer un bol)
  await send("2");

  // 20. Créer bol : Nom
  await send("Épargne Moto");

  // 21. Créer bol : Objectif
  await send("150000");

  // 22. Créer bol : Mode libre
  await send("1");

  // 23. Créer bol : Non verrouillé
  await send("2");

  // 24. Menu bols : Choisir "3" (Cotiser à un bol)
  await send("3");

  // 25. Cotiser bol : Choisir le bol 1
  await send("1");

  // 26. Cotiser bol : Montant
  await send("15000");

  // 27. Attendre la confirmation automatique de la cotisation bol
  console.log("⏳ Attente de 3.5 secondes pour la confirmation de la cotisation bol...");
  await sleep(3500);

  // 28. Retourner au menu principal
  await send("0");

  // 29. Menu principal : Choisir "4" (Menu Bols d'épargne)
  await send("4");

  // 30. Menu bols : Choisir "1" (Voir mes bols d'épargne)
  // Devrait afficher 15000/150000 FCFA (10%)
  await send("1");

  // 31. Retourner au menu principal
  await send("0");

  // 32. Menu principal : Choisir "6" (Menu Carte Visa Egoto)
  await send("6");

  // 33. Menu cartes : Choisir "2" (Commander une carte)
  await send("2");

  // 34. Commander : Choisir "1" (Virtuelle)
  // Devrait être rejeté car score = 30 (< 200)
  await send("1");

  // 35. Injecter des points en base pour tester l'éligibilité de Kofi (score 250)
  console.log("⚡ Injection directe de score en base : score = 250 (tier standard)...");
  await prisma.egotoScore.updateMany({
    where: { user: { phone: PHONE } },
    data: { score: 250, tier: "standard" },
  });

  // 36. Recommencer la demande : Menu principal -> Option 6 (Ma carte)
  await send("0");
  await send("6");
  await send("2"); // Commander
  await send("1"); // Virtuelle (devrait réussir maintenant)

  // 37. Activer la carte virtuelle
  await send("3");

  // 38. Consulter les cartes
  await send("1");

  // 39. Bloquer la carte
  await send("4");

  // 40. Consulter à nouveau pour vérifier le statut "Bloqué"
  await send("1");

  // 41. Retour au menu principal pour clore la démo
  await send("0");

  console.log("═══════════════════════════════════════");
  console.log("  SIMULATION DU BOT WHATSAPP TERMINÉE avec succès !");
  console.log("═══════════════════════════════════════");

  await prisma.$disconnect();
}

run().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
});
