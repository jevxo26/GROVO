import { Router } from "express";
import { aiController } from "../controllers/ai.controller";

const router = Router();

router.post("/predict/donation", aiController.logPrediction);
router.post("/task/queue", aiController.queueAutomatedTask);

export const aiRouter = router;

