import { Router } from "express";
import { notificationController } from "../controllers/notification.controller";

const router = Router();

router.post("/queue", notificationController.queueAlert);
router.get("/user/:userId", notificationController.getActiveAlerts);
router.get("/my", notificationController.getMyNotifications);
router.patch("/:id/read", notificationController.markAsRead);

export const notificationRouter = router;

