import { prisma } from "../lib/prisma";

const registerBeneficiary = async (payload: {
  fullName: string;
  phone?: string;
  nationalId?: string;
  branchId: string;
  occupation?: string;
  monthlyIncome?: number;
}) => {
  return await prisma.$transaction(async (tx) => {
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
}) => {
  return await prisma.beneficiaryNeedAssessment.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      assessmentType: payload.assessmentType,
      priority: payload.priority,
      assessedBy: payload.assessedBy,
      assessmentDate: new Date(),
    },
  });
};

export const beneficiaryService = {
  registerBeneficiary,
  logNeedAssessment,
};
