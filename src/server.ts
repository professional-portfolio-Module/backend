import app from './app.js';
import config from './config/config.js';
import connectDB from './config/db.js';
import { connectPostgres } from './config/postgres.js';
import logger from './config/logger.js';

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
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
})();
