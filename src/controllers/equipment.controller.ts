import { Request, Response } from 'express';
import { pool } from '../config/postgres.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import { redisService } from '../services/redisService.js';
import { createNotificationHelper } from './notification.controller.js';

export const getEquipment = catchAsync(async (req: Request, res: Response) => {
  const { search, category_id, status, page = 1, limit = 10, hotel_id } = req.query;

  const pageVal = Math.max(1, parseInt(page as string, 10) || 1);
  const limitVal = Math.max(1, Math.min(100, parseInt(limit as string, 10) || 10));
  const offset = (pageVal - 1) * limitVal;

  const cacheKey = `equipment:list:search=${search || ''}:category_id=${category_id || ''}:status=${status || ''}:hotel_id=${hotel_id || ''}:page=${pageVal}:limit=${limitVal}`;
  const cachedData = await redisService.get(cacheKey);
  if (cachedData) {
    return res.status(200).json(
      new ApiResponse(
        200,
        JSON.parse(cachedData),
        'Equipment list fetched successfully (cached)'
      )
    );
  }

  let query = `
    SELECT e.*, c.name as category_name, c.code as category_code
    FROM assets e
    LEFT JOIN categories c ON e.category_id = c.id
    WHERE 1=1
  `;
  const params: any[] = [];
  let paramIndex = 1;

  if (category_id) {
    query += ` AND e.category_id = $${paramIndex++}`;
    params.push(category_id);
  }

  if (status) {
    query += ` AND e.status = $${paramIndex++}`;
    params.push(status);
  }

  if (hotel_id) {
    query += ` AND e.hotel_id = $${paramIndex++}`;
    params.push(hotel_id);
  }

  if (search) {
    query += ` AND (e.card_no ILIKE $${paramIndex} OR e.description ILIKE $${paramIndex} OR e.location ILIKE $${paramIndex})`;
    params.push(`%${search}%`);
    paramIndex++;
  }

  // Fetch count for pagination
  const countQuery = `SELECT COUNT(*) FROM (${query}) AS temp`;
  const countResult = await pool.query(countQuery, params);
  const totalItems = parseInt(countResult.rows[0].count, 10);

  // Fetch data
  query += ` ORDER BY e.card_no ASC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
  params.push(limitVal, offset);

  const dataResult = await pool.query(query, params);
  const totalPages = Math.ceil(totalItems / limitVal);

  const responseData = {
    items: dataResult.rows,
    pagination: {
      totalItems,
      totalPages,
      currentPage: pageVal,
      limit: limitVal,
    },
  };

  await redisService.set(cacheKey, JSON.stringify(responseData));

  res.status(200).json(
    new ApiResponse(
      200,
      responseData,
      'Equipment list fetched successfully'
    )
  );
});

export const getEquipmentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const cacheKey = `equipment:detail:${id}`;
  const cachedData = await redisService.get(cacheKey);
  if (cachedData) {
    return res.status(200).json(
      new ApiResponse(200, JSON.parse(cachedData), 'Equipment details fetched successfully (cached)')
    );
  }

  const query = `
    SELECT e.*, c.name as category_name, c.code as category_code
    FROM assets e
    LEFT JOIN categories c ON e.category_id = c.id
    WHERE e.id = $1
  `;
  const result = await pool.query(query, [id]);
  if (result.rows.length === 0) {
    throw new ApiError(404, 'Equipment item not found');
  }

  const detail = result.rows[0];
  await redisService.set(cacheKey, JSON.stringify(detail));

  res.status(200).json(new ApiResponse(200, detail, 'Equipment details fetched successfully'));
});

export const createEquipment = catchAsync(async (req: Request, res: Response) => {
  const {
    equipment_no,
    card_no, // Support new column name
    category_id,
    description,
    location,
    status,
    installation_date,
    warranty_expiry,
    warranty_expiery, // Support new column name
    notes,
    hotel_id,
    qr_code_url, // New column
  } = req.body;

  const finalCardNo = card_no || equipment_no;
  const finalWarrantyExpiry = warranty_expiery || warranty_expiry;

  if (!finalCardNo || !category_id || !description) {
    throw new ApiError(400, 'card_no, category_id, and description are required fields');
  }

  const normalizedEqNo = finalCardNo.toUpperCase().trim();
  if (normalizedEqNo.length > 20) {
    throw new ApiError(400, 'Card number must be at most 20 characters');
  }

  // Validate category_id exists
  const categoryCheck = await pool.query('SELECT id FROM categories WHERE id = $1', [category_id]);
  if (categoryCheck.rows.length === 0) {
    throw new ApiError(400, 'Invalid category_id. Category does not exist.');
  }

  // Check if card_no already exists
  const eqNoCheck = await pool.query('SELECT id FROM assets WHERE card_no = $1', [normalizedEqNo]);
  if (eqNoCheck.rows.length > 0) {
    throw new ApiError(400, `Card number '${normalizedEqNo}' already exists`);
  }

  // Resolve hotel_id
  let targetHotelId = hotel_id;
  if (!targetHotelId) {
    const hotelResult = await pool.query('SELECT id FROM hotels LIMIT 1');
    if (hotelResult.rows.length === 0) {
      throw new ApiError(500, 'No hotel configured in the database');
    }
    targetHotelId = hotelResult.rows[0].id;
  } else {
    // Validate hotel_id exists
    const hotelCheck = await pool.query('SELECT id FROM hotels WHERE id = $1', [targetHotelId]);
    if (hotelCheck.rows.length === 0) {
      throw new ApiError(400, 'Invalid hotel_id. Hotel does not exist.');
    }
  }

  // Validate status
  if (status && !['active', 'under_maintainace', 'breakdown', 'retired', 'inactive'].includes(status)) {
    throw new ApiError(400, "Status must be one of 'active', 'under_maintainace', 'breakdown', 'retired', or 'inactive'");
  }

  const result = await pool.query(
    `INSERT INTO assets (
      hotel_id,
      card_no,
      category_id,
      description,
      location,
      status,
      installation_date,
      warranty_expiery,
      notes,
      qr_code_url
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *`,
    [
      targetHotelId,
      normalizedEqNo,
      category_id,
      description.trim(),
      location ? location.trim() : null,
      status || 'active',
      installation_date || null,
      finalWarrantyExpiry || null,
      notes ? notes.trim() : null,
      qr_code_url ? qr_code_url.trim() : null,
    ]
  );

  const joinedResult = await pool.query(
    `SELECT e.*, c.name as category_name, c.code as category_code
     FROM assets e
     LEFT JOIN categories c ON e.category_id = c.id
     WHERE e.id = $1`,
    [result.rows[0].id]
  );

  // Invalidate list caches
  await redisService.delPattern('equipment:list:*');

  res.status(201).json(new ApiResponse(201, joinedResult.rows[0], 'Equipment item created successfully'));
});

export const updateEquipment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    equipment_no,
    card_no, // Support new column name
    category_id,
    description,
    location,
    status,
    installation_date,
    warranty_expiry,
    warranty_expiery, // Support new column name
    notes,
    hotel_id,
    qr_code_url, // New column
  } = req.body;

  // Check if asset exists
  const existing = await pool.query('SELECT * FROM assets WHERE id = $1', [id]);
  if (existing.rows.length === 0) {
    throw new ApiError(404, 'Equipment item not found');
  }

  const finalCardNo = card_no !== undefined ? card_no : equipment_no;
  const finalWarrantyExpiry = warranty_expiery !== undefined ? warranty_expiery : warranty_expiry;

  let query = 'UPDATE assets SET';
  const params: any[] = [];
  let paramIndex = 1;

  if (finalCardNo !== undefined) {
    const normalizedEqNo = finalCardNo.toUpperCase().trim();
    if (normalizedEqNo === '') {
      throw new ApiError(400, 'Card number cannot be empty');
    }
    if (normalizedEqNo.length > 20) {
      throw new ApiError(400, 'Card number must be at most 20 characters');
    }
    // Check for uniqueness conflict
    const eqNoCheck = await pool.query('SELECT id FROM assets WHERE card_no = $1 AND id != $2', [
      normalizedEqNo,
      id,
    ]);
    if (eqNoCheck.rows.length > 0) {
      throw new ApiError(400, `Card number '${normalizedEqNo}' already exists`);
    }
    query += ` card_no = $${paramIndex++},`;
    params.push(normalizedEqNo);
  }

  if (category_id !== undefined) {
    if (!category_id) {
      throw new ApiError(400, 'Category ID cannot be null');
    }
    // Validate category exists
    const categoryCheck = await pool.query('SELECT id FROM categories WHERE id = $1', [category_id]);
    if (categoryCheck.rows.length === 0) {
      throw new ApiError(400, 'Invalid category_id. Category does not exist.');
    }
    query += ` category_id = $${paramIndex++},`;
    params.push(category_id);
  }

  if (description !== undefined) {
    const trimmedDesc = description.trim();
    if (trimmedDesc === '') {
      throw new ApiError(400, 'Description cannot be empty');
    }
    query += ` description = $${paramIndex++},`;
    params.push(trimmedDesc);
  }

  if (location !== undefined) {
    const val = location !== null ? location.trim() : null;
    query += ` location = $${paramIndex++},`;
    params.push(val);
  }

  if (status !== undefined) {
    if (!['active', 'under_maintainace', 'breakdown', 'retired', 'inactive'].includes(status)) {
      throw new ApiError(400, "Status must be one of 'active', 'under_maintainace', 'breakdown', 'retired', or 'inactive'");
    }
    query += ` status = $${paramIndex++},`;
    params.push(status);
  }

  if (installation_date !== undefined) {
    query += ` installation_date = $${paramIndex++},`;
    params.push(installation_date || null);
  }

  if (finalWarrantyExpiry !== undefined) {
    query += ` warranty_expiery = $${paramIndex++},`;
    params.push(finalWarrantyExpiry || null);
  }

  if (notes !== undefined) {
    const val = notes !== null ? notes.trim() : null;
    query += ` notes = $${paramIndex++},`;
    params.push(val);
  }

  if (hotel_id !== undefined) {
    if (!hotel_id) {
      throw new ApiError(400, 'Hotel ID cannot be null');
    }
    const hotelCheck = await pool.query('SELECT id FROM hotels WHERE id = $1', [hotel_id]);
    if (hotelCheck.rows.length === 0) {
      throw new ApiError(400, 'Invalid hotel_id. Hotel does not exist.');
    }
    query += ` hotel_id = $${paramIndex++},`;
    params.push(hotel_id);
  }

  if (qr_code_url !== undefined) {
    const val = qr_code_url !== null ? qr_code_url.trim() : null;
    query += ` qr_code_url = $${paramIndex++},`;
    params.push(val);
  }

  if (params.length === 0) {
    throw new ApiError(400, 'No fields provided for update');
  }

  query += ` updated_at = CURRENT_TIMESTAMP,`;

  // Remove trailing comma
  query = query.slice(0, -1);
  query += ` WHERE id = $${paramIndex} RETURNING *`;
  params.push(id);

  await pool.query(query, params);

  // Return joined details
  const joinedResult = await pool.query(
    `SELECT e.*, c.name as category_name, c.code as category_code
     FROM assets e
     LEFT JOIN categories c ON e.category_id = c.id
     WHERE e.id = $1`,
    [id]
  );

  // Invalidate caches
  await redisService.delPattern('equipment:list:*');
  await redisService.del(`equipment:detail:${id}`);

  // Trigger system notifications if status is updated to breakdown or under_maintainace
  if (status !== undefined && status !== existing.rows[0].status && (status === 'breakdown' || status === 'under_maintainace')) {
    try {
      const managersResult = await pool.query("SELECT id FROM users WHERE role IN ('MANAGER', 'ADMIN', 'SUPER_ADMIN')");
      for (const manager of managersResult.rows) {
        await createNotificationHelper(
          manager.id,
          'system',
          'Asset Status Alert',
          `Asset '${joinedResult.rows[0].card_no}' has been marked as '${status}'. Please assign a maintenance task.`
        );
      }
    } catch (notifErr) {
      console.error('Failed to trigger asset breakdown notification:', notifErr);
    }
  }

  res.status(200).json(new ApiResponse(200, joinedResult.rows[0], 'Equipment item updated successfully'));
});

export const deleteEquipment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  // Check if asset exists
  const existing = await pool.query('SELECT id FROM assets WHERE id = $1', [id]);
  if (existing.rows.length === 0) {
    throw new ApiError(404, 'Equipment item not found');
  }

  // Soft delete asset by setting status to 'retired'
  await pool.query("UPDATE assets SET status = 'retired', updated_at = CURRENT_TIMESTAMP WHERE id = $1", [id]);

  // Invalidate caches
  await redisService.delPattern('equipment:list:*');
  await redisService.del(`equipment:detail:${id}`);

  res.status(200).json(new ApiResponse(200, null, 'Equipment item soft deleted successfully'));
});
