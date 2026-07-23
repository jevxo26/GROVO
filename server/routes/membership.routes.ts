import express from "express";

import { membershipController } from "../controllers/memberShip/membership.controller";

const router = express.Router();

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

export const membershipRoutes = router;
