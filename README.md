# Backend API

Node.js + Express backend for the NAITA project.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Dev Tools:** Nodemon (hot-reload)

## Project Structure

```
backend/
├── src/
│   ├── config/         # App configuration & env loading
│   ├── controllers/    # Route handler logic
│   ├── middleware/      # Express middleware (error handling, auth, etc.)
│   ├── models/         # Database models
│   ├── routes/         # Route definitions
│   ├── utils/          # Helper/utility functions
│   ├── app.js          # Express app setup
│   └── server.js       # Entry point – starts the server
├── .env                # Environment variables (not committed)
├── .env.example        # Env template for reference
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js ≥ 18

### Installation

```bash
npm install
```

### Configure Environment

```bash
cp .env.example .env
# Edit .env with your values
```

### Run Development Server

```bash
npm run dev
```

### Run Production Server

```bash
npm start
```

## API Endpoints

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| GET    | `/api/health`  | Health check  |
