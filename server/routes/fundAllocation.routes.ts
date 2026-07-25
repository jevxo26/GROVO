import express from "express";
import { fundAllocationController } from "../controllers/project/fundAllocation.controller";

const router = express.Router();

router.post("/", fundAllocationController.createFundAllocation);
router.get("/campaign/:campaignId", fundAllocationController.getFundAllocationsByCampaignId);
router.get("/project/:projectId", fundAllocationController.getFundAllocationsByProjectId);
router.get("/:id", fundAllocationController.getFundAllocationById);
router.delete("/:id", fundAllocationController.deleteFundAllocation);

export const fundAllocationRoutes = router;
