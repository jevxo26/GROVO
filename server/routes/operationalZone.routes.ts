import express from "express";
import { operationalZoneController } from "../controllers/organization/operationalZone.controller";

const router = express.Router();

router.post("/", operationalZoneController.createOperationalZone);
router.get("/", operationalZoneController.getAllOperationalZones);
router.get("/:id", operationalZoneController.getOperationalZoneById);
router.patch("/:id", operationalZoneController.updateOperationalZone);
router.delete("/:id", operationalZoneController.deleteOperationalZone);

export const operationalZoneRoutes = router;
