import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateBranchAnnouncementPayload {
  branchId: string;
  title: string;
  description: string;
  publishedBy?: string;
  status?: string;
}

export interface UpdateBranchAnnouncementPayload {
  branchId?: string;
  title?: string;
  description?: string;
  publishedBy?: string;
  status?: string;
}

const createBranchAnnouncement = async (payload: CreateBranchAnnouncementPayload) => {
  if (!payload.branchId || !payload.title || !payload.description) {
    throw new customError(status.BAD_REQUEST, "Branch ID, Title, and Description are required.");
  }

  const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
  if (!branch) {
    throw new customError(status.NOT_FOUND, "Branch not found.");
  }

  if (payload.publishedBy) {
    const user = await prisma.user.findUnique({ where: { id: payload.publishedBy } });
    if (!user) {
      throw new customError(status.NOT_FOUND, "Publisher user not found.");
    }
  }

  const branchAnnouncement = await prisma.branchAnnouncement.create({
    data: {
      branchId: payload.branchId,
      title: payload.title,
      description: payload.description,
      publishedBy: payload.publishedBy || null,
      status: payload.status || "ACTIVE",
    },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
      publisher: { select: { id: true, fullName: true, email: true } },
    },
  });

  return branchAnnouncement;
};

const getAllBranchAnnouncements = async (query?: { branchId?: string; status?: string; search?: string }) => {
  const where: any = {};

  if (query?.branchId) {
    where.branchId = query.branchId;
  }
  if (query?.status) {
    where.status = query.status;
  }
  if (query?.search) {
    where.OR = [
      { title: { contains: query.search, mode: "insensitive" } },
      { description: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const branchAnnouncements = await prisma.branchAnnouncement.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
      publisher: { select: { id: true, fullName: true, email: true } },
    },
  });

  return branchAnnouncements;
};

const getBranchAnnouncementById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Announcement ID is required.");
  }

  const branchAnnouncement = await prisma.branchAnnouncement.findUnique({
    where: { id },
    include: {
      branch: true,
      publisher: { select: { id: true, fullName: true, email: true, phone: true } },
    },
  });

  if (!branchAnnouncement) {
    throw new customError(status.NOT_FOUND, "Branch Announcement record not found.");
  }

  return branchAnnouncement;
};

const updateBranchAnnouncement = async (id: string, payload: UpdateBranchAnnouncementPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Announcement ID is required.");
  }

  const branchAnnouncement = await prisma.branchAnnouncement.findUnique({ where: { id } });
  if (!branchAnnouncement) {
    throw new customError(status.NOT_FOUND, "Branch Announcement record not found.");
  }

  if (payload.branchId) {
    const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
    if (!branch) {
      throw new customError(status.NOT_FOUND, "Branch not found.");
    }
  }

  if (payload.publishedBy) {
    const user = await prisma.user.findUnique({ where: { id: payload.publishedBy } });
    if (!user) {
      throw new customError(status.NOT_FOUND, "Publisher user not found.");
    }
  }

  const updated = await prisma.branchAnnouncement.update({
    where: { id },
    data: {
      ...(payload.branchId && { branchId: payload.branchId }),
      ...(payload.title && { title: payload.title }),
      ...(payload.description && { description: payload.description }),
      ...(payload.publishedBy !== undefined && { publishedBy: payload.publishedBy }),
      ...(payload.status && { status: payload.status }),
    },
  });

  return updated;
};

const deleteBranchAnnouncement = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Announcement ID is required.");
  }

  const branchAnnouncement = await prisma.branchAnnouncement.findUnique({ where: { id } });
  if (!branchAnnouncement) {
    throw new customError(status.NOT_FOUND, "Branch Announcement record not found.");
  }

  await prisma.branchAnnouncement.delete({ where: { id } });

  return { message: "Branch Announcement record deleted successfully." };
};

export const branchAnnouncementService = {
  createBranchAnnouncement,
  getAllBranchAnnouncements,
  getBranchAnnouncementById,
  updateBranchAnnouncement,
  deleteBranchAnnouncement,
};
