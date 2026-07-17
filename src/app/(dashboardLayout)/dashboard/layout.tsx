"use client";

import { ReactNode, useState } from "react";
import { Sidebar, UserRole } from "./Components/Sidebar";
import { Header } from "./Components/Header";

export default function DashboardLayout({
  volunteer,
  member,
  staf,
  corporate,
  executivemember,
  individualdonor,
  role = "individualdonor"
}: {
  volunteer: ReactNode;
  member: ReactNode;
  staf: ReactNode;
  corporate: ReactNode;
  executivemember: ReactNode;
  individualdonor: ReactNode;
  role?: UserRole;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background relative overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - এখানে role পাস করা হয়েছে */}
      <div className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar role={role} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header role={role} onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto bg-background">
          <div className="mx-auto w-full">
            {role === "volunteer" && <div>{volunteer}</div>}
            {role === "member" && <div>{member}</div>}
            {role === "staf" && <div>{staf}</div>}
            {role === "corporate" && <div>{corporate}</div>}
            {role === "executivemember" && <div>{executivemember}</div>}
            {role === "individualdonor" && <div>{individualdonor}</div>}
          </div>
        </main>
      </div>
    </div>
  );
}