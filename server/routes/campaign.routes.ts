import express from "express";
import { campaignController } from "../controllers/campaign/campaign.controller";

const router = express.Router();

router.post("/", campaignController.createCampaign);
router.get("/", campaignController.getAllCampaigns);
router.get("/stats", campaignController.getCampaignStats);
router.get("/slug/:slug", campaignController.getCampaignBySlug);
router.get("/:id", campaignController.getCampaignById);
router.patch("/:id", campaignController.updateCampaign);
router.delete("/:id", campaignController.deleteCampaign);

export const campaignRoutes = router;
