import status from "http-status";
import { publicEngagementService } from "../../../services/events_media_service/publicEngagement.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 18. PRESS RELEASE CONTROLLERS ====================
export const createPressRelease = catchAsync(async (req, res) => {
  const result = await publicEngagementService.createPressRelease(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Press release created successfully",
    data: result,
  });
});

export const getAllPressReleases = catchAsync(async (req, res) => {
  const result = await publicEngagementService.getAllPressReleases(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Press releases retrieved successfully",
    data: result,
  });
});

export const getPressReleaseById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.getPressReleaseById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Press release retrieved successfully",
    data: result,
  });
});

export const updatePressRelease = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.updatePressRelease(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Press release updated successfully",
    data: result,
  });
});

export const deletePressRelease = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.deletePressRelease(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Press release deleted successfully",
    data: result,
  });
});
