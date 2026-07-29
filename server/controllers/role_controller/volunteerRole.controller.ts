import status from "http-status";
import { roleServices } from "../../services/role.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

export const assignVolunteerRole = catchAsync(async (req, res) => {
  const result = await roleServices.assignVolunteerRole(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer role assigned successfully",
    data: result,
  });
});

export const getAllVolunteerRoles = catchAsync(async (req, res) => {
  const result = await roleServices.getAllVolunteerRoles(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer roles fetched successfully",
    data: result,
  });
});

export const getVolunteerRoleById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.getVolunteerRoleById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer role fetched successfully",
    data: result,
  });
});

export const updateVolunteerRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.updateVolunteerRole(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer role updated successfully",
    data: result,
  });
});

export const deleteVolunteerRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.deleteVolunteerRole(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer role assignment deleted successfully",
    data: result,
  });
});
