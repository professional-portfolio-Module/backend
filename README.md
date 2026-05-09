# Backend API

Node.js + Express backend API service, migrated to **TypeScript**.

## Tech Stack

- **Runtime:** Node.js (v20+)
- **Language:** TypeScript
- **Framework:** Express.js
- **Dev Tools:** tsx (hot-reload), tsc (compilation)

## Project Structure

```
backend/
├── src/
│   ├── config/         # App configuration & env loading
│   ├── controllers/    # Route handler logic
│   ├── middleware/     # Express middleware (error handling, auth, etc.)
│   ├── models/         # Database models
│   ├── routes/         # Route definitions
│   ├── utils/          # Helper/utility functions
│   ├── app.ts          # Express app setup
│   └── server.ts       # Entry point – starts the server
├── dist/               # Compiled JavaScript (generated)
├── .env                # Environment variables (not committed)
├── .env.example        # Env template for reference
├── tsconfig.json       # TypeScript configuration
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

Runs the server using `tsx watch` for instant reloading:

```bash
npm run dev
```

### Build for Production

Compiles TypeScript to the `dist/` directory:

```bash
npm run build
```

### Run Production Server

Starts the server from the compiled code:

```bash
npm start
```

## API Endpoints

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| GET    | `/api/health`  | Health check  |
