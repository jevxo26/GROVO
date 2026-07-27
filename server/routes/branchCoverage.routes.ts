import express from "express";
import { branchCoverageController } from "../controllers/location/branchCoverage.controller";

const router = express.Router();

router.post("/", branchCoverageController.createBranchCoverage);
router.get("/", branchCoverageController.getAllBranchCoverages);
router.get("/:id", branchCoverageController.getBranchCoverageById);
router.patch("/:id", branchCoverageController.updateBranchCoverage);
router.delete("/:id", branchCoverageController.deleteBranchCoverage);

export const branchCoverageRoutes = router;
