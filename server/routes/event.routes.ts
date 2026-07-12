import { Router } from "express";
import { EventController } from "../controllers/event.controller";

const router = Router();

router.post("/schedule", EventController.scheduleEvent);
router.post("/attendance/check-in", EventController.logAttendance);

export const eventRouter = router;
