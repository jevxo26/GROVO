import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateUpazilaPayload {
  districtId: string;
  name: string;
  code?: string;
}

export interface UpdateUpazilaPayload {
  districtId?: string;
  name?: string;
  code?: string;
}

const createUpazila = async (payload: CreateUpazilaPayload) => {
  if (!payload.districtId || !payload.name) {
    throw new customError(status.BAD_REQUEST, "District ID and Upazila name are required.");
  }

  const district = await prisma.district.findUnique({ where: { id: payload.districtId } });
  if (!district) {
    throw new customError(status.NOT_FOUND, "District not found.");
  }

  const existing = await prisma.upazila.findFirst({
    where: { districtId: payload.districtId, name: payload.name },
  });
  if (existing) {
    throw new customError(status.CONFLICT, "Upazila with this name already exists in this district.");
  }

  const upazila = await prisma.upazila.create({
    data: {
      districtId: payload.districtId,
      name: payload.name,
      code: payload.code || null,
    },
    include: {
      district: { select: { id: true, name: true, division: { select: { id: true, name: true } } } },
    },
  });

  return upazila;
};

const getAllUpazilas = async (query?: { districtId?: string; search?: string }) => {
  const where: any = {};

  if (query?.districtId) {
    where.districtId = query.districtId;
  }

  if (query?.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { code: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const upazilas = await prisma.upazila.findMany({
    where,
    orderBy: { name: "asc" },
    include: {
      district: { select: { id: true, name: true } },
      _count: {
        select: {
          unions: true,
          branches: true,
        },
      },
    },
  });

  return upazilas;
};

const getUpazilaById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Upazila ID is required.");
  }

  const upazila = await prisma.upazila.findUnique({
    where: { id },
    include: {
      district: { select: { id: true, name: true, division: { select: { id: true, name: true } } } },
      unions: {
        select: { id: true, name: true, code: true },
        orderBy: { name: "asc" },
      },
      _count: {
        select: { branches: true },
      },
    },
  });

  if (!upazila) {
    throw new customError(status.NOT_FOUND, "Upazila not found.");
  }

  return upazila;
};

const updateUpazila = async (id: string, payload: UpdateUpazilaPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Upazila ID is required.");
  }

  const upazila = await prisma.upazila.findUnique({ where: { id } });
  if (!upazila) {
    throw new customError(status.NOT_FOUND, "Upazila not found.");
  }

  if (payload.districtId) {
    const district = await prisma.district.findUnique({ where: { id: payload.districtId } });
    if (!district) {
      throw new customError(status.NOT_FOUND, "District not found.");
    }
  }

  if (payload.name) {
    const targetDistrictId = payload.districtId || upazila.districtId;
    const existing = await prisma.upazila.findFirst({
      where: {
        districtId: targetDistrictId,
        name: payload.name,
        NOT: { id },
      },
    });
    if (existing) {
      throw new customError(status.CONFLICT, "Upazila with this name already exists in this district.");
    }
  }

  const updated = await prisma.upazila.update({
    where: { id },
    data: {
      ...(payload.districtId && { districtId: payload.districtId }),
      ...(payload.name && { name: payload.name }),
      ...(payload.code !== undefined && { code: payload.code || null }),
    },
  });

  return updated;
};

const deleteUpazila = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Upazila ID is required.");
  }

  const upazila = await prisma.upazila.findUnique({
    where: { id },
    include: {
      _count: {
        select: { unions: true },
      },
    },
  });

  if (!upazila) {
    throw new customError(status.NOT_FOUND, "Upazila not found.");
  }

  if (upazila._count.unions > 0) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot delete upazila because unions are linked to it. Remove all unions first."
    );
  }

  await prisma.upazila.delete({ where: { id } });

  return { message: "Upazila deleted successfully." };
};

export const upazilaService = {
  createUpazila,
  getAllUpazilas,
  getUpazilaById,
  updateUpazila,
  deleteUpazila,
};
