import * as donorSubscription_service from "./donorSubscription.service";
import * as donationCommitmentPrimary_service from "./donationCommitmentPrimary.service";
import * as donationCommitmentSecondary_service from "./donationCommitmentSecondary.service";
import * as donorWallet_service from "./donorWallet.service";
import * as donorTransactionPrimary_service from "./donorTransactionPrimary.service";
import * as donorTransactionSecondary_service from "./donorTransactionSecondary.service";
import * as membershipFee_service from "./membershipFee.service";
import * as membershipPaymentPrimary_service from "./membershipPaymentPrimary.service";
import * as membershipPaymentSecondary_service from "./membershipPaymentSecondary.service";
import * as membershipHistory_service from "./membershipHistory.service";

export const donorFinanceService = {
  ...donorSubscription_service,
  ...donationCommitmentPrimary_service,
  ...donationCommitmentSecondary_service,
  ...donorWallet_service,
  ...donorTransactionPrimary_service,
  ...donorTransactionSecondary_service,
  ...membershipFee_service,
  ...membershipPaymentPrimary_service,
  ...membershipPaymentSecondary_service,
  ...membershipHistory_service,
};
