import { Router } from "express";
import { volunteerController } from "../controllers/volunteer.controller";

const router = Router();

router.post("/performance", volunteerController.registerPerformance);
router.get("/available", volunteerController.getAvailableVolunteers);

export const volunteerRouter = router;

