import { Request, Response } from 'express';
import { pool } from '../config/postgres.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

export const getManualTasks = catchAsync(async (req: Request, res: Response) => {
  const { hotel_id, status, priority, assigned_to, card_no, search } = req.query;

  let query = `
    SELECT 
      t.*,
      u1.name as assigned_to_name,
      u2.name as assigned_by_name,
      u3.name as checked_by_name,
      a.description as asset_description
    FROM manual_task t
    LEFT JOIN users u1 ON t.assigned_to = u1.id
    LEFT JOIN users u2 ON t.assigned_by = u2.id
    LEFT JOIN users u3 ON t.checked_by = u3.id
    LEFT JOIN assets a ON t.card_no = a.card_no
    WHERE 1=1
  `;
  const params: any[] = [];
  let paramIndex = 1;

  if (hotel_id) {
    query += ` AND t.hotel_id = $${paramIndex++}`;
    params.push(hotel_id);
  }

  if (status) {
    query += ` AND t.status = $${paramIndex++}`;
    params.push(status);
  }

  if (priority) {
    query += ` AND t.priority = $${paramIndex++}`;
    params.push(priority);
  }

  if (assigned_to) {
    query += ` AND t.assigned_to = $${paramIndex++}`;
    params.push(assigned_to);
  }

  if (card_no) {
    query += ` AND t.card_no = $${paramIndex++}`;
    params.push(card_no);
  }

  if (search) {
    query += ` AND (t.title ILIKE $${paramIndex} OR t.description ILIKE $${paramIndex})`;
    params.push(`%${search}%`);
    paramIndex++;
  }

  query += ` ORDER BY t.created_at DESC`;

  const result = await pool.query(query, params);

  res.status(200).json(
    new ApiResponse(200, result.rows, 'Manual tasks fetched successfully')
  );
});

export const createManualTask = catchAsync(async (req: Request, res: Response) => {
  const {
    hotel_id,
    title,
    description,
    assigned_to,
    assigned_by,
    checked_by,
    card_no,
    status = 'pending',
    priority = 'normal',
    attachment_url,
    due_date,
    tech_remarks,
    eng_remarks
  } = req.body;

  if (!hotel_id || !title || !assigned_to || !card_no) {
    throw new ApiError(400, 'Hotel ID, Title, Assigned Technician, and Asset selection are required fields');
  }

  // Validate priority check constraint
  if (!['normal', 'emergency'].includes(priority)) {
    throw new ApiError(400, "Priority must be 'normal' or 'emergency'");
  }

  // Validate status check constraint
  const allowedStatuses = ['pending', 'in-progress', 'under_review', 'completed', 'rejected', 'expired'];
  if (!allowedStatuses.includes(status)) {
    throw new ApiError(400, `Status must be one of: ${allowedStatuses.join(', ')}`);
  }

  const query = `
    INSERT INTO manual_task (
      manual_task_id, hotel_id, title, description, assigned_to, assigned_by, checked_by,
      card_no, status, priority, attachment_url, created_at, due_date, tech_remarks, eng_remarks
    ) VALUES (
      uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_DATE, $11, $12, $13
    ) RETURNING *
  `;

  const result = await pool.query(query, [
    hotel_id,
    title.trim(),
    description ? description.trim() : null,
    assigned_to,
    assigned_by || null,
    checked_by || null,
    card_no,
    status,
    priority,
    attachment_url || null,
    due_date || null,
    tech_remarks || null,
    eng_remarks || null
  ]);

  res.status(201).json(
    new ApiResponse(201, result.rows[0], 'Manual task created successfully')
  );
});

export const updateManualTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    title,
    description,
    assigned_to,
    assigned_by,
    checked_by,
    card_no,
    status,
    priority,
    attachment_url,
    due_date,
    completed_at,
    tech_remarks,
    eng_remarks
  } = req.body;

  // Check if exists
  const existing = await pool.query('SELECT * FROM manual_task WHERE manual_task_id = $1', [id]);
  if (existing.rows.length === 0) {
    throw new ApiError(404, 'Manual task not found');
  }

  // Validate fields if provided
  if (assigned_to !== undefined && !assigned_to) {
    throw new ApiError(400, 'Assigned technician is a required field');
  }
  if (card_no !== undefined && !card_no) {
    throw new ApiError(400, 'Asset selection is a required field');
  }

  // Validate priority if provided
  if (priority !== undefined && !['normal', 'emergency'].includes(priority)) {
    throw new ApiError(400, "Priority must be 'normal' or 'emergency'");
  }

  // Validate status if provided
  const allowedStatuses = ['pending', 'in-progress', 'under_review', 'completed', 'rejected', 'expired'];
  if (status !== undefined && !allowedStatuses.includes(status)) {
    throw new ApiError(400, `Status must be one of: ${allowedStatuses.join(', ')}`);
  }

  let query = 'UPDATE manual_task SET';
  const params: any[] = [];
  let paramIndex = 1;

  if (title !== undefined) {
    query += ` title = $${paramIndex++},`;
    params.push(title.trim());
  }
  if (description !== undefined) {
    query += ` description = $${paramIndex++},`;
    params.push(description);
  }
  if (assigned_to !== undefined) {
    query += ` assigned_to = $${paramIndex++},`;
    params.push(assigned_to || null);
  }
  if (assigned_by !== undefined) {
    query += ` assigned_by = $${paramIndex++},`;
    params.push(assigned_by || null);
  }
  if (checked_by !== undefined) {
    query += ` checked_by = $${paramIndex++},`;
    params.push(checked_by || null);
  }
  if (card_no !== undefined) {
    query += ` card_no = $${paramIndex++},`;
    params.push(card_no || null);
  }
  if (status !== undefined) {
    query += ` status = $${paramIndex++},`;
    params.push(status);
  }
  if (priority !== undefined) {
    query += ` priority = $${paramIndex++},`;
    params.push(priority);
  }
  if (attachment_url !== undefined) {
    query += ` attachment_url = $${paramIndex++},`;
    params.push(attachment_url || null);
  }
  if (due_date !== undefined) {
    query += ` due_date = $${paramIndex++},`;
    params.push(due_date || null);
  }
  if (completed_at !== undefined) {
    query += ` completed_at = $${paramIndex++},`;
    params.push(completed_at || null);
  }
  if (tech_remarks !== undefined) {
    query += ` tech_remarks = $${paramIndex++},`;
    params.push(tech_remarks || null);
  }
  if (eng_remarks !== undefined) {
    query += ` eng_remarks = $${paramIndex++},`;
    params.push(eng_remarks || null);
  }

  if (params.length === 0) {
    throw new ApiError(400, 'No fields to update');
  }

  // Remove trailing comma
  query = query.slice(0, -1);
  query += ` WHERE manual_task_id = $${paramIndex} RETURNING *`;
  params.push(id);

  const result = await pool.query(query, params);

  res.status(200).json(
    new ApiResponse(200, result.rows[0], 'Manual task updated successfully')
  );
});

export const deleteManualTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const existing = await pool.query('SELECT * FROM manual_task WHERE manual_task_id = $1', [id]);
  if (existing.rows.length === 0) {
    throw new ApiError(404, 'Manual task not found');
  }

  await pool.query('DELETE FROM manual_task WHERE manual_task_id = $1', [id]);

  res.status(200).json(new ApiResponse(200, null, 'Manual task deleted successfully'));
});
