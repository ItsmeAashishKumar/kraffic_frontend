// app/dashboard/components/SEOAnalysisDashboard.tsx
"use client";
import { useMemo } from "react";
import { BarChart3, TrendingUp } from "lucide-react";
import { AnalysisData } from "./types";
import { InfoCard } from "./InfoCard";
import { ExecutiveSummary } from "./ExecutiveSummary";
import { TopActions } from "./TopActions";
import { CategoryBarChart } from "./CategoryBarChart";
import { IssueDonutChart } from "./IssueDonutChart";
import { DetailedIssuesReport } from "./DetailedIssuesReport";

export const SEOAnalysisDashboard: React.FC<{ analysis: AnalysisData }> = ({ analysis }) => {
  const {
    overall_score,
    seo_grade,
    executive_summary,
    top_three_actions,
    total_issues,
    detailed_report,
    visualization_data,
  } = analysis;

  const barChartData = useMemo(() => visualization_data.category_bars.map(d => ({
    name: d.name,
    score: d.score,
    fill: d.color.startsWith("#") ? d.color : d.color,
  })), [visualization_data.category_bars]);

  const donutData = useMemo(() => visualization_data.issue_type_donut.map(d => ({
    name: d.type,
    value: d.count,
  })), [visualization_data.issue_type_donut]);

  const donutColors = visualization_data.issue_type_donut.map(d => d.color);

  return (
    <div className="min-h-full bg-gray-50 p-4 sm:p-6 lg:p-10 font-sans">
      <header className="mb-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 border-b-4 border-indigo-600 inline-block pb-1">
              SEO Performance Report
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Analysis ID: <span className="font-mono text-gray-700">69049af0e29098e0bcb678ac</span>
            </p>
          </div>
          <div className="flex gap-6">
            <InfoCard title="Overall Score" value={overall_score} />
            <InfoCard title="SEO Grade" value={seo_grade} isGrade />
          </div>
        </div>
      </header>

      <main className="flex flex-col w-full gap-8">
        <div className="xl:col-span-2 space-y-8">
          <section className="bg-white p-6 shadow-xl rounded-sm border border-gray-100 divide-y divide-gray-100">
            <ExecutiveSummary summary={executive_summary} />
            <TopActions actions={top_three_actions} />
          </section>

          <DetailedIssuesReport detailed_report={detailed_report} total_issues={total_issues} />
        </div>

        <div className="w-full flex flex-col gap-4 self-start">
          <section className="bg-white p-6 shadow-lg rounded-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Category Scores
            </h2>
            <CategoryBarChart data={barChartData} />
          </section>

          <section className="bg-white p-6 shadow-lg rounded-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-600" />
              Issue Type Breakdown
            </h2>
            <IssueDonutChart data={donutData} colors={donutColors} />
          </section>
        </div>
      </main>
    </div>
  );
};