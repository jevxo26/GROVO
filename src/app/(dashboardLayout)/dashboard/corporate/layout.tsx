"use client";

import { ReactNode, useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background relative overflow-hidden">
      {/* Mobile overlay - ডার্ক মোডেও ভালো দেখানোর জন্য bg-black/50 ঠিক আছে */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar - আপনার থিমের সাইডবার ভেরিয়েবলগুলো Sidebar কম্পোনেন্টের ভেতরেই হ্যান্ডেল করা আছে */}
      <div className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Main content - স্ক্রলিং সুন্দর করার জন্য padding যোগ করা যেতে পারে */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}