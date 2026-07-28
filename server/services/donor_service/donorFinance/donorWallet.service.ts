import status from "http-status";
import { prisma } from "../../../lib/prisma";
import customError from "../../../error/customError";

// ==================== 7. DONOR WALLET SERVICES ====================
export const createDonorWallet = async (payload: any) => {
  if (!payload.donorId) {
    throw new customError(status.BAD_REQUEST, "donorId is required.");
  }

  const existing = await prisma.donorWallet.findUnique({
    where: { donorId: payload.donorId },
  });
  if (existing) {
    throw new customError(status.CONFLICT, "Wallet already exists for this donor.");
  }

  return await prisma.donorWallet.create({
    data: {
      donorId: payload.donorId,
      balance: payload.balance ? Number(payload.balance) : 0.0,
      totalDonated: payload.totalDonated ? Number(payload.totalDonated) : 0.0,
      rewardPoints: payload.rewardPoints ? Number(payload.rewardPoints) : 0,
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllDonorWallets = async (query?: { status?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;

  return await prisma.donorWallet.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getDonorWalletById = async (id: string) => {
  const item = await prisma.donorWallet.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor wallet not found.");
  }
  return item;
};

export const updateDonorWallet = async (id: string, payload: any) => {
  const item = await prisma.donorWallet.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor wallet not found.");
  }

  return await prisma.donorWallet.update({
    where: { id },
    data: {
      ...(payload.balance !== undefined && { balance: Number(payload.balance) }),
      ...(payload.totalDonated !== undefined && { totalDonated: Number(payload.totalDonated) }),
      ...(payload.rewardPoints !== undefined && { rewardPoints: Number(payload.rewardPoints) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteDonorWallet = async (id: string) => {
  const item = await prisma.donorWallet.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor wallet not found.");
  }
  await prisma.donorWallet.delete({ where: { id } });
  return { message: "Donor wallet deleted successfully." };
};
