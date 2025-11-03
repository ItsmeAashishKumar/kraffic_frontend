// app/dashboard/layout.tsx
"use client";

import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const ml = isCollapsed ? "ml-20" : "ml-64";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${ml}`}>
        <Header isCollapsed={isCollapsed} />
        <main className="flex-1 overflow-y-auto pt-16 p-4 sm:p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}