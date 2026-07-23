import express from "express";
import { campaignCategoryController } from "../controllers/campaign/campaignCategory.controller";

const router = express.Router();

router.post("/", campaignCategoryController.createCampaignCategory);
router.get("/", campaignCategoryController.getAllCampaignCategories);
router.get("/:id", campaignCategoryController.getCampaignCategoryById);
router.patch("/:id", campaignCategoryController.updateCampaignCategory);
router.delete("/:id", campaignCategoryController.deleteCampaignCategory);

export const campaignCategoryRoutes = router;
