import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 17. ACKNOWLEDGEMENT SERVICES ====================
export const createAcknowledgement = async (payload: any) => {
  if (!payload.distributionRecordId) {
    throw new customError(status.BAD_REQUEST, "distributionRecordId is required.");
  }

  const existing = await prisma.acknowledgement.findUnique({
    where: { distributionRecordId: payload.distributionRecordId },
  });
  if (existing) {
    throw new customError(status.CONFLICT, "Acknowledgement already exists for this distribution record.");
  }

  return await prisma.acknowledgement.create({
    data: {
      distributionRecordId: payload.distributionRecordId,
      signature: payload.signature || null,
      photo: payload.photo || null,
      remarks: payload.remarks || null,
    },
  });
};

export const getAllAcknowledgements = async (query?: { distributionRecordId?: string }) => {
  const where: any = {};
  if (query?.distributionRecordId) where.distributionRecordId = query.distributionRecordId;

  return await prisma.acknowledgement.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getAcknowledgementById = async (id: string) => {
  const item = await prisma.acknowledgement.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Acknowledgement not found.");
  }
  return item;
};

export const updateAcknowledgement = async (id: string, payload: any) => {
  const item = await prisma.acknowledgement.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Acknowledgement not found.");
  }

  return await prisma.acknowledgement.update({
    where: { id },
    data: {
      ...(payload.signature !== undefined && { signature: payload.signature }),
      ...(payload.photo !== undefined && { photo: payload.photo }),
      ...(payload.remarks !== undefined && { remarks: payload.remarks }),
    },
  });
};

export const deleteAcknowledgement = async (id: string) => {
  const item = await prisma.acknowledgement.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Acknowledgement not found.");
  }
  await prisma.acknowledgement.delete({ where: { id } });
  return { message: "Acknowledgement deleted successfully." };
};
