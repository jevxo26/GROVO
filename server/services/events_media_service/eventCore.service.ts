import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

// ==================== 2. EVENT CATEGORY SERVICES ====================
const createEventCategory = async (payload: any) => {
  if (!payload.name) {
    throw new customError(status.BAD_REQUEST, "name is required.");
  }

  const existing = await prisma.eventCategory.findUnique({
    where: { name: payload.name },
  });
  if (existing) {
    throw new customError(status.CONFLICT, `Category '${payload.name}' already exists`);
  }

  return await prisma.eventCategory.create({
    data: {
      name: payload.name,
      icon: payload.icon || null,
      description: payload.description || null,
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllEventCategories = async (query?: { status?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;

  return await prisma.eventCategory.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getEventCategoryById = async (id: string) => {
  const item = await prisma.eventCategory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event category not found.");
  }
  return item;
};

const updateEventCategory = async (id: string, payload: any) => {
  const item = await prisma.eventCategory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event category not found.");
  }

  if (payload.name && payload.name !== item.name) {
    const existing = await prisma.eventCategory.findUnique({ where: { name: payload.name } });
    if (existing) {
      throw new customError(status.CONFLICT, `Category '${payload.name}' already exists`);
    }
  }

  return await prisma.eventCategory.update({
    where: { id },
    data: {
      ...(payload.name && { name: payload.name }),
      ...(payload.icon !== undefined && { icon: payload.icon }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteEventCategory = async (id: string) => {
  const item = await prisma.eventCategory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event category not found.");
  }
  await prisma.eventCategory.delete({ where: { id } });
  return { message: "Event category deleted successfully." };
};


// ==================== 1. EVENT SERVICES ====================
const createEvent = async (payload: any) => {
  if (!payload.eventCode || !payload.title || !payload.slug || !payload.categoryId || !payload.eventType || !payload.branchId || !payload.venue || !payload.startDate || !payload.endDate || !payload.createdBy) {
    throw new customError(status.BAD_REQUEST, "eventCode, title, slug, categoryId, eventType, branchId, venue, startDate, endDate, and createdBy are required.");
  }

  const existingCode = await prisma.event.findUnique({
    where: { eventCode: payload.eventCode },
  });
  if (existingCode) {
    throw new customError(status.CONFLICT, `Event code '${payload.eventCode}' already exists`);
  }

  const existingSlug = await prisma.event.findUnique({
    where: { slug: payload.slug },
  });
  if (existingSlug) {
    throw new customError(status.CONFLICT, `Event slug '${payload.slug}' already exists`);
  }

  return await prisma.event.create({
    data: {
      eventCode: payload.eventCode,
      title: payload.title,
      slug: payload.slug,
      categoryId: payload.categoryId,
      description: payload.description || "",
      banner: payload.banner || null,
      thumbnail: payload.thumbnail || null,
      eventType: payload.eventType,
      branchId: payload.branchId,
      venue: payload.venue,
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
      registrationRequired: payload.registrationRequired !== undefined ? Boolean(payload.registrationRequired) : false,
      maxParticipants: payload.maxParticipants ? Number(payload.maxParticipants) : null,
      status: payload.status || "UPCOMING",
      createdBy: payload.createdBy,
    },
  });
};

const getAllEvents = async (query?: { categoryId?: string; branchId?: string; eventType?: string; status?: string; search?: string }) => {
  const where: any = {};
  if (query?.categoryId) where.categoryId = query.categoryId;
  if (query?.branchId) where.branchId = query.branchId;
  if (query?.eventType) where.eventType = query.eventType;
  if (query?.status) where.status = query.status;
  if (query?.search) {
    where.OR = [
      { title: { contains: query.search, mode: "insensitive" } },
      { eventCode: { contains: query.search, mode: "insensitive" } },
    ];
  }

  return await prisma.event.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getEventById = async (id: string) => {
  const item = await prisma.event.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event not found.");
  }
  return item;
};

const updateEvent = async (id: string, payload: any) => {
  const item = await prisma.event.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event not found.");
  }

  if (payload.eventCode && payload.eventCode !== item.eventCode) {
    const existingCode = await prisma.event.findUnique({ where: { eventCode: payload.eventCode } });
    if (existingCode) {
      throw new customError(status.CONFLICT, `Event code '${payload.eventCode}' already exists`);
    }
  }

  if (payload.slug && payload.slug !== item.slug) {
    const existingSlug = await prisma.event.findUnique({ where: { slug: payload.slug } });
    if (existingSlug) {
      throw new customError(status.CONFLICT, `Event slug '${payload.slug}' already exists`);
    }
  }

  return await prisma.event.update({
    where: { id },
    data: {
      ...(payload.eventCode && { eventCode: payload.eventCode }),
      ...(payload.title && { title: payload.title }),
      ...(payload.slug && { slug: payload.slug }),
      ...(payload.categoryId && { categoryId: payload.categoryId }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.banner !== undefined && { banner: payload.banner }),
      ...(payload.thumbnail !== undefined && { thumbnail: payload.thumbnail }),
      ...(payload.eventType && { eventType: payload.eventType }),
      ...(payload.branchId && { branchId: payload.branchId }),
      ...(payload.venue && { venue: payload.venue }),
      ...(payload.startDate && { startDate: new Date(payload.startDate) }),
      ...(payload.endDate && { endDate: new Date(payload.endDate) }),
      ...(payload.registrationRequired !== undefined && { registrationRequired: Boolean(payload.registrationRequired) }),
      ...(payload.maxParticipants !== undefined && { maxParticipants: payload.maxParticipants ? Number(payload.maxParticipants) : null }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteEvent = async (id: string) => {
  const item = await prisma.event.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event not found.");
  }
  await prisma.event.delete({ where: { id } });
  return { message: "Event deleted successfully." };
};


// ==================== 3. EVENT REGISTRATION SERVICES ====================
const createEventRegistration = async (payload: any) => {
  if (!payload.eventId || !payload.userId || !payload.registrationNumber) {
    throw new customError(status.BAD_REQUEST, "eventId, userId, and registrationNumber are required.");
  }

  const existingReg = await prisma.eventRegistration.findUnique({
    where: { registrationNumber: payload.registrationNumber },
  });
  if (existingReg) {
    throw new customError(status.CONFLICT, `Registration number '${payload.registrationNumber}' already exists`);
  }

  return await prisma.eventRegistration.create({
    data: {
      eventId: payload.eventId,
      userId: payload.userId,
      registrationNumber: payload.registrationNumber,
      registrationDate: payload.registrationDate ? new Date(payload.registrationDate) : new Date(),
      status: payload.status || "CONFIRMED",
    },
  });
};

const getAllEventRegistrations = async (query?: { eventId?: string; userId?: string; status?: string }) => {
  const where: any = {};
  if (query?.eventId) where.eventId = query.eventId;
  if (query?.userId) where.userId = query.userId;
  if (query?.status) where.status = query.status;

  return await prisma.eventRegistration.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getEventRegistrationById = async (id: string) => {
  const item = await prisma.eventRegistration.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event registration not found.");
  }
  return item;
};

const updateEventRegistration = async (id: string, payload: any) => {
  const item = await prisma.eventRegistration.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event registration not found.");
  }

  return await prisma.eventRegistration.update({
    where: { id },
    data: {
      ...(payload.status && { status: payload.status }),
      ...(payload.registrationDate && { registrationDate: new Date(payload.registrationDate) }),
    },
  });
};

const deleteEventRegistration = async (id: string) => {
  const item = await prisma.eventRegistration.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event registration not found.");
  }
  await prisma.eventRegistration.delete({ where: { id } });
  return { message: "Event registration deleted successfully." };
};


// ==================== 4. EVENT ATTENDANCE SERVICES ====================
const createEventAttendance = async (payload: any) => {
  if (!payload.eventId || !payload.userId) {
    throw new customError(status.BAD_REQUEST, "eventId and userId are required.");
  }

  return await prisma.eventAttendance.create({
    data: {
      eventId: payload.eventId,
      userId: payload.userId,
      checkInTime: payload.checkInTime ? new Date(payload.checkInTime) : new Date(),
      checkOutTime: payload.checkOutTime ? new Date(payload.checkOutTime) : null,
      attendanceStatus: payload.attendanceStatus || "PRESENT",
    },
  });
};

const getAllEventAttendances = async (query?: { eventId?: string; userId?: string; attendanceStatus?: string }) => {
  const where: any = {};
  if (query?.eventId) where.eventId = query.eventId;
  if (query?.userId) where.userId = query.userId;
  if (query?.attendanceStatus) where.attendanceStatus = query.attendanceStatus;

  return await prisma.eventAttendance.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getEventAttendanceById = async (id: string) => {
  const item = await prisma.eventAttendance.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event attendance record not found.");
  }
  return item;
};

const updateEventAttendance = async (id: string, payload: any) => {
  const item = await prisma.eventAttendance.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event attendance record not found.");
  }

  return await prisma.eventAttendance.update({
    where: { id },
    data: {
      ...(payload.checkInTime && { checkInTime: new Date(payload.checkInTime) }),
      ...(payload.checkOutTime !== undefined && { checkOutTime: payload.checkOutTime ? new Date(payload.checkOutTime) : null }),
      ...(payload.attendanceStatus && { attendanceStatus: payload.attendanceStatus }),
    },
  });
};

const deleteEventAttendance = async (id: string) => {
  const item = await prisma.eventAttendance.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event attendance record not found.");
  }
  await prisma.eventAttendance.delete({ where: { id } });
  return { message: "Event attendance record deleted successfully." };
};


// ==================== 5. EVENT SPEAKER SERVICES ====================
const createEventSpeaker = async (payload: any) => {
  if (!payload.eventId || !payload.name || !payload.designation || !payload.organization) {
    throw new customError(status.BAD_REQUEST, "eventId, name, designation, and organization are required.");
  }

  return await prisma.eventSpeaker.create({
    data: {
      eventId: payload.eventId,
      name: payload.name,
      designation: payload.designation,
      organization: payload.organization,
      photo: payload.photo || null,
      bio: payload.bio || null,
    },
  });
};

const getAllEventSpeakers = async (query?: { eventId?: string; search?: string }) => {
  const where: any = {};
  if (query?.eventId) where.eventId = query.eventId;
  if (query?.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { organization: { contains: query.search, mode: "insensitive" } },
    ];
  }

  return await prisma.eventSpeaker.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getEventSpeakerById = async (id: string) => {
  const item = await prisma.eventSpeaker.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event speaker not found.");
  }
  return item;
};

const updateEventSpeaker = async (id: string, payload: any) => {
  const item = await prisma.eventSpeaker.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event speaker not found.");
  }

  return await prisma.eventSpeaker.update({
    where: { id },
    data: {
      ...(payload.name && { name: payload.name }),
      ...(payload.designation && { designation: payload.designation }),
      ...(payload.organization && { organization: payload.organization }),
      ...(payload.photo !== undefined && { photo: payload.photo }),
      ...(payload.bio !== undefined && { bio: payload.bio }),
    },
  });
};

const deleteEventSpeaker = async (id: string) => {
  const item = await prisma.eventSpeaker.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event speaker not found.");
  }
  await prisma.eventSpeaker.delete({ where: { id } });
  return { message: "Event speaker deleted successfully." };
};


// ==================== 6. EVENT VOLUNTEER SERVICES ====================
const createEventVolunteer = async (payload: any) => {
  if (!payload.eventId || !payload.volunteerId || !payload.role || !payload.assignedBy) {
    throw new customError(status.BAD_REQUEST, "eventId, volunteerId, role, and assignedBy are required.");
  }

  return await prisma.eventVolunteer.create({
    data: {
      eventId: payload.eventId,
      volunteerId: payload.volunteerId,
      role: payload.role,
      assignedBy: payload.assignedBy,
    },
  });
};

const getAllEventVolunteers = async (query?: { eventId?: string; volunteerId?: string }) => {
  const where: any = {};
  if (query?.eventId) where.eventId = query.eventId;
  if (query?.volunteerId) where.volunteerId = query.volunteerId;

  return await prisma.eventVolunteer.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getEventVolunteerById = async (id: string) => {
  const item = await prisma.eventVolunteer.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event volunteer assignment not found.");
  }
  return item;
};

const updateEventVolunteer = async (id: string, payload: any) => {
  const item = await prisma.eventVolunteer.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event volunteer assignment not found.");
  }

  return await prisma.eventVolunteer.update({
    where: { id },
    data: {
      ...(payload.role && { role: payload.role }),
      ...(payload.assignedBy && { assignedBy: payload.assignedBy }),
    },
  });
};

const deleteEventVolunteer = async (id: string) => {
  const item = await prisma.eventVolunteer.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event volunteer assignment not found.");
  }
  await prisma.eventVolunteer.delete({ where: { id } });
  return { message: "Event volunteer assignment deleted successfully." };
};


// ==================== 7. EVENT SCHEDULE SERVICES ====================
const createEventSchedule = async (payload: any) => {
  if (!payload.eventId || !payload.title || !payload.startTime || !payload.endTime) {
    throw new customError(status.BAD_REQUEST, "eventId, title, startTime, and endTime are required.");
  }

  return await prisma.eventSchedule.create({
    data: {
      eventId: payload.eventId,
      title: payload.title,
      startTime: new Date(payload.startTime),
      endTime: new Date(payload.endTime),
      location: payload.location || null,
      description: payload.description || null,
    },
  });
};

const getAllEventSchedules = async (query?: { eventId?: string }) => {
  const where: any = {};
  if (query?.eventId) where.eventId = query.eventId;

  return await prisma.eventSchedule.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getEventScheduleById = async (id: string) => {
  const item = await prisma.eventSchedule.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event schedule not found.");
  }
  return item;
};

const updateEventSchedule = async (id: string, payload: any) => {
  const item = await prisma.eventSchedule.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event schedule not found.");
  }

  return await prisma.eventSchedule.update({
    where: { id },
    data: {
      ...(payload.title && { title: payload.title }),
      ...(payload.startTime && { startTime: new Date(payload.startTime) }),
      ...(payload.endTime && { endTime: new Date(payload.endTime) }),
      ...(payload.location !== undefined && { location: payload.location }),
      ...(payload.description !== undefined && { description: payload.description }),
    },
  });
};

const deleteEventSchedule = async (id: string) => {
  const item = await prisma.eventSchedule.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event schedule not found.");
  }
  await prisma.eventSchedule.delete({ where: { id } });
  return { message: "Event schedule deleted successfully." };
};


