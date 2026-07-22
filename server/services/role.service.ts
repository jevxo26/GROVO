import status from "http-status";
import customError from "../error/customError";
import { prisma } from "../lib/prisma";

// ==================== ROLE SERVICES ====================
const createRole = async (payload: any) => {
  const existingRole = await prisma.role.findUnique({
    where: { roleName: payload.roleName },
  });

  if (existingRole) {
    throw new customError(
      status.CONFLICT,
      `Role with name '${payload.roleName}' already exists`,
    );
  }

  return await prisma.role.create({
    data: {
      roleName: payload.roleName,
      displayName: payload.displayName,
      description: payload.description,
      roleType: payload.roleType,
      priority: payload.priority ? Number(payload.priority) : 0,
      status: payload.status,
    },
  });
};

const getAllRoles = async () => {
  return await prisma.role.findMany({
    orderBy: { priority: "asc" },
  });
};

// ==================== PERMISSION SERVICES ====================
const createPermission = async (payload: any) => {
  const existing = await prisma.permission.findUnique({
    where: { permissionName: payload.permissionName },
  });

  if (existing) {
    throw new customError(status.CONFLICT, "Permission already exists");
  }

  return await prisma.permission.create({
    data: {
      permissionName: payload.permissionName,
      module: payload.module,
      description: payload.description,
    },
  });
};

const getAllPermissions = async () => {
  return await prisma.permission.findMany();
};

// ==================== ROLE PERMISSION SERVICES ====================
const assignRolePermission = async (payload: any) => {
  return await prisma.rolePermission.create({
    data: {
      roleId: payload.roleId,
      permissionId: payload.permissionId,
      canView: Boolean(payload.canView),
      canCreate: Boolean(payload.canCreate),
      canUpdate: Boolean(payload.canUpdate),
      canDelete: Boolean(payload.canDelete),
      canApprove: Boolean(payload.canApprove),
    },
  });
};

// ==================== USER ROLE SERVICES ====================
const assignUserRole = async (payload: any) => {
  return await prisma.userRole.create({
    data: {
      userId: payload.userId,
      roleId: payload.roleId,
      assignedBy: payload.assignedBy,
      assignedDate: payload.assignedDate
        ? new Date(payload.assignedDate)
        : undefined,
      status: payload.status,
    },
  });
};

// ==================== COORDINATOR ROLE SERVICES ====================
const assignCoordinatorRole = async (payload: any) => {
  return await prisma.coordinatorRole.create({
    data: {
      coordinatorId: payload.coordinatorId,
      roleId: payload.roleId,
      organizationLevel: payload.organizationLevel,
      divisionId: payload.divisionId,
      districtId: payload.districtId,
      upazilaId: payload.upazilaId,
      unionId: payload.unionId,
      assignedDate: payload.assignedDate
        ? new Date(payload.assignedDate)
        : undefined,
      status: payload.status,
    },
  });
};

// ==================== VOLUNTEER ROLE SERVICES ====================
const assignVolunteerRole = async (payload: any) => {
  return await prisma.volunteerRole.create({
    data: {
      volunteerId: payload.volunteerId,
      roleId: payload.roleId,
      assignedArea: payload.assignedArea,
      responsibility: payload.responsibility,
      startDate: new Date(payload.startDate),
      endDate: payload.endDate ? new Date(payload.endDate) : null,
      status: payload.status,
    },
  });
};

// ==================== STAFF ROLE SERVICES ====================
const assignStaffRole = async (payload: any) => {
  return await prisma.staffRole.create({
    data: {
      staffId: payload.staffId,
      roleId: payload.roleId,
      department: payload.department,
      designation: payload.designation,
      joiningDate: new Date(payload.joiningDate),
      status: payload.status,
    },
  });
};

// ==================== COMMITTEE ROLE SERVICES ====================
const assignCommitteeRole = async (payload: any) => {
  return await prisma.committeeRole.create({
    data: {
      committeeId: payload.committeeId,
      memberId: payload.memberId,
      role: payload.role,
      startDate: new Date(payload.startDate),
      endDate: payload.endDate ? new Date(payload.endDate) : null,
      status: payload.status,
    },
  });
};

// ==================== ADMIN PERMISSION SERVICES ====================
const createAdminPermission = async (payload: any) => {
  return await prisma.adminPermission.create({
    data: {
      adminId: payload.adminId,
      module: payload.module,
      canView: Boolean(payload.canView),
      canCreate: Boolean(payload.canCreate),
      canUpdate: Boolean(payload.canUpdate),
      canDelete: Boolean(payload.canDelete),
      canApprove: Boolean(payload.canApprove),
      canExport: Boolean(payload.canExport),
    },
  });
};

// ==================== ROLE HIERARCHY SERVICES ====================
const createRoleHierarchy = async (payload: any) => {
  return await prisma.roleHierarchy.create({
    data: {
      parentRoleId: payload.parentRoleId,
      childRoleId: payload.childRoleId,
      hierarchyLevel: payload.hierarchyLevel
        ? Number(payload.hierarchyLevel)
        : 1,
    },
  });
};

// ==================== ACCESS LOG SERVICES ====================
const createAccessLog = async (payload: any) => {
  return await prisma.accessLog.create({
    data: {
      userId: payload.userId,
      roleId: payload.roleId,
      module: payload.module,
      action: payload.action,
      ipAddress: payload.ipAddress,
      device: payload.device,
      browser: payload.browser,
    },
  });
};

const getAllAccessLogs = async () => {
  return await prisma.accessLog.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const roleServices = {
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
