import * as report_controller from "./report.controller";
import * as reportTemplate_controller from "./reportTemplate.controller";
import * as scheduledReport_controller from "./scheduledReport.controller";
import * as reportExport_controller from "./reportExport.controller";

export const reportsExportController = {
  ...report_controller,
  ...reportTemplate_controller,
  ...scheduledReport_controller,
  ...reportExport_controller,
};
