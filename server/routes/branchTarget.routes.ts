import express from "express";
import { branchTargetController } from "../controllers/organization/branchTarget.controller";

const router = express.Router();

router.post("/", branchTargetController.createBranchTarget);
router.get("/", branchTargetController.getAllBranchTargets);
router.get("/:id", branchTargetController.getBranchTargetById);
router.patch("/:id", branchTargetController.updateBranchTarget);
router.delete("/:id", branchTargetController.deleteBranchTarget);

export const branchTargetRoutes = router;
