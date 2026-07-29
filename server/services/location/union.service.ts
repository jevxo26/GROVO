import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateUnionPayload {
  upazilaId: string;
  name: string;
  code?: string;
}

export interface UpdateUnionPayload {
  upazilaId?: string;
  name?: string;
  code?: string;
}

const createUnion = async (payload: CreateUnionPayload) => {
  if (!payload.upazilaId || !payload.name) {
    throw new customError(status.BAD_REQUEST, "Upazila ID and Union name are required.");
  }

  const upazila = await prisma.upazila.findUnique({ where: { id: payload.upazilaId } });
  if (!upazila) {
    throw new customError(status.NOT_FOUND, "Upazila not found.");
  }

  const existing = await prisma.union.findFirst({
    where: { upazilaId: payload.upazilaId, name: payload.name },
  });
  if (existing) {
    throw new customError(status.CONFLICT, "Union with this name already exists in this upazila.");
  }

  const union = await prisma.union.create({
    data: {
      upazilaId: payload.upazilaId,
      name: payload.name,
      code: payload.code || null,
    },
    include: {
      upazila: { select: { id: true, name: true, district: { select: { id: true, name: true } } } },
    },
  });

  return union;
};

const getAllUnions = async (query?: { upazilaId?: string; search?: string }) => {
  const where: any = {};

  if (query?.upazilaId) {
    where.upazilaId = query.upazilaId;
  }

  if (query?.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { code: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const unions = await prisma.union.findMany({
    where,
    orderBy: { name: "asc" },
    include: {
      upazila: { select: { id: true, name: true } },
      _count: {
        select: {
          wards: true,
          branches: true,
        },
      },
    },
  });

  return unions;
};

const getUnionById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Union ID is required.");
  }

  const union = await prisma.union.findUnique({
    where: { id },
    include: {
      upazila: { select: { id: true, name: true, district: { select: { id: true, name: true } } } },
      wards: {
        select: { id: true, name: true, wardNumber: true },
        orderBy: { wardNumber: "asc" },
      },
      _count: {
        select: { branches: true },
      },
    },
  });

  if (!union) {
    throw new customError(status.NOT_FOUND, "Union not found.");
  }

  return union;
};

const updateUnion = async (id: string, payload: UpdateUnionPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Union ID is required.");
  }

  const union = await prisma.union.findUnique({ where: { id } });
  if (!union) {
    throw new customError(status.NOT_FOUND, "Union not found.");
  }

  if (payload.upazilaId) {
    const upazila = await prisma.upazila.findUnique({ where: { id: payload.upazilaId } });
    if (!upazila) {
      throw new customError(status.NOT_FOUND, "Upazila not found.");
    }
  }

  if (payload.name) {
    const targetUpazilaId = payload.upazilaId || union.upazilaId;
    const existing = await prisma.union.findFirst({
      where: {
        upazilaId: targetUpazilaId,
        name: payload.name,
        NOT: { id },
      },
    });
    if (existing) {
      throw new customError(status.CONFLICT, "Union with this name already exists in this upazila.");
    }
  }

  const updated = await prisma.union.update({
    where: { id },
    data: {
      ...(payload.upazilaId && { upazilaId: payload.upazilaId }),
      ...(payload.name && { name: payload.name }),
      ...(payload.code !== undefined && { code: payload.code || null }),
    },
  });

  return updated;
};

const deleteUnion = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Union ID is required.");
  }

  const union = await prisma.union.findUnique({
    where: { id },
    include: {
      _count: {
        select: { wards: true },
      },
    },
  });

  if (!union) {
    throw new customError(status.NOT_FOUND, "Union not found.");
  }

  if (union._count.wards > 0) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot delete union because wards are linked to it. Remove all wards first."
    );
  }

  await prisma.union.delete({ where: { id } });

  return { message: "Union deleted successfully." };
};

export const unionService = {
  createUnion,
  getAllUnions,
  getUnionById,
  updateUnion,
  deleteUnion,
};
