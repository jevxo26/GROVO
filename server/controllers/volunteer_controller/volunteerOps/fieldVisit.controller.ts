import status from "http-status";
import { volunteerOpsService } from "../../../services/volunteer_service/volunteerOps.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 10. FIELD VISIT CONTROLLERS ====================
export const createFieldVisit = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createFieldVisit(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Field visit created successfully",
    data: result,
  });
});

export const getAllFieldVisits = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.getAllFieldVisits(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Field visits retrieved successfully",
    data: result,
  });
});

export const getFieldVisitById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.getFieldVisitById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Field visit retrieved successfully",
    data: result,
  });
});

export const updateFieldVisit = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.updateFieldVisit(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Field visit updated successfully",
    data: result,
  });
});

export const deleteFieldVisit = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.deleteFieldVisit(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Field visit deleted successfully",
    data: result,
  });
});
