import status from "http-status";
import { donorFinanceService } from "../../../services/donor_service/donorFinance.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 11. MEMBERSHIP FEE CONTROLLERS ====================
export const createMembershipFee = catchAsync(async (req, res) => {
  const result = await donorFinanceService.createMembershipFee(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Membership fee structure created successfully",
    data: result,
  });
});

export const getAllMembershipFees = catchAsync(async (req, res) => {
  const result = await donorFinanceService.getAllMembershipFees(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership fees retrieved successfully",
    data: result,
  });
});

export const getMembershipFeeById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.getMembershipFeeById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership fee retrieved successfully",
    data: result,
  });
});

export const updateMembershipFee = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.updateMembershipFee(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership fee updated successfully",
    data: result,
  });
});

export const deleteMembershipFee = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.deleteMembershipFee(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership fee deleted successfully",
    data: result,
  });
});
