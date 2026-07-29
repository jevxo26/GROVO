import status from "http-status";
import { donorCoreService } from "../../../services/donor_service/donorCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 4. DONOR ORGANIZATION CONTROLLERS ====================
export const createDonorOrganization = catchAsync(async (req, res) => {
  const result = await donorCoreService.createDonorOrganization(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor organization created successfully",
    data: result,
  });
});

export const getAllDonorOrganizations = catchAsync(async (req, res) => {
  const result = await donorCoreService.getAllDonorOrganizations(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor organizations retrieved successfully",
    data: result,
  });
});

export const getDonorOrganizationById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.getDonorOrganizationById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor organization retrieved successfully",
    data: result,
  });
});

export const updateDonorOrganization = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.updateDonorOrganization(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor organization updated successfully",
    data: result,
  });
});

export const deleteDonorOrganization = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorCoreService.deleteDonorOrganization(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor organization deleted successfully",
    data: result,
  });
});
