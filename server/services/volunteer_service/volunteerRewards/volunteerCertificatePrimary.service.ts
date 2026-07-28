import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 15. VOLUNTEER CERTIFICATE SERVICES ====================
export const createVolunteerCertificate = async (payload: any) => {
  if (!payload.volunteerId || !payload.certificateType || !payload.certificateNumber || !payload.certificateUrl) {
    throw new customError(status.BAD_REQUEST, "volunteerId, certificateType, certificateNumber, and certificateUrl are required.");
  }

  const existing = await prisma.volunteerCertificate.findUnique({
    where: { certificateNumber: payload.certificateNumber },
  });

  if (existing) {
    throw new customError(
      status.CONFLICT,
      `Certificate number '${payload.certificateNumber}' already exists`
    );
  }

  return await prisma.volunteerCertificate.create({
    data: {
      volunteerId: payload.volunteerId,
      certificateType: payload.certificateType,
      certificateNumber: payload.certificateNumber,
      issueDate: payload.issueDate ? new Date(payload.issueDate) : new Date(),
      certificateUrl: payload.certificateUrl,
    },
  });
};

export const getAllVolunteerCertificates = async (query?: { volunteerId?: string; certificateType?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;
  if (query?.certificateType) where.certificateType = query.certificateType;

  return await prisma.volunteerCertificate.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getVolunteerCertificateById = async (id: string) => {
  const item = await prisma.volunteerCertificate.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer certificate not found.");
  }
  return item;
};

