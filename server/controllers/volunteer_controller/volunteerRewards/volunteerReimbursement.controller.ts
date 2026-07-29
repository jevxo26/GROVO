import status from "http-status";
import { volunteerRewardsService } from "../../../services/volunteer_service/volunteerRewards.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 17. VOLUNTEER REIMBURSEMENT CONTROLLERS ====================
export const createVolunteerReimbursement = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.createVolunteerReimbursement(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer reimbursement created successfully",
    data: result,
  });
});

export const getAllVolunteerReimbursements = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.getAllVolunteerReimbursements(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer reimbursements retrieved successfully",
    data: result,
  });
});

export const getVolunteerReimbursementById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.getVolunteerReimbursementById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer reimbursement retrieved successfully",
    data: result,
  });
});

export const updateVolunteerReimbursement = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.updateVolunteerReimbursement(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer reimbursement updated successfully",
    data: result,
  });
});

export const deleteVolunteerReimbursement = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.deleteVolunteerReimbursement(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer reimbursement deleted successfully",
    data: result,
  });
});
