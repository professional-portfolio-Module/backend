import { pool } from '../config/postgres.js';
import { notificationService } from './notificationService.js';
import { redisService } from './redisService.js';
import logger from '../config/logger.js';
import fs from 'fs';
import path from 'path';

/**
 * Scans for active scheduled tasks whose due_date has passed (due_date < CURRENT_DATE)
 * and automatically transitions their status to 'expired'.
 */
export async function expirePastDueTasks(): Promise<number> {
  logger.info('⏰ Scanning for expired scheduled tasks...');
  try {
    const query = `
      UPDATE scheduled_tasks
      SET status = 'expired', updated_at = NOW()
      WHERE due_date < CURRENT_DATE
        AND status NOT IN ('completed', 'rejected', 'expired')
      RETURNING task_id, scheduled_id;
    `;
    const res = await pool.query(query);
    if (res.rows.length > 0) {
      logger.info(`🚨 Automatically expired ${res.rows.length} past-due scheduled tasks.`);

      // For each expired task, notify assigned technicians
      for (const task of res.rows) {
        try {
          const infoRes = await pool.query(
            `SELECT s.title, s.card_no FROM maintenance_schedule s WHERE s.schedule_id = $1`,
            [task.scheduled_id]
          );
          if (infoRes.rows.length > 0) {
            const info = infoRes.rows[0];
            const techsRes = await pool.query(
              `SELECT u.id FROM assignments assign 
               JOIN users u ON assign.user_id = u.id 
               WHERE assign.scheduled_id = $1 AND u.is_active = true`,
              [task.scheduled_id]
            );
            for (const tech of techsRes.rows) {
              await pool.query(
                `INSERT INTO notifications (id, user_id, notification_type, title, content, read, created_at, entity_id, entity_type)
                 VALUES (uuid_generate_v4(), $1, 'task_expired', $2, $3, false, NOW(), $4, $5)`,
                [
                  tech.id,
                  `Task Expired: ${info.title}`,
                  `Your assigned task "${info.title}" for asset ${info.card_no} has expired because it was not completed before the due date.`,
                  task.task_id,
                  'scheduled_task'
                ]
              );
            }
          }
        } catch (innerErr) {
          logger.error(`⚠️ Failed to dispatch expiration notification for task ${task.task_id}:`, innerErr);
        }
      }
    } else {
      logger.info('✅ No tasks were past their due date.');
    }
    return res.rows.length;
  } catch (error) {
    logger.error('❌ Failed to run auto-expiration check:', error);
    return 0;
  }
}

/**
 * Scans for active manual tasks whose due_date has passed (due_date < CURRENT_DATE)
 * and automatically transitions their status to 'expired'.
 */
export async function expirePastDueManualTasks(): Promise<number> {
  logger.info('⏰ Scanning for expired manual tasks...');
  try {
    const query = `
      UPDATE manual_task
      SET status = 'expired'
      WHERE due_date < CURRENT_DATE
        AND status NOT IN ('completed', 'rejected', 'expired')
      RETURNING manual_task_id, title, assigned_to, card_no;
    `;
    const res = await pool.query(query);
    if (res.rows.length > 0) {
      logger.info(`🚨 Automatically expired ${res.rows.length} past-due manual tasks.`);

      // Clear the Redis cache for manual tasks
      await redisService.delPattern('manualTasks:list:*');

      // For each expired task, notify the assigned technician
      for (const task of res.rows) {
        try {
          if (task.assigned_to) {
            await pool.query(
              `INSERT INTO notifications (id, user_id, notification_type, title, content, read, created_at, entity_id, entity_type)
               VALUES (uuid_generate_v4(), $1, 'task_expired', $2, $3, false, NOW(), $4, $5)`,
              [
                task.assigned_to,
                `Task Expired: ${task.title}`,
                `Your assigned manual task "${task.title}" for asset ${task.card_no} has expired because it was not completed before the due date.`,
                task.manual_task_id,
                'manual_task'
              ]
            );
          }
        } catch (innerErr) {
          logger.error(`⚠️ Failed to dispatch expiration notification for manual task ${task.manual_task_id}:`, innerErr);
        }
      }
    } else {
      logger.info('✅ No manual tasks were past their due date.');
    }
    return res.rows.length;
  } catch (error) {
    logger.error('❌ Failed to run manual task auto-expiration check:', error);
    return 0;
  }
}

/**
 * Cleans up photo evidence references:
 * - Removes non-emergency photo evidence after 1 month.
 * - Removes emergency photo evidence after 6 months.
 * - Deletes the files from Cloudinary storage before clearing database links.
 */
