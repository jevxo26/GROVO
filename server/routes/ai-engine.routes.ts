import { Router } from "express";
import { AIEngineController } from "../controllers/ai-engine.controller";

const router = Router();

router.post("/models/register", AIEngineController.registerModelMetrics);
router.post("/forecasts/demand", AIEngineController.recordForecast);

export const aiEngineRouter = router;
