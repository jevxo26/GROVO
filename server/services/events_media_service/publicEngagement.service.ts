import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

// ==================== 14. LIVE DONATION FEED SERVICES ====================
const createLiveDonationFeed = async (payload: any) => {
  if (!payload.donorName || payload.amount === undefined || !payload.campaignId) {
    throw new customError(status.BAD_REQUEST, "donorName, amount, and campaignId are required.");
  }

  return await prisma.liveDonationFeed.create({
    data: {
      donorId: payload.donorId || null,
      donorName: payload.donorName,
      amount: Number(payload.amount),
      campaignId: payload.campaignId,
      message: payload.message || null,
      isAnonymous: payload.isAnonymous !== undefined ? Boolean(payload.isAnonymous) : false,
      displayStatus: payload.displayStatus || "VISIBLE",
    },
  });
};

const getAllLiveDonationFeeds = async (query?: { campaignId?: string; displayStatus?: string }) => {
  const where: any = {};
  if (query?.campaignId) where.campaignId = query.campaignId;
  if (query?.displayStatus) where.displayStatus = query.displayStatus;

  return await prisma.liveDonationFeed.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getLiveDonationFeedById = async (id: string) => {
  const item = await prisma.liveDonationFeed.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Live donation feed record not found.");
  }
  return item;
};

const updateLiveDonationFeed = async (id: string, payload: any) => {
  const item = await prisma.liveDonationFeed.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Live donation feed record not found.");
  }

  return await prisma.liveDonationFeed.update({
    where: { id },
    data: {
      ...(payload.donorName && { donorName: payload.donorName }),
      ...(payload.amount !== undefined && { amount: Number(payload.amount) }),
      ...(payload.message !== undefined && { message: payload.message }),
      ...(payload.isAnonymous !== undefined && { isAnonymous: Boolean(payload.isAnonymous) }),
      ...(payload.displayStatus && { displayStatus: payload.displayStatus }),
    },
  });
};

const deleteLiveDonationFeed = async (id: string) => {
  const item = await prisma.liveDonationFeed.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Live donation feed record not found.");
  }
  await prisma.liveDonationFeed.delete({ where: { id } });
  return { message: "Live donation feed record deleted successfully." };
};


// ==================== 15. SUCCESS STORY SERVICES ====================
const createSuccessStory = async (payload: any) => {
  if (!payload.title || !payload.slug || !payload.beneficiaryId || !payload.summary || !payload.content || !payload.publishedBy) {
    throw new customError(status.BAD_REQUEST, "title, slug, beneficiaryId, summary, content, and publishedBy are required.");
  }

  const existing = await prisma.successStory.findUnique({
    where: { slug: payload.slug },
  });
  if (existing) {
    throw new customError(status.CONFLICT, `Success story slug '${payload.slug}' already exists`);
  }

  return await prisma.successStory.create({
    data: {
      title: payload.title,
      slug: payload.slug,
      beneficiaryId: payload.beneficiaryId,
      campaignId: payload.campaignId || null,
      summary: payload.summary,
      content: payload.content,
      publishedBy: payload.publishedBy,
      publishedAt: payload.publishedAt ? new Date(payload.publishedAt) : null,
      status: payload.status || "DRAFT",
    },
  });
};

const getAllSuccessStories = async (query?: { beneficiaryId?: string; campaignId?: string; status?: string }) => {
  const where: any = {};
  if (query?.beneficiaryId) where.beneficiaryId = query.beneficiaryId;
  if (query?.campaignId) where.campaignId = query.campaignId;
  if (query?.status) where.status = query.status;

  return await prisma.successStory.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getSuccessStoryById = async (id: string) => {
  const item = await prisma.successStory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Success story not found.");
  }
  return item;
};

const updateSuccessStory = async (id: string, payload: any) => {
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

const deleteSuccessStory = async (id: string) => {
  const item = await prisma.successStory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Success story not found.");
  }
  await prisma.successStory.delete({ where: { id } });
  return { message: "Success story deleted successfully." };
};


// ==================== 16. STORY MEDIA SERVICES ====================
const createStoryMedia = async (payload: any) => {
  if (!payload.storyId || !payload.mediaId) {
    throw new customError(status.BAD_REQUEST, "storyId and mediaId are required.");
  }

  return await prisma.storyMedia.create({
    data: {
      storyId: payload.storyId,
      mediaId: payload.mediaId,
    },
  });
};

const getAllStoryMedia = async (query?: { storyId?: string; mediaId?: string }) => {
  const where: any = {};
  if (query?.storyId) where.storyId = query.storyId;
  if (query?.mediaId) where.mediaId = query.mediaId;

  return await prisma.storyMedia.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getStoryMediaById = async (id: string) => {
  const item = await prisma.storyMedia.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Story media link not found.");
  }
  return item;
};

const updateStoryMedia = async (id: string, payload: any) => {
  const item = await prisma.storyMedia.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Story media link not found.");
  }

  return await prisma.storyMedia.update({
    where: { id },
    data: {
      ...(payload.storyId && { storyId: payload.storyId }),
      ...(payload.mediaId && { mediaId: payload.mediaId }),
    },
  });
};

const deleteStoryMedia = async (id: string) => {
  const item = await prisma.storyMedia.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Story media link not found.");
  }
  await prisma.storyMedia.delete({ where: { id } });
  return { message: "Story media link deleted successfully." };
};


