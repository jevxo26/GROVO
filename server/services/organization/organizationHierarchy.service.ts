import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateHierarchyNodePayload {
  parentBranchId: string;
  childBranchId: string;
  hierarchyLevel: number;
}

export interface UpdateHierarchyNodePayload {
  parentBranchId?: string;
  childBranchId?: string;
  hierarchyLevel?: number;
}

const createHierarchyNode = async (payload: CreateHierarchyNodePayload) => {
  if (!payload.parentBranchId || !payload.childBranchId || payload.hierarchyLevel === undefined) {
    throw new customError(status.BAD_REQUEST, "Parent Branch ID, Child Branch ID, and Hierarchy level are required.");
  }

  if (payload.parentBranchId === payload.childBranchId) {
    throw new customError(status.BAD_REQUEST, "A branch cannot be its own parent in the hierarchy.");
  }

  const [parent, child] = await Promise.all([
    prisma.branch.findUnique({ where: { id: payload.parentBranchId } }),
    prisma.branch.findUnique({ where: { id: payload.childBranchId } }),
  ]);

  if (!parent) {
    throw new customError(status.NOT_FOUND, "Parent branch not found.");
  }
  if (!child) {
    throw new customError(status.NOT_FOUND, "Child branch not found.");
  }

  const existing = await prisma.organizationHierarchy.findFirst({
    where: { parentBranchId: payload.parentBranchId, childBranchId: payload.childBranchId },
  });
  if (existing) {
    throw new customError(status.CONFLICT, "This hierarchy node relation already exists.");
  }

  const hierarchyNode = await prisma.organizationHierarchy.create({
    data: {
      parentBranchId: payload.parentBranchId,
      childBranchId: payload.childBranchId,
      hierarchyLevel: payload.hierarchyLevel,
    },
    include: {
      parentBranch: { select: { id: true, branchName: true, branchCode: true } },
      childBranch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return hierarchyNode;
};

const getAllHierarchyNodes = async (query?: { parentBranchId?: string; childBranchId?: string }) => {
  const where: any = {};

  if (query?.parentBranchId) {
    where.parentBranchId = query.parentBranchId;
  }
  if (query?.childBranchId) {
    where.childBranchId = query.childBranchId;
  }

  const hierarchyNodes = await prisma.organizationHierarchy.findMany({
    where,
    orderBy: { hierarchyLevel: "asc" },
    include: {
      parentBranch: { select: { id: true, branchName: true, branchCode: true } },
      childBranch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return hierarchyNodes;
};

const getHierarchyNodeById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Hierarchy node ID is required.");
  }

  const hierarchyNode = await prisma.organizationHierarchy.findUnique({
    where: { id },
    include: {
      parentBranch: true,
      childBranch: true,
    },
  });

  if (!hierarchyNode) {
    throw new customError(status.NOT_FOUND, "Hierarchy node record not found.");
  }

  return hierarchyNode;
};

const updateHierarchyNode = async (id: string, payload: UpdateHierarchyNodePayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Hierarchy node ID is required.");
  }

  const hierarchyNode = await prisma.organizationHierarchy.findUnique({ where: { id } });
  if (!hierarchyNode) {
    throw new customError(status.NOT_FOUND, "Hierarchy node record not found.");
  }

  if (payload.parentBranchId) {
    const parent = await prisma.branch.findUnique({ where: { id: payload.parentBranchId } });
    if (!parent) {
      throw new customError(status.NOT_FOUND, "Parent branch not found.");
    }
  }

  if (payload.childBranchId) {
    const child = await prisma.branch.findUnique({ where: { id: payload.childBranchId } });
    if (!child) {
      throw new customError(status.NOT_FOUND, "Child branch not found.");
    }
  }

  const finalParentId = payload.parentBranchId || hierarchyNode.parentBranchId;
  const finalChildId = payload.childBranchId || hierarchyNode.childBranchId;

  if (finalParentId === finalChildId) {
    throw new customError(status.BAD_REQUEST, "A branch cannot be its own parent in the hierarchy.");
  }

  if (payload.parentBranchId || payload.childBranchId) {
    const existing = await prisma.organizationHierarchy.findFirst({
      where: {
        parentBranchId: finalParentId,
        childBranchId: finalChildId,
        NOT: { id },
      },
    });
    if (existing) {
      throw new customError(status.CONFLICT, "This hierarchy node relation already exists.");
    }
  }

  const updated = await prisma.organizationHierarchy.update({
    where: { id },
    data: {
      ...(payload.parentBranchId && { parentBranchId: payload.parentBranchId }),
      ...(payload.childBranchId && { childBranchId: payload.childBranchId }),
      ...(payload.hierarchyLevel !== undefined && { hierarchyLevel: payload.hierarchyLevel }),
    },
  });

  return updated;
};

const deleteHierarchyNode = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Hierarchy node ID is required.");
  }

  const hierarchyNode = await prisma.organizationHierarchy.findUnique({ where: { id } });
  if (!hierarchyNode) {
    throw new customError(status.NOT_FOUND, "Hierarchy node record not found.");
  }

  await prisma.organizationHierarchy.delete({ where: { id } });

  return { message: "Hierarchy node record deleted successfully." };
};

export const organizationHierarchyService = {
  createHierarchyNode,
  getAllHierarchyNodes,
  getHierarchyNodeById,
  updateHierarchyNode,
  deleteHierarchyNode,
};
