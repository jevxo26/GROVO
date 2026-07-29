import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateBranchTransferPayload {
  fromBranchId: string;
  toBranchId: string;
  resourceType: string;
  referenceId?: string;
  approvedBy?: string;
  transferDate?: string | Date;
  status?: string;
}

export interface UpdateBranchTransferPayload {
  fromBranchId?: string;
  toBranchId?: string;
  resourceType?: string;
  referenceId?: string;
  approvedBy?: string;
  transferDate?: string | Date;
  status?: string;
}

const createBranchTransfer = async (payload: CreateBranchTransferPayload) => {
  if (!payload.fromBranchId || !payload.toBranchId || !payload.resourceType) {
    throw new customError(status.BAD_REQUEST, "From Branch ID, To Branch ID, and Resource Type are required.");
  }

  if (payload.fromBranchId === payload.toBranchId) {
    throw new customError(status.BAD_REQUEST, "Source branch and target branch cannot be the same.");
  }

  const [fromBranch, toBranch] = await Promise.all([
    prisma.branch.findUnique({ where: { id: payload.fromBranchId } }),
    prisma.branch.findUnique({ where: { id: payload.toBranchId } }),
  ]);

  if (!fromBranch) {
    throw new customError(status.NOT_FOUND, "Source branch not found.");
  }
  if (!toBranch) {
    throw new customError(status.NOT_FOUND, "Target branch not found.");
  }

  if (payload.approvedBy) {
    const user = await prisma.user.findUnique({ where: { id: payload.approvedBy } });
    if (!user) {
      throw new customError(status.NOT_FOUND, "Approver user not found.");
    }
  }

  const branchTransfer = await prisma.branchTransfer.create({
    data: {
      fromBranchId: payload.fromBranchId,
      toBranchId: payload.toBranchId,
      resourceType: payload.resourceType,
      referenceId: payload.referenceId || null,
      approvedBy: payload.approvedBy || null,
      transferDate: payload.transferDate ? new Date(payload.transferDate) : new Date(),
      status: payload.status || "PENDING",
    },
    include: {
      fromBranch: { select: { id: true, branchName: true, branchCode: true } },
      toBranch: { select: { id: true, branchName: true, branchCode: true } },
      approver: { select: { id: true, fullName: true, email: true } },
    },
  });

  return branchTransfer;
};

const getAllBranchTransfers = async (query?: {
  fromBranchId?: string;
  toBranchId?: string;
  status?: string;
  resourceType?: string;
}) => {
  const where: any = {};

  if (query?.fromBranchId) {
    where.fromBranchId = query.fromBranchId;
  }
  if (query?.toBranchId) {
    where.toBranchId = query.toBranchId;
  }
  if (query?.status) {
    where.status = query.status;
  }
  if (query?.resourceType) {
    where.resourceType = query.resourceType;
  }

  const branchTransfers = await prisma.branchTransfer.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      fromBranch: { select: { id: true, branchName: true, branchCode: true } },
      toBranch: { select: { id: true, branchName: true, branchCode: true } },
      approver: { select: { id: true, fullName: true, email: true } },
    },
  });

  return branchTransfers;
};

const getBranchTransferById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Transfer ID is required.");
  }

  const branchTransfer = await prisma.branchTransfer.findUnique({
    where: { id },
    include: {
      fromBranch: true,
      toBranch: true,
      approver: { select: { id: true, fullName: true, email: true, phone: true } },
    },
  });

  if (!branchTransfer) {
    throw new customError(status.NOT_FOUND, "Branch Transfer record not found.");
  }

  return branchTransfer;
};

const updateBranchTransfer = async (id: string, payload: UpdateBranchTransferPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Transfer ID is required.");
  }

  const branchTransfer = await prisma.branchTransfer.findUnique({ where: { id } });
  if (!branchTransfer) {
    throw new customError(status.NOT_FOUND, "Branch Transfer record not found.");
  }

  if (payload.fromBranchId) {
    const branch = await prisma.branch.findUnique({ where: { id: payload.fromBranchId } });
    if (!branch) {
      throw new customError(status.NOT_FOUND, "Source branch not found.");
    }
  }

  if (payload.toBranchId) {
    const branch = await prisma.branch.findUnique({ where: { id: payload.toBranchId } });
    if (!branch) {
      throw new customError(status.NOT_FOUND, "Target branch not found.");
    }
  }

  const finalFromId = payload.fromBranchId || branchTransfer.fromBranchId;
  const finalToId = payload.toBranchId || branchTransfer.toBranchId;

  if (finalFromId === finalToId) {
    throw new customError(status.BAD_REQUEST, "Source branch and target branch cannot be the same.");
  }

  if (payload.approvedBy) {
    const user = await prisma.user.findUnique({ where: { id: payload.approvedBy } });
    if (!user) {
      throw new customError(status.NOT_FOUND, "Approver user not found.");
    }
  }

  const updated = await prisma.branchTransfer.update({
    where: { id },
    data: {
      ...(payload.fromBranchId && { fromBranchId: payload.fromBranchId }),
      ...(payload.toBranchId && { toBranchId: payload.toBranchId }),
      ...(payload.resourceType && { resourceType: payload.resourceType }),
      ...(payload.referenceId !== undefined && { referenceId: payload.referenceId }),
      ...(payload.approvedBy !== undefined && { approvedBy: payload.approvedBy }),
      ...(payload.transferDate && { transferDate: new Date(payload.transferDate) }),
      ...(payload.status && { status: payload.status }),
    },
  });

  return updated;
};

const deleteBranchTransfer = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Transfer ID is required.");
  }

  const branchTransfer = await prisma.branchTransfer.findUnique({ where: { id } });
  if (!branchTransfer) {
    throw new customError(status.NOT_FOUND, "Branch Transfer record not found.");
  }

  await prisma.branchTransfer.delete({ where: { id } });

  return { message: "Branch Transfer record deleted successfully." };
};

export const branchTransferService = {
  createBranchTransfer,
  getAllBranchTransfers,
  getBranchTransferById,
  updateBranchTransfer,
  deleteBranchTransfer,
};
