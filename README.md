# Financial Screener Frontend

A modern web application for screening and analyzing stocks, integrated with a FastAPI backend and Yahoo Finance data.

---

## 🚀 Quick Start

1. **Clone the repository:**

2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```
4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Project Structure

- `app/` — Next.js app directory (pages, layouts, API routes)
- `components/` — Reusable UI components
- `lib/` — API client, types, and utilities
- `hooks/` — Custom React hooks
- `public/` — Static assets
- `styles/` — Tailwind and global CSS

---

## 🔐 Authentication

- **Login/Register** via the frontend or Swagger UI (`/auth/register`, `/auth/login`)
- **JWT Token** is stored in `localStorage` as `token`
- All API requests (except login/register) require the `Authorization: Bearer <token>` header

---

## 🌐 API Integration

- **Base URL:** `http://localhost:8000/api/v1`
- **Endpoints:**
  - `GET /stocks/` — List stocks (supports `symbol`, `sector`, `skip`, `limit`)
  - `POST /stocks/` — Add a stock by symbol (fetches data from Yahoo Finance)
  - `GET /stocks/{id}` — Stock details
  - `GET /stocks/prices/{id}` — Historical price data
  - `GET /stocks/sectors` — List all sectors
  - `POST /stocks/update/{symbol}` — Manually refresh stock data

**See the backend OpenAPI docs at** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🧑‍💻 Usage

- **Browse Stocks:** Search and filter by symbol or sector
- **Add Stock:** Enter a symbol (e.g., `AAPL`) and click "Add Stock"
- **View Details:** Click a stock to see details and price history
- **Refresh Data:** Use the "Refresh Data" button on the stock detail page

---

---

## 📚 Further Documentation

- **Backend API:** See [http://localhost:8000/docs](http://localhost:8000/docs)
- **Frontend Integration Guide:** See `API_DOCUMENTATION.md` (if provided)
- **Component Usage:** See code comments and the `components/` directory

