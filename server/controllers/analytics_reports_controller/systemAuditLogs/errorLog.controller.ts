import status from "http-status";
import { systemAuditLogsService } from "../../../services/analytics_reports_service/systemAuditLogs.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 21. ERROR LOG CONTROLLERS ====================
export const createErrorLog = catchAsync(async (req, res) => {
  const result = await systemAuditLogsService.createErrorLog(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Error log recorded successfully",
    data: result,
  });
});

export const getAllErrorLogs = catchAsync(async (req, res) => {
  const result = await systemAuditLogsService.getAllErrorLogs(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Error logs retrieved successfully",
    data: result,
  });
});

export const getErrorLogById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.getErrorLogById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Error log retrieved successfully",
    data: result,
  });
});

export const updateErrorLog = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.updateErrorLog(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Error log updated successfully",
    data: result,
  });
});

export const deleteErrorLog = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.deleteErrorLog(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Error log deleted successfully",
    data: result,
  });
});
