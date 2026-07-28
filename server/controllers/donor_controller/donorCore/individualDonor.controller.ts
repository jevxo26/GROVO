import status from "http-status";
import { donorCoreService } from "../../../services/donor_service/donorCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 2. INDIVIDUAL DONOR CONTROLLERS ====================
export const createIndividualDonor = catchAsync(async (req, res) => {
  const result = await donorCoreService.createIndividualDonor(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Individual donor created successfully",
    data: result,
  });
});

export const getAllIndividualDonors = catchAsync(async (req, res) => {
  const result = await donorCoreService.getAllIndividualDonors(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Individual donors retrieved successfully",
    data: result,
  });
});

export const getIndividualDonorById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.getIndividualDonorById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Individual donor retrieved successfully",
    data: result,
  });
});

export const updateIndividualDonor = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.updateIndividualDonor(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Individual donor updated successfully",
    data: result,
  });
});

export const deleteIndividualDonor = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.deleteIndividualDonor(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Individual donor deleted successfully",
    data: result,
  });
});
