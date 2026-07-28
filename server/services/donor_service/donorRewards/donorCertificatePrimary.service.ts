import status from "http-status";
import { prisma } from "../../../lib/prisma";
import customError from "../../../error/customError";

// ==================== 9. DONOR CERTIFICATE SERVICES ====================
export const createDonorCertificate = async (payload: any) => {
  if (!payload.donorId || !payload.certificateType || !payload.certificateNumber || !payload.downloadUrl) {
    throw new customError(status.BAD_REQUEST, "donorId, certificateType, certificateNumber, and downloadUrl are required.");
  }

  const existing = await prisma.donorCertificate.findUnique({
    where: { certificateNumber: payload.certificateNumber },
  });
  if (existing) {
    throw new customError(
      status.CONFLICT,
      `Certificate number '${payload.certificateNumber}' already exists`
    );
  }

  return await prisma.donorCertificate.create({
    data: {
      donorId: payload.donorId,
      certificateType: payload.certificateType,
      certificateNumber: payload.certificateNumber,
      issueDate: payload.issueDate ? new Date(payload.issueDate) : new Date(),
      downloadUrl: payload.downloadUrl,
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllDonorCertificates = async (query?: { donorId?: string; certificateType?: string; status?: string }) => {
  const where: any = {};
  if (query?.donorId) where.donorId = query.donorId;
  if (query?.certificateType) where.certificateType = query.certificateType;
  if (query?.status) where.status = query.status;

  return await prisma.donorCertificate.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getDonorCertificateById = async (id: string) => {
  const item = await prisma.donorCertificate.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor certificate not found.");
  }
  return item;
};

