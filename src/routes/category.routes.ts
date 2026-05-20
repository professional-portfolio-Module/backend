import express from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
} from '../controllers/category.controller.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.put('/:id', updateCategory);

export default router;
