import * as report_service from "./report.service";
import * as reportTemplate_service from "./reportTemplate.service";
import * as scheduledReport_service from "./scheduledReport.service";
import * as reportExport_service from "./reportExport.service";

export const reportsExportService = {
  ...report_service,
  ...reportTemplate_service,
  ...scheduledReport_service,
  ...reportExport_service,
};
