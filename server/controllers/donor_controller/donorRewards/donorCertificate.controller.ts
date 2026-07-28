import status from "http-status";
import { donorRewardsService } from "../../../services/donor_service/donorRewards.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 9. DONOR CERTIFICATE CONTROLLERS ====================
export const createDonorCertificate = catchAsync(async (req, res) => {
  const result = await donorRewardsService.createDonorCertificate(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor certificate created successfully",
    data: result,
  });
});

export const getAllDonorCertificates = catchAsync(async (req, res) => {
  const result = await donorRewardsService.getAllDonorCertificates(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor certificates retrieved successfully",
    data: result,
  });
});

export const getDonorCertificateById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.getDonorCertificateById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor certificate retrieved successfully",
    data: result,
  });
});

export const updateDonorCertificate = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.updateDonorCertificate(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor certificate updated successfully",
    data: result,
  });
});

export const deleteDonorCertificate = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorRewardsService.deleteDonorCertificate(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor certificate deleted successfully",
    data: result,
  });
});
