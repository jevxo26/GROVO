import express from "express";
import { branchMeetingController } from "../controllers/organization/branchMeeting.controller";

const router = express.Router();

router.post("/", branchMeetingController.createBranchMeeting);
router.get("/", branchMeetingController.getAllBranchMeetings);
router.get("/:id", branchMeetingController.getBranchMeetingById);
router.patch("/:id", branchMeetingController.updateBranchMeeting);
router.delete("/:id", branchMeetingController.deleteBranchMeeting);

export const branchMeetingRoutes = router;
