import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 12. BENEFICIARY VERIFICATION SERVICES ====================
export const createBeneficiaryVerification = async (payload: any) => {
  if (!payload.beneficiaryId || !payload.verifiedBy || !payload.verificationMethod) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId, verifiedBy, and verificationMethod are required.");
  }

  return await prisma.beneficiaryVerification.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      verifiedBy: payload.verifiedBy,
      verificationMethod: payload.verificationMethod,
      verificationStatus: payload.verificationStatus || "PENDING",
      remarks: payload.remarks || null,
    },
  });
};

export const getAllBeneficiaryVerifications = async (query?: { beneficiaryId?: string; verificationStatus?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;
  if (query?.verificationStatus) where.verificationStatus = query.verificationStatus;

  return await prisma.beneficiaryVerification.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getBeneficiaryVerificationById = async (id: string) => {
  const item = await prisma.beneficiaryVerification.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary verification record not found.");
  }
  return item;
};

export const updateBeneficiaryVerification = async (id: string, payload: any) => {
  const item = await prisma.beneficiaryVerification.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary verification record not found.");
  }

  return await prisma.beneficiaryVerification.update({
    where: { id },
    data: {
      ...(payload.verifiedBy && { verifiedBy: payload.verifiedBy }),
      ...(payload.verificationMethod && { verificationMethod: payload.verificationMethod }),
      ...(payload.verificationStatus && { verificationStatus: payload.verificationStatus }),
      ...(payload.remarks !== undefined && { remarks: payload.remarks }),
    },
  });
};

export const deleteBeneficiaryVerification = async (id: string) => {
  const item = await prisma.beneficiaryVerification.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary verification record not found.");
  }
  await prisma.beneficiaryVerification.delete({ where: { id } });
  return { message: "Beneficiary verification record deleted successfully." };
};
