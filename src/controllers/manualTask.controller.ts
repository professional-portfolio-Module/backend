import { Request, Response } from 'express';
import { pool } from '../config/postgres.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import { redisService } from '../services/redisService.js';
import { createNotificationHelper } from './notification.controller.js';

export const getManualTasks = catchAsync(async (req: Request, res: Response) => {
  const { hotel_id, status, priority, assigned_to, card_no, search } = req.query;

  const cacheKey = `manualTasks:list:hotel_id=${hotel_id || ''}:status=${status || ''}:priority=${priority || ''}:assigned_to=${assigned_to || ''}:card_no=${card_no || ''}:search=${search || ''}`;
  const cachedData = await redisService.get(cacheKey);
  if (cachedData) {
    return res.status(200).json(
      new ApiResponse(200, JSON.parse(cachedData), 'Manual tasks fetched successfully (cached)')
    );
  }

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

  await redisService.set(cacheKey, JSON.stringify(result.rows));

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

  // Restrict creation only to managers
  if (!assigned_by) {
    throw new ApiError(400, 'Creator user (assigned_by) is required to create a manual task');
  }

  const creatorQuery = await pool.query('SELECT role FROM users WHERE id = $1', [assigned_by]);
  if (creatorQuery.rows.length === 0) {
    throw new ApiError(404, 'Creator user (assigned_by) not found');
  }

  const creatorRole = creatorQuery.rows[0].role?.toLowerCase();
  if (creatorRole !== 'manager') {
    throw new ApiError(403, 'Only managers are allowed to create manual tasks');
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

  await redisService.delPattern('manualTasks:list:*');

  // Notify the assigned technician
  const createdTask = result.rows[0];
  if (createdTask && createdTask.assigned_to) {
    createNotificationHelper(
      createdTask.assigned_to,
      'task_assigned',
      `New Task Assigned: ${createdTask.title}`,
      `You have been assigned a new manual task: "${createdTask.title}".`,
      createdTask.manual_task_id,
      'manual_task'
    ).catch(err => console.error('Failed to dispatch task assignment notification:', err));
  }

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

  await redisService.delPattern('manualTasks:list:*');

  // Dispatch notifications asynchronously
  handleManualTaskNotificationDispatch(existing.rows[0], result.rows[0]).catch(err => 
    console.error('Failed to dispatch manual task state notifications:', err)
  );

  res.status(200).json(
    new ApiResponse(200, result.rows[0], 'Manual task updated successfully')
  );
});

const handleManualTaskNotificationDispatch = async (oldTask: any, updatedTask: any) => {
  try {
    const statusChanged = oldTask.status !== updatedTask.status;
    const priorityChanged = oldTask.priority !== updatedTask.priority;

    if (!statusChanged && !priorityChanged) {
      return;
    }

    // Fetch managers and engineers at this hotel
    const staffQuery = `
      SELECT id, role FROM users 
      WHERE hotel_id = $1 AND role IN ('MANAGER', 'ENGINEER') AND is_active = true
    `;
    const staffRes = await pool.query(staffQuery, [updatedTask.hotel_id]);
    const managers = staffRes.rows.filter((u: any) => u.role === 'MANAGER');
    const engineers = staffRes.rows.filter((u: any) => u.role === 'ENGINEER');

    const techId = updatedTask.assigned_to;

    // 1. Escalated to Emergency
    if (priorityChanged && updatedTask.priority === 'emergency') {
      for (const mgr of managers) {
        await createNotificationHelper(
          mgr.id,
          'system',
          `🚨 Emergency Escalation: ${updatedTask.title}`,
          `Manual task "${updatedTask.title}" for asset ${updatedTask.card_no} has been escalated to EMERGENCY.`,
          updatedTask.manual_task_id,
          'manual_task'
        );
      }
      for (const eng of engineers) {
        await createNotificationHelper(
          eng.id,
          'system',
          `🚨 Emergency Escalation: ${updatedTask.title}`,
          `Manual task "${updatedTask.title}" for asset ${updatedTask.card_no} has been escalated to EMERGENCY.`,
          updatedTask.manual_task_id,
          'manual_task'
        );
      }
    }

    // 2. Completed
    if (statusChanged && updatedTask.status === 'completed') {
      for (const mgr of managers) {
        await createNotificationHelper(
          mgr.id,
          'task_completed',
          `Task Completed: ${updatedTask.title}`,
          `Manual task "${updatedTask.title}" for asset ${updatedTask.card_no} has been marked as completed.`,
          updatedTask.manual_task_id,
          'manual_task'
        );
      }
      if (updatedTask.priority === 'emergency') {
        for (const eng of engineers) {
          await createNotificationHelper(
            eng.id,
            'task_completed',
            `Task Completed: ${updatedTask.title}`,
            `Manual task "${updatedTask.title}" for asset ${updatedTask.card_no} has been marked as completed.`,
            updatedTask.manual_task_id,
            'manual_task'
          );
        }
      }
    }

    // 3. Under Review
    if (statusChanged && updatedTask.status === 'under_review') {
      if (techId) {
        await createNotificationHelper(
          techId,
          'system',
          `Task Under Review: ${updatedTask.title}`,
          `Manual task "${updatedTask.title}" for asset ${updatedTask.card_no} is now under review.`,
          updatedTask.manual_task_id,
          'manual_task'
        );
      }
      if (updatedTask.priority === 'emergency') {
        for (const eng of engineers) {
          await createNotificationHelper(
            eng.id,
            'system',
            `🚨 Emergency Task Under Review: ${updatedTask.title}`,
            `Emergency manual task "${updatedTask.title}" for asset ${updatedTask.card_no} is ready for review.`,
            updatedTask.manual_task_id,
            'manual_task'
          );
        }
      }
    }

    // 4. Rejected
    if (statusChanged && updatedTask.status === 'rejected') {
      if (techId) {
        await createNotificationHelper(
          techId,
          'system',
          `Task Rejected: ${updatedTask.title}`,
          `Manual task "${updatedTask.title}" for asset ${updatedTask.card_no} was reviewed and rejected.`,
          updatedTask.manual_task_id,
          'manual_task'
        );
      }
    }

  } catch (err) {
    console.error('Failed to dispatch manual task state change notifications:', err);
  }
};

export const deleteManualTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const existing = await pool.query('SELECT * FROM manual_task WHERE manual_task_id = $1', [id]);
  if (existing.rows.length === 0) {
    throw new ApiError(404, 'Manual task not found');
  }

  await pool.query('DELETE FROM manual_task WHERE manual_task_id = $1', [id]);

  await redisService.delPattern('manualTasks:list:*');

  res.status(200).json(new ApiResponse(200, null, 'Manual task deleted successfully'));
});
