import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateOperationalZonePayload {
  zoneName: string;
  description?: string;
}

export interface UpdateOperationalZonePayload {
  zoneName?: string;
  description?: string;
}

const createOperationalZone = async (payload: CreateOperationalZonePayload) => {
  if (!payload.zoneName) {
    throw new customError(status.BAD_REQUEST, "Zone name is required.");
  }

  const existing = await prisma.operationalZone.findUnique({ where: { zoneName: payload.zoneName } });
  if (existing) {
    throw new customError(status.CONFLICT, "An operational zone with this name already exists.");
  }

  const zone = await prisma.operationalZone.create({
    data: {
      zoneName: payload.zoneName,
      description: payload.description || null,
    },
  });

  return zone;
};

const getAllOperationalZones = async (query?: { search?: string }) => {
  const where: any = {};

  if (query?.search) {
    where.OR = [
      { zoneName: { contains: query.search, mode: "insensitive" } },
      { description: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const zones = await prisma.operationalZone.findMany({
    where,
    orderBy: { zoneName: "asc" },
    include: {
      _count: {
        select: { zoneAssignments: true },
      },
    },
  });

  return zones;
};

const getOperationalZoneById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Operational Zone ID is required.");
  }

  const zone = await prisma.operationalZone.findUnique({
    where: { id },
    include: {
      zoneAssignments: {
        include: {
          branch: { select: { id: true, branchName: true, branchCode: true } },
          manager: { select: { id: true, fullName: true, email: true } },
        },
      },
    },
  });

  if (!zone) {
    throw new customError(status.NOT_FOUND, "Operational Zone not found.");
  }

  return zone;
};

const updateOperationalZone = async (id: string, payload: UpdateOperationalZonePayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Operational Zone ID is required.");
  }

  const zone = await prisma.operationalZone.findUnique({ where: { id } });
  if (!zone) {
    throw new customError(status.NOT_FOUND, "Operational Zone not found.");
  }

  if (payload.zoneName && payload.zoneName !== zone.zoneName) {
    const existing = await prisma.operationalZone.findUnique({ where: { zoneName: payload.zoneName } });
    if (existing) {
      throw new customError(status.CONFLICT, "An operational zone with this name already exists.");
    }
  }

  const updated = await prisma.operationalZone.update({
    where: { id },
    data: {
      ...(payload.zoneName && { zoneName: payload.zoneName }),
      ...(payload.description !== undefined && { description: payload.description }),
    },
  });

  return updated;
};

const deleteOperationalZone = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Operational Zone ID is required.");
  }

  const zone = await prisma.operationalZone.findUnique({
    where: { id },
    include: {
      _count: {
        select: { zoneAssignments: true },
      },
    },
  });

  if (!zone) {
    throw new customError(status.NOT_FOUND, "Operational Zone not found.");
  }

  if (zone._count.zoneAssignments > 0) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot delete operational zone because zone assignments are linked to it. Remove all assignments first."
    );
  }

  await prisma.operationalZone.delete({ where: { id } });

  return { message: "Operational Zone deleted successfully." };
};

export const operationalZoneService = {
  createOperationalZone,
  getAllOperationalZones,
  getOperationalZoneById,
  updateOperationalZone,
  deleteOperationalZone,
};
