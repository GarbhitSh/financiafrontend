"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowDown, ArrowUp } from "lucide-react"

interface MarketOverviewProps {
  timeframe: string
}

export function MarketOverview({ timeframe }: MarketOverviewProps) {
  // Sample data - in a real app, this would come from an API
  const indices = [
    { name: "S&P 500", value: "4,587.64", change: "+1.23%", direction: "up" },
    { name: "Dow Jones", value: "37,986.40", change: "+0.87%", direction: "up" },
    { name: "Nasdaq", value: "14,356.75", change: "+1.62%", direction: "up" },
    { name: "Russell 2000", value: "2,038.29", change: "-0.45%", direction: "down" },
    { name: "VIX", value: "14.32", change: "-3.24%", direction: "down" },
  ]

  const sectors = [
    { name: "Technology", change: "+2.14%", direction: "up" },
    { name: "Healthcare", change: "+0.87%", direction: "up" },
    { name: "Financials", change: "+0.32%", direction: "up" },
    { name: "Energy", change: "-1.45%", direction: "down" },
    { name: "Consumer Discretionary", change: "+1.21%", direction: "up" },
    { name: "Industrials", change: "+0.54%", direction: "up" },
    { name: "Materials", change: "-0.78%", direction: "down" },
    { name: "Utilities", change: "-0.23%", direction: "down" },
    { name: "Real Estate", change: "+0.12%", direction: "up" },
    { name: "Communication Services", change: "+1.67%", direction: "up" },
    { name: "Consumer Staples", change: "+0.34%", direction: "up" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Major Indices</CardTitle>
          <CardDescription>Performance of major market indices</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Index</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {indices.map((index) => (
                <TableRow key={index.name}>
                  <TableCell className="font-medium">{index.name}</TableCell>
                  <TableCell className="text-right">{index.value}</TableCell>
                  <TableCell className={`text-right ${index.direction === "up" ? "text-green-500" : "text-red-500"}`}>
                    <div className="flex items-center justify-end">
                      {index.direction === "up" ? (
                        <ArrowUp className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowDown className="mr-1 h-4 w-4" />
                      )}
                      {index.change}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sector Performance</CardTitle>
          <CardDescription>Performance by market sector</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sector</TableHead>
                <TableHead className="text-right">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sectors.map((sector) => (
                <TableRow key={sector.name}>
                  <TableCell className="font-medium">{sector.name}</TableCell>
                  <TableCell className={`text-right ${sector.direction === "up" ? "text-green-500" : "text-red-500"}`}>
                    <div className="flex items-center justify-end">
                      {sector.direction === "up" ? (
                        <ArrowUp className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowDown className="mr-1 h-4 w-4" />
                      )}
                      {sector.change}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