// ==================== 8. EVENT SESSION SERVICES ====================
const createEventSession = async (payload: any) => {
  if (!payload.scheduleId || !payload.sessionTitle || payload.duration === undefined) {
    throw new customError(status.BAD_REQUEST, "scheduleId, sessionTitle, and duration are required.");
  }

  return await prisma.eventSession.create({
    data: {
      scheduleId: payload.scheduleId,
      sessionTitle: payload.sessionTitle,
      speakerId: payload.speakerId || null,
      duration: Number(payload.duration),
      description: payload.description || null,
    },
  });
};

const getAllEventSessions = async (query?: { scheduleId?: string; speakerId?: string }) => {
  const where: any = {};
  if (query?.scheduleId) where.scheduleId = query.scheduleId;
  if (query?.speakerId) where.speakerId = query.speakerId;

  return await prisma.eventSession.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getEventSessionById = async (id: string) => {
  const item = await prisma.eventSession.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event session not found.");
  }
  return item;
};

const updateEventSession = async (id: string, payload: any) => {
  const item = await prisma.eventSession.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event session not found.");
  }

  return await prisma.eventSession.update({
    where: { id },
    data: {
      ...(payload.sessionTitle && { sessionTitle: payload.sessionTitle }),
      ...(payload.speakerId !== undefined && { speakerId: payload.speakerId }),
      ...(payload.duration !== undefined && { duration: Number(payload.duration) }),
      ...(payload.description !== undefined && { description: payload.description }),
    },
  });
};

