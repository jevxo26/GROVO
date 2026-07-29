import status from "http-status";
import { branchInventoryService } from "../../services/organization/branchInventory.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createBranchInventory = catchAsync(async (req, res) => {
  const result = await branchInventoryService.createBranchInventory(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Branch Inventory item created successfully",
    data: result,
  });
});

const getAllBranchInventories = catchAsync(async (req, res) => {
  const query = {
    branchId: req.query.branchId as string | undefined,
    search: req.query.search as string | undefined,
  };

  const result = await branchInventoryService.getAllBranchInventories(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Inventories fetched successfully",
    data: result,
  });
});

const getBranchInventoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchInventoryService.getBranchInventoryById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Inventory fetched successfully",
    data: result,
  });
});

const updateBranchInventory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchInventoryService.updateBranchInventory(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Inventory updated successfully",
    data: result,
  });
});

const deleteBranchInventory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchInventoryService.deleteBranchInventory(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Inventory deleted successfully",
    data: result,
  });
});

export const branchInventoryController = {
  createBranchInventory,
  getAllBranchInventories,
  getBranchInventoryById,
  updateBranchInventory,
  deleteBranchInventory,
};
