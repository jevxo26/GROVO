import { Router } from "express";
import { donationController } from "../controllers/donation.controller";

const router = Router();

// Route mappings linked explicitly to Controllers
router.post("/process", donationController.processDonation);

export const donationRouter = router;

