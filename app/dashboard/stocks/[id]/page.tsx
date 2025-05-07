"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, BarChart, Calendar, Info, Star, StarOff, Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { StockPriceChart } from "@/components/stock-price-chart"
import { StockVolumeChart } from "@/components/stock-volume-chart"
import { StockMetrics } from "@/components/stock-metrics"
import { StockNews } from "@/components/stock-news"
import { fetchStock, fetchStockPrices, getStockWithLatestData, getHistoricalPriceData, updateStockWithYFinance } from "@/lib/api"
import type { Stock, StockPrice } from "@/lib/types"
import { toast, useToast } from "@/components/ui/use-toast"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function StockDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [stock, setStock] = useState<Stock | null>(null)
  const [prices, setPrices] = useState<StockPrice[]>([])
  const [timeframe, setTimeframe] = useState("1m")
  const [isWatchlisted, setIsWatchlisted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast: useToastToast } = useToast()

  useEffect(() => {
    const getStockData = async () => {
      try {
        setIsLoading(true)
        const stockData = await getStockWithLatestData(Number.parseInt(params.id))
        setStock(stockData)

        // Get price history
        const priceData = await getHistoricalPriceData(Number.parseInt(params.id), {
          start_date: new Date().toISOString().split('T')[0],
          end_date: new Date().toISOString().split('T')[0],
        })
        setPrices(priceData)
      } catch (error) {
        console.error("Failed to fetch stock data:", error)
        useToastToast({
          title: "Error",
          description: "Failed to fetch stock data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    getStockData()
  }, [params.id, useToastToast])

  const toggleWatchlist = () => {
    setIsWatchlisted(!isWatchlisted)
    useToastToast({
      title: isWatchlisted ? "Removed from Watchlist" : "Added to Watchlist",
      description: isWatchlisted
        ? `${stock?.symbol} has been removed from your watchlist`
        : `${stock?.symbol} has been added to your watchlist`,
    })
  }

  const handleRefresh = async () => {
    if (!stock) return

    try {
      setIsRefreshing(true)
      const updatedStock = await updateStockWithYFinance(stock.symbol)
      setStock(updatedStock)
      useToastToast({
        title: "Success",
        description: "Stock data refreshed successfully",
      })
    } catch (error) {
      console.error("Failed to refresh stock data:", error)
      useToastToast({
        title: "Error",
        description: "Failed to refresh stock data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!stock) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Stock not found</h2>
        <p className="text-muted-foreground">The requested stock could not be found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-bold tracking-tight">{stock.symbol}</h1>
              <Badge variant="outline">{stock.sector}</Badge>
            </div>
            <p className="text-lg text-muted-foreground">{stock.company_name}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={toggleWatchlist}>
            {isWatchlisted ? (
              <>
                <StarOff className="mr-2 h-4 w-4" />
                Remove from Watchlist
              </>
            ) : (
              <>
                <Star className="mr-2 h-4 w-4" />
                Add to Watchlist
              </>
            )}
          </Button>
          <Button onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stock.price?.toFixed(2) || "N/A"}</div>
            <p className="text-xs text-green-500">+2.45% today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Cap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stock.market_cap?.toLocaleString() || "N/A"}</div>
            <p className="text-xs text-muted-foreground">USD</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">P/E Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stock.pe_ratio?.toFixed(2) || "N/A"}</div>
            <p className="text-xs text-muted-foreground">Trailing 12 months</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dividend Yield</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stock.dividend_yield ? `${stock.dividend_yield.toFixed(2)}%` : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Annual</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="chart" className="space-y-4">
        <TabsList>
          <TabsTrigger value="chart" className="flex items-center">
            <LineChart className="mr-2 h-4 w-4" />
            Price Chart
          </TabsTrigger>
          <TabsTrigger value="volume" className="flex items-center">
            <BarChart className="mr-2 h-4 w-4" />
            Volume
          </TabsTrigger>
          <TabsTrigger value="fundamentals" className="flex items-center">
            <Info className="mr-2 h-4 w-4" />
            Fundamentals
          </TabsTrigger>
          <TabsTrigger value="news" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            News
          </TabsTrigger>
        </TabsList>

        <div className="flex items-center justify-end space-x-2">
          <Button variant="outline" size="sm" onClick={() => setTimeframe("1w")}>
            1W
          </Button>
          <Button variant="outline" size="sm" onClick={() => setTimeframe("1m")}>
            1M
          </Button>
          <Button variant="outline" size="sm" onClick={() => setTimeframe("3m")}>
            3M
          </Button>
          <Button variant="outline" size="sm" onClick={() => setTimeframe("6m")}>
            6M
          </Button>
          <Button variant="outline" size="sm" onClick={() => setTimeframe("1y")}>
            1Y
          </Button>
          <Button variant="outline" size="sm" onClick={() => setTimeframe("all")}>
            All
          </Button>
        </div>

        <TabsContent value="chart">
          <Card>
            <CardHeader>
              <CardTitle>Price History</CardTitle>
              <CardDescription>Historical price data for {stock.symbol}</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={prices}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) => new Date(date).toLocaleDateString()}
                  />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="close"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="volume">
          <Card>
            <CardHeader>
              <CardTitle>Trading Volume</CardTitle>
              <CardDescription>Historical trading volume for {stock.symbol}</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <StockVolumeChart prices={prices} timeframe={timeframe} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fundamentals">
          <Card>
            <CardHeader>
              <CardTitle>Fundamental Metrics</CardTitle>
              <CardDescription>Key financial metrics for {stock.symbol}</CardDescription>
            </CardHeader>
            <CardContent>
              <StockMetrics stock={stock} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news">
          <Card>
            <CardHeader>
              <CardTitle>Recent News</CardTitle>
              <CardDescription>Latest news and updates for {stock.symbol}</CardDescription>
            </CardHeader>
            <CardContent>
              <StockNews symbol={stock.symbol} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
