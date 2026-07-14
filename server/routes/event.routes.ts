import { Router } from "express";
import { eventController } from "../controllers/event.controller";

const router = Router();

router.post("/schedule", eventController.scheduleEvent);
router.post("/attendance/check-in", eventController.logAttendance);

export const eventRouter = router;

