// app/dashboard/components/CategoryBarChart.tsx
"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export const CategoryBarChart: React.FC<{ data: Array<{ name: string; score: number; fill: string }> }> = ({ data }) => (
  <div className="h-64">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} angle={-25} textAnchor="end" interval={0} height={55} />
        <YAxis domain={[0, 100]} ticks={[0, 50, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#6b7280" }} />
        <Tooltip
          cursor={{ fill: "#f3f4f6" }}
          contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
          labelStyle={{ color: "#1f2937", fontWeight: "bold" }}
          formatter={(v: number) => [`${v}/100`, "Score"]}
        />
        <Bar dataKey="score" radius={[8, 8, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={`bar-${i}`} fill={data[i].fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);