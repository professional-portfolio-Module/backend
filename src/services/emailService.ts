import nodemailer from 'nodemailer';
import logger from '../config/logger.js';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private isMockMode = true;

  constructor() {
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (host && port && user && pass) {
      logger.info('SMTP credentials found. Initializing Nodemailer production transporter.');
      this.transporter = nodemailer.createTransport({
        host,
        port: parseInt(port, 10),
        secure: parseInt(port, 10) === 465, // true for 465, false for other ports
        auth: { user, pass },
      });
      this.isMockMode = false;
    } else {
      logger.info('⚠️ No SMTP credentials found in environment. Email Service is running in [MOCK MODE].');
      this.isMockMode = true;
    }
  }

  /**
   * Sends an email via configured SMTP or prints it to log if in Mock mode.
   */
  async sendEmail(options: EmailOptions): Promise<boolean> {
    const from = process.env.SMTP_FROM || '"Hotel Maintenance" <maintenance@browns.lk>';

    if (this.isMockMode) {
      logger.info(`
=========================================
📧 [MOCK EMAIL DISPATCHED]
-----------------------------------------
From:    ${from}
To:      ${options.to}
Subject: ${options.subject}
-----------------------------------------
Content:
${options.html.trim()}
=========================================
      `);
      return true;
    }

    try {
      logger.info(`Sending live email to: ${options.to}`);
      const info = await this.transporter!.sendMail({
        from,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });

      logger.info(`🚀 Live email sent successfully. MessageID: ${info.messageId}`);
      return true;
    } catch (error) {
      logger.error(`Failed to send email to ${options.to}:`, error);
      return false;
    }
  }
}

export const emailService = new EmailService();
export default emailService;
