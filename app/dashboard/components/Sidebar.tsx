"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  Brain,
  AreaChart,
  ClipboardCheck,
  FileText,
  FileBarChart,
  Settings,
  ChevronLeft,
  ChevronsLeft,
  X,
} from "lucide-react";
import React from "react";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, href: "/dashboard" },
  { label: "Traditional SEO", icon: <Search className="w-5 h-5" />, href: "/traditional-seo" },
  { label: "AI Discoverability", icon: <Brain className="w-5 h-5" />, href: "/ai-discoverability" },
  { label: "Search Console", icon: <AreaChart className="w-5 h-5" />, href: "/search-console" },
  { label: "Tasks", icon: <ClipboardCheck className="w-5 h-5" />, href: "/tasks" },
  { label: "Templates", icon: <FileText className="w-5 h-5" />, href: "/templates" },
  { label: "Reports", icon: <FileBarChart className="w-5 h-5" />, href: "/dashboard/report" },
];

export const Sidebar: React.FC<{
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: (v: boolean) => void;
}> = ({ isCollapsed, setIsCollapsed, isSidebarOpen, setIsSidebarOpen }) => {
  const pathname = usePathname();
  const sidebarWidth = isCollapsed ? "w-20" : "w-64";
  const toggleIcon = isCollapsed ? <ChevronsLeft className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />;

  const isActive = (href: string) => {
    if (href === "/dashboard/report") return pathname.startsWith("/dashboard/report");
    return pathname === href;
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 bottom-0 z-40 flex flex-col h-full bg-white border-r border-gray-200 
        transition-all duration-300 ${sidebarWidth}
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between p-4 border-b border-gray-200 bg-yellow-100">
        <div className="font-extrabold text-lg text-gray-900 tracking-wide flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-yellow-500" />
          {!isCollapsed && <span>KRAFFIC</span>}
        </div>

        {/* Close icon for mobile */}
        {/* <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-white/70 hover:bg-white text-gray-700 shadow-sm hover:shadow transition-all duration-200 active:scale-95"
          onClick={() => setIsSidebarOpen && setIsSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button> */}
      </div>


      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              window.location.href = item.href;
              if (setIsSidebarOpen) setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center ${isCollapsed ? "justify-center" : "justify-start"
              } h-12 px-4 transition-all ${isActive(item.href)
                ? "bg-yellow-100 text-yellow-800 font-semibold border-r-4 border-yellow-500"
                : "text-gray-600 hover:bg-yellow-100 hover:text-gray-900"
              }`}
          >
            <div className="flex items-center gap-3 w-full justify-start">
              <div className="flex items-center justify-center w-5 h-5 shrink-0">{item.icon}</div>
              {!isCollapsed && <span className="text-sm tracking-wide leading-none">{item.label}</span>}
            </div>
          </button>
        ))}

        {/* Settings */}
        <div className="pt-4 border-t border-gray-100 mt-4">
          <button
            onClick={() => (window.location.href = "/settings")}
            className={`w-full flex items-center ${isCollapsed ? "justify-center" : "justify-start"
              } h-12 px-4 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all`}
          >
            <div className="flex items-center gap-3 w-full justify-start">
              <Settings className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span className="text-sm tracking-wide leading-none">Settings</span>}
            </div>
          </button>
        </div>
      </nav>

      {/* Collapse Button */}
      <div className="p-3 border-t border-gray-200 flex justify-end">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          {toggleIcon}
        </button>
      </div>
    </aside>
  );
};
