import { Router } from "express";
import { VolunteerLogisticsController } from "../controllers/volunteer-logistics.controller";

const router = Router();

// Logistics, schedules, and out-of-pocket field costs tracking pipelines
router.post("/attendance/check-in", VolunteerLogisticsController.logAttendance);
router.post("/expenses/submit", VolunteerLogisticsController.submitExpense);

export const volunteerLogisticsRouter = router;
