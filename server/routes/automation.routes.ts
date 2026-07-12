import { Router } from "express";
import { AutomationController } from "../controllers/automation.controller";

const router = Router();

router.post("/tasks/schedule", AutomationController.scheduleTask);
router.post("/logs/record", AutomationController.logExecution);

export const automationRouter = router;
