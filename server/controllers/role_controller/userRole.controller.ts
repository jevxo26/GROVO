import status from "http-status";
import { roleServices } from "../../services/role.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

export const assignUserRole = catchAsync(async (req, res) => {
  const result = await roleServices.assignUserRole(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "User role assigned successfully",
    data: result,
  });
});

export const getAllUserRoles = catchAsync(async (req, res) => {
  const result = await roleServices.getAllUserRoles(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "User roles fetched successfully",
    data: result,
  });
});

export const getUserRoleById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.getUserRoleById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "User role fetched successfully",
    data: result,
  });
});

export const updateUserRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.updateUserRole(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "User role updated successfully",
    data: result,
  });
});

export const deleteUserRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.deleteUserRole(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "User role assignment deleted successfully",
    data: result,
  });
});
