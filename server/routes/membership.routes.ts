import express from "express";

import { membershipController } from "../controllers/memberShip/membership.controller";

const router = express.Router();

router.post(
  "/",  
  membershipController.applyMembership
);

router.patch(
  "/:id",
  membershipController.updateMembershipStatus
);

export const membershipRoutes = router;
