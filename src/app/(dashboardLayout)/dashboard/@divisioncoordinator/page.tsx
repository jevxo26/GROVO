"use client";

import CoordinatorOverview from "@/components/dashboard/shared/CoordinatorOverview";

export default function DivisionCoordinatorPage() {
  return (
    <CoordinatorOverview
      jurisdictionName="Dhaka Division"
      jurisdictionParent="8 Districts · 45 Upazilas · 312 Unions"
      pendingApprovals={34}
    />
  );
}