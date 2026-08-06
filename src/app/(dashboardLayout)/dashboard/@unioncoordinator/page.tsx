"use client";

import CoordinatorOverview from "@/components/dashboard/shared/CoordinatorOverview";

export default function UnionCoordinatorPage() {
  return (
    <CoordinatorOverview
      jurisdictionName="Tetuljhora Union"
      jurisdictionParent="Savar Upazila · Dhaka District · Dhaka Division"
      pendingApprovals={8}
    />
  );
}
