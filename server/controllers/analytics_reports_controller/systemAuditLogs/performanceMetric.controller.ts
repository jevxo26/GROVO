import status from "http-status";
import { systemAuditLogsService } from "../../../services/analytics_reports_service/systemAuditLogs.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 23. PERFORMANCE METRIC CONTROLLERS ====================
export const createPerformanceMetric = catchAsync(async (req, res) => {
  const result = await systemAuditLogsService.createPerformanceMetric(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Performance metric recorded successfully",
    data: result,
  });
});

export const getAllPerformanceMetrics = catchAsync(async (req, res) => {
  const result = await systemAuditLogsService.getAllPerformanceMetrics(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Performance metrics retrieved successfully",
    data: result,
  });
});

export const getPerformanceMetricById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.getPerformanceMetricById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Performance metric retrieved successfully",
    data: result,
  });
});

export const updatePerformanceMetric = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.updatePerformanceMetric(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Performance metric updated successfully",
    data: result,
  });
});

export const deletePerformanceMetric = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.deletePerformanceMetric(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Performance metric deleted successfully",
    data: result,
  });
});
