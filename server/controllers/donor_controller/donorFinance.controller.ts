import status from "http-status";
import { donorFinanceService } from "../../services/donor_service/donorFinance.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// ==================== 5. DONOR SUBSCRIPTION CONTROLLERS ====================
const createDonorSubscription = catchAsync(async (req, res) => {
  const result = await donorFinanceService.createDonorSubscription(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor subscription created successfully",
    data: result,
  });
});

const getAllDonorSubscriptions = catchAsync(async (req, res) => {
  const result = await donorFinanceService.getAllDonorSubscriptions(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor subscriptions retrieved successfully",
    data: result,
  });
});

const getDonorSubscriptionById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.getDonorSubscriptionById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor subscription retrieved successfully",
    data: result,
  });
});

const updateDonorSubscription = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.updateDonorSubscription(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor subscription updated successfully",
    data: result,
  });
});

const deleteDonorSubscription = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.deleteDonorSubscription(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor subscription deleted successfully",
    data: result,
  });
});


// ==================== 6. DONATION COMMITMENT CONTROLLERS ====================
const createDonationCommitment = catchAsync(async (req, res) => {
  const result = await donorFinanceService.createDonationCommitment(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donation commitment created successfully",
    data: result,
  });
});

const getAllDonationCommitments = catchAsync(async (req, res) => {
  const result = await donorFinanceService.getAllDonationCommitments(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation commitments retrieved successfully",
    data: result,
  });
});

const getDonationCommitmentById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.getDonationCommitmentById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation commitment retrieved successfully",
    data: result,
  });
});

const updateDonationCommitment = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.updateDonationCommitment(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation commitment updated successfully",
    data: result,
  });
});

const deleteDonationCommitment = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.deleteDonationCommitment(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donation commitment deleted successfully",
    data: result,
  });
});


// ==================== 7. DONOR WALLET CONTROLLERS ====================
const createDonorWallet = catchAsync(async (req, res) => {
  const result = await donorFinanceService.createDonorWallet(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor wallet created successfully",
    data: result,
  });
});

const getAllDonorWallets = catchAsync(async (req, res) => {
  const result = await donorFinanceService.getAllDonorWallets(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor wallets retrieved successfully",
    data: result,
  });
});

const getDonorWalletById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.getDonorWalletById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor wallet retrieved successfully",
    data: result,
  });
});

const updateDonorWallet = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.updateDonorWallet(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor wallet updated successfully",
    data: result,
  });
});

const deleteDonorWallet = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.deleteDonorWallet(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor wallet deleted successfully",
    data: result,
  });
});


// ==================== 8. DONOR TRANSACTION CONTROLLERS ====================
const createDonorTransaction = catchAsync(async (req, res) => {
  const result = await donorFinanceService.createDonorTransaction(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Donor transaction created successfully",
    data: result,
  });
});

const getAllDonorTransactions = catchAsync(async (req, res) => {
  const result = await donorFinanceService.getAllDonorTransactions(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor transactions retrieved successfully",
    data: result,
  });
});

const getDonorTransactionById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.getDonorTransactionById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor transaction retrieved successfully",
    data: result,
  });
});

const updateDonorTransaction = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.updateDonorTransaction(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor transaction updated successfully",
    data: result,
  });
});

const deleteDonorTransaction = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.deleteDonorTransaction(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Donor transaction deleted successfully",
    data: result,
  });
});


// ==================== 11. MEMBERSHIP FEE CONTROLLERS ====================
const createMembershipFee = catchAsync(async (req, res) => {
  const result = await donorFinanceService.createMembershipFee(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Membership fee structure created successfully",
    data: result,
  });
});

const getAllMembershipFees = catchAsync(async (req, res) => {
  const result = await donorFinanceService.getAllMembershipFees(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership fees retrieved successfully",
    data: result,
  });
});

const getMembershipFeeById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.getMembershipFeeById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership fee retrieved successfully",
    data: result,
  });
});

const updateMembershipFee = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.updateMembershipFee(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership fee updated successfully",
    data: result,
  });
});

const deleteMembershipFee = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.deleteMembershipFee(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership fee deleted successfully",
    data: result,
  });
});


// ==================== 12. MEMBERSHIP PAYMENT CONTROLLERS ====================
const createMembershipPayment = catchAsync(async (req, res) => {
  const result = await donorFinanceService.createMembershipPayment(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Membership payment created successfully",
    data: result,
  });
});

const getAllMembershipPayments = catchAsync(async (req, res) => {
  const result = await donorFinanceService.getAllMembershipPayments(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership payments retrieved successfully",
    data: result,
  });
});

const getMembershipPaymentById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.getMembershipPaymentById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership payment retrieved successfully",
    data: result,
  });
});

const updateMembershipPayment = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.updateMembershipPayment(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership payment updated successfully",
    data: result,
  });
});

const deleteMembershipPayment = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.deleteMembershipPayment(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership payment deleted successfully",
    data: result,
  });
});


// ==================== 13. MEMBERSHIP HISTORY CONTROLLERS ====================
const createMembershipHistory = catchAsync(async (req, res) => {
  const result = await donorFinanceService.createMembershipHistory(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Membership history created successfully",
    data: result,
  });
});

const getAllMembershipHistories = catchAsync(async (req, res) => {
  const result = await donorFinanceService.getAllMembershipHistories(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership histories retrieved successfully",
    data: result,
  });
});

const getMembershipHistoryById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.getMembershipHistoryById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership history retrieved successfully",
    data: result,
  });
});

const updateMembershipHistory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.updateMembershipHistory(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership history updated successfully",
    data: result,
  });
});

const deleteMembershipHistory = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await donorFinanceService.deleteMembershipHistory(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership history deleted successfully",
    data: result,
  });
});


export const donorFinanceController = {
  // DonorSubscription
  createDonorSubscription,
  getAllDonorSubscriptions,
  getDonorSubscriptionById,
  updateDonorSubscription,
  deleteDonorSubscription,
  // DonationCommitment
  createDonationCommitment,
  getAllDonationCommitments,
  getDonationCommitmentById,
  updateDonationCommitment,
  deleteDonationCommitment,
  // DonorWallet
  createDonorWallet,
  getAllDonorWallets,
  getDonorWalletById,
  updateDonorWallet,
  deleteDonorWallet,
  // DonorTransaction
  createDonorTransaction,
  getAllDonorTransactions,
  getDonorTransactionById,
  updateDonorTransaction,
  deleteDonorTransaction,
  // MembershipFee
  createMembershipFee,
  getAllMembershipFees,
  getMembershipFeeById,
  updateMembershipFee,
  deleteMembershipFee,
  // MembershipPayment
  createMembershipPayment,
  getAllMembershipPayments,
  getMembershipPaymentById,
  updateMembershipPayment,
  deleteMembershipPayment,
  // MembershipHistory
  createMembershipHistory,
  getAllMembershipHistories,
  getMembershipHistoryById,
  updateMembershipHistory,
  deleteMembershipHistory,
};
