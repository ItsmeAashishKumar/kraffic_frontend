// app/dashboard/components/DetailedIssuesReport.tsx
import { AlertCircle } from "lucide-react";
import { DetailedIssueCard } from "./DetailedIssueCard";

export const DetailedIssuesReport: React.FC<{
  detailed_report: Record<string, { score: number; issues: any[] }>;
  total_issues: number;
}> = ({ detailed_report, total_issues }) => (
  <section>
    <h2 className="text-2xl font-extrabold text-gray-800 mb-6 flex items-center gap-3">
      <AlertCircle className="w-6 h-6 text-red-600" />
      Detailed Issues Report
      <span className="text-base font-semibold text-gray-500 ml-2">({total_issues} Total)</span>
    </h2>

    {Object.entries(detailed_report).map(([cat, rep]) => (
      <div key={cat} className="bg-white shadow-lg rounded-xl mb-6 border border-gray-200 overflow-hidden">
        <div className="p-5 bg-indigo-50 border-b border-indigo-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-indigo-900">{cat}</h3>
          <span className="px-3 py-1 text-sm font-extrabold rounded-md bg-indigo-600 text-white shadow-md">
            Score: {rep.score}/100
          </span>
        </div>

        {rep.issues.length ? (
          <div className="divide-y divide-gray-100">
            {rep.issues.map((iss, idx) => (
              <DetailedIssueCard key={idx} issue={iss} />
            ))}
          </div>
        ) : (
          <p className="p-5 text-gray-500 italic text-center">No issues in this category. Great job!</p>
        )}
      </div>
    ))}
  </section>
);