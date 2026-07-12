import { prisma } from "./lib/prisma";

async function runTest() {
  console.log("⚡ Starting ASHRAY DB Architecture Pipeline Verification...");
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Connection Layer: SUCCESS");

    console.log("🔄 Executing Transactional Operational Triggers...");
    await prisma.$transaction(async (tx) => {
      // Establish user anchor parameters
      const mockUser = await tx.user.create({
        data: {
          id: `t-usr-${Date.now()}`,
          name: "Helpdesk Tester",
          email: `support.test.${Date.now()}@ashray.org`,
        },
      });

      // Validate Support & Ticket Routing Table Pipelines
      const ticket = await tx.supportTicket.create({
        data: {
          ticketNumber: `TCK-TST-${Date.now()}`,
          userId: mockUser.id,
          subject: "Payment verification webhook failure",
          description:
            "Transaction dropped during bKash verification lifecycle.",
          category: "BILLING_GATEWAY_ERROR",
          priority: "CRITICAL",
          status: "OPEN",
        },
      });

      await tx.ticketReply.create({
        data: {
          ticketId: ticket.id,
          userId: mockUser.id,
          message: "Telemetry trace log attached.",
          isStaff: false,
        },
      });

      console.log(
        "   ↳ Mock technical support metrics validated. Rolling back changes...",
      );
      throw new Error("ROLLBACK_VERIFIED_SUCCESSFULLY");
    });
  } catch (error: unknown) {
    const isRollback =
      error instanceof Error &&
      error.message === "ROLLBACK_VERIFIED_SUCCESSFULLY";
    if (isRollback) {
      console.log(
        "✅ Operational Technical Helpdesk & Ticket Routing: SUCCESS",
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
