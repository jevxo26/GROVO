import status from "http-status";
import { publicEngagementService } from "../../../services/events_media_service/publicEngagement.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 16. STORY MEDIA CONTROLLERS ====================
export const createStoryMedia = catchAsync(async (req, res) => {
  const result = await publicEngagementService.createStoryMedia(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Story media linked successfully",
    data: result,
  });
});

export const getAllStoryMedia = catchAsync(async (req, res) => {
  const result = await publicEngagementService.getAllStoryMedia(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Story media links retrieved successfully",
    data: result,
  });
});

export const getStoryMediaById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.getStoryMediaById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Story media link retrieved successfully",
    data: result,
  });
});

export const updateStoryMedia = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.updateStoryMedia(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Story media link updated successfully",
    data: result,
  });
});

export const deleteStoryMedia = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.deleteStoryMedia(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Story media link deleted successfully",
    data: result,
  });
});
