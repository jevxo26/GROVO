import express from "express";
import { campaignRoutes } from "./campaign.routes";
import { campaignCategoryRoutes } from "./campaignCategory.routes";
import { campaignDonationRoutes } from "./campaignDonation.routes";
import { campaignGoalRoutes } from "./campaignGoal.routes";
import { campaignMediaRoutes } from "./campaignMedia.routes";
import { campaignMilestoneRoutes } from "./campaignMilestone.routes";
import { emergencyCampaignRoutes } from "./emergencyCampaign.routes";
import { expenseAttachmentRoutes } from "./expenseAttachment.routes";
import { membershipRoutes } from "./membership.routes";
import { projectRoutes } from "./project.routes";
import { projectBeneficiaryRoutes } from "./projectBeneficiary.routes";
import { projectBudgetRoutes } from "./projectBudget.routes";
import { projectCategoryRoutes } from "./projectCategory.routes";
import { projectExpenseRoutes } from "./projectExpense.routes";
import { userRoutes } from "./user.routes";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/user/memberships", membershipRoutes);
router.use("/campaigns", campaignRoutes);
router.use("/campaign-categories", campaignCategoryRoutes);
router.use("/campaign-goals", campaignGoalRoutes);
router.use("/campaign-milestones", campaignMilestoneRoutes);
router.use("/campaign-media", campaignMediaRoutes);
router.use("/campaign-donations", campaignDonationRoutes);
router.use("/emergency-campaigns", emergencyCampaignRoutes);
router.use("/project-categories", projectCategoryRoutes);
router.use("/projects", projectRoutes);
router.use("/project-budgets", projectBudgetRoutes);
router.use("/project-expenses", projectExpenseRoutes);
router.use("/expense-attachments", expenseAttachmentRoutes);
router.use("/project-beneficiaries", projectBeneficiaryRoutes);

export const RootRouter = router;
