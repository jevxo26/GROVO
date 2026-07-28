import status from "http-status";
import { mediaGalleryService } from "../../../services/events_media_service/mediaGallery.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 12. ALBUM CONTROLLERS ====================
export const createAlbum = catchAsync(async (req, res) => {
  const result = await mediaGalleryService.createAlbum(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Album created successfully",
    data: result,
  });
});

export const getAllAlbums = catchAsync(async (req, res) => {
  const result = await mediaGalleryService.getAllAlbums(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Albums retrieved successfully",
    data: result,
  });
});

export const getAlbumById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.getAlbumById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Album retrieved successfully",
    data: result,
  });
});

export const updateAlbum = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.updateAlbum(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Album updated successfully",
    data: result,
  });
});

export const deleteAlbum = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.deleteAlbum(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Album deleted successfully",
    data: result,
  });
});
