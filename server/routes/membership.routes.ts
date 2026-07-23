import express from "express";

import { membershipController } from "../controllers/memberShip/membership.controller";

const router = express.Router();

router.get(
  "/",
  membershipController.getAllMemberships
);

router.post(
  "/",  
  membershipController.applyMembership
);

router.patch(
  "/status/:id",
  membershipController.updateMembershipStatus
);

router.post(
  "/verify-qr",
  membershipController.verifyQrCode
);

router.post(
  "/renew/:id",
  membershipController.renewMembership
);

router.get(
  "/activities/:id",
  membershipController.getMembershipActivities
);

export const membershipRoutes = router;
