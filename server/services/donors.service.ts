import { prisma } from "../lib/prisma";

const registerDonor = async (payload: {
  userId: string;
  profession?: string;
  organization?: string;
  monthlyCommitment?: number;
  preferredCampaign?: string;
}) => {
  return await prisma.$transaction(async (tx: any) => {
    // Check if user is already a donor
    const existing = await tx.donor.findUnique({
      where: { userId: payload.userId },
    });
    if (existing) throw new Error("DONOR_ALREADY_REGISTERED");

    const donorCode = `D-${Date.now()}`;
    const donor = await tx.donor.create({
      data: {
        userId: payload.userId,
        donorCode,
        donorType: "individual",
        status: "ACTIVE",
      },
    });

    await tx.individualDonor.create({
      data: {
        donorId: donor.id,
        profession: payload.profession,
        organization: payload.organization,
        monthlyCommitment: payload.monthlyCommitment || 0,
        preferredCampaign: payload.preferredCampaign,
        status: "ACTIVE",
      },
    });

    await tx.donorWallet.create({
      data: {
        donorId: donor.id,
        balance: 0,
        totalDonated: 0,
        rewardPoints: 0,
        status: "ACTIVE",
      },
    });

    await tx.donorPreference.create({
      data: {
        donorId: donor.id,
        anonymousDonation: false,
        emailNotification: true,
        smsNotification: true,
        pushNotification: true,
      },
    });

    return donor;
  });
};

const registerCorporateDonor = async (payload: {
  userId: string;
  companyName: string;
  companyRegistrationNo?: string;
  tradeLicense?: string;
  contactPerson?: string;
  designation?: string;
  website?: string;
  logo?: string;
  monthlyCommitment?: number;
  industry?: string;
  companySize?: string;
  employeeCount?: number;
  address?: string;
  city?: string;
  country?: string;
}) => {
  return await prisma.$transaction(async (tx: any) => {
    // Check if user is already a donor
    const existing = await tx.donor.findUnique({
      where: { userId: payload.userId },
    });
    if (existing) throw new Error("DONOR_ALREADY_REGISTERED");

    const donorCode = `D-CORP-${Date.now()}`;
    const donor = await tx.donor.create({
      data: {
        userId: payload.userId,
        donorCode,
        donorType: "corporate",
        status: "ACTIVE",
      },
    });

    const corporateProfile = await tx.corporateDonor.create({
      data: {
        donorId: donor.id,
        companyName: payload.companyName,
        companyRegistrationNo: payload.companyRegistrationNo,
        tradeLicense: payload.tradeLicense,
        contactPerson: payload.contactPerson,
        designation: payload.designation,
        website: payload.website,
        logo: payload.logo,
        monthlyCommitment: payload.monthlyCommitment || 0,
        status: "ACTIVE",
      },
    });

    await tx.donorOrganization.create({
      data: {
        corporateDonorId: corporateProfile.id,
        industry: payload.industry,
        companySize: payload.companySize,
        employeeCount: payload.employeeCount || 0,
        address: payload.address,
        city: payload.city,
        country: payload.country,
      },
    });

    await tx.donorWallet.create({
      data: {
        donorId: donor.id,
        balance: 0,
        totalDonated: 0,
        rewardPoints: 0,
        status: "ACTIVE",
      },
    });

    await tx.donorPreference.create({
      data: {
        donorId: donor.id,
        anonymousDonation: false,
        emailNotification: true,
        smsNotification: true,
        pushNotification: true,
      },
    });

    return donor;
  });
};

const createSubscription = async (payload: {
  donorId: string;
  subscriptionType: string;
  amount: number;
  billingCycle: string;
}) => {
  const nextBillingDate = new Date();
  if (payload.billingCycle === "MONTHLY") {
    nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
  } else if (payload.billingCycle === "YEARLY") {
    nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1);
  }

  return await prisma.donorSubscription.create({
    data: {
      donorId: payload.donorId,
      subscriptionType: payload.subscriptionType,
      amount: payload.amount,
      billingCycle: payload.billingCycle,
      nextBillingDate,
      status: "ACTIVE",
    },
  });
};

const getSubscriptions = async (donorId: string) => {
  return await prisma.donorSubscription.findMany({
    where: { donorId },
    orderBy: { createdAt: "desc" },
  });
};

const createCommitment = async (payload: {
  donorId: string;
  campaignId?: string;
  pledgedAmount: number;
}) => {
  return await prisma.donationCommitment.create({
    data: {
      donorId: payload.donorId,
      campaignId: payload.campaignId,
      pledgedAmount: payload.pledgedAmount,
      remainingAmount: payload.pledgedAmount,
      status: "PENDING",
    },
  });
};

const getWallet = async (donorId: string) => {
  return await prisma.donorWallet.findUnique({
    where: { donorId },
    include: {
      transactions: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  });
};

const getRecognitions = async (donorId: string) => {
  const [badges, certificates] = await Promise.all([
    prisma.donorBadge.findMany({ where: { donorId } }),
    prisma.donorCertificate.findMany({ where: { donorId } }),
  ]);
  return { badges, certificates };
};

const updatePreferences = async (
  donorId: string,
  payload: {
    preferredCategory?: string;
    preferredCampaign?: string;
    anonymousDonation?: boolean;
    emailNotification?: boolean;
    smsNotification?: boolean;
    pushNotification?: boolean;
  }
) => {
  return await prisma.donorPreference.update({
    where: { donorId },
    data: {
      preferredCategory: payload.preferredCategory,
      preferredCampaign: payload.preferredCampaign,
      anonymousDonation: payload.anonymousDonation,
      emailNotification: payload.emailNotification,
      smsNotification: payload.smsNotification,
      pushNotification: payload.pushNotification,
    },
  });
};

const getCsrReport = async (donorId: string) => {
  const wallet = await prisma.donorWallet.findUnique({ where: { donorId } });
  const commitments = await prisma.donationCommitment.findMany({ where: { donorId } });
  const certificates = await prisma.donorCertificate.findMany({ where: { donorId } });

  const totalCommitted = commitments.reduce((acc, curr) => acc + curr.pledgedAmount, 0);
  const totalPaid = commitments.reduce((acc, curr) => acc + curr.paidAmount, 0);

  return {
    totalDonated: wallet?.totalDonated || 0,
    totalCommitted,
    totalPaid,
    remainingCommitment: totalCommitted - totalPaid,
    certificatesCount: certificates.length,
    reportDate: new Date(),
  };
};

const listDonors = async (query: { page?: number; limit?: number; status?: string }) => {
  const page = query.page || 1;
  const limit = query.limit || 20;
  const skip = (page - 1) * limit;

  const where: any = {};
  if (query.status) where.status = query.status;

  const [donors, total] = await Promise.all([
    prisma.donor.findMany({
      where,
      skip,
      take: limit,
      include: {
        user: { select: { name: true, email: true } },
        individualProfile: true,
        corporateProfile: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.donor.count({ where }),
  ]);

  return { data: donors, meta: { page, limit, total } };
};

export const donorsService = {
  registerDonor,
  registerCorporateDonor,
  createSubscription,
  getSubscriptions,
  createCommitment,
  getWallet,
  getRecognitions,
  updatePreferences,
  getCsrReport,
  listDonors,
};
