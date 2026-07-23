import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

const createReliefPackage = async (payload: any) => {
  return await prisma.reliefPackage.create({
    data: {
      packageName: payload.packageName,
      description: payload.description,
      estimatedValue: payload.estimatedValue
        ? Number(payload.estimatedValue)
        : 0.0,
      status: payload.status,
    },
  });
};

const createReliefItem = async (payload: any) => {
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

const createDistributionCampaign = async (payload: any) => {
  return await prisma.distributionCampaign.create({
    data: {
      campaignId: payload.campaignId,
      title: payload.title,
      distributionDate: new Date(payload.distributionDate),
      location: payload.location,
      status: payload.status,
    },
  });
};

const createDistributionSchedule = async (payload: any) => {
  return await prisma.distributionSchedule.create({
    data: {
      distributionCampaignId: payload.distributionCampaignId,
      branchId: payload.branchId,
      distributionCenterId: payload.distributionCenterId,
      scheduleDate: new Date(payload.scheduleDate),
      startTime: payload.startTime,
      endTime: payload.endTime,
      status: payload.status,
    },
  });
};

const createDistributionCenter = async (payload: any) => {
  return await prisma.distributionCenter.create({
    data: {
      centerName: payload.centerName,
      branchId: payload.branchId,
      address: payload.address,
      latitude: payload.latitude ? Number(payload.latitude) : undefined,
      longitude: payload.longitude ? Number(payload.longitude) : undefined,
      capacity: payload.capacity ? Number(payload.capacity) : 100,
      status: payload.status,
    },
  });
};

const createBeneficiaryQRCode = async (payload: any) => {
  const existing = await prisma.beneficiaryQRCode.findUnique({
    where: { beneficiaryId: payload.beneficiaryId },
  });

  if (existing) {
    throw new customError(
      status.CONFLICT,
      "QR Code already generated for this beneficiary",
    );
  }

  return await prisma.beneficiaryQRCode.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      qrCode: payload.qrCode,
      barcode: payload.barcode,
      verificationUrl: payload.verificationUrl,
    },
  });
};

export const beneficiaryReliefService = {
  createReliefPackage,
  createReliefItem,
  createDistributionCampaign,
  createDistributionSchedule,
  createDistributionCenter,
  createBeneficiaryQRCode,
};
