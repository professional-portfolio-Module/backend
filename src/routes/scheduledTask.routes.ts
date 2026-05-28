import express from 'express';
import { getScheduledTasks, getPendingTaskByAsset, updateScheduledTask } from '../controllers/scheduledTask.controller.js';

const router = express.Router();

router.get('/', getScheduledTasks);
router.get('/pending-by-asset', getPendingTaskByAsset);
router.patch('/:taskId', updateScheduledTask);

export default router;
