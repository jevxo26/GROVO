import { Router } from "express";
import { eventCoreController } from "../controllers/events_media_controller/eventCore.controller";
import { mediaGalleryController } from "../controllers/events_media_controller/mediaGallery.controller";
import { publicEngagementController } from "../controllers/events_media_controller/publicEngagement.controller";

const router = Router();

// ==================== 1. EVENT CORE ROUTES ====================
// 2. EventCategory
router.post("/event-categories", eventCoreController.createEventCategory);
router.get("/event-categories", eventCoreController.getAllEventCategories);
router.get("/event-categories/:id", eventCoreController.getEventCategoryById);
router.patch("/event-categories/:id", eventCoreController.updateEventCategory);
router.delete("/event-categories/:id", eventCoreController.deleteEventCategory);

// 1. Event
router.post("/events", eventCoreController.createEvent);
router.get("/events", eventCoreController.getAllEvents);
router.get("/events/:id", eventCoreController.getEventById);
router.patch("/events/:id", eventCoreController.updateEvent);
router.delete("/events/:id", eventCoreController.deleteEvent);

// 3. EventRegistration
router.post("/event-registrations", eventCoreController.createEventRegistration);
router.get("/event-registrations", eventCoreController.getAllEventRegistrations);
router.get("/event-registrations/:id", eventCoreController.getEventRegistrationById);
router.patch("/event-registrations/:id", eventCoreController.updateEventRegistration);
router.delete("/event-registrations/:id", eventCoreController.deleteEventRegistration);

// 4. EventAttendance
router.post("/event-attendances", eventCoreController.createEventAttendance);
router.get("/event-attendances", eventCoreController.getAllEventAttendances);
router.get("/event-attendances/:id", eventCoreController.getEventAttendanceById);
router.patch("/event-attendances/:id", eventCoreController.updateEventAttendance);
router.delete("/event-attendances/:id", eventCoreController.deleteEventAttendance);

// 5. EventSpeaker
router.post("/event-speakers", eventCoreController.createEventSpeaker);
router.get("/event-speakers", eventCoreController.getAllEventSpeakers);
router.get("/event-speakers/:id", eventCoreController.getEventSpeakerById);
router.patch("/event-speakers/:id", eventCoreController.updateEventSpeaker);
router.delete("/event-speakers/:id", eventCoreController.deleteEventSpeaker);

// 6. EventVolunteer
router.post("/event-volunteers", eventCoreController.createEventVolunteer);
router.get("/event-volunteers", eventCoreController.getAllEventVolunteers);
router.get("/event-volunteers/:id", eventCoreController.getEventVolunteerById);
router.patch("/event-volunteers/:id", eventCoreController.updateEventVolunteer);
router.delete("/event-volunteers/:id", eventCoreController.deleteEventVolunteer);

// 7. EventSchedule
router.post("/event-schedules", eventCoreController.createEventSchedule);
router.get("/event-schedules", eventCoreController.getAllEventSchedules);
router.get("/event-schedules/:id", eventCoreController.getEventScheduleById);
router.patch("/event-schedules/:id", eventCoreController.updateEventSchedule);
router.delete("/event-schedules/:id", eventCoreController.deleteEventSchedule);

// 8. EventSession
router.post("/event-sessions", eventCoreController.createEventSession);
router.get("/event-sessions", eventCoreController.getAllEventSessions);
router.get("/event-sessions/:id", eventCoreController.getEventSessionById);
router.patch("/event-sessions/:id", eventCoreController.updateEventSession);
router.delete("/event-sessions/:id", eventCoreController.deleteEventSession);

// 9. EventGallery
router.post("/event-galleries", eventCoreController.createEventGallery);
router.get("/event-galleries", eventCoreController.getAllEventGalleries);
router.get("/event-galleries/:id", eventCoreController.getEventGalleryById);
router.patch("/event-galleries/:id", eventCoreController.updateEventGallery);
router.delete("/event-galleries/:id", eventCoreController.deleteEventGallery);


// ==================== 2. MEDIA & GALLERY ROUTES ====================
// 11. MediaCategory
router.post("/media-categories", mediaGalleryController.createMediaCategory);
router.get("/media-categories", mediaGalleryController.getAllMediaCategories);
router.get("/media-categories/:id", mediaGalleryController.getMediaCategoryById);
router.patch("/media-categories/:id", mediaGalleryController.updateMediaCategory);
router.delete("/media-categories/:id", mediaGalleryController.deleteMediaCategory);

