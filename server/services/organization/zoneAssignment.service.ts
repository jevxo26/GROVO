import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateZoneAssignmentPayload {
  zoneId: string;
  branchId: string;
  managerId: string;
}

export interface UpdateZoneAssignmentPayload {
  zoneId?: string;
  branchId?: string;
  managerId?: string;
}

const createZoneAssignment = async (payload: CreateZoneAssignmentPayload) => {
  if (!payload.zoneId || !payload.branchId || !payload.managerId) {
    throw new customError(status.BAD_REQUEST, "Zone ID, Branch ID, and Manager ID are required.");
  }

  const [zone, branch, manager] = await Promise.all([
    prisma.operationalZone.findUnique({ where: { id: payload.zoneId } }),
    prisma.branch.findUnique({ where: { id: payload.branchId } }),
    prisma.user.findUnique({ where: { id: payload.managerId } }),
  ]);

  if (!zone) {
    throw new customError(status.NOT_FOUND, "Operational Zone not found.");
  }
  if (!branch) {
    throw new customError(status.NOT_FOUND, "Branch not found.");
  }
  if (!manager) {
    throw new customError(status.NOT_FOUND, "Manager user not found.");
  }

  const existing = await prisma.zoneAssignment.findFirst({
    where: { zoneId: payload.zoneId, branchId: payload.branchId },
  });
  if (existing) {
    throw new customError(status.CONFLICT, "This branch is already assigned to this zone.");
  }

  const assignment = await prisma.zoneAssignment.create({
    data: {
      zoneId: payload.zoneId,
      branchId: payload.branchId,
      managerId: payload.managerId,
    },
    include: {
      zone: { select: { id: true, zoneName: true } },
      branch: { select: { id: true, branchName: true, branchCode: true } },
      manager: { select: { id: true, fullName: true, email: true } },
    },
  });

  return assignment;
};

const getAllZoneAssignments = async (query?: { zoneId?: string; branchId?: string; managerId?: string }) => {
  const where: any = {};

  if (query?.zoneId) {
    where.zoneId = query.zoneId;
  }
  if (query?.branchId) {
    where.branchId = query.branchId;
  }
  if (query?.managerId) {
    where.managerId = query.managerId;
  }

  const assignments = await prisma.zoneAssignment.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      zone: { select: { id: true, zoneName: true } },
      branch: { select: { id: true, branchName: true, branchCode: true } },
      manager: { select: { id: true, fullName: true, email: true } },
    },
  });

  return assignments;
};

const getZoneAssignmentById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Zone Assignment ID is required.");
  }

  const assignment = await prisma.zoneAssignment.findUnique({
    where: { id },
    include: {
      zone: true,
      branch: true,
      manager: { select: { id: true, fullName: true, email: true, phone: true } },
    },
  });

  if (!assignment) {
    throw new customError(status.NOT_FOUND, "Zone Assignment not found.");
  }

  return assignment;
};

const updateZoneAssignment = async (id: string, payload: UpdateZoneAssignmentPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Zone Assignment ID is required.");
  }

  const assignment = await prisma.zoneAssignment.findUnique({ where: { id } });
  if (!assignment) {
    throw new customError(status.NOT_FOUND, "Zone Assignment not found.");
  }

  if (payload.zoneId) {
    const zone = await prisma.operationalZone.findUnique({ where: { id: payload.zoneId } });
    if (!zone) {
      throw new customError(status.NOT_FOUND, "Operational Zone not found.");
    }
  }

  if (payload.branchId) {
    const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
    if (!branch) {
      throw new customError(status.NOT_FOUND, "Branch not found.");
    }
  }

  if (payload.managerId) {
    const manager = await prisma.user.findUnique({ where: { id: payload.managerId } });
    if (!manager) {
      throw new customError(status.NOT_FOUND, "Manager user not found.");
    }
  }

  if (payload.zoneId || payload.branchId) {
    const targetZoneId = payload.zoneId || assignment.zoneId;
    const targetBranchId = payload.branchId || assignment.branchId;

    const existing = await prisma.zoneAssignment.findFirst({
      where: {
        zoneId: targetZoneId,
        branchId: targetBranchId,
        NOT: { id },
      },
    });
    if (existing) {
      throw new customError(status.CONFLICT, "This branch is already assigned to this zone.");
    }
  }

  const updated = await prisma.zoneAssignment.update({
    where: { id },
    data: {
      ...(payload.zoneId && { zoneId: payload.zoneId }),
      ...(payload.branchId && { branchId: payload.branchId }),
      ...(payload.managerId && { managerId: payload.managerId }),
    },
  });

  return updated;
};

const deleteZoneAssignment = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Zone Assignment ID is required.");
  }

  const assignment = await prisma.zoneAssignment.findUnique({ where: { id } });
  if (!assignment) {
    throw new customError(status.NOT_FOUND, "Zone Assignment not found.");
  }

  await prisma.zoneAssignment.delete({ where: { id } });

  return { message: "Zone Assignment deleted successfully." };
};

export const zoneAssignmentService = {
  createZoneAssignment,
  getAllZoneAssignments,
  getZoneAssignmentById,
  updateZoneAssignment,
  deleteZoneAssignment,
};
