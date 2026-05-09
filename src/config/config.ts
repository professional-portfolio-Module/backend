import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the project root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface Config {
  NODE_ENV: string;
  PORT: number;
  CORS_ORIGIN: string;
  DB_URI?: string;
  POSTGRES_URI?: string;
}

const config: Config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3001', 10),
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  DB_URI: process.env.DB_URI,
  POSTGRES_URI: process.env.POSTGRES_URI,
};

export default config;
