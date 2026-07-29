import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateBranchVehiclePayload {
  branchId: string;
  vehicleType: string;
  registrationNumber: string;
  driverName?: string;
  status?: string;
}

export interface UpdateBranchVehiclePayload {
  branchId?: string;
  vehicleType?: string;
  registrationNumber?: string;
  driverName?: string;
  status?: string;
}

const createBranchVehicle = async (payload: CreateBranchVehiclePayload) => {
  if (!payload.branchId || !payload.vehicleType || !payload.registrationNumber) {
    throw new customError(status.BAD_REQUEST, "Branch ID, Vehicle type, and Registration number are required.");
  }

  const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
  if (!branch) {
    throw new customError(status.NOT_FOUND, "Branch not found.");
  }

  const existing = await prisma.branchVehicle.findUnique({
    where: { registrationNumber: payload.registrationNumber },
  });
  if (existing) {
    throw new customError(status.CONFLICT, "A vehicle with this registration number already exists.");
  }

  const branchVehicle = await prisma.branchVehicle.create({
    data: {
      branchId: payload.branchId,
      vehicleType: payload.vehicleType,
      registrationNumber: payload.registrationNumber,
      driverName: payload.driverName || null,
      status: payload.status || "ACTIVE",
    },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return branchVehicle;
};

const getAllBranchVehicles = async (query?: { branchId?: string; status?: string; search?: string }) => {
  const where: any = {};

  if (query?.branchId) {
    where.branchId = query.branchId;
  }
  if (query?.status) {
    where.status = query.status;
  }
  if (query?.search) {
    where.OR = [
      { registrationNumber: { contains: query.search, mode: "insensitive" } },
      { driverName: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const branchVehicles = await prisma.branchVehicle.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return branchVehicles;
};

const getBranchVehicleById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Vehicle ID is required.");
  }

  const branchVehicle = await prisma.branchVehicle.findUnique({
    where: { id },
    include: {
      branch: true,
    },
  });

  if (!branchVehicle) {
    throw new customError(status.NOT_FOUND, "Branch Vehicle record not found.");
  }

  return branchVehicle;
};

const updateBranchVehicle = async (id: string, payload: UpdateBranchVehiclePayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Vehicle ID is required.");
  }

  const branchVehicle = await prisma.branchVehicle.findUnique({ where: { id } });
  if (!branchVehicle) {
    throw new customError(status.NOT_FOUND, "Branch Vehicle record not found.");
  }

  if (payload.branchId) {
    const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
    if (!branch) {
      throw new customError(status.NOT_FOUND, "Branch not found.");
    }
  }

  if (payload.registrationNumber && payload.registrationNumber !== branchVehicle.registrationNumber) {
    const existing = await prisma.branchVehicle.findUnique({
      where: { registrationNumber: payload.registrationNumber },
    });
    if (existing) {
      throw new customError(status.CONFLICT, "A vehicle with this registration number already exists.");
    }
  }

  const updated = await prisma.branchVehicle.update({
    where: { id },
    data: {
      ...(payload.branchId && { branchId: payload.branchId }),
      ...(payload.vehicleType && { vehicleType: payload.vehicleType }),
      ...(payload.registrationNumber && { registrationNumber: payload.registrationNumber }),
      ...(payload.driverName !== undefined && { driverName: payload.driverName }),
      ...(payload.status && { status: payload.status }),
    },
  });

  return updated;
};

const deleteBranchVehicle = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Branch Vehicle ID is required.");
  }

  const branchVehicle = await prisma.branchVehicle.findUnique({ where: { id } });
  if (!branchVehicle) {
    throw new customError(status.NOT_FOUND, "Branch Vehicle record not found.");
  }

  await prisma.branchVehicle.delete({ where: { id } });

  return { message: "Branch Vehicle record deleted successfully." };
};

export const branchVehicleService = {
  createBranchVehicle,
  getAllBranchVehicles,
  getBranchVehicleById,
  updateBranchVehicle,
  deleteBranchVehicle,
};
