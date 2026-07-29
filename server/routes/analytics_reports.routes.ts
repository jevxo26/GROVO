import { Router } from "express";
import { dashboardCoreController } from "../controllers/analytics_reports_controller/dashboardCore.controller";
import { analyticsMetricsController } from "../controllers/analytics_reports_controller/analyticsMetrics.controller";
import { reportsExportController } from "../controllers/analytics_reports_controller/reportsExport.controller";
import { systemAuditLogsController } from "../controllers/analytics_reports_controller/systemAuditLogs.controller";

const router = Router();

// ==================== 1. DASHBOARD & KPI ROUTES ====================
// 1. Dashboard
router.post("/dashboards", dashboardCoreController.createDashboard);
router.get("/dashboards", dashboardCoreController.getAllDashboards);
router.get("/dashboards/:id", dashboardCoreController.getDashboardById);
router.patch("/dashboards/:id", dashboardCoreController.updateDashboard);
router.delete("/dashboards/:id", dashboardCoreController.deleteDashboard);

// 2. DashboardWidget
router.post("/dashboard-widgets", dashboardCoreController.createDashboardWidget);
router.get("/dashboard-widgets", dashboardCoreController.getAllDashboardWidgets);
router.get("/dashboard-widgets/:id", dashboardCoreController.getDashboardWidgetById);
router.patch("/dashboard-widgets/:id", dashboardCoreController.updateDashboardWidget);
router.delete("/dashboard-widgets/:id", dashboardCoreController.deleteDashboardWidget);

// 3. DashboardLayout
router.post("/dashboard-layouts", dashboardCoreController.createDashboardLayout);
router.get("/dashboard-layouts", dashboardCoreController.getAllDashboardLayouts);
router.get("/dashboard-layouts/:id", dashboardCoreController.getDashboardLayoutById);
router.patch("/dashboard-layouts/:id", dashboardCoreController.updateDashboardLayout);
router.delete("/dashboard-layouts/:id", dashboardCoreController.deleteDashboardLayout);

// 4. KPI
router.post("/kpis", dashboardCoreController.createKPI);
router.get("/kpis", dashboardCoreController.getAllKPIs);
router.get("/kpis/:id", dashboardCoreController.getKPIById);
router.patch("/kpis/:id", dashboardCoreController.updateKPI);
router.delete("/kpis/:id", dashboardCoreController.deleteKPI);


// ==================== 2. ANALYTICS ROUTES ====================
// 5. AnalyticsSnapshot
router.post("/analytics-snapshots", analyticsMetricsController.createAnalyticsSnapshot);
router.get("/analytics-snapshots", analyticsMetricsController.getAllAnalyticsSnapshots);
router.get("/analytics-snapshots/:id", analyticsMetricsController.getAnalyticsSnapshotById);
router.patch("/analytics-snapshots/:id", analyticsMetricsController.updateAnalyticsSnapshot);
router.delete("/analytics-snapshots/:id", analyticsMetricsController.deleteAnalyticsSnapshot);

// 6. DonationAnalytics
router.post("/donation-analytics", analyticsMetricsController.createDonationAnalytics);
router.get("/donation-analytics", analyticsMetricsController.getAllDonationAnalytics);
router.get("/donation-analytics/:id", analyticsMetricsController.getDonationAnalyticsById);
router.patch("/donation-analytics/:id", analyticsMetricsController.updateDonationAnalytics);
router.delete("/donation-analytics/:id", analyticsMetricsController.deleteDonationAnalytics);

// 7. CampaignAnalytics
router.post("/campaign-analytics", analyticsMetricsController.createCampaignAnalytics);
router.get("/campaign-analytics", analyticsMetricsController.getAllCampaignAnalytics);
router.get("/campaign-analytics/:id", analyticsMetricsController.getCampaignAnalyticsById);
router.patch("/campaign-analytics/:id", analyticsMetricsController.updateCampaignAnalytics);
router.delete("/campaign-analytics/:id", analyticsMetricsController.deleteCampaignAnalytics);

