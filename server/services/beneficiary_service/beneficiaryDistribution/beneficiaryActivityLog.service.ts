import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 21. BENEFICIARY ACTIVITY LOG SERVICES ====================
export const createBeneficiaryActivityLog = async (payload: any) => {
  if (!payload.beneficiaryId || !payload.activity || !payload.performedBy) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId, activity, and performedBy are required.");
  }

  return await prisma.beneficiaryActivityLog.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      activity: payload.activity,
      description: payload.description || null,
      performedBy: payload.performedBy,
    },
  });
};

export const getAllBeneficiaryActivityLogs = async (query?: { beneficiaryId?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;

  return await prisma.beneficiaryActivityLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getBeneficiaryActivityLogById = async (id: string) => {
  const item = await prisma.beneficiaryActivityLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary activity log not found.");
  }
  return item;
};

export const deleteBeneficiaryActivityLog = async (id: string) => {
  const item = await prisma.beneficiaryActivityLog.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary activity log not found.");
  }
  await prisma.beneficiaryActivityLog.delete({ where: { id } });
  return { message: "Beneficiary activity log deleted successfully." };
};
