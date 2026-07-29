import status from "http-status";
import { eventCoreService } from "../../../services/events_media_service/eventCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 2. EVENT CATEGORY CONTROLLERS ====================
export const createEventCategory = catchAsync(async (req, res) => {
  const result = await eventCoreService.createEventCategory(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Event category created successfully",
    data: result,
  });
});

export const getAllEventCategories = catchAsync(async (req, res) => {
  const result = await eventCoreService.getAllEventCategories(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event categories retrieved successfully",
    data: result,
  });
});

export const getEventCategoryById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.getEventCategoryById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event category retrieved successfully",
    data: result,
  });
});

export const updateEventCategory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.updateEventCategory(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event category updated successfully",
    data: result,
  });
});

export const deleteEventCategory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.deleteEventCategory(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event category deleted successfully",
    data: result,
  });
});
