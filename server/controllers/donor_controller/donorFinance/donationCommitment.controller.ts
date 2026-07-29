import status from "http-status";
import { donorFinanceService } from "../../../services/donor_service/donorFinance.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 6. DONATION COMMITMENT CONTROLLERS ====================
export const createDonationCommitment = catchAsync(async (req, res) => {
  const result = await donorFinanceService.createDonationCommitment(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donation commitment created successfully",
    data: result,
  });
});

export const getAllDonationCommitments = catchAsync(async (req, res) => {
  const result = await donorFinanceService.getAllDonationCommitments(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation commitments retrieved successfully",
    data: result,
  });
});

export const getDonationCommitmentById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.getDonationCommitmentById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation commitment retrieved successfully",
    data: result,
  });
});

export const updateDonationCommitment = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.updateDonationCommitment(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation commitment updated successfully",
    data: result,
  });
});

export const deleteDonationCommitment = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.deleteDonationCommitment(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation commitment deleted successfully",
    data: result,
  });
});
