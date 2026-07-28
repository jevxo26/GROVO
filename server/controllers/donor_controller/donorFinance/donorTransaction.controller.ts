import status from "http-status";
import { donorFinanceService } from "../../../services/donor_service/donorFinance.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 8. DONOR TRANSACTION CONTROLLERS ====================
export const createDonorTransaction = catchAsync(async (req, res) => {
  const result = await donorFinanceService.createDonorTransaction(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor transaction created successfully",
    data: result,
  });
});

export const getAllDonorTransactions = catchAsync(async (req, res) => {
  const result = await donorFinanceService.getAllDonorTransactions(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor transactions retrieved successfully",
    data: result,
  });
});

export const getDonorTransactionById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.getDonorTransactionById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor transaction retrieved successfully",
    data: result,
  });
});

export const updateDonorTransaction = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.updateDonorTransaction(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor transaction updated successfully",
    data: result,
  });
});

export const deleteDonorTransaction = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.deleteDonorTransaction(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor transaction deleted successfully",
    data: result,
  });
});
