import logger from '../config/logger.js';

export interface PushOptions {
  token: string;
  title: string;
  body: string;
  deepLink?: string;
}

class PushService {
  private isMockMode = true;

  constructor() {
    // Enable live mode if explicitly configured, otherwise default to mock/smart detection
    const enableLivePush = process.env.ENABLE_LIVE_PUSH === 'true';
    this.isMockMode = !enableLivePush;

    if (enableLivePush) {
      logger.info('Live Expo Push Notifications enabled.');
    } else {
      logger.info('⚠️ Push Notification Service is running in [MOCK MODE] (set ENABLE_LIVE_PUSH=true to enable).');
    }
  }

  /**
   * Sends a mobile push notification using the Expo Push API.
   * If in mock mode, prints the detailed payload in logs.
   */
  async sendPushNotification(options: PushOptions): Promise<boolean> {
    const isExpoToken = options.token.startsWith('ExponentPushToken[');

    if (!isExpoToken) {
      logger.warn(`[Push Service] Warning: Token '${options.token}' does not look like a valid Expo Push Token (should start with 'ExponentPushToken[').`);
    }

    const payload = {
      to: options.token,
      sound: 'default',
      title: options.title,
      body: options.body,
      data: options.deepLink ? { url: options.deepLink } : {},
    };

    if (this.isMockMode) {
      logger.info(`
=========================================
📱 [MOCK PUSH NOTIFICATION DISPATCHED]
-----------------------------------------
To Token:  ${options.token}
Title:     ${options.title}
Body:      ${options.body}
Deep Link: ${options.deepLink || 'None'}
-----------------------------------------
JSON Payload:
${JSON.stringify(payload, null, 2)}
=========================================
      `);
      return true;
    }

    try {
      logger.info(`Sending live Expo push notification to token: ${options.token}`);
      
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json() as any;

      if (!response.ok) {
        logger.error('[Push Service] Expo server returned an error:', responseData);
        return false;
      }

      logger.info('🚀 Live Expo Push Notification sent successfully:', JSON.stringify(responseData));
      return true;
    } catch (error) {
      logger.error('Failed to send push notification to Expo service:', error);
      return false;
    }
  }
}

export const pushService = new PushService();
export default pushService;
