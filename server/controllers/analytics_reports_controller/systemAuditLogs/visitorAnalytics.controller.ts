import status from "http-status";
import { systemAuditLogsService } from "../../../services/analytics_reports_service/systemAuditLogs.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 22. VISITOR ANALYTICS CONTROLLERS ====================
export const createVisitorAnalytics = catchAsync(async (req, res) => {
  const result = await systemAuditLogsService.createVisitorAnalytics(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Visitor analytics created successfully",
    data: result,
  });
});

export const getAllVisitorAnalytics = catchAsync(async (req, res) => {
  const result = await systemAuditLogsService.getAllVisitorAnalytics();
  sendResponse(res, {
    statusCode: status.OK,
    message: "Visitor analytics retrieved successfully",
    data: result,
  });
});

export const getVisitorAnalyticsById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.getVisitorAnalyticsById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Visitor analytics retrieved successfully",
    data: result,
  });
});

export const updateVisitorAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.updateVisitorAnalytics(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Visitor analytics updated successfully",
    data: result,
  });
});

export const deleteVisitorAnalytics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.deleteVisitorAnalytics(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Visitor analytics deleted successfully",
    data: result,
  });
});
