import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { volunteerOpsService } from "../../services/volunteer_service/volunteerOps.service";

const createVolunteerAssignment = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createVolunteerAssignment(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer assignment created successfully",
    data: result,
  });
});

const createVolunteerSchedule = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createVolunteerSchedule(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer schedule created successfully",
    data: result,
  });
});

const createVolunteerAttendance = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createVolunteerAttendance(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer attendance recorded successfully",
    data: result,
  });
});

const createVolunteerTask = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createVolunteerTask(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer task assigned successfully",
    data: result,
  });
});

const createFieldActivity = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createFieldActivity(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Field activity logged successfully",
    data: result,
  });
});

const createFieldVisit = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createFieldVisit(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Field visit recorded successfully",
    data: result,
  });
});

const createActivityReport = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createActivityReport(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Activity report submitted successfully",
    data: result,
  });
});

const createBeneficiaryVerification = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createBeneficiaryVerification(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary verification logged successfully",
    data: result,
  });
});

export const volunteerOpsController = {
  createVolunteerAssignment,
  createVolunteerSchedule,
  createVolunteerAttendance,
  createVolunteerTask,
  createFieldActivity,
  createFieldVisit,
  createActivityReport,
  createBeneficiaryVerification,
};
