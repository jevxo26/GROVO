import status from "http-status";
import { beneficiaryDistributionService } from "../../../services/beneficiary_service/beneficiaryDistribution.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 18. BENEFICIARY FEEDBACK CONTROLLERS ====================
export const createBeneficiaryFeedback = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.createBeneficiaryFeedback(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary feedback created successfully",
    data: result,
  });
});

export const getAllBeneficiaryFeedbacks = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.getAllBeneficiaryFeedbacks(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary feedbacks retrieved successfully",
    data: result,
  });
});

export const getBeneficiaryFeedbackById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.getBeneficiaryFeedbackById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary feedback retrieved successfully",
    data: result,
  });
});

export const updateBeneficiaryFeedback = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.updateBeneficiaryFeedback(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary feedback updated successfully",
    data: result,
  });
});

export const deleteBeneficiaryFeedback = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.deleteBeneficiaryFeedback(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary feedback deleted successfully",
    data: result,
  });
});
