import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const BASE = "http://localhost:3000/api";

async function api(method, path, body, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  return { status: res.status, data };
}

function log(label, result) {
  const icon = result.data.success ? "✅" : "❌";
  console.log(`\n${icon} ${label} [${result.status}]`);
  console.log(JSON.stringify(result.data, null, 2));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log("═══════════════════════════════════════");
  console.log("  EGOTO API — CLEANING DATABASE...");
  console.log("═══════════════════════════════════════");

  // Vider les tables proprement via CASCADE
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" CASCADE;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Circle" CASCADE;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "PaymentIntent" CASCADE;`);
  console.log("Database cleaned. ✨\n");

  // ─── AUTH & SETUP ──────────────────────────────
  const r1 = await api("POST", "/auth/register", {
    phone: "+22890000001", pin: "1234", firstName: "Kofi", lastName: "Mensah"
  });
  const token1 = r1.data.data.token;
  const user1Id = r1.data.data.user.id;

  // ─── ÉTAPE 3 : BOLS D'ÉPARGNE ───────────────────
  console.log("\n═══════════════════════════════════════");
  console.log("  TESTS ÉTAPE 3 — BOLS D'ÉPARGNE");
  console.log("═══════════════════════════════════════");

  // 1. Créer un bol libre non verrouillé (ex: pour stock de marchandise)
  const pot1 = await api("POST", "/savings", {
    name: "Stock de pagnes",
    targetAmount: 50000,
    mode: "free",
    isLocked: false
  }, token1);
  log("Create Savings Pot 1 (free, unlocked)", pot1);
  const pot1Id = pot1.data.data.id;

  // 2. Créer un bol fixe verrouillé (ex: scolarité)
  const pot2 = await api("POST", "/savings", {
    name: "Scolarité enfants",
    targetAmount: 100000,
    mode: "fixed",
    frequency: "weekly",
    fixedAmount: 10000,
    isLocked: true
  }, token1);
  log("Create Savings Pot 2 (fixed, locked)", pot2);
  const pot2Id = pot2.data.data.id;

  // 3. Lister les bols
  const listPots = await api("GET", "/savings", null, token1);
  log("List Savings Pots", listPots);

  // 4. Cotiser à un bol d'épargne (10 000 FCFA dans le Pot 1)
  const cPot = await api("POST", `/contributions/pot/${pot1Id}`, { amount: 10000 }, token1);
  log("Contribute to Pot 1 (initiated)", cPot);

  // Attendre 3.5s pour la confirmation automatique
  console.log("\n⏳ Attente de 3.5 secondes pour la confirmation de la cotisation...");
  await sleep(3500);

  // Vérifier le bol après cotisation
  const potDetail = await api("GET", `/savings/${pot1Id}`, null, token1);
  log("Verify Pot currentAmount and contributions after confirmation", potDetail);

  // 5. Tester le retrait sur Pot 1 (unlocked -> devrait fonctionner)
  const withdrawPot1 = await api("POST", `/savings/${pot1Id}/withdraw`, null, token1);
  log("Withdraw from unlocked Pot 1 (success expected)", withdrawPot1);

  // Vérifier le solde du Pot 1 à 0 et statut withdrawn
  const potDetailAfterWithdraw = await api("GET", `/savings/${pot1Id}`, null, token1);
  log("Verify Pot 1 is now withdrawn and empty", potDetailAfterWithdraw);

  // 6. Tester le retrait sur Pot 2 (verrouillé et solde = 0 -> devrait échouer)
  const withdrawPot2Failed = await api("POST", `/savings/${pot2Id}/withdraw`, null, token1);
  log("Withdraw from locked empty Pot 2 (should fail)", withdrawPot2Failed);

  // Cotiser 100 000 FCFA pour remplir le Pot 2 et le compléter
  const cPot2 = await api("POST", `/contributions/pot/${pot2Id}`, { amount: 100000 }, token1);
  console.log("\n⏳ Attente de 3.5 secondes pour la confirmation de la cotisation Pot 2...");
  await sleep(3500);

  // Vérifier que le statut est complété
  const pot2Detail = await api("GET", `/savings/${pot2Id}`, null, token1);
  log("Verify Pot 2 is now completed (currentAmount >= targetAmount)", pot2Detail);

  // Retirer de Pot 2 (verrouillé mais complété -> devrait fonctionner)
  const withdrawPot2Success = await api("POST", `/savings/${pot2Id}/withdraw`, null, token1);
  log("Withdraw from completed locked Pot 2 (success expected)", withdrawPot2Success);


  // ─── ÉTAPE 3 : CARTES ────────────────────────────
  console.log("\n═══════════════════════════════════════");
  console.log("  TESTS ÉTAPE 3 — CARTES VISA EGOTO");
  console.log("═══════════════════════════════════════");

  // Vérifier le score actuel (il devrait être à 30 : 2 cotisations de +15 points chacun)
  const currentScore = await api("GET", "/score", null, token1);
  console.log(`Current Egoto Score: ${currentScore.data.data.score}`);

  // 1. Demander une carte virtuelle (score de 30 < 200 -> devrait échouer)
  const cardVirtualFail = await api("POST", "/cards", { type: "virtual" }, token1);
  log("Request Virtual Card with score < 200 (should fail)", cardVirtualFail);

  // 2. Forcer le score à 250 en base via prisma pour tester la carte Standard virtuelle
  console.log("\n⚡ Injection de points pour monter le score à 250...");
  await prisma.egotoScore.update({
    where: { userId: user1Id },
    data: { score: 250, tier: "standard" }
  });

  // Demander la carte virtuelle (score 250 >= 200 -> devrait fonctionner, tier standard)
  const cardVirtualSuccess = await api("POST", "/cards", { type: "virtual" }, token1);
  log("Request Virtual Card with score 250 (success expected)", cardVirtualSuccess);
  const cardId = cardVirtualSuccess.data.data.id;

  // 3. Activer la carte virtuelle
  const cardActivate = await api("POST", `/cards/${cardId}/activate`, null, token1);
  log("Activate card", cardActivate);

  // 4. Bloquer la carte
  const cardBlock = await api("POST", `/cards/${cardId}/block`, null, token1);
  log("Block card", cardBlock);

  // 5. Débloquer la carte
  const cardUnblock = await api("POST", `/cards/${cardId}/unblock`, null, token1);
  log("Unblock card", cardUnblock);

  // 6. Demander une carte physique (score 250 < 500 -> devrait échouer)
  const cardPhysicalFail = await api("POST", "/cards", { type: "physical" }, token1);
  log("Request Physical Card with score 250 (should fail)", cardPhysicalFail);

  // 7. Forcer le score à 650 pour tester la carte Gold physique
  console.log("\n⚡ Injection de points pour monter le score à 650...");
  await prisma.egotoScore.update({
    where: { userId: user1Id },
    data: { score: 650, tier: "gold" }
  });

  // Demander la carte physique (score 650 >= 500 & 600+ -> devrait fonctionner, tier gold)
  const cardGoldSuccess = await api("POST", "/cards", { type: "physical" }, token1);
  log("Request Physical Card with score 650 (success expected, Gold tier)", cardGoldSuccess);

  // Lister les cartes de l'utilisateur
  const cardList = await api("GET", "/cards", null, token1);
  log("List my cards (should see 2 cards)", cardList);

  console.log("\n═══════════════════════════════════════");
  console.log("  TESTS ÉTAPE 3 TERMINÉS");
  console.log("═══════════════════════════════════════");

  await prisma.$disconnect();
}

run().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
});
