import status from "http-status";
import { publicEngagementService } from "../../../services/events_media_service/publicEngagement.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 17. TESTIMONIAL CONTROLLERS ====================
export const createTestimonial = catchAsync(async (req, res) => {
  const result = await publicEngagementService.createTestimonial(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Testimonial created successfully",
    data: result,
  });
});

export const getAllTestimonials = catchAsync(async (req, res) => {
  const result = await publicEngagementService.getAllTestimonials(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Testimonials retrieved successfully",
    data: result,
  });
});

export const getTestimonialById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.getTestimonialById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Testimonial retrieved successfully",
    data: result,
  });
});

export const updateTestimonial = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.updateTestimonial(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Testimonial updated successfully",
    data: result,
  });
});

export const deleteTestimonial = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await publicEngagementService.deleteTestimonial(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Testimonial deleted successfully",
    data: result,
  });
});
