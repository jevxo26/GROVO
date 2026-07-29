import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

export const updatePressRelease = async (id: string, payload: any) => {
  const item = await prisma.pressRelease.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Press release not found.");
  }

  if (payload.slug && payload.slug !== item.slug) {
    const existing = await prisma.pressRelease.findUnique({ where: { slug: payload.slug } });
    if (existing) {
      throw new customError(status.CONFLICT, `Press release slug '${payload.slug}' already exists`);
    }
  }

  return await prisma.pressRelease.update({
    where: { id },
    data: {
      ...(payload.title && { title: payload.title }),
      ...(payload.slug && { slug: payload.slug }),
      ...(payload.content && { content: payload.content }),
      ...(payload.attachment !== undefined && { attachment: payload.attachment }),
      ...(payload.publishedBy && { publishedBy: payload.publishedBy }),
      ...(payload.publishedAt !== undefined && { publishedAt: payload.publishedAt ? new Date(payload.publishedAt) : null }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deletePressRelease = async (id: string) => {
  const item = await prisma.pressRelease.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Press release not found.");
  }
  await prisma.pressRelease.delete({ where: { id } });
  return { message: "Press release deleted successfully." };
};
