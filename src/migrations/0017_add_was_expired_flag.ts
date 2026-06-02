import { pool } from '../config/postgres.js';
import logger from '../config/logger.js';

/**
 * Migration 0017: Add was_expired flag to scheduled_tasks and manual_task tables.
 *
 * This column tracks whether a task was completed after its due_date had passed,
 * enabling "completed late" accountability tracking without hard-blocking technicians.
 */
export async function up(): Promise<void> {
  logger.info('Running migration 0017: add was_expired flag...');
  await pool.query(`
    ALTER TABLE scheduled_tasks
    ADD COLUMN IF NOT EXISTS was_expired BOOLEAN DEFAULT false;
  `);
  await pool.query(`
    ALTER TABLE manual_task
    ADD COLUMN IF NOT EXISTS was_expired BOOLEAN DEFAULT false;
  `);
  logger.info('Migration 0017 complete.');
}
