import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Début du seed des données d'Egoto...");

  // Vider les tables existantes
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" CASCADE;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Circle" CASCADE;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "PaymentIntent" CASCADE;`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Transaction" CASCADE;`);
  
  const hashedPin = await bcrypt.hash("1234", 10);

  // 1. Création de Kofi Mensah (Standard Tier)
  console.log("👤 Création de Kofi Mensah (+22890123456)...");
  const kofi = await prisma.user.create({
    data: {
      phone: "+22890123456",
      pinHash: hashedPin,
      firstName: "Kofi",
      lastName: "Mensah",
      language: "fr",
      egotoId: "EG-90123",
      score: {
        create: {
          score: 250,
          tier: "standard",
        },
      },
    },
  });

  // Ajouter des événements de score pour Kofi
  await prisma.scoreEvent.createMany({
    data: [
      { userId: kofi.id, type: "contribution_ontime", points: 15, description: "Première cotisation tontine" },
      { userId: kofi.id, type: "contribution_ontime", points: 15, description: "Deuxième cotisation tontine" },
      { userId: kofi.id, type: "pot_goal", points: 30, description: "Objectif bol atteint" },
      { userId: kofi.id, type: "contribution_ontime", points: 15, description: "Troisième cotisation tontine" },
      // Bonus initial de bienvenue pour le test
      { userId: kofi.id, type: "cycle_complete", points: 175, description: "Bonus d'inscription active" },
    ],
  });

  // 2. Création de Ama Adjo (Gold Tier - Vérifié)
  console.log("👤 Création de Ama Adjo (+22891234567)...");
  const ama = await prisma.user.create({
    data: {
      phone: "+22891234567",
      pinHash: hashedPin,
      firstName: "Ama",
      lastName: "Adjo",
      language: "fr",
      egotoId: "EG-91234",
      email: "ama.adjo@gmail.com",
      cniNumber: "CNI-TG-8291",
      isVerified: true,
      score: {
        create: {
          score: 650,
          tier: "gold",
        },
      },
    },
  });

  // Événements de score pour Ama
  await prisma.scoreEvent.createMany({
    data: [
      { userId: ama.id, type: "contribution_ontime", points: 15, description: "Cotisation payée" },
      { userId: ama.id, type: "pot_goal", points: 30, description: "Bol de commerce complété" },
      { userId: ama.id, type: "cycle_complete", points: 50, description: "Cycle de tontine complété" },
      { userId: ama.id, type: "cycle_complete", points: 50, description: "Deuxième cycle complété" },
      { userId: ama.id, type: "cycle_complete", points: 505, description: "Bonus tontine historique" },
    ],
  });

  // 3. Cartes Visa
  console.log("💳 Attribution des cartes Visa...");
  // Kofi : Carte virtuelle Standard
  await prisma.card.create({
    data: {
      userId: kofi.id,
      type: "virtual",
      tier: "standard",
      lastFour: "4821",
      status: "active",
    },
  });

  // Ama : Carte physique Gold
  await prisma.card.create({
    data: {
      userId: ama.id,
      type: "physical",
      tier: "gold",
      lastFour: "9952",
      status: "active",
    },
  });

  // 4. Bols d'épargne
  console.log("🍯 Création des bols d'épargne...");
  // Kofi : Épargne pagnes à moitié remplie
  const potKofi = await prisma.savingsPot.create({
    data: {
      userId: kofi.id,
      name: "Achat stock pagnes",
      targetAmount: 100000,
      currentAmount: 35000,
      mode: "free",
      isLocked: false,
      status: "active",
    },
  });

  // Contribution liée pour Kofi
  await prisma.contribution.create({
    data: {
      userId: kofi.id,
      savingsPotId: potKofi.id,
      amount: 35000,
      status: "confirmed",
      confirmedAt: new Date(),
    },
  });

  // Ama : Scolarité complétée et verrouillée
  const potAma = await prisma.savingsPot.create({
    data: {
      userId: ama.id,
      name: "Scolarité enfants",
      targetAmount: 250000,
      currentAmount: 250000,
      mode: "fixed",
      frequency: "monthly",
      fixedAmount: 50000,
      isLocked: true,
      status: "completed",
    },
  });

  // Contribution liée pour Ama
  await prisma.contribution.create({
    data: {
      userId: ama.id,
      savingsPotId: potAma.id,
      amount: 250000,
      status: "confirmed",
      confirmedAt: new Date(),
    },
  });

  // 5. Cercles de Tontine
  console.log("👥 Création des cercles de tontine...");
  const circle = await prisma.circle.create({
    data: {
      name: "Tontine Marché Adawlato",
      amount: 15000,
      frequency: "weekly",
      maxMembers: 5,
      currentCycle: 1,
      status: "active",
      createdById: kofi.id,
      inviteCode: "ADAW1",
    },
  });

  // Ajouter Kofi (Admin - position 1) et Ama (Membre - position 2)
  await prisma.circleMember.createMany({
    data: [
      { userId: kofi.id, circleId: circle.id, position: 1, role: "admin" },
      { userId: ama.id, circleId: circle.id, position: 2, role: "member" },
    ],
  });

  // Ajouter des cotisations dans la tontine
  await prisma.contribution.createMany({
    data: [
      { userId: kofi.id, circleId: circle.id, amount: 15000, cycle: 1, status: "confirmed", confirmedAt: new Date() },
      { userId: ama.id, circleId: circle.id, amount: 15000, cycle: 1, status: "confirmed", confirmedAt: new Date() },
    ],
  });

  // Transactions correspondantes
  await prisma.transaction.createMany({
    data: [
      { userId: kofi.id, type: "contribution", amount: 15000, direction: "out", reference: "TX-SEED-101", description: "Cotisation Tontine Adawlato" },
      { userId: ama.id, type: "contribution", amount: 15000, direction: "out", reference: "TX-SEED-102", description: "Cotisation Tontine Adawlato" },
      { userId: kofi.id, type: "contribution", amount: 35000, direction: "out", reference: "TX-SEED-103", description: "Versement bol stock pagnes" },
      { userId: ama.id, type: "contribution", amount: 250000, direction: "out", reference: "TX-SEED-104", description: "Versement bol scolarité" },
    ],
  });

  console.log("✨ Seed d'Egoto terminé avec succès !");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
