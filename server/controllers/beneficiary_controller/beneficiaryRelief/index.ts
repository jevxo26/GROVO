import * as reliefPackage_controller from "./reliefPackage.controller";
import * as reliefItem_controller from "./reliefItem.controller";
import * as distributionCampaign_controller from "./distributionCampaign.controller";
import * as distributionSchedule_controller from "./distributionSchedule.controller";
import * as distributionCenter_controller from "./distributionCenter.controller";
import * as beneficiaryQRCode_controller from "./beneficiaryQRCode.controller";

export const beneficiaryReliefController = {
  ...reliefPackage_controller,
  ...reliefItem_controller,
  ...distributionCampaign_controller,
  ...distributionSchedule_controller,
  ...distributionCenter_controller,
  ...beneficiaryQRCode_controller,
};
