import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 19. FOLLOW UP VISIT SERVICES ====================
export const createFollowUpVisit = async (payload: any) => {
  if (!payload.beneficiaryId || !payload.visitedBy) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId and visitedBy are required.");
  }

  return await prisma.followUpVisit.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      visitedBy: payload.visitedBy,
      visitDate: payload.visitDate ? new Date(payload.visitDate) : new Date(),
      remarks: payload.remarks || null,
      nextVisitDate: payload.nextVisitDate
        ? new Date(payload.nextVisitDate)
        : null,
      status: payload.status || "PENDING",
    },
  });
};

export const getAllFollowUpVisits = async (query?: { beneficiaryId?: string; visitedBy?: string; status?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;
  if (query?.visitedBy) where.visitedBy = query.visitedBy;
  if (query?.status) where.status = query.status;

  return await prisma.followUpVisit.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getFollowUpVisitById = async (id: string) => {
  const item = await prisma.followUpVisit.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Follow-up visit not found.");
  }
  return item;
};

export const updateFollowUpVisit = async (id: string, payload: any) => {
  const item = await prisma.followUpVisit.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Follow-up visit not found.");
  }

  return await prisma.followUpVisit.update({
    where: { id },
    data: {
      ...(payload.visitedBy && { visitedBy: payload.visitedBy }),
      ...(payload.visitDate && { visitDate: new Date(payload.visitDate) }),
      ...(payload.remarks !== undefined && { remarks: payload.remarks }),
      ...(payload.nextVisitDate !== undefined && { nextVisitDate: payload.nextVisitDate ? new Date(payload.nextVisitDate) : null }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteFollowUpVisit = async (id: string) => {
  const item = await prisma.followUpVisit.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Follow-up visit not found.");
  }
  await prisma.followUpVisit.delete({ where: { id } });
  return { message: "Follow-up visit deleted successfully." };
};
