import { Request, Response } from "express";
import { MediaGalleryService } from "../../services/events_media_service/mediaGallery.service";

const createMediaCategory = async (req: Request, res: Response) => {
  try {
    const result = await MediaGalleryService.createMediaCategory(req.body);
    res
      .status(201)
      .json({ success: true, message: "Media category created", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const uploadMedia = async (req: Request, res: Response) => {
  try {
    const result = await MediaGalleryService.uploadMedia(req.body);
    res.status(201).json({
      success: true,
      message: "Media uploaded successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllMedia = async (req: Request, res: Response) => {
  try {
    const result = await MediaGalleryService.getAllMedia(req.query);
    res.status(200).json({
      success: true,
      message: "Media retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createAlbum = async (req: Request, res: Response) => {
  try {
    const result = await MediaGalleryService.createAlbum(req.body);
    res.status(201).json({
      success: true,
      message: "Album created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const attachMediaToAlbum = async (req: Request, res: Response) => {
  try {
    const result = await MediaGalleryService.attachMediaToAlbum(req.body);
    res
      .status(201)
      .json({ success: true, message: "Media linked to album", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const linkAlbumToEvent = async (req: Request, res: Response) => {
  try {
    const result = await MediaGalleryService.linkAlbumToEvent(req.body);
    res
      .status(201)
      .json({ success: true, message: "Album linked to event", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const MediaGalleryController = {
  createMediaCategory,
  uploadMedia,
  getAllMedia,
  createAlbum,
  attachMediaToAlbum,
  linkAlbumToEvent,
};
