import { Router } from "express";
import { volunteerLogisticsController } from "../controllers/volunteer-logistics.controller";

const router = Router();

router.post("/schedules/:id/check-in", volunteerLogisticsController.logAttendance);
router.post("/expenses", volunteerLogisticsController.submitExpense);
router.post("/expenses/:id/approve", volunteerLogisticsController.approveExpense);
router.post("/field-activities/:id/reports", volunteerLogisticsController.submitFieldReport);

// Legacy/Helper
router.post("/attendance/check-in", volunteerLogisticsController.logAttendance);
router.post("/expenses/submit", volunteerLogisticsController.submitExpense);

export const volunteerLogisticsRouter = router;
