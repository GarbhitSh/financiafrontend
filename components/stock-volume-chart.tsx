"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { StockPrice } from "@/lib/types"

interface StockVolumeChartProps {
  prices: StockPrice[]
  timeframe: string
}

export function StockVolumeChart({ prices, timeframe }: StockVolumeChartProps) {
  // Filter prices based on timeframe
  const filteredPrices = (() => {
    if (!prices.length) return []

    const now = new Date()
    let startDate: Date

    switch (timeframe) {
      case "1w":
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 7)
        break
      case "1m":
        startDate = new Date(now)
        startDate.setMonth(now.getMonth() - 1)
        break
      case "3m":
        startDate = new Date(now)
        startDate.setMonth(now.getMonth() - 3)
        break
      case "6m":
        startDate = new Date(now)
        startDate.setMonth(now.getMonth() - 6)
        break
      case "1y":
        startDate = new Date(now)
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        return prices
    }

    return prices.filter((price) => new Date(price.date) >= startDate)
  })()

  // Format data for the chart
  const chartData = filteredPrices.map((price) => ({
    date: price.date,
    volume: price.volume,
  }))

  // If no data, show a message
  if (chartData.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">No volume data available for the selected timeframe</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
          tickFormatter={(value) => {
            if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
            if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
            return value
          }}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          width={60}
        />
        <Tooltip
          formatter={(value: any) => {
            if (value >= 1000000) return [`${(value / 1000000).toFixed(2)}M`, "Volume"]
            if (value >= 1000) return [`${(value / 1000).toFixed(2)}K`, "Volume"]
            return [value, "Volume"]
          }}
          labelFormatter={(label) =>
            new Date(label).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }
        />
        <Bar dataKey="volume" fill="#9333ea" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
