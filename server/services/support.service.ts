import { prisma } from "../lib/prisma";

const openTicket = async (payload: {
  userId: string;
  subject: string;
  description: string;
  category: string;
  priority?: string;
}) => {
  const ticketNumber = `TCK-${Date.now()}`;
  return await prisma.supportTicket.create({
    data: {
      ticketNumber,
      userId: payload.userId,
      subject: payload.subject,
      description: payload.description,
      category: payload.category,
      priority: payload.priority || "MEDIUM",
      status: "OPEN",
    },
  });
};

const submitReply = async (payload: {
  ticketId: string;
  userId: string;
  message: string;
  isStaff: boolean;
}) => {
  return await prisma.ticketReply.create({
    data: {
      ticketId: payload.ticketId,
      userId: payload.userId,
      message: payload.message,
      isStaff: Boolean(payload.isStaff),
    },
  });
};

export const supportService = {
  openTicket,
  submitReply,
};
