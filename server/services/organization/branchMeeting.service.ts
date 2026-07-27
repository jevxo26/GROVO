import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateBranchMeetingPayload {
  branchId: string;
  title: string;
  meetingDate: string | Date;
  location?: string;
  agenda?: string;
  minutes?: string;
}

export interface UpdateBranchMeetingPayload {
  branchId?: string;
  title?: string;
  meetingDate?: string | Date;
  location?: string;
  agenda?: string;
  minutes?: string;
}

const createBranchMeeting = async (payload: CreateBranchMeetingPayload) => {
  if (!payload.branchId || !payload.title || !payload.meetingDate) {
    throw new customError(status.BAD_REQUEST, "Branch ID, Title, and Meeting date are required.");
  }

  const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
  if (!branch) {
    throw new customError(status.NOT_FOUND, "Branch not found.");
  }

  const branchMeeting = await prisma.branchMeeting.create({
    data: {
      branchId: payload.branchId,
      title: payload.title,
      meetingDate: new Date(payload.meetingDate),
      location: payload.location || null,
      agenda: payload.agenda || null,
      minutes: payload.minutes || null,
    },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return branchMeeting;
};

const getAllBranchMeetings = async (query?: { branchId?: string; search?: string }) => {
  const where: any = {};

  if (query?.branchId) {
    where.branchId = query.branchId;
  }
  if (query?.search) {
    where.OR = [
      { title: { contains: query.search, mode: "insensitive" } },
      { location: { contains: query.search, mode: "insensitive" } },
      { agenda: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const branchMeetings = await prisma.branchMeeting.findMany({
    where,
    orderBy: { meetingDate: "desc" },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return branchMeetings;
};

const getBranchMeetingById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Meeting ID is required.");
  }

  const branchMeeting = await prisma.branchMeeting.findUnique({
    where: { id },
    include: {
      branch: true,
    },
  });

  if (!branchMeeting) {
    throw new customError(status.NOT_FOUND, "Branch Meeting record not found.");
  }

  return branchMeeting;
};

const updateBranchMeeting = async (id: string, payload: UpdateBranchMeetingPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Meeting ID is required.");
  }

  const branchMeeting = await prisma.branchMeeting.findUnique({ where: { id } });
  if (!branchMeeting) {
    throw new customError(status.NOT_FOUND, "Branch Meeting record not found.");
  }

  if (payload.branchId) {
    const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
    if (!branch) {
      throw new customError(status.NOT_FOUND, "Branch not found.");
    }
  }

  const updated = await prisma.branchMeeting.update({
    where: { id },
    data: {
      ...(payload.branchId && { branchId: payload.branchId }),
      ...(payload.title && { title: payload.title }),
      ...(payload.meetingDate && { meetingDate: new Date(payload.meetingDate) }),
      ...(payload.location !== undefined && { location: payload.location }),
      ...(payload.agenda !== undefined && { agenda: payload.agenda }),
      ...(payload.minutes !== undefined && { minutes: payload.minutes }),
    },
  });

  return updated;
};

const deleteBranchMeeting = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Meeting ID is required.");
  }

  const branchMeeting = await prisma.branchMeeting.findUnique({ where: { id } });
  if (!branchMeeting) {
    throw new customError(status.NOT_FOUND, "Branch Meeting record not found.");
  }

  await prisma.branchMeeting.delete({ where: { id } });

  return { message: "Branch Meeting record deleted successfully." };
};

export const branchMeetingService = {
  createBranchMeeting,
  getAllBranchMeetings,
  getBranchMeetingById,
  updateBranchMeeting,
  deleteBranchMeeting,
};
