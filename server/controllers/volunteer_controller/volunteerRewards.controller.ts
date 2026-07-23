import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { volunteerRewardsService } from "../../services/volunteer_service/volunteerRewards.service";

const createVolunteerPerformance = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.createVolunteerPerformance(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer performance evaluated successfully",
    data: result,
  });
});

const createVolunteerReward = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.createVolunteerReward(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer reward granted successfully",
    data: result,
  });
});

const createVolunteerCertificate = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.createVolunteerCertificate(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer certificate issued successfully",
    data: result,
  });
});

const createVolunteerExpense = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.createVolunteerExpense(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer expense claim submitted",
    data: result,
  });
});

const createVolunteerReimbursement = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.createVolunteerReimbursement(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer reimbursement processed",
    data: result,
  });
});

const createVolunteerAnnouncement = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.createVolunteerAnnouncement(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer announcement published",
    data: result,
  });
});

const createVolunteerTraining = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.createVolunteerTraining(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer training program created",
    data: result,
  });
});

export const volunteerRewardsController = {
  createVolunteerPerformance,
  createVolunteerReward,
  createVolunteerCertificate,
  createVolunteerExpense,
  createVolunteerReimbursement,
  createVolunteerAnnouncement,
  createVolunteerTraining,
};
