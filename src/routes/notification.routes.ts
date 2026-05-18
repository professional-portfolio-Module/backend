import express from 'express';
import natsService from '../services/natsService.js';
import notificationService from '../services/notificationService.js';
import catchAsync from '../utils/catchAsync.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import logger from '../config/logger.js';

const router = express.Router();
const NATS_SUBJECT = 'maintenance.notifications';

/**
 * Endpoint to test NATS publishing end-to-end.
 * It will publish a notification payload to the NATS subject.
 */
router.post('/publish-test', catchAsync(async (req, res) => {
  const { recipient, variables, channels } = req.body;

  // Standard sample data representing CMMS task reminder
  const defaultRecipient = {
    name: 'Adeepa Senavirathna',
    email: 'adeepa@naita.lk',
    phone: '+94771234567',
    pushToken: 'ExponentPushToken[mock_technician_token_123]',
  };

  const defaultVariables = {
    task_name: 'Inspect Boiler Pressure',
    machine_name: 'Industrial Boiler B-02',
    scheduled_time: '10:00 AM today',
    scheduled_date: '2026-05-18',
    task_id: 'TASK-551',
  };

  const payload = {
    recipient: { ...defaultRecipient, ...recipient },
    templateType: 'maintenance_reminder',
    variables: { ...defaultVariables, ...variables },
    channels: channels || ['sms', 'email', 'push'],
  };

  logger.info(`📤 [Producer API] Publishing notification event to NATS subject '${NATS_SUBJECT}'...`);
  
  // Publish JSON payload to NATS
  await natsService.publish(NATS_SUBJECT, payload);

  res.send(
    new ApiResponse(200, payload, 'Notification event published successfully to NATS subject')
  );
}));

/**
 * Bypass NATS: Direct endpoint to trigger notification services synchronously.
 */
router.post('/send-direct', catchAsync(async (req, res) => {
  const { recipient, templateType, variables, channels } = req.body;

  if (!recipient || !templateType || !variables || !channels) {
    throw new ApiError(400, 'recipient, templateType, variables, and channels are all required');
  }

  const results = await notificationService.sendNotification({
    recipient,
    templateType,
    variables,
    channels,
  });

  res.send(
    new ApiResponse(200, results, 'Direct notification dispatch request processed')
  );
}));

export default router;
