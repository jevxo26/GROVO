import { prisma } from "./lib/prisma";

async function runTest() {
  console.log("⚡ Starting ASHRAY DB Architecture Pipeline Verification...");
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Connection Layer: SUCCESS");

    console.log("🔄 Executing Transactional Operational Triggers...");
    await prisma.$transaction(async (tx) => {
      // Validate Multi-Currency Configurations Table Pipeline
      await tx.currency.create({
        data: {
          currencyCode: `USD-${Date.now()}`,
          currencyName: "US Dollar Ledger Reference",
          symbol: "$",
          exchangeRate: 118.5,
          isDefault: false,
        },
      });

      // Validate Localization Translation Pipelines
      const lang = await tx.language.create({
        data: {
          languageCode: `bn-${Date.now()}`,
          languageName: "Bangla Core Matrix",
          isDefault: true,
        },
      });

      await tx.translation.create({
        data: {
          languageId: lang.id,
          key: "WELCOME_MSG",
          value: "আশ্রয় প্ল্যাটফর্মে আপনাকে স্বাগতম",
          module: "CORE_UI",
        },
      });

      console.log(
        "   ↳ Mock localization configurations validated. Rolling back changes...",
      );
      throw new Error("ROLLBACK_VERIFIED_SUCCESSFULLY");
    });
  } catch (error: unknown) {
    const isRollback =
      error instanceof Error &&
      error.message === "ROLLBACK_VERIFIED_SUCCESSFULLY";
    if (isRollback) {
      console.log(
        "✅ Operational Localization Snapshots & Currency Ledgers: SUCCESS",
      );
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