// 10. Media
router.post("/media", mediaGalleryController.createMedia);
router.get("/media", mediaGalleryController.getAllMedia);
router.get("/media/:id", mediaGalleryController.getMediaById);
router.patch("/media/:id", mediaGalleryController.updateMedia);
router.delete("/media/:id", mediaGalleryController.deleteMedia);

// 12. Album
router.post("/albums", mediaGalleryController.createAlbum);
router.get("/albums", mediaGalleryController.getAllAlbums);
router.get("/albums/:id", mediaGalleryController.getAlbumById);
router.patch("/albums/:id", mediaGalleryController.updateAlbum);
router.delete("/albums/:id", mediaGalleryController.deleteAlbum);

// 13. AlbumMedia
router.post("/album-media", mediaGalleryController.createAlbumMedia);
router.get("/album-media", mediaGalleryController.getAllAlbumMedia);
router.get("/album-media/:id", mediaGalleryController.getAlbumMediaById);
router.patch("/album-media/:id", mediaGalleryController.updateAlbumMedia);
router.delete("/album-media/:id", mediaGalleryController.deleteAlbumMedia);

// 21. MediaActivityLog
router.post("/media-activity-logs", mediaGalleryController.createMediaActivityLog);
router.get("/media-activity-logs", mediaGalleryController.getAllMediaActivityLogs);
router.get("/media-activity-logs/:id", mediaGalleryController.getMediaActivityLogById);
router.delete("/media-activity-logs/:id", mediaGalleryController.deleteMediaActivityLog);


// ==================== 3. PUBLIC ENGAGEMENT ROUTES ====================
// 14. LiveDonationFeed
router.post("/live-donation-feeds", publicEngagementController.createLiveDonationFeed);
router.get("/live-donation-feeds", publicEngagementController.getAllLiveDonationFeeds);
router.get("/live-donation-feeds/:id", publicEngagementController.getLiveDonationFeedById);
router.patch("/live-donation-feeds/:id", publicEngagementController.updateLiveDonationFeed);
router.delete("/live-donation-feeds/:id", publicEngagementController.deleteLiveDonationFeed);

// 15. SuccessStory
router.post("/success-stories", publicEngagementController.createSuccessStory);
router.get("/success-stories", publicEngagementController.getAllSuccessStories);
router.get("/success-stories/:id", publicEngagementController.getSuccessStoryById);
router.patch("/success-stories/:id", publicEngagementController.updateSuccessStory);
router.delete("/success-stories/:id", publicEngagementController.deleteSuccessStory);

// 16. StoryMedia
router.post("/story-media", publicEngagementController.createStoryMedia);
router.get("/story-media", publicEngagementController.getAllStoryMedia);
router.get("/story-media/:id", publicEngagementController.getStoryMediaById);
router.patch("/story-media/:id", publicEngagementController.updateStoryMedia);
router.delete("/story-media/:id", publicEngagementController.deleteStoryMedia);

// 17. Testimonial
router.post("/testimonials", publicEngagementController.createTestimonial);
router.get("/testimonials", publicEngagementController.getAllTestimonials);
router.get("/testimonials/:id", publicEngagementController.getTestimonialById);
router.patch("/testimonials/:id", publicEngagementController.updateTestimonial);
router.delete("/testimonials/:id", publicEngagementController.deleteTestimonial);

// 18. PressRelease
router.post("/press-releases", publicEngagementController.createPressRelease);
router.get("/press-releases", publicEngagementController.getAllPressReleases);
router.get("/press-releases/:id", publicEngagementController.getPressReleaseById);
router.patch("/press-releases/:id", publicEngagementController.updatePressRelease);
router.delete("/press-releases/:id", publicEngagementController.deletePressRelease);

// 19. News
router.post("/news", publicEngagementController.createNews);
router.get("/news", publicEngagementController.getAllNews);
router.get("/news/:id", publicEngagementController.getNewsById);
router.patch("/news/:id", publicEngagementController.updateNews);
router.delete("/news/:id", publicEngagementController.deleteNews);

// 20. Newsletter
router.post("/newsletters", publicEngagementController.createNewsletter);
router.get("/newsletters", publicEngagementController.getAllNewsletters);
router.get("/newsletters/:id", publicEngagementController.getNewsletterById);
router.patch("/newsletters/:id", publicEngagementController.updateNewsletter);
router.delete("/newsletters/:id", publicEngagementController.deleteNewsletter);

export const eventsMediaRoutes = router;
export const EventsMediaRoutes = router;
