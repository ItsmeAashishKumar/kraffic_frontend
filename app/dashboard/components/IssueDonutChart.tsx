// app/dashboard/components/IssueDonutChart.tsx
"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export const IssueDonutChart: React.FC<{
  data: Array<{ name: string; value: number }>;
  colors: string[];
}> = ({ data, colors }) => (
  <>
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={95}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {data.map((_, i) => (
              <Cell key={`pie-${i}`} fill={colors[i]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
            formatter={(v: number, n: string) => [`${v} issue${v > 1 ? "s" : ""}`, n]}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => {
              const entry = data.find((d) => d.name === value);
              return <span className="text-sm font-medium text-gray-700">{value} ({entry?.value})</span>;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>

    <div className="mt-4 border-t pt-4 grid grid-cols-3 gap-3 text-center">
      {data.map((d, i) => (
        <div key={i} className="p-2 border rounded-lg bg-gray-50">
          <div className="w-3 h-3 rounded-full mb-1 mx-auto shadow-sm" style={{ backgroundColor: colors[i] }} />
          <span className="text-xs font-semibold uppercase text-gray-600 block">{d.name}</span>
          <span className="text-xl font-extrabold text-gray-900">{d.value}</span>
        </div>
      ))}
    </div>
  </>
);