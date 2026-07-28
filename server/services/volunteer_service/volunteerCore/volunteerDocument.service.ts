import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 20. VOLUNTEER DOCUMENT SERVICES ====================
export const createVolunteerDocument = async (payload: any) => {
  if (!payload.volunteerId || !payload.documentType || !payload.documentName || !payload.fileUrl) {
    throw new customError(status.BAD_REQUEST, "volunteerId, documentType, documentName, and fileUrl are required.");
  }

  return await prisma.volunteerDocument.create({
    data: {
      volunteerId: payload.volunteerId,
      documentType: payload.documentType,
      documentName: payload.documentName,
      fileUrl: payload.fileUrl,
      verificationStatus: payload.verificationStatus || "PENDING",
      uploadedAt: payload.uploadedAt ? new Date(payload.uploadedAt) : new Date(),
    },
  });
};

export const getAllVolunteerDocuments = async (query?: { volunteerId?: string; documentType?: string; verificationStatus?: string }) => {
  const where: any = {};
  if (query?.volunteerId) where.volunteerId = query.volunteerId;
  if (query?.documentType) where.documentType = query.documentType;
  if (query?.verificationStatus) where.verificationStatus = query.verificationStatus;

  return await prisma.volunteerDocument.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getVolunteerDocumentById = async (id: string) => {
  const item = await prisma.volunteerDocument.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer document not found.");
  }
  return item;
};

export const updateVolunteerDocument = async (id: string, payload: any) => {
  const item = await prisma.volunteerDocument.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer document not found.");
  }

  return await prisma.volunteerDocument.update({
    where: { id },
    data: {
      ...(payload.documentType && { documentType: payload.documentType }),
      ...(payload.documentName && { documentName: payload.documentName }),
      ...(payload.fileUrl && { fileUrl: payload.fileUrl }),
      ...(payload.verificationStatus && { verificationStatus: payload.verificationStatus }),
    },
  });
};

export const deleteVolunteerDocument = async (id: string) => {
  const item = await prisma.volunteerDocument.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer document not found.");
  }
  await prisma.volunteerDocument.delete({ where: { id } });
  return { message: "Volunteer document deleted successfully." };
};
