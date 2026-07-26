import express from "express";
import { EventCoreController } from "../controllers/events_media_controller/eventCore.controller";
import { MediaGalleryController } from "../controllers/events_media_controller/mediaGallery.controller";
import { PublicEngagementController } from "../controllers/events_media_controller/publicEngagement.controller";

const router = express.Router();

// ==========================================
// 1. EVENT CORE ROUTES
// ==========================================
router.post("/event-categories", EventCoreController.createEventCategory);
router.post("/events", EventCoreController.createEvent);
router.get("/events", EventCoreController.getAllEvents);
router.post("/events/register", EventCoreController.registerUserForEvent);
router.post("/events/attendance", EventCoreController.recordEventAttendance);
router.post("/events/speakers", EventCoreController.addEventSpeaker);
router.post("/events/volunteers", EventCoreController.assignEventVolunteer);
router.post("/events/schedules", EventCoreController.createEventSchedule);
router.post("/events/sessions", EventCoreController.createEventSession);

// ==========================================
// 2. MEDIA & GALLERY ROUTES
// ==========================================
router.post("/media-categories", MediaGalleryController.createMediaCategory);
router.post("/media", MediaGalleryController.uploadMedia);
router.get("/media", MediaGalleryController.getAllMedia);
router.post("/albums", MediaGalleryController.createAlbum);
router.post("/albums/media", MediaGalleryController.attachMediaToAlbum);
router.post("/events/galleries", MediaGalleryController.linkAlbumToEvent);

// ==========================================
// 3. PUBLIC ENGAGEMENT ROUTES
// ==========================================
router.post(
  "/live-donations",
  PublicEngagementController.createLiveDonationFeed,
);
router.get("/live-donations", PublicEngagementController.getLiveDonationTicker);
router.post("/success-stories", PublicEngagementController.createSuccessStory);
router.post(
  "/success-stories/media",
  PublicEngagementController.attachStoryMedia,
);
router.post("/testimonials", PublicEngagementController.createTestimonial);
router.post("/press-releases", PublicEngagementController.createPressRelease);
router.post("/news", PublicEngagementController.createNews);
router.post("/newsletters", PublicEngagementController.createNewsletter);

export const EventsMediaRoutes = router;
