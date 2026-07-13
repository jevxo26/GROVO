import { prisma } from "./lib/prisma";

const TEST_UID = `test-uid-${Date.now()}`;
const TEST_BRANCH_ID = `test-branch-${Date.now()}`;

interface TestResult {
  name: string;
  status: "PASS" | "FAIL";
  detail?: string;
}

const results: TestResult[] = [];

function pass(name: string, detail?: string) {
  results.push({ name, status: "PASS", detail });
}

function fail(name: string, detail?: string) {
  results.push({ name, status: "FAIL", detail });
}

// ─── 1. Raw Connection Check ─────────────────────────────────────────────────
async function testConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    pass("DB Connection", "Raw SQL SELECT 1 returned successfully");
  } catch (e: unknown) {
    fail("DB Connection", e instanceof Error ? e.message : String(e));
  }
}

// ─── 2. Security Vault Routes ────────────────────────────────────────────────
async function testSecurityRoutes() {
  try {
    await prisma.$transaction(async (tx) => {
      const ip = await tx.iPWhitelist.create({
        data: {
          ipAddress: "10.0.0.1",
          description: "Test Gateway Node",
          addedBy: TEST_UID,
          isActive: true,
        },
      });
      if (!ip.id) throw new Error("IPWhitelist record missing id");

      const incident = await tx.securityIncident.create({
        data: {
          incidentType: "BRUTE_FORCE_ATTEMPT",
          severity: "HIGH",
          description: "Automated test — brute force simulation",
          status: "OPEN",
        },
      });
      if (!incident.id) throw new Error("SecurityIncident record missing id");

      throw new Error("ROLLBACK");
    });
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "ROLLBACK") {
      pass("Security → IP Whitelist + Incident Flag");
    } else {
      fail(
        "Security → IP Whitelist + Incident Flag",
        e instanceof Error ? e.message : String(e),
      );
    }
  }
}

// ─── 3. Donation Routes ──────────────────────────────────────────────────────
async function testDonationRoutes() {
  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          id: `usr-donor-${Date.now()}`,
          name: "Test Donor Name",
          email: `donor-${Date.now()}@grovo.test`,
        },
      });

      const donor = await tx.donor.create({
        data: {
          userId: user.id,
          donorCode: `DNR-TEST-${Date.now()}`,
          donorType: "INDIVIDUAL",
          status: "ACTIVE",
        },
      });

      const donationType = await tx.donationType.create({
        data: { name: "Test Direct Donation" },
      });

      const donationCategory = await tx.donationCategory.create({
        data: { name: "Test General Fund" },
      });

      const donation = await tx.donation.create({
        data: {
          donationNumber: `DN-TEST-${Date.now()}`,
          donorId: donor.id,
          amount: 5000.0,
          donationTypeId: donationType.id,
          categoryId: donationCategory.id,
          paymentStatus: "COMPLETED",
        },
      });

      const gateway = await tx.paymentGateway.create({
        data: {
          gatewayName: "BKASH_SANDBOX",
          merchantId: "MCH-123",
          apiKey: "key-123",
          secretKey: "sec-123",
        },
      });

      const payment = await tx.payment.create({
        data: {
          donationId: donation.id,
          paymentMethod: "BKASH",
          amount: 5000.0,
          transactionId: `TXN-TEST-${Date.now()}`,
          paymentStatus: "SUCCESS",
          paymentGatewayId: gateway.id,
        },
      });

      if (!donation.id || !payment.id)
        throw new Error("Donation pipeline incomplete");
      throw new Error("ROLLBACK");
    });
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "ROLLBACK") {
      pass("Donation → Process Donation + Payment");
    } else {
      fail(
        "Donation → Process Donation + Payment",
        e instanceof Error ? e.message : String(e),
      );
    }
  }
}

