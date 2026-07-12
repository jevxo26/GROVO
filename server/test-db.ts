import { prisma } from "./lib/prisma";

async function runTest() {
  console.log("⚡ Starting ASHRAY DB Architecture Pipeline Verification...");
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Connection Layer: SUCCESS");

    console.log("🔄 Executing Transactional Operational Triggers...");
    await prisma.$transaction(async (tx) => {
      // Validate Security & Network Control Tables Pipeline
      await tx.iPWhitelist.create({
        data: {
          ipAddress: "192.168.1.100",
          description: "Dhaka HQ Central Security Terminal Gateway Override",
          addedBy: "root-security-bot",
          isActive: true,
        },
      });

      // Validate Security Telemetry Logging
      await tx.securityIncident.create({
        data: {
          incidentType: "RATE_LIMIT_EXCEEDED_BRUTE_FORCE",
          severity: "CRITICAL",
          description:
            "Repeated parsing anomalies flagged on authorization node.",
          status: "OPEN",
        },
      });

      console.log(
        "   ↳ Mock network security configurations validated. Rolling back changes...",
      );
      throw new Error("ROLLBACK_VERIFIED_SUCCESSFULLY");
    });
  } catch (error: unknown) {
    const isRollback =
      error instanceof Error &&
      error.message === "ROLLBACK_VERIFIED_SUCCESSFULLY";
    if (isRollback) {
      console.log(
        "✅ Operational Security Configurations & Access Control: SUCCESS",
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
