import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";

const router = Router();

router.post("/queue", NotificationController.queueAlert);
router.get("/user/:userId", NotificationController.getActiveAlerts);

export const notificationRouter = router;
