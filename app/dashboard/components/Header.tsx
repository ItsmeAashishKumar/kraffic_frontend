// app/dashboard/components/Header.tsx
"use client";

import { useEffect, useState } from "react";

export const Header: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const name = typeof window !== "undefined" ? localStorage.getItem("name") : null;
    if (name && name.trim()) {
      setUserName(name.trim());
    }
  }, []);

  // First letter (capitalized)
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2); // max 2 letters (e.g. "John Doe" → "JD")

  return (
    <header
      className={`fixed top-0 right-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6 transition-all duration-300`}
      style={{ left: isCollapsed ? "5rem" : "16rem" }}
    >
      <div className="flex items-center gap-4">
        {/* <span className="text-sm text-gray-600 font-medium hidden sm:block">
          {userName}
        </span> */}
        <div
          className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm"
          title={userName}
        >
          {initials}
        </div>
      </div>
    </header>
  );
};