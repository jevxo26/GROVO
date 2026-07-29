import status from "http-status";
import { mediaGalleryService } from "../../../services/events_media_service/mediaGallery.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 13. ALBUM MEDIA CONTROLLERS ====================
export const createAlbumMedia = catchAsync(async (req, res) => {
  const result = await mediaGalleryService.createAlbumMedia(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Media attached to album successfully",
    data: result,
  });
});

export const getAllAlbumMedia = catchAsync(async (req, res) => {
  const result = await mediaGalleryService.getAllAlbumMedia(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Album media links retrieved successfully",
    data: result,
  });
});

export const getAlbumMediaById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.getAlbumMediaById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Album media link retrieved successfully",
    data: result,
  });
});

export const updateAlbumMedia = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.updateAlbumMedia(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Album media link updated successfully",
    data: result,
  });
});

export const deleteAlbumMedia = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.deleteAlbumMedia(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Album media link deleted successfully",
    data: result,
  });
});
