import status from "http-status";
import { beneficiaryDistributionService } from "../../../services/beneficiary_service/beneficiaryDistribution.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 16. DISTRIBUTION VERIFICATION CONTROLLERS ====================
export const createDistributionVerification = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.createDistributionVerification(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Distribution verification created successfully",
    data: result,
  });
});

export const getAllDistributionVerifications = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.getAllDistributionVerifications(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution verifications retrieved successfully",
    data: result,
  });
});

export const getDistributionVerificationById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.getDistributionVerificationById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution verification retrieved successfully",
    data: result,
  });
});

export const updateDistributionVerification = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.updateDistributionVerification(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution verification updated successfully",
    data: result,
  });
});

export const deleteDistributionVerification = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.deleteDistributionVerification(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution verification deleted successfully",
    data: result,
  });
});
