"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface SectorDistributionProps {
  detailed?: boolean
}

export function SectorDistribution({ detailed = false }: SectorDistributionProps) {
  // Sample data - in a real app, this would come from an API
  const data = [
    { name: "Technology", value: 35, fill: "#2563eb" },
    { name: "Healthcare", value: 20, fill: "#16a34a" },
    { name: "Financials", value: 15, fill: "#9333ea" },
    { name: "Consumer Discretionary", value: 10, fill: "#f59e0b" },
    { name: "Industrials", value: 8, fill: "#ef4444" },
    { name: "Communication Services", value: 7, fill: "#06b6d4" },
    { name: "Other", value: 5, fill: "#6b7280" },
  ]

  // For detailed view, add more sectors
  const detailedData = detailed
    ? [
        ...data,
        { name: "Energy", value: 3, fill: "#ec4899" },
        { name: "Materials", value: 2, fill: "#8b5cf6" },
        { name: "Utilities", value: 2, fill: "#14b8a6" },
        { name: "Real Estate", value: 2, fill: "#f97316" },
        { name: "Consumer Staples", value: 1, fill: "#84cc16" },
      ]
    : data

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={detailedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {detailedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}%`, "Allocation"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
