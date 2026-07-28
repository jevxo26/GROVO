import status from "http-status";
import { publicEngagementService } from "../../services/events_media_service/publicEngagement.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// ==================== 14. LIVE DONATION FEED CONTROLLERS ====================
const createLiveDonationFeed = catchAsync(async (req, res) => {
  const result = await publicEngagementService.createLiveDonationFeed(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Live donation feed created successfully",
    data: result,
  });
});

const getAllLiveDonationFeeds = catchAsync(async (req, res) => {
  const result = await publicEngagementService.getAllLiveDonationFeeds(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Live donation feeds retrieved successfully",
    data: result,
  });
});

const getLiveDonationFeedById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.getLiveDonationFeedById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Live donation feed retrieved successfully",
    data: result,
  });
});

const updateLiveDonationFeed = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.updateLiveDonationFeed(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Live donation feed updated successfully",
    data: result,
  });
});

const deleteLiveDonationFeed = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.deleteLiveDonationFeed(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Live donation feed deleted successfully",
    data: result,
  });
});


// ==================== 15. SUCCESS STORY CONTROLLERS ====================
const createSuccessStory = catchAsync(async (req, res) => {
  const result = await publicEngagementService.createSuccessStory(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Success story created successfully",
    data: result,
  });
});

const getAllSuccessStories = catchAsync(async (req, res) => {
  const result = await publicEngagementService.getAllSuccessStories(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Success stories retrieved successfully",
    data: result,
  });
});

const getSuccessStoryById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.getSuccessStoryById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Success story retrieved successfully",
    data: result,
  });
});

const updateSuccessStory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.updateSuccessStory(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Success story updated successfully",
    data: result,
  });
});

const deleteSuccessStory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.deleteSuccessStory(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Success story deleted successfully",
    data: result,
  });
});


// ==================== 16. STORY MEDIA CONTROLLERS ====================
const createStoryMedia = catchAsync(async (req, res) => {
  const result = await publicEngagementService.createStoryMedia(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Story media linked successfully",
    data: result,
  });
});

const getAllStoryMedia = catchAsync(async (req, res) => {
  const result = await publicEngagementService.getAllStoryMedia(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Story media links retrieved successfully",
    data: result,
  });
});

const getStoryMediaById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.getStoryMediaById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Story media link retrieved successfully",
    data: result,
  });
});

const updateStoryMedia = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.updateStoryMedia(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Story media link updated successfully",
    data: result,
  });
});

const deleteStoryMedia = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.deleteStoryMedia(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Story media link deleted successfully",
    data: result,
  });
});


// ==================== 17. TESTIMONIAL CONTROLLERS ====================
const createTestimonial = catchAsync(async (req, res) => {
  const result = await publicEngagementService.createTestimonial(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Testimonial created successfully",
    data: result,
  });
});

const getAllTestimonials = catchAsync(async (req, res) => {
  const result = await publicEngagementService.getAllTestimonials(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Testimonials retrieved successfully",
    data: result,
  });
});

const getTestimonialById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.getTestimonialById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Testimonial retrieved successfully",
    data: result,
  });
});

const updateTestimonial = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.updateTestimonial(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Testimonial updated successfully",
    data: result,
  });
});

const deleteTestimonial = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.deleteTestimonial(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Testimonial deleted successfully",
    data: result,
  });
});


// ==================== 18. PRESS RELEASE CONTROLLERS ====================
const createPressRelease = catchAsync(async (req, res) => {
  const result = await publicEngagementService.createPressRelease(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Press release created successfully",
    data: result,
  });
});

const getAllPressReleases = catchAsync(async (req, res) => {
  const result = await publicEngagementService.getAllPressReleases(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Press releases retrieved successfully",
    data: result,
  });
});

const getPressReleaseById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.getPressReleaseById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Press release retrieved successfully",
    data: result,
  });
});

const updatePressRelease = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.updatePressRelease(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Press release updated successfully",
    data: result,
  });
});

const deletePressRelease = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.deletePressRelease(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Press release deleted successfully",
    data: result,
  });
});


// ==================== 19. NEWS CONTROLLERS ====================
const createNews = catchAsync(async (req, res) => {
  const result = await publicEngagementService.createNews(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "News item created successfully",
    data: result,
  });
});

const getAllNews = catchAsync(async (req, res) => {
  const result = await publicEngagementService.getAllNews(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "News items retrieved successfully",
    data: result,
  });
});

const getNewsById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.getNewsById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "News item retrieved successfully",
    data: result,
  });
});

const updateNews = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.updateNews(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "News item updated successfully",
    data: result,
  });
});

const deleteNews = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.deleteNews(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "News item deleted successfully",
    data: result,
  });
});


// ==================== 20. NEWSLETTER CONTROLLERS ====================
const createNewsletter = catchAsync(async (req, res) => {
  const result = await publicEngagementService.createNewsletter(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Newsletter created successfully",
    data: result,
  });
});

const getAllNewsletters = catchAsync(async (req, res) => {
  const result = await publicEngagementService.getAllNewsletters(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Newsletters retrieved successfully",
    data: result,
  });
});

const getNewsletterById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.getNewsletterById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Newsletter retrieved successfully",
    data: result,
  });
});

const updateNewsletter = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.updateNewsletter(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Newsletter updated successfully",
    data: result,
  });
});

const deleteNewsletter = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.deleteNewsletter(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Newsletter deleted successfully",
    data: result,
  });
});


export const publicEngagementController = {
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
