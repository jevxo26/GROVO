import * as distributionRecord_service from "./distributionRecord.service";
import * as distributionItem_service from "./distributionItem.service";
import * as distributionVerification_service from "./distributionVerification.service";
import * as acknowledgement_service from "./acknowledgement.service";
import * as beneficiaryFeedback_service from "./beneficiaryFeedback.service";
import * as followUpVisit_service from "./followUpVisit.service";
import * as caseHistory_service from "./caseHistory.service";
import * as beneficiaryActivityLog_service from "./beneficiaryActivityLog.service";

export const beneficiaryDistributionService = {
  ...distributionRecord_service,
  ...distributionItem_service,
  ...distributionVerification_service,
  ...acknowledgement_service,
  ...beneficiaryFeedback_service,
  ...followUpVisit_service,
  ...caseHistory_service,
  ...beneficiaryActivityLog_service,
};
