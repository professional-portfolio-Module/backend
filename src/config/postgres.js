const { Pool } = require("pg");
const config = require("./config");

const pool = new Pool({
  connectionString: config.POSTGRES_URI,
  ssl: { rejectUnauthorized: false },
});

const connectPostgres = async () => {
  try {
    const client = await pool.connect();
    console.log(`✅ PostgreSQL connected: ${client.database}`);
    client.release();
  } catch (error) {
    console.error(`❌ PostgreSQL connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { pool, connectPostgres };
