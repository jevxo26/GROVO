import { CMSPage, SuccessStory } from "../../generated/prisma/browser";
import { prisma } from "../lib/prisma";

const createPage = async (payload: {
  title: string;
  slug: string;
  metaTitle?: string;
  metaDesc?: string;
  template?: string;
}) => {
  return await prisma.cMSPage.create({
    data: {
      title: payload.title,
      slug: payload.slug,
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

export const cmsService = {
  createPage,
  publishImpactStory,
};
