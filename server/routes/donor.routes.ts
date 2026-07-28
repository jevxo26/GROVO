import { Router } from "express";
import { donorCoreController } from "../controllers/donor_controller/donorCore.controller";
import { donorFinanceController } from "../controllers/donor_controller/donorFinance.controller";
import { donorRewardsController } from "../controllers/donor_controller/donorRewards.controller";

const router = Router();

// ==================== 1. DONOR CORE ROUTES ====================
// 1. Donor
router.post("/donors", donorCoreController.createDonor);
router.get("/donors", donorCoreController.getAllDonors);
router.get("/donors/:id", donorCoreController.getDonorById);
router.patch("/donors/:id", donorCoreController.updateDonor);
router.delete("/donors/:id", donorCoreController.deleteDonor);

// 2. IndividualDonor
router.post("/individual-donors", donorCoreController.createIndividualDonor);
router.get("/individual-donors", donorCoreController.getAllIndividualDonors);
router.get("/individual-donors/:id", donorCoreController.getIndividualDonorById);
router.patch("/individual-donors/:id", donorCoreController.updateIndividualDonor);
router.delete("/individual-donors/:id", donorCoreController.deleteIndividualDonor);

// 3. CorporateDonor
router.post("/corporate-donors", donorCoreController.createCorporateDonor);
router.get("/corporate-donors", donorCoreController.getAllCorporateDonors);
router.get("/corporate-donors/:id", donorCoreController.getCorporateDonorById);
router.patch("/corporate-donors/:id", donorCoreController.updateCorporateDonor);
router.delete("/corporate-donors/:id", donorCoreController.deleteCorporateDonor);

// 4. DonorOrganization
router.post("/donor-organizations", donorCoreController.createDonorOrganization);
router.get("/donor-organizations", donorCoreController.getAllDonorOrganizations);
router.get("/donor-organizations/:id", donorCoreController.getDonorOrganizationById);
router.patch("/donor-organizations/:id", donorCoreController.updateDonorOrganization);
router.delete("/donor-organizations/:id", donorCoreController.deleteDonorOrganization);


// ==================== 2. DONOR FINANCE & MEMBERSHIP ROUTES ====================
// 5. DonorSubscription
router.post("/donor-subscriptions", donorFinanceController.createDonorSubscription);
router.get("/donor-subscriptions", donorFinanceController.getAllDonorSubscriptions);
router.get("/donor-subscriptions/:id", donorFinanceController.getDonorSubscriptionById);
router.patch("/donor-subscriptions/:id", donorFinanceController.updateDonorSubscription);
router.delete("/donor-subscriptions/:id", donorFinanceController.deleteDonorSubscription);

// 6. DonationCommitment
router.post("/donation-commitments", donorFinanceController.createDonationCommitment);
router.get("/donation-commitments", donorFinanceController.getAllDonationCommitments);
router.get("/donation-commitments/:id", donorFinanceController.getDonationCommitmentById);
router.patch("/donation-commitments/:id", donorFinanceController.updateDonationCommitment);
router.delete("/donation-commitments/:id", donorFinanceController.deleteDonationCommitment);

// 7. DonorWallet
router.post("/donor-wallets", donorFinanceController.createDonorWallet);
router.get("/donor-wallets", donorFinanceController.getAllDonorWallets);
router.get("/donor-wallets/:id", donorFinanceController.getDonorWalletById);
router.patch("/donor-wallets/:id", donorFinanceController.updateDonorWallet);
router.delete("/donor-wallets/:id", donorFinanceController.deleteDonorWallet);

// 8. DonorTransaction
router.post("/donor-transactions", donorFinanceController.createDonorTransaction);
router.get("/donor-transactions", donorFinanceController.getAllDonorTransactions);
router.get("/donor-transactions/:id", donorFinanceController.getDonorTransactionById);
router.patch("/donor-transactions/:id", donorFinanceController.updateDonorTransaction);
router.delete("/donor-transactions/:id", donorFinanceController.deleteDonorTransaction);

