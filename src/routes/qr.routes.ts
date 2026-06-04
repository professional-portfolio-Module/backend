import express from 'express';
import {
  generateQR,
  scanRedirect,
  updateRedirect,
  getTarget,
  getPublicMetadata,
  createPublicReport
} from '../controllers/qr.controller.js';

const router = express.Router();

// Route to generate physical QR code image
router.get('/generate/:machineId', generateQR);

// Route to get redirect target for a machine
router.get('/target/:machineId', getTarget);

// Dynamic redirect scan route (the destination URL inside the QR code)
router.get('/scan/:machineId', scanRedirect);

// Route to update redirect target for a machine
router.post('/update', updateRedirect);

// Public route to get non-sensitive asset metadata
router.get('/public-metadata/:card_no', getPublicMetadata);

// Public route to create manual tasks from scan without credentials
router.post('/public-report', createPublicReport);

export default router;
