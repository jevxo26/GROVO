import * as auditLog_service from "./auditLog.service";
import * as systemLog_service from "./systemLog.service";
import * as errorLog_service from "./errorLog.service";
import * as visitorAnalytics_service from "./visitorAnalytics.service";
import * as performanceMetric_service from "./performanceMetric.service";

export const systemAuditLogsService = {
  ...auditLog_service,
  ...systemLog_service,
  ...errorLog_service,
  ...visitorAnalytics_service,
  ...performanceMetric_service,
};
