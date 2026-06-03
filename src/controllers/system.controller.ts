import { Request, Response } from 'express';
import { redisService } from '../services/redisService.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Setup uploads directory path
const uploadsDir = path.resolve(process.cwd(), 'uploads');

// Ensure directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

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

/**
 * POST /api/system/upload
 * Decodes and saves uploaded photo evidence to the local filesystem.
 */
export const uploadImage = catchAsync(async (req: Request, res: Response) => {
  const { image, filename } = req.body;
  if (!image) {
    throw new ApiError(400, 'Image data is required');
  }

  let base64Data = image;
  if (image.includes(';base64,')) {
    base64Data = image.split(';base64,').pop() || '';
  }

  // Generate unique filename to avoid collisions
  const cleanFilename = filename ? filename.replace(/[^a-zA-Z0-9.-]/g, '_') : 'image.jpg';
  const uniquePrefix = crypto.randomUUID();
  const savedFilename = `${uniquePrefix}_${cleanFilename}`;
  const filePath = path.join(uploadsDir, savedFilename);

  // Write base64 to file
  const buffer = Buffer.from(base64Data, 'base64');
  await fs.promises.writeFile(filePath, buffer);

  // Construct URL
  const externalBaseUrl = process.env.EXTERNAL_BASE_URL;
  let fileUrl = '';
  if (externalBaseUrl) {
    fileUrl = `${externalBaseUrl.replace(/\/$/, '')}/api/uploads/${savedFilename}`;
  } else {
    const host = req.headers['x-forwarded-host'] || req.get('host');
    const proto = req.headers['x-forwarded-proto'] || req.protocol;
    fileUrl = `${proto}://${host}/api/uploads/${savedFilename}`;
  }

  res.status(200).json(
    new ApiResponse(200, { url: fileUrl }, 'Image uploaded successfully to VM local folder')
  );
});