// ─── 4. Volunteer Routes ─────────────────────────────────────────────────────
async function testVolunteerRoutes() {
  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          id: `usr-vol-${Date.now()}`,
          name: "Test Volunteer User",
          email: `vol-${Date.now()}@grovo.test`,
        },
      });

      const org = await tx.organization.create({
        data: {
          organizationName: `TestOrg-${Date.now()}`,
          organizationCode: `ORG-VOL-${Date.now()}`,
        },
      });

      const branch = await tx.branch.create({
        data: {
          branchCode: `BR-TEST-${Date.now()}`,
          branchName: "Test Branch",
          organizationId: org.id,
          branchType: "HEAD_OFFICE",
          address: "Dhaka HQ",
        },
      });

      const volunteer = await tx.volunteer.create({
        data: {
          userId: user.id,
          volunteerCode: `VOL-TEST-${Date.now()}`,
          branchId: branch.id,
          status: "ACTIVE",
        },
      });

      const perf = await tx.volunteerPerformance.create({
        data: {
          volunteerId: volunteer.id,
          totalAssignments: 10,
          completedAssignments: 8,
          attendanceRate: 0.9,
          performanceScore: 85.5,
        },
      });
      if (!perf.id) throw new Error("VolunteerPerformance record missing id");

      await tx.volunteerAvailability.create({
        data: {
          volunteerId: volunteer.id,
          availableDays: ["MON", "WED", "FRI"],
          isAvailable: true,
        },
      });

      await tx.volunteerSkill.create({
        data: {
          volunteerId: volunteer.id,
          skillName: "First Aid",
          skillLevel: "ADVANCED",
        },
      });

      const available = await tx.volunteer.findMany({
        where: { status: "ACTIVE" },
        include: {
          availabilities: { where: { isAvailable: true } },
          skills: true,
        },
      });
      if (available.length === 0) throw new Error("No active volunteers found");

      throw new Error("ROLLBACK");
    });
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "ROLLBACK") {
      pass("Volunteer → Performance + Available Query");
    } else {
      fail(
        "Volunteer → Performance + Available Query",
        e instanceof Error ? e.message : String(e),
      );
    }
  }
}

// ─── 5. Beneficiary Routes ───────────────────────────────────────────────────
async function testBeneficiaryRoutes() {
  try {
    await prisma.$transaction(async (tx) => {
      const org = await tx.organization.create({
        data: {
          organizationName: `BenOrg-${Date.now()}`,
          organizationCode: `ORG-BEN-${Date.now()}`,
        },
      });

      const branch = await tx.branch.create({
        data: {
          branchCode: `BR-BEN-${Date.now()}`,
          branchName: "Beneficiary Test Branch",
          organizationId: org.id,
          branchType: "DISTRICT_OFFICE",
          address: "Chittagong Base",
        },
      });

      const beneficiary = await tx.beneficiary.create({
        data: {
          beneficiaryCode: `BEN-TEST-${Date.now()}`,
          fullName: "Test Beneficiary",
          phone: "01800000000",
          branchId: branch.id,
        },
      });

      const profile = await tx.beneficiaryProfile.create({
        data: {
          beneficiaryId: beneficiary.id,
          occupation: "Day Laborer",
          monthlyIncome: 8000,
        },
      });

      const assessment = await tx.beneficiaryNeedAssessment.create({
        data: {
          beneficiaryId: beneficiary.id,
          assessmentType: "FOOD_SECURITY",
          priority: "HIGH",
          assessedBy: TEST_UID,
          assessmentDate: new Date(),
        },
      });

      if (!beneficiary.id || !profile.id || !assessment.id)
        throw new Error("Beneficiary pipeline incomplete");

      throw new Error("ROLLBACK");
    });
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "ROLLBACK") {
      pass("Beneficiary → Register + Profile + Need Assessment");
    } else {
      fail(
        "Beneficiary → Register + Profile + Need Assessment",
        e instanceof Error ? e.message : String(e),
      );
    }
  }
}

// ─── 6. AI Engine Routes ─────────────────────────────────────────────────────
async function testAiRoutes() {
  try {
    await prisma.$transaction(async (tx) => {
      const prediction = await tx.donationPrediction.create({
        data: {
          predictedAmount: 15000.5,
          confidenceScore: 0.87,
          algorithm: "LINEAR_REGRESSION",
          status: "ACTIVE",
        },
      });

      const task = await tx.autoTask.create({
        data: {
          taskName: "Send Monthly Donation Reminder",
          taskType: "CRON_NOTIFICATION",
          scheduledAt: new Date(Date.now() + 86400000),
          status: "PENDING",
          payload: '{"target":"all_donors"}',
        },
      });

      if (!prediction.id || !task.id) throw new Error("AI pipeline incomplete");
      throw new Error("ROLLBACK");
    });
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "ROLLBACK") {
      pass("AI → Donation Prediction + Auto Task Queue");
    } else {
      fail(
        "AI → Donation Prediction + Auto Task Queue",
        e instanceof Error ? e.message : String(e),
      );
    }
  }
}

// ─── 7. AI Engine (Models & Forecasts) ───────────────────────────────────────
async function testAiEngineRoutes() {
  try {
    await prisma.$transaction(async (tx) => {
      const model = await tx.aIModel.create({
        data: {
          modelName: "DonorChurnPredictor-v2",
          modelType: "CLASSIFICATION",
          algorithm: "RANDOM_FOREST",
          accuracy: 0.94,
          status: "ACTIVE",
        },
      });

      const forecast = await tx.demandForecast.create({
        data: {
          category: "RELIEF_SUPPLIES",
          forecastPeriod: "Q3-2026",
          predictedDemand: 45000,
          region: "Dhaka Division",
        },
      });

      if (!model.id || !forecast.id)
        throw new Error("AI Engine pipeline incomplete");
      throw new Error("ROLLBACK");
    });
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "ROLLBACK") {
      pass("AI Engine → Model Registration + Demand Forecast");
    } else {
      fail(
        "AI Engine → Model Registration + Demand Forecast",
        e instanceof Error ? e.message : String(e),
      );
    }
  }
}

