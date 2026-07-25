import express from "express";
import { donationReceiptController } from "../controllers/payment/donationReceipt.controller";

const router = express.Router();

router.post("/", donationReceiptController.generateDonationReceipt);
router.get("/donation/:donationId", donationReceiptController.getDonationReceiptByDonationId);
router.get("/number/:receiptNumber", donationReceiptController.getDonationReceiptByNumber);
router.get("/:id", donationReceiptController.getDonationReceiptById);
router.delete("/:id", donationReceiptController.deleteDonationReceipt);

export const donationReceiptRoutes = router;
