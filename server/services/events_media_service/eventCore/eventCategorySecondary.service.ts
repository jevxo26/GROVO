import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

export const updateEventCategory = async (id: string, payload: any) => {
  const item = await prisma.eventCategory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event category not found.");
  }

  if (payload.name && payload.name !== item.name) {
    const existing = await prisma.eventCategory.findUnique({ where: { name: payload.name } });
    if (existing) {
      throw new customError(status.CONFLICT, `Category '${payload.name}' already exists`);
    }
  }

  return await prisma.eventCategory.update({
    where: { id },
    data: {
      ...(payload.name && { name: payload.name }),
      ...(payload.icon !== undefined && { icon: payload.icon }),
      ...(payload.description !== undefined && { description: payload.description }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteEventCategory = async (id: string) => {
  const item = await prisma.eventCategory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Event category not found.");
  }
  await prisma.eventCategory.delete({ where: { id } });
  return { message: "Event category deleted successfully." };
};
