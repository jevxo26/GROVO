import express from "express";
import { UserRole } from "../../generated/prisma/enums";

import { membershipController } from "../controllers/memberShip/membership.controller";
import { checkAuth } from "../middlewares/checkAuth";

const router = express.Router();

router.post(
  "/apply",
  checkAuth(UserRole.GENERAL_MEMBER),
  membershipController.applyMembership
);

export const membershipRoutes = router;
