import express from "express";
import { campaignCategoryRoutes } from "./campaignCategory.routes";
import { membershipRoutes } from "./membership.routes";
import { userRoutes } from "./user.routes";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/user/memberships", membershipRoutes);
router.use("/campaign-categories", campaignCategoryRoutes);

export const RootRouter = router;
