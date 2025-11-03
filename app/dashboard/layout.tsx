// app/dashboard/layout.tsx
"use client";
import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const contentMl = isSidebarCollapsed ? "ml-20" : "ml-64";

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${contentMl}`}>
        <Header isCollapsed={isSidebarCollapsed} />
        <main className="flex-1 overflow-y-auto bg-gray-50 pt-16">{children}</main>
      </div>
    </div>
  );
}