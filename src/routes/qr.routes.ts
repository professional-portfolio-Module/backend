import express from 'express';
import { generateQR, scanRedirect, updateRedirect } from '../controllers/qr.controller.js';

const router = express.Router();

// Route to generate physical QR code image
router.get('/generate/:machineId', generateQR);

// Dynamic redirect scan route (the destination URL inside the QR code)
router.get('/scan/:machineId', scanRedirect);

// Route to update redirect target for a machine
router.post('/update', updateRedirect);

export default router;
