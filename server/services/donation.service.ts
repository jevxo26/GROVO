import { prisma } from "../lib/prisma";

const processDonation = async (payload: {
  donorId: string;
  amount: number;
  campaignId?: string;
  paymentMethod: string;
  transactionId: string;
}) => {
  return await prisma.$transaction(async (tx: any) => {
    const donationNumber = `DN-${Date.now()}`;

    const donation = await tx.donation.create({
      data: {
        donationNumber,
        donorId: payload.donorId,
        amount: payload.amount,
        campaignId: payload.campaignId,
        donationTypeId: "SYSTEM_DIRECT",
        categoryId: "GENERAL_FUND",
        paymentStatus: "COMPLETED",
      },
    });

    await tx.payment.create({
      data: {
        donationId: donation.id,
        paymentMethod: payload.paymentMethod,
        amount: payload.amount,
        transactionId: payload.transactionId,
        paymentStatus: "SUCCESS",
        paymentGatewayId: "GATEWAY_PRIMARY",
      },
    });

    return donation;
  });
};

export const donationService = {
  processDonation,
};