export async function cleanupOldPhotoEvidence(): Promise<void> {
  logger.info('🧹 Running database cleanup for old photo evidence references...');
  try {
    // 1. Fetch URLs to delete for scheduled tasks
    const scheduledUrlsRes = await pool.query(`
      SELECT attachment_url 
      FROM scheduled_tasks
      WHERE attachment_url IS NOT NULL
        AND (
          (priority != 'emergency' AND created_at < NOW() - INTERVAL '1 month')
          OR (priority = 'emergency' AND created_at < NOW() - INTERVAL '6 months')
        );
    `);
    
    // 2. Fetch URLs to delete for manual tasks
    const manualUrlsRes = await pool.query(`
      SELECT attachment_url 
      FROM manual_task
      WHERE attachment_url IS NOT NULL
        AND (
          (priority != 'emergency' AND created_at < NOW() - INTERVAL '1 month')
          OR (priority = 'emergency' AND created_at < NOW() - INTERVAL '6 months')
        );
    `);

    // Combine URLs and filter out falsy values
    const urlsToDelete: string[] = [
      ...scheduledUrlsRes.rows.map(r => r.attachment_url),
      ...manualUrlsRes.rows.map(r => r.attachment_url)
    ].filter(Boolean);

    if (urlsToDelete.length > 0) {
      logger.info(`🧹 Found ${urlsToDelete.length} images to clear.`);
      const uploadsDir = path.resolve(process.cwd(), 'uploads');
      
      for (const url of urlsToDelete) {
        // Try local VM file deletion if using self-hosted VM folder storage
        if (url.includes('/api/uploads/')) {
          const filename = url.split('/api/uploads/').pop();
          if (filename) {
            const localPath = path.join(uploadsDir, filename);
            try {
              if (fs.existsSync(localPath)) {
                fs.unlinkSync(localPath);
                logger.info(`🗑️ Deleted local VM photo evidence file: ${filename}`);
              }
            } catch (err) {
              logger.error(`❌ Failed to delete local photo evidence file (${filename}):`, err);
            }
          }
        }
      }
    }

    // 3. Update database references
    const scheduledRes = await pool.query(`
      UPDATE scheduled_tasks
      SET attachment_url = NULL, updated_at = NOW()
      WHERE attachment_url IS NOT NULL
        AND (
          (priority != 'emergency' AND created_at < NOW() - INTERVAL '1 month')
          OR (priority = 'emergency' AND created_at < NOW() - INTERVAL '6 months')
        );
    `);
    
    const manualRes = await pool.query(`
      UPDATE manual_task
      SET attachment_url = NULL
      WHERE attachment_url IS NOT NULL
        AND (
          (priority != 'emergency' AND created_at < NOW() - INTERVAL '1 month')
          OR (priority = 'emergency' AND created_at < NOW() - INTERVAL '6 months')
        );
    `);

    const scheduledCount = scheduledRes.rowCount ?? 0;
    const manualCount = manualRes.rowCount ?? 0;

    if (scheduledCount > 0 || manualCount > 0) {
      logger.info(`🧹 Cleared old photo evidence for ${scheduledCount} scheduled tasks and ${manualCount} manual tasks.`);
      // Clear manual tasks cache
      if (manualCount > 0) {
        await redisService.delPattern('manualTasks:list:*');
      }
    } else {
      logger.info('✅ No old photo evidence needed clearing.');
    }
  } catch (error) {
    logger.error('❌ Failed to run photo evidence cleanup:', error);
  }
}

/**
 * Scans maintenance schedules that start within the next day (tomorrow or earlier)
 * and automatically generates pending tasks for them in the scheduled_tasks table.
 * It also notifies all assigned technicians via email and in-app notifications.
 */
