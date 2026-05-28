export interface NotificationTemplateChannels {
  sms?: string;
  email?: {
    subject: string;
    body: string;
  };
  push?: {
    alert: string;
    deepLink?: string;
  };
}

export type NotificationTemplateType = 'maintenance_reminder';

export const templates: Record<NotificationTemplateType, NotificationTemplateChannels> = {
  maintenance_reminder: {
    sms: "Reminder: PM task '{{task_name}}' scheduled {{scheduled_time}}. Reply 'DONE' when complete or 'RESKED' to reschedule.",
    email: {
      subject: "Maintenance Reminder: {{task_name}} – {{scheduled_date}}",
      body: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: sans-serif; background-color: #f7fafc; padding: 20px; color: #2d3748; }
            .container { background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); max-width: 600px; margin: 0 auto; }
            h2 { color: #2b6cb0; border-bottom: 2px solid #edf2f7; padding-bottom: 10px; margin-top: 0; }
            p { line-height: 1.6; font-size: 16px; }
            .details { background-color: #edf2f7; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 14px; margin: 20px 0; }
            .footer { font-size: 12px; color: #a0aec0; border-top: 1px solid #edf2f7; padding-top: 15px; margin-top: 25px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>🛠 Scheduled Maintenance Reminder</h2>
            <p>Dear <strong>{{technician_name}}</strong>,</p>
            <p>This is a reminder that the <strong>{{task_name}}</strong> (Machine: <strong>{{machine_name}}</strong>) is scheduled for <strong>{{scheduled_time}}</strong>.</p>
            <p>Please complete the task using the mobile app and attach any photos if necessary. If you cannot perform this task on time, reply to this email or contact your supervisor. Thank you.</p>
            <div class="details">
              Task ID: {{task_id}}<br>
              Machine: {{machine_name}}<br>
              Schedule: {{scheduled_time}}
            </div>
            <div class="footer">
              Best,<br>
              <strong>Hotel Maintenance Team</strong>
            </div>
          </div>
        </body>
        </html>
      `
    },
    push: {
      alert: "🛠 Reminder: '{{task_name}}' at {{scheduled_time}} today.",
      deepLink: "browns://tasks/{{task_id}}"
    }
  }
};

/**
 * Replaces placeholders in format {{variable_name}} inside a template string
 */
export function interpolate(template: string, variables: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), value || '');
  }
  return result;
}