// ─── 8. Analytics Routes ─────────────────────────────────────────────────────
async function testAnalyticsRoutes() {
  try {
    await prisma.$transaction(async (tx) => {
      const health = await tx.systemHealth.create({
        data: {
          serviceName: "api-gateway",
          status: "HEALTHY",
          responseTime: 45.2,
          cpuUsage: 32.5,
          memoryUsage: 67.8,
          diskUsage: 41.0,
        },
      });
      if (!health.id) throw new Error("SystemHealth record missing id");

      const branchStats = await tx.branchAnalytics.findMany({
        where: { branchId: "non-existent-branch-test" },
        orderBy: { createdAt: "desc" },
        take: 10,
      });
      if (!Array.isArray(branchStats))
        throw new Error("BranchAnalytics query malformed");

      throw new Error("ROLLBACK");
    });
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "ROLLBACK") {
      pass("Analytics → System Health + Branch Stats Query");
    } else {
      fail(
        "Analytics → System Health + Branch Stats Query",
        e instanceof Error ? e.message : String(e),
      );
    }
  }
}

// ─── 9. Media Vault Routes ───────────────────────────────────────────────────
async function testMediaRoutes() {
  try {
    await prisma.$transaction(async (tx) => {
      const media = await tx.media.create({
        data: {
          title: "Test Campaign Banner",
          description: "High-res campaign visual asset",
          mediaType: "IMAGE",
          fileUrl: "https://cdn.grovo.test/banner-test.webp",
          fileSize: 2048000,
          uploadedBy: TEST_UID,
          status: "ACTIVE",
        },
      });
      if (!media.id) throw new Error("Media record missing id");

      const userAssets = await tx.media.findMany({
        where: { uploadedBy: TEST_UID, status: "ACTIVE" },
        orderBy: { createdAt: "desc" },
      });
      if (userAssets.length === 0)
        throw new Error("User assets query returned empty");

      throw new Error("ROLLBACK");
    });
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "ROLLBACK") {
      pass("Media Vault → Upload Register + User Assets Query");
    } else {
      fail(
        "Media Vault → Upload Register + User Assets Query",
        e instanceof Error ? e.message : String(e),
      );
    }
  }
}

// ─── 10. Notification Routes ─────────────────────────────────────────────────
async function testNotificationRoutes() {
  try {
    await prisma.$transaction(async (tx) => {
      const notification = await tx.notification.create({
        data: {
          title: "System Maintenance Alert",
          message: "Scheduled downtime from 2:00 AM to 4:00 AM BST",
          type: "SYSTEM",
          priority: "HIGH",
          status: "PENDING",
        },
      });

      const recipient = await tx.notificationRecipient.create({
        data: {
          notificationId: notification.id,
          userId: TEST_UID,
          status: "PENDING",
        },
      });

      if (!notification.id || !recipient.id)
        throw new Error("Notification pipeline incomplete");

      const activeAlerts = await tx.notificationRecipient.findMany({
        where: { userId: TEST_UID },
        include: { notification: true },
        orderBy: { createdAt: "desc" },
        take: 15,
      });
      if (activeAlerts.length === 0)
        throw new Error("Active alerts query empty");

      throw new Error("ROLLBACK");
    });
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "ROLLBACK") {
      pass("Notifications → Queue Alert + Recipient + Active Alerts Query");
    } else {
      fail(
        "Notifications → Queue Alert + Recipient + Active Alerts Query",
        e instanceof Error ? e.message : String(e),
      );
    }
  }
}
// ─── 11. Governance Routes ───────────────────────────────────────────────────
async function testGovernanceRoutes() {
  try {
    await prisma.$transaction(async (tx) => {
      const org = await tx.organization.create({
        data: {
          organizationName: `GovOrg-${Date.now()}`,
          organizationCode: `ORG-GOV-${Date.now()}`,
        },
      });

      const branch = await tx.branch.create({
        data: {
          branchCode: `BR-GOV-${Date.now()}`,
          branchName: "Governance Test Branch",
          organizationId: org.id,
          branchType: "DISTRICT_OFFICE",
          address: "Sylhet Center",
        },
      });

      const committee = await tx.committee.create({
        data: {
          branchId: branch.id,
          committeeName: "Test Executive Committee",
          committeeLevel: "DISTRICT",
          description: "Test governance body",
          formationDate: new Date(),
          status: "ACTIVE",
        },
      });

      const user = await tx.user.create({
        data: {
          id: `usr-gov-${Date.now()}`,
          name: "Committee Member Test",
          email: `gov-member-${Date.now()}@grovo.test`,
        },
      });

      const department = await tx.department.create({
        data: { departmentName: `GovDept-${Date.now()}` },
      });

      const designation = await tx.designation.create({
        data: {
          departmentId: department.id,
          designationName: "Test President",
          level: 1,
        },
      });

      const member = await tx.committeeMember.create({
        data: {
          committeeId: committee.id,
          memberId: user.id,
          designationId: designation.id,
          joiningDate: new Date(),
          status: "ACTIVE",
        },
      });

      if (!committee.id || !member.id)
        throw new Error("Governance pipeline incomplete");
      throw new Error("ROLLBACK");
    });
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "ROLLBACK") {
      pass("Governance → Committee Create + Member Assign");
    } else {
      fail(
        "Governance → Committee Create + Member Assign",
        e instanceof Error ? e.message : String(e),
      );
    }
  }
}

