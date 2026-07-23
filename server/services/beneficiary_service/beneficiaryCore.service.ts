import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

const createBeneficiary = async (payload: any) => {
  const existingCode = await prisma.beneficiary.findUnique({
    where: { beneficiaryCode: payload.beneficiaryCode },
  });

  if (existingCode) {
    throw new customError(
      status.CONFLICT,
      `Beneficiary code '${payload.beneficiaryCode}' already exists`,
    );
  }

  return await prisma.beneficiary.create({
    data: {
      beneficiaryCode: payload.beneficiaryCode,
      fullName: payload.fullName,
      phone: payload.phone,
      nationalId: payload.nationalId,
      dateOfBirth: payload.dateOfBirth
        ? new Date(payload.dateOfBirth)
        : undefined,
      gender: payload.gender,
      branchId: payload.branchId,
      divisionId: payload.divisionId,
      districtId: payload.districtId,
      upazilaId: payload.upazilaId,
      unionId: payload.unionId,
      address: payload.address,
      status: payload.status,
    },
  });
};

const getAllBeneficiaries = async () => {
  return await prisma.beneficiary.findMany({ orderBy: { createdAt: "desc" } });
};

const createBeneficiaryProfile = async (payload: any) => {
  const existing = await prisma.beneficiaryProfile.findUnique({
    where: { beneficiaryId: payload.beneficiaryId },
  });

  if (existing) {
    throw new customError(
      status.CONFLICT,
      "Beneficiary profile already exists",
    );
  }

  return await prisma.beneficiaryProfile.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      occupation: payload.occupation,
      monthlyIncome: payload.monthlyIncome
        ? Number(payload.monthlyIncome)
        : 0.0,
      familySize: payload.familySize ? Number(payload.familySize) : 1,
      houseType: payload.houseType,
      education: payload.education,
      healthCondition: payload.healthCondition,
      specialNeeds: payload.specialNeeds,
    },
  });
};

const createFamilyMember = async (payload: any) => {
  return await prisma.familyMember.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      name: payload.name,
      relationship: payload.relationship,
      age: payload.age ? Number(payload.age) : undefined,
      occupation: payload.occupation,
      monthlyIncome: payload.monthlyIncome
        ? Number(payload.monthlyIncome)
        : 0.0,
    },
  });
};

const createBeneficiaryCategory = async (payload: any) => {
  const existing = await prisma.beneficiaryCategory.findUnique({
    where: { categoryName: payload.categoryName },
  });

  if (existing) {
    throw new customError(
      status.CONFLICT,
      `Category '${payload.categoryName}' already exists`,
    );
  }

  return await prisma.beneficiaryCategory.create({
    data: {
      categoryName: payload.categoryName,
      description: payload.description,
      priorityLevel: payload.priorityLevel,
      status: payload.status,
    },
  });
};

const createBeneficiaryDocument = async (payload: any) => {
  return await prisma.beneficiaryDocument.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      documentType: payload.documentType,
      documentNumber: payload.documentNumber,
      fileUrl: payload.fileUrl,
      verificationStatus: payload.verificationStatus,
    },
  });
};

const createBeneficiaryVerification = async (payload: any) => {
  return await prisma.reliefBeneficiaryVerification.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      verifiedBy: payload.verifiedBy,
      verificationMethod: payload.verificationMethod,
      remarks: payload.remarks,
      status: payload.status,
    },
  });
};

const createBeneficiaryNeedAssessment = async (payload: any) => {
  return await prisma.beneficiaryNeedAssessment.create({
    data: {
      beneficiaryId: payload.beneficiaryId,
      assessmentType: payload.assessmentType,
      requiredSupport: payload.requiredSupport,
      priority: payload.priority,
      assessedBy: payload.assessedBy,
    },
  });
};

export const beneficiaryCoreService = {
  createBeneficiary,
  getAllBeneficiaries,
  createBeneficiaryProfile,
  createFamilyMember,
  createBeneficiaryCategory,
  createBeneficiaryDocument,
  createBeneficiaryVerification,
  createBeneficiaryNeedAssessment,
};
