import status from "http-status";
import { roleServices } from "../../services/role.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

export const assignCommitteeRole = catchAsync(async (req, res) => {
  const result = await roleServices.assignCommitteeRole(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Committee role assigned successfully",
    data: result,
  });
});

export const getAllCommitteeRoles = catchAsync(async (req, res) => {
  const result = await roleServices.getAllCommitteeRoles(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Committee roles fetched successfully",
    data: result,
  });
});

export const getCommitteeRoleById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.getCommitteeRoleById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Committee role fetched successfully",
    data: result,
  });
});

export const updateCommitteeRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.updateCommitteeRole(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Committee role updated successfully",
    data: result,
  });
});

export const deleteCommitteeRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.deleteCommitteeRole(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Committee role assignment deleted successfully",
    data: result,
  });
});
