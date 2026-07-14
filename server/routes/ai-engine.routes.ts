import { Router } from "express";
import { aiEngineController } from "../controllers/ai-engine.controller";

const router = Router();

router.post("/models/register", aiEngineController.registerModelMetrics);
router.post("/forecasts/demand", aiEngineController.recordForecast);

export const aiEngineRouter = router;

