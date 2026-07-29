import * as dashboard_controller from "./dashboard.controller";
import * as dashboardWidget_controller from "./dashboardWidget.controller";
import * as dashboardLayout_controller from "./dashboardLayout.controller";
import * as kPI_controller from "./kPI.controller";

export const dashboardCoreController = {
  ...dashboard_controller,
  ...dashboardWidget_controller,
  ...dashboardLayout_controller,
  ...kPI_controller,
};
