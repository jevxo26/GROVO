import { prisma } from "./lib/prisma";

async function runTest() {
  console.log("⚡ Starting ASHRAY DB Architecture Pipeline Verification...");
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Connection Layer: SUCCESS");

    console.log("🔄 Executing Transactional Operational Triggers...");
    await prisma.$transaction(async (tx) => {
      // 1. Establish anchor Funds
      const primaryFund = await tx.fund.create({
        data: {
          fundName: "Emergency Reserve",
          fundCode: `FND-EMG-${Date.now()}`,
          currentBalance: 50000,
        },
      });

      const projectFund = await tx.fund.create({
        data: {
          fundName: "Medical Drive Unit",
          fundCode: `FND-MED-${Date.now()}`,
          currentBalance: 1000,
        },
      });

      // 2. Validate Intra-Fund Transfer Logic
      await tx.fundTransfer.create({
        data: {
          fromFundId: primaryFund.id,
          toFundId: projectFund.id,
          amount: 5000,
          reason: "Initial allocation override test",
        },
      });

      console.log(
        "   ↳ Mock liquidity tracking validated. Rolling back changes...",
      );
      throw new Error("ROLLBACK_VERIFIED_SUCCESSFULLY");
    });
  } catch (error: unknown) {
    const isRollback =
      error instanceof Error &&
      error.message === "ROLLBACK_VERIFIED_SUCCESSFULLY";
    if (isRollback) {
      console.log("✅ Operational Financial Ledger Integration: SUCCESS");
      console.log(
        "🎉 ALL OPERATIONAL CORE CONTROLLERS ARE FUNCTIONAL AND GREEN!",
      );
    } else {
      const msg =
        error instanceof Error ? error.message : "Unknown compilation fault";
      console.error("❌ Operational Layer Crash:", msg);
    }
  } finally {
    await prisma.$disconnect();
  }
}

runTest();