// 8. ProjectAnalytics
router.post("/project-analytics", analyticsMetricsController.createProjectAnalytics);
router.get("/project-analytics", analyticsMetricsController.getAllProjectAnalytics);
router.get("/project-analytics/:id", analyticsMetricsController.getProjectAnalyticsById);
router.patch("/project-analytics/:id", analyticsMetricsController.updateProjectAnalytics);
router.delete("/project-analytics/:id", analyticsMetricsController.deleteProjectAnalytics);

// 9. VolunteerAnalytics
router.post("/volunteer-analytics", analyticsMetricsController.createVolunteerAnalytics);
router.get("/volunteer-analytics", analyticsMetricsController.getAllVolunteerAnalytics);
router.get("/volunteer-analytics/:id", analyticsMetricsController.getVolunteerAnalyticsById);
router.patch("/volunteer-analytics/:id", analyticsMetricsController.updateVolunteerAnalytics);
router.delete("/volunteer-analytics/:id", analyticsMetricsController.deleteVolunteerAnalytics);

// 10. BeneficiaryAnalytics
router.post("/beneficiary-analytics", analyticsMetricsController.createBeneficiaryAnalytics);
router.get("/beneficiary-analytics", analyticsMetricsController.getAllBeneficiaryAnalytics);
router.get("/beneficiary-analytics/:id", analyticsMetricsController.getBeneficiaryAnalyticsById);
router.patch("/beneficiary-analytics/:id", analyticsMetricsController.updateBeneficiaryAnalytics);
router.delete("/beneficiary-analytics/:id", analyticsMetricsController.deleteBeneficiaryAnalytics);

// 11. BranchAnalytics
router.post("/branch-analytics", analyticsMetricsController.createBranchAnalytics);
router.get("/branch-analytics", analyticsMetricsController.getAllBranchAnalytics);
router.get("/branch-analytics/:id", analyticsMetricsController.getBranchAnalyticsById);
router.patch("/branch-analytics/:id", analyticsMetricsController.updateBranchAnalytics);
router.delete("/branch-analytics/:id", analyticsMetricsController.deleteBranchAnalytics);

// 12. FinancialAnalytics
router.post("/financial-analytics", analyticsMetricsController.createFinancialAnalytics);
router.get("/financial-analytics", analyticsMetricsController.getAllFinancialAnalytics);
router.get("/financial-analytics/:id", analyticsMetricsController.getFinancialAnalyticsById);
router.patch("/financial-analytics/:id", analyticsMetricsController.updateFinancialAnalytics);
router.delete("/financial-analytics/:id", analyticsMetricsController.deleteFinancialAnalytics);

// 13. MembershipAnalytics
router.post("/membership-analytics", analyticsMetricsController.createMembershipAnalytics);
router.get("/membership-analytics", analyticsMetricsController.getAllMembershipAnalytics);
router.get("/membership-analytics/:id", analyticsMetricsController.getMembershipAnalyticsById);
router.patch("/membership-analytics/:id", analyticsMetricsController.updateMembershipAnalytics);
router.delete("/membership-analytics/:id", analyticsMetricsController.deleteMembershipAnalytics);

// 14. UserActivityAnalytics
router.post("/user-activity-analytics", analyticsMetricsController.createUserActivityAnalytics);
router.get("/user-activity-analytics", analyticsMetricsController.getAllUserActivityAnalytics);
router.get("/user-activity-analytics/:id", analyticsMetricsController.getUserActivityAnalyticsById);
router.patch("/user-activity-analytics/:id", analyticsMetricsController.updateUserActivityAnalytics);
router.delete("/user-activity-analytics/:id", analyticsMetricsController.deleteUserActivityAnalytics);


