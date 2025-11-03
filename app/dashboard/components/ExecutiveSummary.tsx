// app/dashboard/components/ExecutiveSummary.tsx
import { Info } from "lucide-react";

export const ExecutiveSummary: React.FC<{ summary: string }> = ({ summary }) => (
  <div className="pb-6">
    <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
      <Info className="w-5 h-5 text-indigo-600" />
      Executive Summary
    </h2>
    <blockquote className="text-gray-600 leading-relaxed italic border-l-4 border-indigo-400 pl-4 py-1 bg-indigo-50/50 rounded-r-md">
      {summary}
    </blockquote>
  </div>
);