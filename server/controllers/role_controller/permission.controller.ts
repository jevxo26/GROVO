import status from "http-status";
import { roleServices } from "../../services/role.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

export const createPermission = catchAsync(async (req, res) => {
  const result = await roleServices.createPermission(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Permission created successfully",
    data: result,
  });
});

export const getAllPermissions = catchAsync(async (req, res) => {
  const result = await roleServices.getAllPermissions(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Permissions retrieved successfully",
    data: result,
  });
});

export const getPermissionById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.getPermissionById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Permission retrieved successfully",
    data: result,
  });
});

export const updatePermission = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.updatePermission(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Permission updated successfully",
    data: result,
  });
});

export const deletePermission = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.deletePermission(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Permission deleted successfully",
    data: result,
  });
});
