import { prisma } from "../lib/prisma";

const registerBeneficiary = async (payload: {
  fullName: string;
  phone?: string;
  nationalId?: string;
  branchId: string;
  occupation?: string;
  monthlyIncome?: number;
}) => {
  return await prisma.$transaction(async (tx: any) => {
    const beneficiaryCode = `BEN-${Date.now()}`;
    const beneficiary = await tx.beneficiary.create({
      data: {
        beneficiaryCode,
        fullName: payload.fullName,
        phone: payload.phone,
        nationalId: payload.nationalId,
        branchId: payload.branchId,
      },
    });

    await tx.beneficiaryProfile.create({
      data: {
        beneficiaryId: beneficiary.id,
        occupation: payload.occupation || "Unemployed",
        monthlyIncome: payload.monthlyIncome
          ? parseFloat(payload.monthlyIncome.toString())
          : 0,
      },
    });
    return beneficiary;
  });
};

const logNeedAssessment = async (payload: {
  beneficiaryId: string;
  assessmentType: string;
  priority: string;
  assessedBy: string;
  requiredSupport?: string;
}) => {
  return await prisma.beneficiaryNeedAssessment.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      assessmentType: payload.assessmentType,
      priority: payload.priority,
      assessedBy: payload.assessedBy,
      requiredSupport: payload.requiredSupport,
      assessmentDate: new Date(),
    },
  });
};

const verifyDistribution = async (distributionRecordId: string, verifiedBy: string) => {
  return await prisma.distributionVerification.create({
    data: {
      distributionRecordId,
      verificationMethod: "QR_OR_NID",
      verifiedBy,
      status: "VERIFIED",
    },
  });
};

const acknowledgeDistribution = async (
  distributionRecordId: string,
  payload: { signature?: string; photo?: string; remarks?: string }
) => {
  return await prisma.$transaction(async (tx: any) => {
    const ack = await tx.acknowledgement.create({
      data: {
        distributionRecordId,
        signature: payload.signature,
        photo: payload.photo,
        remarks: payload.remarks,
      },
    });

    await tx.distributionRecord.update({
      where: { id: distributionRecordId },
      data: { status: "DISBURSED" },
    });

    return ack;
  });
};

const createReliefPackage = async (payload: {
  packageName: string;
  description?: string;
  estimatedValue: number;
}) => {
  return await prisma.reliefPackage.create({
    data: {
      packageName: payload.packageName,
      description: payload.description,
      estimatedValue: payload.estimatedValue,
    },
  });
};

const createDistributionCampaign = async (payload: {
  campaignId: string;
  title: string;
  distributionDate: string;
  location?: string;
}) => {
  return await prisma.distributionCampaign.create({
    data: {
      campaignId: payload.campaignId,
      title: payload.title,
      distributionDate: new Date(payload.distributionDate),
    },
  });
};

const createFollowUpVisit = async (
  beneficiaryId: string,
  payload: { visitedBy: string; remarks?: string; nextVisitDate?: string }
) => {
  return await prisma.followUpVisit.create({
    data: {
      beneficiaryId,
      visitedBy: payload.visitedBy,
      remarks: payload.remarks,
      nextVisitDate: payload.nextVisitDate ? new Date(payload.nextVisitDate) : null,
      visitDate: new Date(),
      status: "COMPLETED",
    },
  });
};

const getBeneficiaryDetail = async (beneficiaryId: string) => {
  return await prisma.beneficiary.findUnique({
    where: { id: beneficiaryId },
    include: {
      profile: true,
      needAssessments: true,
      distributionRecords: {
        include: {
          package: true,
          verifications: true,
          acknowledgements: true,
        },
      },
      followUps: true,
    },
  });
};

export const beneficiaryService = {
  registerBeneficiary,
  logNeedAssessment,
  verifyDistribution,
  acknowledgeDistribution,
  createReliefPackage,
  createDistributionCampaign,
  createFollowUpVisit,
  getBeneficiaryDetail,
};
