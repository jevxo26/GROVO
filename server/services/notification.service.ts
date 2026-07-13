import { prisma } from "../lib/prisma";

const queueAlert = async (payload: {
  recipientId: string;
  type: string;
  title: string;
  body: string;
  priority?: string;
}) => {
  return await prisma.$transaction(async (tx) => {
    const baseAlert = await tx.notification.create({
      data: {
        title: payload.title,
        message: payload.body,
        type: payload.type,
        priority: payload.priority || "NORMAL",
        status: "PENDING",
      },
    });

    await tx.notificationRecipient.create({
      data: {
        notificationId: baseAlert.id,
        userId: payload.recipientId,
        status: "PENDING",
      },
    });

    return baseAlert;
  });
};

const getActiveAlerts = async (userId: string) => {
  return await prisma.notificationRecipient.findMany({
    where: { userId },
    include: { notification: true },
    orderBy: { createdAt: "desc" },
    take: 15,
  });
};

export const notificationService = {
  queueAlert,
  getActiveAlerts,
};
