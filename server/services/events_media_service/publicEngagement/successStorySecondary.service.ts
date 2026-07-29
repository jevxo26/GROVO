import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

export const updateSuccessStory = async (id: string, payload: any) => {
  const item = await prisma.successStory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Success story not found.");
  }

  if (payload.slug && payload.slug !== item.slug) {
    const existing = await prisma.successStory.findUnique({ where: { slug: payload.slug } });
    if (existing) {
      throw new customError(status.CONFLICT, `Success story slug '${payload.slug}' already exists`);
    }
  }

  return await prisma.successStory.update({
    where: { id },
    data: {
      ...(payload.title && { title: payload.title }),
      ...(payload.slug && { slug: payload.slug }),
      ...(payload.beneficiaryId && { beneficiaryId: payload.beneficiaryId }),
      ...(payload.campaignId !== undefined && { campaignId: payload.campaignId }),
      ...(payload.summary && { summary: payload.summary }),
      ...(payload.content && { content: payload.content }),
      ...(payload.publishedBy && { publishedBy: payload.publishedBy }),
      ...(payload.publishedAt !== undefined && { publishedAt: payload.publishedAt ? new Date(payload.publishedAt) : null }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteSuccessStory = async (id: string) => {
  const item = await prisma.successStory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Success story not found.");
  }
  await prisma.successStory.delete({ where: { id } });
  return { message: "Success story deleted successfully." };
};
