import status from "http-status";
import { publicEngagementService } from "../../../services/events_media_service/publicEngagement.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 15. SUCCESS STORY CONTROLLERS ====================
export const createSuccessStory = catchAsync(async (req, res) => {
  const result = await publicEngagementService.createSuccessStory(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Success story created successfully",
    data: result,
  });
});

export const getAllSuccessStories = catchAsync(async (req, res) => {
  const result = await publicEngagementService.getAllSuccessStories(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Success stories retrieved successfully",
    data: result,
  });
});

export const getSuccessStoryById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.getSuccessStoryById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Success story retrieved successfully",
    data: result,
  });
});

export const updateSuccessStory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.updateSuccessStory(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Success story updated successfully",
    data: result,
  });
});

export const deleteSuccessStory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.deleteSuccessStory(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Success story deleted successfully",
    data: result,
  });
});
