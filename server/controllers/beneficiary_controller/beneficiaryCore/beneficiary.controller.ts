import status from "http-status";
import { beneficiaryCoreService } from "../../../services/beneficiary_service/beneficiaryCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 1. BENEFICIARY CONTROLLERS ====================
export const createBeneficiary = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.createBeneficiary(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary created successfully",
    data: result,
  });
});

export const getAllBeneficiaries = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.getAllBeneficiaries(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiaries retrieved successfully",
    data: result,
  });
});

export const getBeneficiaryById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.getBeneficiaryById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary retrieved successfully",
    data: result,
  });
});

export const updateBeneficiary = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.updateBeneficiary(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary updated successfully",
    data: result,
  });
});

export const deleteBeneficiary = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.deleteBeneficiary(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary deleted successfully",
    data: result,
  });
});
