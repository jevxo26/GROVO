import express from "express";
import { DashboardCoreController } from "../controllers/analytics_reports_controller/dashboardCore.controller";
import { AnalyticsMetricsController } from "../controllers/analytics_reports_controller/analyticsMetrics.controller";
import { ReportsExportController } from "../controllers/analytics_reports_controller/reportsExport.controller";
import { SystemAuditLogsController } from "../controllers/analytics_reports_controller/systemAuditLogs.controller";

const router = express.Router();

// ==========================================
// 1. DASHBOARD & KPI ROUTES (Entities 1 - 4)
// ==========================================
router.post("/dashboards", DashboardCoreController.createDashboard);
router.post(
  "/dashboards/widgets",
  DashboardCoreController.createDashboardWidget,
);
router.post(
  "/dashboards/layouts",
  DashboardCoreController.createDashboardLayout,
);
router.post("/kpis", DashboardCoreController.createKPI);
router.get("/kpis", DashboardCoreController.getKPIs);

// ==========================================
// 2. ANALYTICS ROUTES (Entities 5 - 14)
// ==========================================
router.post(
  "/analytics/snapshots",
  AnalyticsMetricsController.createAnalyticsSnapshot,
);
router.post(
  "/analytics/donations",
  AnalyticsMetricsController.createDonationAnalytics,
);
router.post(
  "/analytics/campaigns",
  AnalyticsMetricsController.createCampaignAnalytics,
);
router.post(
  "/analytics/projects",
  AnalyticsMetricsController.createProjectAnalytics,
);
router.post(
  "/analytics/volunteers",
  AnalyticsMetricsController.createVolunteerAnalytics,
);
router.post(
  "/analytics/beneficiaries",
  AnalyticsMetricsController.createBeneficiaryAnalytics,
);
router.post(
  "/analytics/branches",
  AnalyticsMetricsController.createBranchAnalytics,
);
router.post(
  "/analytics/financials",
  AnalyticsMetricsController.createFinancialAnalytics,
);
router.post(
  "/analytics/memberships",
  AnalyticsMetricsController.createMembershipAnalytics,
);
router.post(
  "/analytics/user-activities",
  AnalyticsMetricsController.createUserActivityAnalytics,
);

// ==========================================
// 3. REPORTS & EXPORT ROUTES (Entities 15 - 18)
// ==========================================
router.post("/reports", ReportsExportController.createReport);
router.post("/reports/templates", ReportsExportController.createReportTemplate);
router.post(
  "/reports/schedules",
  ReportsExportController.createScheduledReport,
);
router.post("/reports/exports", ReportsExportController.createReportExport);

// ==========================================
// 4. AUDIT, LOGS & METRICS ROUTES (Entities 19 - 23)
// ==========================================
router.post("/logs/audit", SystemAuditLogsController.createAuditLog);
router.post("/logs/system", SystemAuditLogsController.createSystemLog);
router.post("/logs/error", SystemAuditLogsController.createErrorLog);
router.post(
  "/analytics/visitors",
  SystemAuditLogsController.createVisitorAnalytics,
);
router.post(
  "/metrics/performance",
  SystemAuditLogsController.recordPerformanceMetric,
);

export const AnalyticsReportsRoutes = router;
