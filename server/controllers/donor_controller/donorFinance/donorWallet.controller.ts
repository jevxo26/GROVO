import status from "http-status";
import { donorFinanceService } from "../../../services/donor_service/donorFinance.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 7. DONOR WALLET CONTROLLERS ====================
export const createDonorWallet = catchAsync(async (req, res) => {
  const result = await donorFinanceService.createDonorWallet(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor wallet created successfully",
    data: result,
  });
});

export const getAllDonorWallets = catchAsync(async (req, res) => {
  const result = await donorFinanceService.getAllDonorWallets(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor wallets retrieved successfully",
    data: result,
  });
});

export const getDonorWalletById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.getDonorWalletById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor wallet retrieved successfully",
    data: result,
  });
});

export const updateDonorWallet = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.updateDonorWallet(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor wallet updated successfully",
    data: result,
  });
});

export const deleteDonorWallet = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.deleteDonorWallet(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor wallet deleted successfully",
    data: result,
  });
});
