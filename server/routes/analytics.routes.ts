import { Router } from "express";
import { analyticsController } from "../controllers/analytics.controller";

const router = Router();

router.post("/system-health/log", analyticsController.logSystemHealth);
router.get("/branch/:branchId/stats", analyticsController.getBranchPerformance);

export const analyticsRouter = router;

