import { ArrowDown, ArrowUp } from "lucide-react"

export function StockSummary() {
  // This would normally fetch data from the API
  const stocks = [
    { symbol: "AAPL", name: "Apple Inc.", price: 182.63, change: 1.25 },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 415.32, change: 2.78 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 175.98, change: -0.54 },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 182.41, change: 1.02 },
    { symbol: "TSLA", name: "Tesla Inc.", price: 177.58, change: -2.31 },
  ]

  return (
    <div className="space-y-4">
      {stocks.map((stock) => (
        <div key={stock.symbol} className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">{stock.symbol}</h3>
            <p className="text-sm text-muted-foreground">{stock.name}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">${stock.price.toFixed(2)}</span>
            <span className={`flex items-center text-sm ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {stock.change >= 0 ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
              {Math.abs(stock.change).toFixed(2)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
