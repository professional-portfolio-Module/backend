import { Request, Response } from 'express';
import { pool } from '../config/postgres.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

export const getHotels = catchAsync(async (req: Request, res: Response) => {
  const result = await pool.query('SELECT id, name, country, city, created_at FROM hotels ORDER BY name ASC');
  res.status(200).json(new ApiResponse(200, result.rows, 'Hotels fetched successfully'));
});

export const getHotelById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await pool.query('SELECT id, name, country, city, created_at FROM hotels WHERE id = $1', [id]);
  if (result.rows.length === 0) {
    throw new ApiError(404, 'Hotel not found');
  }
  res.status(200).json(new ApiResponse(200, result.rows[0], 'Hotel fetched successfully'));
});

export const createHotel = catchAsync(async (req: Request, res: Response) => {
  const { name, country, city } = req.body;

  if (!name || name.trim() === '') {
    throw new ApiError(400, 'Hotel name is required');
  }

  // Check if hotel name already exists in same city/country to prevent duplicates
  const existing = await pool.query(
    'SELECT id FROM hotels WHERE LOWER(name) = LOWER($1) AND LOWER(city) = LOWER($2)',
    [name.trim(), (city || '').trim()]
  );
  
  if (existing.rows.length > 0) {
    throw new ApiError(400, `Hotel '${name.trim()}' in '${(city || '').trim()}' already exists`);
  }

  const result = await pool.query(
    'INSERT INTO hotels (name, country, city) VALUES ($1, $2, $3) RETURNING id, name, country, city, created_at',
    [name.trim(), country ? country.trim() : null, city ? city.trim() : null]
  );

  res.status(201).json(new ApiResponse(201, result.rows[0], 'Hotel created successfully'));
});
