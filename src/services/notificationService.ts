import { templates, interpolate, NotificationTemplateType } from '../config/notificationTemplates.js';
import emailService from './emailService.js';
import smsService from './smsService.js';
import pushService from './pushService.js';
import logger from '../config/logger.js';

export interface NotificationRecipient {
  name: string;
  email: string;
  phone?: string;
  pushToken?: string;
}

export interface NotificationPayload {
  recipient: NotificationRecipient;
  templateType: NotificationTemplateType;
  variables: Record<string, string>;
  channels: ('sms' | 'email' | 'push')[];
}

class NotificationService {
  /**
   * Orchestrates template rendering and dispatches the notification to multiple channels.
   */
  async sendNotification(payload: NotificationPayload): Promise<Record<string, boolean>> {
    const { recipient, templateType, variables, channels } = payload;
    const results: Record<string, boolean> = {};

    logger.info(`🛎 Processing notification request for '${recipient.name}' (Type: ${templateType}) on channels: ${channels.join(', ')}`);

    const templateConfig = templates[templateType];

    if (!templateConfig) {
      logger.error(`[Notification Service] Error: Template type '${templateType}' not registered.`);
      throw new Error(`Template type '${templateType}' not found`);
    }

    // Merge recipient name dynamically into variables
    const mergedVariables = {
      ...variables,
      technician_name: recipient.name,
    };

    const deliveryPromises = channels.map(async (channel) => {
      try {
        switch (channel) {
          case 'sms': {
            if (!recipient.phone) {
              logger.warn(`[Notification Service] Cannot send SMS to '${recipient.name}': Phone number is missing.`);
              results.sms = false;
              break;
            }
            if (!templateConfig.sms) {
              logger.error(`[Notification Service] SMS template not defined for: ${templateType}`);
              results.sms = false;
              break;
            }
            const smsText = interpolate(templateConfig.sms, mergedVariables);
            results.sms = await smsService.sendSms({ to: recipient.phone, text: smsText });
            break;
          }

          case 'email': {
            if (!recipient.email) {
              logger.warn(`[Notification Service] Cannot send Email to '${recipient.name}': Email address is missing.`);
              results.email = false;
              break;
            }
            if (!templateConfig.email) {
              logger.error(`[Notification Service] Email template not defined for: ${templateType}`);
              results.email = false;
              break;
            }
            const subject = interpolate(templateConfig.email.subject, mergedVariables);
            const html = interpolate(templateConfig.email.body, mergedVariables);
            results.email = await emailService.sendEmail({ to: recipient.email, subject, html });
            break;
          }

          case 'push': {
            if (!recipient.pushToken) {
              logger.warn(`[Notification Service] Cannot send Push Notification to '${recipient.name}': Push Token is missing.`);
              results.push = false;
              break;
            }
            if (!templateConfig.push) {
              logger.error(`[Notification Service] Push template not defined for: ${templateType}`);
              results.push = false;
              break;
            }
            const alert = interpolate(templateConfig.push.alert, mergedVariables);
            const deepLink = templateConfig.push.deepLink 
              ? interpolate(templateConfig.push.deepLink, mergedVariables) 
              : undefined;
            
            results.push = await pushService.sendPushNotification({
              token: recipient.pushToken,
              title: '🛠 Maintenance Reminder',
              body: alert,
              deepLink,
            });
            break;
          }

          default:
            logger.warn(`[Notification Service] Unknown channel requested: ${channel}`);
            results[channel] = false;
        }
      } catch (error) {
        logger.error(`[Notification Service] Error executing delivery for ${channel}:`, error);
        results[channel] = false;
      }
    });

    await Promise.all(deliveryPromises);
    logger.info(`🛎 Finished processing notification request. Dispatch results: ${JSON.stringify(results)}`);
    return results;
  }
}

export const notificationService = new NotificationService();
export default notificationService;
