import status from "http-status";
import { publicEngagementService } from "../../../services/events_media_service/publicEngagement.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 19. NEWS CONTROLLERS ====================
export const createNews = catchAsync(async (req, res) => {
  const result = await publicEngagementService.createNews(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "News item created successfully",
    data: result,
  });
});

export const getAllNews = catchAsync(async (req, res) => {
  const result = await publicEngagementService.getAllNews(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "News items retrieved successfully",
    data: result,
  });
});

export const getNewsById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.getNewsById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "News item retrieved successfully",
    data: result,
  });
});

export const updateNews = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.updateNews(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "News item updated successfully",
    data: result,
  });
});

export const deleteNews = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.deleteNews(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "News item deleted successfully",
    data: result,
  });
});
