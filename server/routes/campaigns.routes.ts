import { Router } from "express";
import { campaignsController } from "../controllers/campaigns.controller";

const router = Router();

// Public & User listings
router.get("/", campaignsController.listCampaigns);
router.get("/:slug", campaignsController.getCampaignBySlug);
router.get("/:id/transparency-report", campaignsController.getTransparencyReport);

// Admin-only campaign operations
router.post("/", campaignsController.createCampaign);
router.post("/:id/publish", campaignsController.publishCampaign);

// Project management operations
router.post("/projects", campaignsController.createProject);
router.post("/projects/:id/expenses", campaignsController.createProjectExpense);
router.post("/projects/:id/updates", campaignsController.createProjectUpdate);

// Fund allocations
router.post("/fund-allocations", campaignsController.createFundAllocation);

// Expense approvals
router.post("/expenses/:id/approve", campaignsController.approveProjectExpense);

export const campaignsRouter = router;
