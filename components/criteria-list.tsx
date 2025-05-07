import type { ScreenCriteria } from "@/lib/types"

interface CriteriaListProps {
  criteria: ScreenCriteria[]
}

export function CriteriaList({ criteria }: CriteriaListProps) {
  const getFieldLabel = (field: string) => {
    const fieldMap: Record<string, string> = {
      pe_ratio: "P/E Ratio",
      price_to_book: "Price to Book",
      dividend_yield: "Dividend Yield (%)",
      market_cap: "Market Cap ($M)",
      eps: "EPS ($)",
      beta: "Beta",
      price: "Price ($)",
    }
    return fieldMap[field] || field
  }

  const getOperatorLabel = (operator: string) => {
    const operatorMap: Record<string, string> = {
      ">": "greater than",
      "<": "less than",
      ">=": "greater than or equal to",
      "<=": "less than or equal to",
      "=": "equal to",
    }
    return operatorMap[operator] || operator
  }

  if (criteria.length === 0) {
    return <p className="text-muted-foreground">No criteria defined</p>
  }

  return (
    <div className="space-y-2">
      {criteria.map((criterion, index) => (
        <div key={index} className="rounded-md bg-muted p-3">
          <p>
            <span className="font-medium">{getFieldLabel(criterion.field)}</span> is{" "}
            {getOperatorLabel(criterion.operator)} <span className="font-medium">{criterion.value}</span>
          </p>
        </div>
      ))}
    </div>
  )
}
