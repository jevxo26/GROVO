import status from "http-status";
import { eventCoreService } from "../../../services/events_media_service/eventCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 3. EVENT REGISTRATION CONTROLLERS ====================
export const createEventRegistration = catchAsync(async (req, res) => {
  const result = await eventCoreService.createEventRegistration(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Event registration created successfully",
    data: result,
  });
});

export const getAllEventRegistrations = catchAsync(async (req, res) => {
  const result = await eventCoreService.getAllEventRegistrations(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event registrations retrieved successfully",
    data: result,
  });
});

export const getEventRegistrationById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.getEventRegistrationById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event registration retrieved successfully",
    data: result,
  });
});

export const updateEventRegistration = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.updateEventRegistration(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event registration updated successfully",
    data: result,
  });
});

export const deleteEventRegistration = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.deleteEventRegistration(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event registration deleted successfully",
    data: result,
  });
});
