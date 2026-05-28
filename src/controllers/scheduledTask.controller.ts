import { Request, Response } from 'express';
import { pool } from '../config/postgres.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

/**
 * GET /api/scheduled-tasks
 * Returns all generated scheduled tasks (scoped by hotel_id).
 */
export const getScheduledTasks = catchAsync(async (req: Request, res: Response) => {
  const { hotel_id, status, priority } = req.query;

  if (!hotel_id) {
    throw new ApiError(400, 'Hotel ID is required');
  }

  // 1. Fetch scheduled tasks with joined schedule, asset, and done_by/checked_by names
  let query = `
    SELECT 
      t.task_id,
      t.scheduled_id,
      t.asset_id,
      t.done_by,
      t.checked_by,
      t.additional_details,
      t.status,
      t.priority,
      t.attachment_url,
      t.created_at,
      t.updated_at,
      t.completed_at,
      t.technician_remarks,
      t.engineer_remarks,
      t.due_date,
      s.title as schedule_title,
      s.card_no as asset_card_no,
      a.description as asset_description,
      a.location as asset_location,
      u_done.name as done_by_name,
      u_check.name as checked_by_name
    FROM scheduled_tasks t
    JOIN maintenance_schedule s ON t.scheduled_id = s.schedule_id
    LEFT JOIN assets a ON t.asset_id = a.id
    LEFT JOIN users u_done ON t.done_by = u_done.id
    LEFT JOIN users u_check ON t.checked_by = u_check.id
    WHERE s.hotel_id = $1
  `;

  const params: any[] = [hotel_id];
  let paramIndex = 2;

  if (status) {
    query += ` AND t.status = $${paramIndex++}`;
    params.push(status);
  }

  if (priority) {
    query += ` AND t.priority = $${paramIndex++}`;
    params.push(priority);
  }

  query += ` ORDER BY t.created_at DESC`;

  const tasksResult = await pool.query(query, params);
  const tasks = tasksResult.rows;

  if (tasks.length === 0) {
    return res.status(200).json(new ApiResponse(200, [], 'No scheduled tasks found'));
  }

  // 2. Fetch all technician assignments for these schedules
  const scheduleIds = tasks.map(t => t.scheduled_id);
  const assignmentsQuery = `
    SELECT 
      assign.scheduled_id,
      u.id as user_id,
      u.name as technician_name,
      u.email as technician_email
    FROM assignments assign
    JOIN users u ON assign.user_id = u.id
    WHERE assign.scheduled_id = ANY($1) AND u.is_active = true
  `;
  const assignmentsResult = await pool.query(assignmentsQuery, [scheduleIds]);
  const assignments = assignmentsResult.rows;

  // 3. Map assignments to tasks
  const tasksWithAssignments = tasks.map(task => {
    const taskAssignments = assignments
      .filter(a => a.scheduled_id === task.scheduled_id)
      .map(a => ({
        user_id: a.user_id,
        technician_name: a.technician_name,
        technician_email: a.technician_email
      }));
    return {
      ...task,
      assigned_technicians: taskAssignments
    };
  });

  res.status(200).json(
    new ApiResponse(200, tasksWithAssignments, 'Scheduled tasks fetched successfully')
  );
});

/**
 * GET /api/scheduled-tasks/pending-by-asset
 * Returns the latest pending or in-progress task for a specific asset (machine) by card number.
 */
export const getPendingTaskByAsset = catchAsync(async (req: Request, res: Response) => {
  const { card_no } = req.query;

  if (!card_no) {
    throw new ApiError(400, 'Asset Card Number (card_no) is required');
  }

  const query = `
    SELECT 
      t.task_id,
      t.scheduled_id,
      t.asset_id,
      t.done_by,
      t.checked_by,
      t.additional_details,
      t.status,
      t.priority,
      t.attachment_url,
      t.created_at,
      t.updated_at,
      t.completed_at,
      t.technician_remarks,
      t.engineer_remarks,
      t.due_date,
      s.title as schedule_title,
      s.card_no as asset_card_no,
      a.description as asset_description,
      a.location as asset_location
    FROM scheduled_tasks t
    JOIN maintenance_schedule s ON t.scheduled_id = s.schedule_id
    LEFT JOIN assets a ON t.asset_id = a.id
    WHERE s.card_no = $1 AND t.status IN ('pending', 'in-progress')
    ORDER BY t.created_at DESC
    LIMIT 1
  `;

  const result = await pool.query(query, [card_no]);

  if (result.rows.length === 0) {
    return res.status(200).json(new ApiResponse(200, null, 'No pending scheduled tasks found for this asset'));
  }

  const task = result.rows[0];

  // Dynamic Auto-Expiration: check if due_date has passed
  if (task.due_date && new Date(task.due_date) < new Date(new Date().setHours(0,0,0,0))) {
    await pool.query(
      "UPDATE scheduled_tasks SET status = 'expired', updated_at = NOW() WHERE task_id = $1",
      [task.task_id]
    );
    return res.status(200).json(new ApiResponse(200, null, 'No pending scheduled tasks found for this asset (task expired)'));
  }

  res.status(200).json(new ApiResponse(200, task, 'Pending task fetched successfully'));
});

/**
 * PATCH /api/scheduled-tasks/:taskId
 * Updates a scheduled task's status, remarks, or attachment (evidence image).
 */
export const updateScheduledTask = catchAsync(async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { status, technician_remarks, engineer_remarks, attachment_url, done_by, checked_by, priority } = req.body;

  // Verify task exists
  const checkRes = await pool.query('SELECT task_id FROM scheduled_tasks WHERE task_id = $1', [taskId]);
  if (checkRes.rows.length === 0) {
    throw new ApiError(404, 'Scheduled task not found');
  }

  const query = `
    UPDATE scheduled_tasks 
    SET 
      status = COALESCE($1, status),
      technician_remarks = COALESCE($2, technician_remarks),
      engineer_remarks = COALESCE($3, engineer_remarks),
      attachment_url = COALESCE($4, attachment_url),
      done_by = COALESCE($5::uuid, done_by),
      checked_by = COALESCE($6::uuid, checked_by),
      priority = COALESCE($7, priority),
      completed_at = CASE WHEN $1 IN ('completed', 'rejected') THEN CURRENT_TIMESTAMP ELSE completed_at END,
      updated_at = CURRENT_TIMESTAMP
    WHERE task_id = $8
    RETURNING *
  `;

  const updateRes = await pool.query(query, [
    status || null,
    technician_remarks || null,
    engineer_remarks || null,
    attachment_url || null,
    done_by || null,
    checked_by || null,
    priority || null,
    taskId
  ]);

  res.status(200).json(new ApiResponse(200, updateRes.rows[0], 'Scheduled task updated successfully'));
});
