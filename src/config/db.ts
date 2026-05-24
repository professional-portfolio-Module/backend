import mongoose from 'mongoose';
import config from './config.js';
import logger from './logger.js';

const connectDB = async (): Promise<void> => {
  try {
    if (!config.DB_URI) {
      throw new Error('DB_URI is not defined in environment variables');
    }
    const conn = await mongoose.connect(config.DB_URI);
    logger.info(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error: any) {
    logger.error(`❌ MongoDB connection error: ${error.message}. Continuing in SQL-only mode.`);
  }
};

export default connectDB;
