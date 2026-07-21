import express from "express";
import { userRouter } from "./user.routes";
import { membershipRouter } from "./membership.routes";

const router = express.Router();

router.use("/user", userRouter);
router.use("/membership", membershipRouter);

export const RootRouter = router;
