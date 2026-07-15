import { Router } from "express";
import { analyticsController } from "../controllers/analytics.controller";

const router = Router();

router.get("/me", analyticsController.getDashboardMe);

export const dashboardsRouter = router;
