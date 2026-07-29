import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateOrganizationProfilePayload {
  organizationId: string;
  mission?: string;
  vision?: string;
  history?: string;
  chairmanName?: string;
  executiveDirector?: string;
  headOfficeAddress?: string;
  facebook?: string;
  youtube?: string;
  linkedin?: string;
}

export interface UpdateOrganizationProfilePayload {
  mission?: string;
  vision?: string;
  history?: string;
  chairmanName?: string;
  executiveDirector?: string;
  headOfficeAddress?: string;
  facebook?: string;
  youtube?: string;
  linkedin?: string;
}

const createOrganizationProfile = async (payload: CreateOrganizationProfilePayload) => {
  if (!payload.organizationId) {
    throw new customError(status.BAD_REQUEST, "Organization ID is required.");
  }

  const organization = await prisma.organization.findUnique({
    where: { id: payload.organizationId },
  });

  if (!organization) {
    throw new customError(status.NOT_FOUND, "Organization record not found.");
  }

  const profile = await prisma.organizationProfile.create({
    data: {
      organizationId: payload.organizationId,
      mission: payload.mission || null,
      vision: payload.vision || null,
      history: payload.history || null,
      chairmanName: payload.chairmanName || null,
      executiveDirector: payload.executiveDirector || null,
      headOfficeAddress: payload.headOfficeAddress || null,
      facebook: payload.facebook || null,
      youtube: payload.youtube || null,
      linkedin: payload.linkedin || null,
    },
    include: {
      organization: { select: { id: true, organizationName: true, shortName: true } },
    },
  });

  return profile;
};

const getOrganizationProfileById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Profile ID is required.");
  }

  const profile = await prisma.organizationProfile.findUnique({
    where: { id },
    include: {
      organization: true,
    },
  });

  if (!profile) {
    throw new customError(status.NOT_FOUND, "Organization profile not found.");
  }

  return profile;
};

const getOrganizationProfileByOrgId = async (organizationId: string) => {
  if (!organizationId) {
    throw new customError(status.BAD_REQUEST, "Organization ID is required.");
  }

  const profile = await prisma.organizationProfile.findFirst({
    where: { organizationId },
    include: {
      organization: true,
    },
  });

  if (!profile) {
    throw new customError(status.NOT_FOUND, "Organization profile not found for this organization.");
  }

  return profile;
};

const updateOrganizationProfile = async (id: string, payload: UpdateOrganizationProfilePayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Profile ID is required.");
  }

  const profile = await prisma.organizationProfile.findUnique({
    where: { id },
  });

  if (!profile) {
    throw new customError(status.NOT_FOUND, "Organization profile not found.");
  }

  const updatedProfile = await prisma.organizationProfile.update({
    where: { id },
    data: {
      ...(payload.mission !== undefined && { mission: payload.mission }),
      ...(payload.vision !== undefined && { vision: payload.vision }),
      ...(payload.history !== undefined && { history: payload.history }),
      ...(payload.chairmanName !== undefined && { chairmanName: payload.chairmanName }),
      ...(payload.executiveDirector !== undefined && { executiveDirector: payload.executiveDirector }),
      ...(payload.headOfficeAddress !== undefined && { headOfficeAddress: payload.headOfficeAddress }),
      ...(payload.facebook !== undefined && { facebook: payload.facebook }),
      ...(payload.youtube !== undefined && { youtube: payload.youtube }),
      ...(payload.linkedin !== undefined && { linkedin: payload.linkedin }),
    },
  });

  return updatedProfile;
};

const deleteOrganizationProfile = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Profile ID is required.");
  }

  const profile = await prisma.organizationProfile.findUnique({
    where: { id },
  });

  if (!profile) {
    throw new customError(status.NOT_FOUND, "Organization profile not found.");
  }

  await prisma.organizationProfile.delete({
    where: { id },
  });

  return { message: "Organization profile deleted successfully." };
};

export const organizationProfileService = {
  createOrganizationProfile,
  getOrganizationProfileById,
  getOrganizationProfileByOrgId,
  updateOrganizationProfile,
  deleteOrganizationProfile,
};
