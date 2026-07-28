import status from "http-status";
import { prisma } from "../../../lib/prisma";
import customError from "../../../error/customError";

export const updateDonationCommitment = async (id: string, payload: any) => {
  const item = await prisma.donationCommitment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donation commitment not found.");
  }

  const pledged = payload.pledgedAmount !== undefined ? Number(payload.pledgedAmount) : item.pledgedAmount;
  const paid = payload.paidAmount !== undefined ? Number(payload.paidAmount) : item.paidAmount;

  return await prisma.donationCommitment.update({
    where: { id },
    data: {
      ...(payload.campaignId && { campaignId: payload.campaignId }),
      pledgedAmount: pledged,
      paidAmount: paid,
      remainingAmount: pledged - paid,
      ...(payload.dueDate && { dueDate: new Date(payload.dueDate) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteDonationCommitment = async (id: string) => {
  const item = await prisma.donationCommitment.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donation commitment not found.");
  }
  await prisma.donationCommitment.delete({ where: { id } });
  return { message: "Donation commitment deleted successfully." };
};