const deleteEventSession = async (id: string) => {
  const item = await prisma.eventSession.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event session not found.");
  }
  await prisma.eventSession.delete({ where: { id } });
  return { message: "Event session deleted successfully." };
};


// ==================== 9. EVENT GALLERY SERVICES ====================
const createEventGallery = async (payload: any) => {
  if (!payload.eventId || !payload.albumId) {
    throw new customError(status.BAD_REQUEST, "eventId and albumId are required.");
  }

  return await prisma.eventGallery.create({
    data: {
      eventId: payload.eventId,
      albumId: payload.albumId,
    },
  });
};

const getAllEventGalleries = async (query?: { eventId?: string; albumId?: string }) => {
  const where: any = {};
  if (query?.eventId) where.eventId = query.eventId;
  if (query?.albumId) where.albumId = query.albumId;

  return await prisma.eventGallery.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getEventGalleryById = async (id: string) => {
  const item = await prisma.eventGallery.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event gallery link not found.");
  }
  return item;
};

const updateEventGallery = async (id: string, payload: any) => {
  const item = await prisma.eventGallery.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event gallery link not found.");
  }

  return await prisma.eventGallery.update({
    where: { id },
    data: {
      ...(payload.eventId && { eventId: payload.eventId }),
      ...(payload.albumId && { albumId: payload.albumId }),
    },
  });
};

const deleteEventGallery = async (id: string) => {
  const item = await prisma.eventGallery.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event gallery link not found.");
  }
  await prisma.eventGallery.delete({ where: { id } });
  return { message: "Event gallery link deleted successfully." };
};


export const eventCoreService = {
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
