import status from "http-status";
import { eventCoreService } from "../../../services/events_media_service/eventCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 1. EVENT CONTROLLERS ====================
export const createEvent = catchAsync(async (req, res) => {
  const result = await eventCoreService.createEvent(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Event created successfully",
    data: result,
  });
});

export const getAllEvents = catchAsync(async (req, res) => {
  const result = await eventCoreService.getAllEvents(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Events retrieved successfully",
    data: result,
  });
});

export const getEventById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.getEventById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event retrieved successfully",
    data: result,
  });
});

export const updateEvent = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.updateEvent(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event updated successfully",
    data: result,
  });
});

export const deleteEvent = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.deleteEvent(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event deleted successfully",
    data: result,
  });
});
