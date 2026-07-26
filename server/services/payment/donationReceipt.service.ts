import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface GenerateReceiptPayload {
  donationId: string;
  receiptUrl?: string;
  issuedAt?: string | Date;
}

const generateReceiptNumber = async (): Promise<string> => {
  const year = new Date().getFullYear();
  let code = "";
  let isUnique = false;

  while (!isUnique) {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    code = `REC-${year}-${randomDigits}`;
    const existing = await prisma.donationReceipt.findUnique({
      where: { receiptNumber: code },
    });
    if (!existing) {
      isUnique = true;
    }
  }

  return code;
};

const generateDonationReceipt = async (payload: GenerateReceiptPayload) => {
  if (!payload.donationId) {
    throw new customError(status.BAD_REQUEST, "Donation ID is required.");
  }

  const donation = await prisma.donation.findUnique({
    where: { id: payload.donationId },
    include: { receipt: true },
  });

  if (!donation) {
    throw new customError(status.NOT_FOUND, "Donation record not found.");
  }

  if (donation.receipt) {
    return donation.receipt;
  }

  const receiptNumber = await generateReceiptNumber();

  const receipt = await prisma.donationReceipt.create({
    data: {
      donationId: payload.donationId,
      receiptNumber,
      receiptUrl: payload.receiptUrl || null,
      issuedAt: payload.issuedAt ? new Date(payload.issuedAt) : new Date(),
    },
    include: {
      donation: {
        select: {
          id: true,
          donationNumber: true,
          amount: true,
          currency: true,
          donor: { select: { id: true, fullName: true, email: true } },
          campaign: { select: { id: true, title: true } },
        },
      },
    },
  });

  return receipt;
};

const getDonationReceiptByDonationId = async (donationId: string) => {
  if (!donationId) {
    throw new customError(status.BAD_REQUEST, "Donation ID is required.");
  }

  const receipt = await prisma.donationReceipt.findUnique({
    where: { donationId },
    include: {
      donation: {
        include: {
          donor: { select: { id: true, fullName: true, email: true, phone: true } },
          campaign: { select: { id: true, title: true, campaignCode: true } },
          project: { select: { id: true, projectName: true, projectCode: true } },
          category: { select: { id: true, name: true } },
          items: { include: { fund: { select: { id: true, fundName: true } } } },
        },
      },
    },
  });

  if (!receipt) {
    throw new customError(status.NOT_FOUND, "Receipt record not found for this donation.");
  }

  return receipt;
};

const getDonationReceiptByNumber = async (receiptNumber: string) => {
  if (!receiptNumber) {
    throw new customError(status.BAD_REQUEST, "Receipt number is required.");
  }

  const receipt = await prisma.donationReceipt.findUnique({
    where: { receiptNumber },
    include: {
      donation: {
        include: {
          donor: { select: { id: true, fullName: true, email: true } },
          campaign: { select: { id: true, title: true } },
          project: { select: { id: true, projectName: true } },
        },
      },
    },
  });

  if (!receipt) {
    throw new customError(status.NOT_FOUND, "Receipt record not found.");
  }

  return receipt;
};

const getDonationReceiptById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Receipt ID is required.");
  }

  const receipt = await prisma.donationReceipt.findUnique({
    where: { id },
    include: {
      donation: {
        include: {
          donor: { select: { id: true, fullName: true, email: true } },
          campaign: true,
          project: true,
        },
      },
    },
  });

  if (!receipt) {
    throw new customError(status.NOT_FOUND, "Receipt record not found.");
  }

  return receipt;
};

const deleteDonationReceipt = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Receipt ID is required.");
  }

  const receipt = await prisma.donationReceipt.findUnique({
    where: { id },
  });

  if (!receipt) {
    throw new customError(status.NOT_FOUND, "Receipt record not found.");
  }

  await prisma.donationReceipt.delete({
    where: { id },
  });

  return { message: "Donation receipt deleted successfully." };
};

export const donationReceiptService = {
  generateDonationReceipt,
  getDonationReceiptByDonationId,
  getDonationReceiptByNumber,
  getDonationReceiptById,
  deleteDonationReceipt,
};
