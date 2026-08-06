"use client";

import { ReactNode, useState, useEffect } from "react";
import { Sidebar, UserRole } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { useGetUserProfileQuery } from "@/redux/slices/userSlice";
import { normalizeRole } from "@/lib/roleUtils";

export default function DashboardLayout({
  children,
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
  role: overrideRoleProp,
}: {
  children?: ReactNode;
  volunteer?: ReactNode;
  member?: ReactNode;
  staf?: ReactNode;
  corporate?: ReactNode;
  executivemember?: ReactNode;
  individualdonor?: ReactNode;
  admin?: ReactNode;
  nationaladmin?: ReactNode;
  divisioncoordinator?: ReactNode;
  districtcoordinator?: ReactNode;
  upazilacoordinator?: ReactNode;
  unioncoordinator?: ReactNode;
  role?: UserRole;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [testRole, setTestRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ashray_active_role") as UserRole | null;
    if (saved) {
      setTestRole(saved);
    }
  }, []);

  const handleRoleChange = (newRole: UserRole) => {
    setTestRole(newRole);
    localStorage.setItem("ashray_active_role", newRole);
  };

  // Fetch active user profile reactively via RTK Query
  const { data: profileRes, isLoading } = useGetUserProfileQuery();
  const userProfile = profileRes?.data || profileRes;

  // Resolve dynamic role from RTK Query user profile, testRole, or overrideRoleProp, falling back to 'admin'
  const rawRoleName =
    userProfile?.role ||
    userProfile?.roleAssignments?.[0]?.role?.roleName ||
    userProfile?.membership?.[0]?.membershipType;

  const activeRole: UserRole =
    testRole || overrideRoleProp || (rawRoleName ? normalizeRole(rawRoleName) : "admin");

  return (
    <div className="flex min-h-screen bg-background relative overflow-hidden font-sans">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar role={activeRole} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header role={activeRole} onRoleChange={handleRoleChange} onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto bg-background/50">
          <div className="mx-auto w-full p-4 md:p-6 max-w-7xl">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-medium">Loading workspace layout...</span>
              </div>
            ) : (
              <>
                {activeRole === "volunteer" && <div>{volunteer || children}</div>}
                {activeRole === "member" && <div>{member || children}</div>}
                {activeRole === "staf" && <div>{staf || children}</div>}
                {activeRole === "corporate" && <div>{corporate || children}</div>}
                {activeRole === "executivemember" && <div>{executivemember || children}</div>}
                {activeRole === "individualdonor" && <div>{individualdonor || children}</div>}
                {activeRole === "admin" && <div>{admin || children}</div>}
                {activeRole === "nationaladmin" && <div>{nationaladmin || children}</div>}
                {activeRole === "divisioncoordinator" && <div>{divisioncoordinator || children}</div>}
                {activeRole === "districtcoordinator" && <div>{districtcoordinator || children}</div>}
                {activeRole === "upazilacoordinator" && <div>{upazilacoordinator || children}</div>}
                {activeRole === "unioncoordinator" && <div>{unioncoordinator || children}</div>}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}