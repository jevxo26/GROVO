import { prisma } from "../lib/prisma";

const scheduleEvent = async (payload: {
  title: string;
  slug: string;
  categoryId: string;
  eventType: string;
  branchId: string;
  venue: string;
  startDate: string;
  endDate: string;
  createdBy: string;
}) => {
  const eventCode = `EVT-${Date.now()}`;
  return await prisma.event.create({
    data: {
      eventCode,
      title: payload.title,
      slug: payload.slug,
      categoryId: payload.categoryId,
      eventType: payload.eventType,
      branchId: payload.branchId,
      venue: payload.venue,
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
      createdBy: payload.createdBy,
      status: "ACTIVE",
    },
  });
};

const logAttendance = async (payload: {
  eventId: string;
  userId: string;
  checkInTime: string;
}) => {
  return await prisma.eventAttendance.create({
    data: {
      eventId: payload.eventId,
      userId: payload.userId,
      checkInTime: new Date(payload.checkInTime),
      attendanceStatus: "PRESENT",
    },
  });
};

export const eventService = {
  scheduleEvent,
  logAttendance,
};
