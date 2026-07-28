import status from "http-status";
import { beneficiaryReliefService } from "../../../services/beneficiary_service/beneficiaryRelief.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 15. BENEFICIARY QR CODE CONTROLLERS ====================
export const createBeneficiaryQRCode = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.createBeneficiaryQRCode(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Beneficiary QR Code created successfully",
    data: result,
  });
});

export const getAllBeneficiaryQRCodes = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.getAllBeneficiaryQRCodes(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary QR Codes retrieved successfully",
    data: result,
  });
});

export const getBeneficiaryQRCodeById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.getBeneficiaryQRCodeById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary QR Code retrieved successfully",
    data: result,
  });
});

export const updateBeneficiaryQRCode = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.updateBeneficiaryQRCode(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary QR Code updated successfully",
    data: result,
  });
});

export const deleteBeneficiaryQRCode = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.deleteBeneficiaryQRCode(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Beneficiary QR Code deleted successfully",
    data: result,
  });
});
