import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateOrganizationPayload {
  organizationName: string;
  shortName?: string;
  registrationNumber?: string;
  taxNumber?: string;
  foundationDate?: string | Date;
  logo?: string;
  website?: string;
  email?: string;
  phone?: string;
  status?: string;
}

export interface UpdateOrganizationPayload {
  organizationName?: string;
  shortName?: string;
  registrationNumber?: string;
  taxNumber?: string;
  foundationDate?: string | Date;
  logo?: string;
  website?: string;
  email?: string;
  phone?: string;
  status?: string;
}

const createOrganization = async (payload: CreateOrganizationPayload) => {
  if (!payload.organizationName) {
    throw new customError(status.BAD_REQUEST, "Organization name is required.");
  }

  if (payload.registrationNumber) {
    const existingReg = await prisma.organization.findUnique({
      where: { registrationNumber: payload.registrationNumber },
    });
    if (existingReg) {
      throw new customError(status.CONFLICT, "An organization with this registration number already exists.");
    }
  }

  if (payload.taxNumber) {
    const existingTax = await prisma.organization.findUnique({
      where: { taxNumber: payload.taxNumber },
    });
    if (existingTax) {
      throw new customError(status.CONFLICT, "An organization with this tax number already exists.");
    }
  }

  const organization = await prisma.organization.create({
    data: {
      organizationName: payload.organizationName,
      shortName: payload.shortName || null,
      registrationNumber: payload.registrationNumber || null,
      taxNumber: payload.taxNumber || null,
      foundationDate: payload.foundationDate ? new Date(payload.foundationDate) : null,
      logo: payload.logo || null,
      website: payload.website || null,
      email: payload.email || null,
      phone: payload.phone || null,
      status: payload.status || "ACTIVE",
    },
  });

  return organization;
};

const getOrganizationById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Organization ID is required.");
  }

  const organization = await prisma.organization.findUnique({
    where: { id },
    include: {
      profile: true,
      _count: {
        select: {
          branches: true,
        },
      },
    },
  });

  if (!organization) {
    throw new customError(status.NOT_FOUND, "Organization not found.");
  }

  return organization;
};

const getAllOrganizations = async (query?: {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (query?.status) {
    where.status = query.status;
  }

  if (query?.search) {
    where.OR = [
      { organizationName: { contains: query.search, mode: "insensitive" } },
      { shortName: { contains: query.search, mode: "insensitive" } },
      { registrationNumber: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const [organizations, total] = await Promise.all([
    prisma.organization.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        profile: true,
      },
    }),
    prisma.organization.count({ where }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: organizations,
  };
};

const updateOrganization = async (id: string, payload: UpdateOrganizationPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Organization ID is required.");
  }

  const organization = await prisma.organization.findUnique({
    where: { id },
  });

  if (!organization) {
    throw new customError(status.NOT_FOUND, "Organization not found.");
  }

  if (payload.registrationNumber && payload.registrationNumber !== organization.registrationNumber) {
    const existingReg = await prisma.organization.findUnique({
      where: { registrationNumber: payload.registrationNumber },
    });
    if (existingReg) {
      throw new customError(status.CONFLICT, "An organization with this registration number already exists.");
    }
  }

  if (payload.taxNumber && payload.taxNumber !== organization.taxNumber) {
    const existingTax = await prisma.organization.findUnique({
      where: { taxNumber: payload.taxNumber },
    });
    if (existingTax) {
      throw new customError(status.CONFLICT, "An organization with this tax number already exists.");
    }
  }

  const updatedOrganization = await prisma.organization.update({
    where: { id },
    data: {
      ...(payload.organizationName && { organizationName: payload.organizationName }),
      ...(payload.shortName !== undefined && { shortName: payload.shortName }),
      ...(payload.registrationNumber !== undefined && { registrationNumber: payload.registrationNumber }),
      ...(payload.taxNumber !== undefined && { taxNumber: payload.taxNumber }),
      ...(payload.foundationDate !== undefined && {
        foundationDate: payload.foundationDate ? new Date(payload.foundationDate) : null,
      }),
      ...(payload.logo !== undefined && { logo: payload.logo }),
      ...(payload.website !== undefined && { website: payload.website }),
      ...(payload.email !== undefined && { email: payload.email }),
      ...(payload.phone !== undefined && { phone: payload.phone }),
      ...(payload.status && { status: payload.status }),
    },
  });

  return updatedOrganization;
};

const deleteOrganization = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Organization ID is required.");
  }

  const organization = await prisma.organization.findUnique({
    where: { id },
  });

  if (!organization) {
    throw new customError(status.NOT_FOUND, "Organization not found.");
  }

  await prisma.organization.delete({
    where: { id },
  });

  return { message: "Organization deleted successfully." };
};

export const organizationService = {
  createOrganization,
  getOrganizationById,
  getAllOrganizations,
  updateOrganization,
  deleteOrganization,
};
