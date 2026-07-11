import { Router } from "express";
import { DonationController } from "../controllers/donation.controller";

const router = Router();

// Route mappings linked explicitly to Controllers
router.post("/process", DonationController.processDonation);

export const donationRouter = router;
