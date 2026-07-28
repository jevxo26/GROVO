import status from "http-status";
import { mediaGalleryService } from "../../services/events_media_service/mediaGallery.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// ==================== 11. MEDIA CATEGORY CONTROLLERS ====================
const createMediaCategory = catchAsync(async (req, res) => {
  const result = await mediaGalleryService.createMediaCategory(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Media category created successfully",
    data: result,
  });
});

const getAllMediaCategories = catchAsync(async (req, res) => {
  const result = await mediaGalleryService.getAllMediaCategories();
  sendResponse(res, {
    statusCode: status.OK,
    message: "Media categories retrieved successfully",
    data: result,
  });
});

const getMediaCategoryById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.getMediaCategoryById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Media category retrieved successfully",
    data: result,
  });
});

const updateMediaCategory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.updateMediaCategory(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Media category updated successfully",
    data: result,
  });
});

const deleteMediaCategory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.deleteMediaCategory(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Media category deleted successfully",
    data: result,
  });
});


// ==================== 10. MEDIA CONTROLLERS ====================
const createMedia = catchAsync(async (req, res) => {
  const result = await mediaGalleryService.createMedia(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Media uploaded successfully",
    data: result,
  });
});

const getAllMedia = catchAsync(async (req, res) => {
  const result = await mediaGalleryService.getAllMedia(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Media assets retrieved successfully",
    data: result,
  });
});

const getMediaById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.getMediaById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Media asset retrieved successfully",
    data: result,
  });
});

const updateMedia = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.updateMedia(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Media asset updated successfully",
    data: result,
  });
});

const deleteMedia = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.deleteMedia(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Media asset deleted successfully",
    data: result,
  });
});


// ==================== 12. ALBUM CONTROLLERS ====================
const createAlbum = catchAsync(async (req, res) => {
  const result = await mediaGalleryService.createAlbum(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Album created successfully",
    data: result,
  });
});

const getAllAlbums = catchAsync(async (req, res) => {
  const result = await mediaGalleryService.getAllAlbums(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Albums retrieved successfully",
    data: result,
  });
});

const getAlbumById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.getAlbumById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Album retrieved successfully",
    data: result,
  });
});

const updateAlbum = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.updateAlbum(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Album updated successfully",
    data: result,
  });
});

const deleteAlbum = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.deleteAlbum(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Album deleted successfully",
    data: result,
  });
});


// ==================== 13. ALBUM MEDIA CONTROLLERS ====================
const createAlbumMedia = catchAsync(async (req, res) => {
  const result = await mediaGalleryService.createAlbumMedia(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Media attached to album successfully",
    data: result,
  });
});

const getAllAlbumMedia = catchAsync(async (req, res) => {
  const result = await mediaGalleryService.getAllAlbumMedia(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Album media links retrieved successfully",
    data: result,
  });
});

const getAlbumMediaById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.getAlbumMediaById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Album media link retrieved successfully",
    data: result,
  });
});

const updateAlbumMedia = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.updateAlbumMedia(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Album media link updated successfully",
    data: result,
  });
});

const deleteAlbumMedia = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.deleteAlbumMedia(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Album media link deleted successfully",
    data: result,
  });
});


// ==================== 21. MEDIA ACTIVITY LOG CONTROLLERS ====================
const createMediaActivityLog = catchAsync(async (req, res) => {
  const result = await mediaGalleryService.createMediaActivityLog(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Media activity log created successfully",
    data: result,
  });
});

const getAllMediaActivityLogs = catchAsync(async (req, res) => {
  const result = await mediaGalleryService.getAllMediaActivityLogs(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Media activity logs retrieved successfully",
    data: result,
  });
});

const getMediaActivityLogById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.getMediaActivityLogById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Media activity log retrieved successfully",
    data: result,
  });
});

const deleteMediaActivityLog = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.deleteMediaActivityLog(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Media activity log deleted successfully",
    data: result,
  });
});


export const mediaGalleryController = {
  // MediaCategory
  createMediaCategory,
  getAllMediaCategories,
  getMediaCategoryById,
  updateMediaCategory,
  deleteMediaCategory,
  // Media
  createMedia,
  getAllMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
  // Album
  createAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
  // AlbumMedia
  createAlbumMedia,
  getAllAlbumMedia,
  getAlbumMediaById,
  updateAlbumMedia,
  deleteAlbumMedia,
  // MediaActivityLog
  createMediaActivityLog,
  getAllMediaActivityLogs,
  getMediaActivityLogById,
  deleteMediaActivityLog,
};
