import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 7. BENEFICIARY NEED ASSESSMENT SERVICES ====================
export const createBeneficiaryNeedAssessment = async (payload: any) => {
  if (!payload.beneficiaryId || !payload.assessmentType || !payload.requiredSupport || !payload.assessedBy) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId, assessmentType, requiredSupport, and assessedBy are required.");
  }

  return await prisma.beneficiaryNeedAssessment.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      assessmentType: payload.assessmentType,
      requiredSupport: payload.requiredSupport,
      priority: payload.priority || "MEDIUM",
      assessedBy: payload.assessedBy,
      assessmentDate: payload.assessmentDate
        ? new Date(payload.assessmentDate)
        : new Date(),
    },
  });
};

export const getAllBeneficiaryNeedAssessments = async (query?: { beneficiaryId?: string; priority?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;
  if (query?.priority) where.priority = query.priority;

  return await prisma.beneficiaryNeedAssessment.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getBeneficiaryNeedAssessmentById = async (id: string) => {
  const item = await prisma.beneficiaryNeedAssessment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Need assessment record not found.");
  }
  return item;
};

export const updateBeneficiaryNeedAssessment = async (id: string, payload: any) => {
  const item = await prisma.beneficiaryNeedAssessment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Need assessment record not found.");
  }

  return await prisma.beneficiaryNeedAssessment.update({
    where: { id },
    data: {
      ...(payload.assessmentType && { assessmentType: payload.assessmentType }),
      ...(payload.requiredSupport && { requiredSupport: payload.requiredSupport }),
      ...(payload.priority && { priority: payload.priority }),
      ...(payload.assessedBy && { assessedBy: payload.assessedBy }),
      ...(payload.assessmentDate && { assessmentDate: new Date(payload.assessmentDate) }),
    },
  });
};

export const deleteBeneficiaryNeedAssessment = async (id: string) => {
  const item = await prisma.beneficiaryNeedAssessment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Need assessment record not found.");
  }
  await prisma.beneficiaryNeedAssessment.delete({ where: { id } });
  return { message: "Need assessment record deleted successfully." };
};
