import express from "express";
import { branchManagerController } from "../controllers/organization/branchManager.controller";

const router = express.Router();

router.post("/", branchManagerController.assignBranchManager);
router.get("/branch/:branchId", branchManagerController.getBranchManagersByBranchId);
router.get("/user/:userId", branchManagerController.getBranchManagerAssignmentsByUserId);
router.get("/:id", branchManagerController.getBranchManagerById);
router.patch("/:id", branchManagerController.updateBranchManagerAssignment);
router.delete("/:id", branchManagerController.deleteBranchManagerAssignment);

export const branchManagerRoutes = router;
