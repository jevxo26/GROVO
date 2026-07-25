import status from "http-status";
import { financialReportService } from "../../services/payment/financialReport.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const generateFinancialReport = catchAsync(async (req, res) => {
  const authenticatedUserId = req.user?.userId;
  const result = await financialReportService.generateFinancialReport(authenticatedUserId, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Financial report generated successfully",
    data: result,
  });
});

const getAllFinancialReports = catchAsync(async (req, res) => {
  const query = {
    reportType: req.query.reportType as string | undefined,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await financialReportService.getAllFinancialReports(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Financial reports fetched successfully",
    data: result,
  });
});

const getFinancialReportById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await financialReportService.getFinancialReportById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Financial report fetched successfully",
    data: result,
  });
});

const deleteFinancialReport = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await financialReportService.deleteFinancialReport(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Financial report deleted successfully",
    data: result,
  });
});

export const financialReportController = {
  generateFinancialReport,
  getAllFinancialReports,
  getFinancialReportById,
  deleteFinancialReport,
};
