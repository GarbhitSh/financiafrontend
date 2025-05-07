"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecentScreens } from "@/components/recent-screens"
import { StockSummary } from "@/components/stock-summary"
import { fetchScreens } from "@/lib/api"
import type { Screen } from "@/lib/types"

export default function Dashboard() {
  const [recentScreens, setRecentScreens] = useState<Screen[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getScreens = async () => {
      try {
        const data = await fetchScreens({ limit: 5 })
        setRecentScreens(data.screens)
      } catch (error) {
        console.error("Failed to fetch screens:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getScreens()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your financial screening dashboard</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Total Screens</CardTitle>
                <CardDescription>Your created screening criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{isLoading ? "..." : recentScreens.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Stocks Tracked</CardTitle>
                <CardDescription>Stocks in your watchlist</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Last Run</CardTitle>
                <CardDescription>Most recent screen execution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2h ago</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Screens</CardTitle>
                <CardDescription>Your recently created screens</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentScreens screens={recentScreens} isLoading={isLoading} />
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Market Summary</CardTitle>
                <CardDescription>Top performing stocks</CardDescription>
              </CardHeader>
              <CardContent>
                <StockSummary />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Track the performance of your screens over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Analytics coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
