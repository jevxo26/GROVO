import status from "http-status";
import { systemAuditLogsService } from "../../../services/analytics_reports_service/systemAuditLogs.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 19. AUDIT LOG CONTROLLERS ====================
export const createAuditLog = catchAsync(async (req, res) => {
  const result = await systemAuditLogsService.createAuditLog(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Audit log recorded successfully",
    data: result,
  });
});

export const getAllAuditLogs = catchAsync(async (req, res) => {
  const result = await systemAuditLogsService.getAllAuditLogs(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Audit logs retrieved successfully",
    data: result,
  });
});

export const getAuditLogById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.getAuditLogById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Audit log retrieved successfully",
    data: result,
  });
});

export const deleteAuditLog = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await systemAuditLogsService.deleteAuditLog(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Audit log deleted successfully",
    data: result,
  });
});
