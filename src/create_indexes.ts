import { pool } from './config/postgres.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function createIndexes() {
  console.log("Connecting to Postgres...");
  try {
    const client = await pool.connect();
    console.log("Connected successfully. Creating indexes...");

    const queries = [
      // Indexes on assets table
      "CREATE INDEX IF NOT EXISTS idx_assets_hotel_id ON assets(hotel_id);",
      "CREATE INDEX IF NOT EXISTS idx_assets_category_id ON assets(category_id);",
      "CREATE INDEX IF NOT EXISTS idx_assets_status ON assets(status);",

      // Indexes on manual_task table
      "CREATE INDEX IF NOT EXISTS idx_manual_task_hotel_id ON manual_task(hotel_id);",
      "CREATE INDEX IF NOT EXISTS idx_manual_task_status ON manual_task(status);",
      "CREATE INDEX IF NOT EXISTS idx_manual_task_priority ON manual_task(priority);",
      "CREATE INDEX IF NOT EXISTS idx_manual_task_assigned_to ON manual_task(assigned_to);",
      "CREATE INDEX IF NOT EXISTS idx_manual_task_card_no ON manual_task(card_no);",

      // Indexes on users table
      "CREATE INDEX IF NOT EXISTS idx_users_hotel_id ON users(hotel_id);",
      "CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);",
      "CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);"
    ];

    for (const query of queries) {
      console.log(`Executing: ${query}`);
      await client.query(query);
    }

    console.log("All indexes created successfully!");
    client.release();
  } catch (err) {
    console.error("Error creating indexes:", err);
  } finally {
    await pool.end();
  }
}

createIndexes();
