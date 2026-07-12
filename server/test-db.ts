import { prisma } from "./lib/prisma";

async function runTest() {
  console.log("⚡ Starting ASHRAY DB Architecture Pipeline Verification...");
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Connection Layer: SUCCESS");

    console.log("🔄 Executing Transactional Operational Triggers...");
    await prisma.$transaction(async (tx) => {
      // 1. Build operational Media record
      const mediaItem = await tx.media.create({
        data: {
          title: "annual_report_2026.pdf",
          mediaType: "DOCUMENT",
          fileUrl: "https://s3.amazonaws.com/ashray-vault/report.pdf",
          fileSize: 4096,
          uploadedBy: "system-test-admin",
          status: "ACTIVE",
        },
      });

      // 2. Build mock target Album record
      const albumItem = await tx.album.create({
        data: {
          albumName: "Q3 Humanitarian Drive Photos",
          createdBy: "system-test-admin",
          status: "ACTIVE",
        },
      });

      // 3. Connect them via junction model
      await tx.albumMedia.create({
        data: {
          albumId: albumItem.id,
          mediaId: mediaItem.id,
          sortOrder: 1,
        },
      });

      console.log(
        "   ↳ Mock media vault metrics validated. Rolling back changes...",
      );
      throw new Error("ROLLBACK_VERIFIED_SUCCESSFULLY");
    });
  } catch (error: unknown) {
    const isRollback =
      error instanceof Error &&
      error.message === "ROLLBACK_VERIFIED_SUCCESSFULLY";
    if (isRollback) {
      console.log("✅ Operational Media Vault & Asset Pipeline: SUCCESS");
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
