import status from "http-status";
import { beneficiaryCoreService } from "../../../services/beneficiary_service/beneficiaryCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 7. BENEFICIARY NEED ASSESSMENT CONTROLLERS ====================
export const createBeneficiaryNeedAssessment = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.createBeneficiaryNeedAssessment(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary need assessment created successfully",
    data: result,
  });
});

export const getAllBeneficiaryNeedAssessments = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.getAllBeneficiaryNeedAssessments(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary need assessments retrieved successfully",
    data: result,
  });
});

export const getBeneficiaryNeedAssessmentById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.getBeneficiaryNeedAssessmentById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary need assessment retrieved successfully",
    data: result,
  });
});

export const updateBeneficiaryNeedAssessment = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.updateBeneficiaryNeedAssessment(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary need assessment updated successfully",
    data: result,
  });
});

export const deleteBeneficiaryNeedAssessment = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.deleteBeneficiaryNeedAssessment(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary need assessment deleted successfully",
    data: result,
  });
});
