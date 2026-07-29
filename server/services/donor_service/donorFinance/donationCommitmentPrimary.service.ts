import status from "http-status";
import { prisma } from "../../../lib/prisma";
import customError from "../../../error/customError";

// ==================== 6. DONATION COMMITMENT SERVICES ====================
export const createDonationCommitment = async (payload: any) => {
  if (!payload.donorId || !payload.campaignId || payload.pledgedAmount === undefined || !payload.dueDate) {
    throw new customError(status.BAD_REQUEST, "donorId, campaignId, pledgedAmount, and dueDate are required.");
  }

  const pledged = Number(payload.pledgedAmount);
  const paid = payload.paidAmount ? Number(payload.paidAmount) : 0.0;

  return await prisma.donationCommitment.create({
    data: {
      donorId: payload.donorId,
      campaignId: payload.campaignId,
      pledgedAmount: pledged,
      paidAmount: paid,
      remainingAmount: pledged - paid,
      dueDate: new Date(payload.dueDate),
      status: payload.status || "PENDING",
    },
  });
};

export const getAllDonationCommitments = async (query?: { donorId?: string; campaignId?: string; status?: string }) => {
  const where: any = {};
  if (query?.donorId) where.donorId = query.donorId;
  if (query?.campaignId) where.campaignId = query.campaignId;
  if (query?.status) where.status = query.status;

  return await prisma.donationCommitment.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getDonationCommitmentById = async (id: string) => {
  const item = await prisma.donationCommitment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donation commitment not found.");
  }
  return item;
};

