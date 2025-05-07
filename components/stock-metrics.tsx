import type { Stock } from "@/lib/types"

interface StockMetricsProps {
  stock: Stock
}

export function StockMetrics({ stock }: StockMetricsProps) {
  const metrics = [
    { name: "Market Cap", value: stock.market_cap ? `$${stock.market_cap.toLocaleString()}M` : "N/A" },
    { name: "P/E Ratio", value: stock.pe_ratio ? stock.pe_ratio.toFixed(2) : "N/A" },
    { name: "Price to Book", value: stock.price_to_book ? stock.price_to_book.toFixed(2) : "N/A" },
    { name: "Dividend Yield", value: stock.dividend_yield ? `${stock.dividend_yield.toFixed(2)}%` : "N/A" },
    { name: "EPS", value: stock.eps ? `$${stock.eps.toFixed(2)}` : "N/A" },
    { name: "Beta", value: stock.beta ? stock.beta.toFixed(2) : "N/A" },
    { name: "52 Week High", value: stock.fifty_two_week_high ? `$${stock.fifty_two_week_high.toFixed(2)}` : "N/A" },
    { name: "52 Week Low", value: stock.fifty_two_week_low ? `$${stock.fifty_two_week_low.toFixed(2)}` : "N/A" },
    { name: "Average Volume", value: stock.avg_volume ? stock.avg_volume.toLocaleString() : "N/A" },
    { name: "Sector", value: stock.sector || "N/A" },
    { name: "Industry", value: stock.industry || "N/A" },
    { name: "Last Updated", value: stock.last_updated ? new Date(stock.last_updated).toLocaleDateString() : "N/A" },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.name} className="rounded-lg border p-4">
          <div className="text-sm font-medium text-muted-foreground">{metric.name}</div>
          <div className="mt-1 text-lg font-semibold">{metric.value}</div>
        </div>
      ))}
    </div>
  )
}
