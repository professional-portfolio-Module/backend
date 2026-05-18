import twilio from 'twilio';
import logger from '../config/logger.js';

export interface SmsOptions {
  to: string;
  text: string;
}

class SmsService {
  private client: twilio.Twilio | null = null;
  private fromNumber: string | null = null;
  private isMockMode = true;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_PHONE_NUMBER;

    if (accountSid && authToken && from) {
      logger.info('Twilio credentials found. Initializing Twilio production client.');
      this.client = twilio(accountSid, authToken);
      this.fromNumber = from;
      this.isMockMode = false;
    } else {
      logger.info('⚠️ No Twilio credentials found in environment. SMS Service is running in [MOCK MODE].');
      this.isMockMode = true;
    }
  }

  /**
   * Sends an SMS via Twilio or prints it to log if in Mock mode.
   * Performs validation and warns if message length exceeds 160 characters.
   */
  async sendSms(options: SmsOptions): Promise<boolean> {
    const charCount = options.text.length;
    
    // Check SMS standard limit warnings
    if (charCount > 160) {
      logger.warn(`[SMS Service] Warning: Message length (${charCount} chars) exceeds the standard 160-character single-SMS limit. This will require multiple SMS segments.`);
    }

    if (this.isMockMode) {
      logger.info(`
=========================================
💬 [MOCK SMS DISPATCHED]
-----------------------------------------
From:    ${this.fromNumber || '+1234567890'}
To:      ${options.to}
Length:  ${charCount} / 160 characters
-----------------------------------------
Content:
"${options.text}"
=========================================
      `);
      return true;
    }

    try {
      logger.info(`Sending live SMS to: ${options.to} (${charCount} characters)`);
      const message = await this.client!.messages.create({
        body: options.text,
        from: this.fromNumber!,
        to: options.to,
      });

      logger.info(`🚀 Live SMS sent successfully. Message SID: ${message.sid}`);
      return true;
    } catch (error) {
      logger.error(`Failed to send SMS to ${options.to}:`, error);
      return false;
    }
  }
}

export const smsService = new SmsService();
export default smsService;
