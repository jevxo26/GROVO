import status from "http-status";
import { prisma } from "../../../lib/prisma";
import customError from "../../../error/customError";

export const updateDonorTransaction = async (id: string, payload: any) => {
  const item = await prisma.donorTransaction.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor transaction not found.");
  }

  if (payload.referenceNo && payload.referenceNo !== item.referenceNo) {
    const existing = await prisma.donorTransaction.findUnique({ where: { referenceNo: payload.referenceNo } });
    if (existing) {
      throw new customError(status.CONFLICT, `Reference number '${payload.referenceNo}' already exists`);
    }
  }

  return await prisma.donorTransaction.update({
    where: { id },
    data: {
      ...(payload.transactionType && { transactionType: payload.transactionType }),
      ...(payload.amount !== undefined && { amount: Number(payload.amount) }),
      ...(payload.referenceNo && { referenceNo: payload.referenceNo }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteDonorTransaction = async (id: string) => {
  const item = await prisma.donorTransaction.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor transaction not found.");
  }
  await prisma.donorTransaction.delete({ where: { id } });
  return { message: "Donor transaction deleted successfully." };
};
