import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 5. BENEFICIARY DOCUMENT SERVICES ====================
export const createBeneficiaryDocument = async (payload: any) => {
  if (!payload.beneficiaryId || !payload.documentType || !payload.fileUrl) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId, documentType, and fileUrl are required.");
  }

  return await prisma.beneficiaryDocument.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      documentType: payload.documentType,
      documentNumber: payload.documentNumber || null,
      fileUrl: payload.fileUrl,
      verificationStatus: payload.verificationStatus || "PENDING",
    },
  });
};

export const getAllBeneficiaryDocuments = async (query?: { beneficiaryId?: string; verificationStatus?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;
  if (query?.verificationStatus) where.verificationStatus = query.verificationStatus;

  return await prisma.beneficiaryDocument.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getBeneficiaryDocumentById = async (id: string) => {
  const item = await prisma.beneficiaryDocument.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary document not found.");
  }
  return item;
};

export const updateBeneficiaryDocument = async (id: string, payload: any) => {
  const item = await prisma.beneficiaryDocument.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary document not found.");
  }

  return await prisma.beneficiaryDocument.update({
    where: { id },
    data: {
      ...(payload.documentType && { documentType: payload.documentType }),
      ...(payload.documentNumber !== undefined && { documentNumber: payload.documentNumber }),
      ...(payload.fileUrl && { fileUrl: payload.fileUrl }),
      ...(payload.verificationStatus && { verificationStatus: payload.verificationStatus }),
    },
  });
};

export const deleteBeneficiaryDocument = async (id: string) => {
  const item = await prisma.beneficiaryDocument.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary document not found.");
  }
  await prisma.beneficiaryDocument.delete({ where: { id } });
  return { message: "Beneficiary document deleted successfully." };
};
