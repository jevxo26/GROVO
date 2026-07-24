import status from "http-status";
import { PaymentStatus } from "../../../generated/prisma/enums";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface RecordDonationPayload {
  campaignId: string;
  donationId?: string;
  donorId?: string;
  amount: number;
  paymentStatus?: PaymentStatus;
}

export interface UpdateDonationStatusPayload {
  paymentStatus: PaymentStatus;
}

const recordDonation = async (donorId: string | undefined, payload: RecordDonationPayload) => {
  if (!payload.campaignId || !payload.amount || payload.amount <= 0) {
    throw new customError(status.BAD_REQUEST, "Required fields: valid campaignId and amount greater than 0.");
  }

  const campaign = await prisma.campaign.findUnique({
    where: { id: payload.campaignId },
    include: { emergencyDetails: true },
  });

  if (!campaign) {
    throw new customError(status.NOT_FOUND, "Campaign not found.");
  }

  const finalDonorId = payload.donorId || donorId || null;
  const initialStatus = payload.paymentStatus || PaymentStatus.PENDING;

  // Use a transaction to create donation record & atomically increment campaign raisedAmount if PAID
  const result = await prisma.$transaction(async (tx) => {
    const donation = await tx.campaignDonation.create({
      data: {
        campaignId: payload.campaignId,
        donationId: payload.donationId || `DON-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
        donorId: finalDonorId,
        amount: payload.amount,
        paymentStatus: initialStatus,
      },
    });

    if (initialStatus === PaymentStatus.PAID) {
      await tx.campaign.update({
        where: { id: payload.campaignId },
        data: {
          raisedAmount: { increment: payload.amount },
        },
      });

      if (campaign.emergencyDetails) {
        await tx.emergencyCampaign.update({
          where: { campaignId: payload.campaignId },
          data: {
            currentAmount: { increment: payload.amount },
          },
        });
      }
    }

    return donation;
  });

  return result;
};

const getDonationsByCampaignId = async (
  campaignId: string,
  query?: { page?: number; limit?: number; paymentStatus?: PaymentStatus }
) => {
  if (!campaignId) {
    throw new customError(status.BAD_REQUEST, "Campaign ID is required.");
  }

  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = { campaignId };
  if (query?.paymentStatus) {
    where.paymentStatus = query.paymentStatus;
  }

  const [donations, total, totalRaised] = await Promise.all([
    prisma.campaignDonation.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        donor: {
          select: { id: true, fullName: true, email: true, profilePhoto: true },
        },
      },
    }),
    prisma.campaignDonation.count({ where }),
    prisma.campaignDonation.aggregate({
      where: { campaignId, paymentStatus: PaymentStatus.PAID },
      _sum: { amount: true },
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
      totalPaidAmount: totalRaised._sum.amount || 0,
    },
    data: donations,
  };
};

const getDonationsByDonorId = async (donorId: string, query?: { page?: number; limit?: number }) => {
  if (!donorId) {
    throw new customError(status.BAD_REQUEST, "Donor ID is required.");
  }

  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const [donations, total] = await Promise.all([
    prisma.campaignDonation.findMany({
      where: { donorId },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        campaign: {
          select: { id: true, title: true, campaignCode: true, thumbnail: true },
        },
      },
    }),
    prisma.campaignDonation.count({ where: { donorId } }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: donations,
  };
};

const getDonationById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Donation ID is required.");
  }

  const donation = await prisma.campaignDonation.findUnique({
    where: { id },
    include: {
      campaign: {
        select: { id: true, title: true, campaignCode: true },
      },
      donor: {
        select: { id: true, fullName: true, email: true, phone: true },
      },
    },
  });

  if (!donation) {
    throw new customError(status.NOT_FOUND, "Campaign donation record not found.");
  }

  return donation;
};

const updateDonationPaymentStatus = async (id: string, payload: UpdateDonationStatusPayload) => {
  if (!id || !payload.paymentStatus) {
    throw new customError(status.BAD_REQUEST, "Donation ID and paymentStatus are required.");
  }

  const donation = await prisma.campaignDonation.findUnique({
    where: { id },
    include: { campaign: { include: { emergencyDetails: true } } },
  });

  if (!donation) {
    throw new customError(status.NOT_FOUND, "Campaign donation record not found.");
  }

  const oldStatus = donation.paymentStatus;
  const newStatus = payload.paymentStatus;

  if (oldStatus === newStatus) {
    return donation;
  }

  const result = await prisma.$transaction(async (tx) => {
    const updatedDonation = await tx.campaignDonation.update({
      where: { id },
      data: { paymentStatus: newStatus },
    });

    // If changing to PAID from non-PAID, increment campaign raisedAmount
    if (oldStatus !== PaymentStatus.PAID && newStatus === PaymentStatus.PAID) {
      await tx.campaign.update({
        where: { id: donation.campaignId },
        data: { raisedAmount: { increment: donation.amount } },
      });

      if (donation.campaign.emergencyDetails) {
        await tx.emergencyCampaign.update({
          where: { campaignId: donation.campaignId },
          data: { currentAmount: { increment: donation.amount } },
        });
      }
    }
    // If changing from PAID to non-PAID (e.g. REFUNDED), decrement raisedAmount
    else if (oldStatus === PaymentStatus.PAID && newStatus !== PaymentStatus.PAID) {
      await tx.campaign.update({
        where: { id: donation.campaignId },
        data: { raisedAmount: { decrement: donation.amount } },
      });

      if (donation.campaign.emergencyDetails) {
        await tx.emergencyCampaign.update({
          where: { campaignId: donation.campaignId },
          data: { currentAmount: { decrement: donation.amount } },
        });
      }
    }

    return updatedDonation;
  });

  return result;
};

export const campaignDonationService = {
  recordDonation,
  getDonationsByCampaignId,
  getDonationsByDonorId,
  getDonationById,
  updateDonationPaymentStatus,
};
