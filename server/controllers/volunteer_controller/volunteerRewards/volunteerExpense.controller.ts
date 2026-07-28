import status from "http-status";
import { volunteerRewardsService } from "../../../services/volunteer_service/volunteerRewards.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 16. VOLUNTEER EXPENSE CONTROLLERS ====================
export const createVolunteerExpense = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.createVolunteerExpense(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer expense created successfully",
    data: result,
  });
});

export const getAllVolunteerExpenses = catchAsync(async (req, res) => {
  const result = await volunteerRewardsService.getAllVolunteerExpenses(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer expenses retrieved successfully",
    data: result,
  });
});

export const getVolunteerExpenseById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.getVolunteerExpenseById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer expense retrieved successfully",
    data: result,
  });
});

export const updateVolunteerExpense = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.updateVolunteerExpense(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer expense updated successfully",
    data: result,
  });
});

export const deleteVolunteerExpense = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerRewardsService.deleteVolunteerExpense(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer expense deleted successfully",
    data: result,
  });
});
