import express from "express";
import { branchPerformanceController } from "../controllers/organization/branchPerformance.controller";

const router = express.Router();

router.post("/", branchPerformanceController.createBranchPerformance);
router.get("/", branchPerformanceController.getAllBranchPerformances);
router.get("/:id", branchPerformanceController.getBranchPerformanceById);
router.patch("/:id", branchPerformanceController.updateBranchPerformance);
router.delete("/:id", branchPerformanceController.deleteBranchPerformance);

export const branchPerformanceRoutes = router;
