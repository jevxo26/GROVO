import status from "http-status";
import { systemAuditLogsService } from "../../../services/analytics_reports_service/systemAuditLogs.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 20. SYSTEM LOG CONTROLLERS ====================
export const createSystemLog = catchAsync(async (req, res) => {
  const result = await systemAuditLogsService.createSystemLog(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "System log recorded successfully",
    data: result,
  });
});

export const getAllSystemLogs = catchAsync(async (req, res) => {
  const result = await systemAuditLogsService.getAllSystemLogs(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "System logs retrieved successfully",
    data: result,
  });
});

export const getSystemLogById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.getSystemLogById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "System log retrieved successfully",
    data: result,
  });
});

export const deleteSystemLog = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.deleteSystemLog(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "System log deleted successfully",
    data: result,
  });
});
