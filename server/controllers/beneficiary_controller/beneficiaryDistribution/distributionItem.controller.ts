import status from "http-status";
import { beneficiaryDistributionService } from "../../../services/beneficiary_service/beneficiaryDistribution.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 14. DISTRIBUTION ITEM CONTROLLERS ====================
export const createDistributionItem = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.createDistributionItem(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Distribution item created successfully",
    data: result,
  });
});

export const getAllDistributionItems = catchAsync(async (req, res) => {
  const result = await beneficiaryDistributionService.getAllDistributionItems(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution items retrieved successfully",
    data: result,
  });
});

export const getDistributionItemById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.getDistributionItemById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution item retrieved successfully",
    data: result,
  });
});

export const updateDistributionItem = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.updateDistributionItem(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution item updated successfully",
    data: result,
  });
});

export const deleteDistributionItem = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryDistributionService.deleteDistributionItem(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Distribution item deleted successfully",
    data: result,
  });
});
