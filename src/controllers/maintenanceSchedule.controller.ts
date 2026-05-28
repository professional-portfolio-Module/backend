import { Request, Response } from 'express';
import { pool } from '../config/postgres.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

export const getMaintenanceSchedules = catchAsync(async (req: Request, res: Response) => {
  const { hotel_id, month, card_no, page = '1', limit = '50', search, week_no } = req.query;

  if (!hotel_id) {
    throw new ApiError(400, 'Hotel ID is required');
  }

  const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
  const limitNum = Math.min(200, Math.max(1, parseInt(limit as string, 10) || 50));
  const offset = (pageNum - 1) * limitNum;

  // Build WHERE clause
  let whereClause = ` WHERE s.hotel_id = $1`;
  const params: any[] = [hotel_id];
  let paramIndex = 2;

  if (month) {
    whereClause += ` AND s.month = $${paramIndex++}`;
    params.push(month);
  }

  if (card_no) {
    whereClause += ` AND s.card_no = $${paramIndex++}`;
    params.push(card_no);
  }

  if (week_no) {
    whereClause += ` AND s.week_no = $${paramIndex++}`;
    params.push(parseInt(week_no as string, 10));
  }

  if (search) {
    whereClause += ` AND (s.title ILIKE $${paramIndex} OR s.default_description_manager ILIKE $${paramIndex})`;
    paramIndex++;
    params.push(`%${search}%`);
  }

  // Count total
  const countQuery = `SELECT COUNT(*) as total FROM maintenance_schedule s ${whereClause}`;
  const countResult = await pool.query(countQuery, params);
  const totalItems = parseInt(countResult.rows[0].total, 10);
  const totalPages = Math.ceil(totalItems / limitNum);

  // Fetch paginated schedules
  const dataQuery = `
    SELECT 
      s.*,
      a.description as asset_description,
      a.location as asset_location
    FROM maintenance_schedule s
    LEFT JOIN assets a ON s.card_no = a.card_no
    ${whereClause}
    ORDER BY s.created_at DESC
    LIMIT $${paramIndex++} OFFSET $${paramIndex++}
  `;
  params.push(limitNum, offset);

  const result = await pool.query(dataQuery, params);
  const schedules = result.rows;

  if (schedules.length > 0) {
    // Fetch all assignments for these schedules
    const scheduleIds = schedules.map(s => s.schedule_id);
    const assignQuery = `
      SELECT 
        assign.*,
        u.name as technician_name,
        u.email as technician_email
      FROM assignments assign
      LEFT JOIN users u ON assign.user_id = u.id
      WHERE assign.scheduled_id = ANY($1)
    `;
    const assignResult = await pool.query(assignQuery, [scheduleIds]);
    
    // Group assignments by scheduled_id
    const assignmentsMap: { [key: string]: any[] } = {};
    assignResult.rows.forEach(row => {
      if (!assignmentsMap[row.scheduled_id]) {
        assignmentsMap[row.scheduled_id] = [];
      }
      assignmentsMap[row.scheduled_id].push(row);
    });

    // Merge assignments into schedules
    schedules.forEach(s => {
      s.assignments = assignmentsMap[s.schedule_id] || [];
    });
  }

  res.status(200).json(
    new ApiResponse(200, {
      items: schedules,
      pagination: {
        totalItems,
        totalPages,
        currentPage: pageNum,
        limit: limitNum,
      }
    }, 'Maintenance schedules fetched successfully')
  );
});