export async function scanSchedulesAndCreateTasks(): Promise<void> {
  // Check if automated task scanner is paused or system is in maintenance mode
  const isPaused = await redisService.get('system:task_generation:paused');
  const isMaintenance = await redisService.get('system:maintenance_mode');
  
  if (isPaused === 'true' || isMaintenance === 'true') {
    // Record when the pause started if not already recorded
    const pausedAtExists = await redisService.get('system:task_generation:paused_at');
    if (!pausedAtExists) {
      const ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60;
      await redisService.set('system:task_generation:paused_at', new Date().toISOString(), ONE_YEAR_IN_SECONDS);
      logger.info('⏸️ Recorded pause start timestamp in Redis.');
    }
    
    logger.info('⏸️ Automated schedule scan skipped (paused by administrator or system is in maintenance mode).');
    
    // Solution 2: Run auto-expiration check even when task generation is paused to keep statuses accurate
    await expirePastDueTasks();
    await expirePastDueManualTasks();
    await cleanupOldPhotoEvidence();
    return;
  }

  // Solution 1: Dynamic Lookback Window calculation when resuming
  let lookbackDays = 7;
  const pausedAtStr = await redisService.get('system:task_generation:paused_at');
  if (pausedAtStr) {
    try {
      const pausedTime = new Date(pausedAtStr).getTime();
      const nowTime = new Date().getTime();
      const diffDays = Math.ceil((nowTime - pausedTime) / (1000 * 60 * 60 * 24));
      if (diffDays > 7) {
        lookbackDays = diffDays + 1; // dynamically cover the full duration of pause
        logger.info(`🔄 Resuming task generation after long pause (${diffDays} days). Dynamically expanding lookback window to ${lookbackDays} days.`);
      }
    } catch (err) {
      logger.error('⚠️ Failed to calculate dynamic lookback window:', err);
    }
  }

  // Run auto-expiration check for scheduled tasks
  await expirePastDueTasks();
  // Run auto-expiration check for manual tasks
  await expirePastDueManualTasks();
  // Clean up old photo evidence references (> 1 month, non-emergency)
  await cleanupOldPhotoEvidence();

  logger.info('🔍 Starting automated maintenance schedule scan...');

  // Map to hold notifications to prevent spamming technicians during backlog runs
  // Key: technician userId, Value: { recipient details, list of tasks }
  const consolidatedNotifications = new Map<
    string,
    {
      recipient: { name: string; email: string; phone?: string };
      tasks: Array<{ title: string; card_no: string; scheduled_time: string; task_id: string }>;
    }
  >();

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
        AND s.start_date >= CURRENT_DATE - ($1::text || ' day')::INTERVAL
        AND NOT EXISTS (
          SELECT 1 
          FROM scheduled_tasks t 
          WHERE t.scheduled_id = s.schedule_id
        )
    `;
    const schedulesResult = await client.query(schedulesQuery, [lookbackDays]);
    const schedulesToProcess = schedulesResult.rows;

    if (schedulesToProcess.length === 0) {
      logger.info('✅ No new schedules require task generation at this time.');
      await client.query('COMMIT');
      
      // Clean up paused timestamp now that catch-up check successfully found nothing
      if (pausedAtStr) {
        await redisService.del('system:task_generation:paused_at');
      }
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
            created_at,
            entity_id,
            entity_type
          ) VALUES (
            uuid_generate_v4(),
            $1,
            'task_assigned',
            $2,
            $3,
            false,
            NOW(),
            $4,
            'scheduled_task'
          );
        `;
        const notificationTitle = `New Maintenance Job: ${title}`;
        const notificationContent = `You have been assigned a new maintenance task for asset ${card_no}. Scheduled start date: ${new Date(start_date).toLocaleDateString()}.`;
        
        await client.query(insertNotificationQuery, [
          user_id,
          notificationTitle,
          notificationContent,
          newTaskId
        ]);

        // Solution 3: Queue the email notification instead of sending instantly to prevent spam
        if (email) {
          if (!consolidatedNotifications.has(user_id)) {
            consolidatedNotifications.set(user_id, {
              recipient: { name, email, phone: mobilenumber || undefined },
              tasks: []
            });
          }
          consolidatedNotifications.get(user_id)!.tasks.push({
            title,
            card_no,
            scheduled_time: new Date(start_date).toLocaleString(),
            task_id: newTaskId
          });
        }
      }
    }

    await client.query('COMMIT');
    logger.info('🎉 Completed database updates for automated maintenance task generation.');

    // Clear paused timestamp on successful catch-up scan
    if (pausedAtStr) {
      await redisService.del('system:task_generation:paused_at');
    }

    // Process queued email notifications (Solution 3: Anti-Spam / Batching)
    for (const [userId, data] of consolidatedNotifications.entries()) {
      const { recipient, tasks } = data;
      
      try {
        if (tasks.length > 3) {
          // Send a consolidated digest email
          const taskDetailsList = tasks
            .map((t, idx) => `${idx + 1}. Task: "${t.title}" (Asset: ${t.card_no}) - Scheduled: ${t.scheduled_time}`)
            .join('<br>');

          await notificationService.sendNotification({
            recipient,
            templateType: 'backlog_summary',
            variables: {
              task_count: tasks.length.toString(),
              task_details_list: taskDetailsList
            },
            channels: ['email']
          });
          logger.info(`📧 Dispatched consolidated backlog summary email with ${tasks.length} tasks to ${recipient.email}`);
        } else {
          // Send individual emails for few tasks
          for (const task of tasks) {
            await notificationService.sendNotification({
              recipient,
              templateType: 'maintenance_reminder',
              variables: {
                task_name: task.title,
                machine_name: task.card_no,
                scheduled_time: task.scheduled_time,
                scheduled_date: new Date(task.scheduled_time).toLocaleDateString(),
                task_id: task.task_id
              },
              channels: ['email']
            });
          }
          logger.info(`📧 Dispatched ${tasks.length} individual reminder emails to ${recipient.email}`);
        }
      } catch (dispatchErr) {
        logger.error(`⚠️ Failed to dispatch consolidated/individual reminders to user ${recipient.name}:`, dispatchErr);
      }
    }

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
