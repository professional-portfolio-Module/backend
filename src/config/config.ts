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
  NATS_URI: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD?: string;
  REDIS_TTL: number;
}

const config: Config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3001', 10),
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  DB_URI: process.env.DB_URI,
  POSTGRES_URI: process.env.POSTGRES_URI,
  NATS_URI: process.env.NATS_URI || (process.env.NODE_ENV === 'production' ? 'nats://nats:4222' : 'nats://localhost:4222'),
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: parseInt(process.env.REDIS_PORT || '6379', 10),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || undefined,
  REDIS_TTL: parseInt(process.env.REDIS_TTL || '300', 10),
};

export default config;
