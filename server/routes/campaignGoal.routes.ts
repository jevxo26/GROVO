import express from "express";
import { campaignGoalController } from "../controllers/campaign/campaignGoal.controller";

const router = express.Router();

router.post("/", campaignGoalController.createCampaignGoal);
router.get("/campaign/:campaignId", campaignGoalController.getCampaignGoalsByCampaignId);
router.get("/:id", campaignGoalController.getCampaignGoalById);
router.patch("/:id", campaignGoalController.updateCampaignGoal);
router.delete("/:id", campaignGoalController.deleteCampaignGoal);

export const campaignGoalRoutes = router;
