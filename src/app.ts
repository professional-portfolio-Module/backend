import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config/config.js';

// Import routes
import indexRoutes from './routes/index.routes.js';

// Import middleware
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

import logger from './config/logger.js';

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
if (config.NODE_ENV !== 'test') {
  app.use(morgan('dev', {
    stream: { write: (message) => logger.info(message.trim()) }
  }));
}

// ---------------------
// Routes
// ---------------------
app.use('/api', indexRoutes);

// ---------------------
// Error Handling
// ---------------------
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
