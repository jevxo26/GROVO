import { prisma } from "../lib/prisma";

const queueAlert = async (payload: {
  recipientId: string;
  type: string;
  title: string;
  body: string;
  priority?: string;
}) => {
  return await prisma.$transaction(async (tx: any) => {
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

const createNotification = async (payload: {
  title: string;
  message: string;
  type: string;
  priority: string;
  channels: string[];
  target_audience: any;
  template_variables?: any;
  scheduled_at?: Date | null;
}) => {
  return await prisma.$transaction(async (tx: any) => {
    // 1. Create base notification
    const notification = await tx.notification.create({
      data: {
        title: payload.title,
        message: payload.message,
        type: payload.type,
        priority: (payload.priority || "NORMAL").toUpperCase(),
        status: payload.scheduled_at ? "PENDING" : "PROCESSING",
        scheduledAt: payload.scheduled_at ? new Date(payload.scheduled_at) : null,
      },
    });

    // 2. Resolve users matching target_audience filters
    let targetRoles: string[] = [];
    if (payload.target_audience && Array.isArray(payload.target_audience.roles)) {
      targetRoles = payload.target_audience.roles;
    }

    let users = [];
    if (targetRoles.length > 0) {
      users = await tx.user.findMany({
        where: {
          role: { in: targetRoles }
        },
        take: 1000
      });
    } else {
      // Default: fetch a subset of users
      users = await tx.user.findMany({ take: 100 });
    }

    const recipientIds = users.map((u: any) => u.id);
    
    // Add default mock recipient if users list is empty
    if (recipientIds.length === 0) {
      recipientIds.push("usr-default-mock");
    }

    // 3. Create recipients and channel-specific delivery rows
    for (const userId of recipientIds) {
      await tx.notificationRecipient.create({
        data: {
          notificationId: notification.id,
          userId,
          status: "PENDING",
        },
      });

      for (const channel of payload.channels) {
        const chan = channel.toLowerCase();
        if (chan === "in_app") {
          await tx.inAppNotification.create({
            data: {
              notificationId: notification.id,
              userId,
              status: "UNREAD",
            },
          });
        } else if (chan === "push") {
          await tx.pushNotification.create({
            data: {
              notificationId: notification.id,
              deviceToken: "mock-device-token-" + userId,
              payload: JSON.stringify(payload.template_variables || {}),
              deliveryStatus: "PENDING",
            },
          });
        } else if (chan === "email") {
          const targetUser = users.find((u: any) => u.id === userId);
          const email = targetUser?.email || `mock-${userId}@example.com`;
          await tx.emailNotification.create({
            data: {
              notificationId: notification.id,
              recipientEmail: email,
              subject: payload.title,
              body: payload.message,
              deliveryStatus: "PENDING",
            },
          });
        } else if (chan === "sms") {
          await tx.sMSNotification.create({
            data: {
              notificationId: notification.id,
              recipientPhone: "+8801700000000",
              message: payload.message,
              deliveryStatus: "PENDING",
            },
          });
        }
      }
    }

    // Log activity
    await tx.notificationActivity.create({
      data: {
        notificationId: notification.id,
        action: payload.scheduled_at ? "scheduled" : "created",
        performedBy: "admin-mock",
        details: `Dispatched to ${recipientIds.length} users over channels: ${payload.channels.join(", ")}`,
      },
    });

    // Update status to SENT if not scheduled
    if (!payload.scheduled_at) {
      await tx.notification.update({
        where: { id: notification.id },
        data: { status: "SENT", sentAt: new Date() },
      });
    }

    return {
      notificationId: notification.id,
      status: payload.scheduled_at ? "pending" : "processing",
      recipient_count: recipientIds.length,
      channels: payload.channels,
      estimated_delivery: "2-5 minutes",
    };
  });
};

const getMyNotifications = async (userId: string, filters: { is_read?: boolean; page?: number; limit?: number }) => {
  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 20;
  const skip = (page - 1) * limit;

  const whereClause: any = { userId };
  if (filters.is_read !== undefined) {
    whereClause.status = filters.is_read ? "READ" : "UNREAD";
  }

  const [notifications, total, unreadCount] = await Promise.all([
    prisma.inAppNotification.findMany({
      where: whereClause,
      include: {
        notification: true,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.inAppNotification.count({ where: { userId } }),
    prisma.inAppNotification.count({ where: { userId, status: "UNREAD" } }),
  ]);

  return {
    success: true,
    data: notifications.map((n: any) => ({
      id: n.id,
      title: n.notification.title,
      message: n.notification.message,
      action_url: `/notifications/${n.id}`,
      is_read: n.status === "READ",
      read_at: n.readAt,
      created_at: n.createdAt,
    })),
    meta: {
      page,
      limit,
      total,
      unread_count: unreadCount,
    },
  };
};

const markAsRead = async (id: string, userId: string) => {
  return await prisma.$transaction(async (tx: any) => {
    const inApp = await tx.inAppNotification.findUnique({
      where: { id },
      include: { notification: true },
    });

    if (!inApp || inApp.userId !== userId) {
      throw new Error("Notification not found or unauthorized");
    }

    const updatedInApp = await tx.inAppNotification.update({
      where: { id },
      data: {
        status: "READ",
        readAt: new Date(),
      },
    });

    await tx.notificationRecipient.updateMany({
      where: {
        notificationId: inApp.notificationId,
        userId,
      },
      data: {
        status: "READ",
        readAt: new Date(),
      },
    });

    return {
      id: updatedInApp.id,
      is_read: true,
      read_at: updatedInApp.readAt,
    };
  });
};

const createEmergencyAlert = async (payload: {
  title: string;
  description: string;
  campaign_id?: number | string;
  priority: string;
  target_area: any;
  expires_at: Date;
  channels: string[];
}) => {
  const notificationPayload = {
    title: payload.title,
    message: payload.description,
    type: "emergency",
    priority: payload.priority || "HIGH",
    channels: payload.channels,
    target_audience: { area: payload.target_area },
    scheduled_at: null,
  };

  const dispatchResult = await createNotification(notificationPayload);

  return {
    alert_id: dispatchResult.notificationId,
    priority: payload.priority,
    recipient_count: dispatchResult.recipient_count,
    channels: payload.channels,
    status: "active",
    expires_at: payload.expires_at,
  };
};

const resolveEmergencyAlert = async (id: string) => {
  const alert = await prisma.notification.update({
    where: { id },
    data: {
      status: "RESOLVED",
    },
  });

  return {
    alert_id: alert.id,
    status: "resolved",
    resolved_at: new Date(),
  };
};

export const notificationService = {
  queueAlert,
  getActiveAlerts,
  createNotification,
  getMyNotifications,
  markAsRead,
  createEmergencyAlert,
  resolveEmergencyAlert,
};
