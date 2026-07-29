import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 15. SUCCESS STORY SERVICES ====================
export const createSuccessStory = async (payload: any) => {
  if (!payload.title || !payload.slug || !payload.beneficiaryId || !payload.summary || !payload.content || !payload.publishedBy) {
    throw new customError(status.BAD_REQUEST, "title, slug, beneficiaryId, summary, content, and publishedBy are required.");
  }

  const existing = await prisma.successStory.findUnique({
    where: { slug: payload.slug },
  });
  if (existing) {
    throw new customError(status.CONFLICT, `Success story slug '${payload.slug}' already exists`);
  }

  return await prisma.successStory.create({
    data: {
      title: payload.title,
      slug: payload.slug,
      beneficiaryId: payload.beneficiaryId,
      campaignId: payload.campaignId || null,
      summary: payload.summary,
      content: payload.content,
      publishedBy: payload.publishedBy,
      publishedAt: payload.publishedAt ? new Date(payload.publishedAt) : null,
      status: payload.status || "DRAFT",
    },
  });
};

export const getAllSuccessStories = async (query?: { beneficiaryId?: string; campaignId?: string; status?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;
  if (query?.campaignId) where.campaignId = query.campaignId;
  if (query?.status) where.status = query.status;

  return await prisma.successStory.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getSuccessStoryById = async (id: string) => {
  const item = await prisma.successStory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Success story not found.");
  }
  return item;
};

