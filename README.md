# Evans Juma Portfolio

Live portfolio: https://evans-portfolio-frontend.onrender.com

Backend API: https://evans-portfolio-backend-w4sd.onrender.com

This is a React + Vite portfolio for Evans Juma, a backend software engineer focused on Go, distributed systems, dependable APIs, and AI-integrated services.

## What Is Live

- Responsive terminal-inspired portfolio with dark/light themes.
- JSON-driven project case studies in `frontend/src/data/projects.json`.
- Project filters and expandable problem/approach/outcome details.
- Feature-flagged live hero status card using `VITE_ENABLE_LIVE_STATUS`.
- Go/Gin API with MongoDB-backed project administration and a version-controlled status store.
- Downloadable resume at `/evans-juma-resume.html`.

Current project statuses: Guidely is `Not Deployed`; African Vault is `In Progress`.

## API Endpoints

```text
GET /              service summary
GET /api/health    health check
GET /api/portfolio portfolio content
GET /api/status    live hero status
GET /api/projects  project records from MongoDB
```

## Local Development

Frontend:

```bash
cd frontend
npm install
npm run dev

```

Backend:

```bash
cd backend
go run ./cmd/api
```

Copy `backend/.env.example` to `backend/.env` and provide a MongoDB connection string for project administration. The frontend uses the local Vite proxy by default.

## Deployment Variables

Frontend production:

```env
VITE_ENABLE_LIVE_STATUS=true
VITE_API_BASE_URL=https://evans-portfolio-backend-w4sd.onrender.com
```

Backend Render:

```env
MONGO_URI=<MongoDB Atlas connection string>
DB_NAME=evans_portfolio
FRONTEND_ORIGIN=https://evans-portfolio-frontend.onrender.com
GIN_MODE=release
```

Render supplies `PORT` automatically. Never commit real credentials or `.env` files.

## Verification

```bash
cd frontend && npm run build && npm run lint
cd ../backend && go test ./...
```

## Repository Layout

```text
frontend/  React, TypeScript, Vite application
backend/   Go/Gin API and MongoDB project administration
docs/      Architecture, design, API, and deployment notes
```

## License

MIT
