import express from "express";
import { campaignMilestoneController } from "../controllers/campaign/campaignMilestone.controller";

const router = express.Router();

router.post("/", campaignMilestoneController.createCampaignMilestone);
router.get("/campaign/:campaignId", campaignMilestoneController.getCampaignMilestonesByCampaignId);
router.get("/:id", campaignMilestoneController.getCampaignMilestoneById);
router.patch("/:id", campaignMilestoneController.updateCampaignMilestone);
router.delete("/:id", campaignMilestoneController.deleteCampaignMilestone);

export const campaignMilestoneRoutes = router;
