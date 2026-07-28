import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 4. EVENT ATTENDANCE SERVICES ====================
export const createEventAttendance = async (payload: any) => {
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

export const getAllEventAttendances = async (query?: { eventId?: string; userId?: string; attendanceStatus?: string }) => {
  const where: any = {};
  if (query?.eventId) where.eventId = query.eventId;
  if (query?.userId) where.userId = query.userId;
  if (query?.attendanceStatus) where.attendanceStatus = query.attendanceStatus;

  return await prisma.eventAttendance.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getEventAttendanceById = async (id: string) => {
  const item = await prisma.eventAttendance.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event attendance record not found.");
  }
  return item;
};

export const updateEventAttendance = async (id: string, payload: any) => {
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

export const deleteEventAttendance = async (id: string) => {
  const item = await prisma.eventAttendance.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event attendance record not found.");
  }
  await prisma.eventAttendance.delete({ where: { id } });
  return { message: "Event attendance record deleted successfully." };
};
