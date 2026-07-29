import status from "http-status";
import { beneficiaryCoreService } from "../../../services/beneficiary_service/beneficiaryCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 6. BENEFICIARY VERIFICATION CONTROLLERS ====================
export const createBeneficiaryVerification = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.createBeneficiaryVerification(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary verification created successfully",
    data: result,
  });
});

export const getAllBeneficiaryVerifications = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.getAllBeneficiaryVerifications(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary verifications retrieved successfully",
    data: result,
  });
});

export const getBeneficiaryVerificationById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.getBeneficiaryVerificationById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary verification retrieved successfully",
    data: result,
  });
});

export const updateBeneficiaryVerification = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.updateBeneficiaryVerification(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary verification updated successfully",
    data: result,
  });
});

export const deleteBeneficiaryVerification = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.deleteBeneficiaryVerification(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary verification deleted successfully",
    data: result,
  });
});
