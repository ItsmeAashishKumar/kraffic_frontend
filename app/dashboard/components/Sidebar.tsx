// app/dashboard/components/Sidebar.tsx
"use client";
import { LayoutDashboard, Search, Brain, AreaChart, ClipboardCheck, FileText, FileBarChart, Settings, ChevronLeft, ChevronsLeft } from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, active: false },
  { label: "Traditional SEO", icon: <Search className="w-5 h-5" />, active: false },
  { label: "AI Discoverability", icon: <Brain className="w-5 h-5" />, active: false },
  { label: "Search Console", icon: <AreaChart className="w-5 h-5" />, active: false },
  { label: "Tasks", icon: <ClipboardCheck className="w-5 h-5" />, active: false },
  { label: "Templates", icon: <FileText className="w-5 h-5" />, active: false },
  { label: "Reports", icon: <FileBarChart className="w-5 h-5" />, active: true },
];

export const Sidebar: React.FC<{
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}> = ({ isCollapsed, setIsCollapsed }) => {
  const sidebarWidth = isCollapsed ? "w-20" : "w-64";
  const toggleIcon = isCollapsed ? <ChevronsLeft className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />;

  const getHref = (label: string) =>
    `/${label.toLowerCase().replace(/ & /g, "-").replace(/\s/g, "-")}`;

  return (
    <aside className={`fixed top-0 left-0 bottom-0 z-40 flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300 ${sidebarWidth}`}>
      <div className="h-16 flex items-center justify-center p-4 border-b border-gray-200 bg-yellow-100/50">
        <div className="font-extrabold text-lg text-gray-900 tracking-wide">
          {isCollapsed ? <LayoutDashboard className="w-6 h-6 text-yellow-500" /> : "SEO Platform"}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto pt-2 pb-4 space-y-1">
        {navItems.map((item, i) => (
          <div
            key={i}
            onClick={() => window.location.href = getHref(item.label)}
            className={`flex items-center cursor-pointer px-4 h-12 transition-all ${
              item.active
                ? "bg-yellow-100 text-yellow-800 font-bold border-r-4 border-yellow-500"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            } ${isCollapsed ? "justify-center" : "gap-3"}`}
          >
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">{item.icon}</div>
            {!isCollapsed && <span className="text-sm tracking-wide flex-1">{item.label}</span>}
          </div>
        ))}

        <div className="pt-2 border-t border-gray-100 mt-4">
          <div
            onClick={() => window.location.href = "/settings"}
            className={`flex items-center cursor-pointer px-4 h-12 transition-all text-gray-600 hover:bg-gray-50 hover:text-gray-900 ${isCollapsed ? "justify-center" : "gap-3"}`}
          >
            <Settings className="w-5 h-5" />
            {!isCollapsed && <span className="text-sm tracking-wide">Settings</span>}
          </div>
        </div>
      </nav>

      <div className="p-2 border-t border-gray-200 flex justify-end">
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