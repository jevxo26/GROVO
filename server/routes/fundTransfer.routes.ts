import express from "express";
import { fundTransferController } from "../controllers/donation/fundTransfer.controller";

const router = express.Router();

router.post("/", fundTransferController.createFundTransfer);
router.get("/", fundTransferController.getAllFundTransfers);
router.get("/fund/:fundId", fundTransferController.getFundTransfersByFundId);
router.get("/:id", fundTransferController.getFundTransferById);
router.delete("/:id", fundTransferController.deleteFundTransfer);

export const fundTransferRoutes = router;
