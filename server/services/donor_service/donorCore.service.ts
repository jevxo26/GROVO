import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

const createDonor = async (payload: any) => {
  const existingCode = await prisma.donor.findUnique({
    where: { donorCode: payload.donorCode },
  });
  if (existingCode) {
    throw new customError(
      status.CONFLICT,
      `Donor code '${payload.donorCode}' exists`,
    );
  }
  return await prisma.donor.create({
    data: {
      userId: payload.userId,
      donorCode: payload.donorCode,
      donorType: payload.donorType,
      membershipId: payload.membershipId,
      registrationDate: payload.registrationDate
        ? new Date(payload.registrationDate)
        : undefined,
      status: payload.status,
    },
  });
};

const getAllDonors = async () =>
  prisma.donor.findMany({ orderBy: { createdAt: "desc" } });

const createIndividualDonor = async (payload: any) => {
  const existing = await prisma.individualDonor.findUnique({
    where: { donorId: payload.donorId },
  });
  if (existing)
    throw new customError(status.CONFLICT, "Individual profile already exists");
  return await prisma.individualDonor.create({
    data: {
      donorId: payload.donorId,
      profession: payload.profession,
      organization: payload.organization,
      monthlyCommitment: payload.monthlyCommitment
        ? Number(payload.monthlyCommitment)
        : 0.0,
      preferredCampaign: payload.preferredCampaign,
      status: payload.status,
    },
  });
};

const createCorporateDonor = async (payload: any) => {
  const existing = await prisma.corporateDonor.findUnique({
    where: { donorId: payload.donorId },
  });
  if (existing)
    throw new customError(status.CONFLICT, "Corporate profile already exists");
  return await prisma.corporateDonor.create({
    data: {
      donorId: payload.donorId,
      companyName: payload.companyName,
      companyRegistrationNo: payload.companyRegistrationNo,
      tradeLicense: payload.tradeLicense,
      contactPerson: payload.contactPerson,
      designation: payload.designation,
      website: payload.website,
      logo: payload.logo,
      monthlyCommitment: payload.monthlyCommitment
        ? Number(payload.monthlyCommitment)
        : 0.0,
      status: payload.status,
    },
  });
};

const createDonorOrganization = async (payload: any) => {
  const existing = await prisma.donorOrganization.findUnique({
    where: { corporateDonorId: payload.corporateDonorId },
  });
  if (existing)
    throw new customError(
      status.CONFLICT,
      "Organization details already exist",
    );
  return await prisma.donorOrganization.create({
    data: {
      corporateDonorId: payload.corporateDonorId,
      industry: payload.industry,
      companySize: payload.companySize,
      employeeCount: payload.employeeCount
        ? Number(payload.employeeCount)
        : undefined,
      address: payload.address,
      city: payload.city,
      country: payload.country,
    },
  });
};

export const donorCoreService = {
  createDonor,
  getAllDonors,
  createIndividualDonor,
  createCorporateDonor,
  createDonorOrganization,
};
