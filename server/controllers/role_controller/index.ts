import * as roleCore from "./roleCore.controller";
import * as permission from "./permission.controller";
import * as rolePermission from "./rolePermission.controller";
import * as userRole from "./userRole.controller";
import * as staffRole from "./staffRole.controller";
import * as volunteerRole from "./volunteerRole.controller";
import * as coordinatorRole from "./coordinatorRole.controller";
import * as committeeRole from "./committeeRole.controller";
import * as adminPermission from "./adminPermission.controller";
import * as roleHierarchy from "./roleHierarchy.controller";
import * as accessLog from "./accessLog.controller";

export const roleController = {
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
