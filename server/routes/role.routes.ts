import { Router } from "express";
import { roleController } from "../controllers/role.controller";

const router = Router();

// ==================== BASE ROLES & PERMISSIONS ====================
router.post("/roles", roleController.createRole);
router.get("/roles", roleController.getAllRoles);

router.post("/permissions", roleController.createPermission);
router.get("/permissions", roleController.getAllPermissions);

router.post("/role-permissions", roleController.assignRolePermission);

// ==================== ROLE ASSIGNMENTS ====================
router.post("/user-roles", roleController.assignUserRole);
router.post("/coordinator-roles", roleController.assignCoordinatorRole);
router.post("/volunteer-roles", roleController.assignVolunteerRole);
router.post("/staff-roles", roleController.assignStaffRole);
router.post("/committee-roles", roleController.assignCommitteeRole);

// ==================== ADMIN & HIERARCHY ====================
router.post("/admin-permissions", roleController.createAdminPermission);
router.post("/hierarchies", roleController.createRoleHierarchy);

// ==================== ACCESS LOGS ====================
router.post("/access-logs", roleController.createAccessLog);
router.get("/access-logs", roleController.getAllAccessLogs);

export const roleRoutes = router;
