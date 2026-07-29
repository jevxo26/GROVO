import status from "http-status";
import { branchTargetService } from "../../services/organization/branchTarget.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createBranchTarget = catchAsync(async (req, res) => {
  const result = await branchTargetService.createBranchTarget(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Branch Target created successfully",
    data: result,
  });
});

const getAllBranchTargets = catchAsync(async (req, res) => {
  const query = {
    branchId: req.query.branchId as string | undefined,
    year: req.query.year ? Number(req.query.year) : undefined,
  };

  const result = await branchTargetService.getAllBranchTargets(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Targets fetched successfully",
    data: result,
  });
});

const getBranchTargetById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchTargetService.getBranchTargetById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Target fetched successfully",
    data: result,
  });
});

const updateBranchTarget = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchTargetService.updateBranchTarget(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Target updated successfully",
    data: result,
  });
});

const deleteBranchTarget = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchTargetService.deleteBranchTarget(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Target deleted successfully",
    data: result,
  });
});

export const branchTargetController = {
  createBranchTarget,
  getAllBranchTargets,
  getBranchTargetById,
  updateBranchTarget,
  deleteBranchTarget,
};
