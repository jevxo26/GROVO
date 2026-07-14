import { prisma } from "../lib/prisma";

const processDonation = async (payload: {
  donorId: string;
  amount: number;
  campaignId?: string;
  projectId?: string;
  paymentMethod: string;
  transactionId: string;
  currency?: string;
  isAnonymous?: boolean;
  message?: string;
}) => {
  return await prisma.$transaction(async (tx: any) => {
    // Ensure donation type exists
    const dt = await tx.donationType.upsert({
      where: { id: "SYSTEM_DIRECT" },
      update: {},
      create: { id: "SYSTEM_DIRECT", name: "Direct System Donation", description: "Direct online donation" },
    });

    // Ensure category exists
    const cat = await tx.donationCategory.upsert({
      where: { id: "GENERAL_FUND" },
      update: {},
      create: { id: "GENERAL_FUND", name: "General Fund", description: "General pool for all charity ops" },
    });

    // Ensure gateway exists
    const gw = await tx.paymentGateway.upsert({
      where: { id: "GATEWAY_PRIMARY" },
      update: {},
      create: {
        id: "GATEWAY_PRIMARY",
        gatewayName: "SSLCommerz",
        merchantId: "ssl_merchant_123",
        apiKey: "ssl_api_key_123",
        secretKey: "ssl_secret_key_123",
        environment: "SANDBOX",
        status: "ACTIVE",
      },
    });

    const donationNumber = `DN-${Date.now()}`;

    const donation = await tx.donation.create({
      data: {
        donationNumber,
        donorId: payload.donorId,
        campaignId: payload.campaignId,
        projectId: payload.projectId,
        donationTypeId: dt.id,
        categoryId: cat.id,
        amount: payload.amount,
        currency: payload.currency || "BDT",
        isAnonymous: payload.isAnonymous || false,
        message: payload.message,
        paymentStatus: "COMPLETED",
        status: "ACTIVE",
      },
    });

    const payment = await tx.payment.create({
      data: {
        donationId: donation.id,
        paymentMethod: payload.paymentMethod,
        paymentGatewayId: gw.id,
        amount: payload.amount,
        currency: payload.currency || "BDT",
        transactionId: payload.transactionId,
        paymentStatus: "SUCCESS",
        paidAt: new Date(),
      },
    });

    await tx.donationReceipt.create({
      data: {
        donationId: donation.id,
        receiptNumber: `REC-${Date.now()}`,
        receiptUrl: `https://ashray.org/receipts/${donation.id}.pdf`,
      },
    });

    // Generate Invoice
    await tx.invoice.create({
      data: {
        invoiceNumber: `INV-${Date.now()}`,
        donationId: donation.id,
        donorId: payload.donorId,
        amount: payload.amount,
        tax: 0,
        totalAmount: payload.amount,
        invoiceUrl: `https://ashray.org/invoices/${donation.id}.pdf`,
        status: "PAID",
      },
    });

    // Increment wallet balance
    const wallet = await tx.donorWallet.findUnique({ where: { donorId: payload.donorId } });
    if (wallet) {
      await tx.donorWallet.update({
        where: { id: wallet.id },
        data: {
          balance: { increment: payload.amount },
          totalDonated: { increment: payload.amount },
        },
      });

      await tx.donorTransaction.create({
        data: {
          walletId: wallet.id,
          transactionType: "DONATION",
          amount: payload.amount,
          referenceNo: donationNumber,
          description: `Donation of ${payload.amount} ${payload.currency || "BDT"} processed successfully.`,
        },
      });
    }

    return donation;
  });
};

const handlePaymentWebhook = async (gateway: string, payload: any) => {
  const transactionId = payload.tran_id || payload.transactionId;
  const status = payload.status || "SUCCESS";

  const payment = await prisma.payment.findUnique({
    where: { transactionId },
    include: { donation: true },
  });

  if (!payment) throw new Error("PAYMENT_NOT_FOUND");

  await prisma.$transaction(async (tx: any) => {
    await tx.payment.update({
      where: { id: payment.id },
      data: {
        paymentStatus: status === "VALID" || status === "SUCCESS" ? "SUCCESS" : "FAILED",
        paidAt: new Date(),
      },
    });

    await tx.paymentWebhook.create({
      data: {
        paymentId: payment.id,
        gateway,
        payload: JSON.stringify(payload),
        verificationStatus: "VERIFIED",
      },
    });
  });

  return payment;
};

const getMyDonations = async (donorId: string) => {
  return await prisma.donation.findMany({
    where: { donorId },
    include: {
      payments: true,
      receipts: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

const getReceipt = async (donationId: string) => {
  return await prisma.donationReceipt.findFirst({
    where: { donationId },
  });
};

const requestRefund = async (donationId: string, payload: { reason?: string }) => {
  const payment = await prisma.payment.findFirst({
    where: { donationId },
  });

  if (!payment) throw new Error("PAYMENT_NOT_FOUND");

  return await prisma.refund.create({
    data: {
      paymentId: payment.id,
      refundAmount: payment.amount,
      refundReason: payload.reason,
      refundStatus: "PENDING",
    },
  });
};

const getPaymentGateways = async () => {
  return await prisma.paymentGateway.findMany({
    where: { status: "ACTIVE" },
  });
};

const createSettlement = async (payload: {
  gatewayId: string;
  totalCollected: number;
  processingFee: number;
}) => {
  const netAmount = payload.totalCollected - payload.processingFee;
  return await prisma.settlement.create({
    data: {
      paymentGatewayId: payload.gatewayId,
      totalCollected: payload.totalCollected,
      processingFee: payload.processingFee,
      netAmount,
      settlementDate: new Date(),
      status: "COMPLETED",
    },
  });
};

export const donationService = {
  processDonation,
  handlePaymentWebhook,
  getMyDonations,
  getReceipt,
  requestRefund,
  getPaymentGateways,
  createSettlement,
};
