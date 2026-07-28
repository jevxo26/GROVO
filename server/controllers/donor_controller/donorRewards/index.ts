import * as donorCertificate_controller from "./donorCertificate.controller";
import * as donorBadge_controller from "./donorBadge.controller";
import * as referral_controller from "./referral.controller";
import * as referralReward_controller from "./referralReward.controller";
import * as donorActivity_controller from "./donorActivity.controller";
import * as donorPreference_controller from "./donorPreference.controller";

export const donorRewardsController = {
  ...donorCertificate_controller,
  ...donorBadge_controller,
  ...referral_controller,
  ...referralReward_controller,
  ...donorActivity_controller,
  ...donorPreference_controller,
};
