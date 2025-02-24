"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { DataPoint } from "../../types/chart";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
  "#FF6699",
  "#33CC33",
  "#FF4444",
  "#9966FF",
  "#66CCCC",
];

interface SimplePieChartProps {
  data: DataPoint[];
}
export default function SimplePieChart({ data }: SimplePieChartProps) {
  const renderCustomLabel = ({
    name,
    value,
  }: {
    name: string;
    value: number;
  }) => {
    return `${name}: ${value}`;
  };

  return (
    <div className="w-100 h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            label={renderCustomLabel}
            labelLine
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
