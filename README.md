# Budget Tracker

A full-stack web app to track income, expenses, and category budgets.

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, React Router, Chart.js
- Backend: Python, Flask, Supabase, JWT, Argon2, Flask-CORS
- Deployment: Vercel (frontend), Railway/Gunicorn (backend)

## Main Features

- User authentication (register, login, logout)
- Cookie-based JWT sessions
- View transactions
- Budget overview by category
- Basic dashboard cards and chart

## Key API Endpoints

- `POST /register`
- `POST /login`
- `POST /logout`
- `GET /auth/me`
- `GET /transactions`
- `GET /budget`
- `GET /health`

## Project Structure

```text
backend/   Flask API + database logic
frontend/  React app (pages, components, API client)
```

## Quick Start

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables (Backend)

- `SUPABASE_URL`
- `SUPABASE_KEY`
- `JWT_SECRET_KEY`
- `FRONTEND_ORIGINS`
- `APP_ENV`
- `PORT`

## Status

- Transactions creation is not implemented yet.
- Reports page is currently a placeholder.
