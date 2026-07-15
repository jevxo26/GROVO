import { Router } from "express";
import { notificationController } from "../controllers/notification.controller";
import { supportController } from "../controllers/support.controller";
import { cmsController } from "../controllers/cms.controller";
import { branchController } from "../controllers/branch.controller";

const router = Router();

// Module 10 Admin routes
router.post("/notifications", notificationController.createNotification);
router.post("/emergency-alerts", notificationController.createEmergencyAlert);
router.post("/emergency-alerts/:id/resolve", notificationController.resolveEmergencyAlert);
router.get("/support/tickets", supportController.listAllTickets);

// Module 12 Admin CMS / Systems routes
router.post("/cms/pages", cmsController.createPage); // cmsController has createPage, we will extend it
router.put("/system/settings/:key", cmsController.updateSystemSetting);

// Module 13 Admin regional coordinator/territory assignments
router.post("/coordinators", branchController.assignCoordinator);
router.post("/territories", branchController.assignTerritory);

export const adminRouter = router;
