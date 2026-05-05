const dotenv = require("dotenv");
const path = require("path");

// Load .env from the project root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT, 10) || 3001,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",
  // Add more config values here as needed
  DB_URI: process.env.DB_URI,
  POSTGRES_URI: process.env.POSTGRES_URI,
};

module.exports = config;
