import { Router } from "express";
import { eventController } from "../controllers/event.controller";

const router = Router();

// Public & User operations
router.post("/:id/register", eventController.registerForEvent);
router.get("/live-donation-feed", eventController.getLiveDonationFeed);

// Admin-only event operations
router.post("/admin/events", eventController.scheduleEvent);
router.post("/admin/albums/:id/media", eventController.addMediaToAlbum);
router.post("/admin/success-stories", eventController.createSuccessStory);
router.post("/admin/newsletters/:id/send", eventController.sendNewsletter);

// Legacy
router.post("/attendance", eventController.logAttendance);
router.post("/performance", eventController.scheduleEvent);

export const eventRouter = router;
