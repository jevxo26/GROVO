import status from "http-status";
import { reportsExportService } from "../../../services/analytics_reports_service/reportsExport.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 18. REPORT EXPORT CONTROLLERS ====================
export const createReportExport = catchAsync(async (req, res) => {
  const result = await reportsExportService.createReportExport(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Report export created successfully",
    data: result,
  });
});

export const getAllReportExports = catchAsync(async (req, res) => {
  const result = await reportsExportService.getAllReportExports(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Report exports retrieved successfully",
    data: result,
  });
});

export const getReportExportById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.getReportExportById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Report export retrieved successfully",
    data: result,
  });
});

export const updateReportExport = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.updateReportExport(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Report export updated successfully",
    data: result,
  });
});

export const deleteReportExport = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.deleteReportExport(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Report export deleted successfully",
    data: result,
  });
});
