import status from "http-status";
import { publicEngagementService } from "../../../services/events_media_service/publicEngagement.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 14. LIVE DONATION FEED CONTROLLERS ====================
export const createLiveDonationFeed = catchAsync(async (req, res) => {
  const result = await publicEngagementService.createLiveDonationFeed(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Live donation feed created successfully",
    data: result,
  });
});

export const getAllLiveDonationFeeds = catchAsync(async (req, res) => {
  const result = await publicEngagementService.getAllLiveDonationFeeds(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Live donation feeds retrieved successfully",
    data: result,
  });
});

export const getLiveDonationFeedById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.getLiveDonationFeedById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Live donation feed retrieved successfully",
    data: result,
  });
});

export const updateLiveDonationFeed = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.updateLiveDonationFeed(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Live donation feed updated successfully",
    data: result,
  });
});

export const deleteLiveDonationFeed = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.deleteLiveDonationFeed(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Live donation feed deleted successfully",
    data: result,
  });
});
