import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateDonationItemPayload {
  donationId: string;
  fundId: string;
  amount: number;
  remarks?: string;
}

export interface UpdateDonationItemPayload {
  fundId?: string;
  amount?: number;
  remarks?: string;
}

const createDonationItem = async (payload: CreateDonationItemPayload) => {
  if (!payload.donationId || !payload.fundId || !payload.amount || payload.amount <= 0) {
    throw new customError(status.BAD_REQUEST, "Required fields: donationId, fundId, and amount > 0.");
  }

  const [donation, fund] = await Promise.all([
    prisma.donation.findUnique({ where: { id: payload.donationId } }),
    prisma.fund.findUnique({ where: { id: payload.fundId } }),
  ]);

  if (!donation) {
    throw new customError(status.NOT_FOUND, "Donation record not found.");
  }

  if (!fund) {
    throw new customError(status.NOT_FOUND, "Fund record not found.");
  }

  const item = await prisma.donationItem.create({
    data: {
      donationId: payload.donationId,
      fundId: payload.fundId,
      amount: payload.amount,
      remarks: payload.remarks || null,
    },
    include: {
      donation: { select: { id: true, donationNumber: true, amount: true } },
      fund: { select: { id: true, fundName: true, fundCode: true } },
    },
  });

  return item;
};

const getDonationItemsByDonationId = async (donationId: string) => {
  if (!donationId) {
    throw new customError(status.BAD_REQUEST, "Donation ID is required.");
  }

  const items = await prisma.donationItem.findMany({
    where: { donationId },
    orderBy: { createdAt: "asc" },
    include: {
      fund: { select: { id: true, fundName: true, fundCode: true } },
    },
  });

  return items;
};

const getDonationItemsByFundId = async (
  fundId: string,
  query?: { page?: number; limit?: number }
) => {
  if (!fundId) {
    throw new customError(status.BAD_REQUEST, "Fund ID is required.");
  }

  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const [items, total, totalSum] = await Promise.all([
    prisma.donationItem.findMany({
      where: { fundId },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        donation: { select: { id: true, donationNumber: true, isAnonymous: true, createdAt: true } },
      },
    }),
    prisma.donationItem.count({ where: { fundId } }),
    prisma.donationItem.aggregate({
      where: { fundId },
      _sum: { amount: true },
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
      totalFundItemAmount: totalSum._sum.amount || 0,
    },
    data: items,
  };
};

const getDonationItemById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Donation item ID is required.");
  }

  const item = await prisma.donationItem.findUnique({
    where: { id },
    include: {
      donation: { select: { id: true, donationNumber: true, amount: true } },
      fund: { select: { id: true, fundName: true, fundCode: true, currentBalance: true } },
    },
  });

  if (!item) {
    throw new customError(status.NOT_FOUND, "Donation item record not found.");
  }

  return item;
};

const updateDonationItem = async (id: string, payload: UpdateDonationItemPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Donation item ID is required.");
  }

  const item = await prisma.donationItem.findUnique({
    where: { id },
  });

  if (!item) {
    throw new customError(status.NOT_FOUND, "Donation item record not found.");
  }

  if (payload.fundId) {
    const fund = await prisma.fund.findUnique({ where: { id: payload.fundId } });
    if (!fund) {
      throw new customError(status.NOT_FOUND, "Fund record not found.");
    }
  }

  if (payload.amount !== undefined && payload.amount <= 0) {
    throw new customError(status.BAD_REQUEST, "Amount must be greater than 0.");
  }

  const updatedItem = await prisma.donationItem.update({
    where: { id },
    data: {
      ...(payload.fundId && { fundId: payload.fundId }),
      ...(payload.amount !== undefined && { amount: payload.amount }),
      ...(payload.remarks !== undefined && { remarks: payload.remarks }),
    },
    include: {
      fund: { select: { id: true, fundName: true } },
    },
  });

  return updatedItem;
};

const deleteDonationItem = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Donation item ID is required.");
  }

  const item = await prisma.donationItem.findUnique({
    where: { id },
  });

  if (!item) {
    throw new customError(status.NOT_FOUND, "Donation item record not found.");
  }

  await prisma.donationItem.delete({
    where: { id },
  });

  return { message: "Donation item deleted successfully." };
};

export const donationItemService = {
  createDonationItem,
  getDonationItemsByDonationId,
  getDonationItemsByFundId,
  getDonationItemById,
  updateDonationItem,
  deleteDonationItem,
};
