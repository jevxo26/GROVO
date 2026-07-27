import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateRegionPayload {
  name: string;
  description?: string;
}

export interface UpdateRegionPayload {
  name?: string;
  description?: string;
}

const createRegion = async (payload: CreateRegionPayload) => {
  if (!payload.name) {
    throw new customError(status.BAD_REQUEST, "Region name is required.");
  }

  const existing = await prisma.region.findUnique({
    where: { name: payload.name },
  });

  if (existing) {
    throw new customError(status.CONFLICT, "Region with this name already exists.");
  }

  const region = await prisma.region.create({
    data: {
      name: payload.name,
      description: payload.description || null,
    },
  });

  return region;
};

const getAllRegions = async (query?: { search?: string }) => {
  const where: any = {};

  if (query?.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { description: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const regions = await prisma.region.findMany({
    where,
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: {
          divisions: true,
          regionalCoordinators: true,
        },
      },
    },
  });

  return regions;
};

const getRegionById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Region ID is required.");
  }

  const region = await prisma.region.findUnique({
    where: { id },
    include: {
      divisions: {
        select: { id: true, name: true, code: true },
        orderBy: { name: "asc" },
      },
      regionalCoordinators: {
        include: {
          user: { select: { id: true, fullName: true, email: true } },
        },
      },
    },
  });

  if (!region) {
    throw new customError(status.NOT_FOUND, "Region not found.");
  }

  return region;
};

const updateRegion = async (id: string, payload: UpdateRegionPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Region ID is required.");
  }

  const region = await prisma.region.findUnique({ where: { id } });

  if (!region) {
    throw new customError(status.NOT_FOUND, "Region not found.");
  }

  if (payload.name && payload.name !== region.name) {
    const existing = await prisma.region.findUnique({
      where: { name: payload.name },
    });
    if (existing) {
      throw new customError(status.CONFLICT, "Region with this name already exists.");
    }
  }

  const updated = await prisma.region.update({
    where: { id },
    data: {
      ...(payload.name && { name: payload.name }),
      ...(payload.description !== undefined && { description: payload.description }),
    },
  });

  return updated;
};

const deleteRegion = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Region ID is required.");
  }

  const region = await prisma.region.findUnique({
    where: { id },
    include: {
      _count: {
        select: { divisions: true },
      },
    },
  });

  if (!region) {
    throw new customError(status.NOT_FOUND, "Region not found.");
  }

  if (region._count.divisions > 0) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot delete region because divisions are linked to it. Remove all divisions first."
    );
  }

  await prisma.region.delete({ where: { id } });

  return { message: "Region deleted successfully." };
};

export const regionService = {
  createRegion,
  getAllRegions,
  getRegionById,
  updateRegion,
  deleteRegion,
};
