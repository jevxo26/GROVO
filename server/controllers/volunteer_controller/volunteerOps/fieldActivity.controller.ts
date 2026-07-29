import status from "http-status";
import { volunteerOpsService } from "../../../services/volunteer_service/volunteerOps.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 9. FIELD ACTIVITY CONTROLLERS ====================
export const createFieldActivity = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createFieldActivity(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Field activity created successfully",
    data: result,
  });
});

export const getAllFieldActivities = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.getAllFieldActivities(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Field activities retrieved successfully",
    data: result,
  });
});

export const getFieldActivityById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.getFieldActivityById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Field activity retrieved successfully",
    data: result,
  });
});

export const updateFieldActivity = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.updateFieldActivity(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Field activity updated successfully",
    data: result,
  });
});

export const deleteFieldActivity = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.deleteFieldActivity(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Field activity deleted successfully",
    data: result,
  });
});
