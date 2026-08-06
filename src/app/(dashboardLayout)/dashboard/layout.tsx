"use client";

import { ReactNode, useState } from "react";
import { Sidebar, UserRole } from "./Components/Sidebar";
import { Header } from "./Components/Header";
import { useGetUserProfileQuery } from "@/redux/slices/userSlice";
import { normalizeRole } from "@/lib/roleUtils";

export default function DashboardLayout({
  volunteer,
  member,
  staf,
  corporate,
  executivemember,
  individualdonor,
  admin,
  nationaladmin,
  divisioncoordinator,
  districtcoordinator,
  upazilacoordinator,
  unioncoordinator,
  role: overrideRole,
}: {
  volunteer: ReactNode;
  member: ReactNode;
  staf: ReactNode;
  corporate: ReactNode;
  executivemember: ReactNode;
  individualdonor: ReactNode;
  admin: ReactNode;
  nationaladmin: ReactNode;
  divisioncoordinator: ReactNode;
  districtcoordinator: ReactNode;
  upazilacoordinator: ReactNode;
  unioncoordinator: ReactNode;
  role?: UserRole;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch active user profile reactively via RTK Query
  const { data: profileRes, isLoading } = useGetUserProfileQuery();
  const userProfile = profileRes?.data || profileRes;

  // Resolve dynamic role from RTK Query user profile, or overrideRole, falling back to 'member'
  const rawRoleName =
    userProfile?.role ||
    userProfile?.roleAssignments?.[0]?.role?.roleName ||
    userProfile?.membership?.[0]?.membershipType;

  const activeRole: UserRole = overrideRole || (rawRoleName ? normalizeRole(rawRoleName) : "admin");

  return (
    <div className="flex min-h-screen bg-background relative overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar role={activeRole} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header role={activeRole} onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto bg-background">
          <div className="mx-auto w-full p-5">
            {isLoading ? (
              <div className="flex items-center justify-center py-20 text-gray-500 text-sm">
                Loading dashboard...
              </div>
            ) : (
              <>
                {activeRole === "volunteer" && <div>{volunteer}</div>}
                {activeRole === "member" && <div>{member}</div>}
                {activeRole === "staf" && <div>{staf}</div>}
                {activeRole === "corporate" && <div>{corporate}</div>}
                {activeRole === "executivemember" && <div>{executivemember}</div>}
                {activeRole === "individualdonor" && <div>{individualdonor}</div>}
                {activeRole === "admin" && <div>{admin}</div>}
                {activeRole === "nationaladmin" && <div>{nationaladmin}</div>}
                {activeRole === "divisioncoordinator" && <div>{divisioncoordinator}</div>}
                {activeRole === "districtcoordinator" && <div>{districtcoordinator}</div>}
                {activeRole === "upazilacoordinator" && <div>{upazilacoordinator}</div>}
                {activeRole === "unioncoordinator" && <div>{unioncoordinator}</div>}
              </>
            )}
          </div>
        </main> 
      </div>
    </div>
  );
}