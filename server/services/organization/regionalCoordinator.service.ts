import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface AssignRegionalCoordinatorPayload {
  regionId: string;
  userId: string;
  designation?: string;
  status?: string;
}

export interface UpdateRegionalCoordinatorPayload {
  regionId?: string;
  userId?: string;
  designation?: string;
  status?: string;
}

const assignRegionalCoordinator = async (payload: AssignRegionalCoordinatorPayload) => {
  if (!payload.regionId || !payload.userId) {
    throw new customError(status.BAD_REQUEST, "Region ID and User ID are required.");
  }

  const [region, user, existing] = await Promise.all([
    prisma.region.findUnique({ where: { id: payload.regionId } }),
    prisma.user.findUnique({ where: { id: payload.userId } }),
    prisma.regionalCoordinator.findFirst({
      where: { regionId: payload.regionId, userId: payload.userId, status: "ACTIVE" },
    }),
  ]);

  if (!region) {
    throw new customError(status.NOT_FOUND, "Region not found.");
  }
  if (!user) {
    throw new customError(status.NOT_FOUND, "User not found.");
  }
  if (existing) {
    throw new customError(status.CONFLICT, "User is already an active regional coordinator for this region.");
  }

  const coordinator = await prisma.regionalCoordinator.create({
    data: {
      regionId: payload.regionId,
      userId: payload.userId,
      designation: payload.designation || null,
      status: payload.status || "ACTIVE",
    },
    include: {
      region: { select: { id: true, name: true } },
      user: { select: { id: true, fullName: true, email: true } },
    },
  });

  return coordinator;
};

const getAllRegionalCoordinators = async (query?: { regionId?: string; status?: string }) => {
  const where: any = {};

  if (query?.regionId) {
    where.regionId = query.regionId;
  }
  if (query?.status) {
    where.status = query.status;
  }

  const coordinators = await prisma.regionalCoordinator.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      region: { select: { id: true, name: true } },
      user: { select: { id: true, fullName: true, email: true, phone: true } },
      _count: {
        select: { territoryAssignments: true },
      },
    },
  });

  return coordinators;
};

const getRegionalCoordinatorById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Regional Coordinator ID is required.");
  }

  const coordinator = await prisma.regionalCoordinator.findUnique({
    where: { id },
    include: {
      region: true,
      user: { select: { id: true, fullName: true, email: true, phone: true } },
      territoryAssignments: {
        include: {
          branch: { select: { id: true, branchName: true, branchCode: true } },
        },
      },
    },
  });

  if (!coordinator) {
    throw new customError(status.NOT_FOUND, "Regional Coordinator not found.");
  }

  return coordinator;
};

const updateRegionalCoordinator = async (id: string, payload: UpdateRegionalCoordinatorPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Regional Coordinator ID is required.");
  }

  const coordinator = await prisma.regionalCoordinator.findUnique({ where: { id } });
  if (!coordinator) {
    throw new customError(status.NOT_FOUND, "Regional Coordinator not found.");
  }

  if (payload.regionId) {
    const region = await prisma.region.findUnique({ where: { id: payload.regionId } });
    if (!region) {
      throw new customError(status.NOT_FOUND, "Region not found.");
    }
  }

  if (payload.userId) {
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) {
      throw new customError(status.NOT_FOUND, "User not found.");
    }
  }

  if (payload.regionId || payload.userId) {
    const targetRegionId = payload.regionId || coordinator.regionId;
    const targetUserId = payload.userId || coordinator.userId;

    const existing = await prisma.regionalCoordinator.findFirst({
      where: {
        regionId: targetRegionId,
        userId: targetUserId,
        status: "ACTIVE",
        NOT: { id },
      },
    });
    if (existing) {
      throw new customError(status.CONFLICT, "User is already an active regional coordinator for this region.");
    }
  }

  const updated = await prisma.regionalCoordinator.update({
    where: { id },
    data: {
      ...(payload.regionId && { regionId: payload.regionId }),
      ...(payload.userId && { userId: payload.userId }),
      ...(payload.designation !== undefined && { designation: payload.designation }),
      ...(payload.status && { status: payload.status }),
    },
  });

  return updated;
};

const deleteRegionalCoordinator = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Regional Coordinator ID is required.");
  }

  const coordinator = await prisma.regionalCoordinator.findUnique({
    where: { id },
    include: {
      _count: {
        select: { territoryAssignments: true },
      },
    },
  });

  if (!coordinator) {
    throw new customError(status.NOT_FOUND, "Regional Coordinator not found.");
  }

  if (coordinator._count.territoryAssignments > 0) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot delete regional coordinator because active territory assignments are linked to it. Remove assignments first."
    );
  }

  await prisma.regionalCoordinator.delete({ where: { id } });

  return { message: "Regional Coordinator deleted successfully." };
};

export const regionalCoordinatorService = {
  assignRegionalCoordinator,
  getAllRegionalCoordinators,
  getRegionalCoordinatorById,
  updateRegionalCoordinator,
  deleteRegionalCoordinator,
};