// ─── 12. Event Routes ────────────────────────────────────────────────────────
async function testEventRoutes() {
  try {
    await prisma.$transaction(async (tx) => {
      const org = await tx.organization.create({
        data: {
          organizationName: `EvtOrg-${Date.now()}`,
          organizationCode: `ORG-EVT-${Date.now()}`,
        },
      });

      const branch = await tx.branch.create({
        data: {
          branchCode: `BR-EVT-${Date.now()}`,
          branchName: "Event Test Branch",
          organizationId: org.id,
          branchType: "DISTRICT_OFFICE",
          address: "Rangpur Base",
        },
      });

      const category = await tx.eventCategory.create({
        data: { name: "Test Fundraiser" },
      });

      const event = await tx.event.create({
        data: {
          eventCode: `EVT-TEST-${Date.now()}`,
          title: "Annual Charity Gala",
          slug: `annual-charity-gala-${Date.now()}`,
          categoryId: category.id,
          eventType: "FUNDRAISER",
          branchId: branch.id,
          venue: "Convention Center Hall A",
          startDate: new Date(),
          endDate: new Date(Date.now() + 86400000),
          createdBy: TEST_UID,
          status: "ACTIVE",
        },
      });

      const user = await tx.user.create({
        data: {
          id: `usr-evt-att-${Date.now()}`,
          name: "Event Attendee",
          email: `evt-attend-${Date.now()}@grovo.test`,
        },
      });

      const attendance = await tx.eventAttendance.create({
        data: {
          eventId: event.id,
          userId: user.id,
          checkInTime: new Date(),
          attendanceStatus: "PRESENT",
        },
      });

      if (!event.id || !attendance.id)
        throw new Error("Event pipeline incomplete");
      throw new Error("ROLLBACK");
    });
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "ROLLBACK") {
      pass("Events → Schedule Event + Attendance Check-in");
    } else {
      fail(
        "Events → Schedule Event + Attendance Check-in",
        e instanceof Error ? e.message : String(e),
      );
    }
  }
}

// ─── 13. CMS / Content Routes ────────────────────────────────────────────────
async function testCmsRoutes() {
  try {
    await prisma.$transaction(async (tx) => {
      const page = await tx.cMSPage.create({
        data: {
          title: "About Our Mission",
          slug: `about-mission-${Date.now()}`,
          metaTitle: "GROVO — Our Mission",
          metaDesc: "Learn about GROVO's mission to serve communities.", // Fixed parameter field alignment name
          template: "default",
          status: "DRAFT",
        },
      });

      const story = await tx.successStory.create({
        data: {
          title: "How GROVO Transformed a Village",
          slug: `village-transform-${Date.now()}`,
          content: "A comprehensive account of community impact...",
          publishedBy: TEST_UID,
          status: "PUBLISHED",
          publishedAt: new Date(),
        },
      });

      if (!page.id || !story.id) throw new Error("CMS pipeline incomplete");
      throw new Error("ROLLBACK");
    });
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "ROLLBACK") {
      pass("CMS → Page Create + Impact Story Publish");
    } else {
      fail(
        "CMS → Page Create + Impact Story Publish",
        e instanceof Error ? e.message : String(e),
      );
    }
  }
}

