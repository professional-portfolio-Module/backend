import { Request, Response } from 'express';
import { pool } from '../config/postgres.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import { redisService } from '../services/redisService.js';

export const getEquipment = catchAsync(async (req: Request, res: Response) => {
  const { search, category_id, status, page = 1, limit = 10 } = req.query;

  const pageVal = Math.max(1, parseInt(page as string, 10) || 1);
  const limitVal = Math.max(1, Math.min(100, parseInt(limit as string, 10) || 10));
  const offset = (pageVal - 1) * limitVal;

  const cacheKey = `equipment:list:search=${search || ''}:category_id=${category_id || ''}:status=${status || ''}:page=${pageVal}:limit=${limitVal}`;
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
    FROM equipment e
    LEFT JOIN equipment_categories c ON e.category_id = c.id
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

  if (search) {
    query += ` AND (e.equipment_no ILIKE $${paramIndex} OR e.description ILIKE $${paramIndex} OR e.location ILIKE $${paramIndex})`;
    params.push(`%${search}%`);
    paramIndex++;
  }

  // Fetch count for pagination
  const countQuery = `SELECT COUNT(*) FROM (${query}) AS temp`;
  const countResult = await pool.query(countQuery, params);
  const totalItems = parseInt(countResult.rows[0].count, 10);

  // Fetch data
  query += ` ORDER BY e.equipment_no ASC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
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
    FROM equipment e
    LEFT JOIN equipment_categories c ON e.category_id = c.id
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
    category_id,
    description,
    location,
    status,
    installation_date,
    warranty_expiry,
    notes,
    hotel_id,
  } = req.body;

  if (!equipment_no || !category_id || !description) {
    throw new ApiError(400, 'equipment_no, category_id, and description are required fields');
  }

  const normalizedEqNo = equipment_no.toUpperCase().trim();
  if (normalizedEqNo.length > 20) {
    throw new ApiError(400, 'Equipment number must be at most 20 characters');
  }

  // Validate category_id exists
  const categoryCheck = await pool.query('SELECT id FROM equipment_categories WHERE id = $1', [category_id]);
  if (categoryCheck.rows.length === 0) {
    throw new ApiError(400, 'Invalid category_id. Category does not exist.');
  }

  // Check if equipment_no already exists
  const eqNoCheck = await pool.query('SELECT id FROM equipment WHERE equipment_no = $1', [normalizedEqNo]);
  if (eqNoCheck.rows.length > 0) {
    throw new ApiError(400, `Equipment number '${normalizedEqNo}' already exists`);
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
  if (status && !['active', 'inactive', 'retired'].includes(status)) {
    throw new ApiError(400, "Status must be one of 'active', 'inactive', or 'retired'");
  }

  const result = await pool.query(
    `INSERT INTO equipment (
      hotel_id,
      equipment_no,
      category_id,
      description,
      location,
      status,
      installation_date,
      warranty_expiry,
      notes
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`,
    [
      targetHotelId,
      normalizedEqNo,
      category_id,
      description.trim(),
      location ? location.trim() : null,
      status || 'active',
      installation_date || null,
      warranty_expiry || null,
      notes ? notes.trim() : null,
    ]
  );

  const joinedResult = await pool.query(
    `SELECT e.*, c.name as category_name, c.code as category_code
     FROM equipment e
     LEFT JOIN equipment_categories c ON e.category_id = c.id
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
    category_id,
    description,
    location,
    status,
    installation_date,
    warranty_expiry,
    notes,
    hotel_id,
  } = req.body;

  // Check if equipment exists
  const existing = await pool.query('SELECT * FROM equipment WHERE id = $1', [id]);
  if (existing.rows.length === 0) {
    throw new ApiError(404, 'Equipment item not found');
  }

  let query = 'UPDATE equipment SET';
  const params: any[] = [];
  let paramIndex = 1;

  if (equipment_no !== undefined) {
    const normalizedEqNo = equipment_no.toUpperCase().trim();
    if (normalizedEqNo === '') {
      throw new ApiError(400, 'Equipment number cannot be empty');
    }
    if (normalizedEqNo.length > 20) {
      throw new ApiError(400, 'Equipment number must be at most 20 characters');
    }
    // Check for uniqueness conflict
    const eqNoCheck = await pool.query('SELECT id FROM equipment WHERE equipment_no = $1 AND id != $2', [
      normalizedEqNo,
      id,
    ]);
    if (eqNoCheck.rows.length > 0) {
      throw new ApiError(400, `Equipment number '${normalizedEqNo}' already exists`);
    }
    query += ` equipment_no = $${paramIndex++},`;
    params.push(normalizedEqNo);
  }

  if (category_id !== undefined) {
    if (!category_id) {
      throw new ApiError(400, 'Category ID cannot be null');
    }
    // Validate category exists
    const categoryCheck = await pool.query('SELECT id FROM equipment_categories WHERE id = $1', [category_id]);
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
    if (!['active', 'inactive', 'retired'].includes(status)) {
      throw new ApiError(400, "Status must be one of 'active', 'inactive', or 'retired'");
    }
    query += ` status = $${paramIndex++},`;
    params.push(status);
  }

  if (installation_date !== undefined) {
    query += ` installation_date = $${paramIndex++},`;
    params.push(installation_date || null);
  }

  if (warranty_expiry !== undefined) {
    query += ` warranty_expiry = $${paramIndex++},`;
    params.push(warranty_expiry || null);
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
     FROM equipment e
     LEFT JOIN equipment_categories c ON e.category_id = c.id
     WHERE e.id = $1`,
    [id]
  );

  // Invalidate caches
  await redisService.delPattern('equipment:list:*');
  await redisService.del(`equipment:detail:${id}`);

  res.status(200).json(new ApiResponse(200, joinedResult.rows[0], 'Equipment item updated successfully'));
});
