import status from "http-status";
import { beneficiaryCoreService } from "../../../services/beneficiary_service/beneficiaryCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 5. BENEFICIARY DOCUMENT CONTROLLERS ====================
export const createBeneficiaryDocument = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.createBeneficiaryDocument(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary document created successfully",
    data: result,
  });
});

export const getAllBeneficiaryDocuments = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.getAllBeneficiaryDocuments(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary documents retrieved successfully",
    data: result,
  });
});

export const getBeneficiaryDocumentById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.getBeneficiaryDocumentById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary document retrieved successfully",
    data: result,
  });
});

export const updateBeneficiaryDocument = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.updateBeneficiaryDocument(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary document updated successfully",
    data: result,
  });
});

export const deleteBeneficiaryDocument = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.deleteBeneficiaryDocument(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary document deleted successfully",
    data: result,
  });
});
