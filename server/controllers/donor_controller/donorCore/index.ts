import * as donor_controller from "./donor.controller";
import * as individualDonor_controller from "./individualDonor.controller";
import * as corporateDonor_controller from "./corporateDonor.controller";
import * as donorOrganization_controller from "./donorOrganization.controller";

export const donorCoreController = {
  ...donor_controller,
  ...individualDonor_controller,
  ...corporateDonor_controller,
  ...donorOrganization_controller,
};
