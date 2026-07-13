import { Router } from "express";
import { fieldActivityController } from "../controllers/field-activity.controller";

const router = Router();

router.post("/activities/log", fieldActivityController.logActivity);
router.post("/visits/record", fieldActivityController.logVisit);

export const fieldActivityRouter = router;

