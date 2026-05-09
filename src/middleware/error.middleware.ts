import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger.js';
import ApiError from '../utils/ApiError.js';
import config from '../config/config.js';

/**
 * Global error handler that uses the professional logger
 */
const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  let { statusCode, message } = err;

  if (!err.isOperational && statusCode !== 404) {
    statusCode = 500;
    message = 'Internal Server Error';
  }

  res.locals.errorMessage = err.message;

  const response = {
    success: false,
    status: statusCode || 500,
    message,
    ...(config.NODE_ENV === 'development' && { stack: err.stack }),
  };

  if (config.NODE_ENV === 'development') {
    logger.error(err);
  }

  res.status(statusCode || 500).send(response);
};

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, `Not Found - ${req.originalUrl}`));
};

export { errorHandler, notFoundHandler };
