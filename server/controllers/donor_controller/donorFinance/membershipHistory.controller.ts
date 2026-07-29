import status from "http-status";
import { donorFinanceService } from "../../../services/donor_service/donorFinance.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 13. MEMBERSHIP HISTORY CONTROLLERS ====================
export const createMembershipHistory = catchAsync(async (req, res) => {
  const result = await donorFinanceService.createMembershipHistory(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Membership history created successfully",
    data: result,
  });
});

export const getAllMembershipHistories = catchAsync(async (req, res) => {
  const result = await donorFinanceService.getAllMembershipHistories(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership histories retrieved successfully",
    data: result,
  });
});

export const getMembershipHistoryById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.getMembershipHistoryById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership history retrieved successfully",
    data: result,
  });
});

export const updateMembershipHistory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.updateMembershipHistory(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership history updated successfully",
    data: result,
  });
});

export const deleteMembershipHistory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.deleteMembershipHistory(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership history deleted successfully",
    data: result,
  });
});
