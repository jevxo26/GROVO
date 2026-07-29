import express from "express";
import { regionalCoordinatorController } from "../controllers/organization/regionalCoordinator.controller";

const router = express.Router();

router.post("/", regionalCoordinatorController.assignRegionalCoordinator);
router.get("/", regionalCoordinatorController.getAllRegionalCoordinators);
router.get("/:id", regionalCoordinatorController.getRegionalCoordinatorById);
router.patch("/:id", regionalCoordinatorController.updateRegionalCoordinator);
router.delete("/:id", regionalCoordinatorController.deleteRegionalCoordinator);

export const regionalCoordinatorRoutes = router;
