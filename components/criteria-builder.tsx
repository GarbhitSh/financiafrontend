"use client"

import type React from "react"

import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ScreenCriteria } from "@/lib/types"

interface CriteriaBuilderProps {
  criteria: ScreenCriteria[]
  setCriteria: React.Dispatch<React.SetStateAction<ScreenCriteria[]>>
}

export function CriteriaBuilder({ criteria, setCriteria }: CriteriaBuilderProps) {
  const fields = [
    { value: "pe_ratio", label: "P/E Ratio" },
    { value: "price_to_book", label: "Price to Book" },
    { value: "dividend_yield", label: "Dividend Yield (%)" },
    { value: "market_cap", label: "Market Cap ($M)" },
    { value: "eps", label: "EPS ($)" },
    { value: "beta", label: "Beta" },
    { value: "price", label: "Price ($)" },
  ]

  const operators = [
    { value: ">", label: "Greater than" },
    { value: "<", label: "Less than" },
    { value: ">=", label: "Greater than or equal to" },
    { value: "<=", label: "Less than or equal to" },
    { value: "=", label: "Equal to" },
  ]

  const addCriterion = () => {
    setCriteria([...criteria, { field: "pe_ratio", operator: "<", value: 0 }])
  }

  const removeCriterion = (index: number) => {
    setCriteria(criteria.filter((_, i) => i !== index))
  }

  const updateCriterion = (index: number, field: keyof ScreenCriteria, value: any) => {
    const newCriteria = [...criteria]
    newCriteria[index] = { ...newCriteria[index], [field]: value }
    setCriteria(newCriteria)
  }

  return (
    <div className="space-y-4">
      {criteria.map((criterion, index) => (
        <div
          key={index}
          className="flex flex-col space-y-4 rounded-lg border p-4 sm:flex-row sm:items-end sm:space-x-4 sm:space-y-0"
        >
          <div className="space-y-2 sm:w-1/3">
            <Label htmlFor={`field-${index}`}>Field</Label>
            <Select value={criterion.field} onValueChange={(value) => updateCriterion(index, "field", value)}>
              <SelectTrigger id={`field-${index}`}>
                <SelectValue placeholder="Select field" />
              </SelectTrigger>
              <SelectContent>
                {fields.map((field) => (
                  <SelectItem key={field.value} value={field.value}>
                    {field.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:w-1/3">
            <Label htmlFor={`operator-${index}`}>Operator</Label>
            <Select value={criterion.operator} onValueChange={(value) => updateCriterion(index, "operator", value)}>
              <SelectTrigger id={`operator-${index}`}>
                <SelectValue placeholder="Select operator" />
              </SelectTrigger>
              <SelectContent>
                {operators.map((operator) => (
                  <SelectItem key={operator.value} value={operator.value}>
                    {operator.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:w-1/4">
            <Label htmlFor={`value-${index}`}>Value</Label>
            <Input
              id={`value-${index}`}
              type="number"
              value={criterion.value}
              onChange={(e) => updateCriterion(index, "value", Number.parseFloat(e.target.value) || 0)}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeCriterion(index)}
            className="mt-2 sm:mt-0"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove criterion</span>
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addCriterion} className="mt-2">
        <Plus className="mr-2 h-4 w-4" />
        Add Criterion
      </Button>
    </div>
  )
}
