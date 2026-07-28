import status from "http-status";
import { eventCoreService } from "../../services/events_media_service/eventCore.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// ==================== 2. EVENT CATEGORY CONTROLLERS ====================
const createEventCategory = catchAsync(async (req, res) => {
  const result = await eventCoreService.createEventCategory(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Event category created successfully",
    data: result,
  });
});

const getAllEventCategories = catchAsync(async (req, res) => {
  const result = await eventCoreService.getAllEventCategories(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event categories retrieved successfully",
    data: result,
  });
});

const getEventCategoryById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.getEventCategoryById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event category retrieved successfully",
    data: result,
  });
});

const updateEventCategory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.updateEventCategory(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event category updated successfully",
    data: result,
  });
});

const deleteEventCategory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.deleteEventCategory(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event category deleted successfully",
    data: result,
  });
});


// ==================== 1. EVENT CONTROLLERS ====================
const createEvent = catchAsync(async (req, res) => {
  const result = await eventCoreService.createEvent(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Event created successfully",
    data: result,
  });
});

const getAllEvents = catchAsync(async (req, res) => {
  const result = await eventCoreService.getAllEvents(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Events retrieved successfully",
    data: result,
  });
});

const getEventById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.getEventById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event retrieved successfully",
    data: result,
  });
});

const updateEvent = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.updateEvent(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event updated successfully",
    data: result,
  });
});

const deleteEvent = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.deleteEvent(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event deleted successfully",
    data: result,
  });
});


// ==================== 3. EVENT REGISTRATION CONTROLLERS ====================
const createEventRegistration = catchAsync(async (req, res) => {
  const result = await eventCoreService.createEventRegistration(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Event registration created successfully",
    data: result,
  });
});

const getAllEventRegistrations = catchAsync(async (req, res) => {
  const result = await eventCoreService.getAllEventRegistrations(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event registrations retrieved successfully",
    data: result,
  });
});

const getEventRegistrationById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.getEventRegistrationById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event registration retrieved successfully",
    data: result,
  });
});

const updateEventRegistration = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.updateEventRegistration(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event registration updated successfully",
    data: result,
  });
});

const deleteEventRegistration = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.deleteEventRegistration(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event registration deleted successfully",
    data: result,
  });
});


// ==================== 4. EVENT ATTENDANCE CONTROLLERS ====================
const createEventAttendance = catchAsync(async (req, res) => {
  const result = await eventCoreService.createEventAttendance(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Event attendance recorded successfully",
    data: result,
  });
});

const getAllEventAttendances = catchAsync(async (req, res) => {
  const result = await eventCoreService.getAllEventAttendances(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event attendances retrieved successfully",
    data: result,
  });
});

const getEventAttendanceById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.getEventAttendanceById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event attendance retrieved successfully",
    data: result,
  });
});

const updateEventAttendance = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.updateEventAttendance(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event attendance updated successfully",
    data: result,
  });
});

const deleteEventAttendance = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.deleteEventAttendance(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event attendance deleted successfully",
    data: result,
  });
});


// ==================== 5. EVENT SPEAKER CONTROLLERS ====================
const createEventSpeaker = catchAsync(async (req, res) => {
  const result = await eventCoreService.createEventSpeaker(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Event speaker created successfully",
    data: result,
  });
});

const getAllEventSpeakers = catchAsync(async (req, res) => {
  const result = await eventCoreService.getAllEventSpeakers(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event speakers retrieved successfully",
    data: result,
  });
});

const getEventSpeakerById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.getEventSpeakerById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event speaker retrieved successfully",
    data: result,
  });
});

const updateEventSpeaker = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.updateEventSpeaker(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event speaker updated successfully",
    data: result,
  });
});

const deleteEventSpeaker = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.deleteEventSpeaker(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event speaker deleted successfully",
    data: result,
  });
});


// ==================== 6. EVENT VOLUNTEER CONTROLLERS ====================
const createEventVolunteer = catchAsync(async (req, res) => {
  const result = await eventCoreService.createEventVolunteer(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Event volunteer assigned successfully",
    data: result,
  });
});

