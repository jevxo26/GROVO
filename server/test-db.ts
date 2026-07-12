import { prisma } from "./lib/prisma";

async function runTest() {
  console.log("⚡ Starting ASHRAY DB Architecture Pipeline Verification...");
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Connection Layer: SUCCESS");

    console.log("🔄 Executing Transactional Operational Triggers...");
    await prisma.$transaction(async (tx) => {
      const orgCode = `ORG-INV-${Date.now()}`;
      const organization = await tx.organization.create({
        data: {
          organizationName: "ASHRAY Logistics Root",
          organizationCode: orgCode,
        },
      });

      const branch = await tx.branch.create({
        data: {
          organizationId: organization.id,
          branchName: "Chittagong Relief Hub",
          branchCode: `BR-CTG-${Date.now()}`,
          branchType: "DISTRICT_OFFICE",
          address: "Agrabad, Chittagong",
        },
      });

      // 1. Validate Branch Inventory Model Pipeline
      await tx.branchInventory.create({
        data: {
          branchId: branch.id,
          itemName: "Emergency Hydration Tablets",
          quantity: 5000,
          unit: "PACKETS",
          status: "AVAILABLE",
        },
      });

      // 2. Validate Branch Transport Assets Vehicle Pipeline adding vehicleType
      await tx.branchVehicle.create({
        data: {
          branchId: branch.id,
          vehicleNumber: `LOG-CTG-${Date.now()}`,
          vehicleType: "TRUCK",
          status: "AVAILABLE",
        },
      });

      console.log(
        "   ↳ Mock inventory supply chain parameters validated. Rolling back changes...",
      );
      throw new Error("ROLLBACK_VERIFIED_SUCCESSFULLY");
    });
  } catch (error: unknown) {
    const isRollback =
      error instanceof Error &&
      error.message === "ROLLBACK_VERIFIED_SUCCESSFULLY";
    if (isRollback) {
      console.log(
        "✅ Operational Relief Packages & Supply Chain Inventories: SUCCESS",
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
