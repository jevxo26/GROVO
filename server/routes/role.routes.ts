import { Router } from "express";
import { roleController } from "../controllers/role.controller";

const router = Router();

// ==================== 1. ROLE ROUTES ====================
router.post("/roles", roleController.createRole);
router.get("/roles", roleController.getAllRoles);
router.get("/roles/:id", roleController.getRoleById);
router.patch("/roles/:id", roleController.updateRole);
router.delete("/roles/:id", roleController.deleteRole);

// ==================== 2. PERMISSION ROUTES ====================
router.post("/permissions", roleController.createPermission);
router.get("/permissions", roleController.getAllPermissions);
router.get("/permissions/:id", roleController.getPermissionById);
router.patch("/permissions/:id", roleController.updatePermission);
router.delete("/permissions/:id", roleController.deletePermission);

// ==================== 3. ROLE PERMISSION ROUTES ====================
router.post("/role-permissions", roleController.assignRolePermission);
router.get("/role-permissions", roleController.getAllRolePermissions);
router.get("/role-permissions/:id", roleController.getRolePermissionById);
router.patch("/role-permissions/:id", roleController.updateRolePermission);
router.delete("/role-permissions/:id", roleController.deleteRolePermission);

// ==================== 4. USER ROLE ROUTES ====================
router.post("/user-roles", roleController.assignUserRole);
router.get("/user-roles", roleController.getAllUserRoles);
router.get("/user-roles/:id", roleController.getUserRoleById);
router.patch("/user-roles/:id", roleController.updateUserRole);
router.delete("/user-roles/:id", roleController.deleteUserRole);

// ==================== 5. STAFF ROLE ROUTES ====================
router.post("/staff-roles", roleController.assignStaffRole);
router.get("/staff-roles", roleController.getAllStaffRoles);
router.get("/staff-roles/:id", roleController.getStaffRoleById);
router.patch("/staff-roles/:id", roleController.updateStaffRole);
router.delete("/staff-roles/:id", roleController.deleteStaffRole);

// ==================== 6. VOLUNTEER ROLE ROUTES ====================
router.post("/volunteer-roles", roleController.assignVolunteerRole);
router.get("/volunteer-roles", roleController.getAllVolunteerRoles);
router.get("/volunteer-roles/:id", roleController.getVolunteerRoleById);
router.patch("/volunteer-roles/:id", roleController.updateVolunteerRole);
router.delete("/volunteer-roles/:id", roleController.deleteVolunteerRole);

// ==================== 7. COORDINATOR ROLE ROUTES ====================
router.post("/coordinator-roles", roleController.assignCoordinatorRole);
router.get("/coordinator-roles", roleController.getAllCoordinatorRoles);
router.get("/coordinator-roles/:id", roleController.getCoordinatorRoleById);
router.patch("/coordinator-roles/:id", roleController.updateCoordinatorRole);
router.delete("/coordinator-roles/:id", roleController.deleteCoordinatorRole);

// ==================== 8. COMMITTEE ROLE ROUTES ====================
router.post("/committee-roles", roleController.assignCommitteeRole);
router.get("/committee-roles", roleController.getAllCommitteeRoles);
router.get("/committee-roles/:id", roleController.getCommitteeRoleById);
router.patch("/committee-roles/:id", roleController.updateCommitteeRole);
router.delete("/committee-roles/:id", roleController.deleteCommitteeRole);

// ==================== 9. ADMIN PERMISSION ROUTES ====================
router.post("/admin-permissions", roleController.createAdminPermission);
router.get("/admin-permissions", roleController.getAllAdminPermissions);
router.get("/admin-permissions/:id", roleController.getAdminPermissionById);
router.patch("/admin-permissions/:id", roleController.updateAdminPermission);
router.delete("/admin-permissions/:id", roleController.deleteAdminPermission);

// ==================== 10. ROLE HIERARCHY ROUTES ====================
router.post("/hierarchies", roleController.createRoleHierarchy);
router.get("/hierarchies", roleController.getAllRoleHierarchies);
router.get("/hierarchies/:id", roleController.getRoleHierarchyById);
router.patch("/hierarchies/:id", roleController.updateRoleHierarchy);
router.delete("/hierarchies/:id", roleController.deleteRoleHierarchy);

// ==================== 11. ACCESS LOG ROUTES ====================
router.post("/access-logs", roleController.createAccessLog);
router.get("/access-logs", roleController.getAllAccessLogs);
router.get("/access-logs/:id", roleController.getAccessLogById);
router.delete("/access-logs/:id", roleController.deleteAccessLog);

export const roleRoutes = router;
