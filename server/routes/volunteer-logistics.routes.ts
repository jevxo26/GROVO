import { Router } from "express";
import { volunteerLogisticsController } from "../controllers/volunteer-logistics.controller";

const router = Router();

// Logistics, schedules, and out-of-pocket field costs tracking pipelines
router.post("/attendance/check-in", volunteerLogisticsController.logAttendance);
router.post("/expenses/submit", volunteerLogisticsController.submitExpense);

export const volunteerLogisticsRouter = router;

