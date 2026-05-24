import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import QRCode from 'qrcode';
import logger from '../config/logger.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const redirectsFilePath = path.resolve(__dirname, '../config/redirects.json');

// Helper to read redirect mappings
const readRedirects = (): Record<string, string> => {
  try {
    if (!fs.existsSync(redirectsFilePath)) {
      fs.writeFileSync(redirectsFilePath, JSON.stringify({}, null, 2));
      return {};
    }
    const data = fs.readFileSync(redirectsFilePath, 'utf-8');
    return JSON.parse(data || '{}');
  } catch (error) {
    logger.error('Error reading redirects mapping file:', error);
    return {};
  }
};

// Helper to write redirect mappings
const writeRedirects = (mappings: Record<string, string>): void => {
  try {
    fs.writeFileSync(redirectsFilePath, JSON.stringify(mappings, null, 2));
  } catch (error) {
    logger.error('Error writing redirects mapping file:', error);
    throw new ApiError(500, 'Could not save redirect configuration');
  }
};

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
    // Generate the QR code as a PNG buffer
    const qrBuffer = await QRCode.toBuffer(redirectScanUrl, {
      type: 'png',
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });

    res.setHeader('Content-Type', 'image/png');
    res.send(qrBuffer);
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

  const redirects = readRedirects();
  const targetUrl = redirects[machineId];

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
          <div class="footer">NAITA Dynamic QR Redirect System</div>
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

  const redirects = readRedirects();
  redirects[machineId] = targetUrl;
  writeRedirects(redirects);

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

  const redirects = readRedirects();
  const targetUrl = redirects[machineId] || '';

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
