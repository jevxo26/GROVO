import status from "http-status";
import { eventCoreService } from "../../../services/events_media_service/eventCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 4. EVENT ATTENDANCE CONTROLLERS ====================
export const createEventAttendance = catchAsync(async (req, res) => {
  const result = await eventCoreService.createEventAttendance(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Event attendance recorded successfully",
    data: result,
  });
});

export const getAllEventAttendances = catchAsync(async (req, res) => {
  const result = await eventCoreService.getAllEventAttendances(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event attendances retrieved successfully",
    data: result,
  });
});

export const getEventAttendanceById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.getEventAttendanceById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event attendance retrieved successfully",
    data: result,
  });
});

export const updateEventAttendance = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.updateEventAttendance(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event attendance updated successfully",
    data: result,
  });
});

export const deleteEventAttendance = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.deleteEventAttendance(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event attendance deleted successfully",
    data: result,
  });
});
