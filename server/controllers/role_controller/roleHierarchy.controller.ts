import status from "http-status";
import { roleServices } from "../../services/role.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

export const createRoleHierarchy = catchAsync(async (req, res) => {
  const result = await roleServices.createRoleHierarchy(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Role hierarchy created successfully",
    data: result,
  });
});

export const getAllRoleHierarchies = catchAsync(async (req, res) => {
  const result = await roleServices.getAllRoleHierarchies(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Role hierarchies fetched successfully",
    data: result,
  });
});

export const getRoleHierarchyById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.getRoleHierarchyById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Role hierarchy fetched successfully",
    data: result,
  });
});

export const updateRoleHierarchy = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.updateRoleHierarchy(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Role hierarchy updated successfully",
    data: result,
  });
});

export const deleteRoleHierarchy = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.deleteRoleHierarchy(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Role hierarchy deleted successfully",
    data: result,
  });
});