// ==================== 3. REPORTING & EXPORT ROUTES ====================
// 15. Report
router.post("/reports", reportsExportController.createReport);
router.get("/reports", reportsExportController.getAllReports);
router.get("/reports/:id", reportsExportController.getReportById);
router.patch("/reports/:id", reportsExportController.updateReport);
router.delete("/reports/:id", reportsExportController.deleteReport);

// 16. ReportTemplate
router.post("/report-templates", reportsExportController.createReportTemplate);
router.get("/report-templates", reportsExportController.getAllReportTemplates);
router.get("/report-templates/:id", reportsExportController.getReportTemplateById);
router.patch("/report-templates/:id", reportsExportController.updateReportTemplate);
router.delete("/report-templates/:id", reportsExportController.deleteReportTemplate);

// 17. ScheduledReport
router.post("/scheduled-reports", reportsExportController.createScheduledReport);
router.get("/scheduled-reports", reportsExportController.getAllScheduledReports);
router.get("/scheduled-reports/:id", reportsExportController.getScheduledReportById);
router.patch("/scheduled-reports/:id", reportsExportController.updateScheduledReport);
router.delete("/scheduled-reports/:id", reportsExportController.deleteScheduledReport);

// 18. ReportExport
router.post("/report-exports", reportsExportController.createReportExport);
router.get("/report-exports", reportsExportController.getAllReportExports);
router.get("/report-exports/:id", reportsExportController.getReportExportById);
router.patch("/report-exports/:id", reportsExportController.updateReportExport);
router.delete("/report-exports/:id", reportsExportController.deleteReportExport);


// ==================== 4. AUDIT LOGS, SYSTEM LOGS & METRICS ROUTES ====================
// 19. AuditLog
router.post("/audit-logs", systemAuditLogsController.createAuditLog);
router.get("/audit-logs", systemAuditLogsController.getAllAuditLogs);
router.get("/audit-logs/:id", systemAuditLogsController.getAuditLogById);
router.delete("/audit-logs/:id", systemAuditLogsController.deleteAuditLog);

// 20. SystemLog
router.post("/system-logs", systemAuditLogsController.createSystemLog);
router.get("/system-logs", systemAuditLogsController.getAllSystemLogs);
router.get("/system-logs/:id", systemAuditLogsController.getSystemLogById);
router.delete("/system-logs/:id", systemAuditLogsController.deleteSystemLog);

// 21. ErrorLog
router.post("/error-logs", systemAuditLogsController.createErrorLog);
router.get("/error-logs", systemAuditLogsController.getAllErrorLogs);
router.get("/error-logs/:id", systemAuditLogsController.getErrorLogById);
router.patch("/error-logs/:id", systemAuditLogsController.updateErrorLog);
router.delete("/error-logs/:id", systemAuditLogsController.deleteErrorLog);

// 22. VisitorAnalytics
router.post("/visitor-analytics", systemAuditLogsController.createVisitorAnalytics);
router.get("/visitor-analytics", systemAuditLogsController.getAllVisitorAnalytics);
router.get("/visitor-analytics/:id", systemAuditLogsController.getVisitorAnalyticsById);
router.patch("/visitor-analytics/:id", systemAuditLogsController.updateVisitorAnalytics);
router.delete("/visitor-analytics/:id", systemAuditLogsController.deleteVisitorAnalytics);

// 23. PerformanceMetric
router.post("/performance-metrics", systemAuditLogsController.createPerformanceMetric);
router.get("/performance-metrics", systemAuditLogsController.getAllPerformanceMetrics);
router.get("/performance-metrics/:id", systemAuditLogsController.getPerformanceMetricById);
router.patch("/performance-metrics/:id", systemAuditLogsController.updatePerformanceMetric);
router.delete("/performance-metrics/:id", systemAuditLogsController.deletePerformanceMetric);

export const analyticsReportsRoutes = router;
export const AnalyticsReportsRoutes = router;
