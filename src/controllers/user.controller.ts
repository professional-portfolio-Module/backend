import { Request, Response } from 'express';
import { pool } from '../config/postgres.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

/**
 * GET /api/users
 * Returns all users (excluding password_hash).
 * Each user includes their hotels and roles via the join tables.
 */
export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await pool.query(`
    SELECT
      u.id,
      u.name,
      u.email,
      u.role,
      u.is_active,
      u.created_at,
      COALESCE(
        json_agg(DISTINCT jsonb_build_object('id', h.id, 'name', h.name, 'city', h.city)) 
        FILTER (WHERE h.id IS NOT NULL), '[]'
      ) AS hotels,
      COALESCE(
        json_agg(DISTINCT jsonb_build_object('id', r.id, 'name', r.name)) 
        FILTER (WHERE r.id IS NOT NULL), '[]'
      ) AS roles
    FROM users u
    LEFT JOIN user_hotel uh ON uh.user_id = u.id
    LEFT JOIN hotels h ON h.id = uh.hotel_id
    LEFT JOIN user_role ur ON ur.user_id = u.id
    LEFT JOIN roles r ON r.id = ur.role_id
    GROUP BY u.id
    ORDER BY u.name ASC
  `);

  res.status(200).json(new ApiResponse(200, result.rows, 'Users fetched successfully'));
});

/**
 * GET /api/users/:id
 * Returns a single user (excluding password_hash) with their hotels and roles.
 */
export const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await pool.query(`
    SELECT
      u.id,
      u.name,
      u.email,
      u.role,
      u.is_active,
      u.created_at,
      COALESCE(
        json_agg(DISTINCT jsonb_build_object('id', h.id, 'name', h.name, 'city', h.city)) 
        FILTER (WHERE h.id IS NOT NULL), '[]'
      ) AS hotels,
      COALESCE(
        json_agg(DISTINCT jsonb_build_object('id', r.id, 'name', r.name)) 
        FILTER (WHERE r.id IS NOT NULL), '[]'
      ) AS roles
    FROM users u
    LEFT JOIN user_hotel uh ON uh.user_id = u.id
    LEFT JOIN hotels h ON h.id = uh.hotel_id
    LEFT JOIN user_role ur ON ur.user_id = u.id
    LEFT JOIN roles r ON r.id = ur.role_id
    WHERE u.id = $1
    GROUP BY u.id
  `, [id]);

  if (result.rows.length === 0) {
    throw new ApiError(404, 'User not found');
  }

  res.status(200).json(new ApiResponse(200, result.rows[0], 'User fetched successfully'));
});
