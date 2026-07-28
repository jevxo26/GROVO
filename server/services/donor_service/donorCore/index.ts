import * as donorPrimary_service from "./donorPrimary.service";
import * as donorSecondary_service from "./donorSecondary.service";
import * as individualDonorPrimary_service from "./individualDonorPrimary.service";
import * as individualDonorSecondary_service from "./individualDonorSecondary.service";
import * as corporateDonorPrimary_service from "./corporateDonorPrimary.service";
import * as corporateDonorSecondary_service from "./corporateDonorSecondary.service";
import * as donorOrganizationPrimary_service from "./donorOrganizationPrimary.service";
import * as donorOrganizationSecondary_service from "./donorOrganizationSecondary.service";

export const donorCoreService = {
  ...donorPrimary_service,
  ...donorSecondary_service,
  ...individualDonorPrimary_service,
  ...individualDonorSecondary_service,
  ...corporateDonorPrimary_service,
  ...corporateDonorSecondary_service,
  ...donorOrganizationPrimary_service,
  ...donorOrganizationSecondary_service,
};
