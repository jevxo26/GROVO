import * as reliefPackage_service from "./reliefPackage.service";
import * as reliefItem_service from "./reliefItem.service";
import * as distributionCampaign_service from "./distributionCampaign.service";
import * as distributionSchedule_service from "./distributionSchedule.service";
import * as distributionCenter_service from "./distributionCenter.service";
import * as beneficiaryQRCode_service from "./beneficiaryQRCode.service";

export const beneficiaryReliefService = {
  ...reliefPackage_service,
  ...reliefItem_service,
  ...distributionCampaign_service,
  ...distributionSchedule_service,
  ...distributionCenter_service,
  ...beneficiaryQRCode_service,
};
