"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { StockPrice } from "@/lib/types"

interface StockPriceChartProps {
  prices: StockPrice[]
  timeframe: string
}

export function StockPriceChart({ prices, timeframe }: StockPriceChartProps) {
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
    price: price.close,
  }))

  // If no data, show a message
  if (chartData.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">No price data available for the selected timeframe</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
          </linearGradient>
        </defs>
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
          domain={["auto", "auto"]}
          tickFormatter={(value) => `$${value}`}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          width={60}
        />
        <Tooltip
          formatter={(value) => [`$${value}`, "Price"]}
          labelFormatter={(label) =>
            new Date(label).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }
        />
        <Area type="monotone" dataKey="price" stroke="#2563eb" fillOpacity={1} fill="url(#colorPrice)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
