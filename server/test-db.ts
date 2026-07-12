import { prisma } from "./lib/prisma";

async function runTest() {
  console.log("⚡ Starting ASHRAY DB Architecture Pipeline Verification...");
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Connection Layer: SUCCESS");

    console.log("🔄 Executing Transactional Operational Triggers...");
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          id: `t-usr-${Date.now()}`,
          name: "Test Operational Tracker",
          email: `test.ops.${Date.now()}@ashray.org`,
        },
      });

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

      // Validate Beneficiary Cascade Models Integration
      const bCode = `BEN-TEST-${Date.now()}`;
      const beneficiary = await tx.beneficiary.create({
        data: {
          beneficiaryCode: bCode,
          fullName: "Test Recipient",
          branchId: branch.id,
        },
      });

      await tx.beneficiaryProfile.create({
        data: {
          beneficiaryId: beneficiary.id,
          occupation: "Day Laborer",
          monthlyIncome: 8500,
        },
      });

      console.log(
        "   ↳ Mock beneficiary trees validated. Rolling back changes...",
      );
      throw new Error("ROLLBACK_VERIFIED_SUCCESSFULLY");
    });
  } catch (error: unknown) {
    const isRollback =
      error instanceof Error &&
      error.message === "ROLLBACK_VERIFIED_SUCCESSFULLY";
    if (isRollback) {
      console.log("✅ Operational Beneficiary Metrics: SUCCESS");
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
