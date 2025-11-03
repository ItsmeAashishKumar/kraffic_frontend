// app/dashboard/components/Sidebar.tsx
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
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    href: "/dashboard",
  },
  {
    label: "Traditional SEO",
    icon: <Search className="w-5 h-5" />,
    href: "/traditional-seo",
  },
  {
    label: "AI Discoverability",
    icon: <Brain className="w-5 h-5" />,
    href: "/ai-discoverability",
  },
  {
    label: "Search Console",
    icon: <AreaChart className="w-5 h-5" />,
    href: "/search-console",
  },
  {
    label: "Tasks",
    icon: <ClipboardCheck className="w-5 h-5" />,
    href: "/tasks",
  },
  {
    label: "Templates",
    icon: <FileText className="w-5 h-5" />,
    href: "/templates",
  },
  {
    label: "Reports",
    icon: <FileBarChart className="w-5 h-5" />,
    href: "/dashboard/report",
  },
];

export const Sidebar: React.FC<{
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}> = ({ isCollapsed, setIsCollapsed }) => {
  const pathname = usePathname(); // <-- current URL

  const sidebarWidth = isCollapsed ? "w-20" : "w-64";
  const toggleIcon = isCollapsed ? (
    <ChevronsLeft className="w-5 h-5" />
  ) : (
    <ChevronLeft className="w-5 h-5" />
  );

  const isActive = (href: string) => {
    if (href === "/dashboard/report") {
      return pathname.startsWith("/dashboard/report");
    }
    return pathname === href;
  };

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300 ${sidebarWidth}`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center p-4 border-b border-gray-200 bg-yellow-100/50">
        <div className="font-extrabold text-lg text-gray-900 tracking-wide">
          {isCollapsed ? (
            <LayoutDashboard className="w-6 h-6 text-yellow-500" />
          ) : (
            "KRAFFIC"
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto pt-2 pb-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => (window.location.href = item.href)}
            className={`w-full flex items-center px-4 h-12 transition-all ${
              isActive(item.href)
                ? "bg-yellow-100 text-yellow-800 font-bold border-r-4 border-yellow-500"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            } ${isCollapsed ? "justify-center" : "gap-3"}`}
          >
            <div className="w-5 h-5 flex items-center justify-center ">
              {item.icon}
            </div>
            {!isCollapsed && (
              <span className="text-sm tracking-wide flex-1">{item.label}</span>
            )}
          </button>
        ))}

        {/* Settings */}
        <div className="pt-2 border-t border-gray-100 mt-4">
          <button
            onClick={() => (window.location.href = "/settings")}
            className={`w-full flex items-center px-4 h-12 transition-all text-gray-600 hover:bg-gray-50 hover:text-gray-900 ${
              isCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            <Settings className="w-5 h-5" />
            {!isCollapsed && (
              <span className="text-sm tracking-wide">Settings</span>
            )}
          </button>
        </div>
      </nav>

      {/* Collapse Button */}
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