const getAllEventVolunteers = catchAsync(async (req, res) => {
  const result = await eventCoreService.getAllEventVolunteers(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event volunteers retrieved successfully",
    data: result,
  });
});

const getEventVolunteerById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.getEventVolunteerById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event volunteer retrieved successfully",
    data: result,
  });
});

const updateEventVolunteer = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.updateEventVolunteer(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event volunteer updated successfully",
    data: result,
  });
});

const deleteEventVolunteer = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.deleteEventVolunteer(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event volunteer assignment deleted successfully",
    data: result,
  });
});


// ==================== 7. EVENT SCHEDULE CONTROLLERS ====================
const createEventSchedule = catchAsync(async (req, res) => {
  const result = await eventCoreService.createEventSchedule(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Event schedule created successfully",
    data: result,
  });
});

const getAllEventSchedules = catchAsync(async (req, res) => {
  const result = await eventCoreService.getAllEventSchedules(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event schedules retrieved successfully",
    data: result,
  });
});

const getEventScheduleById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.getEventScheduleById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event schedule retrieved successfully",
    data: result,
  });
});

const updateEventSchedule = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.updateEventSchedule(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event schedule updated successfully",
    data: result,
  });
});

const deleteEventSchedule = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.deleteEventSchedule(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event schedule deleted successfully",
    data: result,
  });
});


// ==================== 8. EVENT SESSION CONTROLLERS ====================
const createEventSession = catchAsync(async (req, res) => {
  const result = await eventCoreService.createEventSession(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Event session created successfully",
    data: result,
  });
});

const getAllEventSessions = catchAsync(async (req, res) => {
  const result = await eventCoreService.getAllEventSessions(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event sessions retrieved successfully",
    data: result,
  });
});

const getEventSessionById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.getEventSessionById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event session retrieved successfully",
    data: result,
  });
});

const updateEventSession = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.updateEventSession(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event session updated successfully",
    data: result,
  });
});

const deleteEventSession = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.deleteEventSession(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event session deleted successfully",
    data: result,
  });
});


// ==================== 9. EVENT GALLERY CONTROLLERS ====================
const createEventGallery = catchAsync(async (req, res) => {
  const result = await eventCoreService.createEventGallery(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Event gallery created successfully",
    data: result,
  });
});

const getAllEventGalleries = catchAsync(async (req, res) => {
  const result = await eventCoreService.getAllEventGalleries(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event galleries retrieved successfully",
    data: result,
  });
});

const getEventGalleryById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.getEventGalleryById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event gallery retrieved successfully",
    data: result,
  });
});

const updateEventGallery = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.updateEventGallery(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event gallery updated successfully",
    data: result,
  });
});

const deleteEventGallery = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await eventCoreService.deleteEventGallery(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Event gallery deleted successfully",
    data: result,
  });
});


export const eventCoreController = {
  // EventCategory
  createEventCategory,
  getAllEventCategories,
  getEventCategoryById,
  updateEventCategory,
  deleteEventCategory,
  // Event
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  // EventRegistration
  createEventRegistration,
  getAllEventRegistrations,
  getEventRegistrationById,
  updateEventRegistration,
  deleteEventRegistration,
  // EventAttendance
  createEventAttendance,
  getAllEventAttendances,
  getEventAttendanceById,
  updateEventAttendance,
  deleteEventAttendance,
  // EventSpeaker
  createEventSpeaker,
  getAllEventSpeakers,
  getEventSpeakerById,
  updateEventSpeaker,
  deleteEventSpeaker,
  // EventVolunteer
  createEventVolunteer,
  getAllEventVolunteers,
  getEventVolunteerById,
  updateEventVolunteer,
  deleteEventVolunteer,
  // EventSchedule
  createEventSchedule,
  getAllEventSchedules,
  getEventScheduleById,
  updateEventSchedule,
  deleteEventSchedule,
  // EventSession
  createEventSession,
  getAllEventSessions,
  getEventSessionById,
  updateEventSession,
  deleteEventSession,
  // EventGallery
  createEventGallery,
  getAllEventGalleries,
  getEventGalleryById,
  updateEventGallery,
  deleteEventGallery,
};
