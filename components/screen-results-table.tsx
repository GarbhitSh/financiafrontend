"use client"

import { useState } from "react"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

interface ScreenResultsTableProps {
  results: any[]
}

export function ScreenResultsTable({ results }: ScreenResultsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  if (!results || results.length === 0) {
    return <p className="text-muted-foreground">No results found</p>
  }

  // This is a simplified example - in a real app, you'd want to handle this more robustly
  const filteredResults = results.filter(
    (stock) =>
      stock.symbol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.company_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Input
          placeholder="Filter stocks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Symbol</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Sector</TableHead>
              <TableHead className="text-right">Price ($)</TableHead>
              <TableHead className="text-right">P/E Ratio</TableHead>
              <TableHead className="text-right">Market Cap ($M)</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResults.map((stock) => (
              <TableRow key={stock.id || stock.symbol}>
                <TableCell className="font-medium">{stock.symbol}</TableCell>
                <TableCell>{stock.company_name}</TableCell>
                <TableCell>{stock.sector}</TableCell>
                <TableCell className="text-right">{stock.price?.toFixed(2) || "N/A"}</TableCell>
                <TableCell className="text-right">{stock.pe_ratio?.toFixed(2) || "N/A"}</TableCell>
                <TableCell className="text-right">{stock.market_cap?.toLocaleString() || "N/A"}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Add to watchlist</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Export data</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
