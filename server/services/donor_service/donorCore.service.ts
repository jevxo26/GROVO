import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

// ==================== 1. DONOR SERVICES ====================
const createDonor = async (payload: any) => {
  if (!payload.userId || !payload.donorCode) {
    throw new customError(status.BAD_REQUEST, "userId and donorCode are required.");
  }

  const existingCode = await prisma.donor.findUnique({
    where: { donorCode: payload.donorCode },
  });
  if (existingCode) {
    throw new customError(
      status.CONFLICT,
      `Donor code '${payload.donorCode}' already exists`
    );
  }

  return await prisma.donor.create({
    data: {
      userId: payload.userId,
      donorCode: payload.donorCode,
      donorType: payload.donorType || "INDIVIDUAL",
      membershipId: payload.membershipId || null,
      registrationDate: payload.registrationDate
        ? new Date(payload.registrationDate)
        : new Date(),
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllDonors = async (query?: { donorType?: string; status?: string; search?: string }) => {
  const where: any = {};
  if (query?.donorType) where.donorType = query.donorType;
  if (query?.status) where.status = query.status;
  if (query?.search) {
    where.donorCode = { contains: query.search, mode: "insensitive" };
  }

  return await prisma.donor.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getDonorById = async (id: string) => {
  const donor = await prisma.donor.findUnique({ where: { id } });
  if (!donor) {
    throw new customError(status.NOT_FOUND, "Donor not found.");
  }
  return donor;
};

const updateDonor = async (id: string, payload: any) => {
  const donor = await prisma.donor.findUnique({ where: { id } });
  if (!donor) {
    throw new customError(status.NOT_FOUND, "Donor not found.");
  }

  if (payload.donorCode && payload.donorCode !== donor.donorCode) {
    const existing = await prisma.donor.findUnique({ where: { donorCode: payload.donorCode } });
    if (existing) {
      throw new customError(status.CONFLICT, `Donor code '${payload.donorCode}' already exists`);
    }
  }

  return await prisma.donor.update({
    where: { id },
    data: {
      ...(payload.donorCode && { donorCode: payload.donorCode }),
      ...(payload.donorType && { donorType: payload.donorType }),
      ...(payload.membershipId !== undefined && { membershipId: payload.membershipId }),
      ...(payload.registrationDate && { registrationDate: new Date(payload.registrationDate) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteDonor = async (id: string) => {
  const donor = await prisma.donor.findUnique({ where: { id } });
  if (!donor) {
    throw new customError(status.NOT_FOUND, "Donor not found.");
  }
  await prisma.donor.delete({ where: { id } });
  return { message: "Donor deleted successfully." };
};


// ==================== 2. INDIVIDUAL DONOR SERVICES ====================
const createIndividualDonor = async (payload: any) => {
  if (!payload.donorId) {
    throw new customError(status.BAD_REQUEST, "donorId is required.");
  }

  const existing = await prisma.individualDonor.findUnique({
    where: { donorId: payload.donorId },
  });
  if (existing) {
    throw new customError(status.CONFLICT, "Individual profile already exists for this donor.");
  }

  return await prisma.individualDonor.create({
    data: {
      donorId: payload.donorId,
      profession: payload.profession || null,
      organization: payload.organization || null,
      monthlyCommitment: payload.monthlyCommitment
        ? Number(payload.monthlyCommitment)
        : 0.0,
      preferredCampaign: payload.preferredCampaign || null,
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllIndividualDonors = async (query?: { status?: string; search?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;
  if (query?.search) {
    where.OR = [
      { profession: { contains: query.search, mode: "insensitive" } },
      { organization: { contains: query.search, mode: "insensitive" } },
    ];
  }

  return await prisma.individualDonor.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getIndividualDonorById = async (id: string) => {
  const item = await prisma.individualDonor.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Individual donor profile not found.");
  }
  return item;
};

const updateIndividualDonor = async (id: string, payload: any) => {
  const item = await prisma.individualDonor.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Individual donor profile not found.");
  }

  return await prisma.individualDonor.update({
    where: { id },
    data: {
      ...(payload.profession !== undefined && { profession: payload.profession }),
      ...(payload.organization !== undefined && { organization: payload.organization }),
      ...(payload.monthlyCommitment !== undefined && { monthlyCommitment: Number(payload.monthlyCommitment) }),
      ...(payload.preferredCampaign !== undefined && { preferredCampaign: payload.preferredCampaign }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteIndividualDonor = async (id: string) => {
  const item = await prisma.individualDonor.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Individual donor profile not found.");
  }
  await prisma.individualDonor.delete({ where: { id } });
  return { message: "Individual donor profile deleted successfully." };
};


// ==================== 3. CORPORATE DONOR SERVICES ====================
const createCorporateDonor = async (payload: any) => {
  if (!payload.donorId || !payload.companyName || !payload.contactPerson) {
    throw new customError(status.BAD_REQUEST, "donorId, companyName, and contactPerson are required.");
  }

  const existing = await prisma.corporateDonor.findUnique({
    where: { donorId: payload.donorId },
  });
  if (existing) {
    throw new customError(status.CONFLICT, "Corporate profile already exists for this donor.");
  }

  return await prisma.corporateDonor.create({
    data: {
      donorId: payload.donorId,
      companyName: payload.companyName,
      companyRegistrationNo: payload.companyRegistrationNo || null,
      tradeLicense: payload.tradeLicense || null,
      contactPerson: payload.contactPerson,
      designation: payload.designation || null,
      website: payload.website || null,
      logo: payload.logo || null,
      monthlyCommitment: payload.monthlyCommitment
        ? Number(payload.monthlyCommitment)
        : 0.0,
      status: payload.status || "ACTIVE",
    },
  });
};

const getAllCorporateDonors = async (query?: { status?: string; search?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;
  if (query?.search) {
    where.OR = [
      { companyName: { contains: query.search, mode: "insensitive" } },
      { contactPerson: { contains: query.search, mode: "insensitive" } },
    ];
  }

  return await prisma.corporateDonor.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getCorporateDonorById = async (id: string) => {
  const item = await prisma.corporateDonor.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Corporate donor profile not found.");
  }
  return item;
};

const updateCorporateDonor = async (id: string, payload: any) => {
  const item = await prisma.corporateDonor.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Corporate donor profile not found.");
  }

  return await prisma.corporateDonor.update({
    where: { id },
    data: {
      ...(payload.companyName && { companyName: payload.companyName }),
      ...(payload.companyRegistrationNo !== undefined && { companyRegistrationNo: payload.companyRegistrationNo }),
      ...(payload.tradeLicense !== undefined && { tradeLicense: payload.tradeLicense }),
      ...(payload.contactPerson && { contactPerson: payload.contactPerson }),
      ...(payload.designation !== undefined && { designation: payload.designation }),
      ...(payload.website !== undefined && { website: payload.website }),
      ...(payload.logo !== undefined && { logo: payload.logo }),
      ...(payload.monthlyCommitment !== undefined && { monthlyCommitment: Number(payload.monthlyCommitment) }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteCorporateDonor = async (id: string) => {
  const item = await prisma.corporateDonor.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Corporate donor profile not found.");
  }
  await prisma.corporateDonor.delete({ where: { id } });
  return { message: "Corporate donor profile deleted successfully." };
};


// ==================== 4. DONOR ORGANIZATION SERVICES ====================
const createDonorOrganization = async (payload: any) => {
  if (!payload.corporateDonorId) {
    throw new customError(status.BAD_REQUEST, "corporateDonorId is required.");
  }

  const existing = await prisma.donorOrganization.findUnique({
    where: { corporateDonorId: payload.corporateDonorId },
  });
  if (existing) {
    throw new customError(
      status.CONFLICT,
      "Organization details already exist for this corporate donor."
    );
  }

  return await prisma.donorOrganization.create({
    data: {
      corporateDonorId: payload.corporateDonorId,
      industry: payload.industry || null,
      companySize: payload.companySize || null,
      employeeCount: payload.employeeCount
        ? Number(payload.employeeCount)
        : null,
      address: payload.address || null,
      city: payload.city || null,
      country: payload.country || null,
    },
  });
};

const getAllDonorOrganizations = async (query?: { industry?: string; country?: string }) => {
  const where: any = {};
  if (query?.industry) where.industry = query.industry;
  if (query?.country) where.country = query.country;

  return await prisma.donorOrganization.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getDonorOrganizationById = async (id: string) => {
  const item = await prisma.donorOrganization.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor organization details not found.");
  }
  return item;
};

const updateDonorOrganization = async (id: string, payload: any) => {
  const item = await prisma.donorOrganization.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor organization details not found.");
  }

  return await prisma.donorOrganization.update({
    where: { id },
    data: {
      ...(payload.industry !== undefined && { industry: payload.industry }),
      ...(payload.companySize !== undefined && { companySize: payload.companySize }),
      ...(payload.employeeCount !== undefined && { employeeCount: payload.employeeCount ? Number(payload.employeeCount) : null }),
      ...(payload.address !== undefined && { address: payload.address }),
      ...(payload.city !== undefined && { city: payload.city }),
      ...(payload.country !== undefined && { country: payload.country }),
    },
  });
};

const deleteDonorOrganization = async (id: string) => {
  const item = await prisma.donorOrganization.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor organization details not found.");
  }
  await prisma.donorOrganization.delete({ where: { id } });
  return { message: "Donor organization details deleted successfully." };
};


export const donorCoreService = {
  // Donor
  createDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
  // IndividualDonor
  createIndividualDonor,
  getAllIndividualDonors,
  getIndividualDonorById,
  updateIndividualDonor,
  deleteIndividualDonor,
  // CorporateDonor
  createCorporateDonor,
  getAllCorporateDonors,
  getCorporateDonorById,
  updateCorporateDonor,
  deleteCorporateDonor,
  // DonorOrganization
  createDonorOrganization,
  getAllDonorOrganizations,
  getDonorOrganizationById,
  updateDonorOrganization,
  deleteDonorOrganization,
};
