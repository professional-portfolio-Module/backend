import { Request, Response, NextFunction } from 'express';
import { redisService } from '../services/redisService.js';
import ApiResponse from '../utils/ApiResponse.js';

/**
 * Decodes the payload of a JWT token without verifying the signature
 * (signature is verified upstream by the BFF).
 */
function parseJwtPayload(token: string): any {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = Buffer.from(base64, 'base64').toString('utf8');
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export const checkMaintenanceMode = async (req: Request, res: Response, next: NextFunction) => {
  // Always allow health checks and system settings paths
  const path = req.path;
  if (
    path === '/health' || 
    path.startsWith('/system/maintenance')
  ) {
    return next();
  }

  try {
    const isMaintenance = await redisService.get('system:maintenance_mode');
    
    if (isMaintenance === 'true') {
      // Extract Authorization header
      const authHeader = req.headers.authorization;
      let isAdmin = false;

      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        const payload = parseJwtPayload(token);
        
        if (payload) {
          // Normalize role checks to cover all common claim variations
          const role = (
            payload.Role || 
            payload.role || 
            payload.user_role || 
            payload.userRole || 
            payload.roles || 
            ''
          ).toString().toLowerCase();

          if (role === 'admin' || role === 'super_admin' || role === 'superadmin') {
            isAdmin = true;
          }
        }
      }

      if (!isAdmin) {
        // Return 503 Service Unavailable to block non-admin requests
        return res.status(503).json(
          new ApiResponse(
            503,
            { code: 'MAINTENANCE_MODE_ACTIVE' },
            'The system is currently undergoing scheduled maintenance. Please try again later.'
          )
        );
      }
    }
  } catch (error) {
    console.error('Error in maintenance guard middleware:', error);
  }

  next();
};
