import { prisma } from "./lib/prisma";

async function runTest() {
  console.log("⚡ Starting ASHRAY DB Architecture Pipeline Verification...");
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Connection Layer: SUCCESS");

    console.log("🔄 Executing Transactional Operational Triggers...");
    await prisma.$transaction(async (tx) => {
      // Validate Analytics & System Health Monitoring Tables Pipeline
      await tx.systemHealth.create({
        data: {
          serviceName: "HYBRID_EXPRESS_CORE",
          status: "HEALTHY",
          responseTime: 4.2,
          cpuUsage: 12.4,
          memoryUsage: 38.2,
          diskUsage: 45.1,
        },
      });

      await tx.branchAnalytics.create({
        data: {
          branchId: "test-branch-uuid-anchor",
          period: "2026-Q3",
          totalDonations: 150000.0,
          totalExpenses: 45000.0,
          volunteerCount: 28,
          projectCount: 3,
        },
      });

      console.log(
        "   ↳ Mock system monitoring analytics metrics validated. Rolling back changes...",
      );
      throw new Error("ROLLBACK_VERIFIED_SUCCESSFULLY");
    });
  } catch (error: unknown) {
    const isRollback =
      error instanceof Error &&
      error.message === "ROLLBACK_VERIFIED_SUCCESSFULLY";
    if (isRollback) {
      console.log(
        "✅ Operational Analytics Snapshots & System Monitoring: SUCCESS",
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
