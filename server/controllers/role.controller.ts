import status from "http-status";
import { roleServices } from "../services/role.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

// ==================== 1. ROLE CONTROLLERS ====================
const createRole = catchAsync(async (req, res) => {
  const result = await roleServices.createRole(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Role created successfully",
    data: result,
  });
});

const getAllRoles = catchAsync(async (req, res) => {
  const result = await roleServices.getAllRoles(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Roles retrieved successfully",
    data: result,
  });
});

const getRoleById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.getRoleById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Role retrieved successfully",
    data: result,
  });
});

const updateRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.updateRole(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Role updated successfully",
    data: result,
  });
});

const deleteRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.deleteRole(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Role deleted successfully",
    data: result,
  });
});


// ==================== 2. PERMISSION CONTROLLERS ====================
const createPermission = catchAsync(async (req, res) => {
  const result = await roleServices.createPermission(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Permission created successfully",
    data: result,
  });
});

const getAllPermissions = catchAsync(async (req, res) => {
  const result = await roleServices.getAllPermissions(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Permissions retrieved successfully",
    data: result,
  });
});

const getPermissionById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.getPermissionById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Permission retrieved successfully",
    data: result,
  });
});

const updatePermission = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.updatePermission(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Permission updated successfully",
    data: result,
  });
});

const deletePermission = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.deletePermission(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Permission deleted successfully",
    data: result,
  });
});


// ==================== 3. ROLE PERMISSION CONTROLLERS ====================
const assignRolePermission = catchAsync(async (req, res) => {
  const result = await roleServices.assignRolePermission(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Permission assigned to role successfully",
    data: result,
  });
});

const getAllRolePermissions = catchAsync(async (req, res) => {
  const result = await roleServices.getAllRolePermissions(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Role permissions fetched successfully",
    data: result,
  });
});

const getRolePermissionById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.getRolePermissionById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Role permission fetched successfully",
    data: result,
  });
});

const updateRolePermission = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.updateRolePermission(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Role permission updated successfully",
    data: result,
  });
});

const deleteRolePermission = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.deleteRolePermission(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Role permission deleted successfully",
    data: result,
  });
});


// ==================== 4. USER ROLE CONTROLLERS ====================
const assignUserRole = catchAsync(async (req, res) => {
  const result = await roleServices.assignUserRole(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "User role assigned successfully",
    data: result,
  });
});

const getAllUserRoles = catchAsync(async (req, res) => {
  const result = await roleServices.getAllUserRoles(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "User roles fetched successfully",
    data: result,
  });
});

const getUserRoleById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.getUserRoleById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "User role fetched successfully",
    data: result,
  });
});

const updateUserRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.updateUserRole(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "User role updated successfully",
    data: result,
  });
});

const deleteUserRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.deleteUserRole(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "User role assignment deleted successfully",
    data: result,
  });
});


// ==================== 5. STAFF ROLE CONTROLLERS ====================
const assignStaffRole = catchAsync(async (req, res) => {
  const result = await roleServices.assignStaffRole(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Staff role assigned successfully",
    data: result,
  });
});

const getAllStaffRoles = catchAsync(async (req, res) => {
  const result = await roleServices.getAllStaffRoles(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Staff roles fetched successfully",
    data: result,
  });
});

const getStaffRoleById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.getStaffRoleById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Staff role fetched successfully",
    data: result,
  });
});

const updateStaffRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.updateStaffRole(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Staff role updated successfully",
    data: result,
  });
});

const deleteStaffRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.deleteStaffRole(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Staff role assignment deleted successfully",
    data: result,
  });
});


// ==================== 6. VOLUNTEER ROLE CONTROLLERS ====================
const assignVolunteerRole = catchAsync(async (req, res) => {
  const result = await roleServices.assignVolunteerRole(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Volunteer role assigned successfully",
    data: result,
  });
});

const getAllVolunteerRoles = catchAsync(async (req, res) => {
  const result = await roleServices.getAllVolunteerRoles(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer roles fetched successfully",
    data: result,
  });
});

const getVolunteerRoleById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.getVolunteerRoleById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer role fetched successfully",
    data: result,
  });
});

const updateVolunteerRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.updateVolunteerRole(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer role updated successfully",
    data: result,
  });
});

const deleteVolunteerRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.deleteVolunteerRole(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Volunteer role assignment deleted successfully",
    data: result,
  });
});


// ==================== 7. COORDINATOR ROLE CONTROLLERS ====================
const assignCoordinatorRole = catchAsync(async (req, res) => {
  const result = await roleServices.assignCoordinatorRole(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Coordinator role assigned successfully",
    data: result,
  });
});

const getAllCoordinatorRoles = catchAsync(async (req, res) => {
  const result = await roleServices.getAllCoordinatorRoles(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Coordinator roles fetched successfully",
    data: result,
  });
});

const getCoordinatorRoleById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.getCoordinatorRoleById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Coordinator role fetched successfully",
    data: result,
  });
});

const updateCoordinatorRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.updateCoordinatorRole(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Coordinator role updated successfully",
    data: result,
  });
});

const deleteCoordinatorRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.deleteCoordinatorRole(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Coordinator role assignment deleted successfully",
    data: result,
  });
});


// ==================== 8. COMMITTEE ROLE CONTROLLERS ====================
const assignCommitteeRole = catchAsync(async (req, res) => {
  const result = await roleServices.assignCommitteeRole(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Committee role assigned successfully",
    data: result,
  });
});

const getAllCommitteeRoles = catchAsync(async (req, res) => {
  const result = await roleServices.getAllCommitteeRoles(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Committee roles fetched successfully",
    data: result,
  });
});

const getCommitteeRoleById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.getCommitteeRoleById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Committee role fetched successfully",
    data: result,
  });
});

const updateCommitteeRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.updateCommitteeRole(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Committee role updated successfully",
    data: result,
  });
});

const deleteCommitteeRole = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.deleteCommitteeRole(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Committee role assignment deleted successfully",
    data: result,
  });
});


// ==================== 9. ADMIN PERMISSION CONTROLLERS ====================
const createAdminPermission = catchAsync(async (req, res) => {
  const result = await roleServices.createAdminPermission(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Admin permission created successfully",
    data: result,
  });
});

const getAllAdminPermissions = catchAsync(async (req, res) => {
  const result = await roleServices.getAllAdminPermissions(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Admin permissions fetched successfully",
    data: result,
  });
});

const getAdminPermissionById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.getAdminPermissionById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Admin permission fetched successfully",
    data: result,
  });
});

const updateAdminPermission = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.updateAdminPermission(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Admin permission updated successfully",
    data: result,
  });
});

const deleteAdminPermission = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.deleteAdminPermission(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Admin permission deleted successfully",
    data: result,
  });
});


// ==================== 10. ROLE HIERARCHY CONTROLLERS ====================
const createRoleHierarchy = catchAsync(async (req, res) => {
  const result = await roleServices.createRoleHierarchy(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Role hierarchy created successfully",
    data: result,
  });
});

const getAllRoleHierarchies = catchAsync(async (req, res) => {
  const result = await roleServices.getAllRoleHierarchies(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Role hierarchies fetched successfully",
    data: result,
  });
});

const getRoleHierarchyById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.getRoleHierarchyById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Role hierarchy fetched successfully",
    data: result,
  });
});

const updateRoleHierarchy = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.updateRoleHierarchy(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Role hierarchy updated successfully",
    data: result,
  });
});

const deleteRoleHierarchy = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.deleteRoleHierarchy(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Role hierarchy deleted successfully",
    data: result,
  });
});


// ==================== 11. ACCESS LOG CONTROLLERS ====================
const createAccessLog = catchAsync(async (req, res) => {
  const result = await roleServices.createAccessLog(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Access log created successfully",
    data: result,
  });
});

const getAllAccessLogs = catchAsync(async (req, res) => {
  const result = await roleServices.getAllAccessLogs(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Access logs fetched successfully",
    data: result,
  });
});

const getAccessLogById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.getAccessLogById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Access log entry fetched successfully",
    data: result,
  });
});

const deleteAccessLog = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.deleteAccessLog(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Access log entry deleted successfully",
    data: result,
  });
});


export const roleController = {
  // 1. Role
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  // 2. Permission
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
  // 3. RolePermission
  assignRolePermission,
  getAllRolePermissions,
  getRolePermissionById,
  updateRolePermission,
  deleteRolePermission,
  // 4. UserRole
  assignUserRole,
  getAllUserRoles,
  getUserRoleById,
  updateUserRole,
  deleteUserRole,
  // 5. StaffRole
  assignStaffRole,
  getAllStaffRoles,
  getStaffRoleById,
  updateStaffRole,
  deleteStaffRole,
  // 6. VolunteerRole
  assignVolunteerRole,
  getAllVolunteerRoles,
  getVolunteerRoleById,
  updateVolunteerRole,
  deleteVolunteerRole,
  // 7. CoordinatorRole
  assignCoordinatorRole,
  getAllCoordinatorRoles,
  getCoordinatorRoleById,
  updateCoordinatorRole,
  deleteCoordinatorRole,
  // 8. CommitteeRole
  assignCommitteeRole,
  getAllCommitteeRoles,
  getCommitteeRoleById,
  updateCommitteeRole,
  deleteCommitteeRole,
  // 9. AdminPermission
  createAdminPermission,
  getAllAdminPermissions,
  getAdminPermissionById,
  updateAdminPermission,
  deleteAdminPermission,
  // 10. RoleHierarchy
  createRoleHierarchy,
  getAllRoleHierarchies,
  getRoleHierarchyById,
  updateRoleHierarchy,
  deleteRoleHierarchy,
  // 11. AccessLog
  createAccessLog,
  getAllAccessLogs,
  getAccessLogById,
  deleteAccessLog,
};
