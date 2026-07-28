import status from "http-status";
import { beneficiaryReliefService } from "../../../services/beneficiary_service/beneficiaryRelief.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 9. RELIEF ITEM CONTROLLERS ====================
export const createReliefItem = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.createReliefItem(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Relief item created successfully",
    data: result,
  });
});

export const getAllReliefItems = catchAsync(async (req, res) => {
  const result = await beneficiaryReliefService.getAllReliefItems(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Relief items retrieved successfully",
    data: result,
  });
});

export const getReliefItemById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.getReliefItemById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Relief item retrieved successfully",
    data: result,
  });
});

export const updateReliefItem = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.updateReliefItem(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Relief item updated successfully",
    data: result,
  });
});

export const deleteReliefItem = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryReliefService.deleteReliefItem(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Relief item deleted successfully",
    data: result,
  });
});
