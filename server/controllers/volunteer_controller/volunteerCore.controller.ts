import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { volunteerCoreService } from "../../services/volunteer_service/volunteerCore.service";

const createVolunteer = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.createVolunteer(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer registered successfully",
    data: result,
  });
});

const getAllVolunteers = catchAsync(async (_req, res) => {
  const result = await volunteerCoreService.getAllVolunteers();
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteers retrieved successfully",
    data: result,
  });
});

const createVolunteerProfile = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.createVolunteerProfile(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer profile created successfully",
    data: result,
  });
});

const createVolunteerSkill = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.createVolunteerSkill(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer skill added successfully",
    data: result,
  });
});

const createVolunteerAvailability = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.createVolunteerAvailability(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer availability logged successfully",
    data: result,
  });
});

const createVolunteerDocument = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.createVolunteerDocument(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer document uploaded successfully",
    data: result,
  });
});

const createVolunteerActivityLog = catchAsync(async (req, res) => {
  const result = await volunteerCoreService.createVolunteerActivityLog(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer activity logged successfully",
    data: result,
  });
});

export const volunteerCoreController = {
  createVolunteer,
  getAllVolunteers,
  createVolunteerProfile,
  createVolunteerSkill,
  createVolunteerAvailability,
  createVolunteerDocument,
  createVolunteerActivityLog,
};
