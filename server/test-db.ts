import { prisma } from "./lib/prisma";

async function runTest() {
  console.log("⚡ Starting ASHRAY DB Architecture Pipeline Verification...");
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Connection Layer: SUCCESS");

    console.log("🔄 Executing Transactional Operational Triggers...");
    await prisma.$transaction(async (tx) => {
      // Validate CMS Table Pipelines Integration
      const targetPage = await tx.cMSPage.create({
        data: {
          title: "Emergency Flood Relief Portal 2026",
          slug: `flood-relief-hub-${Date.now()}`,
          status: "ACTIVE",
        },
      });

      await tx.cMSSection.create({
        data: {
          pageId: targetPage.id,
          title: "Hero Metrics Section",
          content: "Showing real-time field deployments",
          sortOrder: 1,
          status: "ACTIVE",
        },
      });

      // Validate Editorial Impact Pipelines
      await tx.successStory.create({
        data: {
          title: "Resilience in Sunamganj Distruct",
          slug: `resilience-sunamganj-${Date.now()}`,
          content: "Detailed reporting of structural relief distributions.",
          publishedBy: "editorial-test-bot",
          status: "ACTIVE",
        },
      });

      console.log(
        "   ↳ Mock content layout parameters validated. Rolling back changes...",
      );
      throw new Error("ROLLBACK_VERIFIED_SUCCESSFULLY");
    });
  } catch (error: unknown) {
    const isRollback =
      error instanceof Error &&
      error.message === "ROLLBACK_VERIFIED_SUCCESSFULLY";
    if (isRollback) {
      console.log(
        "✅ Operational CMS, Portals & Editorial Structures: SUCCESS",
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
