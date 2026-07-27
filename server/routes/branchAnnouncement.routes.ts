import express from "express";
import { branchAnnouncementController } from "../controllers/organization/branchAnnouncement.controller";

const router = express.Router();

router.post("/", branchAnnouncementController.createBranchAnnouncement);
router.get("/", branchAnnouncementController.getAllBranchAnnouncements);
router.get("/:id", branchAnnouncementController.getBranchAnnouncementById);
router.patch("/:id", branchAnnouncementController.updateBranchAnnouncement);
router.delete("/:id", branchAnnouncementController.deleteBranchAnnouncement);

export const branchAnnouncementRoutes = router;
