"use client";

import CoordinatorOverview from "@/components/dashboard/shared/CoordinatorOverview";

export default function DistrictCoordinatorPage() {
  return (
    <CoordinatorOverview
      jurisdictionName="Dhaka District"
      jurisdictionParent="Dhaka Division · 13 Upazilas · 87 Unions"
      pendingApprovals={22}
    />
  );
}