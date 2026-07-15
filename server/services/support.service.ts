import { prisma } from "../lib/prisma";

const openTicket = async (payload: {
  userId: string;
  subject: string;
  description: string;
  category: string;
  priority?: string;
}) => {
  const ticketNumber = `TKT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
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
  return await prisma.$transaction(async (tx: any) => {
    const reply = await tx.ticketReply.create({
      data: {
        ticketId: payload.ticketId,
        userId: payload.userId,
        message: payload.message,
        isStaff: payload.isStaff,
      },
    });

    // Update ticket status
    const newStatus = payload.isStaff ? "WAITING_USER" : "IN_PROGRESS";
    await tx.supportTicket.update({
      where: { id: payload.ticketId },
      data: {
        status: newStatus,
        updatedAt: new Date(),
      },
    });

    return reply;
  });
};

const getTicketDetail = async (id: string, userId: string, isAdmin: boolean) => {
  const ticket = await prisma.supportTicket.findUnique({
    where: { id },
    include: {
      replies: {
        orderBy: { createdAt: "asc" },
      },
      attachments: true,
    },
  });

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  // Authorize owner or admin
  if (!isAdmin && ticket.userId !== userId) {
    throw new Error("Unauthorized access to ticket");
  }

  return ticket;
};

const listMyTickets = async (userId: string, filters: { status?: string; category?: string; page?: number; limit?: number }) => {
  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const skip = (page - 1) * limit;

  const whereClause: any = { userId };
  if (filters.status) whereClause.status = filters.status;
  if (filters.category) whereClause.category = filters.category;

  const [tickets, total] = await Promise.all([
    prisma.supportTicket.findMany({
      where: whereClause,
      orderBy: { updatedAt: "desc" },
      skip,
      take: limit,
      include: {
        replies: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    }),
    prisma.supportTicket.count({ where: whereClause }),
  ]);

  return {
    tickets: tickets.map((t: any) => ({
      id: t.id,
      ticket_number: t.ticketNumber,
      subject: t.subject,
      status: t.status,
      priority: t.priority,
      last_reply_at: t.replies[0]?.createdAt || t.createdAt,
      reply_count: t.replies.length,
    })),
    meta: {
      page,
      limit,
      total,
    },
  };
};

const listAllTickets = async (filters: { status?: string; priority?: string; category?: string; assignedTo?: string; page?: number; limit?: number; sort?: string }) => {
  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const skip = (page - 1) * limit;

  const whereClause: any = {};
  if (filters.status) whereClause.status = filters.status;
  if (filters.priority) whereClause.priority = filters.priority;
  if (filters.category) whereClause.category = filters.category;
  if (filters.assignedTo) whereClause.assignedTo = filters.assignedTo;

  let orderBy: any = { createdAt: "desc" };
  if (filters.sort) {
    const [field, order] = filters.sort.split(":");
    orderBy = { [field]: order || "desc" };
  }

  const [tickets, total] = await Promise.all([
    prisma.supportTicket.findMany({
      where: whereClause,
      orderBy,
      skip,
      take: limit,
    }),
    prisma.supportTicket.count({ where: whereClause }),
  ]);

  return {
    tickets,
    meta: {
      page,
      limit,
      total,
    },
  };
};

export const supportService = {
  openTicket,
  submitReply,
  getTicketDetail,
  listMyTickets,
  listAllTickets,
};
