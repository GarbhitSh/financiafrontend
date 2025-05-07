"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface PerformanceChartProps {
  timeframe: string
}

export function PerformanceChart({ timeframe }: PerformanceChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // In a real app, this would fetch data from an API based on the timeframe
    // For this example, we'll generate some sample data
    const generateData = () => {
      const numberOfPoints =
        timeframe === "1w"
          ? 7
          : timeframe === "1m"
            ? 30
            : timeframe === "3m"
              ? 90
              : timeframe === "6m"
                ? 180
                : timeframe === "1y"
                  ? 365
                  : 365

      const startDate = new Date()
      startDate.setDate(startDate.getDate() - numberOfPoints)

      const newData = []
      let value = 100

      for (let i = 0; i < numberOfPoints; i++) {
        const date = new Date(startDate)
        date.setDate(date.getDate() + i)

        // Add some randomness to the value
        value = value + (Math.random() * 4 - 2)

        newData.push({
          date: date.toISOString().split("T")[0],
          value: value.toFixed(2),
        })
      }

      return newData
    }

    setData(generateData())
  }, [timeframe])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
        <XAxis
          dataKey="date"
          tickFormatter={(value) => {
            const date = new Date(value)
            return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
          }}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          minTickGap={30}
        />
        <YAxis
          tickFormatter={(value) => `${value}`}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          width={40}
        />
        <Tooltip
          formatter={(value) => [`${value}`, "Performance"]}
          labelFormatter={(label) =>
            new Date(label).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#2563eb"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
