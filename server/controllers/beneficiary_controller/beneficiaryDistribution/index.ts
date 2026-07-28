import * as distributionRecord_controller from "./distributionRecord.controller";
import * as distributionItem_controller from "./distributionItem.controller";
import * as distributionVerification_controller from "./distributionVerification.controller";
import * as acknowledgement_controller from "./acknowledgement.controller";
import * as beneficiaryFeedback_controller from "./beneficiaryFeedback.controller";
import * as followUpVisit_controller from "./followUpVisit.controller";
import * as caseHistory_controller from "./caseHistory.controller";
import * as beneficiaryActivityLog_controller from "./beneficiaryActivityLog.controller";

export const beneficiaryDistributionController = {
  ...distributionRecord_controller,
  ...distributionItem_controller,
  ...distributionVerification_controller,
  ...acknowledgement_controller,
  ...beneficiaryFeedback_controller,
  ...followUpVisit_controller,
  ...caseHistory_controller,
  ...beneficiaryActivityLog_controller,
};
