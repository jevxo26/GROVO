import status from "http-status";
import { branchStaffService } from "../../services/organization/branchStaff.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const assignBranchStaff = catchAsync(async (req, res) => {
  const result = await branchStaffService.assignBranchStaff(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Branch staff assigned successfully",
    data: result,
  });
});

const getBranchStaffByBranchId = catchAsync(async (req, res) => {
  const { branchId } = req.params;
  const result = await branchStaffService.getBranchStaffByBranchId(branchId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch staff members fetched successfully",
    data: result,
  });
});

const getBranchStaffAssignmentsByUserId = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await branchStaffService.getBranchStaffAssignmentsByUserId(userId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "User branch staff assignments fetched successfully",
    data: result,
  });
});

const getBranchStaffById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchStaffService.getBranchStaffById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Staff assignment fetched successfully",
    data: result,
  });
});

const updateBranchStaffAssignment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchStaffService.updateBranchStaffAssignment(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Staff assignment updated successfully",
    data: result,
  });
});

const deleteBranchStaffAssignment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchStaffService.deleteBranchStaffAssignment(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Staff assignment deleted successfully",
    data: result,
  });
});

export const branchStaffController = {
  assignBranchStaff,
  getBranchStaffByBranchId,
  getBranchStaffAssignmentsByUserId,
  getBranchStaffById,
  updateBranchStaffAssignment,
  deleteBranchStaffAssignment,
};
