import { prisma } from "../lib/prisma";

const scheduleEvent = async (payload: {
  title: string;
  slug: string;
  categoryId: string;
  eventType: string;
  branchId: string;
  venue: string;
  startDate: string;
  endDate: string;
  createdBy: string;
  description?: string;
  maxParticipants?: number;
  registrationRequired?: boolean;
}) => {
  return await prisma.$transaction(async (tx: any) => {
    // Ensure category exists
    await tx.eventCategory.upsert({
      where: { id: payload.categoryId },
      update: {},
      create: { id: payload.categoryId, name: "General Activity" },
    });

    const eventCode = `EVT-${Date.now()}`;
    return await tx.event.create({
      data: {
        eventCode,
        title: payload.title,
        slug: payload.slug,
        categoryId: payload.categoryId,
        eventType: payload.eventType,
        branchId: payload.branchId,
        venue: payload.venue,
        startDate: new Date(payload.startDate),
        endDate: new Date(payload.endDate),
        createdBy: payload.createdBy,
        description: payload.description,
        maxParticipants: payload.maxParticipants || 100,
        registrationRequired: payload.registrationRequired || false,
        status: "ACTIVE",
      },
    });
  });
};

const logAttendance = async (payload: {
  eventId: string;
  userId: string;
  checkInTime: string;
}) => {
  return await prisma.eventAttendance.create({
    data: {
      eventId: payload.eventId,
      userId: payload.userId,
      checkInTime: new Date(payload.checkInTime),
      attendanceStatus: "PRESENT",
    },
  });
};

const registerForEvent = async (eventId: string, userId: string) => {
  return await prisma.$transaction(async (tx: any) => {
    const event = await tx.event.findUnique({
      where: { id: eventId },
      include: { registrations: true },
    });

    if (!event) throw new Error("EVENT_NOT_FOUND");
    if (event.maxParticipants > 0 && event.registrations.length >= event.maxParticipants) {
      throw new Error("EVENT_MAX_PARTICIPANTS_REACHED");
    }

    const registrationNumber = `REG-${Date.now()}`;

    return await tx.eventRegistration.create({
      data: {
        eventId,
        userId,
        registrationNumber,
        status: "CONFIRMED",
      },
    });
  });
};

const addMediaToAlbum = async (
  albumId: string,
  payload: { title: string; mediaType: string; fileUrl: string; uploadedBy: string }
) => {
  return await prisma.$transaction(async (tx: any) => {
    // Ensure album exists
    await tx.album.upsert({
      where: { id: albumId },
      update: {},
      create: { id: albumId, albumName: "Default Event Album", createdBy: payload.uploadedBy },
    });

    const media = await tx.media.create({
      data: {
        title: payload.title,
        mediaType: payload.mediaType,
        fileUrl: payload.fileUrl,
        uploadedBy: payload.uploadedBy,
        status: "ACTIVE",
      },
    });

    await tx.albumMedia.create({
      data: {
        albumId,
        mediaId: media.id,
      },
    });

    return media;
  });
};

const getLiveDonationFeed = async () => {
  // Try fetching live donation feed
  const feed = await prisma.liveDonationFeed.findMany({
    take: 50,
    orderBy: { createdAt: "desc" },
  });

  if (feed.length > 0) return feed;

  // Fallback to donations list if feed is empty
  const donations = await prisma.donation.findMany({
    take: 50,
    where: { paymentStatus: "COMPLETED" },
    include: { donor: { include: { user: { select: { name: true } } } } },
    orderBy: { createdAt: "desc" },
  });

  return donations.map((d) => ({
    id: d.id,
    campaignId: d.campaignId || "general",
    donorName: d.isAnonymous ? "Anonymous" : d.donor.user.name,
    amount: d.amount,
    message: d.message,
    isAnonymous: d.isAnonymous,
    createdAt: d.createdAt,
  }));
};

const createSuccessStory = async (payload: {
  title: string;
  slug: string;
  summary?: string;
  content: string;
  beneficiaryId?: string;
  campaignId?: string;
  publishedBy: string;
}) => {
  return await prisma.successStory.create({
    data: {
      title: payload.title,
      slug: payload.slug,
      summary: payload.summary,
      content: payload.content,
      beneficiaryId: payload.beneficiaryId,
      campaignId: payload.campaignId,
      publishedBy: payload.publishedBy,
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });
};

const sendNewsletter = async (newsletterId: string) => {
  const subscribersCount = await prisma.userNotificationSetting.count({
    where: { newsletter: true },
  });

  return await prisma.newsletter.update({
    where: { id: newsletterId },
    data: {
      status: "SENT",
      sentAt: new Date(),
      recipientCount: subscribersCount,
    },
  });
};

export const eventService = {
  scheduleEvent,
  logAttendance,
  registerForEvent,
  addMediaToAlbum,
  getLiveDonationFeed,
  createSuccessStory,
  sendNewsletter,
};
