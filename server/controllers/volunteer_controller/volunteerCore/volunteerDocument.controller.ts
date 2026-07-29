import status from "http-status";
import { volunteerCoreService } from "../../../services/volunteer_service/volunteerCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 20. VOLUNTEER DOCUMENT CONTROLLERS ====================
export const createVolunteerDocument = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.createVolunteerDocument(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer document uploaded successfully",
    data: result,
  });
});

export const getAllVolunteerDocuments = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.getAllVolunteerDocuments(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer documents retrieved successfully",
    data: result,
  });
});

export const getVolunteerDocumentById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.getVolunteerDocumentById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer document retrieved successfully",
    data: result,
  });
});

export const updateVolunteerDocument = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.updateVolunteerDocument(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer document updated successfully",
    data: result,
  });
});

export const deleteVolunteerDocument = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerCoreService.deleteVolunteerDocument(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer document deleted successfully",
    data: result,
  });
});
