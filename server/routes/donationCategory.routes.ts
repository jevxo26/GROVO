import express from "express";
import { donationCategoryController } from "../controllers/donation/donationCategory.controller";

const router = express.Router();

router.post("/", donationCategoryController.createDonationCategory);
router.get("/", donationCategoryController.getAllDonationCategories);
router.get("/:id", donationCategoryController.getDonationCategoryById);
router.patch("/:id", donationCategoryController.updateDonationCategory);
router.delete("/:id", donationCategoryController.deleteDonationCategory);

export const donationCategoryRoutes = router;
