import express, { Request, Response } from 'express';
import ApiResponse from '../utils/ApiResponse.js';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json(
    new ApiResponse(200, {
      status: 'UP',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    }, 'Health check successful')
  );
});

export default router;
