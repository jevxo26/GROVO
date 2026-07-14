import httpStatus from "http-status";
import customError from "../error/customError";
import { securityService } from "../services/security.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

// ─── Role Management ────────────────────────────────────────────────

const listRoles = catchAsync(async (req, res) => {
  const { page, limit, status } = req.query;
  const result = await securityService.listRoles({
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
    status: status as string | undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Roles retrieved",
    data: result.data,
    meta: result.meta,
  });
});

const createRole = catchAsync(async (req, res) => {
  const { roleName, displayName, description, roleType, priority, permissions } = req.body;

  if (!roleName || !displayName) {
    throw new customError(httpStatus.BAD_REQUEST, "roleName and displayName are required.");
  }

  const result = await securityService.createRole({
    roleName,
    displayName,
    description,
    roleType,
    priority,
    permissions,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Role created",
    data: result,
  });
});

const updateRolePermissions = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const { permissions } = req.body;

  if (!permissions || !Array.isArray(permissions)) {
    throw new customError(httpStatus.BAD_REQUEST, "permissions array is required.");
  }

  const result = await securityService.updateRolePermissions(id, permissions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Permissions updated",
    data: result,
  });
});

// ─── User Role Assignment ───────────────────────────────────────────

const assignRoleToUser = catchAsync(async (req, res) => {
  const userId = req.params.id as string;
  const { roleId } = req.body;
  const adminId = (req.headers["x-user-id"] as string) || "admin-mock";

  if (!roleId) {
    throw new customError(httpStatus.BAD_REQUEST, "roleId is required.");
  }

  const result = await securityService.assignRoleToUser(userId, {
    roleId,
    assignedBy: adminId,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Role assigned",
    data: result,
  });
});

const revokeUserRole = catchAsync(async (req, res) => {
  const userId = req.params.id as string;
  const roleId = req.params.role_id as string;

  const result = await securityService.revokeUserRole(userId, roleId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Role revoked",
    data: result,
  });
});

// ─── Permission Check ───────────────────────────────────────────────

const getMyPermissions = catchAsync(async (req, res) => {
  const userId = (req.headers["x-user-id"] as string) || "usr-default-mock";

  const result = await securityService.getMyPermissions(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Permissions retrieved",
    data: result,
  });
});

// ─── 2FA ────────────────────────────────────────────────────────────

const enable2FA = catchAsync(async (req, res) => {
  const userId = (req.headers["x-user-id"] as string) || "usr-default-mock";
  const { method } = req.body;

  if (!method) {
    throw new customError(httpStatus.BAD_REQUEST, "2FA method is required.");
  }

  const result = await securityService.enable2FA(userId, method);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "2FA setup initiated",
    data: result,
  });
});

const verify2FA = catchAsync(async (req, res) => {
  const userId = (req.headers["x-user-id"] as string) || "usr-default-mock";
  const { otp } = req.body;

  if (!otp) {
    throw new customError(httpStatus.BAD_REQUEST, "OTP is required.");
  }

  const result = await securityService.verify2FA(userId, otp);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "2FA enabled successfully",
    data: result,
  });
});

// ─── Audit Logs ─────────────────────────────────────────────────────

const getAccessLogs = catchAsync(async (req, res) => {
  const { user_id, module, action, from_date, to_date, page, limit } = req.query;

  const result = await securityService.getAccessLogs({
    userId: user_id as string | undefined,
    module: module as string | undefined,
    action: action as string | undefined,
    fromDate: from_date as string | undefined,
    toDate: to_date as string | undefined,
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Access logs retrieved",
    data: result.data,
    meta: result.meta,
  });
});

// ─── IP Management ──────────────────────────────────────────────────

const whitelistIp = catchAsync(async (req, res) => {
  const { ipAddress, description } = req.body;
  const adminId = (req.headers["x-user-id"] as string) || "admin-mock";

  if (!ipAddress) {
    throw new customError(httpStatus.BAD_REQUEST, "IP address is required.");
  }

  const result = await securityService.whitelistIp({
    ipAddress,
    description,
    addedBy: adminId,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "IP address whitelisted successfully",
    data: result,
  });
});

const blacklistIp = catchAsync(async (req, res) => {
  const { ipAddress, reason } = req.body;
  const adminId = (req.headers["x-user-id"] as string) || "admin-mock";

  if (!ipAddress) {
    throw new customError(httpStatus.BAD_REQUEST, "IP address is required.");
  }

  const result = await securityService.blacklistIp({
    ipAddress,
    reason,
    blockedBy: adminId,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "IP blacklisted",
    data: result,
  });
});

// ─── Security Incidents ─────────────────────────────────────────────

const reportIncident = catchAsync(async (req, res) => {
  const { incidentType, severity, description, affectedArea } = req.body;
  const adminId = (req.headers["x-user-id"] as string) || "admin-mock";

  if (!incidentType || !severity || !description) {
    throw new customError(httpStatus.BAD_REQUEST, "incidentType, severity, and description are required.");
  }

  const result = await securityService.flagIncident({
    incidentType,
    severity,
    description,
    reportedBy: adminId,
    affectedArea,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Incident reported",
    data: result,
  });
});

// ─── Data Deletion (GDPR) ───────────────────────────────────────────

const requestDataDeletion = catchAsync(async (req, res) => {
  const userId = (req.headers["x-user-id"] as string) || "usr-default-mock";
  const { reason } = req.body;

  const result = await securityService.requestDataDeletion(userId, reason);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Data deletion request submitted",
    data: { request_id: result.id, status: result.status, estimated_completion: "7 business days" },
  });
});

// ─── API Keys ───────────────────────────────────────────────────────

const createApiKey = catchAsync(async (req, res) => {
  const { name, expiresAt } = req.body;

  if (!name) {
    throw new customError(httpStatus.BAD_REQUEST, "API key name is required.");
  }

  const result = await securityService.createApiKey({ name, expiresAt });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "API key created. Store these credentials securely.",
    data: result,
  });
});

export const securityController = {
  listRoles,
  createRole,
  updateRolePermissions,
  assignRoleToUser,
  revokeUserRole,
  getMyPermissions,
  enable2FA,
  verify2FA,
  getAccessLogs,
  whitelistIp,
  blacklistIp,
  reportIncident,
  requestDataDeletion,
  createApiKey,
};
