import status from "http-status";
import { donorFinanceService } from "../../../services/donor_service/donorFinance.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 12. MEMBERSHIP PAYMENT CONTROLLERS ====================
export const createMembershipPayment = catchAsync(async (req, res) => {
  const result = await donorFinanceService.createMembershipPayment(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Membership payment created successfully",
    data: result,
  });
});

export const getAllMembershipPayments = catchAsync(async (req, res) => {
  const result = await donorFinanceService.getAllMembershipPayments(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership payments retrieved successfully",
    data: result,
  });
});

export const getMembershipPaymentById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.getMembershipPaymentById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership payment retrieved successfully",
    data: result,
  });
});

export const updateMembershipPayment = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.updateMembershipPayment(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership payment updated successfully",
    data: result,
  });
});

export const deleteMembershipPayment = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.deleteMembershipPayment(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership payment deleted successfully",
    data: result,
  });
});
