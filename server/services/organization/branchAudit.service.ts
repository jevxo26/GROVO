import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateBranchAuditPayload {
  branchId: string;
  auditYear: string;
  auditor: string;
  remarks?: string;
  status?: string;
}

export interface UpdateBranchAuditPayload {
  branchId?: string;
  auditYear?: string;
  auditor?: string;
  remarks?: string;
  status?: string;
}

const createBranchAudit = async (payload: CreateBranchAuditPayload) => {
  if (!payload.branchId || !payload.auditYear || !payload.auditor) {
    throw new customError(status.BAD_REQUEST, "Branch ID, Audit year, and Auditor are required.");
  }

  const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
  if (!branch) {
    throw new customError(status.NOT_FOUND, "Branch not found.");
  }

  const existing = await prisma.branchAudit.findFirst({
    where: { branchId: payload.branchId, auditYear: payload.auditYear },
  });
  if (existing) {
    throw new customError(status.CONFLICT, `An audit log already exists for this branch in the year ${payload.auditYear}.`);
  }

  const branchAudit = await prisma.branchAudit.create({
    data: {
      branchId: payload.branchId,
      auditYear: payload.auditYear,
      auditor: payload.auditor,
      remarks: payload.remarks || null,
      status: payload.status || "COMPLETED",
    },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return branchAudit;
};

const getAllBranchAudits = async (query?: { branchId?: string; status?: string; auditYear?: string }) => {
  const where: any = {};

  if (query?.branchId) {
    where.branchId = query.branchId;
  }
  if (query?.status) {
    where.status = query.status;
  }
  if (query?.auditYear) {
    where.auditYear = query.auditYear;
  }

  const branchAudits = await prisma.branchAudit.findMany({
    where,
    orderBy: { auditYear: "desc" },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return branchAudits;
};

const getBranchAuditById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Audit ID is required.");
  }

  const branchAudit = await prisma.branchAudit.findUnique({
    where: { id },
    include: {
      branch: true,
    },
  });

  if (!branchAudit) {
    throw new customError(status.NOT_FOUND, "Branch Audit record not found.");
  }

  return branchAudit;
};

const updateBranchAudit = async (id: string, payload: UpdateBranchAuditPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Audit ID is required.");
  }

  const branchAudit = await prisma.branchAudit.findUnique({ where: { id } });
  if (!branchAudit) {
    throw new customError(status.NOT_FOUND, "Branch Audit record not found.");
  }

  if (payload.branchId) {
    const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
    if (!branch) {
      throw new customError(status.NOT_FOUND, "Branch not found.");
    }
  }

  if (payload.auditYear || payload.branchId) {
    const targetBranchId = payload.branchId || branchAudit.branchId;
    const targetAuditYear = payload.auditYear || branchAudit.auditYear;

    const existing = await prisma.branchAudit.findFirst({
      where: {
        branchId: targetBranchId,
        auditYear: targetAuditYear,
        NOT: { id },
      },
    });
    if (existing) {
      throw new customError(status.CONFLICT, `An audit log already exists for this branch in the year ${targetAuditYear}.`);
    }
  }

  const updated = await prisma.branchAudit.update({
    where: { id },
    data: {
      ...(payload.branchId && { branchId: payload.branchId }),
      ...(payload.auditYear && { auditYear: payload.auditYear }),
      ...(payload.auditor && { auditor: payload.auditor }),
      ...(payload.remarks !== undefined && { remarks: payload.remarks }),
      ...(payload.status && { status: payload.status }),
    },
  });

  return updated;
};

const deleteBranchAudit = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Audit ID is required.");
  }

  const branchAudit = await prisma.branchAudit.findUnique({ where: { id } });
  if (!branchAudit) {
    throw new customError(status.NOT_FOUND, "Branch Audit record not found.");
  }

  await prisma.branchAudit.delete({ where: { id } });

  return { message: "Branch Audit record deleted successfully." };
};

export const branchAuditService = {
  createBranchAudit,
  getAllBranchAudits,
  getBranchAuditById,
  updateBranchAudit,
  deleteBranchAudit,
};
