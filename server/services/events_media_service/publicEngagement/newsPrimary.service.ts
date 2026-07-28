import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 19. NEWS SERVICES ====================
export const createNews = async (payload: any) => {
  if (!payload.title || !payload.slug || !payload.summary || !payload.content || !payload.publishedBy) {
    throw new customError(status.BAD_REQUEST, "title, slug, summary, content, and publishedBy are required.");
  }

  const existing = await prisma.news.findUnique({
    where: { slug: payload.slug },
  });
  if (existing) {
    throw new customError(status.CONFLICT, `News slug '${payload.slug}' already exists`);
  }

  return await prisma.news.create({
    data: {
      title: payload.title,
      slug: payload.slug,
      summary: payload.summary,
      content: payload.content,
      featuredImage: payload.featuredImage || null,
      publishedBy: payload.publishedBy,
      publishedAt: payload.publishedAt ? new Date(payload.publishedAt) : null,
      status: payload.status || "DRAFT",
    },
  });
};

export const getAllNews = async (query?: { status?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;

  return await prisma.news.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getNewsById = async (id: string) => {
  const item = await prisma.news.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "News item not found.");
  }
  return item;
};