// ─── 14. Financial Routes ────────────────────────────────────────────────────
async function testFinancialRoutes() {
  try {
    await prisma.$transaction(async (tx) => {
      const fundA = await tx.fund.create({
        data: {
          fundName: "Test Relief Fund A",
          fundCode: `FUND-A-${Date.now()}`,
          description: "Emergency Capital",
          currentBalance: 500000,
          status: "ACTIVE",
        },
      });

      const fundB = await tx.fund.create({
        data: {
          fundName: "Test Education Fund B",
          fundCode: `FUND-B-${Date.now()}`,
          description: "Literacy Capital",
          currentBalance: 200000,
          status: "ACTIVE",
        },
      });

      await tx.fund.update({
        where: { id: fundA.id },
        data: { currentBalance: { decrement: 50000 } },
      });

      await tx.fund.update({
        where: { id: fundB.id },
        data: { currentBalance: { increment: 50000 } },
      });

      const transfer = await tx.fundTransfer.create({
        data: {
          fromFundId: fundA.id,
          toFundId: fundB.id,
          amount: 50000,
          reason: "Emergency reallocation",
          approvedBy: TEST_UID,
        },
      });

      if (!transfer.id) throw new Error("Fund transfer record missing id");

      const user = await tx.user.create({
        data: {
          id: `usr-fin-dnr-${Date.now()}`,
          name: "Financial Donor Account",
          email: `fin-${Date.now()}@grovo.test`,
        },
      });

      const donor = await tx.donor.create({
        data: {
          userId: user.id,
          donorCode: `DNR-FIN-${Date.now()}`,
          donorType: "INDIVIDUAL",
          status: "ACTIVE",
        },
      });

      const donationType = await tx.donationType.create({
        data: { name: "Financial Test Type" },
      });

      const donationCategory = await tx.donationCategory.create({
        data: { name: "Financial Test Category" },
      });

      const donation = await tx.donation.create({
        data: {
          donationNumber: `DN-FIN-${Date.now()}`,
          donorId: donor.id,
          amount: 10000,
          donationTypeId: donationType.id,
          categoryId: donationCategory.id,
          paymentStatus: "PENDING",
        },
      });

      const gateway = await tx.paymentGateway.create({
        data: {
          gatewayName: "NAGAD_PROD",
          merchantId: "NG-999",
          apiKey: "api-ng",
          secretKey: "sec-ng",
        },
      });

      const payment = await tx.payment.create({
        data: {
          donationId: donation.id,
          paymentMethod: "NAGAD",
          amount: 10000,
          transactionId: `TXN-FIN-${Date.now()}`,
          paymentStatus: "PENDING",
          paymentGatewayId: gateway.id,
        },
      });

      const payTx = await tx.paymentTransaction.create({
        data: {
          paymentId: payment.id,
          gatewayTransactionId: `GTX-FIN-${Date.now()}`,
          amount: 10000,
          status: "SUCCESS",
        },
      });

      await tx.payment.update({
        where: { id: payment.id },
        data: { paymentStatus: "SUCCESS", paidAt: new Date() },
      });

      if (!payTx.id) throw new Error("PaymentTransaction record missing id");
      throw new Error("ROLLBACK");
    });
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "ROLLBACK") {
      pass("Financial → Fund Transfer + Payment Verification");
    } else {
      fail(
        "Financial → Fund Transfer + Payment Verification",
        e instanceof Error ? e.message : String(e),
      );
    }
  }
}

// ─── 15. Localization Routes ─────────────────────────────────────────────────
async function testLocalizationRoutes() {
  try {
    await prisma.$transaction(async (tx) => {
      const language = await tx.language.create({
        data: {
          languageCode: `test-${Date.now()}`,
          languageName: "Test Language",
          isDefault: false,
          isRtl: false,
          status: "ACTIVE",
        },
      });

      const translation = await tx.translation.create({
        data: {
          languageId: language.id,
          key: "nav.home",
          value: "হোম",
          module: "NAVIGATION",
        },
      });
      if (!translation.id) throw new Error("Translation record missing id");

      const upserted = await tx.translation.update({
        where: {
          languageId_key: {
            languageId: language.id,
            key: "nav.home",
          },
        },
        data: { value: "হোম পেজ", updatedAt: new Date() },
      });
      if (upserted.value !== "হোম পেজ")
        throw new Error("Translation upsert failed");

      const currency = await tx.currency.create({
        data: {
          currencyCode: `TS${Date.now().toString().slice(-1)}`,
          currencyName: "Test Currency",
          symbol: "T",
          exchangeRate: 110.5,
          isDefault: false,
          status: "ACTIVE",
        },
      });
      if (!currency.id) throw new Error("Currency record missing id");

      throw new Error("ROLLBACK");
    });
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "ROLLBACK") {
      pass("Localization → Currency + Translation Upsert");
    } else {
      fail(
        "Localization → Currency + Translation Upsert",
        e instanceof Error ? e.message : String(e),
      );
    }
  }
}
// ─── 16. Support Desk Routes ─────────────────────────────────────────────────
async function testSupportRoutes() {
  try {
    await prisma.$transaction(async (tx) => {
      const ticket = await tx.supportTicket.create({
        data: {
          ticketNumber: `TCK-TEST-${Date.now()}`,
          userId: TEST_UID,
          subject: "Cannot access donation receipt",
          description:
            "The download button returns a 404 error on the receipts page.",
          category: "TECHNICAL",
          priority: "HIGH",
          status: "OPEN",
        },
      });

      const reply = await tx.ticketReply.create({
        data: {
          ticketId: ticket.id,
          userId: TEST_UID,
          message: "We are investigating this issue. Thank you for reporting.",
          isStaff: true,
        },
      });

      if (!ticket.id || !reply.id)
        throw new Error("Support pipeline incomplete");
      throw new Error("ROLLBACK");
    });
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "ROLLBACK") {
      pass("Support Desk → Open Ticket + Staff Reply");
    } else {
      fail(
        "Support Desk → Open Ticket + Staff Reply",
        e instanceof Error ? e.message : String(e),
      );
    }
  }
}

