import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 15. BENEFICIARY QR CODE SERVICES ====================
export const createBeneficiaryQRCode = async (payload: any) => {
  if (!payload.beneficiaryId || !payload.qrCode || !payload.verificationUrl) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId, qrCode, and verificationUrl are required.");
  }

  const existing = await prisma.beneficiaryQRCode.findUnique({
    where: { beneficiaryId: payload.beneficiaryId },
  });
  if (existing) {
    throw new customError(status.CONFLICT, "QR Code already exists for this beneficiary.");
  }

  return await prisma.beneficiaryQRCode.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      qrCode: payload.qrCode,
      barcode: payload.barcode || null,
      verificationUrl: payload.verificationUrl,
    },
  });
};

export const getAllBeneficiaryQRCodes = async (query?: { beneficiaryId?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;

  return await prisma.beneficiaryQRCode.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getBeneficiaryQRCodeById = async (id: string) => {
  const item = await prisma.beneficiaryQRCode.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary QR Code record not found.");
  }
  return item;
};

export const updateBeneficiaryQRCode = async (id: string, payload: any) => {
  const item = await prisma.beneficiaryQRCode.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary QR Code record not found.");
  }

  return await prisma.beneficiaryQRCode.update({
    where: { id },
    data: {
      ...(payload.qrCode && { qrCode: payload.qrCode }),
      ...(payload.barcode !== undefined && { barcode: payload.barcode }),
      ...(payload.verificationUrl && { verificationUrl: payload.verificationUrl }),
    },
  });
};

export const deleteBeneficiaryQRCode = async (id: string) => {
  const item = await prisma.beneficiaryQRCode.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary QR Code record not found.");
  }
  await prisma.beneficiaryQRCode.delete({ where: { id } });
  return { message: "Beneficiary QR Code record deleted successfully." };
};
