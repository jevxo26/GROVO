"use client";

import CoordinatorOverview from "@/components/dashboard/shared/CoordinatorOverview";

export default function UpazilaCoordinatorPage() {
  return (
    <CoordinatorOverview
      jurisdictionName="Savar Upazila"
      jurisdictionParent="Dhaka District · Dhaka Division · 9 Unions"
      pendingApprovals={18}
    />
  );
}
