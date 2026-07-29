import status from "http-status";
import { dashboardCoreService } from "../../../services/analytics_reports_service/dashboardCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 4. KPI CONTROLLERS ====================
export const createKPI = catchAsync(async (req, res) => {
  const result = await dashboardCoreService.createKPI(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "KPI created successfully",
    data: result,
  });
});

export const getAllKPIs = catchAsync(async (req, res) => {
  const result = await dashboardCoreService.getAllKPIs(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "KPIs retrieved successfully",
    data: result,
  });
});

export const getKPIById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.getKPIById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "KPI retrieved successfully",
    data: result,
  });
});

export const updateKPI = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.updateKPI(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "KPI updated successfully",
    data: result,
  });
});

export const deleteKPI = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.deleteKPI(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "KPI deleted successfully",
    data: result,
  });
});
