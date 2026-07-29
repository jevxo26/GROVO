import status from "http-status";
import { eventCoreService } from "../../../services/events_media_service/eventCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 9. EVENT GALLERY CONTROLLERS ====================
export const createEventGallery = catchAsync(async (req, res) => {
  const result = await eventCoreService.createEventGallery(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Event gallery created successfully",
    data: result,
  });
});

export const getAllEventGalleries = catchAsync(async (req, res) => {
  const result = await eventCoreService.getAllEventGalleries(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event galleries retrieved successfully",
    data: result,
  });
});

export const getEventGalleryById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.getEventGalleryById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event gallery retrieved successfully",
    data: result,
  });
});

export const updateEventGallery = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.updateEventGallery(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event gallery updated successfully",
    data: result,
  });
});

export const deleteEventGallery = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.deleteEventGallery(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event gallery deleted successfully",
    data: result,
  });
});
