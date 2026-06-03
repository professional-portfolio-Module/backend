import { Request, Response } from 'express';
import { redisService } from '../services/redisService.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

/**
 * GET /api/system/maintenance-status
 * Returns whether maintenance mode is active.
 */
export const getMaintenanceStatus = catchAsync(async (req: Request, res: Response) => {
  const isMaintenance = await redisService.get('system:maintenance_mode');
  res.status(200).json(
    new ApiResponse(200, { enabled: isMaintenance === 'true' }, 'Maintenance status fetched successfully')
  );
});

/**
 * POST /api/system/maintenance-toggle
 * Toggles maintenance mode status.
 */
export const toggleMaintenanceMode = catchAsync(async (req: Request, res: Response) => {
  const { enabled } = req.body;

  if (typeof enabled !== 'boolean') {
    throw new ApiError(400, 'enabled field must be a boolean');
  }

  // Persist maintenance mode flag in Redis with 1-year TTL
  const ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60;
  await redisService.set('system:maintenance_mode', enabled ? 'true' : 'false', ONE_YEAR_IN_SECONDS);

  res.status(200).json(
    new ApiResponse(
      200,
      { enabled },
      `System maintenance mode has been successfully ${enabled ? 'enabled' : 'disabled'}`
    )
  );
});
