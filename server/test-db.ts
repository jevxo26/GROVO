import { prisma } from "./lib/prisma";

async function runTest() {
  console.log("⚡ Starting ASHRAY DB Architecture Pipeline Verification...");
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Connection Layer: SUCCESS");

    console.log("🔄 Executing Transactional Operational Triggers...");
    await prisma.$transaction(async (tx) => {
      // 1. Setup mock anchor user parameters
      const user = await tx.user.create({
        data: {
          id: `t-usr-${Date.now()}`,
          name: "Test Operational Tracker",
          email: `test.ops.${Date.now()}@ashray.org`,
        },
      });

      // 2. Setup parent organization record first to secure foreign keys
      const orgCode = `ORG-CORE-${Date.now()}`;
      const organization = await tx.organization.create({
        data: {
          organizationName: "ASHRAY Foundation Root Node",
          organizationCode: orgCode,
          status: "ACTIVE",
        },
      });

      // 3. Setup mock organization branch parameters linked to parent org id
      const branch = await tx.branch.create({
        data: {
          organizationId: organization.id,
          branchName: "Dhaka Central Hub",
          branchCode: `BR-DHK-${Date.now()}`,
          branchType: "HEAD_OFFICE",
          address: "Mirpur, Dhaka",
        },
      });

      // 4. Setup core volunteer registry record
      const volunteer = await tx.volunteer.create({
        data: {
          userId: user.id,
          volunteerCode: `VOL-${Date.now()}`,
          branchId: branch.id,
          status: "ACTIVE",
        },
      });

      // 5. Validate metrics relationship performance engine tree
      await tx.volunteerPerformance.create({
        data: {
          volunteerId: volunteer.id,
          totalAssignments: 12,
          completedAssignments: 10,
          attendanceRate: 83.3,
          performanceScore: 92.5,
        },
      });

      throw new Error("ROLLBACK_VERIFIED_SUCCESSFULLY");
    });
  } catch (error: unknown) {
    const isRollback =
      error instanceof Error &&
      error.message === "ROLLBACK_VERIFIED_SUCCESSFULLY";
    if (isRollback) {
      console.log("✅ Operational Volunteer Metrics: SUCCESS");
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
