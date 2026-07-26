import express from "express";
import { donationScheduleController } from "../controllers/donation/donationSchedule.controller";

const router = express.Router();

router.post("/", donationScheduleController.createDonationSchedule);
router.get("/", donationScheduleController.getAllDonationSchedules);
router.get("/donor", donationScheduleController.getDonationSchedulesByDonorId);
router.get("/donor/:donorId", donationScheduleController.getDonationSchedulesByDonorId);
router.get("/:id", donationScheduleController.getDonationScheduleById);
router.patch("/:id", donationScheduleController.updateDonationSchedule);
router.delete("/:id", donationScheduleController.deleteDonationSchedule);

export const donationScheduleRoutes = router;
