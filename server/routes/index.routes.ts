import express from "express";
import { membershipRoutes } from "./membership.routes";
import { userRoutes } from "./user.routes";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/user/memberships", membershipRoutes);

export const RootRouter = router;
