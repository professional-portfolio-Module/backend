import { rateLimit } from 'express-rate-limit';

// Global rate limiter (Max 1500 requests per 15 minutes to support chat and dashboard updates)
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 1500,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
});

// Sensitive route rate limiter (Max 15 requests per 15 minutes)
export const sensitiveLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 15,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many attempts, please try again after 15 minutes.',
  },
});
