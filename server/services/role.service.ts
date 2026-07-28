import status from "http-status";
import customError from "../error/customError";
import { prisma } from "../lib/prisma";

// ==================== 1. ROLE SERVICES ====================
const createRole = async (payload: any) => {
  if (!payload.roleName || !payload.displayName) {
    throw new customError(status.BAD_REQUEST, "roleName and displayName are required.");
  }

  const existingRole = await prisma.role.findUnique({
    where: { roleName: payload.roleName },
  });

  if (existingRole) {
    throw new customError(
      status.CONFLICT,
      `Role with name '${payload.roleName}' already exists`
    );
  }

  return await prisma.role.create({
    data: {
      roleName: payload.roleName,
      displayName: payload.displayName,
      description: payload.description || null,
      roleType: payload.roleType || "CUSTOM",
      priority: payload.priority ? Number(payload.priority) : 0,
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllRoles = async (query?: { roleType?: string; status?: string; search?: string }) => {
  const where: any = {};
  if (query?.roleType) where.roleType = query.roleType;
  if (query?.status) where.status = query.status;
  if (query?.search) {
    where.OR = [
      { roleName: { contains: query.search, mode: "insensitive" } },
      { displayName: { contains: query.search, mode: "insensitive" } },
    ];
  }

  return await prisma.role.findMany({
    where,
    orderBy: { priority: "asc" },
  });
};

const getRoleById = async (id: string) => {
  const role = await prisma.role.findUnique({ where: { id } });
  if (!role) {
    throw new customError(status.NOT_FOUND, "Role not found.");
  }
  return role;
};

const updateRole = async (id: string, payload: any) => {
  const role = await prisma.role.findUnique({ where: { id } });
  if (!role) {
    throw new customError(status.NOT_FOUND, "Role not found.");
  }

  if (payload.roleName && payload.roleName !== role.roleName) {
    const existing = await prisma.role.findUnique({ where: { roleName: payload.roleName } });
    if (existing) {
      throw new customError(status.CONFLICT, `Role with name '${payload.roleName}' already exists.`);
    }
  }

  return await prisma.role.update({
    where: { id },
    data: {
      ...(payload.roleName && { roleName: payload.roleName }),
      ...(payload.displayName && { displayName: payload.displayName }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.roleType && { roleType: payload.roleType }),
      ...(payload.priority !== undefined && { priority: Number(payload.priority) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteRole = async (id: string) => {
  const role = await prisma.role.findUnique({ where: { id } });
  if (!role) {
    throw new customError(status.NOT_FOUND, "Role not found.");
  }
  await prisma.role.delete({ where: { id } });
  return { message: "Role deleted successfully." };
};


// ==================== 2. PERMISSION SERVICES ====================
const createPermission = async (payload: any) => {
  if (!payload.permissionName || !payload.module) {
    throw new customError(status.BAD_REQUEST, "permissionName and module are required.");
  }

  const existing = await prisma.permission.findUnique({
    where: { permissionName: payload.permissionName },
  });

  if (existing) {
    throw new customError(status.CONFLICT, "Permission with this name already exists.");
  }

  return await prisma.permission.create({
    data: {
      permissionName: payload.permissionName,
      module: payload.module,
      description: payload.description || null,
    },
  });
};

const getAllPermissions = async (query?: { module?: string; search?: string }) => {
  const where: any = {};
  if (query?.module) where.module = query.module;
  if (query?.search) {
    where.permissionName = { contains: query.search, mode: "insensitive" };
  }

  return await prisma.permission.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getPermissionById = async (id: string) => {
  const permission = await prisma.permission.findUnique({ where: { id } });
  if (!permission) {
    throw new customError(status.NOT_FOUND, "Permission not found.");
  }
  return permission;
};

const updatePermission = async (id: string, payload: any) => {
  const permission = await prisma.permission.findUnique({ where: { id } });
  if (!permission) {
    throw new customError(status.NOT_FOUND, "Permission not found.");
  }

  if (payload.permissionName && payload.permissionName !== permission.permissionName) {
    const existing = await prisma.permission.findUnique({ where: { permissionName: payload.permissionName } });
    if (existing) {
      throw new customError(status.CONFLICT, "Permission with this name already exists.");
    }
  }

  return await prisma.permission.update({
    where: { id },
    data: {
      ...(payload.permissionName && { permissionName: payload.permissionName }),
      ...(payload.module && { module: payload.module }),
      ...(payload.description !== undefined && { description: payload.description }),
    },
  });
};

const deletePermission = async (id: string) => {
  const permission = await prisma.permission.findUnique({ where: { id } });
  if (!permission) {
    throw new customError(status.NOT_FOUND, "Permission not found.");
  }
  await prisma.permission.delete({ where: { id } });
  return { message: "Permission deleted successfully." };
};


// ==================== 3. ROLE PERMISSION SERVICES ====================
const assignRolePermission = async (payload: any) => {
  if (!payload.roleId || !payload.permissionId) {
    throw new customError(status.BAD_REQUEST, "roleId and permissionId are required.");
  }

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

const getAllRolePermissions = async (query?: { roleId?: string; permissionId?: string }) => {
  const where: any = {};
  if (query?.roleId) where.roleId = query.roleId;
  if (query?.permissionId) where.permissionId = query.permissionId;

  return await prisma.rolePermission.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getRolePermissionById = async (id: string) => {
  const rp = await prisma.rolePermission.findUnique({ where: { id } });
  if (!rp) {
    throw new customError(status.NOT_FOUND, "RolePermission assignment not found.");
  }
  return rp;
};

const updateRolePermission = async (id: string, payload: any) => {
  const rp = await prisma.rolePermission.findUnique({ where: { id } });
  if (!rp) {
    throw new customError(status.NOT_FOUND, "RolePermission assignment not found.");
  }

  return await prisma.rolePermission.update({
    where: { id },
    data: {
      ...(payload.canView !== undefined && { canView: Boolean(payload.canView) }),
      ...(payload.canCreate !== undefined && { canCreate: Boolean(payload.canCreate) }),
      ...(payload.canUpdate !== undefined && { canUpdate: Boolean(payload.canUpdate) }),
      ...(payload.canDelete !== undefined && { canDelete: Boolean(payload.canDelete) }),
      ...(payload.canApprove !== undefined && { canApprove: Boolean(payload.canApprove) }),
    },
  });
};

const deleteRolePermission = async (id: string) => {
  const rp = await prisma.rolePermission.findUnique({ where: { id } });
  if (!rp) {
    throw new customError(status.NOT_FOUND, "RolePermission assignment not found.");
  }
  await prisma.rolePermission.delete({ where: { id } });
  return { message: "RolePermission deleted successfully." };
};


// ==================== 4. USER ROLE SERVICES ====================
const assignUserRole = async (payload: any) => {
  if (!payload.userId || !payload.roleId) {
    throw new customError(status.BAD_REQUEST, "userId and roleId are required.");
  }

  return await prisma.userRoleAssignment.create({
    data: {
      userId: payload.userId,
      roleId: payload.roleId,
      assignedBy: payload.assignedBy || null,
      assignedDate: payload.assignedDate ? new Date(payload.assignedDate) : new Date(),
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllUserRoles = async (query?: { userId?: string; roleId?: string; status?: string }) => {
  const where: any = {};
  if (query?.userId) where.userId = query.userId;
  if (query?.roleId) where.roleId = query.roleId;
  if (query?.status) where.status = query.status;

  return await prisma.userRoleAssignment.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getUserRoleById = async (id: string) => {
  const ur = await prisma.userRoleAssignment.findUnique({ where: { id } });
  if (!ur) {
    throw new customError(status.NOT_FOUND, "UserRole assignment not found.");
  }
  return ur;
};

const updateUserRole = async (id: string, payload: any) => {
  const ur = await prisma.userRoleAssignment.findUnique({ where: { id } });
  if (!ur) {
    throw new customError(status.NOT_FOUND, "UserRole assignment not found.");
  }

  return await prisma.userRoleAssignment.update({
    where: { id },
    data: {
      ...(payload.roleId && { roleId: payload.roleId }),
      ...(payload.assignedBy !== undefined && { assignedBy: payload.assignedBy }),
      ...(payload.assignedDate && { assignedDate: new Date(payload.assignedDate) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteUserRole = async (id: string) => {
  const ur = await prisma.userRoleAssignment.findUnique({ where: { id } });
  if (!ur) {
    throw new customError(status.NOT_FOUND, "UserRole assignment not found.");
  }
  await prisma.userRoleAssignment.delete({ where: { id } });
  return { message: "UserRole assignment deleted successfully." };
};


// ==================== 5. STAFF ROLE SERVICES ====================
const assignStaffRole = async (payload: any) => {
  if (!payload.staffId || !payload.roleId) {
    throw new customError(status.BAD_REQUEST, "staffId and roleId are required.");
  }

  return await prisma.staffRole.create({
    data: {
      staffId: payload.staffId,
      roleId: payload.roleId,
      department: payload.department || null,
      designation: payload.designation || null,
      joiningDate: payload.joiningDate ? new Date(payload.joiningDate) : new Date(),
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllStaffRoles = async (query?: { staffId?: string; roleId?: string; department?: string; status?: string }) => {
  const where: any = {};
  if (query?.staffId) where.staffId = query.staffId;
  if (query?.roleId) where.roleId = query.roleId;
  if (query?.department) where.department = query.department;
  if (query?.status) where.status = query.status;

  return await prisma.staffRole.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getStaffRoleById = async (id: string) => {
  const sr = await prisma.staffRole.findUnique({ where: { id } });
  if (!sr) {
    throw new customError(status.NOT_FOUND, "StaffRole assignment not found.");
  }
  return sr;
};

const updateStaffRole = async (id: string, payload: any) => {
  const sr = await prisma.staffRole.findUnique({ where: { id } });
  if (!sr) {
    throw new customError(status.NOT_FOUND, "StaffRole assignment not found.");
  }

  return await prisma.staffRole.update({
    where: { id },
    data: {
      ...(payload.roleId && { roleId: payload.roleId }),
      ...(payload.department !== undefined && { department: payload.department }),
      ...(payload.designation !== undefined && { designation: payload.designation }),
      ...(payload.joiningDate && { joiningDate: new Date(payload.joiningDate) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteStaffRole = async (id: string) => {
  const sr = await prisma.staffRole.findUnique({ where: { id } });
  if (!sr) {
    throw new customError(status.NOT_FOUND, "StaffRole assignment not found.");
  }
  await prisma.staffRole.delete({ where: { id } });
  return { message: "StaffRole assignment deleted successfully." };
};


// ==================== 6. VOLUNTEER ROLE SERVICES ====================
const assignVolunteerRole = async (payload: any) => {
  if (!payload.volunteerId || !payload.roleId) {
    throw new customError(status.BAD_REQUEST, "volunteerId and roleId are required.");
  }

  return await prisma.volunteerRole.create({
    data: {
      volunteerId: payload.volunteerId,
      roleId: payload.roleId,
      assignedArea: payload.assignedArea || null,
      responsibility: payload.responsibility || null,
      startDate: payload.startDate ? new Date(payload.startDate) : new Date(),
      endDate: payload.endDate ? new Date(payload.endDate) : null,
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllVolunteerRoles = async (query?: { volunteerId?: string; roleId?: string; status?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;
  if (query?.roleId) where.roleId = query.roleId;
  if (query?.status) where.status = query.status;

  return await prisma.volunteerRole.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getVolunteerRoleById = async (id: string) => {
  const vr = await prisma.volunteerRole.findUnique({ where: { id } });
  if (!vr) {
    throw new customError(status.NOT_FOUND, "VolunteerRole assignment not found.");
  }
  return vr;
};

const updateVolunteerRole = async (id: string, payload: any) => {
  const vr = await prisma.volunteerRole.findUnique({ where: { id } });
  if (!vr) {
    throw new customError(status.NOT_FOUND, "VolunteerRole assignment not found.");
  }

  return await prisma.volunteerRole.update({
    where: { id },
    data: {
      ...(payload.roleId && { roleId: payload.roleId }),
      ...(payload.assignedArea !== undefined && { assignedArea: payload.assignedArea }),
      ...(payload.responsibility !== undefined && { responsibility: payload.responsibility }),
      ...(payload.startDate && { startDate: new Date(payload.startDate) }),
      ...(payload.endDate !== undefined && { endDate: payload.endDate ? new Date(payload.endDate) : null }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteVolunteerRole = async (id: string) => {
  const vr = await prisma.volunteerRole.findUnique({ where: { id } });
  if (!vr) {
    throw new customError(status.NOT_FOUND, "VolunteerRole assignment not found.");
  }
  await prisma.volunteerRole.delete({ where: { id } });
  return { message: "VolunteerRole assignment deleted successfully." };
};


// ==================== 7. COORDINATOR ROLE SERVICES ====================
const assignCoordinatorRole = async (payload: any) => {
  if (!payload.coordinatorId || !payload.roleId) {
    throw new customError(status.BAD_REQUEST, "coordinatorId and roleId are required.");
  }

  return await prisma.coordinatorRole.create({
    data: {
      coordinatorId: payload.coordinatorId,
      roleId: payload.roleId,
      organizationLevel: payload.organizationLevel || null,
      divisionId: payload.divisionId || null,
      districtId: payload.districtId || null,
      upazilaId: payload.upazilaId || null,
      unionId: payload.unionId || null,
      assignedDate: payload.assignedDate ? new Date(payload.assignedDate) : new Date(),
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllCoordinatorRoles = async (query?: { coordinatorId?: string; roleId?: string; organizationLevel?: string; status?: string }) => {
  const where: any = {};
  if (query?.coordinatorId) where.coordinatorId = query.coordinatorId;
  if (query?.roleId) where.roleId = query.roleId;
  if (query?.organizationLevel) where.organizationLevel = query.organizationLevel;
  if (query?.status) where.status = query.status;

  return await prisma.coordinatorRole.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getCoordinatorRoleById = async (id: string) => {
  const cr = await prisma.coordinatorRole.findUnique({ where: { id } });
  if (!cr) {
    throw new customError(status.NOT_FOUND, "CoordinatorRole assignment not found.");
  }
  return cr;
};

const updateCoordinatorRole = async (id: string, payload: any) => {
  const cr = await prisma.coordinatorRole.findUnique({ where: { id } });
  if (!cr) {
    throw new customError(status.NOT_FOUND, "CoordinatorRole assignment not found.");
  }

  return await prisma.coordinatorRole.update({
    where: { id },
    data: {
      ...(payload.roleId && { roleId: payload.roleId }),
      ...(payload.organizationLevel !== undefined && { organizationLevel: payload.organizationLevel }),
      ...(payload.divisionId !== undefined && { divisionId: payload.divisionId }),
      ...(payload.districtId !== undefined && { districtId: payload.districtId }),
      ...(payload.upazilaId !== undefined && { upazilaId: payload.upazilaId }),
      ...(payload.unionId !== undefined && { unionId: payload.unionId }),
      ...(payload.assignedDate && { assignedDate: new Date(payload.assignedDate) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteCoordinatorRole = async (id: string) => {
  const cr = await prisma.coordinatorRole.findUnique({ where: { id } });
  if (!cr) {
    throw new customError(status.NOT_FOUND, "CoordinatorRole assignment not found.");
  }
  await prisma.coordinatorRole.delete({ where: { id } });
  return { message: "CoordinatorRole assignment deleted successfully." };
};


// ==================== 8. COMMITTEE ROLE SERVICES ====================
const assignCommitteeRole = async (payload: any) => {
  if (!payload.committeeId || !payload.memberId || !payload.role) {
    throw new customError(status.BAD_REQUEST, "committeeId, memberId, and role are required.");
  }

  return await prisma.committeeRole.create({
    data: {
      committeeId: payload.committeeId,
      memberId: payload.memberId,
      role: payload.role,
      startDate: payload.startDate ? new Date(payload.startDate) : new Date(),
      endDate: payload.endDate ? new Date(payload.endDate) : null,
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllCommitteeRoles = async (query?: { committeeId?: string; memberId?: string; role?: string; status?: string }) => {
  const where: any = {};
  if (query?.committeeId) where.committeeId = query.committeeId;
  if (query?.memberId) where.memberId = query.memberId;
  if (query?.role) where.role = query.role;
  if (query?.status) where.status = query.status;

  return await prisma.committeeRole.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getCommitteeRoleById = async (id: string) => {
  const cr = await prisma.committeeRole.findUnique({ where: { id } });
  if (!cr) {
    throw new customError(status.NOT_FOUND, "CommitteeRole assignment not found.");
  }
  return cr;
};

const updateCommitteeRole = async (id: string, payload: any) => {
  const cr = await prisma.committeeRole.findUnique({ where: { id } });
  if (!cr) {
    throw new customError(status.NOT_FOUND, "CommitteeRole assignment not found.");
  }

  return await prisma.committeeRole.update({
    where: { id },
    data: {
      ...(payload.committeeId && { committeeId: payload.committeeId }),
      ...(payload.memberId && { memberId: payload.memberId }),
      ...(payload.role && { role: payload.role }),
      ...(payload.startDate && { startDate: new Date(payload.startDate) }),
      ...(payload.endDate !== undefined && { endDate: payload.endDate ? new Date(payload.endDate) : null }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteCommitteeRole = async (id: string) => {
  const cr = await prisma.committeeRole.findUnique({ where: { id } });
  if (!cr) {
    throw new customError(status.NOT_FOUND, "CommitteeRole assignment not found.");
  }
  await prisma.committeeRole.delete({ where: { id } });
  return { message: "CommitteeRole assignment deleted successfully." };
};


// ==================== 9. ADMIN PERMISSION SERVICES ====================
const createAdminPermission = async (payload: any) => {
  if (!payload.adminId || !payload.module) {
    throw new customError(status.BAD_REQUEST, "adminId and module are required.");
  }

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

const getAllAdminPermissions = async (query?: { adminId?: string; module?: string }) => {
  const where: any = {};
  if (query?.adminId) where.adminId = query.adminId;
  if (query?.module) where.module = query.module;

  return await prisma.adminPermission.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getAdminPermissionById = async (id: string) => {
  const ap = await prisma.adminPermission.findUnique({ where: { id } });
  if (!ap) {
    throw new customError(status.NOT_FOUND, "AdminPermission record not found.");
  }
  return ap;
};

const updateAdminPermission = async (id: string, payload: any) => {
  const ap = await prisma.adminPermission.findUnique({ where: { id } });
  if (!ap) {
    throw new customError(status.NOT_FOUND, "AdminPermission record not found.");
  }

  return await prisma.adminPermission.update({
    where: { id },
    data: {
      ...(payload.module && { module: payload.module }),
      ...(payload.canView !== undefined && { canView: Boolean(payload.canView) }),
      ...(payload.canCreate !== undefined && { canCreate: Boolean(payload.canCreate) }),
      ...(payload.canUpdate !== undefined && { canUpdate: Boolean(payload.canUpdate) }),
      ...(payload.canDelete !== undefined && { canDelete: Boolean(payload.canDelete) }),
      ...(payload.canApprove !== undefined && { canApprove: Boolean(payload.canApprove) }),
      ...(payload.canExport !== undefined && { canExport: Boolean(payload.canExport) }),
    },
  });
};

const deleteAdminPermission = async (id: string) => {
  const ap = await prisma.adminPermission.findUnique({ where: { id } });
  if (!ap) {
    throw new customError(status.NOT_FOUND, "AdminPermission record not found.");
  }
  await prisma.adminPermission.delete({ where: { id } });
  return { message: "AdminPermission record deleted successfully." };
};


// ==================== 10. ROLE HIERARCHY SERVICES ====================
const createRoleHierarchy = async (payload: any) => {
  if (!payload.parentRoleId || !payload.childRoleId) {
    throw new customError(status.BAD_REQUEST, "parentRoleId and childRoleId are required.");
  }

  return await prisma.roleHierarchy.create({
    data: {
      parentRoleId: payload.parentRoleId,
      childRoleId: payload.childRoleId,
      hierarchyLevel: payload.hierarchyLevel ? Number(payload.hierarchyLevel) : 1,
    },
  });
};

const getAllRoleHierarchies = async (query?: { parentRoleId?: string; childRoleId?: string }) => {
  const where: any = {};
  if (query?.parentRoleId) where.parentRoleId = query.parentRoleId;
  if (query?.childRoleId) where.childRoleId = query.childRoleId;

  return await prisma.roleHierarchy.findMany({
    where,
    orderBy: { hierarchyLevel: "asc" },
  });
};

const getRoleHierarchyById = async (id: string) => {
  const rh = await prisma.roleHierarchy.findUnique({ where: { id } });
  if (!rh) {
    throw new customError(status.NOT_FOUND, "RoleHierarchy record not found.");
  }
  return rh;
};

const updateRoleHierarchy = async (id: string, payload: any) => {
  const rh = await prisma.roleHierarchy.findUnique({ where: { id } });
  if (!rh) {
    throw new customError(status.NOT_FOUND, "RoleHierarchy record not found.");
  }

  return await prisma.roleHierarchy.update({
    where: { id },
    data: {
      ...(payload.parentRoleId && { parentRoleId: payload.parentRoleId }),
      ...(payload.childRoleId && { childRoleId: payload.childRoleId }),
      ...(payload.hierarchyLevel !== undefined && { hierarchyLevel: Number(payload.hierarchyLevel) }),
    },
  });
};

const deleteRoleHierarchy = async (id: string) => {
  const rh = await prisma.roleHierarchy.findUnique({ where: { id } });
  if (!rh) {
    throw new customError(status.NOT_FOUND, "RoleHierarchy record not found.");
  }
  await prisma.roleHierarchy.delete({ where: { id } });
  return { message: "RoleHierarchy record deleted successfully." };
};


// ==================== 11. ACCESS LOG SERVICES ====================
const createAccessLog = async (payload: any) => {
  if (!payload.userId || !payload.module || !payload.action) {
    throw new customError(status.BAD_REQUEST, "userId, module, and action are required.");
  }

  return await prisma.accessLog.create({
    data: {
      userId: payload.userId,
      roleId: payload.roleId || null,
      module: payload.module,
      action: payload.action,
      ipAddress: payload.ipAddress || null,
      device: payload.device || null,
      browser: payload.browser || null,
    },
  });
};

const getAllAccessLogs = async (query?: { userId?: string; roleId?: string; module?: string; action?: string }) => {
  const where: any = {};
  if (query?.userId) where.userId = query.userId;
  if (query?.roleId) where.roleId = query.roleId;
  if (query?.module) where.module = query.module;
  if (query?.action) where.action = query.action;

  return await prisma.accessLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getAccessLogById = async (id: string) => {
  const log = await prisma.accessLog.findUnique({ where: { id } });
  if (!log) {
    throw new customError(status.NOT_FOUND, "Access log entry not found.");
  }
  return log;
};

const deleteAccessLog = async (id: string) => {
  const log = await prisma.accessLog.findUnique({ where: { id } });
  if (!log) {
    throw new customError(status.NOT_FOUND, "Access log entry not found.");
  }
  await prisma.accessLog.delete({ where: { id } });
  return { message: "Access log entry deleted successfully." };
};


export const roleServices = {
  // Role
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  // Permission
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
  // RolePermission
  assignRolePermission,
  getAllRolePermissions,
  getRolePermissionById,
  updateRolePermission,
  deleteRolePermission,
  // UserRole
  assignUserRole,
  getAllUserRoles,
  getUserRoleById,
  updateUserRole,
  deleteUserRole,
  // StaffRole
  assignStaffRole,
  getAllStaffRoles,
  getStaffRoleById,
  updateStaffRole,
  deleteStaffRole,
  // VolunteerRole
  assignVolunteerRole,
  getAllVolunteerRoles,
  getVolunteerRoleById,
  updateVolunteerRole,
  deleteVolunteerRole,
  // CoordinatorRole
  assignCoordinatorRole,
  getAllCoordinatorRoles,
  getCoordinatorRoleById,
  updateCoordinatorRole,
  deleteCoordinatorRole,
  // CommitteeRole
  assignCommitteeRole,
  getAllCommitteeRoles,
  getCommitteeRoleById,
  updateCommitteeRole,
  deleteCommitteeRole,
  // AdminPermission
  createAdminPermission,
  getAllAdminPermissions,
  getAdminPermissionById,
  updateAdminPermission,
  deleteAdminPermission,
  // RoleHierarchy
  createRoleHierarchy,
  getAllRoleHierarchies,
  getRoleHierarchyById,
  updateRoleHierarchy,
  deleteRoleHierarchy,
  // AccessLog
  createAccessLog,
  getAllAccessLogs,
  getAccessLogById,
  deleteAccessLog,
};
