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
