import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 20. NEWSLETTER SERVICES ====================
export const createNewsletter = async (payload: any) => {
  if (!payload.title || !payload.subject || !payload.content) {
    throw new customError(status.BAD_REQUEST, "title, subject, and content are required.");
  }

  return await prisma.newsletter.create({
    data: {
      title: payload.title,
      subject: payload.subject,
      content: payload.content,
      sentBy: payload.sentBy || null,
      sentAt: payload.sentAt ? new Date(payload.sentAt) : null,
      status: payload.status || "DRAFT",
    },
  });
};

export const getAllNewsletters = async (query?: { status?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;

  return await prisma.newsletter.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getNewsletterById = async (id: string) => {
  const item = await prisma.newsletter.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Newsletter not found.");
  }
  return item;
};

export const updateNewsletter = async (id: string, payload: any) => {
  const item = await prisma.newsletter.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Newsletter not found.");
  }

  return await prisma.newsletter.update({
    where: { id },
    data: {
      ...(payload.title && { title: payload.title }),
      ...(payload.subject && { subject: payload.subject }),
      ...(payload.content && { content: payload.content }),
      ...(payload.sentBy !== undefined && { sentBy: payload.sentBy }),
      ...(payload.sentAt !== undefined && { sentAt: payload.sentAt ? new Date(payload.sentAt) : null }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteNewsletter = async (id: string) => {
  const item = await prisma.newsletter.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Newsletter not found.");
  }
  await prisma.newsletter.delete({ where: { id } });
  return { message: "Newsletter deleted successfully." };
};
