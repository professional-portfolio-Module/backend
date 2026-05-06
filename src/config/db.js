const mongoose = require("mongoose");
const config = require("./config");
const logger = require("./logger");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.DB_URI);
    logger.info(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};


module.exports = connectDB;
