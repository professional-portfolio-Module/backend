import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs/promises';
import { pool, connectPostgres } from '../config/postgres.js';
import logger from '../config/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsDir = path.join(__dirname, '../migrations');

/**
 * Runs pending PostgreSQL migrations in version order.
 */
export async function runMigrations(): Promise<void> {
  logger.info('🔄 Checking database migrations...');
  const client = await pool.connect();

  try {
    // 1. Create migrations tracking table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        run_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Fetch already executed migrations
    const executedRes = await client.query('SELECT name FROM schema_migrations;');
    const executedMigrations = new Set(executedRes.rows.map((row: any) => row.name));

    // 3. Scan migrations folder
    const files = await fs.readdir(migrationsDir);
    const migrationFiles = files
      .filter((file) => (file.endsWith('.ts') || file.endsWith('.js')) && !file.endsWith('.d.ts'))
      .sort(); // Sort alphabetically to run sequentially

    let runCount = 0;

    for (const file of migrationFiles) {
      const migrationName = path.parse(file).name;

      if (!executedMigrations.has(migrationName)) {
        logger.info(`🚀 Running database migration: '${migrationName}'...`);
        
        // Dynamically import migration module
        const fileUrl = pathToFileURL(path.join(migrationsDir, file));
        const migrationModule = await import(fileUrl.href);

        if (!migrationModule.up) {
          throw new Error(`Migration '${file}' does not export an 'up' query string.`);
        }

        // Start transaction for this migration
        await client.query('BEGIN');

        try {
          // Run the migration SQL
          await client.query(migrationModule.up);
          
          // Log migration in history table
          await client.query('INSERT INTO schema_migrations (name) VALUES ($1);', [migrationName]);
          
          await client.query('COMMIT');
          logger.info(`✅ Migration '${migrationName}' completed successfully.`);
          runCount++;
        } catch (migError) {
          await client.query('ROLLBACK');
          logger.error(`❌ Migration '${migrationName}' failed and rolled back:`, migError);
          throw migError;
        }
      }
    }

    if (runCount === 0) {
      logger.info('✅ Database is up to date. No pending migrations.');
    } else {
      logger.info(`🚀 Database schema migration completed. Executed ${runCount} migrations.`);
    }

  } catch (error) {
    logger.error('❌ Migration runner failed:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Support direct execution via command line (e.g. npm run migrate)
const runDirectly = process.argv[1] === __filename;
if (runDirectly) {
  (async () => {
    try {
      await connectPostgres();
      await runMigrations();
      process.exit(0);
    } catch (error) {
      process.exit(1);
    }
  })();
}
