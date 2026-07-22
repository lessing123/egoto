// ═══════════════════════════════════════════════════════════════
// Egoto API — Script de validation des tontines avancées
// ═══════════════════════════════════════════════════════════════
// Valide de bout en bout :
// 1. La création d'une tontine avec code à 5 caractères
// 2. L'invitation d'un membre par son numéro de téléphone
// 3. Le blocage des cotisations (dépôts) tant que le cercle n'est pas plein
// 4. L'adhésion d'un membre via le code d'invitation à 5 caractères
// 5. Le démarrage automatique de la tontine dès que la capacité est atteinte
// 6. Les cotisations successives de tous les membres
// 7. Le reversement de la cagnotte automatique de fin de cycle au bon bénéficiaire
// ═══════════════════════════════════════════════════════════════

import { prisma } from "./src/lib/prisma";
import { CircleService } from "./src/services/circle.service";
import { PaymentService } from "./src/services/payment.service";
import { AuthService } from "./src/services/auth.service";
import { SavingsService } from "./src/services/savings.service";

const circleService = new CircleService();
const paymentService = new PaymentService();
const authService = new AuthService();
const savingsService = new SavingsService();

async function runTests() {
  console.log("🚀 Début des tests d'intégration des tontines avancées...");

  try {
    // 1. Nettoyer les anciennes données pour ce test
    await prisma.contribution.deleteMany();
    await prisma.circleMember.deleteMany();
    await prisma.circle.deleteMany();
    await prisma.transaction.deleteMany();
    await prisma.card.deleteMany();
    await prisma.savingsPot.deleteMany();
    await prisma.scoreEvent.deleteMany();
    await prisma.egotoScore.deleteMany();
    await prisma.paymentIntent.deleteMany();
    await prisma.user.deleteMany();

    console.log("🧹 Base de données nettoyée pour le test.");

    // 2. Créer des utilisateurs de test via AuthService pour générer les Egoto IDs
    // Kofi Mensah (Admin)
    const kofiReg = await authService.register(
      "+22890123456",
      "1234",
      "Kofi",
      "Mensah",
      "fr"
    );
    const kofi = kofiReg.user;

    // Ama Adjo (Membre 1)
    const amaReg = await authService.register(
      "+22891234567",
      "1234",
      "Ama",
      "Adjo",
      "fr"
    );
    const ama = amaReg.user;

    // Kodjo (Membre 2)
    const kodjoReg = await authService.register(
      "+22892222222",
      "1234",
      "Kodjo",
      "Togo",
      "fr"
    );
    const kodjo = kodjoReg.user;

    console.log(`👤 Utilisateurs créés avec Egoto IDs : Kofi (${kofi.egotoId}), Ama (${ama.egotoId}), Kodjo (${kodjo.egotoId})`);
    if (!kofi.egotoId || !kofi.egotoId.startsWith("EG-")) {
      throw new Error("❌ Échec: L'identifiant unique Egoto n'a pas été généré correctement.");
    }

    // Tester la vérification d'identité renforcée (KYC CNI/Passeport/Email)
    console.log("🛡️ Soumission des pièces d'identité pour Ama (KYC)...");
    const verifiedAma = await authService.verifyIdentity(ama.id, {
      email: "ama.adjo@gmail.com",
      cniNumber: "CNI-TG-8291",
      passportNumber: "P-TG-9831",
    });
    console.log(`✅ Ama vérifiée : isVerified = ${verifiedAma.isVerified} | Email = ${verifiedAma.email}`);
    if (!verifiedAma.isVerified || verifiedAma.email !== "ama.adjo@gmail.com") {
      throw new Error("❌ Échec: La validation d'identité KYC de sécurité renforcée a échoué.");
    }

    // Tester la création de bol d'épargne avec fréquence personnalisée en jours
    console.log("🍯 Création d'un bol d'épargne fixe de Kofi avec fréquence personnalisée (tous les 5 jours)...");
    const customPot = await savingsService.create(kofi.id, {
      name: "Achat pagnes grossiste",
      targetAmount: 50000,
      mode: "fixed",
      frequency: "custom",
      customDays: 5,
      fixedAmount: 5000,
      isLocked: true,
    });
    console.log(`✅ Bol d'épargne créé : ${customPot.name} | Fréquence : ${customPot.frequency} | Jours : ${customPot.customDays} jours`);
    if (customPot.frequency !== "custom" || customPot.customDays !== 5) {
      throw new Error("❌ Échec: La fréquence personnalisée en nombre de jours n'a pas été enregistrée.");
    }

    // 3. Kofi crée une tontine de 3 membres max
    const circle = await circleService.create(kofi.id, {
      name: "Tontine Marché de Lomé",
      amount: 10000,
      frequency: "weekly",
      maxMembers: 3,
    });

    console.log(`✅ Tontine créée : "${circle.name}" | Code d'invitation : ${circle.inviteCode} | Max membres : ${circle.maxMembers}`);
    if (!circle.inviteCode || circle.inviteCode.length !== 5) {
      throw new Error("❌ Échec: Le code d'invitation à 5 caractères n'a pas été généré.");
    }

    // 4. Tester le blocage des cotisations (tontine incomplète, 1/3 membre)
    console.log("⏳ Tentative de cotisation de Kofi avant complétude du cercle...");
    try {
      await paymentService.initiateCircleContribution(kofi.id, circle.id);
      throw new Error("❌ Échec: La cotisation a été initiée sur un cercle incomplet ! Règle de blocage non respectée.");
    } catch (err: any) {
      if (err.code === "CIRCLE_NOT_FULL") {
        console.log("✅ Succès: Cotisation bloquée comme prévu car le cercle est incomplet.");
      } else {
        throw err;
      }
    }

    // 5. Kofi (Admin) invite directement Ama par son numéro de téléphone
    console.log(`📨 Kofi invite Ama (${ama.phone}) par son numéro...`);
    const amaMembership = await circleService.inviteByPhone(kofi.id, circle.id, ama.phone);
    console.log(`✅ Ama a été ajoutée. Position attribuée : ${amaMembership.position}`);
    if (amaMembership.position !== 2) {
      throw new Error("❌ Échec: Ama aurait dû avoir la position 2.");
    }

    // 6. Tester de nouveau le blocage (tontine toujours incomplète, 2/3 membres)
    try {
      await paymentService.initiateCircleContribution(kofi.id, circle.id);
      throw new Error("❌ Échec: La cotisation a été initiée sur un cercle incomplet (2/3) !");
    } catch (err: any) {
      if (err.code === "CIRCLE_NOT_FULL") {
        console.log("✅ Succès: Cotisation toujours bloquée (2/3 membres).");
      } else {
        throw err;
      }
    }

    // 7. Kodjo rejoint de lui-même la tontine en saisissant le code à 5 caractères
    console.log(`👥 Kodjo rejoint via le code d'invitation "${circle.inviteCode}"...`);
    const kodjoMembership = await circleService.joinByCode(kodjo.id, circle.inviteCode);
    console.log(`✅ Kodjo a rejoint. Position attribuée : ${kodjoMembership.position}`);
    if (kodjoMembership.position !== 3) {
      throw new Error("❌ Échec: Kodjo aurait dû avoir la position 3.");
    }

    // 8. Vérifier que la tontine démarre maintenant que nous sommes à 3/3 membres
    console.log("🚀 La tontine est maintenant complète (3/3 membres). Tentative de cotisation pour Kofi...");
    const kofiContributionRes = await paymentService.initiateCircleContribution(kofi.id, circle.id);
    console.log("✅ Succès: Cotisation initiée avec succès pour Kofi !");

    // Simuler et confirmer le paiement de Kofi
    console.log("💸 Confirmation de la cotisation de Kofi...");
    const kofiPaymentIntentId = kofiContributionRes.paymentIntent.id;
    await paymentService.handleConfirmation(kofiPaymentIntentId, "REF-KOFI", "confirmed");

    // Cotisation d'Ama (Position 2)
    console.log("💸 Cotisation et confirmation pour Ama...");
    const amaContributionRes = await paymentService.initiateCircleContribution(ama.id, circle.id);
    await paymentService.handleConfirmation(amaContributionRes.paymentIntent.id, "REF-AMA", "confirmed");

    // Cotisation de Kodjo (Position 3) - C'est la dernière cotisation du cycle 1 !
    console.log("💸 Cotisation et confirmation pour Kodjo (dernier membre pour fermer le cycle 1)...");
    const kodjoContributionRes = await paymentService.initiateCircleContribution(kodjo.id, circle.id);
    
    // Le reversement (payout) de fin de cycle doit se déclencher lors de cette confirmation
    console.log("⏳ Confirmation de la dernière cotisation...");
    await paymentService.handleConfirmation(kodjoContributionRes.paymentIntent.id, "REF-KODJO", "confirmed");

    // 9. Valider le reversement (payout) de la cagnotte
    // Le montant de la cagnotte est 10000 * 3 membres = 30000 FCFA
    // Le bénéficiaire du cycle 1 est Kofi (Position 1)
    const kofiPayout = await prisma.transaction.findFirst({
      where: {
        userId: kofi.id,
        type: "payout",
      },
    });

    if (kofiPayout && kofiPayout.amount === 30000) {
      console.log(`🎉 SUCCÈS TOTAL : La cagnotte de ${kofiPayout.amount} FCFA a été automatiquement reversée à Kofi Mensah (Position 1) !`);
    } else {
      throw new Error("❌ Échec: Le reversement de la cagnotte n'a pas eu lieu ou le montant est incorrect.");
    }

    // Vérifier que le cycle de la tontine a été incrémenté à 2
    const updatedCircle = await prisma.circle.findUnique({
      where: { id: circle.id },
    });
    console.log(`🔄 Cycle actuel de la tontine : ${updatedCircle?.currentCycle} (attendu : 2)`);
    if (updatedCircle?.currentCycle !== 2) {
      throw new Error("❌ Échec: Le cycle de la tontine aurait dû passer à 2.");
    }

    console.log("\n⭐️ TOUS LES TESTS SONT AU VERT AVEC SUCCÈS ! ⭐️");

  } catch (error) {
    console.error("🔥 Échec d'un test :", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runTests();
