import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateBranchDocumentPayload {
  branchId: string;
  documentType?: string;
  documentName: string;
  fileUrl: string;
  uploadedBy?: string;
}

export interface UpdateBranchDocumentPayload {
  branchId?: string;
  documentType?: string;
  documentName?: string;
  fileUrl?: string;
  uploadedBy?: string;
}

const createBranchDocument = async (payload: CreateBranchDocumentPayload) => {
  if (!payload.branchId || !payload.documentName || !payload.fileUrl) {
    throw new customError(status.BAD_REQUEST, "Branch ID, Document name, and File URL are required.");
  }

  const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
  if (!branch) {
    throw new customError(status.NOT_FOUND, "Branch not found.");
  }

  if (payload.uploadedBy) {
    const user = await prisma.user.findUnique({ where: { id: payload.uploadedBy } });
    if (!user) {
      throw new customError(status.NOT_FOUND, "Uploader user not found.");
    }
  }

  const branchDocument = await prisma.branchDocument.create({
    data: {
      branchId: payload.branchId,
      documentType: payload.documentType || null,
      documentName: payload.documentName,
      fileUrl: payload.fileUrl,
      uploadedBy: payload.uploadedBy || null,
    },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
      uploader: { select: { id: true, fullName: true, email: true } },
    },
  });

  return branchDocument;
};

const getAllBranchDocuments = async (query?: { branchId?: string; documentType?: string; search?: string }) => {
  const where: any = {};

  if (query?.branchId) {
    where.branchId = query.branchId;
  }
  if (query?.documentType) {
    where.documentType = query.documentType;
  }
  if (query?.search) {
    where.documentName = { contains: query.search, mode: "insensitive" };
  }

  const branchDocuments = await prisma.branchDocument.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
      uploader: { select: { id: true, fullName: true, email: true } },
    },
  });

  return branchDocuments;
};

const getBranchDocumentById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Document ID is required.");
  }

  const branchDocument = await prisma.branchDocument.findUnique({
    where: { id },
    include: {
      branch: true,
      uploader: { select: { id: true, fullName: true, email: true, phone: true } },
    },
  });

  if (!branchDocument) {
    throw new customError(status.NOT_FOUND, "Branch Document record not found.");
  }

  return branchDocument;
};

const updateBranchDocument = async (id: string, payload: UpdateBranchDocumentPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Document ID is required.");
  }

  const branchDocument = await prisma.branchDocument.findUnique({ where: { id } });
  if (!branchDocument) {
    throw new customError(status.NOT_FOUND, "Branch Document record not found.");
  }

  if (payload.branchId) {
    const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
    if (!branch) {
      throw new customError(status.NOT_FOUND, "Branch not found.");
    }
  }

  if (payload.uploadedBy) {
    const user = await prisma.user.findUnique({ where: { id: payload.uploadedBy } });
    if (!user) {
      throw new customError(status.NOT_FOUND, "Uploader user not found.");
    }
  }

  const updated = await prisma.branchDocument.update({
    where: { id },
    data: {
      ...(payload.branchId && { branchId: payload.branchId }),
      ...(payload.documentType !== undefined && { documentType: payload.documentType }),
      ...(payload.documentName && { documentName: payload.documentName }),
      ...(payload.fileUrl && { fileUrl: payload.fileUrl }),
      ...(payload.uploadedBy !== undefined && { uploadedBy: payload.uploadedBy }),
    },
  });

  return updated;
};

const deleteBranchDocument = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Document ID is required.");
  }

  const branchDocument = await prisma.branchDocument.findUnique({ where: { id } });
  if (!branchDocument) {
    throw new customError(status.NOT_FOUND, "Branch Document record not found.");
  }

  await prisma.branchDocument.delete({ where: { id } });

  return { message: "Branch Document record deleted successfully." };
};

export const branchDocumentService = {
  createBranchDocument,
  getAllBranchDocuments,
  getBranchDocumentById,
  updateBranchDocument,
  deleteBranchDocument,
};
