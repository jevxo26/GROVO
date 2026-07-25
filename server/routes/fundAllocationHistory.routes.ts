import express from "express";
import { fundAllocationHistoryController } from "../controllers/donation/fundAllocationHistory.controller";

const router = express.Router();

router.post("/", fundAllocationHistoryController.recordFundAllocationHistory);
router.get("/", fundAllocationHistoryController.getAllFundAllocationHistories);
router.get("/fund/:fundId", fundAllocationHistoryController.getFundAllocationHistoryByFundId);
router.get("/:id", fundAllocationHistoryController.getFundAllocationHistoryById);
router.delete("/:id", fundAllocationHistoryController.deleteFundAllocationHistory);

export const fundAllocationHistoryRoutes = router;
