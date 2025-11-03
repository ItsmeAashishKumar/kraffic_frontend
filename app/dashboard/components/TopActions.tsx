// app/dashboard/components/TopActions.tsx
import { Zap } from "lucide-react";

export const TopActions: React.FC<{ actions: string[] }> = ({ actions }) => (
  <div className="pt-6">
    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
      <Zap className="w-5 h-5 text-red-500" />
      Top 3 Priority Actions
    </h2>
    <ol className="space-y-4">
      {actions.map((a, i) => (
        <li key={i} className="flex items-start gap-3 p-3 bg-red-50/50 rounded-lg border border-red-200">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
            {i + 1}
          </span>
          <span className="text-gray-700 font-medium leading-relaxed">{a}</span>
        </li>
      ))}
    </ol>
  </div>
);