"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface ScreenPerformanceProps {
  timeframe: string
}

export function ScreenPerformance({ timeframe }: ScreenPerformanceProps) {
  // Sample data - in a real app, this would come from an API
  const data = [
    { name: "Value Stocks", performance: 12.5 },
    { name: "Growth Stocks", performance: 18.2 },
    { name: "Dividend Champions", performance: 8.7 },
    { name: "Small Cap Growth", performance: 22.3 },
    { name: "Blue Chip", performance: 9.1 },
    { name: "Momentum", performance: 15.8 },
    { name: "Low Volatility", performance: 6.4 },
    { name: "High Beta", performance: -4.2 },
  ].sort((a, b) => b.performance - a.performance)

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
          <XAxis type="number" tickFormatter={(value) => `${value}%`} domain={["dataMin", "dataMax"]} />
          <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => [`${value}%`, "Performance"]} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
          <Bar dataKey="performance" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
