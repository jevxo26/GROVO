import status from "http-status";
import { donorCoreService } from "../../../services/donor_service/donorCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 3. CORPORATE DONOR CONTROLLERS ====================
export const createCorporateDonor = catchAsync(async (req, res) => {
  const result = await donorCoreService.createCorporateDonor(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Corporate donor created successfully",
    data: result,
  });
});

export const getAllCorporateDonors = catchAsync(async (req, res) => {
  const result = await donorCoreService.getAllCorporateDonors(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Corporate donors retrieved successfully",
    data: result,
  });
});

export const getCorporateDonorById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.getCorporateDonorById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Corporate donor retrieved successfully",
    data: result,
  });
});

export const updateCorporateDonor = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.updateCorporateDonor(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Corporate donor updated successfully",
    data: result,
  });
});

export const deleteCorporateDonor = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.deleteCorporateDonor(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Corporate donor deleted successfully",
    data: result,
  });
});
