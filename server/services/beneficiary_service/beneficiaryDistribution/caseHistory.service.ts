import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 20. CASE HISTORY SERVICES ====================
export const createCaseHistory = async (payload: any) => {
  if (!payload.beneficiaryId || !payload.caseType || !payload.description || !payload.assignedOfficer) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId, caseType, description, and assignedOfficer are required.");
  }

  return await prisma.caseHistory.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      caseType: payload.caseType,
      description: payload.description,
      assignedOfficer: payload.assignedOfficer,
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllCaseHistories = async (query?: { beneficiaryId?: string; caseType?: string; status?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;
  if (query?.caseType) where.caseType = query.caseType;
  if (query?.status) where.status = query.status;

  return await prisma.caseHistory.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getCaseHistoryById = async (id: string) => {
  const item = await prisma.caseHistory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Case history not found.");
  }
  return item;
};

export const updateCaseHistory = async (id: string, payload: any) => {
  const item = await prisma.caseHistory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Case history not found.");
  }

  return await prisma.caseHistory.update({
    where: { id },
    data: {
      ...(payload.caseType && { caseType: payload.caseType }),
      ...(payload.description && { description: payload.description }),
      ...(payload.assignedOfficer && { assignedOfficer: payload.assignedOfficer }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteCaseHistory = async (id: string) => {
  const item = await prisma.caseHistory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Case history not found.");
  }
  await prisma.caseHistory.delete({ where: { id } });
  return { message: "Case history deleted successfully." };
};
