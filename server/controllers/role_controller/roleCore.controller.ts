import status from "http-status";
import { roleServices } from "../../services/role.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

export const createRole = catchAsync(async (req, res) => {
  const result = await roleServices.createRole(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Role created successfully",
    data: result,
  });
});

export const getAllRoles = catchAsync(async (req, res) => {
  const result = await roleServices.getAllRoles(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Roles retrieved successfully",
    data: result,
  });
});

export const getRoleById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.getRoleById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Role retrieved successfully",
    data: result,
  });
});

export const updateRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.updateRole(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Role updated successfully",
    data: result,
  });
});

export const deleteRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.deleteRole(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Role deleted successfully",
    data: result,
  });
});
