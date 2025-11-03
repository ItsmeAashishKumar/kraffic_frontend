"use client";

import React, { useState } from "react";
import api from "@/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🔹 Send login request
      const response = await api.post("/api/auth/login", { email, password });
      console.log("Login successful:", response.data);

      if (response.data?.success && response.data?.data) {
        const { _id, name, email, token } = response.data.data;

        // ✅ Store each value separately in localStorage
        localStorage.setItem("_id", _id);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("token", token);
      }

      // ✅ Redirect to /dashboard/report
      router.push("/dashboard/report");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
