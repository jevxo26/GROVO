import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 18. PRESS RELEASE SERVICES ====================
export const createPressRelease = async (payload: any) => {
  if (!payload.title || !payload.slug || !payload.content || !payload.publishedBy) {
    throw new customError(status.BAD_REQUEST, "title, slug, content, and publishedBy are required.");
  }

  const existing = await prisma.pressRelease.findUnique({
    where: { slug: payload.slug },
  });
  if (existing) {
    throw new customError(status.CONFLICT, `Press release slug '${payload.slug}' already exists`);
  }

  return await prisma.pressRelease.create({
    data: {
      title: payload.title,
      slug: payload.slug,
      content: payload.content,
      attachment: payload.attachment || null,
      publishedBy: payload.publishedBy,
      publishedAt: payload.publishedAt ? new Date(payload.publishedAt) : null,
      status: payload.status || "DRAFT",
    },
  });
};

export const getAllPressReleases = async (query?: { status?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;

  return await prisma.pressRelease.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getPressReleaseById = async (id: string) => {
  const item = await prisma.pressRelease.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Press release not found.");
  }
  return item;
};

