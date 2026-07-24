import express from "express";
import { campaignRoutes } from "./campaign.routes";
import { campaignCategoryRoutes } from "./campaignCategory.routes";
import { campaignDonationRoutes } from "./campaignDonation.routes";
import { campaignGoalRoutes } from "./campaignGoal.routes";
import { campaignMediaRoutes } from "./campaignMedia.routes";
import { campaignMilestoneRoutes } from "./campaignMilestone.routes";
import { membershipRoutes } from "./membership.routes";
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

export const RootRouter = router;
