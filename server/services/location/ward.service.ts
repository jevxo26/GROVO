import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateWardPayload {
  unionId: string;
  name: string;
  wardNumber: string;
}

export interface UpdateWardPayload {
  unionId?: string;
  name?: string;
  wardNumber?: string;
}

const createWard = async (payload: CreateWardPayload) => {
  if (!payload.unionId || !payload.name || !payload.wardNumber) {
    throw new customError(status.BAD_REQUEST, "Union ID, Ward name, and Ward number are required.");
  }

  const union = await prisma.union.findUnique({ where: { id: payload.unionId } });
  if (!union) {
    throw new customError(status.NOT_FOUND, "Union not found.");
  }

  const existing = await prisma.ward.findFirst({
    where: { unionId: payload.unionId, wardNumber: payload.wardNumber },
  });
  if (existing) {
    throw new customError(status.CONFLICT, "Ward number already exists in this union.");
  }

  const ward = await prisma.ward.create({
    data: {
      unionId: payload.unionId,
      name: payload.name,
      wardNumber: payload.wardNumber,
    },
    include: {
      union: { select: { id: true, name: true, upazila: { select: { id: true, name: true } } } },
    },
  });

  return ward;
};

const getAllWards = async (query?: { unionId?: string; search?: string }) => {
  const where: any = {};

  if (query?.unionId) {
    where.unionId = query.unionId;
  }

  if (query?.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { wardNumber: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const wards = await prisma.ward.findMany({
    where,
    orderBy: { wardNumber: "asc" },
    include: {
      union: { select: { id: true, name: true } },
      _count: {
        select: {
          areaCoverages: true,
        },
      },
    },
  });

  return wards;
};

const getWardById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Ward ID is required.");
  }

  const ward = await prisma.ward.findUnique({
    where: { id },
    include: {
      union: { select: { id: true, name: true, upazila: { select: { id: true, name: true, district: { select: { id: true, name: true } } } } } },
      _count: {
        select: { areaCoverages: true },
      },
    },
  });

  if (!ward) {
    throw new customError(status.NOT_FOUND, "Ward not found.");
  }

  return ward;
};

const updateWard = async (id: string, payload: UpdateWardPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Ward ID is required.");
  }

  const ward = await prisma.ward.findUnique({ where: { id } });
  if (!ward) {
    throw new customError(status.NOT_FOUND, "Ward not found.");
  }

  if (payload.unionId) {
    const union = await prisma.union.findUnique({ where: { id: payload.unionId } });
    if (!union) {
      throw new customError(status.NOT_FOUND, "Union not found.");
    }
  }

  if (payload.wardNumber) {
    const targetUnionId = payload.unionId || ward.unionId;
    const existing = await prisma.ward.findFirst({
      where: {
        unionId: targetUnionId,
        wardNumber: payload.wardNumber,
        NOT: { id },
      },
    });
    if (existing) {
      throw new customError(status.CONFLICT, "Ward number already exists in this union.");
    }
  }

  const updated = await prisma.ward.update({
    where: { id },
    data: {
      ...(payload.unionId && { unionId: payload.unionId }),
      ...(payload.name && { name: payload.name }),
      ...(payload.wardNumber && { wardNumber: payload.wardNumber }),
    },
  });

  return updated;
};

const deleteWard = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Ward ID is required.");
  }

  const ward = await prisma.ward.findUnique({ where: { id } });
  if (!ward) {
    throw new customError(status.NOT_FOUND, "Ward not found.");
  }

  await prisma.ward.delete({ where: { id } });

  return { message: "Ward deleted successfully." };
};

export const wardService = {
  createWard,
  getAllWards,
  getWardById,
  updateWard,
  deleteWard,
};
