const logger = require("../config/logger");
const ApiError = require("../utils/ApiError");

/**
 * Global error handler that uses the professional logger
 */
const errorHandler = (err, req, res, _next) => {
  let { statusCode, message } = err;

  if (!err.isOperational) {
    statusCode = 500;
    message = "Internal Server Error";
  }

  res.locals.errorMessage = err.message;

  const response = {
    success: false,
    status: statusCode || 500,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };

  if (process.env.NODE_ENV === "development") {
    logger.error(err);
  }

  res.status(statusCode || 500).send(response);
};

const notFoundHandler = (req, res, next) => {
  next(new ApiError(404, `Not Found - ${req.originalUrl}`));
};

module.exports = { errorHandler, notFoundHandler };
