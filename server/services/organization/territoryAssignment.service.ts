import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateTerritoryAssignmentPayload {
  coordinatorId: string;
  branchId: string;
  status?: string;
}

export interface UpdateTerritoryAssignmentPayload {
  coordinatorId?: string;
  branchId?: string;
  status?: string;
}

const createTerritoryAssignment = async (payload: CreateTerritoryAssignmentPayload) => {
  if (!payload.coordinatorId || !payload.branchId) {
    throw new customError(status.BAD_REQUEST, "Coordinator ID and Branch ID are required.");
  }

  const [coordinator, branch] = await Promise.all([
    prisma.regionalCoordinator.findUnique({ where: { id: payload.coordinatorId } }),
    prisma.branch.findUnique({ where: { id: payload.branchId } }),
  ]);

  if (!coordinator) {
    throw new customError(status.NOT_FOUND, "Regional Coordinator not found.");
  }
  if (!branch) {
    throw new customError(status.NOT_FOUND, "Branch not found.");
  }

  const existing = await prisma.territoryAssignment.findFirst({
    where: { coordinatorId: payload.coordinatorId, branchId: payload.branchId, status: "ACTIVE" },
  });
  if (existing) {
    throw new customError(status.CONFLICT, "This branch is already assigned to the coordinator.");
  }

  const assignment = await prisma.territoryAssignment.create({
    data: {
      coordinatorId: payload.coordinatorId,
      branchId: payload.branchId,
      status: payload.status || "ACTIVE",
    },
    include: {
      coordinator: {
        include: {
          user: { select: { id: true, fullName: true, email: true } },
          region: { select: { id: true, name: true } },
        },
      },
      branch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return assignment;
};

const getAllTerritoryAssignments = async (query?: { coordinatorId?: string; branchId?: string; status?: string }) => {
  const where: any = {};

  if (query?.coordinatorId) {
    where.coordinatorId = query.coordinatorId;
  }
  if (query?.branchId) {
    where.branchId = query.branchId;
  }
  if (query?.status) {
    where.status = query.status;
  }

  const assignments = await prisma.territoryAssignment.findMany({
    where,
    orderBy: { assignedDate: "desc" },
    include: {
      coordinator: {
        include: {
          user: { select: { id: true, fullName: true, email: true } },
          region: { select: { id: true, name: true } },
        },
      },
      branch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return assignments;
};

const getTerritoryAssignmentById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Territory Assignment ID is required.");
  }

  const assignment = await prisma.territoryAssignment.findUnique({
    where: { id },
    include: {
      coordinator: {
        include: {
          user: { select: { id: true, fullName: true, email: true, phone: true } },
          region: true,
        },
      },
      branch: true,
    },
  });

  if (!assignment) {
    throw new customError(status.NOT_FOUND, "Territory Assignment not found.");
  }

  return assignment;
};

const updateTerritoryAssignment = async (id: string, payload: UpdateTerritoryAssignmentPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Territory Assignment ID is required.");
  }

  const assignment = await prisma.territoryAssignment.findUnique({ where: { id } });
  if (!assignment) {
    throw new customError(status.NOT_FOUND, "Territory Assignment not found.");
  }

  if (payload.coordinatorId) {
    const coordinator = await prisma.regionalCoordinator.findUnique({ where: { id: payload.coordinatorId } });
    if (!coordinator) {
      throw new customError(status.NOT_FOUND, "Regional Coordinator not found.");
    }
  }

  if (payload.branchId) {
    const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
    if (!branch) {
      throw new customError(status.NOT_FOUND, "Branch not found.");
    }
  }

  if (payload.coordinatorId || payload.branchId) {
    const targetCoordinatorId = payload.coordinatorId || assignment.coordinatorId;
    const targetBranchId = payload.branchId || assignment.branchId;

    const existing = await prisma.territoryAssignment.findFirst({
      where: {
        coordinatorId: targetCoordinatorId,
        branchId: targetBranchId,
        status: "ACTIVE",
        NOT: { id },
      },
    });
    if (existing) {
      throw new customError(status.CONFLICT, "This branch is already assigned to the coordinator.");
    }
  }

  const updated = await prisma.territoryAssignment.update({
    where: { id },
    data: {
      ...(payload.coordinatorId && { coordinatorId: payload.coordinatorId }),
      ...(payload.branchId && { branchId: payload.branchId }),
      ...(payload.status && { status: payload.status }),
    },
  });

  return updated;
};

const deleteTerritoryAssignment = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Territory Assignment ID is required.");
  }

  const assignment = await prisma.territoryAssignment.findUnique({ where: { id } });
  if (!assignment) {
    throw new customError(status.NOT_FOUND, "Territory Assignment not found.");
  }

  await prisma.territoryAssignment.delete({ where: { id } });

  return { message: "Territory Assignment deleted successfully." };
};

export const territoryAssignmentService = {
  createTerritoryAssignment,
  getAllTerritoryAssignments,
  getTerritoryAssignmentById,
  updateTerritoryAssignment,
  deleteTerritoryAssignment,
};
