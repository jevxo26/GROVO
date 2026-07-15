import { CMSPage, SuccessStory } from "../../generated/prisma/browser";
import { prisma } from "../lib/prisma";

const createPage = async (payload: {
  title: string;
  slug: string;
  content?: string;
  metaTitle?: string;
  metaDesc?: string;
  template?: string;
}) => {
  // Slug validation: lowercase, no spaces/special chars except hyphens
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(payload.slug)) {
    throw new Error("Slug must be lowercase alphanumeric characters and hyphens only, and cannot start or end with a hyphen.");
  }

  // Slug uniqueness check
  const existing = await prisma.cMSPage.findUnique({
    where: { slug: payload.slug },
  });
  if (existing) {
    throw new Error("A page with this slug already exists.");
  }

  return await prisma.cMSPage.create({
    data: {
      title: payload.title,
      slug: payload.slug,
      content: payload.content || "",
      metaTitle: payload.metaTitle,
      metaDesc: payload.metaDesc,
      template: payload.template,
      status: "DRAFT",
    },
  });
};

const publishImpactStory = async (payload: {
  title: string;
  slug: string;
  content: string;
  beneficiaryId?: string;
  campaignId?: string;
  publishedBy: string;
}) => {
  return await prisma.successStory.create({
    data: {
      title: payload.title,
      slug: payload.slug,
      content: payload.content,
      beneficiaryId: payload.beneficiaryId,
      campaignId: payload.campaignId,
      publishedBy: payload.publishedBy,
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });
};

const updateSystemSetting = async (key: string, payload: { settingValue: string; description?: string }) => {
  return await prisma.systemSetting.upsert({
    where: { settingKey: key },
    update: {
      settingValue: payload.settingValue,
      description: payload.description,
      updatedAt: new Date(),
    },
    create: {
      settingKey: key,
      settingValue: payload.settingValue,
      description: payload.description,
      category: "SYSTEM",
    },
  });
};

export const cmsService = {
  createPage,
  publishImpactStory,
  updateSystemSetting,
};
