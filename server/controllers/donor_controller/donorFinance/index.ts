import * as donorSubscription_controller from "./donorSubscription.controller";
import * as donationCommitment_controller from "./donationCommitment.controller";
import * as donorWallet_controller from "./donorWallet.controller";
import * as donorTransaction_controller from "./donorTransaction.controller";
import * as membershipFee_controller from "./membershipFee.controller";
import * as membershipPayment_controller from "./membershipPayment.controller";
import * as membershipHistory_controller from "./membershipHistory.controller";

export const donorFinanceController = {
  ...donorSubscription_controller,
  ...donationCommitment_controller,
  ...donorWallet_controller,
  ...donorTransaction_controller,
  ...membershipFee_controller,
  ...membershipPayment_controller,
  ...membershipHistory_controller,
};
