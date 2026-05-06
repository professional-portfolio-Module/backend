const express = require("express");
const mongoose = require("mongoose");
const { pool } = require("../config/postgres");
const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/catchAsync");

const router = express.Router();

/**
 * @desc    Health check endpoint with Database connectivity check
 * @route   GET /api/health
 */
router.get("/", catchAsync(async (req, res) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? "up" : "down";
  
  let postgresStatus = "down";
  try {
    const client = await pool.connect();
    postgresStatus = "up";
    client.release();
  } catch (err) {
    postgresStatus = "down";
  }

  const status = (mongoStatus === "up" && postgresStatus === "up") ? 200 : 503;

  res.status(status).json(new ApiResponse(status, {
    timestamp: new Date().toISOString(),
    databases: {
      mongodb: mongoStatus,
      postgresql: postgresStatus
    },
    uptime: process.uptime()
  }, status === 200 ? "System is healthy" : "System is degraded"));
}));

module.exports = router;
