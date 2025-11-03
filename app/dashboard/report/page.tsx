"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

interface Website {
  _id: string;
  url: string;
  snippetId: string;
  status: string;
  createdAt: string;
}

const statusColor = {
  pending: "bg-yellow-100 text-yellow-700",
  active: "bg-green-100 text-green-700",
  inactive: "bg-red-100 text-red-700",
};

const WebsitesList: React.FC = () => {
  const router = useRouter();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uiError, setUiError] = useState(""); // 👈 For frontend-visible messages
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://ktraffic-backend.onrender.com/api/websites",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setWebsites(response.data?.data || []);
      } catch (err: any) {
        console.error("Error fetching websites:", err);
        setError(
          err.response?.data?.message || "Failed to load websites. Try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWebsites();
  }, []);

  const handleViewDetails = async (site: Website) => {
    setUiError(""); // reset UI message
    try {
      setAnalyzingId(site._id);

      const response = await axios.post(
        "http://localhost:5000/api/analyze-seo",
        {
          snippetId: site.snippetId,
        }
      );

      // Save SEO analysis data to localStorage (for detail page)
      localStorage.setItem("seo_analysis_data", JSON.stringify(response.data));

      // Redirect to the specific website detail report
      router.push(`/dashboard/report/${site._id}`);
    } catch (err: any) {
      console.error("Error analyzing SEO:", err);
      const errorMessage =
        err.response?.data?.error || err.response?.data?.message;

      if (errorMessage === "No sufficient HTML content. Capture HTML first.") {
        setUiError(
          "⚠️ Please first add the provided tracking script to your website before analyzing SEO."
        );
      } else {
        setUiError(errorMessage || "Failed to analyze SEO. Please try again.");
      }
    } finally {
      setAnalyzingId(null);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        Loading websites...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Websites</h1>

      {/* 👇 Custom inline error message */}
      {uiError && (
        <div className="mb-5 p-4 bg-yellow-100 text-yellow-800 rounded-lg border border-yellow-300 text-sm">
          {uiError}
        </div>
      )}

      {websites.length === 0 ? (
        <p className="text-center text-gray-500">No websites found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {websites.map((site) => (
            <div
              key={site._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-5 border border-gray-100 cursor-pointer hover:-translate-y-1"
            >
              {/* Status + Date */}
              <div className="flex justify-between items-center mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    statusColor[site.status as keyof typeof statusColor] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {site.status}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(site.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Domain */}
              <h2 className="text-lg font-semibold text-indigo-600 truncate">
                {new URL(site.url).hostname}
              </h2>

              {/* URL */}
              <p className="text-gray-500 text-sm truncate mt-1">{site.url}</p>

              {/* Button */}
              <button
                onClick={() => handleViewDetails(site)}
                disabled={analyzingId === site._id}
                className={`mt-5 w-full text-white py-2 rounded-lg text-sm font-medium transition ${
                  analyzingId === site._id
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-[#494646]"
                }`}
              >
                {analyzingId === site._id
                  ? "Analyzing..."
                  : "Analyze & View Details"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WebsitesList;
