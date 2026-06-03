import express from 'express';
import { getMaintenanceStatus, toggleMaintenanceMode } from '../controllers/system.controller.js';

const router = express.Router();

router.get('/maintenance-status', getMaintenanceStatus);
router.post('/maintenance-toggle', toggleMaintenanceMode);

export default router;
