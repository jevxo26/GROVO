import status from "http-status";
import { beneficiaryCoreService } from "../../../services/beneficiary_service/beneficiaryCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 2. BENEFICIARY PROFILE CONTROLLERS ====================
export const createBeneficiaryProfile = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.createBeneficiaryProfile(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary profile created successfully",
    data: result,
  });
});

export const getAllBeneficiaryProfiles = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.getAllBeneficiaryProfiles(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary profiles retrieved successfully",
    data: result,
  });
});

export const getBeneficiaryProfileById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.getBeneficiaryProfileById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary profile retrieved successfully",
    data: result,
  });
});

export const updateBeneficiaryProfile = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.updateBeneficiaryProfile(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary profile updated successfully",
    data: result,
  });
});

export const deleteBeneficiaryProfile = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.deleteBeneficiaryProfile(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary profile deleted successfully",
    data: result,
  });
});
