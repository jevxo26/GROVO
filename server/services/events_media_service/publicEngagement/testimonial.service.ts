import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 17. TESTIMONIAL SERVICES ====================
export const createTestimonial = async (payload: any) => {
  if (!payload.title || !payload.message) {
    throw new customError(status.BAD_REQUEST, "title and message are required.");
  }

  return await prisma.testimonial.create({
    data: {
      userId: payload.userId || null,
      title: payload.title,
      message: payload.message,
      rating: payload.rating ? Number(payload.rating) : 5,
      photo: payload.photo || null,
      status: payload.status || "PENDING",
    },
  });
};

export const getAllTestimonials = async (query?: { status?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;

  return await prisma.testimonial.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getTestimonialById = async (id: string) => {
  const item = await prisma.testimonial.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Testimonial not found.");
  }
  return item;
};

export const updateTestimonial = async (id: string, payload: any) => {
  const item = await prisma.testimonial.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Testimonial not found.");
  }

  return await prisma.testimonial.update({
    where: { id },
    data: {
      ...(payload.title && { title: payload.title }),
      ...(payload.message && { message: payload.message }),
      ...(payload.rating !== undefined && { rating: Number(payload.rating) }),
      ...(payload.photo !== undefined && { photo: payload.photo }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteTestimonial = async (id: string) => {
  const item = await prisma.testimonial.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Testimonial not found.");
  }
  await prisma.testimonial.delete({ where: { id } });
  return { message: "Testimonial deleted successfully." };
};
