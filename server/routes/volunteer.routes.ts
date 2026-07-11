import { Router } from "express";
import { VolunteerController } from "../controllers/volunteer.controller";

const router = Router();

router.post("/performance", VolunteerController.registerPerformance);
router.get("/available", VolunteerController.getAvailableVolunteers);

export const volunteerRouter = router;
