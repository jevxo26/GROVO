import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 16. DISTRIBUTION VERIFICATION SERVICES ====================
export const createDistributionVerification = async (payload: any) => {
  if (!payload.distributionRecordId || !payload.verifiedBy) {
    throw new customError(status.BAD_REQUEST, "distributionRecordId and verifiedBy are required.");
  }

  return await prisma.distributionVerification.create({
    data: {
      distributionRecordId: payload.distributionRecordId,
      verificationMethod: payload.verificationMethod || "QR_CODE",
      verifiedBy: payload.verifiedBy,
      verificationTime: payload.verificationTime
        ? new Date(payload.verificationTime)
        : new Date(),
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllDistributionVerifications = async (query?: { distributionRecordId?: string; status?: string }) => {
  const where: any = {};
  if (query?.distributionRecordId) where.distributionRecordId = query.distributionRecordId;
  if (query?.status) where.status = query.status;

  return await prisma.distributionVerification.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getDistributionVerificationById = async (id: string) => {
  const item = await prisma.distributionVerification.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution verification record not found.");
  }
  return item;
};

export const updateDistributionVerification = async (id: string, payload: any) => {
  const item = await prisma.distributionVerification.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution verification record not found.");
  }

  return await prisma.distributionVerification.update({
    where: { id },
    data: {
      ...(payload.verificationMethod && { verificationMethod: payload.verificationMethod }),
      ...(payload.verifiedBy && { verifiedBy: payload.verifiedBy }),
      ...(payload.verificationTime && { verificationTime: new Date(payload.verificationTime) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteDistributionVerification = async (id: string) => {
  const item = await prisma.distributionVerification.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution verification record not found.");
  }
  await prisma.distributionVerification.delete({ where: { id } });
  return { message: "Distribution verification record deleted successfully." };
};
