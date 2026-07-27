import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateDistrictPayload {
  divisionId: string;
  name: string;
  code?: string;
}

export interface UpdateDistrictPayload {
  divisionId?: string;
  name?: string;
  code?: string;
}

const createDistrict = async (payload: CreateDistrictPayload) => {
  if (!payload.divisionId || !payload.name) {
    throw new customError(status.BAD_REQUEST, "Division ID and District name are required.");
  }

  const division = await prisma.division.findUnique({ where: { id: payload.divisionId } });
  if (!division) {
    throw new customError(status.NOT_FOUND, "Division not found.");
  }

  // Check for duplicate name within the same division
  const existing = await prisma.district.findFirst({
    where: { divisionId: payload.divisionId, name: payload.name },
  });
  if (existing) {
    throw new customError(status.CONFLICT, "District with this name already exists in this division.");
  }

  const district = await prisma.district.create({
    data: {
      divisionId: payload.divisionId,
      name: payload.name,
      code: payload.code || null,
    },
    include: {
      division: { select: { id: true, name: true, region: { select: { id: true, name: true } } } },
    },
  });

  return district;
};

const getAllDistricts = async (query?: { divisionId?: string; search?: string }) => {
  const where: any = {};

  if (query?.divisionId) {
    where.divisionId = query.divisionId;
  }

  if (query?.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { code: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const districts = await prisma.district.findMany({
    where,
    orderBy: { name: "asc" },
    include: {
      division: { select: { id: true, name: true } },
      _count: {
        select: {
          upazilas: true,
          branches: true,
        },
      },
    },
  });

  return districts;
};

const getDistrictById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "District ID is required.");
  }

  const district = await prisma.district.findUnique({
    where: { id },
    include: {
      division: { select: { id: true, name: true, region: { select: { id: true, name: true } } } },
      upazilas: {
        select: { id: true, name: true, code: true },
        orderBy: { name: "asc" },
      },
      _count: {
        select: { branches: true },
      },
    },
  });

  if (!district) {
    throw new customError(status.NOT_FOUND, "District not found.");
  }

  return district;
};

const updateDistrict = async (id: string, payload: UpdateDistrictPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "District ID is required.");
  }

  const district = await prisma.district.findUnique({ where: { id } });
  if (!district) {
    throw new customError(status.NOT_FOUND, "District not found.");
  }

  if (payload.divisionId) {
    const division = await prisma.division.findUnique({ where: { id: payload.divisionId } });
    if (!division) {
      throw new customError(status.NOT_FOUND, "Division not found.");
    }
  }

  if (payload.name) {
    const targetDivisionId = payload.divisionId || district.divisionId;
    const existing = await prisma.district.findFirst({
      where: {
        divisionId: targetDivisionId,
        name: payload.name,
        NOT: { id },
      },
    });
    if (existing) {
      throw new customError(status.CONFLICT, "District with this name already exists in this division.");
    }
  }

  const updated = await prisma.district.update({
    where: { id },
    data: {
      ...(payload.divisionId && { divisionId: payload.divisionId }),
      ...(payload.name && { name: payload.name }),
      ...(payload.code !== undefined && { code: payload.code || null }),
    },
  });

  return updated;
};

const deleteDistrict = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "District ID is required.");
  }

  const district = await prisma.district.findUnique({
    where: { id },
    include: {
      _count: {
        select: { upazilas: true },
      },
    },
  });

  if (!district) {
    throw new customError(status.NOT_FOUND, "District not found.");
  }

  if (district._count.upazilas > 0) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot delete district because upazilas are linked to it. Remove all upazilas first."
    );
  }

  await prisma.district.delete({ where: { id } });

  return { message: "District deleted successfully." };
};

export const districtService = {
  createDistrict,
  getAllDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict,
};
