import { Router } from "express";
import { aiController } from "../controllers/ai.controller";

const router = Router();

router.post("/predict/donation", aiController.logPrediction);
router.post("/task/queue", aiController.queueAutomatedTask);

router.post("/assistant/chat", aiController.chatAssistant);
router.post("/route-optimizations", aiController.routeOptimization);

export const aiRouter = router;

