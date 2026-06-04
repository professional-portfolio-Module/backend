import { Request, Response, NextFunction } from 'express';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { pool } from '../config/postgres.js';
import logger from '../config/logger.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';
import { createNotificationHelper } from './notification.controller.js';

// Removed filesystem read/write helpers in favor of direct database queries

export const generateQR = catchAsync(async (req: Request, res: Response) => {
  const machineId = req.params.machineId as string;

  if (!machineId) {
    throw new ApiError(400, 'Asset Card No is required');
  }

  // Dynamically determine the host (supports both localhost and DigitalOcean)
  const protocol = req.secure || req.headers['x-forwarded-proto'] === 'https' ? 'https' : 'http';
  const host = req.headers.host;
  
  // The URL encoded in the physical QR code points to our scan redirect endpoint
  const redirectScanUrl = `${protocol}://${host}/api/qr/scan/${encodeURIComponent(machineId)}`;

  logger.info(`Generating QR code for asset: ${machineId} (Scan URL: ${redirectScanUrl})`);

  try {
    // Generate the QR code as a Base64 Data URL to prevent binary corruption through API gateways
    const qrDataUrl = await QRCode.toDataURL(redirectScanUrl, {
      type: 'image/png',
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });

    res.send(new ApiResponse(200, { qrCode: qrDataUrl }, 'QR code generated successfully'));
  } catch (error) {
    logger.error(`Error generating QR code for asset ${machineId}:`, error);
    throw new ApiError(500, 'Failed to generate QR code image for asset');
  }
});

