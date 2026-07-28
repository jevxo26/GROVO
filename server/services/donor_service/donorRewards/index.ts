import * as donorCertificatePrimary_service from "./donorCertificatePrimary.service";
import * as donorCertificateSecondary_service from "./donorCertificateSecondary.service";
import * as donorBadge_service from "./donorBadge.service";
import * as referral_service from "./referral.service";
import * as referralReward_service from "./referralReward.service";
import * as donorActivity_service from "./donorActivity.service";
import * as donorPreferencePrimary_service from "./donorPreferencePrimary.service";
import * as donorPreferenceSecondary_service from "./donorPreferenceSecondary.service";

export const donorRewardsService = {
  ...donorCertificatePrimary_service,
  ...donorCertificateSecondary_service,
  ...donorBadge_service,
  ...referral_service,
  ...referralReward_service,
  ...donorActivity_service,
  ...donorPreferencePrimary_service,
  ...donorPreferenceSecondary_service,
};
