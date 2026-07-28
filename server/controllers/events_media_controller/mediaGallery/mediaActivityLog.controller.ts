import status from "http-status";
import { mediaGalleryService } from "../../../services/events_media_service/mediaGallery.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 21. MEDIA ACTIVITY LOG CONTROLLERS ====================
export const createMediaActivityLog = catchAsync(async (req, res) => {
  const result = await mediaGalleryService.createMediaActivityLog(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Media activity log created successfully",
    data: result,
  });
});

export const getAllMediaActivityLogs = catchAsync(async (req, res) => {
  const result = await mediaGalleryService.getAllMediaActivityLogs(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Media activity logs retrieved successfully",
    data: result,
  });
});

export const getMediaActivityLogById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.getMediaActivityLogById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Media activity log retrieved successfully",
    data: result,
  });
});

export const deleteMediaActivityLog = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await mediaGalleryService.deleteMediaActivityLog(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Media activity log deleted successfully",
    data: result,
  });
});
