const express = require("express");
const router = express.Router();

const healthRoutes = require("./health.routes");

// Health check (Database Aware)
router.use("/health", healthRoutes);


// Mount feature routes below
// router.use("/users", require("./user.routes"));
// router.use("/auth", require("./auth.routes"));

module.exports = router;
