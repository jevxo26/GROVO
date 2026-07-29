import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

export const updateNews = async (id: string, payload: any) => {
  const item = await prisma.news.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "News item not found.");
  }

  if (payload.slug && payload.slug !== item.slug) {
    const existing = await prisma.news.findUnique({ where: { slug: payload.slug } });
    if (existing) {
      throw new customError(status.CONFLICT, `News slug '${payload.slug}' already exists`);
    }
  }

  return await prisma.news.update({
    where: { id },
    data: {
      ...(payload.title && { title: payload.title }),
      ...(payload.slug && { slug: payload.slug }),
      ...(payload.summary && { summary: payload.summary }),
      ...(payload.content && { content: payload.content }),
      ...(payload.featuredImage !== undefined && { featuredImage: payload.featuredImage }),
      ...(payload.publishedBy && { publishedBy: payload.publishedBy }),
      ...(payload.publishedAt !== undefined && { publishedAt: payload.publishedAt ? new Date(payload.publishedAt) : null }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteNews = async (id: string) => {
  const item = await prisma.news.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "News item not found.");
  }
  await prisma.news.delete({ where: { id } });
  return { message: "News item deleted successfully." };
};