// ==================== 17. TESTIMONIAL SERVICES ====================
const createTestimonial = async (payload: any) => {
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

const getAllTestimonials = async (query?: { status?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;

  return await prisma.testimonial.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getTestimonialById = async (id: string) => {
  const item = await prisma.testimonial.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Testimonial not found.");
  }
  return item;
};

const updateTestimonial = async (id: string, payload: any) => {
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

const deleteTestimonial = async (id: string) => {
  const item = await prisma.testimonial.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Testimonial not found.");
  }
  await prisma.testimonial.delete({ where: { id } });
  return { message: "Testimonial deleted successfully." };
};


// ==================== 18. PRESS RELEASE SERVICES ====================
const createPressRelease = async (payload: any) => {
  if (!payload.title || !payload.slug || !payload.content || !payload.publishedBy) {
    throw new customError(status.BAD_REQUEST, "title, slug, content, and publishedBy are required.");
  }

  const existing = await prisma.pressRelease.findUnique({
    where: { slug: payload.slug },
  });
  if (existing) {
    throw new customError(status.CONFLICT, `Press release slug '${payload.slug}' already exists`);
  }

  return await prisma.pressRelease.create({
    data: {
      title: payload.title,
      slug: payload.slug,
      content: payload.content,
      attachment: payload.attachment || null,
      publishedBy: payload.publishedBy,
      publishedAt: payload.publishedAt ? new Date(payload.publishedAt) : null,
      status: payload.status || "DRAFT",
    },
  });
};

const getAllPressReleases = async (query?: { status?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;

  return await prisma.pressRelease.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getPressReleaseById = async (id: string) => {
  const item = await prisma.pressRelease.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Press release not found.");
  }
  return item;
};

const updatePressRelease = async (id: string, payload: any) => {
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

const deletePressRelease = async (id: string) => {
  const item = await prisma.pressRelease.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Press release not found.");
  }
  await prisma.pressRelease.delete({ where: { id } });
  return { message: "Press release deleted successfully." };
};


// ==================== 19. NEWS SERVICES ====================
const createNews = async (payload: any) => {
  if (!payload.title || !payload.slug || !payload.summary || !payload.content || !payload.publishedBy) {
    throw new customError(status.BAD_REQUEST, "title, slug, summary, content, and publishedBy are required.");
  }

  const existing = await prisma.news.findUnique({
    where: { slug: payload.slug },
  });
  if (existing) {
    throw new customError(status.CONFLICT, `News slug '${payload.slug}' already exists`);
  }

  return await prisma.news.create({
    data: {
      title: payload.title,
      slug: payload.slug,
      summary: payload.summary,
      content: payload.content,
      featuredImage: payload.featuredImage || null,
      publishedBy: payload.publishedBy,
      publishedAt: payload.publishedAt ? new Date(payload.publishedAt) : null,
      status: payload.status || "DRAFT",
    },
  });
};

const getAllNews = async (query?: { status?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;

  return await prisma.news.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getNewsById = async (id: string) => {
  const item = await prisma.news.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "News item not found.");
  }
  return item;
};

const updateNews = async (id: string, payload: any) => {
  const item = await prisma.news.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "News item not found.");
  }

  if (payload.slug && payload.slug !== item.slug) {
    const existing = await prisma.news.findUnique({ where: { slug: payload.slug } });
    if (existing) {
      throw new customError(status.CONFLICT, `News slug '${payload.slug}' already exists`);
    }
  }

  return await prisma.news.update({
    where: { id },
    data: {
      ...(payload.title && { title: payload.title }),
      ...(payload.slug && { slug: payload.slug }),
      ...(payload.summary && { summary: payload.summary }),
      ...(payload.content && { content: payload.content }),
      ...(payload.featuredImage !== undefined && { featuredImage: payload.featuredImage }),
      ...(payload.publishedBy && { publishedBy: payload.publishedBy }),
      ...(payload.publishedAt !== undefined && { publishedAt: payload.publishedAt ? new Date(payload.publishedAt) : null }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

const deleteNews = async (id: string) => {
  const item = await prisma.news.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "News item not found.");
  }
  await prisma.news.delete({ where: { id } });
  return { message: "News item deleted successfully." };
};


// ==================== 20. NEWSLETTER SERVICES ====================
const createNewsletter = async (payload: any) => {
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

const getAllNewsletters = async (query?: { status?: string }) => {
  const where: any = {};
  if (query?.status) where.status = query.status;

  return await prisma.newsletter.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getNewsletterById = async (id: string) => {
  const item = await prisma.newsletter.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Newsletter not found.");
  }
  return item;
};

const updateNewsletter = async (id: string, payload: any) => {
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

const deleteNewsletter = async (id: string) => {
  const item = await prisma.newsletter.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Newsletter not found.");
  }
  await prisma.newsletter.delete({ where: { id } });
  return { message: "Newsletter deleted successfully." };
};


export const publicEngagementService = {
  // LiveDonationFeed
  createLiveDonationFeed,
  getAllLiveDonationFeeds,
  getLiveDonationFeedById,
  updateLiveDonationFeed,
  deleteLiveDonationFeed,
  // SuccessStory
  createSuccessStory,
  getAllSuccessStories,
  getSuccessStoryById,
  updateSuccessStory,
  deleteSuccessStory,
  // StoryMedia
  createStoryMedia,
  getAllStoryMedia,
  getStoryMediaById,
  updateStoryMedia,
  deleteStoryMedia,
  // Testimonial
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
  // PressRelease
  createPressRelease,
  getAllPressReleases,
  getPressReleaseById,
  updatePressRelease,
  deletePressRelease,
  // News
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
  // Newsletter
  createNewsletter,
  getAllNewsletters,
  getNewsletterById,
  updateNewsletter,
  deleteNewsletter,
};
