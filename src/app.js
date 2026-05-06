const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config/config");

// Import routes
const indexRoutes = require("./routes/index.routes");

// Import middleware
const { errorHandler, notFoundHandler } = require("./middleware/error.middleware");

const logger = require("./config/logger");

const app = express();

// ---------------------
// Global Middleware
// ---------------------

// CORS
app.use(
  cors({
    origin: config.CORS_ORIGIN,
    credentials: true,
  })
);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP request logging
if (config.NODE_ENV !== "test") {
  app.use(morgan("dev", {
    stream: { write: (message) => logger.info(message.trim()) }
  }));
}


// ---------------------
// Routes
// ---------------------
app.use("/api", indexRoutes);

// ---------------------
// Error Handling
// ---------------------
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
