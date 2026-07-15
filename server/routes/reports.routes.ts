import { Router } from "express";
import { analyticsController } from "../controllers/analytics.controller";

const router = Router();

router.post("/", analyticsController.generateReport);

export const reportsRouter = router;
