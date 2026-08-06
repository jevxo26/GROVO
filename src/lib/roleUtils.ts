export type DashboardRoleSlot =
  | "admin"
  | "nationaladmin"
  | "divisioncoordinator"
  | "districtcoordinator"
  | "upazilacoordinator"
  | "unioncoordinator"
  | "executivemember"
  | "staf"
  | "volunteer"
  | "corporate"
  | "individualdonor"
  | "member";

/**
 * Normalizes backend role names (e.g. "SUPER_ADMIN", "VOLUNTEER", "GENERAL_MEMBER", "CORPORATE_DONOR")
 * to the corresponding frontend dashboard slot key.
 */
export function normalizeRole(roleName?: string | null): DashboardRoleSlot {
  if (!roleName) return "member";

  const upper = roleName.toUpperCase().trim();

  switch (upper) {
    case "SUPER_ADMIN":
    case "ADMIN":
      return "admin";

    case "NATIONAL_ADMIN":
      return "nationaladmin";

    case "REGIONAL_ADMIN":
    case "DIVISION_COORDINATOR":
      return "divisioncoordinator";

    case "DISTRICT_COORDINATOR":
      return "districtcoordinator";

    case "UPAZILA_COORDINATOR":
      return "upazilacoordinator";

    case "UNION_COORDINATOR":
      return "unioncoordinator";

    case "COORDINATOR":
      return "divisioncoordinator";

    case "EXECUTIVE_MEMBER":
      return "executivemember";

    case "STAFF":
    case "BRANCH_STAFF":
    case "BRANCH_MANAGER":
    case "FINANCE_MANAGER":
    case "CAMPAIGN_MANAGER":
    case "SUPPORT_EXECUTIVE":
      return "staf";

    case "VOLUNTEER":
    case "VOLUNTEER_MANAGER":
      return "volunteer";

    case "CORPORATE_DONOR":
      return "corporate";

    case "INDIVIDUAL_DONOR":
    case "DONOR":
      return "individualdonor";

    case "GENERAL_MEMBER":
    case "MEMBER":
    default:
      return "member";
  }
}

/**
 * Returns the target dashboard URL for a given role.
 * In Next.js parallel routes architecture, all role slots are rendered at /dashboard.
 */
export function getRoleDashboardPath(roleName?: string | null): string {
  return "/dashboard";
}
