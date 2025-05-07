interface StockNewsProps {
  symbol: string
}

export function StockNews({ symbol }: StockNewsProps) {
  // Sample news data - in a real app, this would come from an API
  const news = [
    {
      id: 1,
      title: `${symbol} Reports Strong Q2 Earnings, Beats Expectations`,
      source: "Financial Times",
      date: "2025-05-06",
      url: "#",
    },
    {
      id: 2,
      title: `Analysts Upgrade ${symbol} to "Buy" on Growth Prospects`,
      source: "Wall Street Journal",
      date: "2025-05-04",
      url: "#",
    },
    {
      id: 3,
      title: `${symbol} Announces New Product Line, Shares Jump 5%`,
      source: "Bloomberg",
      date: "2025-05-01",
      url: "#",
    },
    {
      id: 4,
      title: `${symbol} CEO Discusses Future Strategy in Exclusive Interview`,
      source: "CNBC",
      date: "2025-04-28",
      url: "#",
    },
    {
      id: 5,
      title: `${symbol} Expands into New Markets, Analysts Optimistic`,
      source: "Reuters",
      date: "2025-04-25",
      url: "#",
    },
  ]

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <div key={item.id} className="border-b pb-4 last:border-0">
          <a href={item.url} className="block hover:underline">
            <h3 className="font-medium">{item.title}</h3>
          </a>
          <div className="mt-1 flex items-center text-sm text-muted-foreground">
            <span>{item.source}</span>
            <span className="mx-2">•</span>
            <span>{new Date(item.date).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
