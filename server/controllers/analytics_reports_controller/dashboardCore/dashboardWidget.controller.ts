import status from "http-status";
import { dashboardCoreService } from "../../../services/analytics_reports_service/dashboardCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 2. DASHBOARD WIDGET CONTROLLERS ====================
export const createDashboardWidget = catchAsync(async (req, res) => {
  const result = await dashboardCoreService.createDashboardWidget(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Dashboard widget created successfully",
    data: result,
  });
});

export const getAllDashboardWidgets = catchAsync(async (req, res) => {
  const result = await dashboardCoreService.getAllDashboardWidgets(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboard widgets retrieved successfully",
    data: result,
  });
});

export const getDashboardWidgetById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.getDashboardWidgetById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboard widget retrieved successfully",
    data: result,
  });
});

export const updateDashboardWidget = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.updateDashboardWidget(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboard widget updated successfully",
    data: result,
  });
});

export const deleteDashboardWidget = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await dashboardCoreService.deleteDashboardWidget(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Dashboard widget deleted successfully",
    data: result,
  });
});
