import type { ScreenCreate, ScreenResult, StockPrice } from "@/lib/types"

const API_BASE_URL = "http://localhost:8000/api/v1"

// Helper function to get the auth token
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

// Helper function for API requests
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = getToken()

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.detail || `API request failed with status ${response.status}`)
  }

  return response.json()
}

// Auth API
export async function login(username: string, password: string) {
  const formData = new URLSearchParams()
  formData.append("username", username)
  formData.append("password", password)

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.detail || "Login failed")
  }

  return response.json()
}

export async function register(email: string, username: string, password: string) {
  return fetchAPI("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, username, password }),
  })
}

export async function getCurrentUser() {
  return fetchAPI("/auth/me")
}

// Screens API
export async function fetchScreens(params: { skip?: number; limit?: number; name?: string } = {}) {
  const queryParams = new URLSearchParams()
  if (params.skip !== undefined) queryParams.append("skip", params.skip.toString())
  if (params.limit !== undefined) queryParams.append("limit", params.limit.toString())
  if (params.name) queryParams.append("name", params.name)

  return fetchAPI(`/screens?${queryParams.toString()}`)
}

export async function fetchScreen(id: number) {
  return fetchAPI(`/screens/${id}`)
}

export async function createScreen(screen: ScreenCreate) {
  return fetchAPI("/screens", {
    method: "POST",
    body: JSON.stringify(screen),
  })
}

export async function updateScreen(id: number, screen: ScreenCreate) {
  return fetchAPI(`/screens/${id}`, {
    method: "PUT",
    body: JSON.stringify(screen),
  })
}

export async function deleteScreen(id: number) {
  return fetchAPI(`/screens/${id}`, {
    method: "DELETE",
  })
}

export async function runScreen(id: number): Promise<ScreenResult> {
  return fetchAPI(`/screens/${id}/run`, {
    method: "POST",
  })
}

// Stocks API
export async function fetchStocks(params: { skip?: number; limit?: number; symbol?: string; sector?: string } = {}) {
  const queryParams = new URLSearchParams()
  if (params.skip !== undefined) queryParams.append("skip", params.skip.toString())
  if (params.limit !== undefined) queryParams.append("limit", params.limit.toString())
  if (params.symbol) queryParams.append("symbol", params.symbol)
  if (params.sector) queryParams.append("sector", params.sector)

  return fetchAPI(`/stocks?${queryParams.toString()}`)
}

export async function fetchStock(id: number) {
  return fetchAPI(`/stocks/${id}`)
}

export async function fetchStockPrices(
  stockId: number,
  params: { start_date?: string; end_date?: string } = {},
): Promise<StockPrice[]> {
  const queryParams = new URLSearchParams()
  if (params.start_date) queryParams.append("start_date", params.start_date)
  if (params.end_date) queryParams.append("end_date", params.end_date)

  return fetchAPI(`/stocks/prices/${stockId}?${queryParams.toString()}`)
}

export async function fetchSectors() {
  return fetchAPI("/stocks/sectors")
}

export async function fetchIndustries(sector?: string) {
  const queryParams = new URLSearchParams()
  if (sector) queryParams.append("sector", sector)

  return fetchAPI(`/stocks/industries?${queryParams.toString()}`)
}

// Admin-only APIs (these would typically be restricted to admin users)
export async function createStock(stockData: any) {
  return fetchAPI("/stocks", {
    method: "POST",
    body: JSON.stringify(stockData),
  })
}

export async function createStockPrice(priceData: any) {
  return fetchAPI("/stocks/prices", {
    method: "POST",
    body: JSON.stringify(priceData),
  })
}

// YFinance Integration API
export async function createStockWithYFinance(symbol: string) {
  return fetchAPI("/stocks", {
    method: "POST",
    body: JSON.stringify({ symbol }),
  })
}

export async function updateStockWithYFinance(symbol: string) {
  return fetchAPI(`/stocks/update/${symbol}`, {
    method: "POST",
  })
}

export async function getStockWithLatestData(id: number) {
  return fetchAPI(`/stocks/${id}`)
}

export async function getHistoricalPriceData(
  stockId: number,
  params: { start_date?: string; end_date?: string } = {},
): Promise<StockPrice[]> {
  const queryParams = new URLSearchParams()
  if (params.start_date) queryParams.append("start_date", params.start_date)
  if (params.end_date) queryParams.append("end_date", params.end_date)

  return fetchAPI(`/stocks/prices/${stockId}?${queryParams.toString()}`)
}
