import pg from 'pg';
import config from './config.js';
import logger from './logger.js';

const { Pool } = pg;

const pool = new Pool({
  connectionString: config.POSTGRES_URI,
  ssl: { rejectUnauthorized: false },
});

const connectPostgres = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    logger.info('✅ PostgreSQL connected');
    client.release();
  } catch (error: any) {
    logger.error(`❌ PostgreSQL connection error: ${error.message}`);
    process.exit(1);
  }
};

export { pool, connectPostgres };
