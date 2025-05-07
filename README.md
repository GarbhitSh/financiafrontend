# Financial Screener Frontend

A modern web application for screening and analyzing stocks, integrated with a FastAPI backend and Yahoo Finance data.

---

## 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd financial-screener
   ```
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

## ⚠️ Troubleshooting

- **No stocks found?**
  - Make sure you are logged in and have a valid JWT token in `localStorage`
  - Check the backend is running and accessible at `http://localhost:8000`
  - Use Swagger UI to test endpoints and check for errors
- **422 Unprocessable Content?**
  - Ensure you are sending `{ "symbol": "AAPL" }` in the POST body
  - The symbol must be valid and supported by Yahoo Finance
- **Failed to fetch sectors?**
  - You must be authenticated to access `/stocks/sectors`
  - Log in and ensure the token is present in requests
- **CORS or Network Errors?**
  - Make sure both frontend and backend are running on the correct ports
  - Check browser console and network tab for error details

---

## 🏗️ Best Practices

- **Error Handling:** Show user-friendly error messages and log errors for debugging
- **Loading States:** Use skeletons and spinners for async operations
- **Data Formatting:** Use utility functions for currency, percentage, and market cap formatting
- **Security:** Never store sensitive data in localStorage; use JWT only for authentication
- **Performance:** Use pagination for large datasets and cache API responses when appropriate

---

## 📚 Further Documentation

- **Backend API:** See [http://localhost:8000/docs](http://localhost:8000/docs)
- **Frontend Integration Guide:** See `API_DOCUMENTATION.md` (if provided)
- **Component Usage:** See code comments and the `components/` directory

---

## 🤝 Support

For questions or issues, contact the backend team or open an issue in this repository. 