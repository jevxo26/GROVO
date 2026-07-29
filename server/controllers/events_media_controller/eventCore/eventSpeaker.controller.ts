import status from "http-status";
import { eventCoreService } from "../../../services/events_media_service/eventCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 5. EVENT SPEAKER CONTROLLERS ====================
export const createEventSpeaker = catchAsync(async (req, res) => {
  const result = await eventCoreService.createEventSpeaker(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Event speaker created successfully",
    data: result,
  });
});

export const getAllEventSpeakers = catchAsync(async (req, res) => {
  const result = await eventCoreService.getAllEventSpeakers(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event speakers retrieved successfully",
    data: result,
  });
});

export const getEventSpeakerById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.getEventSpeakerById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event speaker retrieved successfully",
    data: result,
  });
});

export const updateEventSpeaker = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.updateEventSpeaker(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event speaker updated successfully",
    data: result,
  });
});

export const deleteEventSpeaker = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.deleteEventSpeaker(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event speaker deleted successfully",
    data: result,
  });
});
