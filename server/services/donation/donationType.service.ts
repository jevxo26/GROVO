import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateDonationTypePayload {
  name: string;
  description?: string;
  status?: string;
}

export interface UpdateDonationTypePayload {
  name?: string;
  description?: string;
  status?: string;
}

const createDonationType = async (payload: CreateDonationTypePayload) => {
  if (!payload.name) {
    throw new customError(status.BAD_REQUEST, "Donation type name is required.");
  }

  const existing = await prisma.donationType.findUnique({
    where: { name: payload.name },
  });

  if (existing) {
    throw new customError(status.CONFLICT, "Donation type with this name already exists.");
  }

  const donationType = await prisma.donationType.create({
    data: {
      name: payload.name,
      description: payload.description || null,
      status: payload.status || "ACTIVE",
    },
  });

  return donationType;
};

const getAllDonationTypes = async (query?: { status?: string; search?: string }) => {
  const where: any = {};

  if (query?.status) {
    where.status = query.status;
  }

  if (query?.search) {
    where.name = {
      contains: query.search,
      mode: "insensitive",
    };
  }

  const donationTypes = await prisma.donationType.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { donations: true, schedules: true },
      },
    },
  });

  return donationTypes;
};

const getDonationTypeById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Donation type ID is required.");
  }

  const donationType = await prisma.donationType.findUnique({
    where: { id },
    include: {
      _count: {
        select: { donations: true, schedules: true },
      },
    },
  });

  if (!donationType) {
    throw new customError(status.NOT_FOUND, "Donation type not found.");
  }

  return donationType;
};

const updateDonationType = async (id: string, payload: UpdateDonationTypePayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Donation type ID is required.");
  }

  const donationType = await prisma.donationType.findUnique({
    where: { id },
  });

  if (!donationType) {
    throw new customError(status.NOT_FOUND, "Donation type not found.");
  }

  if (payload.name && payload.name !== donationType.name) {
    const existing = await prisma.donationType.findUnique({
      where: { name: payload.name },
    });
    if (existing) {
      throw new customError(status.CONFLICT, "Donation type with this name already exists.");
    }
  }

  const updatedType = await prisma.donationType.update({
    where: { id },
    data: {
      ...(payload.name && { name: payload.name }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.status && { status: payload.status }),
    },
  });

  return updatedType;
};

const deleteDonationType = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Donation type ID is required.");
  }

  const donationType = await prisma.donationType.findUnique({
    where: { id },
    include: { _count: { select: { donations: true, schedules: true } } },
  });

  if (!donationType) {
    throw new customError(status.NOT_FOUND, "Donation type not found.");
  }

  if (donationType._count.donations > 0 || donationType._count.schedules > 0) {
    throw new customError(
      status.BAD_REQUEST,
      "Cannot delete donation type that is in use by active donations or schedules."
    );
  }

  await prisma.donationType.delete({
    where: { id },
  });

  return { message: "Donation type deleted successfully." };
};

export const donationTypeService = {
  createDonationType,
  getAllDonationTypes,
  getDonationTypeById,
  updateDonationType,
  deleteDonationType,
};
