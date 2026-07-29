import status from "http-status";
import { branchTypeService } from "../../services/organization/branchType.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createBranchType = catchAsync(async (req, res) => {
  const result = await branchTypeService.createBranchType(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Branch type created successfully",
    data: result,
  });
});

const getAllBranchTypes = catchAsync(async (req, res) => {
  const query = {
    status: req.query.status as string | undefined,
    search: req.query.search as string | undefined,
  };

  const result = await branchTypeService.getAllBranchTypes(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch types fetched successfully",
    data: result,
  });
});

const getBranchTypeById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchTypeService.getBranchTypeById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch type fetched successfully",
    data: result,
  });
});

const updateBranchType = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchTypeService.updateBranchType(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch type updated successfully",
    data: result,
  });
});

const deleteBranchType = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchTypeService.deleteBranchType(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch type deleted successfully",
    data: result,
  });
});

export const branchTypeController = {
  createBranchType,
  getAllBranchTypes,
  getBranchTypeById,
  updateBranchType,
  deleteBranchType,
};
