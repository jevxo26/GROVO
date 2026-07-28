import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 7. VOLUNTEER ATTENDANCE SERVICES ====================
export const createVolunteerAttendance = async (payload: any) => {
  if (!payload.volunteerId || !payload.scheduleId) {
    throw new customError(status.BAD_REQUEST, "volunteerId and scheduleId are required.");
  }

  return await prisma.volunteerAttendance.create({
    data: {
      volunteerId: payload.volunteerId,
      scheduleId: payload.scheduleId,
      checkInTime: payload.checkInTime
        ? new Date(payload.checkInTime)
        : null,
      checkOutTime: payload.checkOutTime
        ? new Date(payload.checkOutTime)
        : null,
      attendanceStatus: payload.attendanceStatus || "PRESENT",
      remarks: payload.remarks || null,
    },
  });
};

export const getAllVolunteerAttendances = async (query?: { volunteerId?: string; scheduleId?: string; attendanceStatus?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;
  if (query?.scheduleId) where.scheduleId = query.scheduleId;
  if (query?.attendanceStatus) where.attendanceStatus = query.attendanceStatus;

  return await prisma.volunteerAttendance.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getVolunteerAttendanceById = async (id: string) => {
  const item = await prisma.volunteerAttendance.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer attendance record not found.");
  }
  return item;
};

export const updateVolunteerAttendance = async (id: string, payload: any) => {
  const item = await prisma.volunteerAttendance.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer attendance record not found.");
  }

  return await prisma.volunteerAttendance.update({
    where: { id },
    data: {
      ...(payload.checkInTime && { checkInTime: new Date(payload.checkInTime) }),
      ...(payload.checkOutTime && { checkOutTime: new Date(payload.checkOutTime) }),
      ...(payload.attendanceStatus && { attendanceStatus: payload.attendanceStatus }),
      ...(payload.remarks !== undefined && { remarks: payload.remarks }),
    },
  });
};

export const deleteVolunteerAttendance = async (id: string) => {
  const item = await prisma.volunteerAttendance.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer attendance record not found.");
  }
  await prisma.volunteerAttendance.delete({ where: { id } });
  return { message: "Volunteer attendance record deleted successfully." };
};
