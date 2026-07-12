import { Router } from "express";
import { AIAutomationController } from "../controllers/ai.controller";

const router = Router();

router.post("/predict/donation", AIAutomationController.logPrediction);
router.post("/task/queue", AIAutomationController.queueAutomatedTask);

export const aiRouter = router;
