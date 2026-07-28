import status from "http-status";
import { beneficiaryReliefService } from "../../../services/beneficiary_service/beneficiaryRelief.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 12. DISTRIBUTION CENTER CONTROLLERS ====================
export const createDistributionCenter = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.createDistributionCenter(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Distribution center created successfully",
    data: result,
  });
});

export const getAllDistributionCenters = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.getAllDistributionCenters(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution centers retrieved successfully",
    data: result,
  });
});

export const getDistributionCenterById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.getDistributionCenterById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution center retrieved successfully",
    data: result,
  });
});

export const updateDistributionCenter = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.updateDistributionCenter(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution center updated successfully",
    data: result,
  });
});

export const deleteDistributionCenter = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.deleteDistributionCenter(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution center deleted successfully",
    data: result,
  });
});
