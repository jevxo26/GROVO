import { Router } from "express";
import { securityController } from "../controllers/security.controller";

const router = Router();

// Role Management
router.get("/roles", securityController.listRoles);
router.post("/roles", securityController.createRole);
router.put("/roles/:id/permissions", securityController.updateRolePermissions);

// User Role Assignment
router.post("/users/:id/roles", securityController.assignRoleToUser);
router.delete("/users/:id/roles/:role_id", securityController.revokeUserRole);

// My Permissions
router.get("/me/permissions", securityController.getMyPermissions);

// 2FA
router.post("/2fa/enable", securityController.enable2FA);
router.post("/2fa/verify", securityController.verify2FA);

// Audit Logs
router.get("/access-logs", securityController.getAccessLogs);

// IP Management
router.post("/network/whitelist", securityController.whitelistIp);
router.post("/ip-blacklist", securityController.blacklistIp);

// Security Incidents
router.post("/incidents", securityController.reportIncident);

// GDPR Data Deletion
router.post("/data-deletion", securityController.requestDataDeletion);

// API Keys
router.post("/api-keys", securityController.createApiKey);

export const securityRouter = router;
