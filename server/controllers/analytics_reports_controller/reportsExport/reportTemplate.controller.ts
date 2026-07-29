import status from "http-status";
import { reportsExportService } from "../../../services/analytics_reports_service/reportsExport.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 16. REPORT TEMPLATE CONTROLLERS ====================
export const createReportTemplate = catchAsync(async (req, res) => {
  const result = await reportsExportService.createReportTemplate(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Report template created successfully",
    data: result,
  });
});

export const getAllReportTemplates = catchAsync(async (req, res) => {
  const result = await reportsExportService.getAllReportTemplates(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Report templates retrieved successfully",
    data: result,
  });
});

export const getReportTemplateById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.getReportTemplateById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Report template retrieved successfully",
    data: result,
  });
});

export const updateReportTemplate = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.updateReportTemplate(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Report template updated successfully",
    data: result,
  });
});

export const deleteReportTemplate = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await reportsExportService.deleteReportTemplate(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Report template deleted successfully",
    data: result,
  });
});
