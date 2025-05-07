// User types
export interface User {
  id: number
  email: string
  username: string
  is_active: boolean
  created_at: string
}

// Screen types
export interface ScreenCriteria {
  id?: number
  screen_id?: number
  field: string
  operator: string
  value: number
  created_at?: string
  updated_at?: string
}

export interface Screen {
  id: number
  name: string
  description: string
  is_public: boolean
  user_id: number
  created_at: string
  updated_at: string
  criteria: ScreenCriteria[]
}

export interface ScreenCreate {
  name: string
  description: string
  is_public: boolean
  criteria: ScreenCriteria[]
}

export interface ScreenResult {
  screen_id: number
  screen_name: string
  results: any[]
  count: number
  execution_time: number
}

// Stock types
export interface Stock {
  id: number
  symbol: string
  company_name: string
  sector: string
  industry: string
  market_cap?: number
  pe_ratio?: number
  price?: number
  price_to_book?: number
  dividend_yield?: number
  eps?: number
  beta?: number
  fifty_two_week_high?: number
  fifty_two_week_low?: number
  avg_volume?: number
  last_updated: string
}

export interface StockPrice {
  id: number
  stock_id: number
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  created_at: string
}
