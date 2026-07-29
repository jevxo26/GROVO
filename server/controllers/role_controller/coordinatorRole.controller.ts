import status from "http-status";
import { roleServices } from "../../services/role.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

export const assignCoordinatorRole = catchAsync(async (req, res) => {
  const result = await roleServices.assignCoordinatorRole(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Coordinator role assigned successfully",
    data: result,
  });
});

export const getAllCoordinatorRoles = catchAsync(async (req, res) => {
  const result = await roleServices.getAllCoordinatorRoles(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Coordinator roles fetched successfully",
    data: result,
  });
});

export const getCoordinatorRoleById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.getCoordinatorRoleById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Coordinator role fetched successfully",
    data: result,
  });
});

export const updateCoordinatorRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.updateCoordinatorRole(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Coordinator role updated successfully",
    data: result,
  });
});

export const deleteCoordinatorRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.deleteCoordinatorRole(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Coordinator role assignment deleted successfully",
    data: result,
  });
});
