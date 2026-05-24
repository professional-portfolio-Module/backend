import { createClient, RedisClientType } from 'redis';
import config from '../config/config.js';
import logger from '../config/logger.js';

class RedisService {
  private client: RedisClientType | null = null;
  private isConnected = false;

  public async connect(): Promise<void> {
    const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = config;
    const url = REDIS_PASSWORD
      ? `redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`
      : `redis://${REDIS_HOST}:${REDIS_PORT}`;

    logger.info(`🔌 Connecting to Redis at redis://${REDIS_HOST}:${REDIS_PORT}...`);

    this.client = createClient({ url });

    this.client.on('connect', () => {
      logger.info('🚀 Redis connection established successfully');
    });

    this.client.on('ready', () => {
      this.isConnected = true;
      logger.info('⚡ Redis client is ready to use');
    });

    this.client.on('error', (err) => {
      logger.error('❌ Redis Connection Error:', err);
      this.isConnected = false;
    });

    this.client.on('end', () => {
      logger.warn('⚠️ Redis connection ended');
      this.isConnected = false;
    });

    try {
      await this.client.connect();
    } catch (err) {
      logger.error('❌ Failed to trigger Redis connect command:', err);
      this.isConnected = false;
    }
  }

  public async get(key: string): Promise<string | null> {
    if (!this.isConnected || !this.client) {
      return null;
    }
    try {
      return await this.client.get(key);
    } catch (err) {
      logger.error(`Error getting key "${key}" from Redis:`, err);
      return null;
    }
  }

  public async set(key: string, value: string, ttlSeconds: number = config.REDIS_TTL): Promise<void> {
    if (!this.isConnected || !this.client) {
      return;
    }
    try {
      await this.client.set(key, value, {
        EX: ttlSeconds,
      });
    } catch (err) {
      logger.error(`Error setting key "${key}" in Redis:`, err);
    }
  }

  public async del(key: string): Promise<void> {
    if (!this.isConnected || !this.client) {
      return;
    }
    try {
      await this.client.del(key);
    } catch (err) {
      logger.error(`Error deleting key "${key}" from Redis:`, err);
    }
  }

  public async delPattern(pattern: string): Promise<void> {
    if (!this.isConnected || !this.client) {
      return;
    }
    try {
      const keys = await this.client.keys(pattern);
      if (keys.length > 0) {
        await this.client.del(keys);
        logger.info(`🧹 Cleared ${keys.length} cached keys matching pattern: ${pattern}`);
      }
    } catch (err) {
      logger.error(`Error deleting pattern "${pattern}" from Redis:`, err);
    }
  }

  public async disconnect(): Promise<void> {
    if (this.client) {
      try {
        await this.client.quit();
        logger.info('🔌 Redis connection closed cleanly');
      } catch (err) {
        logger.error('Error disconnecting Redis client:', err);
      }
    }
  }
}

export const redisService = new RedisService();
