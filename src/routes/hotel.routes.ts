import express from 'express';
import {
  getHotels,
  getHotelById,
  createHotel,
} from '../controllers/hotel.controller.js';

const router = express.Router();

router.get('/', getHotels);
router.get('/:id', getHotelById);
router.post('/', createHotel);

export default router;
