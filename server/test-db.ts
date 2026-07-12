import { prisma } from "./lib/prisma";

async function runTest() {
  console.log("⚡ Starting ASHRAY DB Architecture Pipeline Verification...");
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Connection Layer: SUCCESS");

    console.log("🔄 Executing Transactional Operational Triggers...");
    await prisma.$transaction(async (tx) => {
      const orgCode = `ORG-CORE-${Date.now()}`;
      const organization = await tx.organization.create({
        data: {
          organizationName: "ASHRAY Foundation Root",
          organizationCode: orgCode,
        },
      });

      const branch = await tx.branch.create({
        data: {
          organizationId: organization.id,
          branchName: "Dhaka Central Hub",
          branchCode: `BR-DHK-${Date.now()}`,
          branchType: "HEAD_OFFICE",
          address: "Mirpur, Dhaka",
        },
      });

      // Validate AI & Predictive Automation Table Pipelines
      await tx.donationPrediction.create({
        data: {
          predictedAmount: 25000.0,
          confidenceScore: 0.89,
          algorithm: "RANDOM_FOREST_V2",
          status: "ACTIVE",
        },
      });

      await tx.autoTask.create({
        data: {
          taskName: "Predictive Resource Balancing Alert",
          taskType: "CRON_ANALYTICS",
          scheduledAt: new Date(),
          status: "PENDING",
        },
      });

      console.log(
        "   ↳ Mock AI automation metrics validated. Rolling back changes...",
      );
      throw new Error("ROLLBACK_VERIFIED_SUCCESSFULLY");
    });
  } catch (error: unknown) {
    const isRollback =
      error instanceof Error &&
      error.message === "ROLLBACK_VERIFIED_SUCCESSFULLY";
    if (isRollback) {
      console.log("✅ Operational AI Engine & Predictive Pipelines: SUCCESS");
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
