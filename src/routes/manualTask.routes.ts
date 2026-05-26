import express from 'express';
import {
  getManualTasks,
  createManualTask,
  updateManualTask,
  deleteManualTask,
} from '../controllers/manualTask.controller.js';

const router = express.Router();

router.get('/', getManualTasks);
router.post('/', createManualTask);
router.put('/:id', updateManualTask);
router.delete('/:id', deleteManualTask);

export default router;
