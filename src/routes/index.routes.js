const express = require("express");
const router = express.Router();

// Health check
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Mount feature routes below
// router.use("/users", require("./user.routes"));
// router.use("/auth", require("./auth.routes"));

module.exports = router;
