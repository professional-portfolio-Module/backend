import { Request, Response } from 'express';
import { pool } from '../config/postgres.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

export const createReport = catchAsync(async (req: Request, res: Response) => {
  const { hotel_id, technician_id, report_text, is_critical } = req.body;

  if (!hotel_id || !technician_id || !report_text) {
    throw new ApiError(400, 'Hotel ID, Technician ID, and Report text are required');
  }

  const recipient_role = is_critical ? 'engineer' : 'manager';

  const insertQuery = `
    INSERT INTO technician_reports (hotel_id, technician_id, report_text, is_critical, recipient_role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const result = await pool.query(insertQuery, [hotel_id, technician_id, report_text, is_critical, recipient_role]);
  const newReport = result.rows[0];

  res.status(201).json(new ApiResponse(201, newReport, 'Weekly report submitted successfully'));
});

export const getReports = catchAsync(async (req: Request, res: Response) => {
  const { hotel_id, is_critical, recipient_role, technician_id } = req.query;

  if (!hotel_id) {
    throw new ApiError(400, 'Hotel ID is required');
  }

  let query = `
    SELECT r.*, u.name as technician_name, u.email as technician_email
    FROM technician_reports r
    JOIN users u ON r.technician_id = u.id
    WHERE r.hotel_id = $1
  `;
  const params: any[] = [hotel_id];
  let paramIndex = 2;

  if (is_critical !== undefined) {
    query += ` AND r.is_critical = $${paramIndex++}`;
    params.push(is_critical === 'true');
  }

  if (recipient_role) {
    query += ` AND r.recipient_role = $${paramIndex++}`;
    params.push(recipient_role);
  }

  if (technician_id) {
    query += ` AND r.technician_id = $${paramIndex++}`;
    params.push(technician_id);
  }

  query += ` ORDER BY r.created_at DESC`;

  const result = await pool.query(query, params);
  res.status(200).json(new ApiResponse(200, result.rows, 'Reports fetched successfully'));
});
