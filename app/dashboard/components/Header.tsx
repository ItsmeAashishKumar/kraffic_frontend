"use client";

import React, { useState, useEffect, useRef } from "react";
import api from "@/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // ✅ Import js-cookie

export const Header: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  const [userName, setUserName] = useState("User");
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) setUserName(name);

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowLogout(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout"); // Call logout API
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // ✅ Clear localStorage
      localStorage.removeItem("_id");
      localStorage.removeItem("email");
      localStorage.removeItem("name");

      // ✅ Clear token from cookies
      Cookies.remove("token");

      router.push("/login");
    }
  };

  // Generate initials (first letters of name)
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header
      className={`fixed top-0 right-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6 transition-all duration-300`}
      style={{ left: isCollapsed ? "5rem" : "16rem" }}
    >
      <div className="relative flex items-center gap-4" ref={dropdownRef}>
        {/* <span className="text-sm text-gray-500 font-medium">{userName}</span> */}

        <div
          className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:ring-2 hover:ring-indigo-400 transition"
          onClick={() => setShowLogout((prev) => !prev)}
        >
          {getInitials(userName)}
        </div>

        {showLogout && (
          <div className="absolute right-0 top-14 w-40 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-fade-in">
            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
              Signed in as <br />
              <span className="font-medium">{userName}</span>
            </div>
            <button
              className="w-full text-left px-4 py-2 text-sm text-white bg-red-500 rounded-b-lg hover:bg-red-600 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
