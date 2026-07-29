import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 18. BENEFICIARY FEEDBACK SERVICES ====================
export const createBeneficiaryFeedback = async (payload: any) => {
  if (!payload.beneficiaryId || !payload.feedback) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId and feedback are required.");
  }

  return await prisma.beneficiaryFeedback.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      distributionRecordId: payload.distributionRecordId || null,
      rating: payload.rating ? Number(payload.rating) : 5,
      feedback: payload.feedback,
      submittedAt: payload.submittedAt
        ? new Date(payload.submittedAt)
        : new Date(),
    },
  });
};

export const getAllBeneficiaryFeedbacks = async (query?: { beneficiaryId?: string; distributionRecordId?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;
  if (query?.distributionRecordId) where.distributionRecordId = query.distributionRecordId;

  return await prisma.beneficiaryFeedback.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getBeneficiaryFeedbackById = async (id: string) => {
  const item = await prisma.beneficiaryFeedback.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary feedback not found.");
  }
  return item;
};

export const updateBeneficiaryFeedback = async (id: string, payload: any) => {
  const item = await prisma.beneficiaryFeedback.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary feedback not found.");
  }

  return await prisma.beneficiaryFeedback.update({
    where: { id },
    data: {
      ...(payload.rating !== undefined && { rating: Number(payload.rating) }),
      ...(payload.feedback && { feedback: payload.feedback }),
    },
  });
};

export const deleteBeneficiaryFeedback = async (id: string) => {
  const item = await prisma.beneficiaryFeedback.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary feedback not found.");
  }
  await prisma.beneficiaryFeedback.delete({ where: { id } });
  return { message: "Beneficiary feedback deleted successfully." };
};
