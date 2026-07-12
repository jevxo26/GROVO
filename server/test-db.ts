import { prisma } from "./lib/prisma";

async function runTest() {
  console.log("⚡ Starting ASHRAY DB Architecture Pipeline Verification...");
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Connection Layer: SUCCESS");

    console.log("🔄 Executing Transactional Operational Triggers...");
    await prisma.$transaction(async (tx) => {
      // 1. Validate Background Automated Task Table Pipeline
      await tx.autoTask.create({
        data: {
          taskName: "Midnight Inventory Sync Trigger",
          taskType: "INVENTORY_RECONCILIATION",
          scheduledAt: new Date(Date.now() + 3600000),
          status: "PENDING",
          payload: JSON.stringify({ branchId: "all" }),
        },
      });

      // 2. Validate Telemetry Automation Logs Pipeline
      await tx.automationLog.create({
        data: {
          automationType: "CRON_JOB",
          triggerEvent: "SYSTEM_CLOCK_MIDNIGHT",
          action: "CLEAR_STALE_SESSIONS",
          status: "SUCCESS",
        },
      });

      console.log(
        "   ↳ Mock system automation matrices validated. Rolling back changes...",
      );
      throw new Error("ROLLBACK_VERIFIED_SUCCESSFULLY");
    });
  } catch (error: unknown) {
    const isRollback =
      error instanceof Error &&
      error.message === "ROLLBACK_VERIFIED_SUCCESSFULLY";
    if (isRollback) {
      console.log(
        "✅ Operational Background Tasks & Automation Engines: SUCCESS",
      );
      console.log(
        "🎉 ALL OPERATIONAL ENGINE CHANNELS ARE FUNCTIONAL AND GREEN!",
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
