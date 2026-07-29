import status from "http-status";
import { beneficiaryReliefService } from "../../../services/beneficiary_service/beneficiaryRelief.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 8. RELIEF PACKAGE CONTROLLERS ====================
export const createReliefPackage = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.createReliefPackage(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Relief package created successfully",
    data: result,
  });
});

export const getAllReliefPackages = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.getAllReliefPackages(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Relief packages retrieved successfully",
    data: result,
  });
});

export const getReliefPackageById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.getReliefPackageById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Relief package retrieved successfully",
    data: result,
  });
});

export const updateReliefPackage = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.updateReliefPackage(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Relief package updated successfully",
    data: result,
  });
});

export const deleteReliefPackage = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.deleteReliefPackage(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Relief package deleted successfully",
    data: result,
  });
});
