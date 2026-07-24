import express from "express";
import { campaignRoutes } from "./campaign.routes";
import { campaignCategoryRoutes } from "./campaignCategory.routes";
import { campaignGoalRoutes } from "./campaignGoal.routes";
import { membershipRoutes } from "./membership.routes";
import { userRoutes } from "./user.routes";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/user/memberships", membershipRoutes);
router.use("/campaign-categories", campaignCategoryRoutes);
router.use("/campaigns", campaignRoutes);
router.use("/campaign-goals", campaignGoalRoutes);

export const RootRouter = router;
