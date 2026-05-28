import * as Sentry from '@sentry/node';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import config from './config/config.js';

// Initialize Sentry first before other modules are loaded
if (config.SENTRY_DSN) {
  Sentry.init({
    dsn: config.SENTRY_DSN,
    environment: config.NODE_ENV,
  });
}

// Import routes
import indexRoutes from './routes/index.routes.js';

// Import middleware
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';
import { globalLimiter } from './middleware/security.middleware.js';
import logger from './config/logger.js';

const app = express();

// ---------------------
// Global Security Headers (Helmet)
// ---------------------
app.use(helmet());

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
if (config.NODE_ENV !== 'test') {
  app.use(morgan('dev', {
    stream: { write: (message) => logger.info(message.trim()) }
  }));
}

// ---------------------
// Global Rate Limiting
// ---------------------
app.use('/api', globalLimiter);

// ---------------------
// Routes
// ---------------------
app.use('/api', indexRoutes);

// ---------------------
// Error Handling
// ---------------------
app.use(notFoundHandler);

// Setup Sentry error handler if Sentry is initialized
if (config.SENTRY_DSN) {
  Sentry.setupExpressErrorHandler(app);
}

app.use(errorHandler);

export default app;
