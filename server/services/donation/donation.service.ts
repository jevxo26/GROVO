import status from "http-status";
import { PaymentStatus } from "../../../generated/prisma/enums";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateDonationPayload {
  donorId?: string;
  campaignId?: string;
  projectId?: string;
  donationTypeId?: string;
  categoryId?: string;
  amount: number;
  currency?: string;
  isAnonymous?: boolean;
  message?: string;
  paymentStatus?: PaymentStatus;
}

export interface UpdateDonationPayload {
  campaignId?: string;
  projectId?: string;
  donationTypeId?: string;
  categoryId?: string;
  amount?: number;
  isAnonymous?: boolean;
  message?: string;
  paymentStatus?: PaymentStatus;
  status?: string;
}

const generateDonationNumber = async (): Promise<string> => {
  const year = new Date().getFullYear();
  let code = "";
  let isUnique = false;

  while (!isUnique) {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    code = `DON-${year}-${randomDigits}`;
    const existing = await prisma.donation.findUnique({
      where: { donationNumber: code },
    });
    if (!existing) {
      isUnique = true;
    }
  }

  return code;
};

const createDonation = async (authenticatedUserId: string | undefined, payload: CreateDonationPayload) => {
  if (!payload.amount || payload.amount <= 0) {
    throw new customError(status.BAD_REQUEST, "Donation amount must be greater than 0.");
  }

  const donorId = payload.donorId || authenticatedUserId || null;

  if (donorId) {
    const donor = await prisma.user.findUnique({ where: { id: donorId } });
    if (!donor) {
      throw new customError(status.NOT_FOUND, "Donor user not found.");
    }
  }

  if (payload.campaignId) {
    const campaign = await prisma.campaign.findUnique({ where: { id: payload.campaignId } });
    if (!campaign) {
      throw new customError(status.NOT_FOUND, "Campaign not found.");
    }
  }

  if (payload.projectId) {
    const project = await prisma.project.findUnique({ where: { id: payload.projectId } });
    if (!project) {
      throw new customError(status.NOT_FOUND, "Project not found.");
    }
  }

  if (payload.categoryId) {
    const category = await prisma.donationCategory.findUnique({ where: { id: payload.categoryId } });
    if (!category) {
      throw new customError(status.NOT_FOUND, "Donation category not found.");
    }
  }

  if (payload.donationTypeId) {
    const donationType = await prisma.donationType.findUnique({ where: { id: payload.donationTypeId } });
    if (!donationType) {
      throw new customError(status.NOT_FOUND, "Donation type not found.");
    }
  }

  const donationNumber = await generateDonationNumber();
  const paymentStatus = payload.paymentStatus || PaymentStatus.PENDING;

  const result = await prisma.$transaction(async (tx) => {
    const donation = await tx.donation.create({
      data: {
        donationNumber,
        donorId,
        campaignId: payload.campaignId || null,
        projectId: payload.projectId || null,
        donationTypeId: payload.donationTypeId || null,
        categoryId: payload.categoryId || null,
        amount: payload.amount,
        currency: payload.currency || "BDT",
        isAnonymous: Boolean(payload.isAnonymous),
        message: payload.message || null,
        paymentStatus,
        status: "ACTIVE",
      },
      include: {
        donor: { select: { id: true, fullName: true, email: true } },
        campaign: { select: { id: true, title: true, campaignCode: true } },
        project: { select: { id: true, projectName: true, projectCode: true } },
        category: { select: { id: true, name: true } },
        donationType: { select: { id: true, name: true } },
      },
    });

    if (paymentStatus === PaymentStatus.PAID && payload.campaignId) {
      await tx.campaign.update({
        where: { id: payload.campaignId },
        data: { raisedAmount: { increment: payload.amount } },
      });

      const emergency = await tx.emergencyCampaign.findUnique({ where: { campaignId: payload.campaignId } });
      if (emergency) {
        await tx.emergencyCampaign.update({
          where: { campaignId: payload.campaignId },
          data: { currentAmount: { increment: payload.amount } },
        });
      }
    }

    return donation;
  });

  return result;
};

const getAllDonations = async (query?: {
  donorId?: string;
  campaignId?: string;
  projectId?: string;
  categoryId?: string;
  donationTypeId?: string;
  paymentStatus?: PaymentStatus;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (query?.donorId) {
    where.donorId = query.donorId;
  }

  if (query?.campaignId) {
    where.campaignId = query.campaignId;
  }

  if (query?.projectId) {
    where.projectId = query.projectId;
  }

  if (query?.categoryId) {
    where.categoryId = query.categoryId;
  }

  if (query?.donationTypeId) {
    where.donationTypeId = query.donationTypeId;
  }

  if (query?.paymentStatus) {
    where.paymentStatus = query.paymentStatus;
  }

  if (query?.search) {
    where.OR = [
      { donationNumber: { contains: query.search, mode: "insensitive" } },
      { message: { contains: query.search, mode: "insensitive" } },
      { donor: { fullName: { contains: query.search, mode: "insensitive" } } },
    ];
  }

  const [donations, total, totalAmount] = await Promise.all([
    prisma.donation.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        donor: { select: { id: true, fullName: true, email: true, profilePhoto: true } },
        campaign: { select: { id: true, title: true, campaignCode: true } },
        project: { select: { id: true, projectName: true, projectCode: true } },
        category: { select: { id: true, name: true } },
        donationType: { select: { id: true, name: true } },
      },
    }),
    prisma.donation.count({ where }),
    prisma.donation.aggregate({
      where: { ...where, paymentStatus: PaymentStatus.PAID },
      _sum: { amount: true },
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
      totalPaidAmount: totalAmount._sum.amount || 0,
    },
    data: donations,
  };
};

