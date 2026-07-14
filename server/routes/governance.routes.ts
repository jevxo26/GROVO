import { Router } from "express";
import { governanceController } from "../controllers/governance.controller";

const router = Router();

router.post("/committee/create", governanceController.createCommittee);
router.post(
  "/committee/member/assign",
  governanceController.assignCommitteeMember,
);

export const governanceRouter = router;

