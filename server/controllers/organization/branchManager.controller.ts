import status from "http-status";
import { branchManagerService } from "../../services/organization/branchManager.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const assignBranchManager = catchAsync(async (req, res) => {
  const result = await branchManagerService.assignBranchManager(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Branch manager assigned successfully",
    data: result,
  });
});

const getBranchManagersByBranchId = catchAsync(async (req, res) => {
  const { branchId } = req.params;
  const result = await branchManagerService.getBranchManagersByBranchId(branchId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch manager assignments fetched successfully",
    data: result,
  });
});

const getBranchManagerAssignmentsByUserId = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await branchManagerService.getBranchManagerAssignmentsByUserId(userId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "User branch manager assignments fetched successfully",
    data: result,
  });
});

const getBranchManagerById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchManagerService.getBranchManagerById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch manager assignment fetched successfully",
    data: result,
  });
});

const updateBranchManagerAssignment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchManagerService.updateBranchManagerAssignment(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch manager assignment updated successfully",
    data: result,
  });
});

const deleteBranchManagerAssignment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchManagerService.deleteBranchManagerAssignment(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch manager assignment deleted successfully",
    data: result,
  });
});

export const branchManagerController = {
  assignBranchManager,
  getBranchManagersByBranchId,
  getBranchManagerAssignmentsByUserId,
  getBranchManagerById,
  updateBranchManagerAssignment,
  deleteBranchManagerAssignment,
};