const getDonationById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Donation ID is required.");
  }

  const donation = await prisma.donation.findUnique({
    where: { id },
    include: {
      donor: { select: { id: true, fullName: true, email: true, phone: true } },
      campaign: true,
      project: true,
      category: true,
      donationType: true,
      items: { include: { fund: true } },
      payments: { include: { paymentGateway: true, transactions: true } },
      receipt: true,
      invoices: true,
    },
  });

  if (!donation) {
    throw new customError(status.NOT_FOUND, "Donation record not found.");
  }

  return donation;
};

const getDonationByNumber = async (donationNumber: string) => {
  if (!donationNumber) {
    throw new customError(status.BAD_REQUEST, "Donation number is required.");
  }

  const donation = await prisma.donation.findUnique({
    where: { donationNumber },
    include: {
      donor: { select: { id: true, fullName: true, email: true } },
      campaign: { select: { id: true, title: true, campaignCode: true } },
      project: { select: { id: true, projectName: true, projectCode: true } },
      category: true,
      donationType: true,
      receipt: true,
    },
  });

  if (!donation) {
    throw new customError(status.NOT_FOUND, "Donation record not found.");
  }

  return donation;
};

const updateDonation = async (id: string, payload: UpdateDonationPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Donation ID is required.");
  }

  const donation = await prisma.donation.findUnique({
    where: { id },
  });

  if (!donation) {
    throw new customError(status.NOT_FOUND, "Donation record not found.");
  }

  const oldStatus = donation.paymentStatus;
  const newStatus = payload.paymentStatus || oldStatus;

  const result = await prisma.$transaction(async (tx) => {
    const updatedDonation = await tx.donation.update({
      where: { id },
      data: {
        ...(payload.campaignId !== undefined && { campaignId: payload.campaignId }),
        ...(payload.projectId !== undefined && { projectId: payload.projectId }),
        ...(payload.donationTypeId !== undefined && { donationTypeId: payload.donationTypeId }),
        ...(payload.categoryId !== undefined && { categoryId: payload.categoryId }),
        ...(payload.amount !== undefined && { amount: payload.amount }),
        ...(payload.isAnonymous !== undefined && { isAnonymous: payload.isAnonymous }),
        ...(payload.message !== undefined && { message: payload.message }),
        ...(payload.paymentStatus && { paymentStatus: payload.paymentStatus }),
        ...(payload.status && { status: payload.status }),
      },
      include: {
        category: true,
        donationType: true,
      },
    });

    // Handle raise amount sync for campaign when paymentStatus transitions to/from PAID
    const targetCampaignId = payload.campaignId || donation.campaignId;
    if (targetCampaignId) {
      if (oldStatus !== PaymentStatus.PAID && newStatus === PaymentStatus.PAID) {
        await tx.campaign.update({
          where: { id: targetCampaignId },
          data: { raisedAmount: { increment: updatedDonation.amount } },
        });

        const emergency = await tx.emergencyCampaign.findUnique({ where: { campaignId: targetCampaignId } });
        if (emergency) {
          await tx.emergencyCampaign.update({
            where: { campaignId: targetCampaignId },
            data: { currentAmount: { increment: updatedDonation.amount } },
          });
        }
      } else if (oldStatus === PaymentStatus.PAID && newStatus !== PaymentStatus.PAID) {
        await tx.campaign.update({
          where: { id: targetCampaignId },
          data: { raisedAmount: { decrement: donation.amount } },
        });

        const emergency = await tx.emergencyCampaign.findUnique({ where: { campaignId: targetCampaignId } });
        if (emergency) {
          await tx.emergencyCampaign.update({
            where: { campaignId: targetCampaignId },
            data: { currentAmount: { decrement: donation.amount } },
          });
        }
      }
    }

    return updatedDonation;
  });

  return result;
};

const deleteDonation = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Donation ID is required.");
  }

  const donation = await prisma.donation.findUnique({
    where: { id },
    include: { _count: { select: { payments: true } } },
  });

  if (!donation) {
    throw new customError(status.NOT_FOUND, "Donation record not found.");
  }

  if (donation._count.payments > 0) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot delete donation record with existing payment transactions. Update status instead."
    );
  }

  await prisma.donation.delete({
    where: { id },
  });

  return { message: "Donation record deleted successfully." };
};

const getDonationStats = async () => {
  const [totalDonations, paidDonations, aggregate] = await Promise.all([
    prisma.donation.count(),
    prisma.donation.count({ where: { paymentStatus: PaymentStatus.PAID } }),
    prisma.donation.aggregate({
      where: { paymentStatus: PaymentStatus.PAID },
      _sum: { amount: true },
      _avg: { amount: true },
    }),
  ]);

  return {
    totalDonations,
    paidDonations,
    totalPaidAmount: aggregate._sum.amount || 0,
    averageDonationAmount: Number((aggregate._avg.amount || 0).toFixed(2)),
  };
};

export const masterDonationService = {
  createDonation,
  getAllDonations,
  getDonationById,
  getDonationByNumber,
  updateDonation,
  deleteDonation,
  getDonationStats,
};
