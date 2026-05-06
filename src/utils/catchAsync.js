/**
 * Higher-order function to catch errors in async express routes
 * Eliminates the need for repetitive try-catch blocks
 */
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

module.exports = catchAsync;
