import express from "express";
import { zoneAssignmentController } from "../controllers/organization/zoneAssignment.controller";

const router = express.Router();

router.post("/", zoneAssignmentController.createZoneAssignment);
router.get("/", zoneAssignmentController.getAllZoneAssignments);
router.get("/:id", zoneAssignmentController.getZoneAssignmentById);
router.patch("/:id", zoneAssignmentController.updateZoneAssignment);
router.delete("/:id", zoneAssignmentController.deleteZoneAssignment);

export const zoneAssignmentRoutes = router;
