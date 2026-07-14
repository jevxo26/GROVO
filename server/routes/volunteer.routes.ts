import { Router } from "express";
import { volunteerController } from "../controllers/volunteer.controller";

const router = Router();

router.post("/register", volunteerController.registerVolunteer);
router.post("/assignments", volunteerController.assignVolunteer);
router.get("/:id/performance", volunteerController.getPerformance);
router.get("/", volunteerController.listVolunteers);

// Legacy/Helper
router.post("/performance", volunteerController.registerPerformance);
router.get("/available", volunteerController.getAvailableVolunteers);

export const volunteerRouter = router;
