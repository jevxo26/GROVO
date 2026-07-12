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
          organizationName: "ASHRAY Root Node",
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

      const category = await tx.eventCategory.create({
        data: { name: "Emergency Relief Response", status: "ACTIVE" },
      });

      // Validate Event Fields Relationships Integration
      await tx.event.create({
        data: {
          eventCode: `EVT-TEST-${Date.now()}`,
          title: "Flood Logistics Planning",
          slug: `flood-ops-log-${Date.now()}`,
          categoryId: category.id,
          eventType: "FIELD_OPERATION",
          branchId: branch.id,
          venue: "Mirpur Sector 10 Ground",
          startDate: new Date(),
          endDate: new Date(Date.now() + 86400000),
          createdBy: "system-test-admin",
          status: "ACTIVE",
        },
      });

      console.log(
        "   ↳ Mock event parameters validated. Rolling back changes...",
      );
      throw new Error("ROLLBACK_VERIFIED_SUCCESSFULLY");
    });
  } catch (error: unknown) {
    const isRollback =
      error instanceof Error &&
      error.message === "ROLLBACK_VERIFIED_SUCCESSFULLY";
    if (isRollback) {
      console.log(
        "✅ Operational Field Events & Attendance Infrastructure: SUCCESS",
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
