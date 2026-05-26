import express from 'express';
import {
  getMaintenanceSchedules,
  createMaintenanceSchedule,
  updateMaintenanceSchedule,
  deleteMaintenanceSchedule
} from '../controllers/maintenanceSchedule.controller.js';

const router = express.Router();

router.get('/', getMaintenanceSchedules);
router.post('/', createMaintenanceSchedule);
router.put('/:id', updateMaintenanceSchedule);
router.delete('/:id', deleteMaintenanceSchedule);

export default router;
