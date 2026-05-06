const { Pool } = require("pg");
const config = require("./config/config");
const logger = require("./logger");

const pool = new Pool({
  connectionString: config.POSTGRES_URI,
  ssl: { rejectUnauthorized: false },
});

const connectPostgres = async () => {
  try {
    const client = await pool.connect();
    logger.info(`✅ PostgreSQL connected: ${client.database}`);
    client.release();
  } catch (error) {
    logger.error(`❌ PostgreSQL connection error: ${error.message}`);
    process.exit(1);
  }
};


module.exports = { pool, connectPostgres };
