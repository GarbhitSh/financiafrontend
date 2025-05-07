"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StocksTable } from "@/components/stocks-table"
import { fetchStocks, fetchSectors, createStockWithYFinance } from "@/lib/api"
import type { Stock } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export default function StocksPage() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [sectors, setSectors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSector, setSelectedSector] = useState<string>("")
  const [total, setTotal] = useState(0)
  const [newSymbol, setNewSymbol] = useState("")
  const [isAddingStock, setIsAddingStock] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const getSectors = async () => {
      try {
        const data = await fetchSectors()
        setSectors(data)
      } catch (error) {
        console.error("Failed to fetch sectors:", error)
        toast({
          title: "Error",
          description: "Failed to fetch sectors. Please try again.",
          variant: "destructive",
        })
      }
    }

    getSectors()
  }, [toast])

  useEffect(() => {
    const getStocks = async () => {
      try {
        setIsLoading(true)
        const data = await fetchStocks({
          symbol: searchTerm || undefined,
          sector: selectedSector || undefined,
        })
        setStocks(data.stocks)
        setTotal(data.total)
      } catch (error) {
        console.error("Failed to fetch stocks:", error)
        toast({
          title: "Error",
          description: "Failed to fetch stocks. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    getStocks()
  }, [searchTerm, selectedSector, toast])

  const handleAddStock = async () => {
    if (!newSymbol) {
      toast({
        title: "Error",
        description: "Please enter a stock symbol",
        variant: "destructive",
      })
      return
    }

    try {
      setIsAddingStock(true)
      await createStockWithYFinance(newSymbol.toUpperCase())
      toast({
        title: "Success",
        description: `Added ${newSymbol.toUpperCase()} to the database`,
      })
      setNewSymbol("")
      // Refresh the stocks list
      const data = await fetchStocks({
        symbol: searchTerm || undefined,
        sector: selectedSector || undefined,
      })
      setStocks(data.stocks)
      setTotal(data.total)
    } catch (error) {
      console.error("Failed to add stock:", error)
      toast({
        title: "Error",
        description: "Failed to add stock. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAddingStock(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Stocks</h1>
        <p className="text-muted-foreground">Browse and search available stocks</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stock Database</CardTitle>
          <CardDescription>{total} stocks available for screening</CardDescription>
          <div className="mt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Input
              placeholder="Search by symbol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="max-w-sm">
                <SelectValue placeholder="Filter by sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                {sectors.map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <Input
              placeholder="Add new stock (e.g., AAPL)"
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value)}
              className="max-w-sm"
            />
            <Button onClick={handleAddStock} disabled={isAddingStock}>
              {isAddingStock ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Stock"
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <StocksTable stocks={stocks} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  )
}
