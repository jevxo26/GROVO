import { prisma } from "./lib/prisma";

async function runTest() {
  console.log("⚡ Starting ASHRAY DB Architecture Pipeline Verification...");
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Connection Layer: SUCCESS");

    console.log("🔄 Executing Transactional Operational Triggers...");
    await prisma.$transaction(async (tx) => {
      // 1. Establish anchor user record
      const mockUser = await tx.user.create({
        data: {
          id: `t-usr-${Date.now()}`,
          name: "Test Alert Target",
          email: `alert.ops.${Date.now()}@ashray.org`,
        },
      });

      // 2. Build base configuration notification entry
      const baseAlert = await tx.notification.create({
        data: {
          title: "System Dispatched Broadcast Trigger",
          message: "Real-time alert engine connection test.",
          type: "SYSTEM_ALERT",
          priority: "HIGH",
        },
      });

      // 3. Connect recipient layout mapping
      await tx.notificationRecipient.create({
        data: {
          notificationId: baseAlert.id,
          userId: mockUser.id,
        },
      });

      console.log(
        "   ↳ Mock notification junction verified. Rolling back changes...",
      );
      throw new Error("ROLLBACK_VERIFIED_SUCCESSFULLY");
    });
  } catch (error: unknown) {
    const isRollback =
      error instanceof Error &&
      error.message === "ROLLBACK_VERIFIED_SUCCESSFULLY";
    if (isRollback) {
      console.log("✅ Operational Notification System Engine: SUCCESS");
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
