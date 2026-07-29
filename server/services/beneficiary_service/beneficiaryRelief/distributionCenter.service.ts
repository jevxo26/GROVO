import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 12. DISTRIBUTION CENTER SERVICES ====================
export const createDistributionCenter = async (payload: any) => {
  if (!payload.centerName || !payload.address) {
    throw new customError(status.BAD_REQUEST, "centerName and address are required.");
  }

  return await prisma.distributionCenter.create({
    data: {
      centerName: payload.centerName,
      branchId: payload.branchId || null,
      address: payload.address,
      latitude: payload.latitude ? Number(payload.latitude) : null,
      longitude: payload.longitude ? Number(payload.longitude) : null,
      capacity: payload.capacity ? Number(payload.capacity) : 100,
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllDistributionCenters = async (query?: { branchId?: string; status?: string }) => {
  const where: any = {};
  if (query?.branchId) where.branchId = query.branchId;
  if (query?.status) where.status = query.status;

  return await prisma.distributionCenter.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getDistributionCenterById = async (id: string) => {
  const item = await prisma.distributionCenter.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution center not found.");
  }
  return item;
};

export const updateDistributionCenter = async (id: string, payload: any) => {
  const item = await prisma.distributionCenter.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution center not found.");
  }

  return await prisma.distributionCenter.update({
    where: { id },
    data: {
      ...(payload.centerName && { centerName: payload.centerName }),
      ...(payload.branchId !== undefined && { branchId: payload.branchId }),
      ...(payload.address && { address: payload.address }),
      ...(payload.latitude !== undefined && { latitude: payload.latitude ? Number(payload.latitude) : null }),
      ...(payload.longitude !== undefined && { longitude: payload.longitude ? Number(payload.longitude) : null }),
      ...(payload.capacity !== undefined && { capacity: Number(payload.capacity) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteDistributionCenter = async (id: string) => {
  const item = await prisma.distributionCenter.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution center not found.");
  }
  await prisma.distributionCenter.delete({ where: { id } });
  return { message: "Distribution center deleted successfully." };
};
