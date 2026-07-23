import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

const createDistributionRecord = async (payload: any) => {
  return await prisma.distributionRecord.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      distributionCampaignId: payload.distributionCampaignId,
      packageId: payload.packageId,
      distributedBy: payload.distributedBy,
      receivedAt: payload.receivedAt ? new Date(payload.receivedAt) : undefined,
      status: payload.status,
    },
  });
};

const createDistributionItem = async (payload: any) => {
  return await prisma.distributionItem.create({
    data: {
      distributionRecordId: payload.distributionRecordId,
      reliefItemId: payload.reliefItemId,
      quantity: Number(payload.quantity),
      remarks: payload.remarks,
    },
  });
};

const createDistributionVerification = async (payload: any) => {
  return await prisma.distributionVerification.create({
    data: {
      distributionRecordId: payload.distributionRecordId,
      verificationMethod: payload.verificationMethod,
      verifiedBy: payload.verifiedBy,
      status: payload.status,
    },
  });
};

const createAcknowledgement = async (payload: any) => {
  const existing = await prisma.acknowledgement.findUnique({
    where: { distributionRecordId: payload.distributionRecordId },
  });

  if (existing) {
    throw new customError(
      status.CONFLICT,
      "Acknowledgement already submitted for this record",
    );
  }

  return await prisma.acknowledgement.create({
    data: {
      distributionRecordId: payload.distributionRecordId,
      signature: payload.signature,
      photo: payload.photo,
      remarks: payload.remarks,
    },
  });
};

const createBeneficiaryFeedback = async (payload: any) => {
  return await prisma.beneficiaryFeedback.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      distributionRecordId: payload.distributionRecordId,
      rating: payload.rating ? Number(payload.rating) : 5,
      feedback: payload.feedback,
    },
  });
};

const createFollowUpVisit = async (payload: any) => {
  return await prisma.followUpVisit.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      visitedBy: payload.visitedBy,
      remarks: payload.remarks,
      nextVisitDate: payload.nextVisitDate
        ? new Date(payload.nextVisitDate)
        : undefined,
      status: payload.status,
    },
  });
};

const createCaseHistory = async (payload: any) => {
  return await prisma.caseHistory.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      caseType: payload.caseType,
      description: payload.description,
      assignedOfficer: payload.assignedOfficer,
      status: payload.status,
    },
  });
};

const createBeneficiaryActivityLog = async (payload: any) => {
  return await prisma.beneficiaryActivityLog.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      activity: payload.activity,
      description: payload.description,
      performedBy: payload.performedBy,
    },
  });
};

export const beneficiaryDistributionService = {
  createDistributionRecord,
  createDistributionItem,
  createDistributionVerification,
  createAcknowledgement,
  createBeneficiaryFeedback,
  createFollowUpVisit,
  createCaseHistory,
  createBeneficiaryActivityLog,
};
