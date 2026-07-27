import express from "express";
import { branchStaffController } from "../controllers/organization/branchStaff.controller";

const router = express.Router();

router.post("/", branchStaffController.assignBranchStaff);
router.get("/branch/:branchId", branchStaffController.getBranchStaffByBranchId);
router.get("/user/:userId", branchStaffController.getBranchStaffAssignmentsByUserId);
router.get("/:id", branchStaffController.getBranchStaffById);
router.patch("/:id", branchStaffController.updateBranchStaffAssignment);
router.delete("/:id", branchStaffController.deleteBranchStaffAssignment);

export const branchStaffRoutes = router;
