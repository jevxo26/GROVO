import status from "http-status";
import { donorCoreService } from "../../../services/donor_service/donorCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 1. DONOR CONTROLLERS ====================
export const createDonor = catchAsync(async (req, res) => {
  const result = await donorCoreService.createDonor(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor created successfully",
    data: result,
  });
});

export const getAllDonors = catchAsync(async (req, res) => {
  const result = await donorCoreService.getAllDonors(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donors retrieved successfully",
    data: result,
  });
});

export const getDonorById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.getDonorById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor retrieved successfully",
    data: result,
  });
});

export const updateDonor = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.updateDonor(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor updated successfully",
    data: result,
  });
});

export const deleteDonor = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.deleteDonor(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor deleted successfully",
    data: result,
  });
});
