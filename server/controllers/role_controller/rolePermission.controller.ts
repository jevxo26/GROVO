import status from "http-status";
import { roleServices } from "../../services/role.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

export const assignRolePermission = catchAsync(async (req, res) => {
  const result = await roleServices.assignRolePermission(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Permission assigned to role successfully",
    data: result,
  });
});

export const getAllRolePermissions = catchAsync(async (req, res) => {
  const result = await roleServices.getAllRolePermissions(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Role permissions fetched successfully",
    data: result,
  });
});

export const getRolePermissionById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.getRolePermissionById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Role permission fetched successfully",
    data: result,
  });
});

export const updateRolePermission = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.updateRolePermission(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Role permission updated successfully",
    data: result,
  });
});

export const deleteRolePermission = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.deleteRolePermission(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Role permission deleted successfully",
    data: result,
  });
});
