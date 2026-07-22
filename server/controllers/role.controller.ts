import status from "http-status";
import { sendResponse } from "../utils/sendResponse";
import { roleServices } from "../services/role.service";
import catchAsync from "../utils/catchAsync";

// ==================== ROLE CONTROLLERS ====================
const createRole = catchAsync(async (req, res) => {
  const result = await roleServices.createRole(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Role created successfully",
    data: result,
  });
});

const getAllRoles = catchAsync(async (_req, res) => {
  const result = await roleServices.getAllRoles();

  sendResponse(res, {
    statusCode: status.OK,
    message: "Roles retrieved successfully",
    data: result,
  });
});

// ==================== PERMISSION CONTROLLERS ====================
const createPermission = catchAsync(async (req, res) => {
  const result = await roleServices.createPermission(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Permission created successfully",
    data: result,
  });
});

const getAllPermissions = catchAsync(async (_req, res) => {
  const result = await roleServices.getAllPermissions();

  sendResponse(res, {
    statusCode: status.OK,
    message: "Permissions retrieved successfully",
    data: result,
  });
});

// ==================== ASSIGNMENT CONTROLLERS ====================
const assignRolePermission = catchAsync(async (req, res) => {
  const result = await roleServices.assignRolePermission(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Permission assigned to role successfully",
    data: result,
  });
});

const assignUserRole = catchAsync(async (req, res) => {
  const result = await roleServices.assignUserRole(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "User role assigned successfully",
    data: result,
  });
});

const assignCoordinatorRole = catchAsync(async (req, res) => {
  const result = await roleServices.assignCoordinatorRole(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Coordinator role assigned successfully",
    data: result,
  });
});

const assignVolunteerRole = catchAsync(async (req, res) => {
  const result = await roleServices.assignVolunteerRole(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer role assigned successfully",
    data: result,
  });
});

const assignStaffRole = catchAsync(async (req, res) => {
  const result = await roleServices.assignStaffRole(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Staff role assigned successfully",
    data: result,
  });
});

const assignCommitteeRole = catchAsync(async (req, res) => {
  const result = await roleServices.assignCommitteeRole(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Committee role assigned successfully",
    data: result,
  });
});

// ==================== ADMIN & SYSTEM CONTROLLERS ====================
const createAdminPermission = catchAsync(async (req, res) => {
  const result = await roleServices.createAdminPermission(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Admin permission created successfully",
    data: result,
  });
});

const createRoleHierarchy = catchAsync(async (req, res) => {
  const result = await roleServices.createRoleHierarchy(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Role hierarchy created successfully",
    data: result,
  });
});

// ==================== ACCESS LOG CONTROLLERS ====================
const createAccessLog = catchAsync(async (req, res) => {
  const result = await roleServices.createAccessLog(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Access log created successfully",
    data: result,
  });
});

const getAllAccessLogs = catchAsync(async (_req, res) => {
  const result = await roleServices.getAllAccessLogs();

  sendResponse(res, {
    statusCode: status.OK,
    message: "Access logs fetched successfully",
    data: result,
  });
});

export const roleController = {
  createRole,
  getAllRoles,
  createPermission,
  getAllPermissions,
  assignRolePermission,
  assignUserRole,
  assignCoordinatorRole,
  assignVolunteerRole,
  assignStaffRole,
  assignCommitteeRole,
  createAdminPermission,
  createRoleHierarchy,
  createAccessLog,
  getAllAccessLogs,
};
