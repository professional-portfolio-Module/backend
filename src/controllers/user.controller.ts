import { Request, Response } from 'express';
import { pool } from '../config/postgres.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

/**
 * GET /api/users
 * Returns all users (excluding password_hash).
 * Scoped by hotel_id if provided.
 */
export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const { hotel_id } = req.query;
  console.log('getUsers endpoint triggered. req.query:', req.query);

  let query = `
    SELECT
      u.id,
      u.name,
      u.email,
      u.role,
      u.is_active,
      u.created_at,
      u.mobilenumber,
      u.hotel_id,
      h.name AS hotel_name,
      h.city AS hotel_city
    FROM users u
    LEFT JOIN hotels h ON h.id = u.hotel_id
  `;

  const params: any[] = [];
  if (hotel_id) {
    query += ` WHERE u.hotel_id = $1 `;
    params.push(hotel_id);
  }

  query += `
    ORDER BY u.name ASC
  `;

  const result = await pool.query(query, params);

  // Format to output structure the frontend expects
  const formattedRows = result.rows.map((row: any) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    is_active: row.is_active,
    created_at: row.created_at,
    mobilenumber: row.mobilenumber,
    hotels: row.hotel_id ? [{ id: row.hotel_id, name: row.hotel_name, city: row.hotel_city }] : []
  }));

  res.status(200).json(new ApiResponse(200, formattedRows, 'Users fetched successfully'));
});

/**
 * GET /api/users/:id
 * Returns a single user (excluding password_hash) with their associated hotel.
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
      u.mobilenumber,
      u.hotel_id,
      h.name AS hotel_name,
      h.city AS hotel_city
    FROM users u
    LEFT JOIN hotels h ON h.id = u.hotel_id
    WHERE u.id = $1
  `, [id]);

  if (result.rows.length === 0) {
    throw new ApiError(404, 'User not found');
  }

  const row = result.rows[0];
  const formattedUser = {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    is_active: row.is_active,
    created_at: row.created_at,
    mobilenumber: row.mobilenumber,
    hotels: row.hotel_id ? [{ id: row.hotel_id, name: row.hotel_name, city: row.hotel_city }] : []
  };

  res.status(200).json(new ApiResponse(200, formattedUser, 'User fetched successfully'));
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, phone, mobilenumber, mobileNumber } = req.body;

  const resolvedPhone = phone || mobilenumber || mobileNumber;

  const check = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  if (check.rows.length === 0) {
    throw new ApiError(404, 'User not found');
  }

  let query = 'UPDATE users SET';
  const params: any[] = [];
  let paramIndex = 1;

  if (name !== undefined) {
    query += ` name = $${paramIndex++},`;
    params.push(name.trim());
  }
  if (resolvedPhone !== undefined) {
    query += ` mobilenumber = $${paramIndex++},`;
    params.push(resolvedPhone.trim());
  }

  if (params.length === 0) {
    throw new ApiError(400, 'No fields to update');
  }

  query = query.slice(0, -1) + ` WHERE id = $${paramIndex} RETURNING *`;
  params.push(id);

  const result = await pool.query(query, params);
  res.status(200).json(new ApiResponse(200, result.rows[0], 'User updated successfully'));
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const check = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  if (check.rows.length === 0) {
    throw new ApiError(404, 'User not found');
  }

  // Soft delete / deactivate user
  await pool.query('UPDATE users SET is_active = false WHERE id = $1', [id]);

  res.status(200).json(new ApiResponse(200, null, 'User deactivated successfully'));
});
