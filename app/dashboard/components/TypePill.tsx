// app/dashboard/components/TypePill.tsx
import { AlertCircle, Zap, Info } from "lucide-react";

const TYPE_STYLES = {
  error: { bg: "bg-red-500 text-white ring-red-200", icon: <AlertCircle className="w-4 h-4" />, hex: "#ef4444" },
  warning: { bg: "bg-orange-500 text-white ring-orange-200", icon: <Zap className="w-4 h-4" />, hex: "#f97316" },
  notice: { bg: "bg-sky-500 text-sky-50 ring-sky-200", icon: <Info className="w-4 h-4" />, hex: "#0ea5e9" },
};

const getTypeStyle = (type: string) => {
  const key = type.toLowerCase() as keyof typeof TYPE_STYLES;
  return TYPE_STYLES[key] ?? { bg: "bg-gray-500 text-white", icon: null, hex: "#6b7280" };
};

export const TypePill: React.FC<{ type: string }> = ({ type }) => {
  const s = getTypeStyle(type);
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm ring-1 ring-inset ${s.bg}`}>
      {s.icon}
      {type}
    </span>
  );
};