import { Router } from "express";
import { donorCoreController } from "../controllers/donor_controller/donorCore.controller";
import { donorFinanceController } from "../controllers/donor_controller/donorFinance.controller";
import { donorRewardsController } from "../controllers/donor_controller/donorRewards.controller";

const router = Router();

// Core
router.post("/donors", donorCoreController.createDonor);
router.get("/donors", donorCoreController.getAllDonors);
router.post("/individual-donors", donorCoreController.createIndividualDonor);
router.post("/corporate-donors", donorCoreController.createCorporateDonor);
router.post(
  "/donor-organizations",
  donorCoreController.createDonorOrganization,
);

// Finance & Subscriptions
router.post(
  "/donor-subscriptions",
  donorFinanceController.createDonorSubscription,
);
router.post(
  "/donation-commitments",
  donorFinanceController.createDonationCommitment,
);
router.post("/donor-wallets", donorFinanceController.createDonorWallet);
router.post(
  "/donor-transactions",
  donorFinanceController.createDonorTransaction,
);
router.post("/membership-fees", donorFinanceController.createMembershipFee);
router.post(
  "/membership-payments",
  donorFinanceController.createMembershipPayment,
);
router.post(
  "/membership-histories",
  donorFinanceController.createMembershipHistory,
);

// Rewards & Engagement
router.post(
  "/donor-certificates",
  donorRewardsController.createDonorCertificate,
);
router.post("/donor-badges", donorRewardsController.createDonorBadge);
router.post("/referrals", donorRewardsController.createReferral);
router.post("/referral-rewards", donorRewardsController.createReferralReward);
router.post("/donor-activities", donorRewardsController.createDonorActivity);
router.post("/donor-preferences", donorRewardsController.createDonorPreference);

export const donorRoutes = router;
