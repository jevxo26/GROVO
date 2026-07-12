import { Router } from "express";
import { GovernanceController } from "../controllers/governance.controller";

const router = Router();

router.post("/committee/create", GovernanceController.createCommittee);
router.post(
  "/committee/member/assign",
  GovernanceController.assignCommitteeMember,
);

export const governanceRouter = router;