// 11. MembershipFee
router.post("/membership-fees", donorFinanceController.createMembershipFee);
router.get("/membership-fees", donorFinanceController.getAllMembershipFees);
router.get("/membership-fees/:id", donorFinanceController.getMembershipFeeById);
router.patch("/membership-fees/:id", donorFinanceController.updateMembershipFee);
router.delete("/membership-fees/:id", donorFinanceController.deleteMembershipFee);

// 12. MembershipPayment
router.post("/membership-payments", donorFinanceController.createMembershipPayment);
router.get("/membership-payments", donorFinanceController.getAllMembershipPayments);
router.get("/membership-payments/:id", donorFinanceController.getMembershipPaymentById);
router.patch("/membership-payments/:id", donorFinanceController.updateMembershipPayment);
router.delete("/membership-payments/:id", donorFinanceController.deleteMembershipPayment);

// 13. MembershipHistory
router.post("/membership-histories", donorFinanceController.createMembershipHistory);
router.get("/membership-histories", donorFinanceController.getAllMembershipHistories);
router.get("/membership-histories/:id", donorFinanceController.getMembershipHistoryById);
router.patch("/membership-histories/:id", donorFinanceController.updateMembershipHistory);
router.delete("/membership-histories/:id", donorFinanceController.deleteMembershipHistory);


// ==================== 3. DONOR REWARDS & ENGAGEMENT ROUTES ====================
// 9. DonorCertificate
router.post("/donor-certificates", donorRewardsController.createDonorCertificate);
router.get("/donor-certificates", donorRewardsController.getAllDonorCertificates);
router.get("/donor-certificates/:id", donorRewardsController.getDonorCertificateById);
router.patch("/donor-certificates/:id", donorRewardsController.updateDonorCertificate);
router.delete("/donor-certificates/:id", donorRewardsController.deleteDonorCertificate);

// 10. DonorBadge
router.post("/donor-badges", donorRewardsController.createDonorBadge);
router.get("/donor-badges", donorRewardsController.getAllDonorBadges);
router.get("/donor-badges/:id", donorRewardsController.getDonorBadgeById);
router.patch("/donor-badges/:id", donorRewardsController.updateDonorBadge);
router.delete("/donor-badges/:id", donorRewardsController.deleteDonorBadge);

// 14. Referral
router.post("/referrals", donorRewardsController.createReferral);
router.get("/referrals", donorRewardsController.getAllReferrals);
router.get("/referrals/:id", donorRewardsController.getReferralById);
router.patch("/referrals/:id", donorRewardsController.updateReferral);
router.delete("/referrals/:id", donorRewardsController.deleteReferral);

// 15. ReferralReward
router.post("/referral-rewards", donorRewardsController.createReferralReward);
router.get("/referral-rewards", donorRewardsController.getAllReferralRewards);
router.get("/referral-rewards/:id", donorRewardsController.getReferralRewardById);
router.patch("/referral-rewards/:id", donorRewardsController.updateReferralReward);
router.delete("/referral-rewards/:id", donorRewardsController.deleteReferralReward);

// 16. DonorActivity
router.post("/donor-activities", donorRewardsController.createDonorActivity);
router.get("/donor-activities", donorRewardsController.getAllDonorActivities);
router.get("/donor-activities/:id", donorRewardsController.getDonorActivityById);
router.delete("/donor-activities/:id", donorRewardsController.deleteDonorActivity);

// 17. DonorPreference
router.post("/donor-preferences", donorRewardsController.createDonorPreference);
router.get("/donor-preferences", donorRewardsController.getAllDonorPreferences);
router.get("/donor-preferences/:id", donorRewardsController.getDonorPreferenceById);
router.patch("/donor-preferences/:id", donorRewardsController.updateDonorPreference);
router.delete("/donor-preferences/:id", donorRewardsController.deleteDonorPreference);

export const donorRoutes = router;