// ─── 17. Volunteer Logistics Routes ──────────────────────────────────────────
async function testVolunteerLogisticsRoutes() {
  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          id: `usr-vol-log-${Date.now()}`,
          name: "Logistics Volunteer",
          email: `logistics-${Date.now()}@grovo.test`,
        },
      });

      const org = await tx.organization.create({
        data: {
          organizationName: `LogOrg-${Date.now()}`,
          organizationCode: `ORG-LOG-${Date.now()}`,
        },
      });

      const branch = await tx.branch.create({
        data: {
          branchCode: `BR-LOG-${Date.now()}`,
          branchName: "Logistics Branch",
          organizationId: org.id,
          branchType: "UNION_OFFICE",
          address: "Khulna Center",
        },
      });

      const volunteer = await tx.volunteer.create({
        data: {
          userId: user.id,
          volunteerCode: `VOL-LOG-${Date.now()}`,
          branchId: branch.id,
          status: "ACTIVE",
        },
      });

      const assignment = await tx.volunteerAssignment.create({
        data: {
          volunteerId: volunteer.id,
          assignedBy: TEST_UID,
          assignedRole: "Logistics Asset Driver",
          status: "ACTIVE",
        },
      });

      const schedule = await tx.volunteerSchedule.create({
        data: {
          volunteerId: volunteer.id,
          assignmentId: assignment.id,
          scheduleDate: new Date(), // Fixed key parameter spelling name variant
          startTime: "09:00",
          endTime: "17:00",
          status: "SCHEDULED",
        },
      });

      const attendance = await tx.volunteerAttendance.create({
        data: {
          volunteerId: volunteer.id,
          scheduleId: schedule.id,
          checkInTime: new Date(),
          attendanceStatus: "PRESENT",
        },
      });

      const expense = await tx.volunteerExpense.create({
        data: {
          volunteerId: volunteer.id,
          activityId: schedule.id,
          expenseType: "TRANSPORT",
          amount: 350.0,
          description: "Auto-rickshaw to field site",
          status: "PENDING",
        },
      });

      if (!attendance.id || !expense.id)
        throw new Error("Volunteer logistics pipeline incomplete");

      throw new Error("ROLLBACK");
    });
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "ROLLBACK") {
      pass("Volunteer Logistics → Attendance + Expense Submit");
    } else {
      fail(
        "Volunteer Logistics → Attendance + Expense Submit",
        e instanceof Error ? e.message : String(e),
      );
    }
  }
}
// ─── 18. Automation Routes ───────────────────────────────────────────────────
async function testAutomationRoutes() {
  try {
    await prisma.$transaction(async (tx) => {
      const task = await tx.autoTask.create({
        data: {
          taskName: "Generate Weekly Donation Report",
          taskType: "REPORT_GENERATION",
          scheduledAt: new Date(Date.now() + 604800000),
          status: "PENDING",
          payload: '{"format":"PDF","scope":"all_branches"}',
        },
      });

      const log = await tx.automationLog.create({
        data: {
          automationType: "CRON_JOB",
          triggerEvent: "WEEKLY_TIMER",
          action: "GENERATE_REPORT",
          status: "SUCCESS",
        },
      });

      if (!task.id || !log.id)
        throw new Error("Automation pipeline incomplete");
      throw new Error("ROLLBACK");
    });
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "ROLLBACK") {
      pass("Automation → Schedule Task + Log Execution");
    } else {
      fail(
        "Automation → Schedule Task + Log Execution",
        e instanceof Error ? e.message : String(e),
      );
    }
  }
}

