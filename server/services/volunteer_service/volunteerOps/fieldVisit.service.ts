import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 10. FIELD VISIT SERVICES ====================
export const createFieldVisit = async (payload: any) => {
  if (!payload.activityId || !payload.visitedBy) {
    throw new customError(status.BAD_REQUEST, "activityId and visitedBy are required.");
  }

  return await prisma.fieldVisit.create({
    data: {
      activityId: payload.activityId,
      visitedBy: payload.visitedBy,
      divisionId: payload.divisionId || null,
      districtId: payload.districtId || null,
      upazilaId: payload.upazilaId || null,
      unionId: payload.unionId || null,
      visitDate: payload.visitDate ? new Date(payload.visitDate) : new Date(),
      remarks: payload.remarks || null,
    },
  });
};

export const getAllFieldVisits = async (query?: { activityId?: string; visitedBy?: string }) => {
  const where: any = {};
  if (query?.activityId) where.activityId = query.activityId;
  if (query?.visitedBy) where.visitedBy = query.visitedBy;

  return await prisma.fieldVisit.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getFieldVisitById = async (id: string) => {
  const item = await prisma.fieldVisit.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Field visit record not found.");
  }
  return item;
};

export const updateFieldVisit = async (id: string, payload: any) => {
  const item = await prisma.fieldVisit.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Field visit record not found.");
  }

  return await prisma.fieldVisit.update({
    where: { id },
    data: {
      ...(payload.visitedBy && { visitedBy: payload.visitedBy }),
      ...(payload.divisionId !== undefined && { divisionId: payload.divisionId }),
      ...(payload.districtId !== undefined && { districtId: payload.districtId }),
      ...(payload.upazilaId !== undefined && { upazilaId: payload.upazilaId }),
      ...(payload.unionId !== undefined && { unionId: payload.unionId }),
      ...(payload.visitDate && { visitDate: new Date(payload.visitDate) }),
      ...(payload.remarks !== undefined && { remarks: payload.remarks }),
    },
  });
};

export const deleteFieldVisit = async (id: string) => {
  const item = await prisma.fieldVisit.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Field visit record not found.");
  }
  await prisma.fieldVisit.delete({ where: { id } });
  return { message: "Field visit record deleted successfully." };
};
