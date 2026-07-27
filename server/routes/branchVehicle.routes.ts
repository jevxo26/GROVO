import express from "express";
import { branchVehicleController } from "../controllers/organization/branchVehicle.controller";

const router = express.Router();

router.post("/", branchVehicleController.createBranchVehicle);
router.get("/", branchVehicleController.getAllBranchVehicles);
router.get("/:id", branchVehicleController.getBranchVehicleById);
router.patch("/:id", branchVehicleController.updateBranchVehicle);
router.delete("/:id", branchVehicleController.deleteBranchVehicle);

export const branchVehicleRoutes = router;
