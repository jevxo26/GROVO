import * as beneficiary_controller from "./beneficiary.controller";
import * as beneficiaryProfile_controller from "./beneficiaryProfile.controller";
import * as familyMember_controller from "./familyMember.controller";
import * as beneficiaryCategory_controller from "./beneficiaryCategory.controller";
import * as beneficiaryDocument_controller from "./beneficiaryDocument.controller";
import * as beneficiaryVerification_controller from "./beneficiaryVerification.controller";
import * as beneficiaryNeedAssessment_controller from "./beneficiaryNeedAssessment.controller";

export const beneficiaryCoreController = {
  ...beneficiary_controller,
  ...beneficiaryProfile_controller,
  ...familyMember_controller,
  ...beneficiaryCategory_controller,
  ...beneficiaryDocument_controller,
  ...beneficiaryVerification_controller,
  ...beneficiaryNeedAssessment_controller,
};
