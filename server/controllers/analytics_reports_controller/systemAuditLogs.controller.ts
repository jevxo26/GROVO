import status from "http-status";
import { systemAuditLogsService } from "../../services/analytics_reports_service/systemAuditLogs.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// ==================== 19. AUDIT LOG CONTROLLERS ====================
const createAuditLog = catchAsync(async (req, res) => {
  const result = await systemAuditLogsService.createAuditLog(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Audit log recorded successfully",
    data: result,
  });
});

const getAllAuditLogs = catchAsync(async (req, res) => {
  const result = await systemAuditLogsService.getAllAuditLogs(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Audit logs retrieved successfully",
    data: result,
  });
});

const getAuditLogById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.getAuditLogById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Audit log retrieved successfully",
    data: result,
  });
});

const deleteAuditLog = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.deleteAuditLog(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Audit log deleted successfully",
    data: result,
  });
});


// ==================== 20. SYSTEM LOG CONTROLLERS ====================
const createSystemLog = catchAsync(async (req, res) => {
  const result = await systemAuditLogsService.createSystemLog(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "System log recorded successfully",
    data: result,
  });
});

const getAllSystemLogs = catchAsync(async (req, res) => {
  const result = await systemAuditLogsService.getAllSystemLogs(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "System logs retrieved successfully",
    data: result,
  });
});

const getSystemLogById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.getSystemLogById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "System log retrieved successfully",
    data: result,
  });
});

const deleteSystemLog = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.deleteSystemLog(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "System log deleted successfully",
    data: result,
  });
});


// ==================== 21. ERROR LOG CONTROLLERS ====================
const createErrorLog = catchAsync(async (req, res) => {
  const result = await systemAuditLogsService.createErrorLog(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Error log recorded successfully",
    data: result,
  });
});

const getAllErrorLogs = catchAsync(async (req, res) => {
  const result = await systemAuditLogsService.getAllErrorLogs(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Error logs retrieved successfully",
    data: result,
  });
});

const getErrorLogById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.getErrorLogById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Error log retrieved successfully",
    data: result,
  });
});

const updateErrorLog = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.updateErrorLog(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Error log updated successfully",
    data: result,
  });
});

const deleteErrorLog = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.deleteErrorLog(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Error log deleted successfully",
    data: result,
  });
});


// ==================== 22. VISITOR ANALYTICS CONTROLLERS ====================
const createVisitorAnalytics = catchAsync(async (req, res) => {
  const result = await systemAuditLogsService.createVisitorAnalytics(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Visitor analytics created successfully",
    data: result,
  });
});

const getAllVisitorAnalytics = catchAsync(async (req, res) => {
  const result = await systemAuditLogsService.getAllVisitorAnalytics();
  sendResponse(res, {
    statusCode: status.OK,
    message: "Visitor analytics retrieved successfully",
    data: result,
  });
});

const getVisitorAnalyticsById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.getVisitorAnalyticsById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Visitor analytics retrieved successfully",
    data: result,
  });
});

const updateVisitorAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.updateVisitorAnalytics(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Visitor analytics updated successfully",
    data: result,
  });
});

const deleteVisitorAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.deleteVisitorAnalytics(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Visitor analytics deleted successfully",
    data: result,
  });
});


// ==================== 23. PERFORMANCE METRIC CONTROLLERS ====================
const createPerformanceMetric = catchAsync(async (req, res) => {
  const result = await systemAuditLogsService.createPerformanceMetric(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Performance metric recorded successfully",
    data: result,
  });
});

const getAllPerformanceMetrics = catchAsync(async (req, res) => {
  const result = await systemAuditLogsService.getAllPerformanceMetrics(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Performance metrics retrieved successfully",
    data: result,
  });
});

const getPerformanceMetricById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.getPerformanceMetricById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Performance metric retrieved successfully",
    data: result,
  });
});

const updatePerformanceMetric = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.updatePerformanceMetric(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Performance metric updated successfully",
    data: result,
  });
});

const deletePerformanceMetric = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.deletePerformanceMetric(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Performance metric deleted successfully",
    data: result,
  });
});


export const systemAuditLogsController = {
  // AuditLog
  createAuditLog,
  getAllAuditLogs,
  getAuditLogById,
  deleteAuditLog,
  // SystemLog
  createSystemLog,
  getAllSystemLogs,
  getSystemLogById,
  deleteSystemLog,
  // ErrorLog
  createErrorLog,
  getAllErrorLogs,
  getErrorLogById,
  updateErrorLog,
  deleteErrorLog,
  // VisitorAnalytics
  createVisitorAnalytics,
  getAllVisitorAnalytics,
  getVisitorAnalyticsById,
  updateVisitorAnalytics,
  deleteVisitorAnalytics,
  // PerformanceMetric
  createPerformanceMetric,
  getAllPerformanceMetrics,
  getPerformanceMetricById,
  updatePerformanceMetric,
  deletePerformanceMetric,
};
