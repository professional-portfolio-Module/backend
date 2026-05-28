import express from 'express';
import { getScheduledTasks } from '../controllers/scheduledTask.controller.js';

const router = express.Router();

router.get('/', getScheduledTasks);

export default router;
