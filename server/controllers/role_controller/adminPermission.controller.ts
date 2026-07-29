import status from "http-status";
import { roleServices } from "../../services/role.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

export const createAdminPermission = catchAsync(async (req, res) => {
  const result = await roleServices.createAdminPermission(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Admin permission created successfully",
    data: result,
  });
});

export const getAllAdminPermissions = catchAsync(async (req, res) => {
  const result = await roleServices.getAllAdminPermissions(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Admin permissions fetched successfully",
    data: result,
  });
});

export const getAdminPermissionById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.getAdminPermissionById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Admin permission fetched successfully",
    data: result,
  });
});

export const updateAdminPermission = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.updateAdminPermission(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Admin permission updated successfully",
    data: result,
  });
});

export const deleteAdminPermission = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.deleteAdminPermission(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Admin permission deleted successfully",
    data: result,
  });
});
