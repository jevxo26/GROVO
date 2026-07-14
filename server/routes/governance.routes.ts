import { Router } from "express";
import { governanceController } from "../controllers/governance.controller";

const router = Router();

// Branch Management
router.post("/branches", governanceController.createBranch);
router.get("/branches", governanceController.listBranches);
router.get("/branches/:id", governanceController.getBranchDetail);
router.put("/branches/:id", governanceController.updateBranch);
router.get("/branches/:id/statistics", governanceController.getBranchStatistics);

// Area Assignments
router.post("/area-assignments", governanceController.assignArea);

// Committees
router.post("/committees", governanceController.createCommittee);

// Branch Transfers
router.post("/branch-transfers", governanceController.createBranchTransfer);

export const governanceRouter = router;
