import status from "http-status";
import { publicEngagementService } from "../../../services/events_media_service/publicEngagement.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 20. NEWSLETTER CONTROLLERS ====================
export const createNewsletter = catchAsync(async (req, res) => {
  const result = await publicEngagementService.createNewsletter(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Newsletter created successfully",
    data: result,
  });
});

export const getAllNewsletters = catchAsync(async (req, res) => {
  const result = await publicEngagementService.getAllNewsletters(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Newsletters retrieved successfully",
    data: result,
  });
});

export const getNewsletterById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.getNewsletterById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Newsletter retrieved successfully",
    data: result,
  });
});

export const updateNewsletter = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.updateNewsletter(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Newsletter updated successfully",
    data: result,
  });
});

export const deleteNewsletter = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.deleteNewsletter(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Newsletter deleted successfully",
    data: result,
  });
});
