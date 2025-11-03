"use client";

import React, { useEffect, useState } from "react";
import { SEOAnalysisDashboard } from "../../components/SEOAnalysisDashboard";

export default function WebsiteReport({ params }: { params: { id: string } }) {
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    // Load the SEO analysis data saved from WebsitesList
    const stored = localStorage.getItem("seo_analysis_data");
    if (stored) {
      setAnalysis(JSON.parse(stored));
    }
  }, []);

  if (!analysis)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        No analysis data found.
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        SEO Report for Website ID: {params.id}
      </h1>

      {/* 👇 Render the dashboard with the fetched analysis data */}
      <SEOAnalysisDashboard analysis={analysis.analysis} />
    </div>
  );
}