// ─── 19. Inventory Desk Routes ───────────────────────────────────────────────
async function testInventoryRoutes() {
  try {
    await prisma.$transaction(async (tx) => {
      const org = await tx.organization.create({
        data: {
          organizationName: `InvOrg-${Date.now()}`,
          organizationCode: `ORG-INV-${Date.now()}`,
        },
      });

      const branch = await tx.branch.create({
        data: {
          branchCode: `BR-INV-${Date.now()}`,
          branchName: "Inventory Test Branch",
          organizationId: org.id,
          branchType: "UNION_OFFICE",
          address: "Barisal Warehouse Base",
        },
      });

      const stock = await tx.branchInventory.create({
        data: {
          branchId: branch.id,
          itemName: "Emergency Rice Packs",
          quantity: 500,
          unit: "KG",
          location: "Warehouse A",
          status: "AVAILABLE",
        },
      });
      if (!stock.id) throw new Error("BranchInventory record missing id");

      const campaignCat = await tx.campaignCategory.create({
        data: { name: "Inventory Test Campaign Cluster" },
      });

      const campaign = await tx.campaign.create({
        data: {
          campaignCode: `CAM-INV-${Date.now()}`,
          title: "Inventory Verification Drive",
          slug: `inv-verification-drive-${Date.now()}`,
          categoryId: campaignCat.id,
          campaignType: "REGULAR",
          targetAmount: 50000,
          startDate: new Date(),
          endDate: new Date(Date.now() + 86400000),
          createdBy: TEST_UID,
        },
      });

      const distRecord = await tx.distributionCampaign.create({
        data: {
          campaignId: campaign.id,
          title: "Barisal Hub Operational Handout",
          distributionDate: new Date(),
          status: "ACTIVE",
        },
      });

      const reliefPackage = await tx.reliefPackage.create({
        data: {
          packageName: "Standard Ration Box",
          estimatedValue: 1200.0,
          status: "ACTIVE",
        },
      });

      // Provision a valid structural Beneficiary relationship to satisfy the foreign key constraint
      const mockBeneficiary = await tx.beneficiary.create({
        data: {
          beneficiaryCode: `BEN-INV-${Date.now()}`,
          fullName: "Logistics Recipient Target",
          branchId: branch.id,
          status: "ACTIVE",
        },
      });

      const recordLog = await tx.distributionRecord.create({
        data: {
          beneficiaryId: mockBeneficiary.id, // Bound directly to valid verified relational ID instance
          distributionCampaignId: distRecord.id,
          packageId: reliefPackage.id,
          distributedBy: TEST_UID,
          status: "COMPLETED",
        },
      });

      const reliefItem = await tx.reliefItem.create({
        data: {
          packageId: reliefPackage.id,
          itemName: "Rice Pack 10kg",
          quantity: 1.0,
          unit: "PACK",
          estimatedPrice: 650.0,
        },
      });

      const distItem = await tx.distributionItem.create({
        data: {
          distributionRecordId: recordLog.id,
          reliefItemId: reliefItem.id,
          quantity: 25,
          remarks: "Flood relief batch",
        },
      });
      if (!distItem.id) throw new Error("DistributionItem record missing id");

      throw new Error("ROLLBACK");
    });
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "ROLLBACK") {
      pass("Inventory Desk → Stock Update + Item Distribution");
    } else {
      fail(
        "Inventory Desk → Stock Update + Item Distribution",
        e instanceof Error ? e.message : String(e),
      );
    }
  }
}
// ─── 20. Field Desk Routes ───────────────────────────────────────────────────
async function testFieldActivityRoutes() {
  try {
    await prisma.$transaction(async (tx) => {
      const org = await tx.organization.create({
        data: {
          organizationName: `FieldOrg-${Date.now()}`,
          organizationCode: `ORG-FLD-${Date.now()}`,
        },
      });

      const branch = await tx.branch.create({
        data: {
          branchCode: `BR-FLD-${Date.now()}`,
          branchName: "Field Test Branch",
          organizationId: org.id,
          branchType: "UNION_OFFICE",
          address: "Mymensingh Field Hub",
        },
      });

      const campaignCat = await tx.campaignCategory.create({
        data: { name: "Field Activity Category Cluster" },
      });

      const campaign = await tx.campaign.create({
        data: {
          campaignCode: `CAM-FLD-${Date.now()}`,
          title: "Field Deployment Campaign",
          slug: `field-deployment-campaign-${Date.now()}`,
          categoryId: campaignCat.id,
          campaignType: "REGULAR",
          targetAmount: 30000,
          startDate: new Date(),
          endDate: new Date(Date.now() + 86400000),
          createdBy: TEST_UID,
        },
      });

      const project = await tx.project.create({
        data: {
          projectCode: `PRJ-TEST-${Date.now()}`,
          projectName: "Clean Water Initiative",
          campaignId: campaign.id,
          branchId: branch.id,
          startDate: new Date(),
          endDate: new Date(Date.now() + 86400000),
          status: "ACTIVE",
        },
      });

      const activity = await tx.fieldActivity.create({
        data: {
          projectId: project.id,
          activityTitle: "Well Drilling Survey",
          activityType: "SURVEY",
          location: "Chapai Nawabganj",
          description: "Initial survey for tube-well installation sites",
          performedBy: TEST_UID,
          activityDate: new Date(),
        },
      });

      const visit = await tx.fieldVisit.create({
        data: {
          activityId: activity.id,
          visitedBy: TEST_UID,
          visitDate: new Date(),
          remarks: "Site approved for Phase-1 drilling",
        },
      });

      if (!activity.id || !visit.id)
        throw new Error("Field activity pipeline incomplete");

      throw new Error("ROLLBACK");
    });
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "ROLLBACK") {
      pass("Field Desk → Activity Log + Field Visit");
    } else {
      fail(
        "Field Desk → Activity Log + Field Visit",
        e instanceof Error ? e.message : String(e),
      );
    }
  }
}

