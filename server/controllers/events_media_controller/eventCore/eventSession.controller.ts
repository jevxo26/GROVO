import status from "http-status";
import { eventCoreService } from "../../../services/events_media_service/eventCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 8. EVENT SESSION CONTROLLERS ====================
export const createEventSession = catchAsync(async (req, res) => {
  const result = await eventCoreService.createEventSession(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Event session created successfully",
    data: result,
  });
});

export const getAllEventSessions = catchAsync(async (req, res) => {
  const result = await eventCoreService.getAllEventSessions(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event sessions retrieved successfully",
    data: result,
  });
});

export const getEventSessionById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.getEventSessionById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event session retrieved successfully",
    data: result,
  });
});

export const updateEventSession = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.updateEventSession(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event session updated successfully",
    data: result,
  });
});

export const deleteEventSession = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.deleteEventSession(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event session deleted successfully",
    data: result,
  });
});
