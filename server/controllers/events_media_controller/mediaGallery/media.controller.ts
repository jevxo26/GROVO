import status from "http-status";
import { mediaGalleryService } from "../../../services/events_media_service/mediaGallery.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 10. MEDIA CONTROLLERS ====================
export const createMedia = catchAsync(async (req, res) => {
  const result = await mediaGalleryService.createMedia(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Media uploaded successfully",
    data: result,
  });
});

export const getAllMedia = catchAsync(async (req, res) => {
  const result = await mediaGalleryService.getAllMedia(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Media assets retrieved successfully",
    data: result,
  });
});

export const getMediaById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.getMediaById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Media asset retrieved successfully",
    data: result,
  });
});

export const updateMedia = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.updateMedia(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Media asset updated successfully",
    data: result,
  });
});

export const deleteMedia = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.deleteMedia(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Media asset deleted successfully",
    data: result,
  });
});
