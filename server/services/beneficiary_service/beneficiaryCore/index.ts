import * as beneficiaryPrimary_service from "./beneficiaryPrimary.service";
import * as beneficiarySecondary_service from "./beneficiarySecondary.service";
import * as beneficiaryProfilePrimary_service from "./beneficiaryProfilePrimary.service";
import * as beneficiaryProfileSecondary_service from "./beneficiaryProfileSecondary.service";
import * as familyMember_service from "./familyMember.service";
import * as beneficiaryCategoryPrimary_service from "./beneficiaryCategoryPrimary.service";
import * as beneficiaryCategorySecondary_service from "./beneficiaryCategorySecondary.service";
import * as beneficiaryDocument_service from "./beneficiaryDocument.service";
import * as beneficiaryVerification_service from "./beneficiaryVerification.service";
import * as beneficiaryNeedAssessment_service from "./beneficiaryNeedAssessment.service";

export const beneficiaryCoreService = {
  ...beneficiaryPrimary_service,
  ...beneficiarySecondary_service,
  ...beneficiaryProfilePrimary_service,
  ...beneficiaryProfileSecondary_service,
  ...familyMember_service,
  ...beneficiaryCategoryPrimary_service,
  ...beneficiaryCategorySecondary_service,
  ...beneficiaryDocument_service,
  ...beneficiaryVerification_service,
  ...beneficiaryNeedAssessment_service,
};
