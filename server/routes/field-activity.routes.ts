import { Router } from "express";
import { FieldActivityController } from "../controllers/field-activity.controller";

const router = Router();

router.post("/activities/log", FieldActivityController.logActivity);
router.post("/visits/record", FieldActivityController.logVisit);

export const fieldActivityRouter = router;
