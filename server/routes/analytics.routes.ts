import { Router } from "express";
import { AnalyticsController } from "../controllers/analytics.controller";

const router = Router();

router.post("/system-health/log", AnalyticsController.logSystemHealth);
router.get("/branch/:branchId/stats", AnalyticsController.getBranchPerformance);

export const analyticsRouter = router;
