"use client";
import React, { useEffect, useState } from "react";

export default function WebsiteReport({ params }: { params: { id: string } }) {
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
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
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        SEO Report for Website ID: {params.id}
      </h1>
      <p className="text-gray-600 mb-4">
        Overall Score: <b>{analysis.analysis.overall_score}</b> | Grade:{" "}
        <b>{analysis.analysis.seo_grade}</b>
      </p>
      <p className="text-gray-700">{analysis.analysis.executive_summary}</p>
    </div>
  );
}
