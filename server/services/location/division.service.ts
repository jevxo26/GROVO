import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateDivisionPayload {
  regionId: string;
  name: string;
  code?: string;
}

export interface UpdateDivisionPayload {
  regionId?: string;
  name?: string;
  code?: string;
}

const createDivision = async (payload: CreateDivisionPayload) => {
  if (!payload.regionId || !payload.name) {
    throw new customError(status.BAD_REQUEST, "Region ID and Division name are required.");
  }

  const region = await prisma.region.findUnique({ where: { id: payload.regionId } });
  if (!region) {
    throw new customError(status.NOT_FOUND, "Region not found.");
  }

  const existing = await prisma.division.findUnique({ where: { name: payload.name } });
  if (existing) {
    throw new customError(status.CONFLICT, "Division with this name already exists.");
  }

  if (payload.code) {
    const codeExists = await prisma.division.findUnique({ where: { code: payload.code } });
    if (codeExists) {
      throw new customError(status.CONFLICT, "Division with this code already exists.");
    }
  }

  const division = await prisma.division.create({
    data: {
      regionId: payload.regionId,
      name: payload.name,
      code: payload.code || null,
    },
    include: {
      region: { select: { id: true, name: true } },
    },
  });

  return division;
};

const getAllDivisions = async (query?: { regionId?: string; search?: string }) => {
  const where: any = {};

  if (query?.regionId) {
    where.regionId = query.regionId;
  }

  if (query?.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { code: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const divisions = await prisma.division.findMany({
    where,
    orderBy: { name: "asc" },
    include: {
      region: { select: { id: true, name: true } },
      _count: {
        select: {
          districts: true,
          branches: true,
        },
      },
    },
  });

  return divisions;
};

const getDivisionById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Division ID is required.");
  }

  const division = await prisma.division.findUnique({
    where: { id },
    include: {
      region: { select: { id: true, name: true } },
      districts: {
        select: { id: true, name: true, code: true },
        orderBy: { name: "asc" },
      },
      _count: {
        select: { branches: true },
      },
    },
  });

  if (!division) {
    throw new customError(status.NOT_FOUND, "Division not found.");
  }

  return division;
};

const updateDivision = async (id: string, payload: UpdateDivisionPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Division ID is required.");
  }

  const division = await prisma.division.findUnique({ where: { id } });
  if (!division) {
    throw new customError(status.NOT_FOUND, "Division not found.");
  }

  if (payload.regionId) {
    const region = await prisma.region.findUnique({ where: { id: payload.regionId } });
    if (!region) {
      throw new customError(status.NOT_FOUND, "Region not found.");
    }
  }

  if (payload.name && payload.name !== division.name) {
    const existing = await prisma.division.findUnique({ where: { name: payload.name } });
    if (existing) {
      throw new customError(status.CONFLICT, "Division with this name already exists.");
    }
  }

  if (payload.code && payload.code !== division.code) {
    const codeExists = await prisma.division.findUnique({ where: { code: payload.code } });
    if (codeExists) {
      throw new customError(status.CONFLICT, "Division with this code already exists.");
    }
  }

  const updated = await prisma.division.update({
    where: { id },
    data: {
      ...(payload.regionId && { regionId: payload.regionId }),
      ...(payload.name && { name: payload.name }),
      ...(payload.code !== undefined && { code: payload.code || null }),
    },
  });

  return updated;
};

const deleteDivision = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Division ID is required.");
  }

  const division = await prisma.division.findUnique({
    where: { id },
    include: {
      _count: {
        select: { districts: true },
      },
    },
  });

  if (!division) {
    throw new customError(status.NOT_FOUND, "Division not found.");
  }

  if (division._count.districts > 0) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot delete division because districts are linked to it. Remove all districts first."
    );
  }

  await prisma.division.delete({ where: { id } });

  return { message: "Division deleted successfully." };
};

export const divisionService = {
  createDivision,
  getAllDivisions,
  getDivisionById,
  updateDivision,
  deleteDivision,
};
