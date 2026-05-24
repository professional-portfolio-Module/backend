import app from './app.js';
import config from './config/config.js';
import connectDB from './config/db.js';
import { connectPostgres } from './config/postgres.js';
import { startNotificationConsumer } from './services/notificationConsumer.js';
import { redisService } from './services/redisService.js';
import logger from './config/logger.js';

const PORT = config.PORT;

// Connect to databases, then start server
(async () => {
  try {
    await connectDB();
    await connectPostgres();
    await redisService.connect();

    // Start NATS Notification Consumer asynchronously
    startNotificationConsumer().catch((err) => {
      logger.error('Failed to start NATS Notification Consumer:', err);
    });

    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server is running on port ${PORT}`);
      logger.info(`📍 Environment: ${config.NODE_ENV}`);
      logger.info(`🔗 http://localhost:${PORT}`);
    });

    // Graceful shutdown
    const gracefulShutdown = async () => {
      logger.info('Received shutdown signal. Closing server...');
      server.close(async () => {
        logger.info('Express server closed.');
        const { natsService } = await import('./services/natsService.js');
        await natsService.disconnect();
        await redisService.disconnect();
        process.exit(0);
      });
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
})();
