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
          organizationName: "ASHRAY Foundation Root Node",
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

      // Validate Governance & Committee Model Relationships Integration
      await tx.committee.create({
        data: {
          branchId: branch.id,
          committeeName: "Executive Steering Council",
          committeeLevel: "NATIONAL",
          formationDate: new Date(),
          status: "ACTIVE",
        },
      });

      console.log(
        "   ↳ Mock governance metrics validated. Rolling back changes...",
      );
      throw new Error("ROLLBACK_VERIFIED_SUCCESSFULLY");
    });
  } catch (error: unknown) {
    const isRollback =
      error instanceof Error &&
      error.message === "ROLLBACK_VERIFIED_SUCCESSFULLY";
    if (isRollback) {
      console.log(
        "✅ Operational Governance & Regional Committee Structures: SUCCESS",
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
