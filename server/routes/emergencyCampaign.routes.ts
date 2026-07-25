import express from "express";
import { emergencyCampaignController } from "../controllers/campaign/emergencyCampaign.controller";

const router = express.Router();

router.post("/", emergencyCampaignController.createEmergencyCampaign);
router.get("/", emergencyCampaignController.getAllEmergencyCampaigns);
router.get("/campaign/:campaignId", emergencyCampaignController.getEmergencyCampaignByCampaignId);
router.get("/:id", emergencyCampaignController.getEmergencyCampaignById);
router.patch("/:id", emergencyCampaignController.updateEmergencyCampaign);
router.delete("/:id", emergencyCampaignController.deleteEmergencyCampaign);

export const emergencyCampaignRoutes = router;
