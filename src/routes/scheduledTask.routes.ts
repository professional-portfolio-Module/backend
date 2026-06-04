import express from 'express';
import { 
  getScheduledTasks, 
  getPendingTaskByAsset, 
  updateScheduledTask,
  getScannerStatus,
  toggleScanner,
  getProximityStatus,
  toggleProximity
} from '../controllers/scheduledTask.controller.js';

const router = express.Router();

router.get('/', getScheduledTasks);
router.get('/scanner-status', getScannerStatus);
router.post('/scanner-toggle', toggleScanner);
router.get('/proximity-status', getProximityStatus);
router.post('/proximity-toggle', toggleProximity);
router.get('/pending-by-asset', getPendingTaskByAsset);
router.patch('/:taskId', updateScheduledTask);

export default router;
