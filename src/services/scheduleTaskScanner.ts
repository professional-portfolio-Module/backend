import { pool } from '../config/postgres.js';
import { notificationService } from './notificationService.js';
import logger from '../config/logger.js';

/**
 * Scans maintenance schedules that start within the next day (tomorrow or earlier)
 * and automatically generates pending tasks for them in the scheduled_tasks table.
 * It also notifies all assigned technicians via email and in-app notifications.
 */
export async function scanSchedulesAndCreateTasks(): Promise<void> {
  logger.info('🔍 Starting automated maintenance schedule scan...');

  const client = await pool.connect();
  try {
    // Start transaction
    await client.query('BEGIN');

    // 1. Fetch active schedules starting tomorrow or earlier that don't have a task yet
    const schedulesQuery = `
      SELECT 
        s.schedule_id,
        s.hotel_id,
        s.card_no,
        s.title,
        s.default_description_manager,
        s.start_date,
        s.end_date,
        a.id as resolved_asset_id
      FROM maintenance_schedule s
      LEFT JOIN assets a ON s.card_no = a.card_no
      WHERE s.is_active = true
        AND s.start_date <= CURRENT_DATE + INTERVAL '1 day'
        AND s.start_date >= CURRENT_DATE - INTERVAL '7 days'
        AND NOT EXISTS (
          SELECT 1 
          FROM scheduled_tasks t 
          WHERE t.scheduled_id = s.schedule_id
        )
    `;
    const schedulesResult = await client.query(schedulesQuery);
    const schedulesToProcess = schedulesResult.rows;

    if (schedulesToProcess.length === 0) {
      logger.info('✅ No new schedules require task generation at this time.');
      await client.query('COMMIT');
      return;
    }

    logger.info(`📋 Found ${schedulesToProcess.length} schedules to process. Generating tasks...`);

    for (const schedule of schedulesToProcess) {
      const {
        schedule_id,
        hotel_id,
        card_no,
        title,
        default_description_manager,
        start_date,
        end_date,
        resolved_asset_id
      } = schedule;

      // 2. Insert new task into scheduled_tasks (with due_date set to schedule's end_date)
      const insertTaskQuery = `
        INSERT INTO scheduled_tasks (
          task_id,
          scheduled_id,
          asset_id,
          status,
          priority,
          additional_details,
          due_date,
          created_at,
          updated_at
        ) VALUES (
          uuid_generate_v4(),
          $1,
          $2,
          'pending',
          'normal',
          $3,
          $4,
          NOW(),
          NOW()
        ) RETURNING task_id;
      `;
      
      const taskResult = await client.query(insertTaskQuery, [
        schedule_id,
        resolved_asset_id || null,
        default_description_manager || `Scheduled maintenance for card no: ${card_no}`,
        end_date ? new Date(end_date) : null
      ]);
      const newTaskId = taskResult.rows[0].task_id;

      logger.info(`✨ Created task ${newTaskId} with due date ${end_date} for schedule ${schedule_id} (${title})`);

      // 3. Fetch all technicians assigned to this schedule
      const techniciansQuery = `
        SELECT 
          u.id as user_id,
          u.name,
          u.email,
          u.mobilenumber
        FROM assignments assign
        JOIN users u ON assign.user_id = u.id
        WHERE assign.scheduled_id = $1 AND u.is_active = true
      `;
      const techniciansResult = await client.query(techniciansQuery, [schedule_id]);
      const assignedTechnicians = techniciansResult.rows;

      for (const technician of assignedTechnicians) {
        const { user_id, name, email, mobilenumber } = technician;

        // 4. Create in-app notification
        const insertNotificationQuery = `
          INSERT INTO notifications (
            id,
            user_id,
            notification_type,
            title,
            content,
            read,
            created_at
          ) VALUES (
            uuid_generate_v4(),
            $1,
            'task_assigned',
            $2,
            $3,
            false,
            NOW()
          );
        `;
        const notificationTitle = `New Maintenance Job: ${title}`;
        const notificationContent = `You have been assigned a new maintenance task for asset ${card_no}. Scheduled start date: ${new Date(start_date).toLocaleDateString()}.`;
        
        await client.query(insertNotificationQuery, [
          user_id,
          notificationTitle,
          notificationContent
        ]);

        // 5. Send Email and other notifications via NotificationService
        try {
          await notificationService.sendNotification({
            recipient: {
              name,
              email,
              phone: mobilenumber || undefined
            },
            templateType: 'maintenance_reminder',
            variables: {
              task_name: title,
              machine_name: card_no,
              scheduled_time: new Date(start_date).toLocaleString(),
              scheduled_date: new Date(start_date).toLocaleDateString(),
              task_id: newTaskId
            },
            channels: email ? ['email'] : []
          });
        } catch (notifErr) {
          logger.error(`⚠️ Failed to send notification dispatch to user ${name} (${email}):`, notifErr);
        }
      }
    }

    await client.query('COMMIT');
    logger.info('🎉 Completed automated maintenance task generation and dispatch successfully.');
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('❌ Error occurred during maintenance schedule scan transaction:', error);
  } finally {
    client.release();
  }
}

/**
 * Starts the schedule scanner loop.
 * Runs immediately on startup, then runs every hour.
 */
export function startScheduleScanner(): void {
  // Run immediately on startup
  scanSchedulesAndCreateTasks().catch((err) => {
    logger.error('Failed to run initial schedule scanner:', err);
  });

  // Run once every hour
  const ONE_HOUR_MS = 60 * 60 * 1000;
  setInterval(() => {
    scanSchedulesAndCreateTasks().catch((err) => {
      logger.error('Error during scheduled hourly schedule scan:', err);
    });
  }, ONE_HOUR_MS);

  logger.info('⏰ Scheduled task generator scanner initialized (runs hourly).');
}
