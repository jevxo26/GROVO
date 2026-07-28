import * as roleCore from "./roleCore.service";
import * as permission from "./permission.service";
import * as rolePermission from "./rolePermission.service";
import * as userRole from "./userRole.service";
import * as staffRole from "./staffRole.service";
import * as volunteerRole from "./volunteerRole.service";
import * as coordinatorRole from "./coordinatorRole.service";
import * as committeeRole from "./committeeRole.service";
import * as adminPermission from "./adminPermission.service";
import * as roleHierarchy from "./roleHierarchy.service";
import * as accessLog from "./accessLog.service";

export const roleServices = {
  ...roleCore,
  ...permission,
  ...rolePermission,
  ...userRole,
  ...staffRole,
  ...volunteerRole,
  ...coordinatorRole,
  ...committeeRole,
  ...adminPermission,
  ...roleHierarchy,
  ...accessLog,
};
