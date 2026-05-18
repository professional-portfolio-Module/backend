import natsService from './natsService.js';
import notificationService, { NotificationPayload } from './notificationService.js';
import logger from '../config/logger.js';

const SUBJECT = 'maintenance.notifications';

export async function startNotificationConsumer(): Promise<void> {
  try {
    logger.info(`Initializing Event-Driven NATS Notification Consumer (Subject: '${SUBJECT}')...`);
    
    // Subscribe to subject
    const subscription = await natsService.subscribe(SUBJECT);
    
    logger.info(`🚀 NATS Notification Consumer is listening on subject: '${SUBJECT}'`);

    // Start background event loop to consume messages
    (async () => {
      for await (const message of subscription) {
        try {
          const rawValue = message.data;
          const payload = natsService.decode(rawValue) as NotificationPayload;

          logger.info(`📥 [NATS Consumer] Received notification event on subject '${message.subject}'`);

          if (!payload.recipient || !payload.templateType || !payload.variables || !payload.channels) {
            logger.error('[NATS Consumer] Invalid payload format received. Missing required fields:', JSON.stringify(payload));
            continue;
          }

          // Trigger the unified notification service
          await notificationService.sendNotification(payload);
        } catch (msgError) {
          logger.error('[NATS Consumer] Error handling incoming NATS message:', msgError);
        }
      }
    })().catch((err) => {
      logger.error('[NATS Consumer] Consumer loop encountered a terminal error:', err);
    });

  } catch (error) {
    logger.error('Failed to initialize or run NATS Notification Consumer:', error);
  }
}
