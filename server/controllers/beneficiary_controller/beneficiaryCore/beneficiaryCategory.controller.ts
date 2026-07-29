import status from "http-status";
import { beneficiaryCoreService } from "../../../services/beneficiary_service/beneficiaryCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 4. BENEFICIARY CATEGORY CONTROLLERS ====================
export const createBeneficiaryCategory = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.createBeneficiaryCategory(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary category created successfully",
    data: result,
  });
});

export const getAllBeneficiaryCategories = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.getAllBeneficiaryCategories(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary categories retrieved successfully",
    data: result,
  });
});

export const getBeneficiaryCategoryById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.getBeneficiaryCategoryById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary category retrieved successfully",
    data: result,
  });
});

export const updateBeneficiaryCategory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.updateBeneficiaryCategory(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary category updated successfully",
    data: result,
  });
});

export const deleteBeneficiaryCategory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.deleteBeneficiaryCategory(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary category deleted successfully",
    data: result,
  });
});
