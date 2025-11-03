// app/dashboard/components/DetailedIssueCard.tsx
import { Issue } from "./types";
import { TypePill } from "./TypePill";

export const DetailedIssueCard: React.FC<{ issue: Issue }> = ({ issue }) => (
  <div className="p-4 sm:p-5 hover:bg-gray-50 transition border-t border-gray-100">
    <div className="flex items-start justify-between mb-3">
      <p className="text-base font-medium text-gray-900 flex-1 pr-4">{issue.issue}</p>
      <TypePill type={issue.severity} />
    </div>
    <div className="mt-2 text-sm text-gray-600 border-l-4 border-indigo-200 pl-3">
      <p className="font-semibold text-gray-700 mb-1">Recommendation:</p>
      <p className="leading-relaxed">{issue.recommendation}</p>
    </div>
  </div>
);