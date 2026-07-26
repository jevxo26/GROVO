import { Request, Response } from "express";
import { PublicEngagementService } from "../../services/events_media_service/publicEngagement.service";

const createLiveDonationFeed = async (req: Request, res: Response) => {
  try {
    const result = await PublicEngagementService.createLiveDonationFeed(
      req.body,
    );
    res
      .status(201)
      .json({ success: true, message: "Live donation recorded", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getLiveDonationTicker = async (req: Request, res: Response) => {
  try {
    const result = await PublicEngagementService.getLiveDonationTicker();
    res.status(200).json({
      success: true,
      message: "Live donation ticker retrieved",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createSuccessStory = async (req: Request, res: Response) => {
  try {
    const result = await PublicEngagementService.createSuccessStory(req.body);
    res
      .status(201)
      .json({ success: true, message: "Success story created", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const attachStoryMedia = async (req: Request, res: Response) => {
  try {
    const result = await PublicEngagementService.attachStoryMedia(req.body);
    res
      .status(201)
      .json({ success: true, message: "Media linked to story", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createTestimonial = async (req: Request, res: Response) => {
  try {
    const result = await PublicEngagementService.createTestimonial(req.body);
    res
      .status(201)
      .json({ success: true, message: "Testimonial submitted", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createPressRelease = async (req: Request, res: Response) => {
  try {
    const result = await PublicEngagementService.createPressRelease(req.body);
    res
      .status(201)
      .json({ success: true, message: "Press release created", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createNews = async (req: Request, res: Response) => {
  try {
    const result = await PublicEngagementService.createNews(req.body);
    res
      .status(201)
      .json({ success: true, message: "News article published", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createNewsletter = async (req: Request, res: Response) => {
  try {
    const result = await PublicEngagementService.createNewsletter(req.body);
    res
      .status(201)
      .json({ success: true, message: "Newsletter drafted", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const PublicEngagementController = {
  createLiveDonationFeed,
  getLiveDonationTicker,
  createSuccessStory,
  attachStoryMedia,
  createTestimonial,
  createPressRelease,
  createNews,
  createNewsletter,
};
