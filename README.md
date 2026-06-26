# Smart Shakthi

Smart Shakthi is an AI-powered realtime women safety and emergency response platform built with React, Express, MongoDB, JWT authentication, Google Maps, browser geolocation, Socket.IO, and an OpenAI-ready assistant layer.

## Features

- Secure signup, login, persistent sessions, logout, and profile management
- One-tap SOS flow with browser geolocation and MongoDB alert history
- Realtime emergency events, guardian alerts, presence, activity feed, and location updates
- Emergency contact CRUD with search and polished modal forms
- AI safety assistant with OpenAI integration structure and practical fallback guidance
- Guardian tracking and emergency communication flows inspired by realtime collaboration systems
- Chat-style assistant UI, typing-ready socket events, floating SOS workflow, and premium dark-mode dashboard pages
- Live map page with current location, safe-zone markers, nearby safe places, and route-style visualization
- Responsive SaaS-inspired dashboard with dark/light mode, toasts, skeletons, empty states, and mobile navigation
- Production-oriented API structure, centralized error handling, JWT middleware, and deployment-friendly config

## Tech Stack

Frontend: React.js, Vite, Tailwind CSS, React Router, Axios, Framer Motion, Socket.IO Client, Google Maps JavaScript API

Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, Socket.IO, CORS, dotenv, OpenAI API integration structure

Deployment: Vercel for frontend, Render/Railway for backend, MongoDB Atlas for database, optional Firebase Cloud Messaging expansion

## Folder Structure

```text
smart_shakthi/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      services/
      sockets/
      utils/
      server.js
  frontend/
    src/
      components/
      context/
      hooks/
      pages/
      services/
      utils/
      App.jsx
      main.jsx
```

## Architecture

- `backend/src/models`: User, EmergencyContact, SOSAlert, LiveLocation, ActivityLog, ChatSession, and GuardianStatus schemas
- `backend/src/controllers`: request orchestration for auth, contacts, SOS, location, activity, and assistant flows
- `backend/src/services`: reusable AI service with OpenAI support and demo-safe fallback responses
- `backend/src/sockets`: authenticated Socket.IO events for presence, emergency alerts, guardian tracking, typing, and assistant activity
- `frontend/src/context`: auth persistence, dark/light theme, and realtime socket state
- `frontend/src/pages`: landing, auth, dashboard, SOS, contacts, live map, assistant, profile, and settings

## Environment Variables

Create `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/smart-shakthi
USE_MEMORY_DB=false
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
FCM_SERVER_KEY=
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_FIREBASE_VAPID_KEY=
```

## Local Setup

```bash
npm run install:all
npm run dev
```

Frontend runs at `http://localhost:5173`. Backend runs at `http://localhost:5000`.

For quick local demos without MongoDB installed, set `USE_MEMORY_DB=true` in `backend/.env`. This starts a temporary MongoDB instance in memory. Data resets when the backend stops, so use MongoDB Atlas for persistent storage.

## Deployment

### Frontend on Vercel

- Set project root to `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Add `VITE_API_URL`, `VITE_SOCKET_URL`, and `VITE_GOOGLE_MAPS_API_KEY`

### Backend on Render/Railway

- Set project root to `backend`
- Start command: `npm start`
- Add `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CLIENT_URL`, `OPENAI_API_KEY`, `OPENAI_MODEL`, and `NODE_ENV=production`
- Configure `CLIENT_URL` to the deployed Vercel domain for secure CORS and Socket.IO origins

### MongoDB Atlas

- Create a cluster and database
- Add a database user
- Allow your backend deployment IP or use `0.0.0.0/0` for hackathon demos
- Place the connection string in `MONGO_URI`
