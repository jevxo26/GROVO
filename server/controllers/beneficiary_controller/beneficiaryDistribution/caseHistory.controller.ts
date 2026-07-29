import status from "http-status";
import { beneficiaryDistributionService } from "../../../services/beneficiary_service/beneficiaryDistribution.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 20. CASE HISTORY CONTROLLERS ====================
export const createCaseHistory = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.createCaseHistory(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Case history created successfully",
    data: result,
  });
});

export const getAllCaseHistories = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.getAllCaseHistories(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Case histories retrieved successfully",
    data: result,
  });
});

export const getCaseHistoryById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.getCaseHistoryById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Case history retrieved successfully",
    data: result,
  });
});

export const updateCaseHistory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.updateCaseHistory(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Case history updated successfully",
    data: result,
  });
});

export const deleteCaseHistory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.deleteCaseHistory(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Case history deleted successfully",
    data: result,
  });
});
