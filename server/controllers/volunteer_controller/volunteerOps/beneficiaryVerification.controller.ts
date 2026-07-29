import status from "http-status";
import { volunteerOpsService } from "../../../services/volunteer_service/volunteerOps.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 12. BENEFICIARY VERIFICATION CONTROLLERS ====================
export const createBeneficiaryVerification = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.createBeneficiaryVerification(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary verification created successfully",
    data: result,
  });
});

export const getAllBeneficiaryVerifications = catchAsync(async (req, res) => {
  const result = await volunteerOpsService.getAllBeneficiaryVerifications(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary verifications retrieved successfully",
    data: result,
  });
});

export const getBeneficiaryVerificationById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.getBeneficiaryVerificationById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary verification retrieved successfully",
    data: result,
  });
});

export const updateBeneficiaryVerification = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.updateBeneficiaryVerification(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary verification updated successfully",
    data: result,
  });
});

export const deleteBeneficiaryVerification = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await volunteerOpsService.deleteBeneficiaryVerification(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary verification deleted successfully",
    data: result,
  });
});
