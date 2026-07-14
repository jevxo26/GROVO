import { Router } from "express";
import { notificationController } from "../controllers/notification.controller";

const router = Router();

router.post("/queue", notificationController.queueAlert);
router.get("/user/:userId", notificationController.getActiveAlerts);

export const notificationRouter = router;

