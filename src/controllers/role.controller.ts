import { Request, Response } from 'express';
import { pool } from '../config/postgres.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

/**
 * GET /api/roles
 * Returns all roles.
 */
export const getRoles = catchAsync(async (req: Request, res: Response) => {
  const result = await pool.query('SELECT id, name FROM roles ORDER BY name ASC');
  res.status(200).json(new ApiResponse(200, result.rows, 'Roles fetched successfully'));
});

/**
 * GET /api/roles/:id
 * Returns a single role with all users that have this role.
 */
export const getRoleById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const roleResult = await pool.query('SELECT id, name FROM roles WHERE id = $1', [id]);
  if (roleResult.rows.length === 0) {
    throw new ApiError(404, 'Role not found');
  }

  const usersResult = await pool.query(`
    SELECT u.id, u.name, u.email, u.is_active
    FROM users u
    JOIN user_role ur ON ur.user_id = u.id
    WHERE ur.role_id = $1
    ORDER BY u.name ASC
  `, [id]);

  res.status(200).json(new ApiResponse(200, {
    ...roleResult.rows[0],
    users: usersResult.rows,
  }, 'Role fetched successfully'));
});
