import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateBranchPayload {
  organizationId: string;
  branchCode: string;
  branchName: string;
  branchTypeId: string;
  managerId?: string;
  divisionId?: string;
  districtId?: string;
  upazilaId?: string;
  unionId?: string;
  address?: string;
  phone?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
  status?: string;
}

export interface UpdateBranchPayload {
  organizationId?: string;
  branchCode?: string;
  branchName?: string;
  branchTypeId?: string;
  managerId?: string;
  divisionId?: string;
  districtId?: string;
  upazilaId?: string;
  unionId?: string;
  address?: string;
  phone?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
  status?: string;
}

const createBranch = async (payload: CreateBranchPayload) => {
  if (!payload.organizationId || !payload.branchCode || !payload.branchName || !payload.branchTypeId) {
    throw new customError(status.BAD_REQUEST, "Required fields: organizationId, branchCode, branchName, and branchTypeId.");
  }

  const [org, branchType, existingCode] = await Promise.all([
    prisma.organization.findUnique({ where: { id: payload.organizationId } }),
    prisma.branchType.findUnique({ where: { id: payload.branchTypeId } }),
    prisma.branch.findUnique({ where: { branchCode: payload.branchCode } }),
  ]);

  if (!org) {
    throw new customError(status.NOT_FOUND, "Organization record not found.");
  }

  if (!branchType) {
    throw new customError(status.NOT_FOUND, "Branch type not found.");
  }

  if (existingCode) {
    throw new customError(status.CONFLICT, "A branch with this code already exists.");
  }

  const branch = await prisma.branch.create({
    data: {
      organizationId: payload.organizationId,
      branchCode: payload.branchCode.toUpperCase(),
      branchName: payload.branchName,
      branchTypeId: payload.branchTypeId,
      managerId: payload.managerId || null,
      divisionId: payload.divisionId || null,
      districtId: payload.districtId || null,
      upazilaId: payload.upazilaId || null,
      unionId: payload.unionId || null,
      address: payload.address || null,
      phone: payload.phone || null,
      email: payload.email || null,
      latitude: payload.latitude !== undefined ? payload.latitude : null,
      longitude: payload.longitude !== undefined ? payload.longitude : null,
      status: payload.status || "ACTIVE",
    },
    include: {
      organization: { select: { id: true, organizationName: true } },
      branchType: { select: { id: true, name: true } },
    },
  });

  return branch;
};

const getBranchById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch ID is required.");
  }

  const branch = await prisma.branch.findUnique({
    where: { id },
    include: {
      organization: true,
      branchType: true,
      branchSetting: true,
      statistics: true,
      _count: {
        select: {
          branchManagers: true,
          branchStaffs: true,
          budgets: true,
          funds: true,
          inventories: true,
        },
      },
    },
  });

  if (!branch) {
    throw new customError(status.NOT_FOUND, "Branch record not found.");
  }

  return branch;
};

const getBranchesByOrgId = async (organizationId: string) => {
  if (!organizationId) {
    throw new customError(status.BAD_REQUEST, "Organization ID is required.");
  }

  const branches = await prisma.branch.findMany({
    where: { organizationId },
    include: {
      branchType: { select: { id: true, name: true } },
      statistics: true,
    },
    orderBy: { branchName: "asc" },
  });

  return branches;
};

const getAllBranches = async (query?: {
  branchTypeId?: string;
  divisionId?: string;
  districtId?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (query?.branchTypeId) {
    where.branchTypeId = query.branchTypeId;
  }

  if (query?.divisionId) {
    where.divisionId = query.divisionId;
  }

  if (query?.districtId) {
    where.districtId = query.districtId;
  }

  if (query?.status) {
    where.status = query.status;
  }

  if (query?.search) {
    where.OR = [
      { branchName: { contains: query.search, mode: "insensitive" } },
      { branchCode: { contains: query.search, mode: "insensitive" } },
      { email: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const [branches, total] = await Promise.all([
    prisma.branch.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        branchType: { select: { id: true, name: true } },
        organization: { select: { id: true, organizationName: true } },
        statistics: true,
      },
    }),
    prisma.branch.count({ where }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: branches,
  };
};

const updateBranch = async (id: string, payload: UpdateBranchPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch ID is required.");
  }

  const branch = await prisma.branch.findUnique({
    where: { id },
  });

  if (!branch) {
    throw new customError(status.NOT_FOUND, "Branch record not found.");
  }

  if (payload.branchCode && payload.branchCode.toUpperCase() !== branch.branchCode) {
    const existingCode = await prisma.branch.findUnique({
      where: { branchCode: payload.branchCode.toUpperCase() },
    });
    if (existingCode) {
      throw new customError(status.CONFLICT, "A branch with this code already exists.");
    }
  }

  if (payload.organizationId && payload.organizationId !== branch.organizationId) {
    const org = await prisma.organization.findUnique({ where: { id: payload.organizationId } });
    if (!org) {
      throw new customError(status.NOT_FOUND, "Organization record not found.");
    }
  }

  if (payload.branchTypeId && payload.branchTypeId !== branch.branchTypeId) {
    const bt = await prisma.branchType.findUnique({ where: { id: payload.branchTypeId } });
    if (!bt) {
      throw new customError(status.NOT_FOUND, "Branch type record not found.");
    }
  }

  const updatedBranch = await prisma.branch.update({
    where: { id },
    data: {
      ...(payload.organizationId && { organizationId: payload.organizationId }),
      ...(payload.branchCode && { branchCode: payload.branchCode.toUpperCase() }),
      ...(payload.branchName && { branchName: payload.branchName }),
      ...(payload.branchTypeId && { branchTypeId: payload.branchTypeId }),
      ...(payload.managerId !== undefined && { managerId: payload.managerId }),
      ...(payload.divisionId !== undefined && { divisionId: payload.divisionId }),
      ...(payload.districtId !== undefined && { districtId: payload.districtId }),
      ...(payload.upazilaId !== undefined && { upazilaId: payload.upazilaId }),
      ...(payload.unionId !== undefined && { unionId: payload.unionId }),
      ...(payload.address !== undefined && { address: payload.address }),
      ...(payload.phone !== undefined && { phone: payload.phone }),
      ...(payload.email !== undefined && { email: payload.email }),
      ...(payload.latitude !== undefined && { latitude: payload.latitude }),
      ...(payload.longitude !== undefined && { longitude: payload.longitude }),
      ...(payload.status && { status: payload.status }),
    },
  });

  return updatedBranch;
};

const deleteBranch = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch ID is required.");
  }

  const branch = await prisma.branch.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          branchStaffs: true,
          inventories: true,
          funds: true,
        },
      },
    },
  });

  if (!branch) {
    throw new customError(status.NOT_FOUND, "Branch record not found.");
  }

  if (branch._count.branchStaffs > 0 || branch._count.inventories > 0 || branch._count.funds > 0) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot delete branch with active staff, inventories, or funds. Set status to INACTIVE instead."
    );
  }

  await prisma.branch.delete({
    where: { id },
  });

  return { message: "Branch deleted successfully." };
};

export const branchService = {
  createBranch,
  getBranchById,
  getBranchesByOrgId,
  getAllBranches,
  updateBranch,
  deleteBranch,
};
