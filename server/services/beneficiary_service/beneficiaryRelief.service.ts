import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

// ==================== 8. RELIEF PACKAGE SERVICES ====================
const createReliefPackage = async (payload: any) => {
  if (!payload.packageName) {
    throw new customError(status.BAD_REQUEST, "packageName is required.");
  }

  return await prisma.reliefPackage.create({
    data: {
      packageName: payload.packageName,
      description: payload.description || null,
      estimatedValue: payload.estimatedValue
        ? Number(payload.estimatedValue)
        : 0.0,
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllReliefPackages = async (query?: { status?: string; search?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;
  if (query?.search) {
    where.packageName = { contains: query.search, mode: "insensitive" };
  }

  return await prisma.reliefPackage.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getReliefPackageById = async (id: string) => {
  const item = await prisma.reliefPackage.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Relief package not found.");
  }
  return item;
};

const updateReliefPackage = async (id: string, payload: any) => {
  const item = await prisma.reliefPackage.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Relief package not found.");
  }

  return await prisma.reliefPackage.update({
    where: { id },
    data: {
      ...(payload.packageName && { packageName: payload.packageName }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.estimatedValue !== undefined && { estimatedValue: Number(payload.estimatedValue) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteReliefPackage = async (id: string) => {
  const item = await prisma.reliefPackage.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Relief package not found.");
  }
  await prisma.reliefPackage.delete({ where: { id } });
  return { message: "Relief package deleted successfully." };
};


// ==================== 9. RELIEF ITEM SERVICES ====================
const createReliefItem = async (payload: any) => {
  if (!payload.packageId || !payload.itemName || payload.quantity === undefined || !payload.unit) {
    throw new customError(status.BAD_REQUEST, "packageId, itemName, quantity, and unit are required.");
  }

  return await prisma.reliefItem.create({
    data: {
      packageId: payload.packageId,
      itemName: payload.itemName,
      quantity: Number(payload.quantity),
      unit: payload.unit,
      estimatedPrice: payload.estimatedPrice
        ? Number(payload.estimatedPrice)
        : 0.0,
    },
  });
};

const getAllReliefItems = async (query?: { packageId?: string; search?: string }) => {
  const where: any = {};
  if (query?.packageId) where.packageId = query.packageId;
  if (query?.search) {
    where.itemName = { contains: query.search, mode: "insensitive" };
  }

  return await prisma.reliefItem.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getReliefItemById = async (id: string) => {
  const item = await prisma.reliefItem.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Relief item not found.");
  }
  return item;
};

const updateReliefItem = async (id: string, payload: any) => {
  const item = await prisma.reliefItem.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Relief item not found.");
  }

  return await prisma.reliefItem.update({
    where: { id },
    data: {
      ...(payload.itemName && { itemName: payload.itemName }),
      ...(payload.quantity !== undefined && { quantity: Number(payload.quantity) }),
      ...(payload.unit && { unit: payload.unit }),
      ...(payload.estimatedPrice !== undefined && { estimatedPrice: Number(payload.estimatedPrice) }),
    },
  });
};

const deleteReliefItem = async (id: string) => {
  const item = await prisma.reliefItem.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Relief item not found.");
  }
  await prisma.reliefItem.delete({ where: { id } });
  return { message: "Relief item deleted successfully." };
};


// ==================== 10. DISTRIBUTION CAMPAIGN SERVICES ====================
const createDistributionCampaign = async (payload: any) => {
  if (!payload.title || !payload.distributionDate || !payload.location) {
    throw new customError(status.BAD_REQUEST, "title, distributionDate, and location are required.");
  }

  return await prisma.distributionCampaign.create({
    data: {
      campaignId: payload.campaignId || null,
      title: payload.title,
      distributionDate: new Date(payload.distributionDate),
      location: payload.location,
      status: payload.status || "PENDING",
    },
  });
};

const getAllDistributionCampaigns = async (query?: { campaignId?: string; status?: string }) => {
  const where: any = {};
  if (query?.campaignId) where.campaignId = query.campaignId;
  if (query?.status) where.status = query.status;

  return await prisma.distributionCampaign.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getDistributionCampaignById = async (id: string) => {
  const item = await prisma.distributionCampaign.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution campaign not found.");
  }
  return item;
};

const updateDistributionCampaign = async (id: string, payload: any) => {
  const item = await prisma.distributionCampaign.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution campaign not found.");
  }

  return await prisma.distributionCampaign.update({
    where: { id },
    data: {
      ...(payload.title && { title: payload.title }),
      ...(payload.distributionDate && { distributionDate: new Date(payload.distributionDate) }),
      ...(payload.location && { location: payload.location }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteDistributionCampaign = async (id: string) => {
  const item = await prisma.distributionCampaign.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution campaign not found.");
  }
  await prisma.distributionCampaign.delete({ where: { id } });
  return { message: "Distribution campaign deleted successfully." };
};


// ==================== 11. DISTRIBUTION SCHEDULE SERVICES ====================
const createDistributionSchedule = async (payload: any) => {
  if (!payload.distributionCampaignId || !payload.scheduleDate || !payload.startTime || !payload.endTime) {
    throw new customError(status.BAD_REQUEST, "distributionCampaignId, scheduleDate, startTime, and endTime are required.");
  }

  return await prisma.distributionSchedule.create({
    data: {
      distributionCampaignId: payload.distributionCampaignId,
      branchId: payload.branchId || null,
      distributionCenterId: payload.distributionCenterId || null,
      scheduleDate: new Date(payload.scheduleDate),
      startTime: payload.startTime,
      endTime: payload.endTime,
      status: payload.status || "PENDING",
    },
  });
};

const getAllDistributionSchedules = async (query?: { distributionCampaignId?: string; branchId?: string; status?: string }) => {
  const where: any = {};
  if (query?.distributionCampaignId) where.distributionCampaignId = query.distributionCampaignId;
  if (query?.branchId) where.branchId = query.branchId;
  if (query?.status) where.status = query.status;

  return await prisma.distributionSchedule.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getDistributionScheduleById = async (id: string) => {
  const item = await prisma.distributionSchedule.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution schedule not found.");
  }
  return item;
};

const updateDistributionSchedule = async (id: string, payload: any) => {
  const item = await prisma.distributionSchedule.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution schedule not found.");
  }

  return await prisma.distributionSchedule.update({
    where: { id },
    data: {
      ...(payload.branchId !== undefined && { branchId: payload.branchId }),
      ...(payload.distributionCenterId !== undefined && { distributionCenterId: payload.distributionCenterId }),
      ...(payload.scheduleDate && { scheduleDate: new Date(payload.scheduleDate) }),
      ...(payload.startTime && { startTime: payload.startTime }),
      ...(payload.endTime && { endTime: payload.endTime }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteDistributionSchedule = async (id: string) => {
  const item = await prisma.distributionSchedule.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution schedule not found.");
  }
  await prisma.distributionSchedule.delete({ where: { id } });
  return { message: "Distribution schedule deleted successfully." };
};


// ==================== 12. DISTRIBUTION CENTER SERVICES ====================
const createDistributionCenter = async (payload: any) => {
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

const getAllDistributionCenters = async (query?: { branchId?: string; status?: string }) => {
  const where: any = {};
  if (query?.branchId) where.branchId = query.branchId;
  if (query?.status) where.status = query.status;

  return await prisma.distributionCenter.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getDistributionCenterById = async (id: string) => {
  const item = await prisma.distributionCenter.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution center not found.");
  }
  return item;
};

const updateDistributionCenter = async (id: string, payload: any) => {
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

const deleteDistributionCenter = async (id: string) => {
  const item = await prisma.distributionCenter.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Distribution center not found.");
  }
  await prisma.distributionCenter.delete({ where: { id } });
  return { message: "Distribution center deleted successfully." };
};


// ==================== 15. BENEFICIARY QR CODE SERVICES ====================
const createBeneficiaryQRCode = async (payload: any) => {
  if (!payload.beneficiaryId || !payload.qrCode || !payload.verificationUrl) {
    throw new customError(status.BAD_REQUEST, "beneficiaryId, qrCode, and verificationUrl are required.");
  }

  const existing = await prisma.beneficiaryQRCode.findUnique({
    where: { beneficiaryId: payload.beneficiaryId },
  });
  if (existing) {
    throw new customError(status.CONFLICT, "QR Code already exists for this beneficiary.");
  }

  return await prisma.beneficiaryQRCode.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      qrCode: payload.qrCode,
      barcode: payload.barcode || null,
      verificationUrl: payload.verificationUrl,
    },
  });
};

const getAllBeneficiaryQRCodes = async (query?: { beneficiaryId?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;

  return await prisma.beneficiaryQRCode.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getBeneficiaryQRCodeById = async (id: string) => {
  const item = await prisma.beneficiaryQRCode.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary QR Code record not found.");
  }
  return item;
};

const updateBeneficiaryQRCode = async (id: string, payload: any) => {
  const item = await prisma.beneficiaryQRCode.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary QR Code record not found.");
  }

  return await prisma.beneficiaryQRCode.update({
    where: { id },
    data: {
      ...(payload.qrCode && { qrCode: payload.qrCode }),
      ...(payload.barcode !== undefined && { barcode: payload.barcode }),
      ...(payload.verificationUrl && { verificationUrl: payload.verificationUrl }),
    },
  });
};

const deleteBeneficiaryQRCode = async (id: string) => {
  const item = await prisma.beneficiaryQRCode.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary QR Code record not found.");
  }
  await prisma.beneficiaryQRCode.delete({ where: { id } });
  return { message: "Beneficiary QR Code record deleted successfully." };
};


export const beneficiaryReliefService = {
  // ReliefPackage
  createReliefPackage,
  getAllReliefPackages,
  getReliefPackageById,
  updateReliefPackage,
  deleteReliefPackage,
  // ReliefItem
  createReliefItem,
  getAllReliefItems,
  getReliefItemById,
  updateReliefItem,
  deleteReliefItem,
  // DistributionCampaign
  createDistributionCampaign,
  getAllDistributionCampaigns,
  getDistributionCampaignById,
  updateDistributionCampaign,
  deleteDistributionCampaign,
  // DistributionSchedule
  createDistributionSchedule,
  getAllDistributionSchedules,
  getDistributionScheduleById,
  updateDistributionSchedule,
  deleteDistributionSchedule,
  // DistributionCenter
  createDistributionCenter,
  getAllDistributionCenters,
  getDistributionCenterById,
  updateDistributionCenter,
  deleteDistributionCenter,
  // BeneficiaryQRCode
  createBeneficiaryQRCode,
  getAllBeneficiaryQRCodes,
  getBeneficiaryQRCodeById,
  updateBeneficiaryQRCode,
  deleteBeneficiaryQRCode,
};
