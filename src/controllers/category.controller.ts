import { Request, Response } from 'express';
import { pool } from '../config/postgres.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

export const getCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await pool.query('SELECT id, code, name, description, created_at FROM categories ORDER BY name ASC');
  res.status(200).json(new ApiResponse(200, result.rows, 'Categories fetched successfully'));
});

export const getCategoryById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await pool.query('SELECT id, code, name, description, created_at FROM categories WHERE id = $1', [id]);
  if (result.rows.length === 0) {
    throw new ApiError(404, 'Category not found');
  }
  res.status(200).json(new ApiResponse(200, result.rows[0], 'Category fetched successfully'));
});

export const createCategory = catchAsync(async (req: Request, res: Response) => {
  const { code, name, description } = req.body;

  if (!code || !name) {
    throw new ApiError(400, 'Code and Name are required fields');
  }

  const normalizedCode = code.toUpperCase().trim();
  if (normalizedCode.length > 5) {
    throw new ApiError(400, 'Category code must be at most 5 characters');
  }

  // Check if code already exists
  const existing = await pool.query('SELECT id FROM categories WHERE code = $1', [normalizedCode]);
  if (existing.rows.length > 0) {
    throw new ApiError(400, `Category code '${normalizedCode}' already exists`);
  }

  const result = await pool.query(
    'INSERT INTO categories (code, name, description) VALUES ($1, $2, $3) RETURNING id, code, name, description, created_at',
    [normalizedCode, name.trim(), description ? description.trim() : null]
  );

  res.status(201).json(new ApiResponse(201, result.rows[0], 'Category created successfully'));
});

export const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;

  // Fetch the category to check if it exists
  const existing = await pool.query('SELECT id FROM categories WHERE id = $1', [id]);
  if (existing.rows.length === 0) {
    throw new ApiError(404, 'Category not found');
  }

  // Build the dynamic update query allowing only name and description
  let query = 'UPDATE categories SET';
  const params: any[] = [];
  let paramIndex = 1;

  if (name !== undefined) {
    const trimmedName = name.trim();
    if (trimmedName === '') {
      throw new ApiError(400, 'Category name cannot be empty');
    }
    query += ` name = $${paramIndex++},`;
    params.push(trimmedName);
  }

  if (description !== undefined) {
    const val = description !== null ? description.trim() : null;
    query += ` description = $${paramIndex++},`;
    params.push(val);
  }

  if (params.length === 0) {
    throw new ApiError(400, 'No fields to update. Only name and description can be updated.');
  }

  // Remove trailing comma
  query = query.slice(0, -1);
  query += ` WHERE id = $${paramIndex} RETURNING id, code, name, description, created_at`;
  params.push(id);

  const result = await pool.query(query, params);

  res.status(200).json(new ApiResponse(200, result.rows[0], 'Category updated successfully'));
});
