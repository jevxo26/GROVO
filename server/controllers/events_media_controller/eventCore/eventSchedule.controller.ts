import status from "http-status";
import { eventCoreService } from "../../../services/events_media_service/eventCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 7. EVENT SCHEDULE CONTROLLERS ====================
export const createEventSchedule = catchAsync(async (req, res) => {
  const result = await eventCoreService.createEventSchedule(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Event schedule created successfully",
    data: result,
  });
});

export const getAllEventSchedules = catchAsync(async (req, res) => {
  const result = await eventCoreService.getAllEventSchedules(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event schedules retrieved successfully",
    data: result,
  });
});

export const getEventScheduleById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.getEventScheduleById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event schedule retrieved successfully",
    data: result,
  });
});

export const updateEventSchedule = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.updateEventSchedule(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event schedule updated successfully",
    data: result,
  });
});

export const deleteEventSchedule = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.deleteEventSchedule(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event schedule deleted successfully",
    data: result,
  });
});
