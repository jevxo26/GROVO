import status from "http-status";
import { volunteerOpsService } from "../../../services/volunteer_service/volunteerOps.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 11. ACTIVITY REPORT CONTROLLERS ====================
export const createActivityReport = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createActivityReport(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Activity report created successfully",
    data: result,
  });
});

export const getAllActivityReports = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.getAllActivityReports(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Activity reports retrieved successfully",
    data: result,
  });
});

export const getActivityReportById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.getActivityReportById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Activity report retrieved successfully",
    data: result,
  });
});

export const updateActivityReport = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.updateActivityReport(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Activity report updated successfully",
    data: result,
  });
});

export const deleteActivityReport = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.deleteActivityReport(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Activity report deleted successfully",
    data: result,
  });
});
