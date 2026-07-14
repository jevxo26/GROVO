import { Router } from "express";
import { automationController } from "../controllers/automation.controller";

const router = Router();

router.post("/tasks/schedule", automationController.scheduleTask);
router.post("/logs/record", automationController.logExecution);

export const automationRouter = router;

