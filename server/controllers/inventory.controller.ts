import httpStatus from "http-status";
import customError from "../error/customError";
import { inventoryService } from "../services/inventory.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const updateStock = catchAsync(async (req, res) => {
  const { branchId, itemName, quantity, unit, location } = req.body;

  if (!branchId || !itemName || quantity === undefined || quantity < 0) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Invalid asset criteria or negative counts.",
    );
  }

  const result = await inventoryService.updateStock({
    branchId,
    itemName,
    quantity,
    unit,
    location,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Stock updated successfully",
    data: result,
  });
});

const logItemDistribution = catchAsync(async (req, res) => {
  const { recordId, reliefItemId, quantity, remarks } = req.body;

  if (!recordId || !reliefItemId || quantity === undefined) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing required distribution parameters.",
    );
  }

  const result = await inventoryService.logItemDistribution({
    recordId,
    reliefItemId,
    quantity,
    remarks,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Item distribution logged successfully",
    data: result,
  });
});

export const inventoryController = {
  updateStock,
  logItemDistribution,
};
