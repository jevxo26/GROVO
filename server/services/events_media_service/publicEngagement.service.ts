import { prisma } from "../../lib/prisma";

// Remove: const prisma = new PrismaClient();

const createLiveDonationFeed = async (payload: any) => {
  return await prisma.liveDonationFeed.create({ data: payload });
};

const getLiveDonationTicker = async () => {
  return await prisma.liveDonationFeed.findMany({
    where: { displayStatus: "VISIBLE" },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
};

const createSuccessStory = async (payload: any) => {
  return await prisma.successStory.create({ data: payload });
};

const attachStoryMedia = async (payload: any) => {
  return await prisma.storyMedia.create({ data: payload });
};

const createTestimonial = async (payload: any) => {
  return await prisma.testimonial.create({ data: payload });
};

const createPressRelease = async (payload: any) => {
  return await prisma.pressRelease.create({ data: payload });
};

const createNews = async (payload: any) => {
  return await prisma.news.create({ data: payload });
};

const createNewsletter = async (payload: any) => {
  return await prisma.newsletter.create({ data: payload });
};

export const PublicEngagementService = {
  createLiveDonationFeed,
  getLiveDonationTicker,
  createSuccessStory,
  attachStoryMedia,
  createTestimonial,
  createPressRelease,
  createNews,
  createNewsletter,
};
