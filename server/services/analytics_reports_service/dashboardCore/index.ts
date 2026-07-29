import * as dashboard_service from "./dashboard.service";
import * as dashboardWidget_service from "./dashboardWidget.service";
import * as dashboardLayout_service from "./dashboardLayout.service";
import * as kPIPrimary_service from "./kPIPrimary.service";
import * as kPISecondary_service from "./kPISecondary.service";

export const dashboardCoreService = {
  ...dashboard_service,
  ...dashboardWidget_service,
  ...dashboardLayout_service,
  ...kPIPrimary_service,
  ...kPISecondary_service,
};