// ─── 21. User Route (Root Router) ────────────────────────────────────────────
async function testUserRoute() {
  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          id: `usr-root-test-${Date.now()}`,
          name: "Route Health User",
          email: `user-route-${Date.now()}@grovo.test`,
        },
      });
      if (!user.id) throw new Error("User record missing id");

      const found = await tx.user.findUnique({ where: { id: user.id } });
      if (!found) throw new Error("User findUnique returned null");

      throw new Error("ROLLBACK");
    });
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "ROLLBACK") {
      pass("User Route → User Model CRUD");
    } else {
      fail(
        "User Route → User Model CRUD",
        e instanceof Error ? e.message : String(e),
      );
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN RUNNER MATRIX ORCHESTRATION
// ═══════════════════════════════════════════════════════════════════════════════
async function runAllTests() {
  console.log("");
  console.log(
    "╔══════════════════════════════════════════════════════════════════╗",
  );
  console.log(
    "║    GROVO — Full Database & Route Pipeline Verification Suite     ║",
  );
  console.log(
    "╚══════════════════════════════════════════════════════════════════╝",
  );
  console.log("");

  const startTime = Date.now();

  console.log(
    "━━━ Phase 1: Database Connection ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  );
  await testConnection();

  console.log(
    "━━━ Phase 2: Route → Service → Prisma Pipeline Tests ━━━━━━━━━━━━",
  );

  const routeTests = [
    { name: "Security Vault", fn: testSecurityRoutes },
    { name: "Donations", fn: testDonationRoutes },
    { name: "Volunteers", fn: testVolunteerRoutes },
    { name: "Beneficiaries", fn: testBeneficiaryRoutes },
    { name: "AI (Predictions)", fn: testAiRoutes },
    { name: "AI Engine (Models)", fn: testAiEngineRoutes },
    { name: "Analytics", fn: testAnalyticsRoutes },
    { name: "Media Vault", fn: testMediaRoutes },
    { name: "Notifications", fn: testNotificationRoutes },
    { name: "Governance", fn: testGovernanceRoutes },
    { name: "Events", fn: testEventRoutes },
    { name: "CMS / Content", fn: testCmsRoutes },
    { name: "Financial", fn: testFinancialRoutes },
    { name: "Localization", fn: testLocalizationRoutes },
    { name: "Support Desk", fn: testSupportRoutes },
    { name: "Volunteer Logistics", fn: testVolunteerLogisticsRoutes },
    { name: "Automation", fn: testAutomationRoutes },
    { name: "Inventory Desk", fn: testInventoryRoutes },
    { name: "Field Desk", fn: testFieldActivityRoutes },
    { name: "User Route", fn: testUserRoute },
  ];

  for (const test of routeTests) {
    process.stdout.write(`  🔄 Testing ${test.name}...`);
    await test.fn();
    const lastResult = results[results.length - 1];
    if (lastResult.status === "PASS") {
      console.log(` ✅ PASS`);
    } else {
      console.log(` ❌ FAIL → ${lastResult.detail}`);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  const passed = results.filter((r) => r.status === "PASS").length;
  const failed = results.filter((r) => r.status === "FAIL").length;
  const total = results.length;

  console.log("");
  console.log(
    "╔══════════════════════════════════════════════════════════════════╗",
  );
  console.log(
    "║                   TEST RESULTS SUMMARY                           ║",
  );
  console.log(
    "╠══════════════════════════════════════════════════════════════════╣",
  );
  console.log(`║  Total Tests   : ${total.toString().padEnd(45)}║`);
  console.log(`║  Passed        : ${passed.toString().padEnd(45)}║`);
  console.log(`║  Failed        : ${failed.toString().padEnd(45)}║`);
  console.log(`║  Duration      : ${(elapsed + "s").padEnd(45)}║`);
  console.log(
    `║  Status        : ${failed === 0 ? "🎉 ALL GREEN — PIPELINE VERIFIED!        " : "⚠️  SOME TESTS FAILED — CHECK ABOVE       "}║`,
  );
  console.log(
    "╚══════════════════════════════════════════════════════════════════╝",
  );
  console.log("");

  if (failed > 0) {
    console.log("❌ Failed tests:");
    results
      .filter((r) => r.status === "FAIL")
      .forEach((r) => console.log(`   • ${r.name}: ${r.detail}`));
    console.log("");
  }
}

runAllTests()
  .catch((err) => {
    console.error("💥 Unhandled fatal error:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🔌 Database connection closed.");
  });
