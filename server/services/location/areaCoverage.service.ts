import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateAreaCoveragePayload {
  branchId: string;
  divisionId?: string;
  districtId?: string;
  upazilaId?: string;
  unionId?: string;
  wardId?: string;
  coverageType?: string;
}

export interface UpdateAreaCoveragePayload {
  branchId?: string;
  divisionId?: string;
  districtId?: string;
  upazilaId?: string;
  unionId?: string;
  wardId?: string;
  coverageType?: string;
}

const createAreaCoverage = async (payload: CreateAreaCoveragePayload) => {
  if (!payload.branchId) {
    throw new customError(status.BAD_REQUEST, "Branch ID is required.");
  }

  const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
  if (!branch) {
    throw new customError(status.NOT_FOUND, "Branch not found.");
  }

  if (payload.divisionId) {
    const division = await prisma.division.findUnique({ where: { id: payload.divisionId } });
    if (!division) {
      throw new customError(status.NOT_FOUND, "Division not found.");
    }
  }

  if (payload.districtId) {
    const district = await prisma.district.findUnique({ where: { id: payload.districtId } });
    if (!district) {
      throw new customError(status.NOT_FOUND, "District not found.");
    }
  }

  if (payload.upazilaId) {
    const upazila = await prisma.upazila.findUnique({ where: { id: payload.upazilaId } });
    if (!upazila) {
      throw new customError(status.NOT_FOUND, "Upazila not found.");
    }
  }

  if (payload.unionId) {
    const union = await prisma.union.findUnique({ where: { id: payload.unionId } });
    if (!union) {
      throw new customError(status.NOT_FOUND, "Union not found.");
    }
  }

  if (payload.wardId) {
    const ward = await prisma.ward.findUnique({ where: { id: payload.wardId } });
    if (!ward) {
      throw new customError(status.NOT_FOUND, "Ward not found.");
    }
  }

  const areaCoverage = await prisma.areaCoverage.create({
    data: {
      branchId: payload.branchId,
      divisionId: payload.divisionId || null,
      districtId: payload.districtId || null,
      upazilaId: payload.upazilaId || null,
      unionId: payload.unionId || null,
      wardId: payload.wardId || null,
      coverageType: payload.coverageType || null,
    },
    include: {
      branch: { select: { id: true, branchName: true } },
      division: { select: { id: true, name: true } },
      district: { select: { id: true, name: true } },
      upazila: { select: { id: true, name: true } },
      union: { select: { id: true, name: true } },
      ward: { select: { id: true, name: true, wardNumber: true } },
    },
  });

  return areaCoverage;
};

const getAllAreaCoverages = async (query?: {
  branchId?: string;
  divisionId?: string;
  districtId?: string;
  upazilaId?: string;
  unionId?: string;
  wardId?: string;
}) => {
  const where: any = {};

  if (query?.branchId) {
    where.branchId = query.branchId;
  }
  if (query?.divisionId) {
    where.divisionId = query.divisionId;
  }
  if (query?.districtId) {
    where.districtId = query.districtId;
  }
  if (query?.upazilaId) {
    where.upazilaId = query.upazilaId;
  }
  if (query?.unionId) {
    where.unionId = query.unionId;
  }
  if (query?.wardId) {
    where.wardId = query.wardId;
  }

  const areaCoverages = await prisma.areaCoverage.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
      division: { select: { id: true, name: true } },
      district: { select: { id: true, name: true } },
      upazila: { select: { id: true, name: true } },
      union: { select: { id: true, name: true } },
      ward: { select: { id: true, name: true, wardNumber: true } },
    },
  });

  return areaCoverages;
};

const getAreaCoverageById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Area Coverage ID is required.");
  }

  const areaCoverage = await prisma.areaCoverage.findUnique({
    where: { id },
    include: {
      branch: true,
      division: true,
      district: true,
      upazila: true,
      union: true,
      ward: true,
    },
  });

  if (!areaCoverage) {
    throw new customError(status.NOT_FOUND, "Area Coverage record not found.");
  }

  return areaCoverage;
};

const updateAreaCoverage = async (id: string, payload: UpdateAreaCoveragePayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Area Coverage ID is required.");
  }

  const areaCoverage = await prisma.areaCoverage.findUnique({ where: { id } });
  if (!areaCoverage) {
    throw new customError(status.NOT_FOUND, "Area Coverage record not found.");
  }

  if (payload.branchId) {
    const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
    if (!branch) {
      throw new customError(status.NOT_FOUND, "Branch not found.");
    }
  }

  if (payload.divisionId) {
    const division = await prisma.division.findUnique({ where: { id: payload.divisionId } });
    if (!division) {
      throw new customError(status.NOT_FOUND, "Division not found.");
    }
  }

  if (payload.districtId) {
    const district = await prisma.district.findUnique({ where: { id: payload.districtId } });
    if (!district) {
      throw new customError(status.NOT_FOUND, "District not found.");
    }
  }

  if (payload.upazilaId) {
    const upazila = await prisma.upazila.findUnique({ where: { id: payload.upazilaId } });
    if (!upazila) {
      throw new customError(status.NOT_FOUND, "Upazila not found.");
    }
  }

  if (payload.unionId) {
    const union = await prisma.union.findUnique({ where: { id: payload.unionId } });
    if (!union) {
      throw new customError(status.NOT_FOUND, "Union not found.");
    }
  }

  if (payload.wardId) {
    const ward = await prisma.ward.findUnique({ where: { id: payload.wardId } });
    if (!ward) {
      throw new customError(status.NOT_FOUND, "Ward not found.");
    }
  }

  const updated = await prisma.areaCoverage.update({
    where: { id },
    data: {
      ...(payload.branchId && { branchId: payload.branchId }),
      ...(payload.divisionId !== undefined && { divisionId: payload.divisionId || null }),
      ...(payload.districtId !== undefined && { districtId: payload.districtId || null }),
      ...(payload.upazilaId !== undefined && { upazilaId: payload.upazilaId || null }),
      ...(payload.unionId !== undefined && { unionId: payload.unionId || null }),
      ...(payload.wardId !== undefined && { wardId: payload.wardId || null }),
      ...(payload.coverageType !== undefined && { coverageType: payload.coverageType || null }),
    },
  });

  return updated;
};

const deleteAreaCoverage = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Area Coverage ID is required.");
  }

  const areaCoverage = await prisma.areaCoverage.findUnique({ where: { id } });
  if (!areaCoverage) {
    throw new customError(status.NOT_FOUND, "Area Coverage record not found.");
  }

  await prisma.areaCoverage.delete({ where: { id } });

  return { message: "Area Coverage deleted successfully." };
};

export const areaCoverageService = {
  createAreaCoverage,
  getAllAreaCoverages,
  getAreaCoverageById,
  updateAreaCoverage,
  deleteAreaCoverage,
};
