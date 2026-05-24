import { Request, Response } from 'express';
import { pool } from '../config/postgres.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

export const getNotifications = catchAsync(async (req: Request, res: Response) => {
  const userId = req.query.userId || req.headers['x-user-id'];
  if (!userId) {
    throw new ApiError(400, 'User ID is required');
  }

  const result = await pool.query(
    'SELECT id, user_id, notification_type, title, content, read, created_at FROM notifications WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );

  res.status(200).json(new ApiResponse(200, result.rows, 'Notifications fetched successfully'));
});

export const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await pool.query(
    'UPDATE notifications SET read = true WHERE id = $1 RETURNING id, user_id, notification_type, title, content, read, created_at',
    [id]
  );

  if (result.rows.length === 0) {
    throw new ApiError(404, 'Notification not found');
  }

  res.status(200).json(new ApiResponse(200, result.rows[0], 'Notification marked as read'));
});

export const markAllAsRead = catchAsync(async (req: Request, res: Response) => {
  const userId = req.body.userId || req.query.userId || req.headers['x-user-id'];
  if (!userId) {
    throw new ApiError(400, 'User ID is required');
  }

  await pool.query(
    'UPDATE notifications SET read = true WHERE user_id = $1',
    [userId]
  );

  res.status(200).json(new ApiResponse(200, null, 'All notifications marked as read'));
});

export const createNotification = catchAsync(async (req: Request, res: Response) => {
  const { userId, type, title, content } = req.body;
  if (!userId || !type || !title || !content) {
    throw new ApiError(400, 'userId, type, title, and content are all required fields');
  }

  const notification = await createNotificationHelper(userId, type, title, content);
  if (!notification) {
    throw new ApiError(500, 'Failed to create notification');
  }

  res.status(201).json(new ApiResponse(201, notification, 'Notification created successfully'));
});

/**
 * Helper to programmatically create in-app notifications from other services/controllers.
 */
export const createNotificationHelper = async (
  userId: string,
  type: 'task_assigned' | 'task_completed' | 'task_expired' | 'maintenance_due' | 'system',
  title: string,
  content: string
) => {
  try {
    const result = await pool.query(
      `INSERT INTO notifications (user_id, notification_type, title, content) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, user_id, notification_type, title, content, read, created_at`,
      [userId, type, title, content]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Failed to create internal in-app notification:', error);
    return null;
  }
};
