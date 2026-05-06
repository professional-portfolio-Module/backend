const app = require("./app");
const config = require("./config/config");
const connectDB = require("./config/db");
const { connectPostgres } = require("./config/postgres");

const logger = require("./config/logger");

const PORT = config.PORT;

// Connect to databases, then start server
(async () => {
  try {
    await connectDB();
    await connectPostgres();

    app.listen(PORT, () => {
      logger.info(`🚀 Server is running on port ${PORT}`);
      logger.info(`📍 Environment: ${config.NODE_ENV}`);
      logger.info(`🔗 http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
})();



