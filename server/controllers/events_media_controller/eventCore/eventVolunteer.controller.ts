import status from "http-status";
import { eventCoreService } from "../../../services/events_media_service/eventCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 6. EVENT VOLUNTEER CONTROLLERS ====================
export const createEventVolunteer = catchAsync(async (req, res) => {
  const result = await eventCoreService.createEventVolunteer(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Event volunteer assigned successfully",
    data: result,
  });
});

export const getAllEventVolunteers = catchAsync(async (req, res) => {
  const result = await eventCoreService.getAllEventVolunteers(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event volunteers retrieved successfully",
    data: result,
  });
});

export const getEventVolunteerById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.getEventVolunteerById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event volunteer retrieved successfully",
    data: result,
  });
});

export const updateEventVolunteer = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.updateEventVolunteer(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event volunteer updated successfully",
    data: result,
  });
});

export const deleteEventVolunteer = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.deleteEventVolunteer(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event volunteer assignment deleted successfully",
    data: result,
  });
});
