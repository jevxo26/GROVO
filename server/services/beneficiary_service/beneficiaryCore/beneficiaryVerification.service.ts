import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 6. BENEFICIARY VERIFICATION SERVICES ====================
export const createBeneficiaryVerification = async (payload: any) => {
  if (!payload.beneficiaryId || !payload.verifiedBy) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId and verifiedBy are required.");
  }

  return await prisma.reliefBeneficiaryVerification.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      verifiedBy: payload.verifiedBy,
      verificationMethod: payload.verificationMethod || "MANUAL_VERIFICATION",
      verificationDate: payload.verificationDate
        ? new Date(payload.verificationDate)
        : new Date(),
      status: payload.status || "PENDING",
      remarks: payload.remarks || null,
    },
  });
};

export const getAllBeneficiaryVerifications = async (query?: { beneficiaryId?: string; status?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;
  if (query?.status) where.status = query.status;

  return await prisma.reliefBeneficiaryVerification.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getBeneficiaryVerificationById = async (id: string) => {
  const item = await prisma.reliefBeneficiaryVerification.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary verification record not found.");
  }
  return item;
};

export const updateBeneficiaryVerification = async (id: string, payload: any) => {
  const item = await prisma.reliefBeneficiaryVerification.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary verification record not found.");
  }

  return await prisma.reliefBeneficiaryVerification.update({
    where: { id },
    data: {
      ...(payload.verifiedBy && { verifiedBy: payload.verifiedBy }),
      ...(payload.verificationMethod && { verificationMethod: payload.verificationMethod }),
      ...(payload.verificationDate && { verificationDate: new Date(payload.verificationDate) }),
      ...(payload.status && { status: payload.status }),
      ...(payload.remarks !== undefined && { remarks: payload.remarks }),
    },
  });
};

export const deleteBeneficiaryVerification = async (id: string) => {
  const item = await prisma.reliefBeneficiaryVerification.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary verification record not found.");
  }
  await prisma.reliefBeneficiaryVerification.delete({ where: { id } });
  return { message: "Beneficiary verification record deleted successfully." };
};
