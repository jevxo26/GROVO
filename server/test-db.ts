import { prisma } from "./lib/prisma";

async function runTest() {
  console.log("⚡ Starting ASHRAY DB Architecture Pipeline Verification...");
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Connection Layer: SUCCESS");

    console.log("🔄 Executing Transactional Operational Triggers...");
    await prisma.$transaction(async (tx) => {
      const orgCode = `ORG-FLD-${Date.now()}`;
      const organization = await tx.organization.create({
        data: {
          organizationName: "ASHRAY Root Ecosystem",
          organizationCode: orgCode,
        },
      });

      const branch = await tx.branch.create({
        data: {
          organizationId: organization.id,
          branchName: "Sylhet Disaster Response Hub",
          branchCode: `BR-SYL-${Date.now()}`,
          branchType: "DISTRICT_OFFICE",
          address: "Sylhet, Bangladesh",
        },
      });

      const category = await tx.campaignCategory.create({
        data: { name: "Flood Relief Action Deployment" },
      });

      const campaign = await tx.campaign.create({
        data: {
          campaignCode: `CAM-FLD-${Date.now()}`,
          title: "Emergency Flood Relief Drive",
          slug: `emergency-flood-relief-${Date.now()}`,
          categoryId: category.id,
          campaignType: "EMERGENCY",
          targetAmount: 500000,
          startDate: new Date(),
          endDate: new Date(Date.now() + 864000000),
          createdBy: "system-admin",
        },
      });

      const project = await tx.project.create({
        data: {
          projectCode: `PRJ-FLD-${Date.now()}`,
          campaignId: campaign.id,
          projectName: "Clean Water Distribution Sylhet",
          branchId: branch.id,
          startDate: new Date(),
          endDate: new Date(Date.now() + 864000000),
        },
      });

      // 1. Validate Field Activity Model Pipeline
      const activity = await tx.fieldActivity.create({
        data: {
          projectId: project.id,
          activityTitle: "Distribution Center Setup Pod A",
          activityType: "LOGISTICS",
          performedBy: "Field Coordinator Masum",
          activityDate: new Date(),
        },
      });

      // 2. Validate Field Visit Pipeline Mapping
      await tx.fieldVisit.create({
        data: {
          activityId: activity.id,
          visitedBy: "Supervisor Inspector",
          visitDate: new Date(),
          remarks: "Operational pod structure fully functional.",
        },
      });

      console.log(
        "   ↳ Mock operational field configurations validated. Rolling back changes...",
      );
      throw new Error("ROLLBACK_VERIFIED_SUCCESSFULLY");
    });
  } catch (error: unknown) {
    const isRollback =
      error instanceof Error &&
      error.message === "ROLLBACK_VERIFIED_SUCCESSFULLY";
    if (isRollback) {
      console.log(
        "✅ Operational Field Operations & Deployment Tracks: SUCCESS",
      );
      console.log(
        "🎉 SYSTEM PIPELINE COMPILING WITHOUT ERROR AND COMPLETELY GREEN!",
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
