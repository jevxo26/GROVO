import * as auditLog_controller from "./auditLog.controller";
import * as systemLog_controller from "./systemLog.controller";
import * as errorLog_controller from "./errorLog.controller";
import * as visitorAnalytics_controller from "./visitorAnalytics.controller";
import * as performanceMetric_controller from "./performanceMetric.controller";

export const systemAuditLogsController = {
  ...auditLog_controller,
  ...systemLog_controller,
  ...errorLog_controller,
  ...visitorAnalytics_controller,
  ...performanceMetric_controller,
};
