import express from 'express';
import { getMaintenanceStatus, toggleMaintenanceMode, uploadImage } from '../controllers/system.controller.js';

const router = express.Router();

router.get('/maintenance-status', getMaintenanceStatus);
router.post('/maintenance-toggle', toggleMaintenanceMode);
router.post('/upload', uploadImage);

export default router;