export const scanRedirect = catchAsync(async (req: Request, res: Response) => {
  const machineId = req.params.machineId as string;

  if (!machineId) {
    throw new ApiError(400, 'Asset Card No is required');
  }

  logger.info(`QR code scanned for asset Card No: ${machineId}`);

  const result = await pool.query('SELECT qr_code_url FROM assets WHERE card_no = $1', [machineId]);
  const targetUrl = result.rows.length > 0 ? result.rows[0].qr_code_url : null;

  if (!targetUrl) {
    logger.warn(`Scan for unregistered or unconfigured asset: ${machineId}`);
    
    // Return a friendly HTML page showing that the asset QR exists but has not been configured
    res.setHeader('Content-Type', 'text/html');
    return res.status(404).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Asset QR Code</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f7fafc;
            color: #2d3748;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
          }
          .card {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            text-align: center;
            max-width: 450px;
            width: 100%;
          }
          h1 {
            color: #e53e3e;
            font-size: 24px;
            margin-bottom: 15px;
          }
          p {
            color: #718096;
            line-height: 1.6;
            margin-bottom: 25px;
          }
          .code {
            display: inline-block;
            background-color: #edf2f7;
            padding: 8px 16px;
            border-radius: 6px;
            font-family: monospace;
            font-size: 16px;
            font-weight: bold;
            color: #4a5568;
            margin-bottom: 20px;
          }
          .footer {
            font-size: 12px;
            color: #a0aec0;
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
            margin-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>⚠️ Asset Not Configured</h1>
          <p>This physical QR sticker is successfully linked to this server, but no active target destination has been configured for this Asset Card No yet.</p>
          <div class="code">${escapeHtml(machineId)}</div>
          <p>Please use the <strong>/api/qr/update</strong> endpoint to configure a redirect target URL for this asset.</p>
          <div class="footer">Browns Hotels Dynamic QR Redirect System</div>
        </div>
      </body>
      </html>
    `);
  }

  logger.info(`Redirecting scan for asset '${machineId}' to: ${targetUrl}`);
  return res.redirect(targetUrl);
});

export const updateRedirect = catchAsync(async (req: Request, res: Response) => {
  const { machineId, targetUrl } = req.body;

  if (!machineId || !targetUrl) {
    throw new ApiError(400, 'Both machineId (Asset Card No) and targetUrl are required');
  }

  // Validate URL format basic check
  try {
    new URL(targetUrl);
  } catch (_) {
    throw new ApiError(400, 'Invalid targetUrl format. Must be a valid absolute URL (e.g., https://example.com)');
  }

  const result = await pool.query(
    'UPDATE assets SET qr_code_url = $1, updated_at = CURRENT_TIMESTAMP WHERE card_no = $2 RETURNING *',
    [targetUrl, machineId]
  );

  if (result.rowCount === 0) {
    throw new ApiError(404, 'Asset not found');
  }

  logger.info(`Updated redirect mapping for asset: '${machineId}' -> '${targetUrl}'`);

  res.send(
    new ApiResponse(200, {
      machineId,
      targetUrl,
    }, 'Redirect configuration updated successfully')
  );
});

export const getTarget = catchAsync(async (req: Request, res: Response) => {
  const machineId = req.params.machineId as string;

  if (!machineId) {
    throw new ApiError(400, 'Asset Card No is required');
  }

  const result = await pool.query('SELECT qr_code_url FROM assets WHERE card_no = $1', [machineId]);
  const targetUrl = result.rows.length > 0 ? (result.rows[0].qr_code_url || '') : '';

  res.send(
    new ApiResponse(200, {
      machineId,
      targetUrl,
    }, 'Redirect target retrieved successfully')
  );
});


function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const getPublicMetadata = catchAsync(async (req: Request, res: Response) => {
  const { card_no } = req.params;

  if (!card_no) {
    throw new ApiError(400, 'Asset Card No is required');
  }

  const result = await pool.query(
    `SELECT a.card_no, a.description, a.location, c.name as category_name, a.hotel_id, h.name as hotel_name
     FROM assets a
     LEFT JOIN categories c ON a.category_id = c.id
     LEFT JOIN hotels h ON a.hotel_id = h.id
     WHERE a.card_no = $1 AND a.status != 'retired'`,
    [card_no]
  );

  if (result.rows.length === 0) {
    throw new ApiError(404, 'Asset not found or is retired');
  }

  res.send(new ApiResponse(200, result.rows[0], 'Asset metadata retrieved successfully'));
});

const uploadsDir = path.resolve(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const saveBase64Image = async (base64Image: string, req: Request): Promise<string> => {
  let base64Data = base64Image;
  if (base64Image.includes(';base64,')) {
    base64Data = base64Image.split(';base64,').pop() || '';
  }

  const uniquePrefix = crypto.randomUUID();
  const savedFilename = `${uniquePrefix}_public_report.jpg`;
  const filePath = path.join(uploadsDir, savedFilename);

  const buffer = Buffer.from(base64Data, 'base64');
  await fs.promises.writeFile(filePath, buffer);

  const externalBaseUrl = process.env.EXTERNAL_BASE_URL;
  if (externalBaseUrl) {
    return `${externalBaseUrl.replace(/\/$/, '')}/api/uploads/${savedFilename}`;
  } else {
    const host = req.headers['x-forwarded-host'] || req.get('host');
    const proto = req.headers['x-forwarded-proto'] || req.protocol;
    return `${proto}://${host}/api/uploads/${savedFilename}`;
  }
};

export const createPublicReport = catchAsync(async (req: Request, res: Response) => {
  const { card_no, description, priority = 'normal', reporter, image_base64 } = req.body;

  if (!card_no || !description) {
    throw new ApiError(400, 'Asset Card No and description are required');
  }

  // 1. Fetch asset details to get hotel_id and description
  const assetResult = await pool.query(
    'SELECT id, hotel_id, description FROM assets WHERE card_no = $1 AND status != \'retired\'',
    [card_no]
  );

  if (assetResult.rows.length === 0) {
    throw new ApiError(404, 'Asset not found or is retired');
  }

  const { hotel_id, description: assetDesc } = assetResult.rows[0];

  // 2. Validate priority
  if (!['normal', 'emergency'].includes(priority)) {
    throw new ApiError(400, "Priority must be 'normal' or 'emergency'");
  }

  // 3. Handle base64 image saving if provided
  let attachmentUrl: string | null = null;
  if (image_base64) {
    try {
      attachmentUrl = await saveBase64Image(image_base64, req);
    } catch (err) {
      logger.error('Failed to save public report image:', err);
    }
  }

  // 4. Create the manual task in DB (assigned_to = NULL, assigned_by = NULL)
  const taskTitle = `[Public Report] - ${assetDesc}`;
  const taskDesc = `Reporter: ${reporter || 'Anonymous Guest/Housekeeper'}\nDetails: ${description}`;

  const query = `
    INSERT INTO manual_task (
      manual_task_id, hotel_id, title, description, assigned_to, assigned_by, checked_by,
      card_no, status, priority, attachment_url, created_at, due_date, tech_remarks, eng_remarks
    ) VALUES (
      gen_random_uuid(), $1, $2, $3, NULL, NULL, NULL, $4, 'pending', $5, $6, CURRENT_DATE, NULL, NULL, NULL
    ) RETURNING *
  `;

  const taskResult = await pool.query(query, [
    hotel_id,
    taskTitle,
    taskDesc,
    card_no,
    priority,
    attachmentUrl
  ]);

  const createdTask = taskResult.rows[0];

  // 5. Notify managers and engineers at this hotel
  try {
    const staffQuery = `
      SELECT id, role FROM users 
      WHERE hotel_id = $1 AND role IN ('MANAGER', 'ENGINEER') AND is_active = true
    `;
    const staffRes = await pool.query(staffQuery, [hotel_id]);
    for (const u of staffRes.rows) {
      const typeLabel = priority === 'emergency' ? '🚨 EMERGENCY Public Report' : '📋 Public Report';
      await createNotificationHelper(
        u.id,
        'system',
        `${typeLabel}: ${card_no}`,
        `A new issue was reported on asset ${card_no} (${assetDesc}). Details: "${description}"`,
        createdTask.manual_task_id,
        'manual_task'
      );
    }
  } catch (err) {
    logger.error('Failed to dispatch public report notification:', err);
  }

  res.status(201).json(
    new ApiResponse(201, createdTask, 'Report submitted successfully')
  );
});
