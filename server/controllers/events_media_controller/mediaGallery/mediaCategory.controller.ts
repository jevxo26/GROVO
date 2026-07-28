import status from "http-status";
import { mediaGalleryService } from "../../../services/events_media_service/mediaGallery.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 11. MEDIA CATEGORY CONTROLLERS ====================
export const createMediaCategory = catchAsync(async (req, res) => {
  const result = await mediaGalleryService.createMediaCategory(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Media category created successfully",
    data: result,
  });
});

export const getAllMediaCategories = catchAsync(async (req, res) => {
  const result = await mediaGalleryService.getAllMediaCategories();
  sendResponse(res, {
    statusCode: status.OK,
    message: "Media categories retrieved successfully",
    data: result,
  });
});

export const getMediaCategoryById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.getMediaCategoryById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Media category retrieved successfully",
    data: result,
  });
});

export const updateMediaCategory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.updateMediaCategory(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Media category updated successfully",
    data: result,
  });
});

export const deleteMediaCategory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.deleteMediaCategory(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Media category deleted successfully",
    data: result,
  });
});
