import express from "express";
import { campaignMediaController } from "../controllers/campaign/campaignMedia.controller";

const router = express.Router();

router.post("/", campaignMediaController.createCampaignMedia);
router.get("/campaign/:campaignId", campaignMediaController.getCampaignMediaByCampaignId);
router.get("/:id", campaignMediaController.getCampaignMediaById);
router.patch("/:id", campaignMediaController.updateCampaignMedia);
router.delete("/:id", campaignMediaController.deleteCampaignMedia);

export const campaignMediaRoutes = router;
