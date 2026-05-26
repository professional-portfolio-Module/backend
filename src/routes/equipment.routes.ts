import express from 'express';
import {
  getEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  getEquipmentStatuses,
} from '../controllers/equipment.controller.js';

const router = express.Router();

router.get('/', getEquipment);
router.get('/statuses', getEquipmentStatuses);
router.get('/:id', getEquipmentById);
router.post('/', createEquipment);
router.put('/:id', updateEquipment);

export default router;