export const createMaintenanceSchedule = catchAsync(async (req: Request, res: Response) => {
  const {
    hotel_id,
    card_no,
    month,
    week_no,
    start_date,
    end_date,
    title,
    default_description_manager,
    assigned_technicians = [], // Array of technician user_ids
    assigned_by // Staff member user_id
  } = req.body;

  if (!hotel_id || !card_no || !month || !week_no || !start_date || !end_date || !title) {
    throw new ApiError(400, 'Hotel ID, Asset Card No, Month, Week No, Start Date, End Date, and Title are required');
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Verify asset exists for this card_no in the hotel
    const assetCheck = await client.query('SELECT card_no FROM assets WHERE card_no = $1 AND hotel_id = $2', [card_no, hotel_id]);
    if (assetCheck.rows.length === 0) {
      throw new ApiError(404, `Asset with card number '${card_no}' not found in this hotel`);
    }

    // 2. Insert maintenance schedule
    const scheduleQuery = `
      INSERT INTO maintenance_schedule (
        schedule_id, hotel_id, card_no, month, week_no, start_date, end_date, title, default_description_manager, is_active, created_at, updated_at
      ) VALUES (
        uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, true, NOW(), NOW()
      ) RETURNING *
    `;
    const scheduleResult = await client.query(scheduleQuery, [
      hotel_id,
      card_no,
      month.toUpperCase().substring(0, 3), // Ensure short month name format, e.g. JAN, FEB
      parseInt(week_no, 10),
      start_date,
      end_date,
      title.trim(),
      default_description_manager ? default_description_manager.trim() : null
    ]);

    const newSchedule = scheduleResult.rows[0];

    // 3. Insert assignments if any
    const insertedAssignments: any[] = [];
    if (assigned_technicians && assigned_technicians.length > 0) {
      for (const techId of assigned_technicians) {
        const assignQuery = `
          INSERT INTO assignments (
            assignment_id, user_id, scheduled_id, assigned_at, assigned_by
          ) VALUES (
            uuid_generate_v4(), $1, $2, NOW(), $3
          ) RETURNING *
        `;
        const assignResult = await client.query(assignQuery, [techId, newSchedule.schedule_id, assigned_by || null]);
        insertedAssignments.push(assignResult.rows[0]);
      }
    }

    await client.query('COMMIT');

    newSchedule.assignments = insertedAssignments;

    res.status(201).json(
      new ApiResponse(201, newSchedule, 'Maintenance schedule created successfully')
    );
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
});

export const updateMaintenanceSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    card_no,
    month,
    week_no,
    start_date,
    end_date,
    title,
    default_description_manager,
    is_active,
    assigned_technicians = [], // Array of technician user_ids
    assigned_by
  } = req.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Check if schedule exists
    const existingCheck = await client.query('SELECT * FROM maintenance_schedule WHERE schedule_id = $1', [id]);
    if (existingCheck.rows.length === 0) {
      throw new ApiError(404, 'Maintenance schedule not found');
    }

    const currentSchedule = existingCheck.rows[0];

    // 2. Verify asset if card_no is changing
    if (card_no && card_no !== currentSchedule.card_no) {
      const assetCheck = await client.query('SELECT card_no FROM assets WHERE card_no = $1 AND hotel_id = $2', [card_no, currentSchedule.hotel_id]);
      if (assetCheck.rows.length === 0) {
        throw new ApiError(404, `Asset with card number '${card_no}' not found`);
      }
    }

    // 3. Update maintenance schedule
    const updateQuery = `
      UPDATE maintenance_schedule
      SET 
        card_no = COALESCE($1, card_no),
        month = COALESCE($2, month),
        week_no = COALESCE($3, week_no),
        start_date = COALESCE($4, start_date),
        end_date = COALESCE($5, end_date),
        title = COALESCE($6, title),
        default_description_manager = $7,
        is_active = COALESCE($8, is_active),
        updated_at = NOW()
      WHERE schedule_id = $9
      RETURNING *
    `;
    const scheduleResult = await client.query(updateQuery, [
      card_no || null,
      month ? month.toUpperCase().substring(0, 3) : null,
      week_no !== undefined ? parseInt(week_no, 10) : null,
      start_date || null,
      end_date || null,
      title ? title.trim() : null,
      default_description_manager ? default_description_manager.trim() : null,
      is_active !== undefined ? is_active : null,
      id
    ]);

    const updatedSchedule = scheduleResult.rows[0];

    // 4. Update Assignments
    if (assigned_technicians !== undefined) {
      // Delete existing assignments not in the list
      if (assigned_technicians.length === 0) {
        await client.query('DELETE FROM assignments WHERE scheduled_id = $1', [id]);
      } else {
        await client.query(
          'DELETE FROM assignments WHERE scheduled_id = $1 AND NOT (user_id = ANY($2))',
          [id, assigned_technicians]
        );

        // Fetch remaining assignments to avoid duplicates
        const remaining = await client.query('SELECT user_id FROM assignments WHERE scheduled_id = $1', [id]);
        const existingUserIds = remaining.rows.map(r => r.user_id);

        // Insert new ones
        for (const techId of assigned_technicians) {
          if (!existingUserIds.includes(techId)) {
            await client.query(`
              INSERT INTO assignments (
                assignment_id, user_id, scheduled_id, assigned_at, assigned_by
              ) VALUES (
                uuid_generate_v4(), $1, $2, NOW(), $3
              )
            `, [techId, id, assigned_by || null]);
          }
        }
      }
    }

    await client.query('COMMIT');

    // Fetch assignments for the response
    const finalAssign = await pool.query(`
      SELECT 
        assign.*,
        u.name as technician_name,
        u.email as technician_email
      FROM assignments assign
      LEFT JOIN users u ON assign.user_id = u.id
      WHERE assign.scheduled_id = $1
    `, [id]);

    updatedSchedule.assignments = finalAssign.rows;

    res.status(200).json(
      new ApiResponse(200, updatedSchedule, 'Maintenance schedule updated successfully')
    );
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
});

export const deleteMaintenanceSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const existing = await pool.query('SELECT * FROM maintenance_schedule WHERE schedule_id = $1', [id]);
  if (existing.rows.length === 0) {
    throw new ApiError(404, 'Maintenance schedule not found');
  }

  // Soft-delete schedule by setting is_active = false
  await pool.query('UPDATE maintenance_schedule SET is_active = false, updated_at = NOW() WHERE schedule_id = $1', [id]);

  res.status(200).json(
    new ApiResponse(200, null, 'Maintenance schedule deactivated successfully')
  );
});
