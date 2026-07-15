import express from "express";
import { RootRouter } from "./routes/index.routes";
import { prisma } from "./lib/prisma";

const app = express();
app.use(express.json());
app.use("/api", RootRouter);

async function runTests() {
  console.log("🚀 Starting Modules 10-14 API Verification Suite...\n");

  const server = app.listen(3005, async () => {
    console.log("🛰️ Test Server running on http://localhost:3005");

    try {
      // 1. Setup mock requirements (Organization, Branch, User)
      console.log("⚙️ Setting up test prerequisites in DB...");
      await prisma.organization.upsert({
        where: { id: "org-mock-1" },
        update: {},
        create: {
          id: "org-mock-1",
          organizationName: "ASHRAY Foundation",
          organizationCode: "ASHRAY",
        },
      });

      await prisma.branch.upsert({
        where: { id: "br-dhaka-1" },
        update: {},
        create: {
          id: "br-dhaka-1",
          organizationId: "org-mock-1",
          branchName: "Dhaka Central Branch",
          branchCode: "BR-DHAKA-1",
          branchType: "HEAD_OFFICE",
          address: "Mohammadpur, Dhaka",
        },
      });

      await prisma.user.upsert({
        where: { id: "usr-default-mock" },
        update: {},
        create: {
          id: "usr-default-mock",
          name: "Test User",
          email: "test-user@example.com",
          role: "donor",
        },
      });

      await prisma.user.upsert({
        where: { id: "usr-coordinator-mock" },
        update: {},
        create: {
          id: "usr-coordinator-mock",
          name: "Test Coordinator",
          email: "coordinator@example.com",
          role: "volunteer",
        },
      });

      console.log("✅ Prerequisites set up successfully.\n");

      // 2. Test Module 10: Send Notification
      console.log("📣 [Module 10] Testing Send Notification...");
      const sendNotifRes = await fetch("http://localhost:3005/api/v1/admin/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Flood Relief Update",
          message: "We reached 50% target",
          type: "campaign",
          priority: "high",
          channels: ["in_app", "push", "email", "sms"],
          target_audience: { roles: ["donor"] },
        }),
      });
      const sendNotif = await sendNotifRes.json();
      console.log(`   Status: ${sendNotifRes.status}, Response:`, JSON.stringify(sendNotif));
      if (sendNotifRes.status !== 201) throw new Error("Send notification failed");
      const notificationId = sendNotif.data.notificationId;

      // 3. Test Module 10: Get My Notifications
      console.log("📣 [Module 10] Testing Get My Notifications...");
      const getNotifRes = await fetch("http://localhost:3005/api/v1/notifications/my", {
        headers: { "x-user-id": "usr-default-mock" },
      });
      const getNotif = await getNotifRes.json();
      console.log(`   Status: ${getNotifRes.status}, Count: ${getNotif.data.length}`);
      if (getNotifRes.status !== 200 || getNotif.data.length === 0) throw new Error("Get my notifications failed");
      const inAppNotifId = getNotif.data[0].id;

      // 4. Test Module 10: Mark Notification as Read
      console.log("📣 [Module 10] Testing Mark Notification Read...");
      const readNotifRes = await fetch(`http://localhost:3005/api/v1/notifications/${inAppNotifId}/read`, {
        method: "PATCH",
        headers: { "x-user-id": "usr-default-mock" },
      });
      const readNotif = await readNotifRes.json();
      console.log(`   Status: ${readNotifRes.status}, Read At: ${readNotif.data.read_at}`);
      if (readNotifRes.status !== 200 || !readNotif.data.is_read) throw new Error("Mark read failed");

      // 5. Test Module 10: Create Emergency Alert
      console.log("📣 [Module 10] Testing Create Emergency Alert...");
      const emergencyRes = await fetch("http://localhost:3005/api/v1/admin/emergency-alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "URGENT: Flood Alert",
          description: "Water levels rising",
          priority: "critical",
          target_area: { division_ids: ["div-1"] },
          expires_at: new Date(Date.now() + 86400000).toISOString(),
          channels: ["push", "sms"],
        }),
      });
      const emergency = await emergencyRes.json();
      console.log(`   Status: ${emergencyRes.status}, Alert ID: ${emergency.data.alert_id}`);
      if (emergencyRes.status !== 201) throw new Error("Create emergency alert failed");
      const alertId = emergency.data.alert_id;

      // 6. Test Module 10: Resolve Emergency Alert
      console.log("📣 [Module 10] Testing Resolve Emergency Alert...");
      const resolveAlertRes = await fetch(`http://localhost:3005/api/v1/admin/emergency-alerts/${alertId}/resolve`, {
        method: "POST",
      });
      const resolveAlert = await resolveAlertRes.json();
      console.log(`   Status: ${resolveAlertRes.status}, resolved: ${resolveAlert.data.status}`);
      if (resolveAlertRes.status !== 200) throw new Error("Resolve emergency alert failed");

      // 7. Test Module 10: Create Support Ticket
      console.log("🎫 [Module 10] Testing Create Support Ticket...");
      const ticketRes = await fetch("http://localhost:3005/api/v1/support/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": "usr-default-mock",
        },
        body: JSON.stringify({
          subject: "Card charged twice",
          description: "Duplicate donation charge",
          category: "donation",
          priority: "high",
        }),
      });
      const ticket = await ticketRes.json();
      console.log(`   Status: ${ticketRes.status}, Ticket Number: ${ticket.data.ticketNumber}`);
      if (ticketRes.status !== 201) throw new Error("Create support ticket failed");
      const ticketId = ticket.data.id;

      // 8. Test Module 10: Reply to Support Ticket
      console.log("🎫 [Module 10] Testing Reply to Support Ticket...");
      const replyRes = await fetch(`http://localhost:3005/api/v1/support/tickets/${ticketId}/replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": "admin-mock",
        },
        body: JSON.stringify({
          message: "Refunding duplicate charge",
          isStaff: true,
        }),
      });
      const reply = await replyRes.json();
      console.log(`   Status: ${replyRes.status}, status updated: ${reply.data.id}`);
      if (replyRes.status !== 201) throw new Error("Reply to ticket failed");

      // 9. Test Module 10: Get Ticket Detail
      console.log("🎫 [Module 10] Testing Get Ticket Detail...");
      const detailRes = await fetch(`http://localhost:3005/api/v1/support/tickets/${ticketId}`, {
        headers: { "x-user-id": "usr-default-mock" },
      });
      const detail = await detailRes.json();
      console.log(`   Status: ${detailRes.status}, subject: ${detail.data.subject}, replies count: ${detail.data.replies.length}`);
      if (detailRes.status !== 200 || detail.data.replies.length < 1) throw new Error("Get ticket detail failed");

      // 10. Test Module 10: List My Tickets
      console.log("🎫 [Module 10] Testing List My Tickets...");
      const myTicketsRes = await fetch("http://localhost:3005/api/v1/support/tickets/my", {
        headers: { "x-user-id": "usr-default-mock" },
      });
      const myTickets = await myTicketsRes.json();
      console.log(`   Status: ${myTicketsRes.status}, count: ${myTickets.data.length}`);
      if (myTicketsRes.status !== 200 || myTickets.data.length === 0) throw new Error("List my tickets failed");

      // 11. Test Module 10: List All Tickets (Admin)
      console.log("🎫 [Module 10] Testing List All Tickets (Admin)...");
      const allTicketsRes = await fetch("http://localhost:3005/api/v1/admin/support/tickets", {
        headers: { "x-user-id": "admin-mock" },
      });
      const allTickets = await allTicketsRes.json();
      console.log(`   Status: ${allTicketsRes.status}, count: ${allTickets.data.length}`);
      if (allTicketsRes.status !== 200 || allTickets.data.length === 0) throw new Error("List all tickets failed");

      // 12. Test Module 11: Generate Report
      console.log("📊 [Module 11] Testing Generate Report...");
      const reportRes = await fetch("http://localhost:3005/api/v1/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportName: "Annual Audit",
          reportType: "FINANCIAL",
          parameters: { year: 2026 },
        }),
      });
      const report = await reportRes.json();
      console.log(`   Status: ${reportRes.status}, Report ID: ${report.data.id}, status: ${report.data.status}`);
      if (reportRes.status !== 201) throw new Error("Generate report failed");

      // 13. Test Module 11: Retrieve Dashboard Layout
      console.log("📊 [Module 11] Testing Retrieve Dashboard Layout...");
      const dashboardRes = await fetch("http://localhost:3005/api/v1/dashboards/me", {
        headers: { "x-user-id": "usr-default-mock" },
      });
      const dashboard = await dashboardRes.json();
      console.log(`   Status: ${dashboardRes.status}, Dashboard Name: ${dashboard.data.name}, widgets: ${dashboard.data.widgets.length}`);
      if (dashboardRes.status !== 200 || dashboard.data.widgets.length === 0) throw new Error("Retrieve dashboard layout failed");

      // 14. Test Module 12: Create CMS Page
      console.log("📰 [Module 12] Testing Create CMS Page...");
      const cmsPageRes = await fetch("http://localhost:3005/api/v1/admin/cms/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "About ASHRAY",
          slug: `about-ashray-${Date.now()}`,
          content: "ASHRAY NGO Bangladesh",
        }),
      });
      const cmsPage = await cmsPageRes.json();
      console.log(`   Status: ${cmsPageRes.status}, Page ID: ${cmsPage.data.id}`);
      if (cmsPageRes.status !== 201) throw new Error("Create CMS page failed");

      // 15. Test Module 12: Update System Setting
      console.log("📰 [Module 12] Testing Update System Setting...");
      const settingRes = await fetch("http://localhost:3005/api/v1/admin/system/settings/payment_retry_limit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          settingValue: "5",
          description: "Max payment retry attempts",
        }),
      });
      const setting = await settingRes.json();
      console.log(`   Status: ${settingRes.status}, message: ${setting.message}`);
      if (settingRes.status !== 200) throw new Error("Update system setting failed");

      // 16. Test Module 13: Assign Regional Coordinator
      console.log("🏢 [Module 13] Testing Assign Regional Coordinator...");
      const coordinatorRes = await fetch("http://localhost:3005/api/v1/admin/coordinators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "usr-coordinator-mock",
          regionName: "Dhaka Relief Command",
          divisionId: "dhaka",
        }),
      });
      const coordinator = await coordinatorRes.json();
      console.log(`   Status: ${coordinatorRes.status}, Coord Assignment ID: ${coordinator.data.id}`);
      if (coordinatorRes.status !== 201) throw new Error("Assign coordinator failed");

      // 17. Test Module 13: Record Territory Assignment
      console.log("🏢 [Module 13] Testing Record Territory Assignment...");
      const territoryRes = await fetch("http://localhost:3005/api/v1/admin/territories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": "usr-coordinator-mock",
        },
        body: JSON.stringify({
          userId: "usr-default-mock",
          branchId: "br-dhaka-1",
          divisionId: "dhaka",
          districtId: "dhaka-central",
        }),
      });
      const territory = await territoryRes.json();
      console.log(`   Status: ${territoryRes.status}, Territory Assignment ID: ${territory.data.id}`);
      if (territoryRes.status !== 201) throw new Error("Assign territory failed");

      // 18. Test Module 14: Send Assistant Chat Prompt
      console.log("🤖 [Module 14] Testing AI Assistant Chat Prompt...");
      const chatRes = await fetch("http://localhost:3005/api/v1/ai/assistant/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": "usr-default-mock",
        },
        body: JSON.stringify({
          assistantId: "ast-uuid-111",
          message: "Which ongoing campaigns need urgent volunteer assignments in Dhaka?",
        }),
      });
      const chat = await chatRes.json();
      console.log(`   Status: ${chatRes.status}, Reply: ${chat.data.reply}`);
      if (chatRes.status !== 200 || !chat.data.reply.includes("Mohammadpur")) throw new Error("AI assistant chat failed");

      // 19. Test Module 14: Request Route Optimization
      console.log("🤖 [Module 14] Testing AI Route Optimization Request...");
      const routeRes = await fetch("http://localhost:3005/api/v1/ai/route-optimizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          optimizationType: "RELIEF_DISTRIBUTION",
          startLocation: "23.7645,90.3542",
          endLocation: "23.7700,90.3600",
          waypoints: ["23.7650,90.3550", "23.7680,90.3590"],
        }),
      });
      const route = await routeRes.json();
      console.log(`   Status: ${routeRes.status}, optimizedRoute: ${route.data.optimizedRoute}`);
      if (routeRes.status !== 201) throw new Error("AI route optimization failed");

      console.log("\n🎉 ALL TESTS COMPLETED AND ALL API ENDPOINTS RETURNED 200/201 CODES!");

    } catch (err: any) {
      console.error("\n❌ TEST FAILURE:", err.message);
      process.exit(1);
    } finally {
      server.close();
      await prisma.$disconnect();
      console.log("🔌 Database connection closed and test server shut down.");
    }
  });
}

runTests();
