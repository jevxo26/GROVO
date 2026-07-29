import status from "http-status";
import { roleServices } from "../../services/role.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

export const assignStaffRole = catchAsync(async (req, res) => {
  const result = await roleServices.assignStaffRole(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Staff role assigned successfully",
    data: result,
  });
});

export const getAllStaffRoles = catchAsync(async (req, res) => {
  const result = await roleServices.getAllStaffRoles(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Staff roles fetched successfully",
    data: result,
  });
});

export const getStaffRoleById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.getStaffRoleById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Staff role fetched successfully",
    data: result,
  });
});

export const updateStaffRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.updateStaffRole(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Staff role updated successfully",
    data: result,
  });
});

export const deleteStaffRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.deleteStaffRole(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Staff role assignment deleted successfully",
    data: result,
  });
});
