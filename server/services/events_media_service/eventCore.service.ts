import { prisma } from "../../lib/prisma"; // Adjust path if needed

const createEventCategory = async (payload: any) => {
  return await prisma.eventCategory.create({ data: payload });
};

const createEvent = async (payload: any) => {
  return await prisma.event.create({ data: payload });
};

const getAllEvents = async (query: any) => {
  const { searchTerm, eventType, status, branchId } = query;
  const where: any = {};

  if (searchTerm) {
    where.OR = [
      { title: { contains: searchTerm, mode: "insensitive" } },
      { eventCode: { contains: searchTerm, mode: "insensitive" } },
    ];
  }
  if (eventType) where.eventType = eventType;
  if (status) where.status = status;
  if (branchId) where.branchId = branchId;

  return await prisma.event.findMany({ where });
};

const registerUserForEvent = async (payload: any) => {
  return await prisma.eventRegistration.create({ data: payload });
};

const recordEventAttendance = async (payload: any) => {
  return await prisma.eventAttendance.create({ data: payload });
};

const addEventSpeaker = async (payload: any) => {
  return await prisma.eventSpeaker.create({ data: payload });
};

const assignEventVolunteer = async (payload: any) => {
  return await prisma.eventVolunteer.create({ data: payload });
};

const createEventSchedule = async (payload: any) => {
  return await prisma.eventSchedule.create({ data: payload });
};

const createEventSession = async (payload: any) => {
  return await prisma.eventSession.create({ data: payload });
};

export const EventCoreService = {
  createEventCategory,
  createEvent,
  getAllEvents,
  registerUserForEvent,
  recordEventAttendance,
  addEventSpeaker,
  assignEventVolunteer,
  createEventSchedule,
  createEventSession,
};
